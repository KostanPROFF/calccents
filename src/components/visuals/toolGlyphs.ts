/**
 * The colour and the icon each calculator is known by.
 *
 * Every calculator has a hue of its own, and the hue follows it around the
 * site: the badge on its card, the wash behind the card, and the badge on a
 * guide that explains it. The icon is a handful of strokes on a 24-unit
 * grid, drawn in whatever colour the badge sets.
 *
 * The hue lives in a plain module rather than in the component because the
 * pages need it too, to tint the card a badge sits on.
 */

import type { ToolSlug } from '../../config/tools.ts';

interface Glyph {
  /** The two ends of the badge gradient. */
  from: string;
  to: string;
  /** The SVG path data for the icon, one entry per stroke. */
  paths: readonly string[];
}

export const TOOL_GLYPHS: Record<ToolSlug, Glyph> = {
  'mortgage-payment': {
    from: '#a596ff',
    to: '#6fc8ff',
    paths: ['M3 10.5 12 3l9 7.5', 'M5.5 9v11h13V9', 'M10 20v-5.5h4V20'],
  },
  'rent-vs-buy': {
    from: '#4fd8f0',
    to: '#5cf2c0',
    paths: ['M7.5 4 3.5 8l4 4', 'M3.5 8H17', 'm16.5 12 4 4-4 4', 'M20.5 16H7'],
  },
  'compound-interest': {
    from: '#5cf2c0',
    to: '#c3f56b',
    paths: ['M3 17.5 9 11.5l4 4 8-8', 'M15 7.5h6v6'],
  },
  'net-pay': {
    from: '#ffd166',
    to: '#ff8fa3',
    paths: [
      'M4 7h15.5A1.5 1.5 0 0 1 21 8.5v10a1.5 1.5 0 0 1-1.5 1.5h-14A1.5 1.5 0 0 1 4 18.5V7Z',
      'M4 7V5.5A1.5 1.5 0 0 1 5.5 4H17',
      'M16 13.5h2',
    ],
  },
  'income-tax': {
    from: '#ff8fd0',
    to: '#a596ff',
    paths: [
      'M19 5 5 19',
      'M9.5 7a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z',
      'M19.5 17a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z',
    ],
  },
  'debt-payoff': {
    from: '#ffb366',
    to: '#ff6b8b',
    paths: [
      'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
      'M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z',
      'M12 12h.01',
    ],
  },
};

/** The inline style that tints a card with a calculator's hue. */
export function tileHue(slug: ToolSlug): string {
  return `--tile-hue: ${TOOL_GLYPHS[slug].from}33;`;
}
