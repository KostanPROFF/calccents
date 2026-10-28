#!/usr/bin/env node
/**
 * Consent gating check.
 *
 * Three scripts on this site set cookies: the AdSense loader, which serves
 * the advertising, the Google Analytics loader, which counts the page views,
 * and the Google Tag Manager container, which holds the tags the site fires.
 * None of them may be in the document before the reader has answered the
 * cookie question.
 *
 * The gate proves six things over the built output, where the mistake
 * would actually ship:
 *
 *   1. the banner is on every page, and the way back to it is too
 *   2. all four script URLs are present, so they can be loaded after
 *      consent
 *   3. none of them is loaded as a script tag, so nothing goes out before
 *      the answer
 *   4. the hosting provider's beacon is loaded by the bootstrap, so the
 *      request waits for the answer as well
 *   5. the privacy policy names that provider, because it is the one that
 *      receives the request
 *   6. the privacy policy names the tag manager, because it is a third
 *      party that receives the request too
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

import { EU_COUNTRIES, isEuCountry } from '../src/lib/data/euCountries.ts';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const DIST = join(ROOT, 'dist');

/** The banner, and the button that opens it again. */
const BANNER_MARKER = 'id="consent-banner"';
const REOPEN_MARKER = 'data-consent-open';

/** Where the answer is kept in the browser. */
const DECISION_MARKER = 'cc-consent';

/** The trackers, and where they are loaded from. */
const ANALYTICS_MARKER = 'googletagmanager.com/gtag/js?id=';
const ADS_MARKER = 'pagead2.googlesyndication.com';

/**
 * The tag manager container.
 *
 * The container holds the tags the site fires, so a tag can be added or
 * changed without a new build. It is served by Google from the same host as
 * the analytics script, but from another path, so it needs a marker of its
 * own: a check that only knew about the analytics path would let the
 * container through in the document.
 *
 * The container sets cookies, so it is treated like the other two Google
 * trackers: the URL has to be in the source, so it can be loaded after the
 * answer, and it must not be in the document as a script tag.
 */
const GTM_MARKER = 'googletagmanager.com/gtm.js?id=';

/**
 * A script tag that loads a tracker.
 *
 * The tag is what makes the request. The URL inside the bootstrap is just
 * a string in a script; the tag is what the browser fetches.
 */
