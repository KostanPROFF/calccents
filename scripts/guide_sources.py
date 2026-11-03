#!/usr/bin/env python3
"""Writes the English source strings of the guides to a JSON file.

The purge script compares a cached translation with the string it came from,
and that comparison needs the source. This writes the sources of every guide
in the same order the translator uses them, so the two agree on what a piece
is.

Usage:
    python3 scripts/guide_sources.py > /tmp/guide-sources.json
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from translate_guides import GuideTranslator, GUIDES  # noqa: E402


def main() -> int:
    translator = GuideTranslator("en", None)
    pieces: list[str] = []
    for source in sorted(GUIDES.glob("*.mdx")):
        guide = translator.collect(source)
        pieces.extend(guide["front_pieces"])
        pieces.extend(guide["prose_pieces"])
    json.dump(pieces, sys.stdout, ensure_ascii=False)
    return 0


if __name__ == "__main__":
    sys.exit(main())
