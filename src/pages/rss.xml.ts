import type { APIRoute } from 'astro';
import { feed, text } from '../lib/geo/index.ts';

/** The feed of the English guides. The other languages have their own, under their prefix. */
export const GET: APIRoute = async () => text(await feed('en'), 'application/rss+xml');
