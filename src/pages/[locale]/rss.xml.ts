import type { APIRoute, GetStaticPaths } from 'astro';
import { feed, text } from '../../lib/geo/index.ts';
import { DEFAULT_LOCALE, LOCALES, type Locale } from '../../i18n/locales.ts';

/** The feed of the guides written in each language other than English, at `/<locale>/rss.xml`. */
export const getStaticPaths = (() =>
  LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map((locale) => ({
    params: { locale },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => text(await feed(params.locale as Locale), 'application/rss+xml');
