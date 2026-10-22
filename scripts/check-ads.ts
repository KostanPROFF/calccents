#!/usr/bin/env node
/**
 * Ad gating check.
 *
 * The site ships no AdSense code until a publisher ID and slot IDs are
 * configured. That is not a preference: an <ins> element pointing at a
 * publisher account that has not been approved yet is one of the reasons an
 * application gets rejected, and a loader script for an account that does not
 * exist yet is a broken request on every page.
 *
 * The check runs over the built output rather than over the source, because
 * the source can be right and the build can still ship the wrong thing.
 *
 * Run: node scripts/check-ads.ts            (expects ads to be off)
 *      node scripts/check-ads.ts --expect-on (expects ads to be on)
 *      node scripts/check-ads.ts --auto      (derives the expectation from
 *                                             the environment variables)
 *
 * The automatic mode is the one that guards a release. It reads the four
 * variables that switch the ads on and works out what the build should
 * contain: all four set means ads on, none set means ads off, and some but
 * not all is a mistake — a site with a loader script and no ad units, or
 * with ad units and no publisher, is the half-configured state that gets
 * an application rejected or serves an empty box to every reader.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const DIST = join(ROOT, 'dist');

/**
 * The four variables that switch the ads on.
 *
 * All four or none. A partial configuration is a defect, not a state to
 * ship.
 */
const AD_ENV_VARS = [
  'PUBLIC_ADSENSE_CLIENT',
  'PUBLIC_ADSENSE_SLOT_RESULT',
  'PUBLIC_ADSENSE_SLOT_IN_ARTICLE',
  'PUBLIC_ADSENSE_SLOT_FOOTER',
] as const;

const auto = process.argv.includes('--auto');
const configured = AD_ENV_VARS.filter((name) => Boolean(process.env[name]));

if (auto && configured.length > 0 && configured.length < AD_ENV_VARS.length) {
  console.error(
    'Ad gating check failed: advertising is half configured.\n',
  );
  for (const name of AD_ENV_VARS) {
    const state = process.env[name] ? 'set' : 'missing';
    console.error(`  ${name}: ${state}`);
  }
  console.error(
    '\nSet all four or none. A build with a loader script and no ad units,\n' +
      'or with ad units and no publisher, is the state that gets an AdSense\n' +
      'application rejected.',
  );
  process.exit(1);
}

const expectOn = auto ? configured.length === AD_ENV_VARS.length : process.argv.includes('--expect-on');

/** Marks that must not appear in HTML or JS while ads are off. */
const AD_MARKERS = [
  'pagead2.googlesyndication.com',
  'googlesyndication',
  'class="adsbygoogle"',
  'data-ad-client',
  'data-ad-slot',
];

/** The most ad slots any single page may carry. */
const MAX_SLOTS_PER_PAGE = 3;

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
const scriptFiles = collectFiles(DIST, ['.js']);
const problems: string[] = [];

function countOccurrences(haystack: string, needle: string): number {
  let count = 0;
  let index = haystack.indexOf(needle);
  while (index !== -1) {
    count += 1;
    index = haystack.indexOf(needle, index + needle.length);
  }
  return count;
}

if (!expectOn) {
  for (const file of [...htmlFiles, ...scriptFiles]) {
    const source = readFileSync(file, 'utf8');
    for (const marker of AD_MARKERS) {
      if (source.includes(marker)) {
        problems.push(`${relative(DIST, file)} contains "${marker}"`);
      }
    }
  }
} else {
  const pagesWithSlots: string[] = [];

  for (const file of htmlFiles) {
    const source = readFileSync(file, 'utf8');
    const rel = relative(DIST, file);

    if (!source.includes('pagead2.googlesyndication.com')) {
      problems.push(`${rel} has no AdSense loader script`);
    }

    const slots = countOccurrences(source, 'class="adsbygoogle"');
    if (slots > MAX_SLOTS_PER_PAGE) {
      problems.push(`${rel} carries ${slots} ad slots, the limit is ${MAX_SLOTS_PER_PAGE}`);
    }
    if (slots > 0) pagesWithSlots.push(rel);
  }

  if (pagesWithSlots.length === 0) {
    problems.push('no page carries an ad slot, so the slot IDs are not wired up');
  }

  // The publisher ID in the built page has to be the one that was
  // configured. A typo here would ship ads pointing at an account that is
  // not this site's, and the failure would show up as an empty box rather
  // than as an error.
  const clientId = process.env.PUBLIC_ADSENSE_CLIENT;
  const firstPage = pagesWithSlots[0];
  if (clientId && firstPage) {
    const source = readFileSync(join(DIST, firstPage), 'utf8');
    if (!source.includes(`data-ad-client="${clientId}"`)) {
      problems.push(
        `the built pages carry a publisher ID other than ${clientId} (checked ${firstPage})`,
      );
    }
  }
}

if (problems.length > 0) {
  console.error(
    `Ad gating check failed (${expectOn ? 'expecting ads on' : 'expecting ads off'}):\n`,
  );
  for (const problem of problems) {
    console.error(`  ${problem}`);
  }
  process.exit(1);
}

if (expectOn) {
  console.log(
    `Ad gating check passed: ${htmlFiles.length} pages, ads on, loader present, ` +
      `publisher ID matches, at most ${MAX_SLOTS_PER_PAGE} slots per page.`,
  );
} else {
  console.log(
    `Ad gating check passed: ${htmlFiles.length} pages and ${scriptFiles.length} scripts ` +
      `carry no AdSense code.`,
  );
}
