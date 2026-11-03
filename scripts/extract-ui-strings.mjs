// Extracts every translatable leaf from a Calccents UI dictionary.
//
// The dictionaries are TypeScript object literals, so the reliable way to
// find the strings is the TypeScript parser itself rather than a regex: the
// files hold nested objects, arrays of objects, template literals and arrow
// functions used for plural forms, and a regex cannot tell those apart.
//
// Usage: node scripts/extract-ui-strings.mjs <dictionary.ts> > strings.json
//
// Output: { leaves: [{ path, kind, text, start, end, plural }] }
//   kind 'string'  - a string literal, translated as it stands
//   kind 'function' - an arrow function holding a plural form
//   plural          - for 'function', the English singular and plural outputs
import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';

const file = process.argv[2];
if (!file) {
  process.stderr.write('usage: node scripts/extract-ui-strings.mjs <dictionary.ts>\n');
  process.exit(1);
}

const source = fs.readFileSync(file, 'utf8');
const sourceFile = ts.createSourceFile(
  file,
  source,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
);

const leaves = [];

/** Walks an object literal, recording the path of every leaf. */
function walkObject(node, pathParts) {
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
}

function walk(node, pathParts) {
  if (ts.isObjectLiteralExpression(node)) {
    walkObject(node, pathParts);
    return;
  }
  if (ts.isArrayLiteralExpression(node)) {
    node.elements.forEach((element, index) => walk(element, [...pathParts, String(index)]));
    return;
  }
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    leaves.push({
      path: pathParts,
      kind: 'string',
      text: node.text,
      start: node.getStart(sourceFile),
      end: node.getEnd(),
    });
    return;
  }
  if (ts.isTemplateExpression(node)) {
    leaves.push({
      path: pathParts,
      kind: 'string',
      text: node.getText(sourceFile),
      start: node.getStart(sourceFile),
      end: node.getEnd(),
    });
    return;
  }
  if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
    leaves.push({
      path: pathParts,
      kind: 'function',
      text: node.getText(sourceFile),
      start: node.getStart(sourceFile),
      end: node.getEnd(),
    });
    return;
  }
  if (ts.isCallExpression(node)) {
    // A helper such as fill('...', {...}) or a tagged template.
    const args = node.arguments;
    if (args.length && ts.isStringLiteral(args[0])) {
      leaves.push({
        path: pathParts,
        kind: 'string',
        text: args[0].text,
        start: args[0].getStart(sourceFile),
        end: args[0].getEnd(),
      });
      return;
    }
  }
  leaves.push({
    path: pathParts,
    kind: 'other',
    text: node.getText(sourceFile).slice(0, 120),
    start: node.getStart(sourceFile),
    end: node.getEnd(),
  });
}

let found = false;
for (const statement of sourceFile.statements) {
  if (!ts.isVariableStatement(statement)) continue;
  for (const declaration of statement.declarationList.declarations) {
    if (!ts.isIdentifier(declaration.name)) continue;
    if (!declaration.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) continue;
    found = true;
    walk(declaration.initializer, [declaration.name.text]);
  }
}

if (!found) {
  process.stderr.write('no dictionary object literal found in ' + file + '\n');
  process.exit(1);
}

// The comments are translated too: the Russian and Spanish dictionaries carry
// their comments in their own language, so a new dictionary that left them in
// English would look half-finished to the next person to open the file.
// The scanner finds them without tripping over a comment marker inside a
// string literal.
const comments = [];
const scanner = ts.createScanner(
  ts.ScriptTarget.Latest,
  /* skipTrivia */ false,
  ts.LanguageVariant.Standard,
  source,
);
let token = scanner.scan();
while (token !== ts.SyntaxKind.EndOfFileToken) {
  if (token === ts.SyntaxKind.SingleLineCommentTrivia || token === ts.SyntaxKind.MultiLineCommentTrivia) {
    comments.push({
      text: scanner.getTokenText(),
      start: scanner.getTokenPos(),
      end: scanner.getTextPos(),
    });
  }
  token = scanner.scan();
}

process.stdout.write(JSON.stringify({ file: path.basename(file), leaves, comments }, null, 2));
