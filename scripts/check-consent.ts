#!/usr/bin/env node
/**
 * Consent check.
 *
 * The consent question is asked by Google's own certified consent message,
 * which the AdSense loader shows to readers in the European Economic Area,
 * the United Kingdom and Switzerland. The site's part is to put the loader
 * on every page and to start Google Analytics with storage denied in those
 * countries, so that no analytics cookie is set before the answer.
 *
 * The gate proves, over the built output where a mistake would ship:
 *
 *   1. every page loads the AdSense loader, which carries Google's message
 *   2. every page starts the analytics in consent mode: denied by default in
 *      the consent countries, granted elsewhere, on the production host only,
 *      and the full list of those countries is on the page
 *   3. the analytics loader is not a script tag, so it cannot run before the
 *      consent defaults are set
 *   4. every page carries the footer button that reopens Google's message
 *   5. the hosting provider's beacon is loaded by the bootstrap, never as a
 *      script tag, without the "version" field, and is left out for a reader
 *      in the European Union, and the privacy policy says so and names the
 *      provider
 *   6. the old banner of the site's own is gone, so a reader is never asked
 *      twice
 *
 * Run: node scripts/check-consent.ts
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { CONSENT_COUNTRIES, EU_COUNTRIES, isEuCountry } from '../src/lib/data/euCountries.ts';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const DIST = join(ROOT, 'dist');

/** The AdSense loader, as a script tag: it is what shows Google's message. */
const ADS_TAG = /<script[^>]*src=["']https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-\d+/i;

/** The analytics loader must not be a tag: the defaults have to come first. */
const ANALYTICS_MARKER = 'googletagmanager.com/gtag/js?id=';
const ANALYTICS_TAG = /<script[^>]*src=["'][^"']*googletagmanager\.com\/gtag\/js/i;

/** Consent mode: denied in the consent countries, granted elsewhere. */
const CONSENT_MODE_MARKERS = [
  'denied.region = CONSENT_COUNTRIES;',
  "gtag('consent', 'default', denied);",
  "gtag('consent', 'default', consentState('granted'));",
  "if (host !== ANALYTICS_HOST && host !== 'www.' + ANALYTICS_HOST) return;",
];
const CONSENT_LIST_MARKER = `var CONSENT_COUNTRIES = ${JSON.stringify(CONSENT_COUNTRIES)};`;

/** The footer button that reopens Google's message. */
const REOPEN_MARKER = 'data-consent-open';
const REVOCATION_MARKER = 'googlefc.showRevocationMessage()';

/** The banner the site used to show itself. */
const OLD_BANNER_MARKER = 'id="consent-banner"';

/** The hosting provider's beacon. */
const HOSTING_MARKER = 'Cloudflare';
const HOSTING_BEACON = 'static.cloudflareinsights.com';
const HOSTING_TAG = /<script[^>]*src=["'][^"']*static\.cloudflareinsights\.com/i;
const HOSTING_SUPPRESSION_MARKER = 'suppressInjectedBeacon';
const HOSTING_BEACON_VERSION_MARKER = 'version: CLOUDFLARE_VERSION';
const EU_EXCLUSION_MARKER = 'loadHostingAnalyticsWhenKnown';
const EU_LIST_MARKER = `var EU_COUNTRIES = ${JSON.stringify(EU_COUNTRIES)};`;
const EU_POLICY_MARKERS = ['European Union', 'Европейского союза', 'Unión Europea'];

/** The European Economic Area, the United Kingdom and Switzerland. */
const CONSENT_COUNTRY_COUNT = 32;
const EU_MEMBER_COUNT = 27;

function collectFiles(dir: string, extension: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      found.push(...collectFiles(full, extension));
    } else if (entry.endsWith(extension)) {
      found.push(full);
    }
  }
  return found;
}

interface PageRule {
  /** What is wrong when the rule fails on a page. */
  problem: string;
  /** Whether a page passes. */
  passes: (html: string) => boolean;
}

const PAGE_RULES: PageRule[] = [
  {
    problem: "do not load the AdSense loader, so Google's consent message is never shown",
    passes: (html) => ADS_TAG.test(html),
  },
  {
    problem: 'cannot load the analytics script',
    passes: (html) => html.includes(ANALYTICS_MARKER),
  },
  {
    problem: 'load the analytics as a script tag, before the consent defaults are set',
    passes: (html) => !ANALYTICS_TAG.test(html),
  },
  {
    problem:
      'do not start the analytics denied in the consent countries and granted elsewhere, ' +
      'on the production host only',
    passes: (html) => CONSENT_MODE_MARKERS.every((marker) => html.includes(marker)),
  },
  {
    problem: 'do not carry the whole list of the countries where consent is required',
    passes: (html) => html.includes(CONSENT_LIST_MARKER),
  },
  {
    problem: "have no button that reopens Google's consent message",
    passes: (html) => html.includes(REOPEN_MARKER) && html.includes(REVOCATION_MARKER),
  },
  {
    problem: "still carry the site's own banner, so a reader is asked twice",
    passes: (html) => !html.includes(OLD_BANNER_MARKER),
  },
  {
    problem: "cannot load the hosting provider's page analytics",
    passes: (html) => html.includes(HOSTING_BEACON) && html.includes(HOSTING_SUPPRESSION_MARKER),
  },
  {
    problem: "carry the hosting provider's beacon as a script tag",
    passes: (html) => !HOSTING_TAG.test(html),
  },
  {
    problem:
      "point the hosting provider's beacon at the site's own /cdn-cgi/rum endpoint, " +
      'which answers 404 while the automatic setup is off',
    passes: (html) => !html.includes(HOSTING_BEACON_VERSION_MARKER),
  },
  {
    problem: "do not leave the hosting provider's beacon out for a reader in the European Union",
    passes: (html) => html.includes(EU_EXCLUSION_MARKER) && html.includes(EU_LIST_MARKER),
  },
];

const PRIVACY_RULES: PageRule[] = [
  {
    problem: 'do not name the hosting provider',
    passes: (html) => html.includes(HOSTING_MARKER),
  },
  {
    problem: 'do not say that a reader in the European Union is not counted by the hosting provider',
    passes: (html) => EU_POLICY_MARKERS.some((marker) => html.includes(marker)),
  },
];

function failures(files: string[], rules: PageRule[]): string[] {
  const pages = files.map((file) => ({ rel: relative(DIST, file), html: readFileSync(file, 'utf8') }));
  return rules.flatMap((rule) => {
    const failing = pages.filter((page) => !rule.passes(page.html));
    if (failing.length === 0) return [];
    const examples = failing.slice(0, 3).map((page) => page.rel).join(', ');
    return [`${failing.length} of ${pages.length} pages ${rule.problem} (${examples})`];
  });
}

function listProblems(): string[] {
  const problems: string[] = [];
  if (EU_COUNTRIES.length !== EU_MEMBER_COUNT || !isEuCountry('DE') || isEuCountry('GB')) {
    problems.push('the list of the member states of the European Union is not the twenty-seven');
  }
  const required = [...EU_COUNTRIES, 'IS', 'LI', 'NO', 'GB', 'CH'];
  if (
    CONSENT_COUNTRIES.length !== CONSENT_COUNTRY_COUNT ||
    !required.every((code) => CONSENT_COUNTRIES.includes(code))
  ) {
    problems.push(
      'the consent countries are not the European Economic Area, the United Kingdom and Switzerland',
    );
  }
  return problems;
}

if (!statSync(DIST, { throwIfNoEntry: false })?.isDirectory()) {
  console.error('dist/ does not exist. Run "pnpm build" first.');
  process.exit(1);
}

const htmlFiles = collectFiles(DIST, '.html');
const privacyFiles = htmlFiles.filter((file) =>
  relative(DIST, file).replace(/\\/g, '/').endsWith('privacy/index.html'),
);

const problems = [
  ...failures(htmlFiles, PAGE_RULES),
  ...failures(privacyFiles, PRIVACY_RULES),
  ...listProblems(),
];

if (privacyFiles.length === 0) {
  problems.push('no privacy page was built');
}

if (problems.length > 0) {
  console.error('Consent check failed:\n');
  for (const problem of problems) {
    console.error(`  ${problem}`);
  }
  process.exit(1);
}

console.log(
  `Consent check passed: ${htmlFiles.length} pages load the AdSense loader with Google's ` +
    'consent message, start the analytics denied in the consent countries, carry the button ' +
    "that reopens the message, and keep the hosting provider's beacon away from EU readers.",
);
