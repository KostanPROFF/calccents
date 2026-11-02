/**
 * Reading the guides collection.
 *
 * The collection holds one file per guide per language. The English files
 * sit at the root of the collection and the translations sit in a folder
 * named after the locale, which mirrors the URL structure of the site.
 *
 * Not every language has every guide yet. A page that lists guides lists
 * the English guide where the translation is missing, and links to it at its
 * English address, so a reader never meets an empty shelf or a dead link.
 */

import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, isLocale, localePath, type Locale } from './locales.ts';

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

const byDate = (a: GuideEntry, b: GuideEntry): number =>
  b.data.date.getTime() - a.data.date.getTime();

/**
 * Every guide written in one language, newest first.
 *
 * Only the guides that actually exist in that language. This is what the
 * guide pages of a language are built from.
 */
export async function getTranslatedGuides(locale: Locale): Promise<GuideEntry[]> {
  const guides = await getCollection('guides', (entry) => entry.data.locale === locale);
  return guides.sort(byDate);
}

/**
 * Every guide, in one language where it can be, newest first.
 *
 * A guide that has not been translated into the language yet comes back in
 * English. Use `guideHref` to link to it, because its address is the English
 * one.
 */
export async function getGuides(locale: Locale): Promise<GuideEntry[]> {
  const translated = await getTranslatedGuides(locale);
  if (locale === DEFAULT_LOCALE) return translated;
  const have = new Set(translated.map((guide) => guideSlug(guide.id)));
  const english = await getTranslatedGuides(DEFAULT_LOCALE);
  const missing = english.filter((guide) => !have.has(guideSlug(guide.id)));
  return [...translated, ...missing].sort(byDate);
}

/** The address of a guide, in the language it is actually written in. */
export function guideHref(guide: GuideEntry): string {
  return localePath(guide.data.locale, `/guides/${guideSlug(guide.id)}/`);
}

/** One guide by its URL segment, in one language. */
export async function getGuide(
  locale: Locale,
  slug: string,
): Promise<GuideEntry | undefined> {
  const guides = await getTranslatedGuides(locale);
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
