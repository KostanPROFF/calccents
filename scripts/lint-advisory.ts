#!/usr/bin/env node
/**
 * YMYL advisory-language linter.
 *
 * The site publishes calculations, not recommendations. A sentence that
 * tells the reader what to do is a defect, because it turns a checkable
 * figure into advice, and advice on a financial topic is the thing this
 * site has to avoid.
 *
 * The linter is deliberately sentence-scoped rather than word-scoped. Words
 * like "should", "best" and "worth" appear in perfectly legitimate
 * sentences — usually negated ones, such as "it does not tell you which
 * option is better" — and a naive word ban would produce noise rather than
 * signal. So a hit is only raised when the advisory pattern is not preceded
 * by a negation in the same sentence.
 *
 * The "worth" rules are narrowed to verdict shapes — "is worth it", "worth
 * buying", "is worth the risk". An earlier, broader version of the rule
 * matched any "is worth" and fired on epistemic uses such as "worth reading"
 * and "worth knowing", which are statements about the writing rather than
 * about the reader's money. A guardrail that cries wolf on every other
 * sentence stops being read, so the rule was narrowed and two option-verdict
 * rules added to keep the coverage on the cases that matter.
 *
 * The site is published in three languages, and the guardrail has to hold
 * in all of them. A rule set that only knows English would pass a Russian
 * guide full of "вы должны покупать" without a word, so each language has
 * its own rules and its own negation list. The structure is the same in
 * all three: a directive, a first-person recommendation, a verdict, an
 * instruction to consider or avoid something, and a superlative claim.
 *
 * Run: node scripts/lint-advisory.ts
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');

export type Locale = 'en' | 'ru' | 'es';

interface Rule {
  name: string;
  pattern: RegExp;
}

interface LocaleRules {
  deny: Rule[];
  negations: RegExp[];
}

const EN_DENY: Rule[] = [
  { name: 'second-person directive', pattern: /\byou (?:should|must|need to|ought to|have to)\b/gi },
  { name: 'first-person recommendation', pattern: /\b(?:we|i) (?:recommend|advise|suggest|urge|insist)\b/gi },
  { name: 'worth-it verdict', pattern: /\b(?:is|are|was|were) worth (?:it|them|that|the (?:risk|money|price|cost|effort|trade|points))\b/gi },
  { name: 'worth-it verdict', pattern: /\bworth (?:buying|investing|purchasing|refinancing|renting|keeping)\b/gi },
  { name: 'option verdict', pattern: /\b(?:buying|renting|investing|refinancing|waiting) (?:is|would be) (?:the )?(?:better|best|smarter|safest|wisest)\b/gi },
  { name: 'option verdict', pattern: /\bthe (?:better|best) (?:option|choice|move) (?:is|would be)\b/gi },
  { name: 'best-option verdict', pattern: /\bthe best\b|\bbest option\b|\bbest choice\b|\bbest rate\b/gi },
  { name: 'must directive', pattern: /\bmust (?:buy|choose|pay|do|use|take|go)\b/gi },
  { name: 'avoid directive', pattern: /\bavoid (?:buying|investing|paying|leasing|renting|refinancing)\b/gi },
  { name: 'consider directive', pattern: /\bconsider (?:buying|investing|purchasing|switching|refinancing)\b/gi },
  { name: 'superlative claim', pattern: /\bthe (?:cheapest|fastest|greatest|safest)\b/gi },
  { name: 'advisory verb', pattern: /\badvise[sd]?\b/gi },
];

/**
 * Russian.
 *
 * JavaScript's `\b` is an ASCII word boundary: it is defined in terms of
 * `\w`, which is `[A-Za-z0-9_]`. A Cyrillic letter is not a word character,
 * so `\bвы\b` never matches anything — the boundary is looking for a
 * transition between ASCII letters and everything else, and Russian text is
 * surrounded by non-ASCII on both sides. The rules below use explicit
 * Unicode property lookarounds instead.
 *
 * The directive pattern allows a negation inside the match, so "вы не должны
 * покупать" is still caught: the negation sits between the pronoun and the
 * verb, and a lookback that only reads text before the match would miss it.
 */
