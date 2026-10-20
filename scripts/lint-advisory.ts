#!/usr/bin/env node
/**
 * YMYL advisory-language linter.
 *
 * The site publishes calculations, not recommendations. A sentence that
 * tells the reader what to do is a defect, because it turns a checkable
 * figure into advice, and advice on a financial topic is the thing this
 * site has to avoid.
 *
 * The linter is deliberately sentence-scoped rather than word-scoped. Words
 * like "should", "best" and "worth" appear in perfectly legitimate
 * sentences — usually negated ones, such as "it does not tell you which
 * option is better" — and a naive word ban would produce noise rather than
 * signal. So a hit is only raised when the advisory pattern is not preceded
 * by a negation in the same sentence.
 *
 * The "worth" rules are narrowed to verdict shapes — "is worth it", "worth
 * buying", "is worth the risk". An earlier, broader version of the rule
 * matched any "is worth" and fired on epistemic uses such as "worth reading"
 * and "worth knowing", which are statements about the writing rather than
 * about the reader's money. A guardrail that cries wolf on every other
 * sentence stops being read, so the rule was narrowed and two option-verdict
 * rules added to keep the coverage on the cases that matter.
 *
 * Run: node scripts/lint-advisory.ts
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');

const DENY: { name: string; pattern: RegExp }[] = [
  { name: 'second-person directive', pattern: /\byou (?:should|must|need to|ought to|have to)\b/gi },
  { name: 'first-person recommendation', pattern: /\b(?:we|i) (?:recommend|advise|suggest|urge|insist)\b/gi },
  { name: 'worth-it verdict', pattern: /\b(?:is|are|was|were) worth (?:it|them|that|the (?:risk|money|price|cost|effort|trade|points))\b/gi },
  { name: 'worth-it verdict', pattern: /\bworth (?:buying|investing|purchasing|refinancing|renting|keeping)\b/gi },
  { name: 'option verdict', pattern: /\b(?:buying|renting|investing|refinancing|waiting) (?:is|would be) (?:the )?(?:better|best|smarter|safest|wisest)\b/gi },
  { name: 'option verdict', pattern: /\bthe (?:better|best) (?:option|choice|move) (?:is|would be)\b/gi },
  { name: 'best-option verdict', pattern: /\bthe best\b|\bbest option\b|\bbest choice\b|\bbest rate\b/gi },
  { name: 'must directive', pattern: /\bmust (?:buy|choose|pay|do|use|take|go)\b/gi },
  { name: 'avoid directive', pattern: /\bavoid (?:buying|investing|paying|leasing|renting|refinancing)\b/gi },
  { name: 'consider directive', pattern: /\bconsider (?:buying|investing|purchasing|switching|refinancing)\b/gi },
  { name: 'superlative claim', pattern: /\bthe (?:cheapest|fastest|greatest|safest)\b/gi },
  { name: 'advisory verb', pattern: /\badvise[sd]?\b/gi },
];

/**
 * A sentence containing one of these is making a statement, not a verdict.
 *
 * These are matched as whole words. An earlier version used plain substring
 * checks, which treated the "not" inside "another" and the "nor" inside
 * "honor" as negations — so a sentence that contained a violation could be
 * silently cleared by an unrelated word earlier in the same sentence.
 */
const NEGATIONS: RegExp[] = [
  /\bnot\b/,
  /\bn't\b/,
  /\bnever\b/,
  /\bcannot\b/,
  /\bno\b/,
  /\bwithout\b/,
  /\brather than\b/,
  /\binstead of\b/,
  /\bneither\b/,
  /\bnor\b/,
];

/** Whole phrases that are always a disclaimer, wherever they appear. */
const ALLOWED_PHRASES = [
  'not financial advice',
  'not a recommendation',
  'no recommendation',
  'not a prediction',
  'not a forecast',
  'not advice',
  'does not tell you',
  'do not tell you',
  'cannot tell you',
  'nothing here is',
  'nothing on this page',
];

interface Hit {
  file: string;
  line: number;
  text: string;
  rule: string;
}

function collectFiles(dir: string, extensions: string[]): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      found.push(...collectFiles(full, extensions));
    } else if (extensions.some((ext) => entry.endsWith(ext))) {
      found.push(full);
    }
  }
  return found;
}

/** Strip code blocks and tags so the linter reads prose, not markup. */
function extractProse(source: string): string {
  return source
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/<[^>]+>/g, ' ');
}

function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+(?=[A-Z“"'(\[])/)
    .filter((sentence) => sentence.trim().length > 0);
}

function isNegated(sentence: string, matchIndex: number): boolean {
  const before = sentence.slice(Math.max(0, matchIndex - 90), matchIndex).toLowerCase();
  return NEGATIONS.some((pattern) => pattern.test(before));
}

export function lintFile(path: string): Hit[] {
  return findAdvisoryHits(readFileSync(path, 'utf8'), relative(ROOT, path));
}

/**
 * The detector itself, separated from file reading so it can be tested
 * against sentences that must be rejected. A guardrail that has never been
 * tested against a real violation is a guardrail nobody can trust.
 *
 * Takes a raw source file, strips the markup it does not lint, and returns
 * every advisory construct it finds.
 */
export function findAdvisoryHits(source: string, fileLabel = '<text>'): Hit[] {
  const hits: Hit[] = [];
  const prose = extractProse(source);

  const lines = prose.split('\n');
  let offset = 0;
  for (const line of lines) {
    const lineNumber = countLine(prose, offset);
    offset += line.length + 1;

    for (const sentence of splitSentences(line)) {
      for (const rule of DENY) {
        rule.pattern.lastIndex = 0;
        let match = rule.pattern.exec(sentence);
        while (match !== null) {
          if (!isNegated(sentence, match.index)) {
            hits.push({
              file: fileLabel,
              line: lineNumber,
              text: sentence.trim().slice(0, 160),
              rule: rule.name,
            });
          }
          match = rule.pattern.exec(sentence);
        }
      }
    }
  }
  return hits;
}

function countLine(text: string, offset: number): number {
  let line = 1;
  for (let i = 0; i < offset && i < text.length; i += 1) {
    if (text[i] === '\n') line += 1;
  }
  return line;
}

function main(): void {
  const targets = [
    ...collectFiles(join(ROOT, 'src', 'content'), ['.mdx']),
    ...collectFiles(join(ROOT, 'src', 'pages'), ['.astro']),
    ...collectFiles(join(ROOT, 'src', 'components'), ['.astro']),
    ...collectFiles(join(ROOT, 'src', 'layouts'), ['.astro']),
  ];

  const allHits: Hit[] = [];
  for (const file of targets) {
    allHits.push(...lintFile(file));
  }

  if (allHits.length > 0) {
    console.error(`Advisory language found in ${allHits.length} place(s):\n`);
    for (const hit of allHits) {
      console.error(`  ${hit.file}:${hit.line}  [${hit.rule}]`);
      console.error(`    ${hit.text}\n`);
    }
    console.error(
      'These pages publish calculations. Rewrite the sentence to describe what the\n' +
        'numbers mean and what they depend on, rather than what the reader should do.',
    );
    process.exit(1);
  }

  console.log(
    `Advisory-language lint passed: ${targets.length} files checked, 0 findings.`,
  );
}

if (import.meta.main) {
  main();
}
