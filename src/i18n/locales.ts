/**
 * The locales the site publishes in.
 *
 * English is the source language and lives at the root of the site. The
 * other locales live under their own prefix. Astro's i18n routing expects
 * the folder structure to match the URL structure, so `src/pages/` holds the
 * English pages and `src/pages/<locale>/` holds each of the others.
 *
 * Everything that varies by language is either here or in `src/i18n/ui/`.
 * Nothing else in the codebase should hard-code a language code.
 */

export const LOCALES = ['en', 'ru', 'es', 'zh', 'ko', 'vi', 'pt', 'ar', 'tl', 'uk'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleMeta {
  /** The locale code used in URLs and in the `lang` attribute. */
  code: Locale;
  /** The value for `<html lang>` and for `hreflang`. */
  htmlLang: string;
  /**
   * The direction the language is written in.
   *
   * Arabic is written right to left, and the whole page turns with it: the
   * `dir` attribute on `<html>` is what the logical properties in the
   * stylesheet read.
   */
  dir: 'ltr' | 'rtl';
  /** The value for `og:locale`. */
  ogLocale: string;
  /** The locale passed to `Intl` and `toLocaleDateString`. */
  intl: string;
  /** The name of the language, in that language. */
  nativeName: string;
  /** The name of the language, in English. */
  englishName: string;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: {
    code: 'en',
    htmlLang: 'en',
    ogLocale: 'en_US',
    intl: 'en-US',
    nativeName: 'English',
    englishName: 'English',
    dir: 'ltr',
  },
  ru: {
    code: 'ru',
    htmlLang: 'ru',
    ogLocale: 'ru_RU',
    intl: 'ru-RU',
    nativeName: 'Русский',
    englishName: 'Russian',
    dir: 'ltr',
  },
  es: {
    code: 'es',
    htmlLang: 'es',
    ogLocale: 'es_ES',
    intl: 'es-ES',
    nativeName: 'Español',
    englishName: 'Spanish',
    dir: 'ltr',
  },
  zh: {
    code: 'zh',
    htmlLang: 'zh-Hans',
    ogLocale: 'zh_CN',
    intl: 'zh-CN',
    nativeName: '简体中文',
    englishName: 'Chinese (Simplified)',
    dir: 'ltr',
  },
  ko: {
    code: 'ko',
    htmlLang: 'ko',
    ogLocale: 'ko_KR',
    intl: 'ko-KR',
    nativeName: '한국어',
    englishName: 'Korean',
    dir: 'ltr',
  },
  vi: {
    code: 'vi',
    htmlLang: 'vi',
    ogLocale: 'vi_VN',
    intl: 'vi-VN',
    nativeName: 'Tiếng Việt',
    englishName: 'Vietnamese',
    dir: 'ltr',
  },
  pt: {
    code: 'pt',
    htmlLang: 'pt-BR',
    ogLocale: 'pt_BR',
    intl: 'pt-BR',
    nativeName: 'Português',
    englishName: 'Portuguese',
    dir: 'ltr',
  },
  ar: {
    code: 'ar',
    htmlLang: 'ar',
    ogLocale: 'ar_AR',
    intl: 'ar-u-nu-latn',
    nativeName: 'العربية',
    englishName: 'Arabic',
    dir: 'rtl',
  },
  tl: {
    code: 'tl',
    htmlLang: 'tl',
    ogLocale: 'tl_PH',
    intl: 'fil-PH',
    nativeName: 'Tagalog',
    englishName: 'Tagalog',
    dir: 'ltr',
  },
  uk: {
    code: 'uk',
    htmlLang: 'uk',
    ogLocale: 'uk_UA',
    intl: 'uk-UA',
    nativeName: 'Українська',
    englishName: 'Ukrainian',
    dir: 'ltr',
  },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/**
 * Build a URL for a page in a given locale.
 *
 * The default locale has no prefix, every other locale has its code as the
 * first path segment. Trailing slashes are always present, because the site
 * is built with `trailingSlash: 'always'`.
 */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  if (!clean) return prefix ? `${prefix}/` : '/';
  return `${prefix}/${clean}/`;
}

/**
 * Remove the locale prefix from a pathname.
 *
 * Used to turn the page a reader is on into the locale-neutral path that
 * the language switcher then re-prefixes for every other locale.
 */
export function stripLocale(pathname: string): string {
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    if (pathname === `/${locale}`) return '/';
    if (pathname.startsWith(`/${locale}/`)) return `/${pathname.slice(locale.length + 2)}`;
  }
  return pathname;
}

/**
 * Work out which locale a pathname belongs to.
 *
 * The default locale is the answer for anything without a prefix.
 */
export function localeFromPath(pathname: string): Locale {
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) return locale;
  }
  return DEFAULT_LOCALE;
}

/**
 * The same page in every locale.
 *
 * Used to write the `hreflang` links and to build the language switcher.
 * The path that goes in is the one the page is served at, with or without
 * a locale prefix, and every locale comes back with its own prefix.
 */
export function alternates(path: string): { locale: Locale; href: string }[] {
  const clean = stripLocale(path);
  return LOCALES.map((locale) => ({ locale, href: localePath(locale, clean) }));
}

/**
 * The arrow that means "go on".
 *
 * A link that leads further points the way the line reads: to the right in
 * every language but Arabic, where it points to the left.
 */
export function forwardArrow(locale: Locale): string {
  return LOCALE_META[locale].dir === 'rtl' ? '←' : '→';
}

/**
 * Format a date the way the locale writes it.
 *
 * The guide pages print publication and review dates, and a date written the
 * English way reads strangely in Russian and looks wrong in Spanish.
 *
 * Every date in the project is a calendar day and nothing more: a review
 * happened on the 23rd, not at 00:00 on the 23rd. The dates are therefore
 * read in UTC, so a reader west of Greenwich does not see the day before
 * the one the site is actually claiming.
 */
export function formatDate(date: Date, locale: Locale): string {
  return date.toLocaleDateString(LOCALE_META[locale].intl, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
