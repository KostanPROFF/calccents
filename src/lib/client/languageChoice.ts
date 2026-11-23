/**
 * The reader's language, as their browser states it.
 *
 * Used by the bar that offers a page in the reader's own language. The
 * browser lists the languages the reader reads, most preferred first, as
 * language tags such as `zh-CN`, `pt-BR` or `fil`. The site publishes in a
 * handful of languages by their two-letter code, so a tag is matched on its
 * primary subtag, with the one alias the site needs: Filipino (`fil`) is
 * published as Tagalog (`tl`).
 */

/** Where the reader's choice of language is kept in the browser. */
export const LOCALE_CHOICE_KEY = 'calccents-locale-choice';

/**
 * The first of the reader's languages the page is available in.
 *
 * The reader's order decides, not the site's: a reader whose browser lists
 * Chinese and then English is offered Chinese. A language the page is not
 * available in is skipped, so a German reader who also reads English stays
 * on English. Returns `undefined` when none of the reader's languages is
 * available.
 *
 * The function is self-contained, with no reference outside its own body,
 * because the language bar runs it as an inline script: its source text is
 * written into the page.
 */
export function preferredLocale(
  browserLanguages: readonly string[],
  available: readonly string[],
): string | undefined {
  const aliases: Record<string, string> = { fil: 'tl' };
  for (const tag of browserLanguages) {
    const primary = tag.trim().toLowerCase().split(/[-_]/)[0] ?? '';
    const code = aliases[primary] ?? primary;
    if (code && available.includes(code)) return code;
  }
  return undefined;
}
