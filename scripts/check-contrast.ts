#!/usr/bin/env node
/**
 * Colour contrast check.
 *
 * The palette lives in one file, `src/styles/global.css`, and every colour
 * on the site comes from it. That makes the palette easy to break: changing
 * one token changes it for every page at once, and nothing in the build
 * notices. A muted grey that used to be readable becomes a quiet grey that
 * nobody can read, and the pages still look tidy in a screenshot.
 *
 * So the check reads the tokens out of the stylesheet and does the contrast
 * arithmetic against the surfaces the text can land on. It knows two
 * themes, because the same token has to be readable on both.
 *
 * The pairs below are the ones the site actually uses:
 *
 *   - text, secondary and muted on the page, on a card and on a raised
 *     panel, which is the darkest and the lightest a line of small print
 *     can end up on
 *   - the accent read as text on the same surfaces, since a label in the
 *     accent colour is small print too
 *   - the accent read on the tinted panel a badge sits on
 *
 * The threshold is 4.5:1 for text. The one exception is a large heading,
 * which is allowed 3:1, but no token on the site is used for large text
 * alone, so everything here is held to 4.5.
 *
 * Run: node scripts/check-contrast.ts
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const CSS = `${ROOT}/src/styles/global.css`;

/** The ratio text has to clear. */
const MINIMUM = 4.5;

/**
 * The two themes.
 *
 * The dark theme is the default one. The light theme has to be listed
 * separately, because the same token has to be readable on white as well,
 * and a blue that works as a button on a dark page is too light to be
 * small text on a white one.
 */
const THEMES = ['dark', 'light'] as const;
type Theme = (typeof THEMES)[number];

/**
 * The pairs that have to hold.
 *
 * The surface is the background the text sits on. `accent-subtle` is the
 * tinted panel a badge uses, and it is a tint rather than a solid colour,
 * so the check mixes it over the surface first.
 */
const PAIRS: { foreground: string; background: string; where: string }[] = [
  { foreground: 'text', background: 'bg', where: 'the page' },
  { foreground: 'text', background: 'surface', where: 'a card' },
  { foreground: 'text', background: 'surface-raised', where: 'a raised panel' },
  { foreground: 'text-secondary', background: 'bg', where: 'the page' },
  { foreground: 'text-secondary', background: 'surface', where: 'a card' },
  { foreground: 'text-secondary', background: 'surface-raised', where: 'a raised panel' },
  { foreground: 'text-muted', background: 'bg', where: 'the page' },
  { foreground: 'text-muted', background: 'surface', where: 'a card' },
  { foreground: 'text-muted', background: 'surface-raised', where: 'a raised panel' },
  { foreground: 'accent-ink', background: 'bg', where: 'the page' },
  { foreground: 'accent-ink', background: 'surface', where: 'a card' },
  { foreground: 'accent-ink', background: 'surface-raised', where: 'a raised panel' },
  { foreground: 'accent-ink-strong', background: 'accent-subtle', where: 'a tinted badge' },
];

/** The tokens the check needs from each theme. */
const REQUIRED = [
  'bg',
  'surface',
  'surface-raised',
  'text',
  'text-secondary',
  'text-muted',
  'accent-ink',
  'accent-ink-strong',
  'accent-subtle',
];

type Token = { value: string };

/** Read a hex colour into its three channels. */
function parseHex(value: string): [number, number, number] | null {
  const hex = value.trim().replace('#', '');
  const full =
    hex.length === 3
      ? hex
          .split('')
          .map((c) => c + c)
          .join('')
      : hex;
  if (!/^[0-9a-f]{6}$/i.test(full)) return null;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

/** The relative luminance of a colour, as WCAG defines it. */
function luminance(rgb: [number, number, number]): number {
  const channels = rgb.map((value) => {
    const v = value / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

/** The contrast ratio between two colours. */
function contrast(a: [number, number, number], b: [number, number, number]): number {
  const la = luminance(a);
  const lb = luminance(b);
  const [high, low] = la > lb ? [la, lb] : [lb, la];
  return (high + 0.05) / (low + 0.05);
}

/** A tint over a solid colour, the way the browser paints it. */
function mix(
  top: [number, number, number],
  bottom: [number, number, number],
  alpha: number,
): [number, number, number] {
  return top.map((value, i) => Math.round(value * alpha + bottom[i] * (1 - alpha))) as [
    number,
    number,
    number,
  ];
}

/** The alpha of a colour written as rgba(). */
function parseAlpha(value: string): number {
  const match = value.match(/rgba?\([^)]*?([\d.]+)\s*\)/);
  if (!match) return 1;
  return Number(match[1]);
}

const css = readFileSync(CSS, 'utf8');

/**
 * The tokens of one theme.
 *
 * The dark theme is the `:root` block, the light one is the block that
 * follows `[data-theme='light']`.
 */
function readTheme(theme: Theme): Map<string, Token> {
  const tokens = new Map<string, Token>();

  const start = theme === 'dark' ? css.indexOf(':root {') : css.indexOf("[data-theme='light']");
  if (start === -1) {
    console.error(`Could not find the ${theme} theme in ${CSS}.`);
    process.exit(1);
  }
  const end = css.indexOf('}', start);
  const block = css.slice(start, end);

  for (const match of block.matchAll(/(--[a-z0-9-]+):\s*([^;]+);/gi)) {
    tokens.set(match[1].replace(/^--/, ''), { value: match[2].trim() });
  }
  return tokens;
}

const problems: string[] = [];

for (const theme of THEMES) {
  const tokens = readTheme(theme);

  for (const name of REQUIRED) {
    if (!tokens.has(name)) {
      problems.push(`The ${theme} theme has no --${name} token.`);
    }
  }
  if (problems.length > 0) continue;

  const resolve = (name: string): [number, number, number] => {
    const raw = tokens.get(name)!.value;
    if (raw.startsWith('rgba') || raw.startsWith('rgb(')) {
      const inner = raw.slice(raw.indexOf('(') + 1, raw.lastIndexOf(')'));
      const parts = inner.split(',').map((p) => Number(p.trim()));
      return [parts[0], parts[1], parts[2]];
    }
    const hex = parseHex(raw);
    if (!hex) {
      console.error(`Cannot read the colour of --${name} in the ${theme} theme: ${raw}`);
      process.exit(1);
    }
    return hex;
  };

  for (const pair of PAIRS) {
    const foreground = resolve(pair.foreground);
    let background = resolve(pair.background);

    if (pair.background === 'accent-subtle') {
      // The tint is painted over the card it sits on.
      const alpha = parseAlpha(tokens.get('accent-subtle')!.value);
      background = mix(background, resolve('surface'), alpha);
    }

    const ratio = contrast(foreground, background);
    if (ratio < MINIMUM) {
      problems.push(
        `The ${theme} theme: --${pair.foreground} on --${pair.background} (${pair.where}) ` +
          `is ${ratio.toFixed(2)}:1, and ${MINIMUM}:1 is needed.`,
      );
    }
  }
}

if (problems.length > 0) {
  console.error('Colour contrast check failed:\n');
  for (const problem of problems) {
    console.error(`  ${problem}`);
  }
  process.exit(1);
}

console.log(
  `Colour contrast check passed: ${THEMES.length} themes, ${PAIRS.length} token pairs, ` +
    `all of them at ${MINIMUM}:1 or better.`,
);