const B = String.raw`(?<![\p{L}\p{N}_])`;
const E = String.raw`(?![\p{L}\p{N}_])`;

/** Wrap a pattern in Unicode-aware word boundaries. */
const w = (source: string): string => `${B}(?:${source})${E}`;

const RU_DENY: Rule[] = [
  {
    name: 'second-person directive',
    pattern: new RegExp(w('(?:вы|вам|тебе|тебi) (?:не )?(?:должны|следует|нужно|необходимо|стоит|лучше)'), 'giu'),
  },
  {
    name: 'second-person imperative',
    pattern: new RegExp(w('(?:покупайте|инвестируйте|продавайте|арендуйте|вкладывайте|оформляйте|рефинансируйте)'), 'giu'),
  },
  {
    name: 'first-person recommendation',
    pattern: new RegExp(w('(?:мы|я) (?:не )?(?:рекомендуем|советуем|рекомендовал|советовал)'), 'giu'),
  },
  { name: 'impersonal recommendation', pattern: new RegExp(w('рекоменду(?:ем|ется)'), 'giu') },
  { name: 'worth-it verdict', pattern: new RegExp(w('стоит (?:покупать|инвестировать|продать|взять|оформить|арендовать)'), 'giu') },
  { name: 'has-sense verdict', pattern: new RegExp(w('имеет смысл (?:покупать|инвестировать|продать|взять|оформить)'), 'giu') },
  { name: 'option verdict', pattern: new RegExp(w('лучш(?:ий|ее|ая) (?:вариант|решение|выбор|момент)'), 'giu') },
  {
    name: 'best-option verdict',
    pattern: new RegExp(w('(?:лучший вариант|идеальный вариант|оптимальный вариант)'), 'giu'),
  },
  { name: 'must directive', pattern: new RegExp(w('необходимо (?:купить|продать|инвестировать|арендовать|оформить)'), 'giu') },
  {
    name: 'avoid directive',
    pattern: new RegExp(w('(?:избегайте|не стоит) (?:покупки|продажи|инвестиций|рефинансирования)'), 'giu'),
  },
  {
    name: 'consider directive',
    pattern: new RegExp(w('подумайте о (?:покупке|продаже|инвестициях|рефинансировании)'), 'giu'),
  },
  { name: 'superlative claim', pattern: new RegExp(w('самый (?:дешёвый|дешевый|быстрый|выгодный|лучший)'), 'giu') },
  {
    name: 'advisory verb',
    pattern: new RegExp(w('(?:совету(?:ем|ет|ют)|порекоменду(?:ем|ет))'), 'giu'),
  },
];

/**
 * Spanish.
 *
 * "debe" and "hay que" on their own are too common to ban, so the rule
 * names the action that follows. "debe saber" is a statement about the
 * reader's knowledge; "debe comprar" is an instruction.
 */
