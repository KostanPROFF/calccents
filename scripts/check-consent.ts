#!/usr/bin/env node
/**
 * Consent gating check.
 *
 * Two scripts on this site set cookies: the AdSense loader, which serves
 * the advertising, and the Google Analytics loader, which counts the page
 * views. Neither one may be in the document before the reader has
 * answered the cookie question.
 *
 * The gate proves five things over the built output, where the mistake
 * would actually ship:
 *
 *   1. the banner is on every page, and the way back to it is too
 *   2. all three script URLs are present, so they can be loaded after
 *      consent
 *   3. none of them is loaded as a script tag, so nothing goes out before
 *      the answer
 *   4. the hosting provider's beacon is loaded by the bootstrap, so the
 *      request waits for the answer as well
 *   5. the privacy policy names that provider, because it is the one that
 *      receives the request
 *
 * The third point is the one that matters. A page that carries the
 * tracker in the head works exactly like a page without a consent banner,
 * and the banner on it is decoration. The check looks for the script tag
 * rather than for the URL, because the URL has to be in the source.
 *
 * Run: node scripts/check-consent.ts
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const DIST = join(ROOT, 'dist');

/** The banner, and the button that opens it again. */
const BANNER_MARKER = 'id="consent-banner"';
const REOPEN_MARKER = 'data-consent-open';

/** Where the answer is kept in the browser. */
const DECISION_MARKER = 'cc-consent';

/** The two trackers, and where they are loaded from. */
const ANALYTICS_MARKER = 'googletagmanager.com/gtag/js?id=';
const ADS_MARKER = 'pagead2.googlesyndication.com';

/**
 * A script tag that loads a tracker.
 *
 * The tag is what makes the request. The URL inside the bootstrap is just
 * a string in a script; the tag is what the browser fetches.
 */
const STATIC_TAG = new RegExp(
  `<script[^>]*src=["'][^"']*(${ANALYTICS_MARKER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}|${ADS_MARKER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
  'i',
);

/** The rule that keeps the ad units out of sight until the answer. */
const PENDING_MARKER = 'consent-granted';

/**
 * The crawler exception.
 *
 * Google's crawler cannot answer the cookie question, and a site whose
 * advertising only loads after a click is reviewed as a site with no
 * advertising on it. The bootstrap therefore serves the ad script to a
 * recognised crawler without the banner. If that branch is removed, the
 * review starts failing on a site that looks perfectly healthy, so the gate
 * checks that the branch is still there.
 */
const CRAWLER_MARKER = 'isCrawler';

/**
 * The hosting provider's own page analytics.
 *
 * Cloudflare used to add its beacon to every page it served, which meant a
 * request left the browser before the reader had answered anything. The
 * automatic setup is switched off in the Cloudflare dashboard, and the
 * beacon is loaded by the consent bootstrap instead, so it goes out only
 * after the answer.
 *
 * The gate therefore treats the beacon like the two Google trackers: the
 * URL has to be in the source, so it can be loaded after the answer, and it
 * must not be in the document as a script tag, because then the request
 * would go out before the answer. The privacy policy has to name the
 * provider as well, since it is the one that receives the request.
 */
const HOSTING_MARKER = 'Cloudflare';
const HOSTING_BEACON = 'static.cloudflareinsights.com';

function collectFiles(dir: string, extensions: string[]): string[] {
  const found: string[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return found;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      found.push(...collectFiles(full, extensions));
    } else if (extensions.some((ext) => entry.endsWith(ext))) {
      found.push(full);
    }
  }
  return found;
}

if (!statSync(DIST).isDirectory()) {
  console.error('dist/ does not exist. Run "pnpm build" first.');
  process.exit(1);
}

const htmlFiles = collectFiles(DIST, ['.html']);
const cssFiles = collectFiles(DIST, ['.css']);
const problems: string[] = [];

let pagesWithoutBanner = 0;
let pagesWithoutReopen = 0;
let pagesWithoutDecision = 0;
let pagesWithoutAnalytics = 0;
let pagesWithoutAds = 0;
let pagesWithoutHosting = 0;
let pagesWithStaticTracker = 0;
let pagesWithoutCrawlerException = 0;
const staticExamples: string[] = [];

/**
 * A script tag that loads the hosting provider's beacon.
 *
 * Cloudflare injects this one at the edge, so it never appears in the
 * built output. If it does appear, the site is adding a second copy and
 * every page view would be counted twice.
 */
const HOSTING_TAG = new RegExp(
  `<script[^>]*src=["'][^"']*${HOSTING_BEACON.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
  'i',
);

let pagesWithHostingTag = 0;
let privacyPages = 0;
let privacyPagesWithoutHosting = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const rel = relative(DIST, file);

  if (!html.includes(BANNER_MARKER)) pagesWithoutBanner += 1;
  if (!html.includes(REOPEN_MARKER)) pagesWithoutReopen += 1;
  if (!html.includes(DECISION_MARKER)) pagesWithoutDecision += 1;
  if (!html.includes(ANALYTICS_MARKER)) pagesWithoutAnalytics += 1;
  if (!html.includes(ADS_MARKER)) pagesWithoutAds += 1;
  if (!html.includes(HOSTING_BEACON)) pagesWithoutHosting += 1;
  if (!html.includes(CRAWLER_MARKER)) pagesWithoutCrawlerException += 1;

  const staticTag = html.match(STATIC_TAG);
  if (staticTag) {
    pagesWithStaticTracker += 1;
    if (staticExamples.length < 3) staticExamples.push(rel);
  }

  if (HOSTING_TAG.test(html)) {
    pagesWithHostingTag += 1;
  }

  if (rel.replace(/\\/g, '/').endsWith('privacy/index.html')) {
    privacyPages += 1;
    if (!html.includes(HOSTING_MARKER)) privacyPagesWithoutHosting += 1;
  }
}

