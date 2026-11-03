#!/usr/bin/env python3
"""Shortens the guide titles that are too long for a search result.

A page title is kept under sixty characters so that a search result shows it
whole. The English titles were written to that rule, and the Russian and
Spanish ones were written to it as well. A machine translation tends to run
longer than the English it came from, so some of the new languages need their
titles cut down.

The wording is not changed here: the model is asked for a shorter title that
still says the same thing, and the frontmatter is rewritten with it.

Usage:
    python3 scripts/fix_guide_titles.py [locale ...]
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

import yaml

sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent / "tools"))

from gemini_translate import Translator  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
from translate_guides import CONTEXT  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
GUIDES = ROOT / "src" / "content" / "guides"

TITLE_MAX = 60
TITLE_MIN = 10
DESCRIPTION_MAX = 200
DESCRIPTION_MIN = 60


def display_length(text: str) -> int:
    """The length of a string in the units a search result is measured in.

    A Chinese or Korean glyph is square and carries about as much as two Latin
    letters, so a wide glyph counts double. The same measure is used by the
    content schema, and the two have to agree: a title this script calls too
    long is a title the build would refuse.
    """
    length = 0
    for character in text:
        code = ord(character)
        wide = (
            0x1100 <= code <= 0x115F
            or 0x2E80 <= code <= 0xA4CF
            or 0xAC00 <= code <= 0xD7A3
            or 0xF900 <= code <= 0xFAFF
            or 0xFE30 <= code <= 0xFE4F
            or 0xFF00 <= code <= 0xFF60
            or 0xFFE0 <= code <= 0xFFE6
        )
        length += 2 if wide else 1
    return length

LANGUAGE_NAMES = {
    "en": "English",
    "ru": "Russian",
    "es": "Spanish",
    "zh": "Simplified Chinese",
    "ko": "Korean",
    "vi": "Vietnamese",
    "pt": "Brazilian Portuguese",
    "ar": "Modern Standard Arabic",
    "tl": "Tagalog",
    "uk": "Ukrainian",
}


def split_frontmatter(text: str) -> tuple[str, str]:
    end = text.index("\n---\n", 3)
    return text[4:end], text[end + 5 :]


def english_frontmatter(name: str) -> dict:
    """The English title and description of a guide.

    The cache is keyed by the English string, so a shortened title has to be
    written under the key of the English one. Without that the next
    translation run asks the model again and puts the long title back.
    """
    path = GUIDES / name
    if not path.exists():
        return {}
    text = path.read_text(encoding="utf-8")
    front_raw, _ = split_frontmatter(text)
    front = yaml.safe_load(front_raw) or {}
    return {"title": front.get("title", ""), "description": front.get("description", "")}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("locales", nargs="*", default=[])
    parser.add_argument("--backend", default="minimax", choices=["minimax", "gemini"])
    args = parser.parse_args()

    translator = Translator(batch_size=8, backend=args.backend)

    locales = args.locales or [
        d.name for d in sorted(GUIDES.iterdir()) if d.is_dir()
    ]

    for locale in locales:
        folder = GUIDES / locale
        if not folder.is_dir():
            continue
        # The fields that have a length rule, and the window each one has.
        fields = [("title", TITLE_MIN, TITLE_MAX), ("description", DESCRIPTION_MIN, DESCRIPTION_MAX)]
        todo: list[tuple[Path, str, str, int, int]] = []
        for path in sorted(folder.glob("*.mdx")):
            text = path.read_text(encoding="utf-8")
            front_raw, _ = split_frontmatter(text)
            front = yaml.safe_load(front_raw)
            for field, low, high in fields:
                value = front.get(field, "")
                if not low <= display_length(value) <= high:
                    todo.append((path, field, value, low, high))

        if not todo:
            print(f"{locale}: every title and description fits")
            continue

        print(f"{locale}: {len(todo)} field(s) to fit")
        for field, low, high in fields:
            group = [item for item in todo if item[1] == field]
            if not group:
                continue
            question = (
                f"Rewrite each of these page {field}s so that it is at most "
                f"{high} characters long and at least {low}. Count a Chinese or "
                f"Korean character as two, and a Latin character as one. Keep the "
                f"meaning, keep it in "
                f"{LANGUAGE_NAMES.get(locale, locale)}"
                + (", and keep it a title: no full stop at the end" if field == "title" else "")
                + ". Reply with a JSON array of the same length and order, and "
                "nothing else.\n\n"
                + json.dumps([item[2] for item in group], ensure_ascii=False)
            )
            answer = translator.ask(question)
            start, end = answer.find("["), answer.rfind("]")
            if start == -1 or end == -1:
                print(f"  {field}: the model did not answer with a list")
                continue
            try:
                values = json.loads(answer[start : end + 1])
            except json.JSONDecodeError:
                print(f"  {field}: the answer was not JSON")
                continue

            for (path, name, old, low, high), new in zip(group, values):
                if not isinstance(new, str) or not low <= display_length(new) <= high:
                    print(f"  {path.name}: kept the old {name}")
                    continue
                text = path.read_text(encoding="utf-8")
                front_raw, body = split_frontmatter(text)
                front = yaml.safe_load(front_raw)
                front[name] = new
                header = yaml.safe_dump(
                    front,
                    allow_unicode=True,
                    sort_keys=False,
                    default_flow_style=False,
                    width=10000,
                )
                path.write_text(f"---\n{header}---\n{body}", encoding="utf-8")
                # The shortened title also goes into the cache, under the key
                # of the English one. Otherwise the next translation run asks
                # the model again and puts the long title back.
                source = english_frontmatter(path.name).get(name)
                if source:
                    cache = translator._cache_path(locale, source, CONTEXT)
                    cache.write_text(new, encoding="utf-8")
                print(f"  {path.name} {name}: {display_length(old)} -> {display_length(new)}")

    print("stats:", translator.stats)
    return 0


if __name__ == "__main__":
    sys.exit(main())
