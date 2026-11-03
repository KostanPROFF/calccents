// Builds a Calccents UI dictionary for a new language.
//
// The English dictionary is the source of truth for the shape of the file: the
// generator rewrites it in place, replacing every string literal with its
// translation, every comment with its translation, and every plural helper
// with the plural rule of the target language. Nothing else changes, so the
// new file keeps the structure, the key names and the order of the original.
//
// A language file holds one exported dictionary and nothing else. The English
// file also exports the `fill` helper and the `UiDictionary` type, and those
// belong to English alone: the helper is imported from `en.ts` by the
// registry, and the type is the shape every dictionary is checked against.
//
// Usage:
//   node scripts/build-locale-dictionary.mjs \
//     --source src/i18n/ui/en.ts \
//     --out src/i18n/ui/zh.ts \
//     --locale zh \
//     --translations translations/zh-ui.json
//
// The translations file holds:
//   { "strings": { "path.to.key": "text" },
//     "comments": { "<comment index>": "text" },
//     "plurals": { "path.to.key": "code" } }
import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        args[key] = next;
        i += 1;
      } else {
        args[key] = true;
      }
    }
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
for (const required of ['source', 'out', 'locale', 'translations']) {
  if (!args[required]) {
    process.stderr.write(`missing --${required}\n`);
    process.exit(1);
  }
}

const source = fs.readFileSync(args.source, 'utf8');
const payload = JSON.parse(fs.readFileSync(args.translations, 'utf8'));
const strings = payload.strings ?? {};
const comments = payload.comments ?? {};
const plurals = payload.plurals ?? {};
const locale = args.locale;

const sourceFile = ts.createSourceFile(
  args.source,
  source,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
);

/** Escapes a string for a JavaScript single- or double-quoted literal. */
function quote(text, char) {
  const escaped = text
    .replace(/\\/g, '\\\\')
    .split(char)
    .join('\\' + char)
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  return char + escaped + char;
}

/**
 * Makes a translated comment safe to paste into the source.
 *
 * The comment is copied with its own opening and closing markers intact, so
 * the only thing to watch for is a closing marker inside the text, which
 * would close the comment early and turn the rest of the file into a comment.
 */
function sanitizeComment(text) {
  const last = text.lastIndexOf('*/');
  if (last === -1) return text.replace(/\*\//g, '*\\/') + '\n */';
  const head = text.slice(0, last).replace(/\*\//g, '*\\/');
  return head + ' */';
}

/** Every leaf of the dictionary, with its position in the source. */
function collectLeaves() {
  const leaves = [];
  const walk = (node, pathParts) => {
    if (ts.isObjectLiteralExpression(node)) {
      for (const prop of node.properties) {
        if (!ts.isPropertyAssignment(prop)) continue;
        const name = prop.name;
        const key = ts.isIdentifier(name)
          ? name.text
          : ts.isStringLiteral(name)
            ? name.text
            : undefined;
        if (key === undefined) continue;
        walk(prop.initializer, [...pathParts, key]);
      }
      return;
    }
    if (ts.isArrayLiteralExpression(node)) {
      node.elements.forEach((element, index) => walk(element, [...pathParts, String(index)]));
      return;
    }
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      leaves.push({ path: pathParts, kind: 'string', start: node.getStart(sourceFile), end: node.getEnd() });
      return;
    }
    if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
      leaves.push({ path: pathParts, kind: 'function', start: node.getStart(sourceFile), end: node.getEnd() });
      return;
    }
    if (ts.isCallExpression(node)) {
      const first = node.arguments[0];
      if (first && ts.isStringLiteral(first)) {
        leaves.push({ path: pathParts, kind: 'string', start: first.getStart(sourceFile), end: first.getEnd() });
        return;
      }
    }
    leaves.push({ path: pathParts, kind: 'other', start: node.getStart(sourceFile), end: node.getEnd() });
  };

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name)) continue;
      if (!declaration.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) continue;
      walk(declaration.initializer, [declaration.name.text]);
    }
  }
  return leaves;
}

const leaves = collectLeaves();
const commentList = [];
{
  const scanner = ts.createScanner(
    ts.ScriptTarget.Latest,
    false,
    ts.LanguageVariant.Standard,
    source,
  );
  let token = scanner.scan();
  while (token !== ts.SyntaxKind.EndOfFileToken) {
    if (token === ts.SyntaxKind.SingleLineCommentTrivia || token === ts.SyntaxKind.MultiLineCommentTrivia) {
      commentList.push({ text: scanner.getTokenText(), start: scanner.getTokenPos(), end: scanner.getTextPos() });
    }
    token = scanner.scan();
  }
}

const edits = [];
const missing = [];

for (const leaf of leaves) {
  const key = leaf.path.join('.');
  if (leaf.kind === 'string') {
    const translated = strings[key];
    if (translated === undefined) {
      missing.push(key);
      continue;
    }
    const char = source[leaf.start] === '"' ? '"' : "'";
    edits.push({ start: leaf.start, end: leaf.end, text: quote(translated, char) });
  } else if (leaf.kind === 'function') {
    const code = plurals[key];
    if (code === undefined) {
      missing.push(key);
      continue;
    }
    edits.push({ start: leaf.start, end: leaf.end, text: code });
  } else {
    missing.push(key + ' (unsupported shape)');
  }
}

commentList.forEach((comment, index) => {
  const translated = comments[index];
  if (translated === undefined) return;
  edits.push({ start: comment.start, end: comment.end, text: sanitizeComment(translated) });
});

if (missing.length) {
  process.stderr.write(`missing ${missing.length} translation(s):\n  ${missing.slice(0, 20).join('\n  ')}\n`);
  process.exit(1);
}

// Apply the edits from the end of the file backwards, so the positions of the
// edits still to come stay valid.
edits.sort((a, b) => b.start - a.start);
let output = source;
for (const edit of edits) {
  output = output.slice(0, edit.start) + edit.text + output.slice(edit.end);
}

// A language file holds one exported dictionary and nothing else. The English
// file also exports the `fill` helper and the `UiDictionary` type, and those
// belong to English alone: the helper is imported from `en.ts` by the
// registry, and the type is the shape every dictionary is checked against.
//
// The parts are cut out by their shape rather than by their wording, because
// the comments have been translated by now and the English markers are gone.
const dictionary = output.match(/export const en = \{[\s\S]*?^\};/m);
if (!dictionary) {
  process.stderr.write('the dictionary block was not found\n');
  process.exit(1);
}
const renamed = dictionary[0].replace('export const en = {', `export const ${locale} = {`);

// The header comment, if the file has one, sits above the dictionary.
const header = output.slice(0, output.indexOf(dictionary[0]));
const headerComment = header.match(/\/\*\*[\s\S]*?\*\//);

const parts = [];
if (headerComment) parts.push(headerComment[0]);
parts.push(renamed);
output = parts.join('\n\n') + '\n';

fs.mkdirSync(path.dirname(args.out), { recursive: true });
fs.writeFileSync(args.out, output);
process.stdout.write(`wrote ${args.out}: ${leaves.length} leaves, ${commentList.length} comments\n`);
