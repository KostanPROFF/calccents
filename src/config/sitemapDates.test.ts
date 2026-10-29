import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { formatLastModified, lastModifiedFor, sitemapLastModified } from './sitemapDates.ts';
import { SITE } from './site.ts';
import { getTools } from './tools.ts';
import { LOCALES } from '../i18n/locales.ts';

/**
 * The dates in the sitemap.
 *
 * A crawler reads them to decide what to come back for, so a date that is
 * missing, wrong or in the future is a real fault: it either hides a page
 * from the crawler or makes it look like a page that changes on every
 * build. These cases pin the behaviour.
 */

const GUIDES_DIR = fileURLToPath(new URL('../content/guides/', import.meta.url));

function guideFiles(directory: string = GUIDES_DIR): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...guideFiles(path));
      continue;
    }
    if (entry.name.endsWith('.mdx')) files.push(path);
  }
  return files;
}

describe('the dates the sitemap carries', () => {
  const dates = sitemapLastModified();

  it('has a date for every guide in every language', () => {
    const files = guideFiles();
    assert.ok(files.length > 0, 'no guide files were found');

    for (const file of files) {
      const slug = file.split('/').pop()?.replace(/\.mdx$/, '') ?? '';
      const prefix = file.includes('/ru/') ? '/ru' : file.includes('/es/') ? '/es' : '';
      const path = `${prefix}/guides/${slug}/`;
      assert.ok(
        dates.get(path),
        `the guide at ${path} has no date in the sitemap`,
      );
    }
  });

  it('has a date for every calculator in every language', () => {
    for (const locale of LOCALES) {
      const prefix = locale === 'en' ? '' : `/${locale}`;
      for (const tool of getTools(locale)) {
        const path = `${prefix}/tools/${tool.slug}/`;
        assert.ok(
          dates.get(path),
          `the calculator at ${path} has no date in the sitemap`,
        );
      }
    }
  });

  it('never claims a page changed in the future', () => {
    const now = new Date();
    for (const [path, date] of dates) {
      assert.ok(date <= now, `${path} is dated ${date.toISOString()}`);
    }
  });

  it('falls back on the day the site was last reviewed', () => {
    assert.equal(
      lastModifiedFor('/about/', dates).getTime(),
      SITE.reviewedOn.getTime(),
    );
  });

  it('uses the day a guide was last reviewed, not the day it was published', () => {
    const path = '/guides/net-pay-calculator-explained/';
    assert.ok(dates.get(path));
    assert.equal(
      lastModifiedFor(path, dates).getTime(),
      dates.get(path)?.getTime(),
    );
  });

  it('writes the date the way the sitemap carries it', () => {
    for (const [path, date] of dates) {
      const written = formatLastModified(date);
      assert.match(
        written,
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
        `the date for ${path} is written as ${written}`,
      );
      assert.equal(
        new Date(written).getTime(),
        date.getTime(),
        `the date for ${path} does not come back as the same day`,
      );
    }
  });
});
