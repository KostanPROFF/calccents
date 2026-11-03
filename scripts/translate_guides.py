#!/usr/bin/env python3
"""Translates the Calccents guides into one language.

A guide is an article: YAML frontmatter, then prose, tables, lists and a
handful of Astro components. The prose is translated; everything else is
carried over unchanged.

The frontmatter holds a mix of translatable text and facts. The title, the
description, the questions and answers of the FAQ and the label of a source
are prose. The dates, the author, the illustration, the tool slugs and the
source URLs are facts, and a fact written in the wrong language is a bug, so
those are copied as they are.

The body is cut into blocks. A block that is an Astro component or an import
is copied. A table row is translated cell by cell, so the pipes stay where
they were. The rest is prose, and the markdown inside it is protected before
the text goes out: emphasis markers, code spans, inline HTML, MDX expressions
and the one-letter symbols the formulas use.

Every piece of a language is gathered first, translated in one go, and put
back afterwards. Asking the model for one paragraph at a time costs a request
per paragraph, and a language is seven hundred paragraphs.

Usage:
    python3 scripts/translate_guides.py --locale uk
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

import yaml

sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent / "tools"))

from gemini_translate import Translator, is_formula, protect, restore  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
GUIDES = ROOT / "src" / "content" / "guides"

CONTEXT = (
    "A long-form financial guide from a US personal-finance website: "
    "mortgages, rent versus buying, compound interest, take-home pay, "
    "federal income tax and paying off debt. Write plain, direct financial "
    "prose for a reader deciding what to do. Keep the tone factual: the site "
    "shows the arithmetic behind a number and never tells the reader what to "
    "do. Keep every number, formula symbol and unit exactly as it is."
)

# Markdown and MDX pieces that must survive the round trip untouched.
PROSE_PATTERNS = [
    # A formula symbol such as **P**, **r**, **PMT**: the whole thing.
    re.compile(r"\*\*(?:[A-Za-z]{1,3}|\d+(?:\.\d+)?)\*\*"),
    # Inline code.
    re.compile(r"`[^`\n]+`"),
    # Inline HTML.
    re.compile(r"<[^>\n]+>"),
    # An MDX expression.
    re.compile(r"\{[^{}\n]*\}"),
    # A link target.
    re.compile(r"\]\([^)\n]*\)"),
    # The remaining emphasis markers: the text inside them is translated.
    re.compile(r"\*\*"),
    re.compile(r"(?<!\*)\*(?!\*)"),
]

# A line that belongs to the machine rather than to the reader.
JSX_LINE = re.compile(r"^\s*<")
IMPORT_LINE = re.compile(r"^\s*import\s")
TABLE_LINE = re.compile(r"^\s*\|")
FENCE_LINE = re.compile(r"^\s*```")

# An HTML anchor that opens a line is prose with a link in it, not a
# component. The label and the words around it belong to the reader, and
# treating the line as JSX drops them out of the translation and cuts the
# sentence in two.
INLINE_ANCHOR_LINE = re.compile(r"^\s*<a[\s>]")

# A link that points at a page of this site. The English guide points at the
# English page, so the prefix of the locale is written into the link when the
# guide is written out: a reader in Arabic who follows a link to the
# calculator has to stay in Arabic.
INTERNAL_LINK = re.compile(r'href="(/(?!/)[^"]*)"')
DEFAULT_LOCALE = "en"

# The languages that write no space between the words of a sentence. A line
# break in the answer is the line break of the English source, and in these
# languages it belongs nowhere: it would stand in the middle of a phrase.
NO_SPACE_LANGUAGES = {"zh"}


class _Quoted(str):
    """A string that is written with quotes in the frontmatter."""


class _FrontmatterDumper(yaml.SafeDumper):
    """Writes the frontmatter the way the English guides write it.

    The English frontmatter quotes its strings and indents the lists under
    the key they belong to. The default writer does neither, and a guide in
    another language then looks like it was written by a different tool.
    """

    def increase_indent(self, flow: bool = False, indentless: bool = False):
        # The lists are indented under their key, not under the list itself.
        return super().increase_indent(flow, False)


_FrontmatterDumper.add_representer(
    _Quoted,
    lambda dumper, data: dumper.represent_scalar(
        "tag:yaml.org,2002:str", data, style='"'
    ),
)


def quote_values(value):
    """Wraps the strings of the frontmatter and leaves the rest alone.

    The keys keep their plain form: only the values of the frontmatter are
    written in quotes, and the English guides are written that way.
    """
    if isinstance(value, dict):
        return {key: quote_values(item) for key, item in value.items()}
    if isinstance(value, list):
        return [quote_values(item) for item in value]
    if isinstance(value, str):
        return _Quoted(value)
    return value


def add_locale_to_links(text: str, locale: str) -> str:
    """Puts the prefix of the locale into the links that point at the site."""
    if locale == DEFAULT_LOCALE:
        return text
    return INTERNAL_LINK.sub(lambda match: f'href="/{locale}{match.group(1)}"', text)


def fix_import_path(line: str) -> str:
    """Points an import at the same file from one folder deeper.

    A guide in a language folder sits one folder deeper than the English
    one, so "../" has to become "../../../" for the import to find the
    component it names.
    """
    return re.sub(
        r"from (['\"])(\.\./)",
        lambda match: "from " + match.group(1) + match.group(2) + "../",
        line,
    )


def is_jsx_line(line: str) -> bool:
    """Whether a line is a component the reader never sees."""
    return bool(JSX_LINE.match(line)) and not INLINE_ANCHOR_LINE.match(line)


# The marker at the start of a piece: a list bullet, a number, a heading, a
# quote. The whitespace in front of it belongs to the block above, and the
# blank line under an import is part of it.
PIECE_MARKER = re.compile(r"(\s*(?:[-*+]|\d+\.|#+\s|>)\s*)")


def split_marker(piece: str) -> tuple[str, str]:
    """The text that opens a piece, and the piece under it.

    The text that opens a piece is the marker of a list or a heading, and
    the whitespace in front of it. The whitespace is the blank line that
    stands between an import and the text under it, and MDX does not parse
    the page without it.
    """
    space = re.match(r"\s*", piece).group(0)
    rest = piece[len(space) :]
    marker = re.match(r"(?:[-*+]|\d+\.|#+\s|>)\s*", rest)
    if marker:
        return space + marker.group(0), rest[len(marker.group(0)) :]
    return space, rest


def split_frontmatter(text: str) -> tuple[str, str]:
    """Splits an MDX file into its frontmatter and its body."""
    if not text.startswith("---\n"):
        raise ValueError("the file has no frontmatter")
    end = text.index("\n---\n", 3)
    return text[4:end], text[end + 5 :]


def body_blocks(body: str) -> list[list[str]]:
    """Cuts a body into blocks of lines that share one treatment."""
    blocks: list[list[str]] = []
    current: list[str] = []
    in_fence = False
    for line in body.split("\n"):
        if FENCE_LINE.match(line):
            in_fence = not in_fence
            current.append(line)
            continue
        if in_fence:
            current.append(line)
            continue
        if is_jsx_line(line) or IMPORT_LINE.match(line):
            if current:
                blocks.append(current)
                current = []
            blocks.append([line])
            continue
        if TABLE_LINE.match(line):
            if current:
                blocks.append(current)
                current = []
            blocks.append([line])
            continue
        current.append(line)
    if current:
        blocks.append(current)
    return blocks


def is_table(block: list[str]) -> bool:
    return bool(block) and TABLE_LINE.match(block[0]) is not None


def split_row(line: str) -> tuple[str, list[str]]:
    """Splits a table row into its indent and its cells."""
    indent = re.match(r"\s*", line).group(0)
    stripped = line.strip()
    if stripped.endswith("|"):
        stripped = stripped[:-1]
    return indent, stripped.split("|")


def translatable_cell(cell: str) -> bool:
    """Whether a table cell holds words, and so needs a translation.

    A cell that holds only a number, a percentage or a currency amount is the
    same in every language. Translating it only gives the model a chance to
    reformat it, and a table that mixes "7.000%" with "7,186%" reads as a
    mistake.
    """
    return len(re.findall(r"[A-Za-z\u00C0-\u024F\u0400-\u04FF\u4E00-\u9FFF\u0600-\u06FF]", cell)) >= 2


# A line that starts a list item. The marker of a list item is the one thing
# in a piece of prose that has to stay at the start of a line: a list item
# that shares a line with the text before it is not a list item any more.
LIST_ITEM = re.compile(r"^([-*+]|\d+\.|>)\s+")


def _flow(text: str, width: int, first: int, rest: int) -> list[str]:
    """Lays a piece of text out in lines of at most `width` columns.

    The first line carries the marker of a list item and the lines under it
    carry the indent that keeps the rest of the item inside it, so the two
    take their room from the width.
    """
    words = text.split()
    if not words:
        return []
    lines: list[str] = []
    current = ""
    budget = width - first
    for word in words:
        if current and len(current) + 1 + len(word) > budget:
            lines.append(current)
            current = word
            budget = width - rest
        else:
            current = word if not current else current + " " + word
    lines.append(current)
    return lines


def _join_expressions(lines: list[str]) -> list[str]:
    """Puts a line that continues an expression back with the line above it.

    A line that begins with a marker while the line above it left a bracket
    open is not a list item: it is the rest of a formula, and markdown would
    read it as a bullet. "(1\n+ r) ng kontribusyon" is one expression, and it
    has to stay on one line.
    """
    out: list[str] = []
    balance = 0
    for line in lines:
        if out and balance > 0 and LIST_ITEM.match(line):
            out[-1] = out[-1] + " " + line
            balance = max(0, balance + line.count("(") - line.count(")"))
            continue
        out.append(line)
        balance = max(0, balance + line.count("(") - line.count(")"))
    return out


def wrap(text: str, width: int = 80, locale: str = "en") -> str:
    """Wraps a paragraph the way the English files are wrapped.

    The leading whitespace is kept. It is not decoration: the blank line
    under an import is what tells MDX that the import is a statement of its
    own, and without it the page does not parse. The list marker at the
    start of a line is kept for the same reason.

    The lines of the answer are the lines of the English source, because the
    model keeps them. They are gathered here into the blocks they belong to:
    a list keeps its items, and a paragraph keeps its text. A piece that was
    flattened into a single line lost the items of every list on the page.

    A line is broken at a space and nowhere else. Chinese writes no space
    between the words of a sentence, so the line break that came from the
    English source would stand in the middle of a Chinese phrase, and a line
    break inside a paragraph is a space once the page is rendered. The lines
    of such a paragraph are joined instead.
    """
    stripped = text.strip()
    if not stripped:
        return text
    leading = text[: len(text) - len(text.lstrip())]
    # The newline that stands between two blocks is not part of the line.
    indent = len(leading.rstrip("\n"))
    separator = "" if locale in NO_SPACE_LANGUAGES else " "

    blocks: list[list[str]] = []
    current: list[str] = []
    # A line that starts with a marker is a continuation of the formula when
    # the line above it left a bracket open: "(1\n+ r) ng kontribusyon" is
    # one expression, and a list item would break it in two.
    open_brackets = 0
    for line in stripped.split("\n"):
        if LIST_ITEM.match(line) and open_brackets <= 0:
            if current:
                blocks.append(current)
            current = [line]
        else:
            current.append(line)
        open_brackets = max(0, open_brackets + line.count("(") - line.count(")"))
    if current:
        blocks.append(current)

    out: list[str] = []
    for block in blocks:
        first_line = block[0]
        marker = LIST_ITEM.match(first_line)
        if marker:
            head = marker.group(0)
            body = [first_line[len(head) :]] + block[1:]
            rest = " " * (indent + len(head))
        else:
            body = block
            head = ""
            rest = " " * indent
        prefix = (leading if not out else "") + head
        text_block = separator.join(line.strip() for line in body)
        lines = _join_expressions(_flow(text_block, width, len(prefix), len(rest)))
        if not lines:
            out.append(prefix.rstrip())
            continue
        rendered = [prefix + lines[0]]
        rendered.extend(rest + line for line in lines[1:])
        out.append("\n".join(rendered))
    return "\n".join(out)


class GuideTranslator:
    """Translates the guides of one language, a batch of pieces at a time."""

    def __init__(self, locale: str, translator: Translator):
        self.locale = locale
        self.translator = translator

    def translate_prose(self, text: str) -> str:
        """Translates one paragraph, keeping its markdown intact."""
        if not text.strip():
            return text
        guarded, saved = protect(text, PROSE_PATTERNS)
        result = self.translator.translate_list(
            [guarded], self.locale, context=CONTEXT
        )[0]
        return restore(result, saved)

    # ------------------------------------------------------------ batching
    def collect(self, path: Path) -> dict:
        """Reads a guide and works out what has to be translated.

        The result holds the frontmatter, the blocks of the body and the list
        of the pieces that still need a translation.
        """
        text = path.read_text(encoding="utf-8")
        front_raw, body = split_frontmatter(text)
        front = yaml.safe_load(front_raw)

        pieces: list[str] = []
        front_pieces: list[str] = []
        front_pieces.append(front.get("title", ""))
        front_pieces.append(front.get("description", ""))
        for item in front.get("faq", []) or []:
            front_pieces.append(item.get("q", ""))
            front_pieces.append(item.get("a", ""))
        for item in front.get("sources", []) or []:
            front_pieces.append(item.get("label", ""))

        blocks = body_blocks(body)
        # Every translatable piece of prose, in the order they appear.
        prose_pieces: list[str] = []
        for block in blocks:
            if len(block) == 1 and (is_jsx_line(block[0]) or IMPORT_LINE.match(block[0])):
                continue
            if is_table(block):
                for line in block:
                    _, cells = split_row(line)
                    if all(re.fullmatch(r":?-{2,}:?", c.strip()) for c in cells if c.strip()):
                        continue
                    for cell in cells:
                        core = cell.strip()
                        if core and translatable_cell(core):
                            prose_pieces.append(core)
                continue
            text_block = "\n".join(block)
            for piece in re.split(r"(\n\s*\n)", text_block):
                if not piece.strip():
                    continue
                marker = PIECE_MARKER.match(piece)
                prefix = marker.group(1) if marker else ""
                prose_pieces.append(piece[len(prefix) :])

        return {
            "path": path,
            "front": front,
            "front_pieces": front_pieces,
            "blocks": blocks,
            "prose_pieces": prose_pieces,
        }

    def _translate_pieces(self, texts: list[str]) -> list[tuple[str, list[str]]]:
        """Translates a list of pieces, with the markdown held out of harm's way.

        The markdown is hidden behind markers before the text goes out and put
        back after it comes in. Doing this for the whole list at once is what
        makes the batch possible: the protection is per piece, not per call.

        The answer comes back with the markers still in it. The text is
        wrapped into lines afterwards, and a line break inside a tag breaks
        the tag in two, so the markup is put back at the very end.
        """
        guarded: list[str] = []
        saved: list[list[str]] = []
        for text in texts:
            if not text.strip():
                guarded.append(text)
                saved.append([])
                continue
            if is_formula(text):
                # A formula is the same in every language: the letters in it
                # stand for the numbers the reader types in.
                guarded.append(text)
                saved.append([])
                continue
            hidden, parts = protect(text, PROSE_PATTERNS)
            guarded.append(hidden)
            saved.append(parts)
        results = self.translator.translate_list(guarded, self.locale, context=CONTEXT)
        return list(zip(results, saved))

    def translate_batch(self, guides: list[dict]) -> None:
        """Translates every piece of every guide in one batch."""
        front_texts: list[str] = []
        prose_texts: list[str] = []
        for guide in guides:
            front_texts.extend(guide["front_pieces"])
            prose_texts.extend(guide["prose_pieces"])

        # The frontmatter and the prose are translated separately: the pieces
        # are of different kinds, and a batch of one kind reads better.
        front_results = self._translate_pieces(front_texts)
        prose_results = self._translate_pieces(prose_texts)

        front_cursor = 0
        prose_cursor = 0
        for guide in guides:
            guide["front_results"] = front_results[
                front_cursor : front_cursor + len(guide["front_pieces"])
            ]
            front_cursor += len(guide["front_pieces"])
            guide["prose_results"] = prose_results[
                prose_cursor : prose_cursor + len(guide["prose_pieces"])
            ]
            prose_cursor += len(guide["prose_pieces"])

    def write(self, guide: dict) -> Path:
        """Puts the translation back into the guide and writes the file."""
        front = guide["front"]
        results = guide["front_results"]
        cursor = 0

        def take() -> str:
            nonlocal cursor
            text, parts = results[cursor]
            cursor += 1
            return restore(text, parts)

        front["title"] = take()
        front["description"] = take()
        for item in front.get("faq", []) or []:
            item["q"] = take()
            item["a"] = take()
        for item in front.get("sources", []) or []:
            item["label"] = take()
        front["locale"] = self.locale

        results = guide["prose_results"]
        cursor = 0

        def next_prose() -> tuple[str, list[str]]:
            nonlocal cursor
            value = results[cursor]
            cursor += 1
            return value

        rendered_blocks: list[str] = []
        for block in guide["blocks"]:
            if len(block) == 1 and (is_jsx_line(block[0]) or IMPORT_LINE.match(block[0])):
                if IMPORT_LINE.match(block[0]):
                    # The guide in a language folder sits one folder deeper
                    # than the English one, so the import has to climb one
                    # folder higher to find the same file.
                    rendered_blocks.append(fix_import_path(block[0]))
                else:
                    rendered_blocks.append(block[0])
                continue
            if is_table(block):
                rows: list[str] = []
                for line in block:
                    indent, cells = split_row(line)
                    if all(re.fullmatch(r":?-{2,}:?", c.strip()) for c in cells if c.strip()):
                        rows.append(line)
                        continue
                    translated: list[str] = []
                    for cell in cells:
                        if not cell.strip():
                            translated.append(cell)
                            continue
                        if not translatable_cell(cell.strip()):
                            # A number is the same in every language, and a
                            # translator that formats it in the local way
                            # makes the table inconsistent with itself.
                            translated.append(cell)
                            continue
                        lead = re.match(r"\s*", cell).group(0)
                        trail = re.search(r"\s*$", cell).group(0)
                        core = cell[len(lead) : len(cell) - len(trail)] if trail else cell[len(lead) :]
                        text, parts = next_prose()
                        translated.append(lead + restore(text, parts) + trail)
                    rows.append(indent + "|".join(translated) + "|")
                rendered_blocks.append("\n".join(rows))
                continue

            text_block = "\n".join(block)
            pieces = re.split(r"(\n\s*\n)", text_block)
            rendered: list[str] = []
            for piece in pieces:
                if not piece.strip():
                    rendered.append(piece)
                    continue
                prefix, _ = split_marker(piece)
                # The marker and the whitespace in front of it come from the
                # source, not from the answer: the model trims the text it
                # returns, and the blank line under an import is lost with it.
                text, parts = next_prose()
                wrapped = wrap(prefix + text.strip(), 80, self.locale)
                rendered.append(restore(wrapped, parts))
            # The pieces carry the blank line that stands between them, so
            # they are joined without one.
            rendered_blocks.append("".join(rendered))

        body = "\n".join(rendered_blocks)
        body = add_locale_to_links(body, self.locale)
        header = yaml.dump(
            quote_values(front),
            Dumper=_FrontmatterDumper,
            allow_unicode=True,
            sort_keys=False,
            default_flow_style=False,
            width=10000,
        )
        out_path = GUIDES / self.locale / guide["path"].name
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(f"---\n{header}---\n{body}", encoding="utf-8")
        return out_path


def purge_wrong(translator: Translator, guides: list[dict], locale: str) -> None:
    """Drops the cached translations that came back wrong.

    A piece the model handed back in English, or a piece it mixed another
    language into, is cached like any other result. Without this the bad
    answer would never be asked again, and the guide would keep it for good.
    """
    from gemini_translate import bad_cached

    removed = 0
    for guide in guides:
        for piece in list(guide["front_pieces"]) + list(guide["prose_pieces"]):
            if not piece.strip():
                continue
            guarded, _ = protect(piece, PROSE_PATTERNS)
            path = translator._cache_path(locale, guarded, CONTEXT)
            if not path.exists():
                continue
            cached = path.read_text(encoding="utf-8")
            if bad_cached(guarded, cached, locale):
                path.unlink()
                removed += 1
    if removed:
        print(f"{locale}: dropped {removed} wrong pieces from the cache")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--locale", required=True)
    parser.add_argument("--batch", type=int, default=15)
    parser.add_argument("--backend", default="minimax", choices=["minimax", "gemini"])
    args = parser.parse_args()

    translator = Translator(batch_size=args.batch, backend=args.backend)
    guide_translator = GuideTranslator(args.locale, translator)

    sources = sorted(p for p in GUIDES.glob("*.mdx"))
    print(f"{args.locale}: {len(sources)} guides")

    guides = [guide_translator.collect(source) for source in sources]
    purge_wrong(translator, guides, args.locale)
    guide_translator.translate_batch(guides)

    for guide in guides:
        out = guide_translator.write(guide)
        print(f"  {guide['path'].name} -> {out.relative_to(ROOT)}")

    print("stats:", translator.stats)
    return 0


if __name__ == "__main__":
    sys.exit(main())
