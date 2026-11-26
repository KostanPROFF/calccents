import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  RELATED_GUIDES_LIMIT,
  guideSlugsForTool,
  relatedGuidesFor,
  relatedness,
  type LinkableGuide,
} from './relatedContent.ts';
import { TOOL_SLUGS } from './tools.ts';
import { UI } from '../i18n/ui/index.ts';
import { LOCALES, DEFAULT_LOCALE } from '../i18n/locales.ts';

const guide = (
  slug: string,
  group: string,
  relatedTools: string[],
  date = '2026-01-01',
): LinkableGuide => ({ slug, group, relatedTools, date: new Date(date) });

describe('how related two guides are', () => {
  it('counts a shared calculator above a shared group', () => {
    const a = guide('a', 'home', ['mortgage-payment']);
    assert.equal(relatedness(a, guide('b', 'renting', ['mortgage-payment'])), 2);
    assert.equal(relatedness(a, guide('c', 'home', ['rent-vs-buy'])), 1);
    assert.equal(relatedness(a, guide('d', 'home', ['mortgage-payment'])), 3);
    assert.equal(relatedness(a, guide('e', 'money', ['net-pay'])), 0);
  });
});

describe('the related guides block', () => {
  const current = guide('current', 'home', ['mortgage-payment', 'rent-vs-buy']);
  const candidates = [
    current,
    guide('unrelated', 'money', ['net-pay']),
    guide('same-group', 'home', ['compound-interest'], '2026-06-01'),
    guide('one-tool-old', 'renting', ['rent-vs-buy'], '2026-01-01'),
    guide('one-tool-new', 'renting', ['mortgage-payment'], '2026-05-01'),
    guide('both-tools', 'renting', ['mortgage-payment', 'rent-vs-buy']),
    guide('tool-and-group', 'home', ['mortgage-payment']),
  ];

  it('orders by relatedness, then newest first, and leaves out the guide itself', () => {
    assert.deepEqual(
      relatedGuidesFor(current, candidates).map((entry) => entry.slug),
      ['both-tools', 'tool-and-group', 'one-tool-new', 'one-tool-old'],
    );
  });

  it('never links a guide with nothing in common', () => {
    const slugs = relatedGuidesFor(current, candidates, 10).map((entry) => entry.slug);
    assert.ok(!slugs.includes('unrelated'));
    assert.ok(!slugs.includes('current'));
    assert.equal(slugs.at(-1), 'same-group');
  });

  it('shows at most the limit', () => {
    assert.equal(relatedGuidesFor(current, candidates).length, RELATED_GUIDES_LIMIT);
  });
});

describe('the guides a calculator links to', () => {
  const guides = [
    guide('picked', 'home', ['mortgage-payment']),
    guide('tagged-old', 'home', ['mortgage-payment'], '2026-01-01'),
    guide('tagged-new', 'home', ['mortgage-payment'], '2026-09-01'),
    guide('other-tool', 'money', ['net-pay']),
  ];

  it('keeps the hand-picked order and adds the other tagged guides, newest first', () => {
    assert.deepEqual(guideSlugsForTool('mortgage-payment', ['picked', 'not-tagged'], guides), [
      'picked',
      'not-tagged',
      'tagged-new',
      'tagged-old',
    ]);
  });

  it('never repeats a guide', () => {
    const slugs = guideSlugsForTool('mortgage-payment', ['tagged-old', 'tagged-old'], guides);
    assert.equal(new Set(slugs).size, slugs.length);
  });
});

/**
 * The links the published guides actually produce.
 *
 * The frontmatter is read straight from the files, the way the sitemap date
 * test reads it, so a guide that names a calculator the site does not have,
 * or a page that would be left with no links, fails here before the build.
 */
const GUIDES_DIR = fileURLToPath(new URL('../content/guides/', import.meta.url));

function readGuides(locale: string): LinkableGuide[] {
  const directory = locale === DEFAULT_LOCALE ? GUIDES_DIR : join(GUIDES_DIR, locale);
  return readdirSync(directory)
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => {
      const text = readFileSync(join(directory, name), 'utf8');
      const frontmatter = /^---\n([\s\S]*?)\n---/.exec(text)?.[1] ?? '';
      const tools = /^relatedTools:\n((?:\s+-\s.*\n?)+)/m.exec(frontmatter)?.[1] ?? '';
      return {
        slug: name.replace(/\.mdx$/, ''),
        group: /^group:\s*"?([^"\n]+)"?/m.exec(frontmatter)?.[1] ?? '',
        relatedTools: [...tools.matchAll(/-\s*"?([^"\n]+?)"?\s*$/gm)].map((match) => match[1]),
        date: new Date(/^date:\s*"?([^"\n]+)"?/m.exec(frontmatter)?.[1] ?? ''),
      };
    });
}

describe('the published links', () => {
  const english = readGuides(DEFAULT_LOCALE);

  it('names only calculators the site publishes', () => {
    for (const locale of LOCALES) {
      for (const entry of readGuides(locale)) {
        for (const tool of entry.relatedTools) {
          assert.ok(
            (TOOL_SLUGS as readonly string[]).includes(tool),
            `${locale}/${entry.slug} names an unknown calculator: ${tool}`,
          );
        }
      }
    }
  });

  it('gives every guide at least one calculator and two related guides', () => {
    for (const entry of english) {
      assert.ok(entry.relatedTools.length > 0, `${entry.slug} names no calculator`);
      assert.ok(
        relatedGuidesFor(entry, english).length >= 2,
        `${entry.slug} has fewer than two related guides`,
      );
    }
  });

  it('links every calculator to every guide that names it, in every language', () => {
    for (const locale of LOCALES) {
      const guides = readGuides(locale);
      for (const tool of TOOL_SLUGS) {
        const curated = UI[locale].tool[tool].relatedGuides.map((entry) => entry.slug);
        const linked = guideSlugsForTool(tool, curated, guides);
        for (const entry of guides.filter((candidate) => candidate.relatedTools.includes(tool))) {
          assert.ok(linked.includes(entry.slug), `${locale} ${tool} does not link ${entry.slug}`);
        }
      }
    }
  });

  it('lists only guides that exist in the dictionaries', () => {
    const slugs = new Set(english.map((entry) => entry.slug));
    for (const locale of LOCALES) {
      for (const tool of TOOL_SLUGS) {
        for (const entry of UI[locale].tool[tool].relatedGuides) {
          assert.ok(slugs.has(entry.slug), `${locale} ${tool} lists a missing guide: ${entry.slug}`);
        }
      }
    }
  });
});
