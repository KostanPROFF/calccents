// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config/site.ts';
import { LOCALES, LOCALE_META } from './src/i18n/locales.ts';
import { formatLastModified, lastModifiedFor, sitemapLastModified } from './src/config/sitemapDates.ts';

/**
 * The date each page was last changed.
 *
 * Read once, while the configuration is loaded, and handed to the sitemap
 * below.
 */
const lastModified = sitemapLastModified();

export default defineConfig({
  site: SITE.origin,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    /**
     * The styles go into each page instead of separate files.
     *
     * They are about 11 KB compressed in all. As separate files they blocked
     * the first paint until two more requests came back, which on a slow
     * phone connection cost most of a second before any text appeared.
     */
    inlineStylesheets: 'always',
  },
  /**
   * The site is published in English, Russian, Spanish, Chinese, Korean,
   * Vietnamese, Portuguese, Arabic, Tagalog and Ukrainian.
   *
   * English is the source language and lives at the root of the site. The
   * other nine live under their own prefix. Astro's i18n routing expects the
   * folder structure to match the URL structure, so `src/pages/` holds the
   * English pages and `src/pages/ru/`, `src/pages/es/` and the rest hold the
   * others.
   *
   * The list of languages is read from `src/i18n/locales.ts`, which is the
   * one place that says which languages the site publishes in: a language
   * added there and forgotten here would build a page the router does not
   * know about.
   *
   * `prefixDefaultLocale: false` is what keeps the English pages where they
   * have always been. It is the default, but it is set explicitly because
   * the whole site depends on it and a reader's old links depend on it too.
   */
  i18n: {
    locales: [...LOCALES],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    mdx(),
    sitemap({
      /**
       * Alternate links for every page.
       *
       * The sitemap points at the English pages of a translated guide, so
       * without this a crawler would never find the Russian version of a
       * guide that exists in both languages.
       */
      i18n: {
        defaultLocale: 'en',
        locales: Object.fromEntries(
          LOCALES.map((locale) => [locale, LOCALE_META[locale].htmlLang]),
        ),
      },
      /**
       * The date each page was last changed.
       *
       * A crawler uses it to decide what to come back for, so the date has
       * to be the one the page itself prints: the day a guide was last
       * reviewed, the day a calculator's figures were last checked, and the
       * day the site was last reviewed for the pages that stand on their own.
       *
       * Without it the sitemap says that every page has stood still since
       * the site first appeared, which is not what has happened.
       */
      serialize(item) {
        const path = new URL(item.url).pathname;
        return {
          ...item,
          lastmod: formatLastModified(lastModifiedFor(path, lastModified)),
        };
      },
    }),
  ],
  vite: {
    build: {
      assetsInlineLimit: 2048,
    },
  },
});
