#!/usr/bin/env node
/**
 * Duplicate DOM id check.
 *
 * The calculator pages bind their results to the DOM by id, and the build
 * only proves that the ids exist — not that each one exists once. A result
 * cell and an input field sharing an id is invisible in a unit test and in
 * the source, and in the browser it shows up as a result that never fills in,
 * because getElementById returns the first match.
 *
 * This runs over the built HTML, where the duplication actually matters.
 *
 * Run: node scripts/check-dom-ids.ts
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const DIST = join(ROOT, 'dist');

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
const problems: string[] = [];
let totalIds = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const seen = new Map<string, number>();
  const idPattern = /\sid="([^"]+)"/g;
  let match = idPattern.exec(html);
  while (match !== null) {
    const id = match[1] ?? '';
    seen.set(id, (seen.get(id) ?? 0) + 1);
    match = idPattern.exec(html);
  }

  totalIds += seen.size;
  for (const [id, count] of seen) {
    if (count > 1) {
      problems.push(`${relative(DIST, file)}: id "${id}" appears ${count} times`);
    }
  }
}

if (problems.length > 0) {
  console.error(`Duplicate DOM ids found: ${problems.length}\n`);
  for (const problem of problems) {
    console.error(`  ${problem}`);
  }
  console.error(
    '\nEach id must appear once. A result cell and an input field sharing an id\n' +
      'makes the page script write to the input instead of the result.',
  );
  process.exit(1);
}

console.log(
  `DOM id check passed: ${htmlFiles.length} pages, ${totalIds} unique ids, 0 duplicates.`,
);