const STATIC_TAG = new RegExp(
  `<script[^>]*src=["'][^"']*(${[
    ANALYTICS_MARKER,
    GTM_MARKER,
    ADS_MARKER,
  ]
    .map((marker) => marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')})`,
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

/**
 * The code that takes the beacon Cloudflare adds by itself out of the
 * document.
 *
 * Cloudflare can inject a beacon into every page it serves, and that one
 * reports the page view before the reader has answered anything. The
 * automatic setup is switched off in the Cloudflare dashboard, so there is
 * nothing to remove; the consent bootstrap removes it anyway, and the site's
 * own copy is loaded after the answer instead. If the removal is gone and
 * the setup is ever switched back on, the page view goes out before the
 * answer again.
 */
const HOSTING_SUPPRESSION_MARKER = 'suppressInjectedBeacon';

/**
 * The beacon configuration on the page.
 *
 * The configuration is what tells the beacon where to report the page view.
 * Cloudflare's own dashboard hands out a configuration with the site token
 * and nothing else, and the beacon then reports to Cloudflare's analytics
 * service, which answers with the CORS headers this domain needs.
 *
 * The "version" field changes that: with it, the beacon reports to the
 * site's own /cdn-cgi/rum endpoint instead, and that endpoint answers 404
 * while the automatic setup in the Cloudflare dashboard is off. The page
 * view would then be counted nowhere, and nothing on the page would show
 * it. The field is easy to add back by hand, because it looks like part of
 * the configuration Cloudflare writes itself, so the gate checks that it is
 * gone.
 */
const HOSTING_BEACON_VERSION_MARKER = 'version: CLOUDFLARE_VERSION';

/**
 * The exclusion of readers in the European Union.
 *
 * The hosting provider's dashboard can be told not to count visitors from
 * the European Union, but that setting only covers the beacon the edge adds
 * to every page it serves. This site loads the beacon itself, so the country
 * is asked for and the beacon is left out for a reader in the EU.
 *
 * Two things have to stay in place: the branch in the bootstrap that does
 * it, and the sentence in the privacy policy that tells the reader. The
 * words of that sentence differ in the three languages, so the gate
 * accepts any of the three.
 */
const EU_EXCLUSION_MARKER = 'loadHostingAnalyticsWhenKnown';
const EU_POLICY_MARKERS = ['European Union', 'Европейского союза', 'Unión Europea'];

/**
 * The list of the member states, as it goes into the page.
 *
 * The bootstrap is handed the list, and the page has to carry all of it: a
 * list that lost a country would quietly let a reader in that country be
 * counted. The list also has to be the list of the member states and not
 * something longer, because a country that is not a member state is not
 * covered by the promise the policy makes.
 */
const EU_LIST_MARKER = JSON.stringify(EU_COUNTRIES);

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
let pagesWithoutGtm = 0;
let pagesWithoutHosting = 0;
let pagesWithoutSuppression = 0;
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
let pagesWithBeaconVersion = 0;
let pagesWithoutEuExclusion = 0;
let pagesWithoutEuList = 0;
let privacyPages = 0;
let privacyPagesWithoutHosting = 0;
let privacyPagesWithoutEu = 0;
let privacyPagesWithoutGtm = 0;

/**
 * The tag manager, named in the privacy policy.
 *
 * The container is a third party that receives a request on every visit a
 * reader accepts, so the policy has to name it. The name of the service is
 * the same in the three languages, so one marker covers all of them.
 */
const GTM_POLICY_MARKER = 'Google Tag Manager';

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const rel = relative(DIST, file);

  if (!html.includes(BANNER_MARKER)) pagesWithoutBanner += 1;
  if (!html.includes(REOPEN_MARKER)) pagesWithoutReopen += 1;
  if (!html.includes(DECISION_MARKER)) pagesWithoutDecision += 1;
  if (!html.includes(ANALYTICS_MARKER)) pagesWithoutAnalytics += 1;
  if (!html.includes(ADS_MARKER)) pagesWithoutAds += 1;
  if (!html.includes(GTM_MARKER)) pagesWithoutGtm += 1;
  if (!html.includes(HOSTING_BEACON)) pagesWithoutHosting += 1;
  if (!html.includes(HOSTING_SUPPRESSION_MARKER)) pagesWithoutSuppression += 1;
  if (!html.includes(CRAWLER_MARKER)) pagesWithoutCrawlerException += 1;

  const staticTag = html.match(STATIC_TAG);
  if (staticTag) {
    pagesWithStaticTracker += 1;
    if (staticExamples.length < 3) staticExamples.push(rel);
  }

  if (HOSTING_TAG.test(html)) {
    pagesWithHostingTag += 1;
  }

  if (html.includes(HOSTING_BEACON_VERSION_MARKER)) {
    pagesWithBeaconVersion += 1;
  }

  if (!html.includes(EU_EXCLUSION_MARKER)) {
    pagesWithoutEuExclusion += 1;
  }

  if (!html.includes(EU_LIST_MARKER)) {
    pagesWithoutEuList += 1;
  }

  if (rel.replace(/\\/g, '/').endsWith('privacy/index.html')) {
    privacyPages += 1;
    if (!html.includes(HOSTING_MARKER)) privacyPagesWithoutHosting += 1;
    if (!html.includes(GTM_POLICY_MARKER)) privacyPagesWithoutGtm += 1;
    if (!EU_POLICY_MARKERS.some((marker) => html.includes(marker))) {
      privacyPagesWithoutEu += 1;
    }
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
if (pagesWithoutGtm > 0) {
  problems.push(
    `${pagesWithoutGtm} of ${htmlFiles.length} pages cannot load the tag manager ` +
      'after the answer',
  );
}
if (pagesWithoutSuppression > 0) {
  problems.push(
    `${pagesWithoutSuppression} of ${htmlFiles.length} pages do not remove the beacon ` +
      'the hosting provider adds by itself, so the page view goes out before the answer',
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
if (pagesWithBeaconVersion > 0) {
  problems.push(
    `${pagesWithBeaconVersion} of ${htmlFiles.length} pages point the hosting provider's beacon ` +
      "at the site's own /cdn-cgi/rum endpoint, which answers 404 while the automatic setup in " +
      'the Cloudflare dashboard is off. The page view would be counted nowhere.',
  );
}
if (privacyPagesWithoutHosting > 0) {
  problems.push(
    `${privacyPagesWithoutHosting} of ${privacyPages} privacy pages do not name the hosting ` +
      'provider. Its page analytics run on every visit, so the policy has to say so.',
  );
}
if (pagesWithoutEuExclusion > 0) {
  problems.push(
    `${pagesWithoutEuExclusion} of ${htmlFiles.length} pages do not leave the hosting ` +
      "provider's beacon out for a reader in the European Union",
  );
}
if (privacyPagesWithoutEu > 0) {
  problems.push(
    `${privacyPagesWithoutEu} of ${privacyPages} privacy pages do not say that a reader in ` +
      'the European Union is not counted by the hosting provider',
  );
}
if (privacyPagesWithoutGtm > 0) {
  problems.push(
    `${privacyPagesWithoutGtm} of ${privacyPages} privacy pages do not name the tag manager. ` +
      'It is a third party that receives a request on every visit a reader accepts, so the ' +
      'policy has to say so.',
  );
}
if (pagesWithoutEuList > 0) {
  problems.push(
    `${pagesWithoutEuList} of ${htmlFiles.length} pages do not carry the whole list of the ` +
      'member states of the European Union, so a reader in a country that fell off the list ' +
      'would be counted',
  );
}
if (
  EU_COUNTRIES.length !== 27 ||
  !isEuCountry('DE') ||
  !isEuCountry('FR') ||
  isEuCountry('US') ||
  isEuCountry('GB')
) {
  problems.push(
    'the list of the member states of the European Union is not the list of twenty-seven ' +
      'member states, so the promise the policy makes is not the one the code keeps',
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
    `all four trackers are loaded only after the answer, the ad units stay hidden until then, ` +
    `Google's crawler is served the ad script directly, the hosting provider's beacon is left ` +
    `out for a reader in the European Union, and the privacy policy names the hosting provider ` +
    `whose page analytics run on every visit and the tag manager that holds the site's tags.`,
);
