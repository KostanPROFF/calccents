// Copies the page tree of one locale into another.
//
// The pages are thin wrappers: each one hands a locale to a component, and
// the component reads its strings from the dictionary. A new language
// therefore needs the same tree with the locale changed, and copying it by
// hand invites a typo in one of the sixteen files.
//
// The English tree is the reference. The Russian tree is used as the shape
// of the guide page, because it is the one that reads its list of guides from
// the collection at build time.
//
// Usage: node scripts/generate-locale-pages.mjs <locale> [...]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = path.join(ROOT, 'src', 'pages');
const REFERENCE = 'ru';

/** Every page file in the reference tree, with its locale replaced. */
function collect(dir, base = '') {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    const relative = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      out.push(...collect(full, relative));
    } else if (entry.name.endsWith('.astro')) {
      out.push(relative);
    }
  }
  return out;
}

const locales = process.argv.slice(2);
if (locales.length === 0) {
  process.stderr.write('usage: node scripts/generate-locale-pages.mjs <locale> [...]\n');
  process.exit(1);
}

const referenceDir = path.join(PAGES, REFERENCE);
const files = collect(referenceDir);

for (const locale of locales) {
  const targetDir = path.join(PAGES, locale);
  for (const relative of files) {
    const source = fs.readFileSync(path.join(referenceDir, relative), 'utf8');
    // The locale appears as a string literal in the component call and in the
    // guide query. Both are replaced, and nothing else is touched.
    const output = source
      .split(`'${REFERENCE}'`)
      .join(`'${locale}'`)
      .split(`"${REFERENCE}"`)
      .join(`"${locale}"`);
    const target = path.join(targetDir, relative);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, output);
  }
  process.stdout.write(`${locale}: ${files.length} pages\n`);
}
