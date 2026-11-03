#!/usr/bin/env python3
"""Puts a corrected translation into the cache.

The translation pipeline writes what the model gave it. When a sentence turns
out to be wrong — a directive the English does not have, a superlative the
English does not have — the fix has to go into the cache as well, or the next
run asks the model again and gets the same sentence back.

This script walks the pieces of one guide, looks at what the cache holds for
them, finds the piece whose translation holds the text, replaces the text
inside it, and writes the corrected translation back.

Usage:
    python3 scripts/patch_translation.py --locale zh \\
        --guide how-to-read-an-amortization-schedule \\
        --find "下降最快的部分" --replace "陡峭的部分"
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GUIDES = ROOT / "src" / "content" / "guides"

sys.path.insert(0, str(ROOT.parent / "tools"))
sys.path.insert(0, str(ROOT / "scripts"))

from gemini_translate import Translator, protect, restore  # noqa: E402

import translate_guides as tg  # noqa: E402


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--locale", required=True)
    parser.add_argument("--guide", required=True)
    parser.add_argument("--find", required=True)
    parser.add_argument("--replace", required=True)
    parser.add_argument("--backend", default="minimax")
    args = parser.parse_args()

    translator = Translator(batch_size=15, backend=args.backend)
    guide_translator = tg.GuideTranslator(args.locale, translator)
    guide = guide_translator.collect(GUIDES / f"{args.guide}.mdx")

    pieces = list(guide["front_pieces"]) + list(guide["prose_pieces"])
    hits = 0
    for piece in pieces:
        if not piece.strip():
            continue
        guarded, saved = protect(piece, tg.PROSE_PATTERNS)
        path = translator._cache_path(args.locale, guarded, tg.CONTEXT)
        if not path.exists():
            continue
        cached = path.read_text(encoding="utf-8")
        if args.find not in cached:
            continue
        hits += 1
        fixed = cached.replace(args.find, args.replace)
        path.write_text(fixed, encoding="utf-8")
        shown = restore(fixed, saved)
        print(f"patched {path.name}")
        print(f"    {shown[:160]}")

    if hits == 0:
        print(f"no cached piece holds {args.find!r}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
