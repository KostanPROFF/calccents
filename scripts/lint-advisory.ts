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
 * The site is published in ten languages, and the guardrail has to hold
 * in all of them. A rule set that only knows English would pass a Russian
 * guide full of "вы должны покупать" without a word, so each language has
 * its own rules and its own negation list. The structure is the same in
 * all of them: a directive, a first-person recommendation, a verdict, an
 * instruction to consider or avoid something, and a superlative claim.
 *
 * Run: node scripts/lint-advisory.ts
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');

export type Locale = 'en' | 'ru' | 'es' | 'zh' | 'ko' | 'vi' | 'pt' | 'ar' | 'tl' | 'uk';

const LOCALES: readonly Locale[] = ['en', 'ru', 'es', 'zh', 'ko', 'vi', 'pt', 'ar', 'tl', 'uk'];

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

/**
 * Ukrainian.
 *
 * The same shapes as the Russian rules, with the same Unicode-aware
 * boundaries, because Cyrillic text has no ASCII word boundary either.
 */
const UK_DENY: Rule[] = [
  {
    name: 'second-person directive',
    pattern: new RegExp(w('(?:ви|вам|тобі) (?:не )?(?:повинні|слід|треба|потрібно|необхідно|варто|краще)'), 'giu'),
  },
  {
    name: 'second-person imperative',
    pattern: new RegExp(w('(?:купуйте|інвестуйте|продавайте|орендуйте|вкладайте|оформлюйте|рефінансуйте)'), 'giu'),
  },
  {
    name: 'first-person recommendation',
    pattern: new RegExp(w('(?:ми|я) (?:не )?(?:рекомендуємо|радимо|рекомендую|раджу)'), 'giu'),
  },
  { name: 'impersonal recommendation', pattern: new RegExp(w('рекомендується'), 'giu') },
  { name: 'worth-it verdict', pattern: new RegExp(w('варто (?:купувати|купити|інвестувати|продати|брати|оформити|орендувати)'), 'giu') },
  { name: 'has-sense verdict', pattern: new RegExp(w('має сенс (?:купувати|купити|інвестувати|продати|брати|оформити)'), 'giu') },
  { name: 'best-option verdict', pattern: new RegExp(w('(?:найкращий|ідеальний|оптимальний) (?:варіант|вибір|момент)'), 'giu') },
  { name: 'superlative claim', pattern: new RegExp(w('(?:найдешевший|найвигідніший|найшвидший)'), 'giu') },
];

/**
 * Portuguese.
 *
 * "venda" and "escolha" are left out of the imperatives on purpose: in
 * Portuguese they are the ordinary nouns for a sale and a choice, and
 * "custos de venda" is in every rent versus buy sentence.
 */
const PT_DENY: Rule[] = [
  {
    name: 'second-person directive',
    pattern: /\b(?:você|vocês) (?:deve|deveria|precisa|tem que|devem)\s+(?:comprar|investir|vender|alugar|contratar|refinanciar|escolher)\b/giu,
  },
  { name: 'second-person imperative', pattern: /(?<![\p{L}])(?:compre|invista|alugue|refinancie)(?![\p{L}])/giu },
  { name: 'first-person recommendation', pattern: /(?<![\p{L}])(?:recomendamos|aconselhamos|sugerimos|recomenda-se)(?![\p{L}])/giu },
  { name: 'worth-it verdict', pattern: /(?<![\p{L}])vale a pena(?![\p{L}])/giu },
  {
    name: 'option verdict',
    pattern: /(?<![\p{L}])(?:comprar|alugar|investir|vender) (?:é|seria) (?:a )?(?:melhor|pior|mais inteligente|mais seguro)(?![\p{L}])/giu,
  },
  { name: 'best-option verdict', pattern: /(?<![\p{L}])(?:a melhor opção|o ideal é|o melhor momento)(?![\p{L}])/giu },
  { name: 'avoid directive', pattern: /(?<![\p{L}])(?:evite|evitar) (?:comprar|vender|investir|alugar)(?![\p{L}])/giu },
  { name: 'superlative claim', pattern: /(?<![\p{L}])o (?:mais barato|mais rápido|mais seguro)(?![\p{L}])/giu },
];

