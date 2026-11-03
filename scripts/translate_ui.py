#!/usr/bin/env python3
"""Translates a Calccents UI dictionary into one language.

The dictionaries are TypeScript object literals with a thousand-odd strings
each. The pipeline is:

    extract-ui-strings.mjs  ->  leaves.json      (paths and positions)
    this script             ->  <locale>-ui.json  (the translations)
    build-locale-dictionary.mjs -> <locale>.ts    (the finished file)

Two things need care. Proper nouns — the author's name, a source label that is
a name — must stay as they are, so the Russian and Spanish dictionaries are
used as a cross-reference: a string that is the same in English, Russian and
Spanish is a name or a URL, not a sentence, and is left alone. And the plural
helpers are not strings at all: they are functions that pick a word form, and
each language has its own rule for that.

Usage:
    python3 scripts/translate_ui.py --locale zh --out translations/zh-ui.json
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent / "tools"))

from gemini_translate import BORROWED_BY_LANGUAGE, Translator, is_formula  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
UI_DIR = ROOT / "src" / "i18n" / "ui"

# The name of each language in that language, written by hand because the
# switcher shows it next to the flag and a machine translation is not the
# name a speaker would recognise.
LOCALE_NAMES = {
    "zh": "中文",
    "ko": "한국어",
    "vi": "Tiếng Việt",
    "pt": "Português",
    "ar": "العربية",
    "tl": "Tagalog",
    "uk": "Українська",
}

# The name of each language in English, used when a question has to name the
# language it is asking about.
LANGUAGE_NAMES = {
    "zh": "Simplified Chinese",
    "ko": "Korean",
    "vi": "Vietnamese",
    "pt": "Brazilian Portuguese",
    "ar": "Modern Standard Arabic",
    "tl": "Tagalog",
    "uk": "Ukrainian",
}

# How each language counts. `none` means the language does not mark a plural
# at all, `one_other` the English rule, `slavic` the Russian rule, `arabic`
# the six-category rule.
PLURAL_KIND = {
    "zh": "none",
    "ko": "none",
    "vi": "none",
    "pt": "one_other",
    "tl": "one_other",
    "uk": "slavic",
    "ar": "arabic",
}

# The plural helpers in the dictionary and the noun each one counts.
PLURAL_NOUNS = {
    "en.ui.guidesCount": "guide (a written guide on the site)",
    "en.tool.mortgage-payment.terms.years": "year (a term of a mortgage)",
    "en.tool.rent-vs-buy.terms.years": "year (a period of time)",
}

# Words the language itself uses in English. Portuguese says "site" and
# "newsletter", the Philippines says "down payment" and "rate", and the two
# ways of clearing debt are called the avalanche and the snowball method
# everywhere. A translator that leaves these alone is right, so they are not
# asked again: asking costs a request on every run and still puts the English
# on the page.
ALLOWED_UNCHANGED = BORROWED_BY_LANGUAGE

CONTEXT = (
    "User-visible strings from a US personal-finance calculator website: "
    "mortgage, rent-versus-buy, compound interest, take-home pay, federal "
    "income tax and debt payoff calculators, plus guides and a privacy policy. "
    "Write plain, direct financial prose. Use the American conventions for "
    "money, dates and units, but translate the wording itself. Keep the "
    "second person singular. The tone is factual: the site shows the "
    "arithmetic behind a number and never tells the reader what to do."
)


def extract(dictionary: str) -> dict:
    """Runs the TypeScript extractor over one dictionary file."""
    result = subprocess.run(
        ["node", str(ROOT / "scripts" / "extract-ui-strings.mjs"), str(UI_DIR / dictionary)],
        cwd=ROOT,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        raise SystemExit(result.stderr.strip())
    return json.loads(result.stdout)


def leaves_by_path(payload: dict) -> dict:
    """Keys with the language prefix, the way the dictionary is written.

    The key matches the one the dictionary builder looks up, so the English
    path is the key the translation is stored under.
    """
    return {
        leaf["path"][0] + "." + ".".join(leaf["path"][1:]) if len(leaf["path"]) > 1 else leaf["path"][0]: leaf
        for leaf in payload["leaves"]
    }


def leaves_by_key(payload: dict) -> dict:
    """Keys without the language prefix, so the three languages line up.

    The path of a leaf starts with the name of the exported object — `en`,
    `ru`, `es` — and that name is different in every file. Comparing the
    paths as they are therefore finds nothing at all, and the cross
    reference between the three languages never worked.
    """
    return {comparable_path(leaf["path"]): leaf for leaf in payload["leaves"]}


def comparable_path(path: list[str]) -> str:
    """The path of a leaf with the language prefix taken off."""
    return ".".join(path[1:]) if len(path) > 1 else path[0]


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--locale", required=True, nargs="+", choices=sorted(LOCALE_NAMES))
    parser.add_argument("--out", required=True, help="the output file, or a directory")
    parser.add_argument("--batch", type=int, default=15)
    parser.add_argument("--backend", default="minimax", choices=["minimax", "gemini"])
    args = parser.parse_args()

    for locale in args.locale:
        translate_locale(locale, args.out, args.batch, args.backend)
    return 0


def translate_locale(locale: str, out: str, batch: int, backend: str = "minimax") -> None:
    english = extract("en.ts")
    russian = extract("ru.ts")
    spanish = extract("es.ts")

    en_leaves = leaves_by_path(english)
    ru_leaves = leaves_by_key(russian)
    es_leaves = leaves_by_key(spanish)

    # A string that reads the same in all three languages is a name, a URL or
    # a code, not something to translate.
    keep_verbatim = set()
    for key, leaf in en_leaves.items():
        if leaf["kind"] != "string":
            continue
        text = leaf["text"]
        cross = comparable_path(leaf["path"])
        ru = ru_leaves.get(cross)
        es = es_leaves.get(cross)
        if ru and es and ru["kind"] == "string" and es["kind"] == "string":
            if ru["text"] == text and es["text"] == text:
                keep_verbatim.add(key)

    translator = Translator(batch_size=batch, backend=backend)
    translations: dict[str, str] = {}

    allowed = ALLOWED_UNCHANGED.get(locale, set())

    pending: list[tuple[str, str]] = []
    for key, leaf in en_leaves.items():
        if leaf["kind"] != "string":
            continue
        text = leaf["text"]
        if not text.strip():
            translations[key] = text
            continue
        if key in keep_verbatim:
            translations[key] = text
            continue
        # A word the language uses in English. The model leaves it alone and
        # that is the right answer, so it is not asked again: asking costs a
        # request every run and puts the English on the page all the same.
        if text in allowed:
            translations[key] = text
            continue
        # The name of the language in that language is written by hand: a
        # machine translation of "English" into Chinese is "英语", which is the
        # name of the wrong language.
        if key == "en.localeName":
            continue
        # A formula is the same in every language. The letters in it stand for
        # the numbers the reader types in, and translating them changes the
        # arithmetic, so they are carried over as they are.
        if is_formula(text):
            translations[key] = text
            continue
        pending.append((key, text))

    print(
        f"{locale}: {len(pending)} strings to translate, "
        f"{len(keep_verbatim)} kept as they are, {len(allowed)} left in English"
    )

    # A string the model handed back in English is dropped from the cache
    # first, so it is translated properly this time.
    purge_unchanged(translator, [text for _, text in pending], locale, CONTEXT)

    translated = translator.translate_list(
        [text for _, text in pending], locale, context=CONTEXT
    )
    for (key, source_text), result in zip(pending, translated):
        translations[key] = result

    # The name of the language in that language.
    translations["en.localeName"] = LOCALE_NAMES[locale]

    # The comments, which the Russian and Spanish files carry in their own
    # language as well.
    comment_texts = [comment["text"] for comment in english["comments"]]
    comment_results = translator.translate_list(
        comment_texts, locale, context="Source-code comments for the same file."
    )
    comments = {str(i): text for i, text in enumerate(comment_results)}

    plurals = build_plurals(locale, translator)

    out_path = Path(out)
    if out_path.suffix != ".json":
        out_path = out_path / f"{locale}-ui.json"
    elif "{locale}" in out_path.name:
        out_path = out_path.with_name(out_path.name.replace("{locale}", locale))
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(
        json.dumps(
            {"strings": translations, "comments": comments, "plurals": plurals},
            ensure_ascii=False,
            indent=1,
        ),
        encoding="utf-8",
    )
    print(f"wrote {out_path}: {len(translations)} strings, {len(comments)} comments, {len(plurals)} plural helpers")
    print("stats:", translator.stats)


def purge_unchanged(translator: Translator, sources: list[str], locale: str, context: str) -> None:
    """Drops the cached translations that came back wrong.

    Two kinds are dropped: a string the model handed back in English, and a
    string the model mixed another language into. Both are cached like any
    other result, so without this they would never be tried again.
    """
    from gemini_translate import bad_cached, looks_like_prose

    removed = 0
    for source in sources:
        if not looks_like_prose(source):
            continue
        path = translator._cache_path(locale, source, context)
        if not path.exists():
            continue
        cached = path.read_text(encoding="utf-8")
        if bad_cached(source, cached, locale):
            path.unlink()
            removed += 1
    if removed:
        print(f"{locale}: dropped {removed} wrong strings from the cache")


def build_plurals(locale: str, translator: Translator) -> dict:
    """The plural helpers, written for the rules of the target language."""
    kind = PLURAL_KIND[locale]
    language = LANGUAGE_NAMES[locale]

    def ask(question: str) -> str:
        return translator.ask(question, context="Short label for a number of items.")

    if kind == "none":
        # The language does not mark a plural, so one word form serves every
        # count. The form asked for is the one a reader expects to see.
        questions = [
            f"How do you write the singular of {noun} in {language}, as it would follow "
            f"the number in a short label such as \"5 {noun}\"? Reply with the word only, "
            f"and nothing else."
            for noun in PLURAL_NOUNS.values()
        ]
        out = {}
        for (key, _), raw in zip(PLURAL_NOUNS.items(), [ask(q) for q in questions]):
            word = raw.strip().strip('"').strip("'").split("\n")[0].strip()
            out[key] = "(n: number) => `${n} " + word + "`"
        return out

    if kind == "one_other":
        questions = [
            f"Give the two word forms of {noun} in {language}: the form used for exactly "
            f"one, and the form used for every other number. Reply with a JSON object with "
            f"the keys \"one\" and \"other\", and nothing else."
            for noun in PLURAL_NOUNS.values()
        ]
        out = {}
        for (key, _), raw in zip(PLURAL_NOUNS.items(), [ask(q) for q in questions]):
            forms = parse_json_object(raw)
            one = forms.get("one", "").strip().strip('"')
            other = forms.get("other", "").strip().strip('"')
            out[key] = (
                "(n: number) => `${n} ${n === 1 ? '"
                + one
                + "' : '"
                + other
                + "'}`"
            )
        return out

    if kind == "slavic":
        questions = [
            f"Give the three word forms of {noun} in {language}, following the rules of "
            f"Ukrainian grammar: the form used for numbers ending in 1 (except 11), the "
            f"form used for numbers ending in 2, 3 or 4 (except 12, 13, 14), and the "
            f"form used for every other number. Reply with a JSON object with the keys "
            f"\"one\", \"few\" and \"many\", and nothing else."
            for noun in PLURAL_NOUNS.values()
        ]
        out = {}
        for (key, _), raw in zip(PLURAL_NOUNS.items(), [ask(q) for q in questions]):
            forms = parse_json_object(raw)
            one = forms.get("one", "").strip().strip('"')
            few = forms.get("few", "").strip().strip('"')
            many = forms.get("many", "").strip().strip('"')
            out[key] = (
                "(n: number) => {\n"
                "      const mod10 = n % 10;\n"
                "      const mod100 = n % 100;\n"
                "      const word =\n"
                "        mod10 === 1 && mod100 !== 11\n"
                f"          ? '{one}'\n"
                "          : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)\n"
                f"            ? '{few}'\n"
                f"            : '{many}';\n"
                "      return `${n} ${word}`;\n"
                "    }"
            )
        return out

    # Arabic: six categories.
    questions = [
        f"Give the word forms of {noun} in {language} as they follow a count, following "
        f"the CLDR plural categories: \"zero\" for a count of 0, \"one\" for 1, \"two\" for "
        f"2, \"few\" for counts ending in 3 to 10, \"many\" for counts ending in 11 to 99, "
        f"and \"other\". Reply with a JSON object with those six keys, and nothing else."
        for noun in PLURAL_NOUNS.values()
    ]
    out = {}
    for (key, _), raw in zip(PLURAL_NOUNS.items(), [ask(q) for q in questions]):
        forms = parse_json_object(raw)
        get = lambda name: forms.get(name, "").strip().strip('"')  # noqa: E731
        out[key] = (
            "(n: number) => {\n"
            "      const mod100 = n % 100;\n"
            "      const word =\n"
            "        n === 0\n"
            f"          ? '{get('zero')}'\n"
            "          : n === 1\n"
            f"            ? '{get('one')}'\n"
            "            : n === 2\n"
            f"              ? '{get('two')}'\n"
            "              : mod100 >= 3 && mod100 <= 10\n"
            f"                ? '{get('few')}'\n"
            "                : mod100 >= 11 && mod100 <= 99\n"
            f"                  ? '{get('many')}'\n"
            f"                  : '{get('other')}';\n"
            "      return `${n} ${word}`;\n"
            "    }"
        )
    return out


def parse_json_object(raw: str) -> dict:
    text = raw.strip()
    if text.startswith("```"):
        text = text.split("```")[1]
        if text.lstrip().lower().startswith("json"):
            text = text.lstrip()[4:]
    start = text.find("{")
    end = text.rfind("}")
    if start == -1 or end == -1:
        return {}
    try:
        data = json.loads(text[start : end + 1])
    except json.JSONDecodeError:
        return {}
    return data if isinstance(data, dict) else {}


if __name__ == "__main__":
    sys.exit(main())