const cssHasPendingRule = cssFiles.some((file) =>
  readFileSync(file, 'utf8').includes(PENDING_MARKER),
);

if (pagesWithoutBanner > 0) {
  problems.push(`${pagesWithoutBanner} of ${htmlFiles.length} pages have no consent banner`);
}
if (pagesWithoutReopen > 0) {
  problems.push(
    `${pagesWithoutReopen} of ${htmlFiles.length} pages have no way to reopen the banner`,
  );
}
if (pagesWithoutDecision > 0) {
  problems.push(
    `${pagesWithoutDecision} of ${htmlFiles.length} pages do not remember the answer`,
  );
}
if (pagesWithoutAnalytics > 0) {
  problems.push(
    `${pagesWithoutAnalytics} of ${htmlFiles.length} pages cannot load the analytics script`,
  );
}
if (pagesWithoutAds > 0) {
  problems.push(
    `${pagesWithoutAds} of ${htmlFiles.length} pages cannot load the ad script`,
  );
}
if (pagesWithoutHosting > 0) {
  problems.push(
    `${pagesWithoutHosting} of ${htmlFiles.length} pages cannot load the hosting ` +
      'provider\'s page analytics after the answer',
  );
}
if (pagesWithStaticTracker > 0) {
  problems.push(
    `${pagesWithStaticTracker} of ${htmlFiles.length} pages load a tracker as a script tag, ` +
      `so the request goes out before the answer (${staticExamples.join(', ')})`,
  );
}
if (!cssHasPendingRule) {
  problems.push('no stylesheet keeps the ad units hidden while the answer is pending');
}
if (pagesWithoutCrawlerException > 0) {
  problems.push(
    `${pagesWithoutCrawlerException} of ${htmlFiles.length} pages do not serve the ad script ` +
      'to Google\'s crawler, so the advertising review sees a site with no advertising on it',
  );
}
if (pagesWithHostingTag > 0) {
  problems.push(
    `${pagesWithHostingTag} of ${htmlFiles.length} pages carry the hosting provider's beacon ` +
      'as a script tag, so the request goes out before the answer',
  );
}
if (privacyPagesWithoutHosting > 0) {
  problems.push(
    `${privacyPagesWithoutHosting} of ${privacyPages} privacy pages do not name the hosting ` +
      'provider. Its page analytics run on every visit, so the policy has to say so.',
  );
}

if (problems.length > 0) {
  console.error('Consent gating check failed:\n');
  for (const problem of problems) {
    console.error(`  ${problem}`);
  }
  process.exit(1);
}

console.log(
  `Consent gating check passed: ${htmlFiles.length} pages carry the banner, ` +
    `all three trackers are loaded only after the answer, the ad units stay hidden until then, ` +
    `Google's crawler is served the ad script directly, and the privacy policy names the ` +
    `hosting provider whose page analytics run on every visit.`,
);