/**
 * Chinese.
 *
 * Chinese has no spaces and no word boundaries, so the rules match the
 * phrase itself: a "you should" followed by the action, a first-person
 * recommendation, a worth-it verdict and a best-option verdict.
 */
const ZH_DENY: Rule[] = [
  { name: 'second-person directive', pattern: /(?:你|您)(?:应该|应当|必须|需要|最好)(?:买|购买|投资|卖|出售|租|再融资|选择)/gu },
  { name: 'first-person recommendation', pattern: /我们(?:建议|推荐|劝)|建议(?:你|您)|推荐(?:你|您)/gu },
  { name: 'worth-it verdict', pattern: /值得(?:买|购买|投资|租|再融资)/gu },
  { name: 'best-option verdict', pattern: /最(?:好|佳)的?(?:选择|方案|时机)/gu },
  { name: 'superlative claim', pattern: /最(?:便宜|划算|安全)的/gu },
];

/**
 * Korean.
 *
 * The verb ending carries the directive, so the rules name the action and
 * the ending together rather than the ending alone, which is in every
 * other sentence of a description.
 */
const KO_DENY: Rule[] = [
  {
    name: 'second-person directive',
    pattern: /(?:구매|매수|투자|매도|임차|임대|재융자|대출)(?:하세요|하십시오|해야 합니다|하셔야 합니다|하는 것이 좋습니다)/gu,
  },
  { name: 'first-person recommendation', pattern: /(?:추천합니다|권장합니다|권합니다|권해 드립니다|추천드립니다)/gu },
  { name: 'worth-it verdict', pattern: /(?:구매|투자)할 (?:만한|가치가 있)/gu },
  { name: 'best-option verdict', pattern: /(?:최선의|최고의|가장 좋은) (?:선택|방법|시기)/gu },
  { name: 'superlative claim', pattern: /가장 (?:저렴한|유리한|안전한)/gu },
];

/** Vietnamese. */
const VI_DENY: Rule[] = [
  { name: 'second-person directive', pattern: /(?<![\p{L}])(?:bạn|quý vị) (?:nên|phải|cần) (?:mua|đầu tư|bán|thuê|tái cấp vốn|vay|chọn)(?![\p{L}])/giu },
  { name: 'first-person recommendation', pattern: /(?<![\p{L}])chúng tôi (?:khuyên|khuyến nghị|khuyến cáo|đề xuất|gợi ý)(?![\p{L}])/giu },
  { name: 'worth-it verdict', pattern: /(?<![\p{L}])(?:đáng|nên) (?:mua|đầu tư)(?![\p{L}])/giu },
  { name: 'best-option verdict', pattern: /(?<![\p{L}])(?:lựa chọn|phương án|thời điểm) tốt nhất(?![\p{L}])/giu },
  { name: 'superlative claim', pattern: /(?<![\p{L}])(?:rẻ nhất|có lợi nhất|an toàn nhất)(?![\p{L}])/giu },
];

/** Arabic. */
const AR_DENY: Rule[] = [
  { name: 'second-person directive', pattern: /(?:يجب عليك|ينبغي عليك|ينبغي لك|عليك أن|يجب أن) (?:تشتري|تستثمر|تبيع|تستأجر|تختار|تعيد التمويل)/gu },
  { name: 'first-person recommendation', pattern: /(?<![\p{L}])(?:ننصح|نوصي|نقترح|أنصح|ننصحك|نوصيك)(?![\p{L}])/gu },
  { name: 'worth-it verdict', pattern: /(?:يستحق|تستحق) (?:الشراء|الاستثمار|العناء)/gu },
  { name: 'best-option verdict', pattern: /(?:أفضل خيار|الخيار الأفضل|أفضل وقت|الوقت الأفضل)/gu },
  { name: 'superlative claim', pattern: /(?:الأرخص|الأكثر ربحا|الأكثر ربحًا)/gu },
];

