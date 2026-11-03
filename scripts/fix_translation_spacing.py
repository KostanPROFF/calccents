#!/usr/bin/env python3
"""Fixes the two mechanical faults a machine translation leaves behind.

The first is the percentage. The English source writes "7 percent", and the
model keeps the word "percent" because the context tells it to keep every
unit as it is. In a language that writes a percentage with the symbol, the
word is not a unit but an untranslated English word: "7 percent" in Chinese
reads as an English phrase in the middle of a Chinese sentence.

The second is the missing space. A model that switches between two scripts
sometimes joins them: "заcompound interest" in Ukrainian, "有时" in Arabic.
The words are right and only the space is missing.

Usage:
    python3 scripts/fix_translation_spacing.py zh ko vi ar tl uk
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GUIDES = ROOT / "src" / "content" / "guides"
UI = ROOT / "src" / "i18n" / "ui"

# The languages that write a percentage with the symbol.
SYMBOL_PERCENT = {"zh", "ko", "vi", "ar", "tl", "uk"}

PERCENT = re.compile(r"(\d(?:[\d.,]*\d)?)\s+percent\b")

# A word of one script right after a word of another, with no space between.
SCRIPT_GAP = re.compile(
    r"(?<=[Ѐ-ӿ一-鿿぀-ヿ])"
    r"(?=[A-Za-z])"
    r"|"
    r"(?<=[A-Za-z])"
    r"(?=[Ѐ-ӿ一-鿿぀-ヿ])"
)

# Korean writes the particle right after the Latin word it belongs to: "PMI는",
# "P는". A space there breaks the grammar, so the rule leaves Korean alone.
NO_SCRIPT_GAP = {"ko"}


def fix(text: str, locale: str) -> tuple[str, int, int]:
    """Returns the fixed text and the two counts."""
    percent = 0
    spacing = 0
    if locale in SYMBOL_PERCENT:
        percent = len(PERCENT.findall(text))
        text = PERCENT.sub(r"\1%", text)
    if locale not in NO_SCRIPT_GAP:
        spacing = len(SCRIPT_GAP.findall(text))
        text = SCRIPT_GAP.sub(" ", text)
    return text, percent, spacing


def main() -> int:
    locales = sys.argv[1:] or sorted(d.name for d in GUIDES.iterdir() if d.is_dir())

    for locale in locales:
        percent = 0
        spacing = 0

        folder = GUIDES / locale
        if folder.is_dir():
            for path in sorted(folder.glob("*.mdx")):
                text = path.read_text(encoding="utf-8")
                fixed, p, s = fix(text, locale)
                percent += p
                spacing += s
                if fixed != text:
                    path.write_text(fixed, encoding="utf-8")

        dictionary = UI / f"{locale}.ts"
        if dictionary.exists():
            text = dictionary.read_text(encoding="utf-8")
            fixed, p, s = fix(text, locale)
            percent += p
            spacing += s
            if fixed != text:
                dictionary.write_text(fixed, encoding="utf-8")

        print(f"{locale}: {percent} percentages, {spacing} missing spaces")

    return 0


if __name__ == "__main__":
    sys.exit(main())
