#!/usr/bin/env node
/**
 * The hosting provider's beacon at the edge.
 *
 * Cloudflare's Web Analytics can add its beacon to every page it serves.
 * That beacon reports the page view straight away, before the reader has
 * answered the cookie question, so the site takes it out of the document
 * before it can run and loads its own copy after the answer.
 *
 * The automatic setup is a setting in the Cloudflare dashboard, and this
 * script is the only way to see it from the outside: Cloudflare adds the
 * beacon only to requests that look like a browser navigation, so a plain
 * fetch of the site shows a page without it.
 *
 * Run: node scripts/check-edge-analytics.ts [url]
 */

export {};

const URL_ARG = process.argv[2] ?? 'https://calccents.com/';

/**
 * The headers a browser sends on a navigation.
 *
 * Without them Cloudflare treats the request as a tool rather than a
 * visitor, and the beacon is left out of the page. That is why the check
 * has to send them: the question is what a visitor gets.
 */
const BROWSER_HEADERS: Record<string, string> = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Upgrade-Insecure-Requests': '1',
};

const BEACON = 'static.cloudflareinsights.com';

/** The tag Cloudflare adds, as opposed to the one the site loads itself. */
const INJECTED = new RegExp(
  `<script[^>]*src=["'][^"']*${BEACON.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^"']*["'][^>]*integrity=`,
  'i',
);

const response = await fetch(URL_ARG, { headers: BROWSER_HEADERS });

if (!response.ok) {
  console.error(`Could not read ${URL_ARG}: HTTP ${response.status}`);
  process.exit(1);
}

const html = await response.text();
const injected = INJECTED.test(html);

console.log(`Checked ${URL_ARG} as a browser would ask for it.`);

if (injected) {
  console.log(
    'The hosting provider is still adding its beacon to every page.\n' +
      'The site removes it before it can run, so no page view is reported before the\n' +
      'cookie question is answered. The file itself is still downloaded.\n' +
      'To stop that as well: Cloudflare dashboard, Web Analytics, the site,\n' +
      'Settings, and turn the automatic setup off.',
  );
  process.exit(1);
}

console.log('The hosting provider is not adding a beacon to the pages any more.');
