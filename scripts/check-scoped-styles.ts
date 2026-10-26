#!/usr/bin/env node
/**
 * Scoped style check.
 *
 * Astro scopes the styles of a component to the elements that component
 * renders: the rule becomes `.thing[data-astro-cid-xxxx]`, and the
 * elements carry that attribute. An element that arrives another way does
 * not carry it, so the rule never reaches it.
 *
 * The way an element arrives another way is `set:html`, which writes a
 * string of markup into the page as it is. The markup in that string has
 * no scope attribute, and a scoped rule written for it in the same
 * component silently does nothing.
 *
 * The failure is quiet. The element falls back to the browser's own
 * styling: a button that was written to read as a link comes back as a
 * grey box with the browser's own text colour, at a contrast the page was
 * never designed for. Nothing in the build complains, and a screenshot
 * of the page still looks fine.
 *
 * So this runs over the built output: it collects the class names that
 * appear on elements with no scope attribute, and the class names that
 * scoped rules target, and reports the overlap.
 *
 * Run: node scripts/check-scoped-styles.ts
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const DIST = join(ROOT, 'dist');

/** The attribute Astro puts on the elements of a component. */
const SCOPE = /data-astro-cid-[a-z0-9]+/i;

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

/**
 * The class names used on elements that carry no scope attribute.
 *
 * An element with no scope attribute is either plain markup written by
 * hand, or markup that arrived through `set:html`. Either way, a scoped
 * rule cannot reach it.
 */
const unscopedClasses = new Map<string, string>();

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const rel = relative(DIST, file);

  for (const match of html.matchAll(/<([a-z][a-z0-9-]*)\b([^>]*)>/gi)) {
    const [, tag, attributes] = match;
    if (SCOPE.test(attributes)) continue;
    const classMatch = attributes.match(/class=["']([^"']+)["']/i);
    if (!classMatch) continue;
    for (const name of classMatch[1].split(/\s+/)) {
      if (!name) continue;
      if (!unscopedClasses.has(name)) {
        unscopedClasses.set(name, rel);
      }
    }
  }
}

/**
 * The class names that scoped rules target.
 *
 * The styles of a component are written into the page as a style tag, and
 * the stylesheet Astro builds carries them too, so both are read.
 */
const scopedClasses = new Map<string, string>();

const cssFiles = collectFiles(DIST, ['.css']);

for (const file of cssFiles) {
  const css = readFileSync(file, 'utf8');
  const rel = relative(DIST, file);
  for (const match of css.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const [, selector] = match;
    if (!SCOPE.test(selector)) continue;
    for (const name of selector.matchAll(/\.([a-z][a-z0-9_-]*)/gi)) {
      if (!scopedClasses.has(name[1])) {
        scopedClasses.set(name[1], rel);
      }
    }
  }
}

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    const [, css] = match;
    for (const rule of css.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
      const [, selector] = rule;
      if (!SCOPE.test(selector)) continue;
      for (const name of selector.matchAll(/\.([a-z][a-z0-9_-]*)/gi)) {
        if (!scopedClasses.has(name[1])) {
          scopedClasses.set(name[1], relative(DIST, file));
        }
      }
    }
  }
}

const problems: string[] = [];

for (const [name, where] of unscopedClasses) {
  const rule = scopedClasses.get(name);
  if (!rule) continue;
  problems.push(
    `The class "${name}" is used on elements without a scope attribute (${where}), but a ` +
      `scoped rule targets it (${rule}). That rule cannot reach those elements, so they keep ` +
      'the browser\'s own styling. Write the rule as a global one, or render the element ' +
      'from the component that owns the style.',
  );
}

if (problems.length > 0) {
  console.error('Scoped style check failed:\n');
  for (const problem of problems) {
    console.error(`  ${problem}`);
  }
  process.exit(1);
}

console.log(
  `Scoped style check passed: ${htmlFiles.length} pages, ${unscopedClasses.size} classes on ` +
    'elements without a scope attribute, and no scoped rule targets any of them.',
);
