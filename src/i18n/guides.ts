/**
 * Reading the guides collection.
 *
 * The collection holds one file per guide per language. The English files
 * sit at the root of the collection and the translations sit in `ru/` and
 * `es/`, which mirrors the URL structure of the site.
 */

import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, isLocale, type Locale } from './locales.ts';

export type GuideEntry = CollectionEntry<'guides'>;

/**
 * The URL segment of a guide.
 *
 * The collection id carries the language folder (`ru/compound-vs-simple-interest`),
 * but the URL segment is the same in every language, so the folder is
 * stripped off here.
 */
export function guideSlug(id: string): string {
  const parts = id.split('/');
  if (parts.length > 1 && isLocale(parts[0])) return parts.slice(1).join('/');
  return id;
}

/** Every guide written in one language, newest first. */
export async function getGuides(locale: Locale): Promise<GuideEntry[]> {
  const guides = await getCollection('guides', (entry) => entry.data.locale === locale);
  return guides.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** One guide by its URL segment, in one language. */
export async function getGuide(
  locale: Locale,
  slug: string,
): Promise<GuideEntry | undefined> {
  const guides = await getGuides(locale);
  return guides.find((guide) => guideSlug(guide.id) === slug);
}

/**
 * The languages a guide has been published in.
 *
 * A guide that exists only in English is still listed in the other
 * languages, because a reader who lands on a translated page should be able
 * to see that the guide exists rather than hit a dead end.
 */
export async function guideLocales(slug: string): Promise<Locale[]> {
  const guides = await getCollection('guides');
  const locales = new Set<Locale>();
  for (const guide of guides) {
    if (guideSlug(guide.id) === slug) locales.add(guide.data.locale);
  }
  return locales.size > 0 ? [...locales] : [DEFAULT_LOCALE];
}