/** Tagalog. */
const TL_DENY: Rule[] = [
  {
    name: 'second-person directive',
    pattern: /(?<![\p{L}])(?:dapat|kailangan) (?:kang|mong|ninyong) (?:bumili|bilhin|mamuhunan|magbenta|ibenta|umupa|mag-refinance|pumili)(?![\p{L}])/giu,
  },
  { name: 'first-person recommendation', pattern: /(?<![\p{L}])(?:inirerekomenda|ipinapayo|iminumungkahi) (?:namin|ko)(?![\p{L}])/giu },
  { name: 'worth-it verdict', pattern: /(?<![\p{L}])sulit (?:bilhin|ang pagbili|ang pamumuhunan)(?![\p{L}])/giu },
  { name: 'best-option verdict', pattern: /(?<![\p{L}])pinakamahusay na (?:pagpipilian|opsyon|panahon)(?![\p{L}])/giu },
  { name: 'superlative claim', pattern: /(?<![\p{L}])(?:pinakamura|pinakamatipid|pinakaligtas)(?![\p{L}])/giu },
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
  uk: {
    deny: UK_DENY,
    negations: [
      /(?<![\p{L}\p{N}_])не(?![\p{L}\p{N}_])/iu,
      /(?<![\p{L}\p{N}_])ні(?![\p{L}\p{N}_])/iu,
      /ніколи/iu,
      /(?<![\p{L}\p{N}_])без(?![\p{L}\p{N}_])/iu,
      /замість/iu,
    ],
  },
  pt: {
    deny: PT_DENY,
    negations: [/(?<![\p{L}])não(?![\p{L}])/iu, /\bnunca\b/, /\bsem\b/, /\bem vez de\b/, /\bnem\b/, /\bninguém\b/u],
  },
  zh: {
    deny: ZH_DENY,
    negations: [/不/u, /没有/u, /并非/u, /而不是/u, /无须|无需/u],
  },
  ko: {
    deny: KO_DENY,
    negations: [/않/u, /아니/u, /없/u, /못/u, /대신/u],
  },
  vi: {
    deny: VI_DENY,
    negations: [/(?<![\p{L}])(?:không|chẳng|chưa|đừng)(?![\p{L}])/iu, /thay vì/iu],
  },
  ar: {
    deny: AR_DENY,
    negations: [/(?<![\p{L}])(?:لا|لن|لم|ليس|ليست|بدون|دون|بدلا|بدلًا)(?![\p{L}])/u],
  },
  tl: {
    deny: TL_DENY,
    negations: [/(?<![\p{L}])(?:hindi|wala|walang|huwag)(?![\p{L}])/iu, /sa halip/iu],
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
    .split(/(?<=[.!?؟])\s+(?=[\p{Lu}\p{Lo}¿¡"'(\[])|(?<=[。！？])/u)
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
function isLintLocale(value: string | undefined): value is Locale {
  return value !== undefined && (LOCALES as readonly string[]).includes(value);
}

export function detectLocale(path: string): Locale {
  const parts = relative(ROOT, path).split(/[\\/]/);

  if (parts[0] === 'src' && parts[1] === 'content') {
    const guidesIndex = parts.indexOf('guides');
    const candidate = guidesIndex >= 0 ? parts[guidesIndex + 1] : undefined;
    if (isLintLocale(candidate)) return candidate;
    return 'en';
  }

  if (parts[0] === 'src' && parts[1] === 'i18n' && parts[2] === 'ui') {
    const name = (parts[3] ?? '').replace(/\.ts$/, '');
    if (isLintLocale(name)) return name;
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
  const filesByLocale = Object.fromEntries(LOCALES.map((locale) => [locale, 0])) as Record<Locale, number>;
  for (const file of targets) {
    const hits = lintFile(file);
    filesByLocale[detectLocale(file)] += 1;
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
      `(${LOCALES.map((locale) => `${locale} ${filesByLocale[locale]}`).join(', ')}), 0 findings.`,
  );
}

if (import.meta.main) {
  main();
}
