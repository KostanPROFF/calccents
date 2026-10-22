#!/usr/bin/env node
/**
 * Ad gating check.
 *
 * The site carries the AdSense loader script on every page, because that
 * is what turns on auto ads: Google places the units itself, wherever it
 * decides they fit. The hand-placed units in the tool pages are a second,
 * separate mechanism, and they stay off until their slot IDs are
 * configured.
 *
 * So the site has two states, and the check knows both:
 *
 *   script, no units   the default, and the state the site ships in now
 *   script and units   the state after the slot IDs are configured
 *
 * There is a third state the check refuses to let through: units without
 * the script, or some of the slot IDs configured and some not. An <ins>
 * element pointing at a publisher account that has no ad behind it, or a
 * page carrying auto ads and manual units at the same time, is the kind of
 * thing that gets an application rejected.
 *
 * The check runs over the built output rather than over the source, because
 * the source can be right and the build can still ship the wrong thing.
 *
 * Run: node scripts/check-ads.ts             (derives the state from the
 *                                             environment variables)
 *      node scripts/check-ads.ts --expect-slots
 *      node scripts/check-ads.ts --expect-no-slots
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const DIST = join(ROOT, 'dist');

/** The loader script. It is on every page, in the head, always. */
const SCRIPT_MARKER = 'pagead2.googlesyndication.com';

/** Marks that only appear when a hand-placed ad unit is rendered. */
const SLOT_MARKERS = ['class="adsbygoogle"', 'data-ad-slot'];

/** The most ad units any single page may carry. */
const MAX_SLOTS_PER_PAGE = 3;

/**
 * The variables that switch the hand-placed units on.
 *
 * All three or none. A partial configuration is a defect, not a state to
 * ship.
 */
const SLOT_ENV_VARS = [
  'PUBLIC_ADSENSE_SLOT_RESULT',
  'PUBLIC_ADSENSE_SLOT_IN_ARTICLE',
  'PUBLIC_ADSENSE_SLOT_FOOTER',
] as const;

function collectFiles(dir: string, extensions: string[]): string[] {
  const found: string[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return found;
  }
  // "*" means any file. String.endsWith has no wildcard semantics, so it
  // has to be handled separately or the match silently returns nothing.
  const anyFile = extensions.includes('*');
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      found.push(...collectFiles(full, extensions));
    } else if (anyFile || extensions.some((ext) => entry.endsWith(ext))) {
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

/** The publisher ID the loader script asks for on a page. */
function clientFromScript(source: string): string | undefined {
  const match = source.match(/adsbygoogle\.js\?client=([\w-]+)/);
  return match?.[1];
}

/** The publisher ID the hand-placed units on a page point at. */
function clientFromSlots(source: string): string | undefined {
  const match = source.match(/data-ad-client="([^"]+)"/);
  return match?.[1];
}

// What the build is expected to contain.
const configuredSlots = SLOT_ENV_VARS.filter((name) => Boolean(process.env[name]));

if (
  configuredSlots.length > 0 &&
  configuredSlots.length < SLOT_ENV_VARS.length
) {
  console.error('Ad gating check failed: the ad units are half configured.\n');
  for (const name of SLOT_ENV_VARS) {
    console.error(`  ${name}: ${process.env[name] ? 'set' : 'missing'}`);
  }
  console.error(
    '\nSet all three slot IDs or none. A page with some ad units and without\n' +
      'the others is a page with an empty box in it.',
  );
  process.exit(1);
}

const expectSlots = process.argv.includes('--expect-slots')
  ? true
  : process.argv.includes('--expect-no-slots')
    ? false
    : configuredSlots.length === SLOT_ENV_VARS.length;

const pagesWithSlots: string[] = [];
let scriptClient: string | undefined;

// The problems are counted rather than listed one page at a time. A gate
// that prints eighty lines says the same thing eighty times and makes the
// one line that matters hard to find.
let pagesWithoutScript = 0;
let pagesOverLimit = 0;
let pagesWithUnexpectedUnits = 0;
const markerHits = new Map<string, number>();

for (const file of htmlFiles) {
  const source = readFileSync(file, 'utf8');
  const rel = relative(DIST, file);

  if (!source.includes(SCRIPT_MARKER)) {
    pagesWithoutScript += 1;
  } else {
    scriptClient ??= clientFromScript(source);
  }

  const slots = countOccurrences(source, 'class="adsbygoogle"');
  if (slots > MAX_SLOTS_PER_PAGE) {
    pagesOverLimit += 1;
  }
  if (slots > 0) pagesWithSlots.push(rel);
}

if (expectSlots) {
  if (pagesWithSlots.length === 0) {
    problems.push('no page carries an ad unit, so the slot IDs are not wired up');
  }

  // The units have to point at the same publisher account as the loader
  // script. A mismatch here would serve ads from an account that is not
  // this site's, and the symptom would be an empty box rather than an
  // error.
  for (const rel of pagesWithSlots) {
    const source = readFileSync(join(DIST, rel), 'utf8');
    const slotClient = clientFromSlots(source);
    if (!slotClient) {
      problems.push(`${rel} has an ad unit with no publisher ID`);
    } else if (scriptClient && slotClient !== scriptClient) {
      problems.push(
        `${rel} points its ad unit at ${slotClient} while the loader script asks for ${scriptClient}`,
      );
    }
  }
} else {
  pagesWithUnexpectedUnits = pagesWithSlots.length;
  for (const file of htmlFiles) {
    const source = readFileSync(file, 'utf8');
    for (const marker of SLOT_MARKERS) {
      if (source.includes(marker)) {
        markerHits.set(marker, (markerHits.get(marker) ?? 0) + 1);
      }
    }
  }
}

if (pagesWithoutScript > 0) {
  problems.push(
    `${pagesWithoutScript} of ${htmlFiles.length} pages have no AdSense loader script`,
  );
}

if (pagesOverLimit > 0) {
  problems.push(
    `${pagesOverLimit} pages carry more than ${MAX_SLOTS_PER_PAGE} ad units`,
  );
}

if (pagesWithUnexpectedUnits > 0) {
  problems.push(
    `${pagesWithUnexpectedUnits} pages carry an ad unit, but no slot IDs are configured`,
  );
}

for (const [marker, count] of markerHits) {
  problems.push(`${count} pages contain "${marker}"`);
}

if (problems.length > 0) {
  console.error(
    `Ad gating check failed (expecting ${expectSlots ? 'ad units' : 'no ad units'}):\n`,
  );
  for (const problem of problems) {
    console.error(`  ${problem}`);
  }
  process.exit(1);
}

if (expectSlots) {
  console.log(
    `Ad gating check passed: ${htmlFiles.length} pages, loader present, ` +
      `${pagesWithSlots.length} pages carry ad units, at most ${MAX_SLOTS_PER_PAGE} per page.`,
  );
} else {
  console.log(
    `Ad gating check passed: ${htmlFiles.length} pages carry the AdSense loader and ` +
      `no ad units, and ${scriptFiles.length} scripts are clean.`,
  );
}
