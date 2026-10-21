// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config/site.ts';

export default defineConfig({
  site: SITE.origin,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  /**
   * The site is published in English, Russian and Spanish.
   *
   * English is the source language and lives at the root of the site. The
   * other two live under their own prefix. Astro's i18n routing expects the
   * folder structure to match the URL structure, so `src/pages/` holds the
   * English pages and `src/pages/ru/` and `src/pages/es/` hold the others.
   *
   * `prefixDefaultLocale: false` is what keeps the English pages where they
   * have always been. It is the default, but it is set explicitly because
   * the whole site depends on it and a reader's old links depend on it too.
   */
  i18n: {
    locales: ['en', 'ru', 'es'],
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
        locales: {
          en: 'en',
          ru: 'ru',
          es: 'es',
        },
      },
    }),
  ],
  vite: {
    build: {
      assetsInlineLimit: 2048,
    },
  },
});
