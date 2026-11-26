import type { APIRoute } from 'astro';
import { SITE } from '../../config/site.ts';
import { faqs, json } from '../../lib/geo/index.ts';

/** The questions the site answers about itself, and the ones each calculator answers. */
export const GET: APIRoute = () =>
  json({
    name: `${SITE.name} FAQ`,
    url: SITE.origin,
    language: 'en',
    ...faqs('en'),
  });
