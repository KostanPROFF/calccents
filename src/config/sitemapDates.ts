/**
 * The date each page of the site was last changed.
 *
 * A sitemap entry can carry the date the page was last changed, and that is
 * the date a crawler uses to decide what to come back for. Without it the
 * sitemap says that every page has stood still since the site first
 * appeared, which is not true: the guides are reviewed on their own dates
 * and the calculators are checked on their own dates.
 *
 * The dates are the ones the site already publishes, not new ones invented
 * for the sitemap. A guide carries the day it was last reviewed, a
 * calculator carries the day its figures were last checked, and the pages
 * that stand on their own carry the day the site was last reviewed.
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { LOCALES } from '../i18n/locales.ts';
import { SITE } from './site.ts';
import { getTools } from './tools.ts';

/**
 * The folder the guides live in.
 *
 * The module sits next to the folder when it is loaded as it is written,
 * and the build runs from the root of the project when the configuration is
 * bundled into one file. Both are tried, so the folder is found either way,
 * and a missing folder stops the build rather than leaving every guide out
 * of the sitemap without a word.
 */
function guidesDirectory(): string {
  const candidates = [
    fileURLToPath(new URL('../content/guides/', import.meta.url)),
    join(process.cwd(), 'src', 'content', 'guides'),
  ];
  for (const directory of candidates) {
    if (existsSync(directory)) return directory;
  }
  throw new Error(
    `the guides folder was not found, looked in ${candidates.join(' and ')}`,
  );
}

/**
 * The folder a language lives under.
 *
 * English is at the root of the site and the other two under their own
 * prefix, which is the same rule the pages and the sitemap follow.
 */
function localePrefix(locale: string): string {
  return locale === 'en' ? '' : `/${locale}`;
}

interface GuideFile {
  readonly locale: string;
  readonly slug: string;
  readonly lastReviewed: Date;
}

/**
 * The frontmatter of a file.
 *
 * A file without frontmatter is not a guide, and a guide without a date is
 * not one the sitemap can describe, so both stop the build rather than
 * leaving the page quietly out of the sitemap.
 */
function frontmatterOf(file: string): string {
  const text = readFileSync(file, 'utf8');
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  const frontmatter = match?.[1];
  if (!frontmatter) {
    throw new Error(`${file} has no frontmatter`);
  }
  return frontmatter;
}

/**
 * One field of a frontmatter.
 *
 * A missing field stops the build: the dates are the reason the sitemap is
 * worth reading, so a guide without one is a mistake worth seeing.
 */
function fieldOf(frontmatter: string, key: string, file: string): string {
  const match = new RegExp(`^${key}:\\s*"?([^"\\n]+?)"?\\s*$`, 'm').exec(frontmatter);
  const value = match?.[1]?.trim();
  if (!value) {
    throw new Error(`${file} has no ${key} in its frontmatter`);
  }
  return value;
}

/**
 * Every guide file, with the language it is written in.
 *
 * The folder the file sits in and the language in its frontmatter have to
 * agree: the URL of a guide comes from the folder, and a guide whose own
 * frontmatter says another language would be indexed under a URL that
 * promises a language it is not in.
 */
function guideFiles(): GuideFile[] {
  const files: GuideFile[] = [];

  const walk = (directory: string): void => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        walk(path);
        continue;
      }
      if (!entry.name.endsWith('.mdx')) continue;

      const frontmatter = frontmatterOf(path);
      const locale = fieldOf(frontmatter, 'locale', path);
      const reviewed = fieldOf(frontmatter, 'lastReviewed', path);
      const lastReviewed = new Date(reviewed);
      if (Number.isNaN(lastReviewed.getTime())) {
        throw new Error(`${path} has a lastReviewed that is not a date`);
      }
      files.push({ locale, slug: entry.name.replace(/\.mdx$/, ''), lastReviewed });
    }
  };

  walk(guidesDirectory());
  return files;
}

/**
 * The date each page in the sitemap was last changed.
 *
 * The key is the path of the page, the way it appears in the sitemap.
 */
export function sitemapLastModified(): Map<string, Date> {
  const dates = new Map<string, Date>();

  for (const guide of guideFiles()) {
    dates.set(
      `${localePrefix(guide.locale)}/guides/${guide.slug}/`,
      guide.lastReviewed,
    );
  }

  for (const locale of LOCALES) {
    for (const tool of getTools(locale)) {
      dates.set(`${localePrefix(locale)}/tools/${tool.slug}/`, tool.reviewedOn);
    }
  }

  return dates;
}

/**
 * The date a page was last changed.
 *
 * The pages that carry no date of their own fall back on the day the site
 * was last reviewed, which is the date they print themselves.
 */
export function lastModifiedFor(
  path: string,
  dates: Map<string, Date>,
): Date {
  return dates.get(path) ?? SITE.reviewedOn;
}

/**
 * The date a page was last changed, as the sitemap carries it.
 *
 * The sitemap takes a date and no time: the site knows the day a guide was
 * reviewed and the day a calculator's figures were checked, and it does not
 * know the hour. The date is written in UTC, which is where every date on the
 * site stands, so the day does not move with the machine that builds it.
 */
export function formatLastModified(date: Date): string {
  return date.toISOString();
}
