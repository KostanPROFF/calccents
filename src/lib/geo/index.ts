/**
 * The site described for machines rather than for readers.
 *
 * Search engines that answer with generated text, and the agents that browse
 * on somebody's behalf, read a handful of plain files before they read the
 * pages: `/llms.txt`, the files under `/ai/`, `/.well-known/ai.txt` and the
 * feed. None of them is a proven ranking factor. They are a map of the site
 * in a shape that is cheap to parse, and every one of them is built from the
 * same registries the pages are built from, so a new calculator or a new
 * guide appears in them without anyone remembering to add it.
 *
 * The files are in English, the language the site is written in first. The
 * other languages are listed with their addresses.
 */

import { SITE } from '../../config/site.ts';
import { getTools, toolAgentName, TOOL_SLUGS } from '../../config/tools.ts';
import { getUi } from '../../i18n/ui/index.ts';
import { DEFAULT_LOCALE, LOCALE_META, LOCALES, localePath, type Locale } from '../../i18n/locales.ts';
import { getTranslatedGuides, guideHref, type GuideEntry } from '../../i18n/guides.ts';

/** An absolute address on the site. */
export function absolute(path: string): string {
  return new URL(path, SITE.origin).toString();
}

/**
 * The address of the feed of one language.
 *
 * A file, not a page, so it has no trailing slash: `localePath` adds one.
 */
export function feedPath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '/rss.xml' : `/${locale}/rss.xml`;
}

/** The pages that explain who runs the site and how. */
export function trustPages(locale: Locale = DEFAULT_LOCALE) {
  const ui = getUi(locale);
  return [
    { title: ui.footer.links.about, path: '/about/' },
    { title: ui.footer.links['editorial-team'], path: '/editorial-team/' },
    { title: ui.footer.links.sources, path: '/sources/' },
    { title: ui.footer.links.privacy, path: '/privacy/' },
    { title: ui.footer.links.terms, path: '/terms/' },
    { title: ui.footer.links.contact, path: '/contact/' },
  ].map((page) => ({ ...page, url: absolute(localePath(locale, page.path)) }));
}

/** The languages the site is published in, with the address of each home page. */
export function languages() {
  return LOCALES.map((locale) => ({
    code: LOCALE_META[locale].htmlLang,
    name: LOCALE_META[locale].englishName,
    nativeName: LOCALE_META[locale].nativeName,
    url: absolute(localePath(locale, '/')),
  }));
}

/** The guides written in one language, newest first. */
export async function guidesIn(locale: Locale): Promise<GuideEntry[]> {
  const guides = await getTranslatedGuides(locale);
  return [...guides].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** The calculators, with what each one takes and what it leaves out. */
export function services(locale: Locale = DEFAULT_LOCALE) {
  const ui = getUi(locale);
  return getTools(locale).map((tool) => {
    const copy = ui.tool[tool.slug];
    return {
      id: toolAgentName(tool.slug),
      name: tool.name,
      url: absolute(localePath(locale, `/tools/${tool.slug}/`)),
      category: tool.category,
      summary: tool.short,
      description: tool.description,
      formula: copy.formula,
      limitations: [...copy.limits],
      lastChecked: tool.reviewedOn.toISOString().slice(0, 10),
    };
  });
}

/** The questions about the site as a whole, and the questions each calculator answers. */
export function faqs(locale: Locale = DEFAULT_LOCALE) {
  const ui = getUi(locale);
  return {
    site: ui.home.faq.map((item) => ({ question: item.q, answer: item.a })),
    tools: TOOL_SLUGS.map((slug) => ({
      tool: ui.tool[slug].name,
      url: absolute(localePath(locale, `/tools/${slug}/`)),
      questions: ui.tool[slug].faq.map((item) => ({ question: item.q, answer: item.a })),
    })),
  };
}

/** The address of a guide, absolute. */
export function guideUrl(guide: GuideEntry): string {
  return absolute(guideHref(guide));
}

/** A JSON response that a crawler can cache for a day. */
export function json(body: unknown): Response {
  return new Response(`${JSON.stringify(body, null, 2)}\n`, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

/** A plain text response. */
export function text(body: string, type = 'text/plain'): Response {
  return new Response(body, { headers: { 'Content-Type': `${type}; charset=utf-8` } });
}

/** Escapes text for XML. */
export function xml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** The RSS feed of the guides written in one language. */
export async function feed(locale: Locale): Promise<string> {
  const ui = getUi(locale);
  const guides = await guidesIn(locale);
  const self = absolute(feedPath(locale));
  const home = absolute(localePath(locale, '/'));
  const latest = guides.reduce(
    (newest, guide) => (guide.data.lastReviewed > newest ? guide.data.lastReviewed : newest),
    guides[0]?.data.lastReviewed ?? SITE.reviewedOn,
  );
  const items = guides.map((guide) => {
    const url = guideUrl(guide);
    return [
      '    <item>',
      `      <title>${xml(guide.data.title)}</title>`,
      `      <link>${xml(url)}</link>`,
      `      <guid isPermaLink="true">${xml(url)}</guid>`,
      `      <description>${xml(guide.data.description)}</description>`,
      `      <pubDate>${guide.data.date.toUTCString()}</pubDate>`,
      `      <dc:creator>${xml(guide.data.author)}</dc:creator>`,
      '    </item>',
    ].join('\n');
  });
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '  <channel>',
    `    <title>${xml(`${SITE.name} — ${ui.nav.guides}`)}</title>`,
    `    <link>${xml(home)}</link>`,
    `    <description>${xml(ui.description)}</description>`,
    `    <language>${LOCALE_META[locale].htmlLang}</language>`,
    `    <lastBuildDate>${latest.toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${xml(self)}" rel="self" type="application/rss+xml" />`,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
}
