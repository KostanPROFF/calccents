#!/usr/bin/env node
/**
 * Internal link checker.
 *
 * Every internal link in the site has to resolve to a page that will exist
 * in the build. A broken link is a small thing, and on a site whose whole
 * proposition is that its numbers can be checked, it is the kind of small
 * thing that decides whether the proposition is true.
 *
 * Run: node scripts/check-links.ts
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');

interface Route {
  /** Route pattern, e.g. "/tools/[...slug]/". */
  pattern: string;
  /** Source file, for reporting. */
  file: string;
}

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

/** Turn a file under src/pages into the route it produces. */
function routeForPage(file: string): string {
  const rel = relative(join(ROOT, 'src', 'pages'), file).split(/[\\/]/);
  const last = rel[rel.length - 1] ?? '';
  const withoutExtension = last.replace(/\.(astro|ts|js|mjs)$/, '');
  const parts = rel.slice(0, -1);

  if (withoutExtension === 'index') {
    return parts.length === 0 ? '/' : `/${parts.join('/')}/`;
  }
  if (withoutExtension === '404') {
    return '/404';
  }
  if (withoutExtension.includes('[')) {
    const dynamic = withoutExtension.replace('[...slug]', '*');
    return `/${[...parts, dynamic].join('/')}/`;
  }
  return `/${[...parts, withoutExtension].join('/')}/`;
}

const pageFiles = collectFiles(join(ROOT, 'src', 'pages'), ['.astro', '.ts']);
const routes: Route[] = pageFiles.map((file) => ({
  pattern: routeForPage(file),
  file: relative(ROOT, file),
}));

/** Routes produced by the content collection, one per guide. */
const guideFiles = collectFiles(join(ROOT, 'src', 'content', 'guides'), ['.mdx']);
for (const file of guideFiles) {
  const id = relative(join(ROOT, 'src', 'content', 'guides'), file)
    .split(/[\\/]/)
    .pop()!
    .replace(/\.mdx$/, '');
  routes.push({ pattern: `/guides/${id}/`, file: relative(ROOT, file) });
}

/** Static files shipped from public/. */
const publicFiles = collectFiles(join(ROOT, 'public'), ['*']).map((file) =>
  `/${relative(ROOT, file).split(/[\\/]/).slice(1).join('/')}`,
);

/**
 * Files the build produces that have no source file to point at. The sitemap
 * integration writes these during `astro build`, so a link to one is a link
 * to something that will exist in the deployed site.
 */
const BUILD_OUTPUTS = ['/sitemap-index.xml', '/sitemap-0.xml'];

function matchesRoute(href: string): boolean {
  const clean = href.split('#')[0]!.split('?')[0]!;
  if (clean === '' || clean === '/') return routes.some((route) => route.pattern === '/');
  const normalised = clean.endsWith('/') ? clean : `${clean}/`;

  for (const route of routes) {
    const pattern = route.pattern;
    if (pattern.includes('*')) {
      const prefix = pattern.split('*')[0]!;
      if (normalised.startsWith(prefix)) return true;
      continue;
    }
    if (pattern === normalised || pattern === clean) return true;
  }
  return (
    publicFiles.includes(clean) ||
    publicFiles.includes(normalised) ||
    BUILD_OUTPUTS.includes(clean)
  );
}

interface BrokenLink {
  file: string;
  href: string;
}

const broken: BrokenLink[] = [];
const sourceFiles = [
  ...collectFiles(join(ROOT, 'src', 'pages'), ['.astro', '.ts']),
  ...collectFiles(join(ROOT, 'src', 'components'), ['.astro']),
  ...collectFiles(join(ROOT, 'src', 'layouts'), ['.astro']),
  ...collectFiles(join(ROOT, 'src', 'content'), ['.mdx']),
];

const LINK_PATTERNS = [
  /href=["']([^"'#?]+)/g,
  /\]\(([^)]+)\)/g,
];

for (const file of sourceFiles) {
  const source = readFileSync(file, 'utf8');
  const rel = relative(ROOT, file);
  for (const pattern of LINK_PATTERNS) {
    pattern.lastIndex = 0;
    let match = pattern.exec(source);
    while (match !== null) {
      const href = match[1] ?? '';
      if (href.startsWith('/') && !href.startsWith('//')) {
        if (!matchesRoute(href)) {
          broken.push({ file: rel, href });
        }
      }
      match = pattern.exec(source);
    }
  }
}

if (broken.length > 0) {
  console.error(`Broken internal links found: ${broken.length}\n`);
  for (const link of broken) {
    console.error(`  ${link.file} -> ${link.href}`);
  }
  process.exit(1);
}

console.log(
  `Link check passed: ${sourceFiles.length} files, ${routes.length} routes, 0 broken internal links.`,
);