const ES_DENY: Rule[] = [
  {
    name: 'second-person directive',
    pattern: /\b(?:deberías|debe|necesitas|necesita|tienes que|deberán|conviene)\s+(?:comprar|invertir|vender|alquilar|contratar|tomar|refinanciar|elegir)\b/gi,
  },
  {
    name: 'impersonal directive',
    pattern: /\bhay que (?:comprar|invertir|vender|alquilar|contratar|tomar|refinanciar)\b/gi,
  },
  {
    name: 'second-person imperative',
    pattern: /\b(?:compre|invierta|venda|alquile|elija|refinancie|espere)\b/gi,
  },
  { name: 'first-person recommendation', pattern: /\b(?:nosotros|nosotras|te|le) (?:recomendamos|recomienda|aconsejamos|aconseja|sugerimos|sugiere)\b/gi },
  { name: 'impersonal recommendation', pattern: /\brecomendamos\b|\bse recomienda\b|\baconsejamos\b/gi },
  { name: 'worth-it verdict', pattern: /\bvale la pena\b|\bmerece la pena\b/gi },
  {
    name: 'option verdict',
    pattern: /\b(?:comprar|alquilar|invertir|vender) (?:es|sería|seria) (?:la )?(?:mejor|peor|más inteligente|más seguro)\b/gi,
  },
  { name: 'best-option verdict', pattern: /\bla mejor opción\b|\blo ideal es\b|\bsería inteligente\b|\bel mejor momento\b/gi },
  { name: 'must directive', pattern: /\bes (?:imprescindible|necesario|obligatorio) (?:comprar|vender|invertir|alquilar)\b/gi },
  { name: 'avoid directive', pattern: /\b(?:evita|evitar|evite) (?:comprar|vender|invertir|alquilar)\b/gi },
  { name: 'consider directive', pattern: /\bconsidera (?:comprar|vender|invertir|alquilar|cambiar)\b/gi },
  { name: 'superlative claim', pattern: /\bel (?:más barato|más rápido|más seguro|más grande)\b/gi },
  { name: 'advisory verb', pattern: /\baconsejamos\b|\brecomendamos\b|\bse recomienda\b/gi },
];

const RULES: Record<Locale, LocaleRules> = {
  en: {
    deny: EN_DENY,
    negations: [
      /\bnot\b/,
      /\bn't\b/,
      /\bnever\b/,
      /\bcannot\b/,
      /\bno\b/,
      /\bwithout\b/,
      /\brather than\b/,
      /\binstead of\b/,
      /\bneither\b/,
      /\bnor\b/,
    ],
  },
  ru: {
    deny: RU_DENY,
    negations: [
      /(?<![\p{L}\p{N}_])не(?![\p{L}\p{N}_])/iu,
      /(?<![\p{L}\p{N}_])нет(?![\p{L}\p{N}_])/iu,
      /(?<![\p{L}\p{N}_])ни(?![\p{L}\p{N}_])/iu,
      /никогда/iu,
      /нельзя/iu,
      /без/iu,
      /вместо/iu,
    ],
  },
  es: {
    deny: ES_DENY,
    negations: [
      /\bno\b/,
      /\bnunca\b/,
      /\bjamás\b/,
      /\bsin\b/,
      /\ben lugar de\b/,
      /\bni\b/,
      /\bnadie\b/,
    ],
  },
};

interface Hit {
  file: string;
  line: number;
  text: string;
  rule: string;
  locale: Locale;
}

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

/** Strip code blocks and tags so the linter reads prose, not markup. */
function extractProse(source: string): string {
  return source
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/<[^>]+>/g, ' ');
}

/**
 * Pull the string literals out of a source file.
 *
 * The dictionaries are TypeScript, and the prose lives inside quoted
 * strings. Linting the whole file would put variable names and keywords
 * through the rules, which is noise; only the strings are prose.
 */
function extractStrings(source: string): string {
  const out: string[] = [];
  const pattern = /'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"/g;
  let match = pattern.exec(source);
  while (match !== null) {
    out.push(match[1] ?? match[2] ?? '');
    match = pattern.exec(source);
  }
  return out.join('\n');
}

function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+(?=[A-ZА-ЯЁ¿¡"'(\[])/u)
    .filter((sentence) => sentence.trim().length > 0);
}

function isNegated(sentence: string, matchIndex: number, negations: RegExp[]): boolean {
  const before = sentence.slice(Math.max(0, matchIndex - 90), matchIndex).toLowerCase();
  return negations.some((pattern) => pattern.test(before));
}

/**
 * Work out which language a file is written in.
 *
 * A guide in the `ru/` folder is Russian; a guide at the root of the
 * collection is English; a dictionary file is named after its language.
 * Everything else is English, because the components hold almost no prose
 * of their own.
 */
export function detectLocale(path: string): Locale {
  const parts = relative(ROOT, path).split(/[\\/]/);

  if (parts[0] === 'src' && parts[1] === 'content') {
    const guidesIndex = parts.indexOf('guides');
    const candidate = guidesIndex >= 0 ? parts[guidesIndex + 1] : undefined;
    if (candidate === 'ru' || candidate === 'es') return candidate;
    return 'en';
  }

  if (parts[0] === 'src' && parts[1] === 'i18n' && parts[2] === 'ui') {
    const name = (parts[3] ?? '').replace(/\.ts$/, '');
    if (name === 'ru' || name === 'es') return name;
  }

  return 'en';
}

export function lintFile(path: string): Hit[] {
  const source = readFileSync(path, 'utf8');
  const label = relative(ROOT, path);
  return findAdvisoryHits(source, label, detectLocale(path), path.endsWith('.ts'));
}

/**
 * The detector itself, separated from file reading so it can be tested
 * against sentences that must be rejected. A guardrail that has never been
 * tested against a real violation is a guardrail nobody can trust.
 *
 * Takes a raw source file, strips the markup it does not lint, and returns
 * every advisory construct it finds.
 */
export function findAdvisoryHits(
  source: string,
  fileLabel = '<text>',
  locale: Locale = 'en',
  stringsOnly = false,
): Hit[] {
  const hits: Hit[] = [];
  const rules = RULES[locale];
  const prose = stringsOnly ? extractStrings(source) : extractProse(source);

  const lines = prose.split('\n');
  let offset = 0;
  for (const line of lines) {
    const lineNumber = countLine(prose, offset);
    offset += line.length + 1;

    for (const sentence of splitSentences(line)) {
      for (const rule of rules.deny) {
        rule.pattern.lastIndex = 0;
        let match = rule.pattern.exec(sentence);
        while (match !== null) {
          if (!isNegated(sentence, match.index, rules.negations)) {
            hits.push({
              file: fileLabel,
              line: lineNumber,
              text: sentence.trim().slice(0, 160),
              rule: rule.name,
              locale,
            });
          }
          match = rule.pattern.exec(sentence);
        }
      }
    }
  }
  return hits;
}

function countLine(text: string, offset: number): number {
  let line = 1;
  for (let i = 0; i < offset && i < text.length; i += 1) {
    if (text[i] === '\n') line += 1;
  }
  return line;
}

function main(): void {
  const targets = [
    ...collectFiles(join(ROOT, 'src', 'content'), ['.mdx']),
    ...collectFiles(join(ROOT, 'src', 'i18n', 'ui'), ['.ts']),
    ...collectFiles(join(ROOT, 'src', 'pages'), ['.astro']),
    ...collectFiles(join(ROOT, 'src', 'components'), ['.astro']),
    ...collectFiles(join(ROOT, 'src', 'layouts'), ['.astro']),
  ];

  const allHits: Hit[] = [];
  const byLocale: Record<Locale, number> = { en: 0, ru: 0, es: 0 };
  for (const file of targets) {
    const hits = lintFile(file);
    for (const hit of hits) byLocale[hit.locale] += 1;
    allHits.push(...hits);
  }

  if (allHits.length > 0) {
    console.error(`Advisory language found in ${allHits.length} place(s):\n`);
    for (const hit of allHits) {
      console.error(`  ${hit.file}:${hit.line}  [${hit.locale}/${hit.rule}]`);
      console.error(`    ${hit.text}\n`);
    }
    console.error(
      'These pages publish calculations. Rewrite the sentence to describe what the\n' +
        'numbers mean and what they depend on, rather than what the reader should do.',
    );
    process.exit(1);
  }

  console.log(
    `Advisory-language lint passed: ${targets.length} files checked ` +
      `(en ${byLocale.en}, ru ${byLocale.ru}, es ${byLocale.es}), 0 findings.`,
  );
}

if (import.meta.main) {
  main();
}
