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

export type Locale = 'en' | 'ru' | 'es' | 'zh' | 'ko' | 'vi' | 'pt' | 'ar' | 'tl' | 'uk';

/** Every locale the site publishes, in the order the switcher lists them. */
export const LOCALES: Locale[] = ['en', 'ru', 'es', 'zh', 'ko', 'vi', 'pt', 'ar', 'tl', 'uk'];

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

/**
 * Wrap a pattern for Chinese.
 *
 * Chinese writes without spaces, so two things break at once. The ASCII
 * word boundary never fires — a Chinese word is surrounded by other Chinese
 * words, not by spaces — and a literal space between the two halves of a
 * phrase never appears in the text either. So the pattern runs with no
 * boundaries at all, and the halves are joined with `\s*`, which matches the
 * empty string but still lets an optional space through when one is there.
 */
const z = (source: string): string => `(?:${source})`;

/**
 * Wrap a pattern for a language that attaches its particles straight to the
 * word.
 *
 * Korean writes "매도할" and "해야 합니다", Arabic writes "اشتر" inside
 * "اشتريه", Tagalog writes "bumiliin". A trailing word boundary would
 * reject every one of those, because the next character is a letter of the
 * same word rather than a space. These rule sets keep the leading boundary
 * and drop the trailing one.
 */
const k = (source: string): string => `${B}(?:${source})`;

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
 * The languages added after the first three.
 *
 * The same thirteen kinds of sentence are banned in each of them. The
 * patterns are written in the language itself, with the Unicode-aware
 * boundaries, because a Chinese or Arabic sentence never contains an ASCII
 * letter for `\b` to work with.
 */

/**
 * The financial actions the Chinese rules attach to a directive.
 *
 * "请选择" is not on the list: a page that asks the reader to pick an option
 * is describing the calculator's own controls, not advising on money.
 */
const ZH_ACTION =
  '购买|买入|卖出|卖掉|买房|卖房|购房|再融资|还款|提前还款|偿还|租下|投保|借钱';

/**
 * Chinese adverbials sit between the directive and its object.
 *
 * "避免在市场疲软时购房" puts five characters between the verb and the
 * action, so the two halves cannot be matched next to each other. A gap of
 * up to six characters catches the adverbial without reaching into the next
 * clause.
 */
const ZH_GAP = '[\\u4E00-\\u9FFF]{0,6}';

/**
 * Chinese.
 *
 * There is no separate "must" rule here. In Chinese, 必须 with nobody in
 * front of it states an obligation on a third party — "the lender must repay",
 * "the amount must be enough to cover the points" — and the English rule set
 * does not flag those either. A directive is a directive because the reader
 * is the one being told, and that is what the second-person rule looks for.
 */
const ZH_DENY: Rule[] = [
  {
    name: 'second-person directive',
    pattern: new RegExp(
      z(`(?:你|您|你们)(?:不应该|应不应该|应该|应当|必须|不得不|最好|要|需要)\\s*${ZH_GAP}(?:${ZH_ACTION})`),
      'giu',
    ),
  },
  {
    name: 'second-person imperative',
    pattern: new RegExp(z(`(?:请|务必|记得|千万别)\\s*${ZH_GAP}(?:${ZH_ACTION})`), 'giu'),
  },
  {
    name: 'first-person recommendation',
    pattern: new RegExp(z('(?:我们|我)(?:建议|推荐)'), 'giu'),
  },
  { name: 'impersonal recommendation', pattern: new RegExp(z('(?:建议|推荐)(?:购买|投资|卖出|出租|贷款)'), 'giu') },
  { name: 'worth-it verdict', pattern: new RegExp(z(`值得\\s*${ZH_GAP}(?:${ZH_ACTION})`), 'giu') },
  { name: 'has-sense verdict', pattern: new RegExp(z(`(?:有|很)意义\\s*(?:去)?\\s*${ZH_GAP}(?:${ZH_ACTION})`), 'giu') },
  {
    name: 'option verdict',
    pattern: new RegExp(z('(?:购买|出租|投资|卖出)\\s*(?:才是|是)\\s*(?:更|最)(?:好|划算|安全|明智)'), 'giu'),
  },
  {
    name: 'best-option verdict',
    pattern: new RegExp(z('(?:最佳|最好|理想)\\s*(?:的)?\\s*(?:方案|选项|时机)'), 'giu'),
  },
  {
    name: 'avoid directive',
    pattern: new RegExp(z(`(?:避免|不要|别)\\s*${ZH_GAP}(?:${ZH_ACTION})`), 'giu'),
  },
  { name: 'consider directive', pattern: new RegExp(z(`(?:考虑|不妨)\\s*${ZH_GAP}(?:${ZH_ACTION})`), 'giu') },
  { name: 'superlative claim', pattern: new RegExp(z('(?:最便宜|最快|最安全|最划算|最好)'), 'giu') },
  { name: 'advisory verb', pattern: new RegExp(z('(?:我们建议|建议你|建议您|我建议)'), 'giu') },
];

/** The financial actions the Korean rules attach to a directive. */
const KO_ACTION = '구매|매도|투자|임대|대출|재융자';

/** Korean. */
const KO_DENY: Rule[] = [
  {
    name: 'second-person directive',
    pattern: new RegExp(
      k(`(?:당신|너|여러분)(?:은|는|이|가)? (?:반드시|꼭|해야|해야만|있어야)\\s*(?:${KO_ACTION})`),
      'giu',
    ),
  },
  {
    name: 'second-person imperative',
    pattern: new RegExp(k(`(?:${KO_ACTION})\\s*(?:하십시오|하세요|하시고|해야 합니다)`), 'giu'),
  },
  {
    name: 'first-person recommendation',
    pattern: new RegExp(k('(?:우리가|저희가|내가|제가) (?:추천|권유)'), 'giu'),
  },
  {
    name: 'impersonal recommendation',
    pattern: new RegExp(k(`(?:${KO_ACTION})\\s*(?:하는 것을)?\\s*권(?:유|장|하)`), 'giu'),
  },
  { name: 'worth-it verdict', pattern: new RegExp(k(`(?:${KO_ACTION})\\s*(?:할|하기) (?:만하|가치가 있)`), 'giu') },
  {
    name: 'has-sense verdict',
    pattern: new RegExp(k(`(?:${KO_ACTION})\\s*(?:하는 게|하는 것이) (?:의미|합당)`), 'giu'),
  },
  {
    name: 'option verdict',
    pattern: new RegExp(
      k(`(?:${KO_ACTION})\\s*(?:하는 게|하는 것이) (?:더 |가장 )?(?:좋|안전|현명|낫|최선|최고)`),
      'giu',
    ),
  },
  {
    name: 'best-option verdict',
    pattern: new RegExp(k('(?:가장|최선|최고) (?:의 )?(?:선택|옵션|방안|방법|시기)'), 'giu'),
  },
  { name: 'must directive', pattern: new RegExp(k(`반드시 (?:${KO_ACTION})`), 'giu') },
  {
    name: 'avoid directive',
    pattern: new RegExp(
      k(`(?:피하(?:야|는)?|피하세요)\\s*(?:${KO_ACTION})|(?:${KO_ACTION})\\s*하지\\s*(?:마(?:세요|십시오)?|않)`),
      'giu',
    ),
  },
  {
    name: 'consider directive',
    pattern: new RegExp(
      k(
        '(?:고려하(?:야|는)?|생각해 보(?:세요|십시오)|검토하(?:야|는)?)\\s*(?:구매|매도|투자|임대|전환|재융자)' +
          '|(?:' +
          KO_ACTION +
          ')\\s*(?:을|를)?\\s*(?:고려|검토|생각해 보)',
      ),
      'giu',
    ),
  },
  { name: 'superlative claim', pattern: new RegExp(k('(?:가장|제일) (?:저렴|빠르|안전|합리|좋|유리)'), 'giu') },
  { name: 'advisory verb', pattern: new RegExp(k('(?:추천드리|권유드리|추천합니다|권합니다)'), 'giu') },
];

/** Vietnamese. */
/** The financial actions the Vietnamese rules attach to a directive. */
const VI_ACTION = 'mua|đầu tư|bán|thuê|vay|tái vay';

const VI_DENY: Rule[] = [
  {
    name: 'second-person directive',
    pattern: new RegExp(k(`(?:bạn|anh|chị|quý khách)\\s+(?:nên|phải|cần)\\s+(?:${VI_ACTION})`), 'giu'),
  },
  {
    name: 'second-person imperative',
    pattern: new RegExp(k(`(?:hãy|đừng)\\s+(?:${VI_ACTION})`), 'giu'),
  },
  {
    name: 'first-person recommendation',
    pattern: new RegExp(k('(?:chúng tôi|chúng ta|tôi) (?:khuyên|đề nghị|khuyến nghị)'), 'giu'),
  },
  {
    name: 'impersonal recommendation',
    pattern: new RegExp(k('(?:khuyên|đề nghị|khuyến nghị) (?:mua|đầu tư|bán|thuê)'), 'giu'),
  },
  {
    name: 'worth-it verdict',
    pattern: new RegExp(k('(?:đáng|không đáng) (?:để )?(?:mua|đầu tư|bán|vay|thuê)'), 'giu'),
  },
  { name: 'has-sense verdict', pattern: new RegExp(k('có ý nghĩa (?:để )?(?:mua|đầu tư|vay)'), 'giu') },
  {
    name: 'option verdict',
    pattern: new RegExp(k('(?:mua|thuê|đầu tư|bán) (?:là|thì|thường) (?:lựa chọn )?(?:tốt|an toàn hơn|khôn ngoan hơn)'), 'giu'),
  },
  {
    name: 'best-option verdict',
    pattern: new RegExp(k('(?:lựa chọn|phương án|tùy chọn|thời điểm) (?:tốt nhất|đúng nhất|thích hợp nhất)'), 'giu'),
  },
  { name: 'must directive', pattern: new RegExp(k(`(?:phải|cần)\\s+(?:${VI_ACTION})`), 'giu') },
  {
    name: 'avoid directive',
    pattern: new RegExp(k('(?:tránh|không nên) (?:mua|bán|đầu tư|thuê|vay|trả nợ)'), 'giu'),
  },
  {
    name: 'consider directive',
    pattern: new RegExp(k('(?:cân nhắc|hãy nghĩ về|suy nghĩ về) (?:mua|bán|đầu tư|thuê|chuyển)'), 'giu'),
  },
  { name: 'superlative claim', pattern: new RegExp(k('(?:rẻ nhất|nhanh nhất|an toàn nhất|hợp lý nhất|tốt nhất)'), 'giu') },
  { name: 'advisory verb', pattern: new RegExp(k(`(?:nên|đáng)\\s+(?:${VI_ACTION})`), 'giu') },
];

/** Brazilian Portuguese. */
const PT_DENY: Rule[] = [
  {
    name: 'second-person directive',
    pattern: /\b(?:você|vc|tu) (?:deve|precisa|teria que|deveria|tem que|deverá)\b/gi,
  },
  {
    name: 'second-person imperative',
    pattern:
      /\b(?:compre|invista|alugue|financie|refinancie)\s+(?:a|o|as|os|um|uma|seu|sua|este|esta|esse|essa|se|cada)\b/gi,
  },
  { name: 'first-person recommendation', pattern: /\b(?:nós|recomendamos|aconselhamos|sugerimos)\b/gi },
  { name: 'impersonal recommendation', pattern: /\brecomenda-se\b|\bdeve-se\b|\bé recomendável\b/gi },
  {
    name: 'worth-it verdict',
    pattern:
      /\b(?:vale|merece) a pena\s+(?:comprar|vender|investir|alugar|contratar|financiar|refinanciar)\b/gi,
  },
  {
    name: 'option verdict',
    pattern: /\b(?:comprar|alugar|investir|vender) (?:é|seria) (?:a )?(?:melhor|mais inteligente|mais seguro)\b/gi,
  },
  { name: 'best-option verdict', pattern: /\ba melhor (?:opção|opções)\b|\bo ideal é\b|\bo melhor momento\b/gi },
  {
    name: 'must directive',
    pattern: /\bé (?:essencial|necessário|obrigatório|indispensável) (?:comprar|vender|investir|alugar|contratar)\b/gi,
  },
  { name: 'avoid directive', pattern: /\b(?:evite|evitar) (?:comprar|vender|investir|alugar|contratar)\b/gi },
  { name: 'consider directive', pattern: /\bconsidere (?:comprar|vender|investir|alugar|trocar|contratar)\b/gi },
  { name: 'superlative claim', pattern: /\bo (?:mais barato|mais rápido|mais seguro|mais vantajoso)\b/gi },
  { name: 'advisory verb', pattern: /\brecomendamos\b|\baconselhamos\b|\brecomenda-se\b/gi },
];

/** Arabic. */
/** The financial actions the Arabic rules attach to a directive. */
const AR_ACTION = 'تشتري|تستثمر|تبيع|تأجر|تقترض';

/** The same actions as a noun, for the impersonal recommendation. */
const AR_NOUN = 'الشراء|الاستثمار|البيع|الاستئجار|الاقتراض';

const AR_DENY: Rule[] = [
  {
    name: 'second-person directive',
    pattern: new RegExp(
      k(`(?:يجب|ينبغي|تستطيع|تحتاج إلى|من الأفضل أن)\\s*(?:أن\\s*)?(?:${AR_ACTION})`),
      'giu',
    ),
  },
  {
    // "اشتراكات" is the noun for subscriptions, not the imperative "اشتر".
    // The rule already leaves "استثمارات" alone for the same reason.
    name: 'second-person imperative',
    pattern: new RegExp(k('(?:اشتر(?!ك|ت|ا)|استثمر(?!ات|ت)|بِع|استأجِر|اختر(?!ت)|اطلب(?!ت))'), 'giu'),
  },
  {
    name: 'first-person recommendation',
    pattern: new RegExp(k('(?:نوصي|أوصي|ننصح)'), 'giu'),
  },
  {
    name: 'impersonal recommendation',
    pattern: new RegExp(k(`(?:يُنصح|يوصى|ينبغي)\\s*(?:أن\\s*)?(?:ب)?(?:${AR_ACTION}|${AR_NOUN})`), 'giu'),
  },
  { name: 'worth-it verdict', pattern: new RegExp(k('يستحق (?:الشراء|الاستثمار|الاقتراض)'), 'giu') },
  { name: 'has-sense verdict', pattern: new RegExp(k('من المنطقي (?:أن |ال)?(?:شراء|الاستثمار)'), 'giu') },
  {
    name: 'option verdict',
    pattern: new RegExp(k('(?:الشراء|الاستئجار|الاستثمار|البيع) (?:هو |هو الخيار )?(?:الأفضل|أفضل)'), 'giu'),
  },
  { name: 'best-option verdict', pattern: new RegExp(k('(?:أفضل خيار|الخيار الأفضل|أفضل توقيت)'), 'giu') },
  { name: 'must directive', pattern: new RegExp(k('يجب (?:شراء|بيع|استثمار|استئجار|اقتراض)'), 'giu') },
  {
    name: 'avoid directive',
    pattern: new RegExp(k('(?:تجنب|لا) (?:شراء|بيع|استثمار|استئجار|اقتراض)'), 'giu'),
  },
  { name: 'consider directive', pattern: new RegExp(k('(?:فكر في|ضع في اعتبارك|فكّر في) (?:شراء|بيع|استثمار|استئجار)'), 'giu') },
  {
    // The superlative needs a subject in front of it. "الأفضل" on its own
    // is not a verdict: "الترتيب الأفضل هو قصير" says the order that works
    // best is short, and "من الأفضل فهم ذلك" is the Arabic for "this is
    // worth understanding", which is a statement about the method. The
    // English rule makes the same distinction — it wants "the cheapest",
    // not "cheapest" — and the guardrail has to hold in every language.
    name: 'superlative claim',
    pattern: new RegExp(
      k('(?:هذا|هذه|ذلك|تلك|هو|هي|وهو|وهي)\\s+(?:هو|هي)?\\s*(?:الأرخص|الأسرع|الأأمن|الأفضل|الأوفر)'),
      'giu',
    ),
  },
  { name: 'advisory verb', pattern: new RegExp(k('(?:ننصح|يوصى|نوصي)'), 'giu') },
];

/** The financial actions the Tagalog rules attach to a directive. */
const TL_ACTION = 'mamili|bumili|invest|umuha|mag-utanga|mag-utang';

/** Tagalog. */
const TL_DENY: Rule[] = [
  {
    name: 'second-person directive',
    pattern: new RegExp(
      k(`(?:ikaw|kayo) (?:ay )?(?:dapat|kailangan|ng dapat)|(?:kailangan|dapat) mo(?:ng)?\\s*(?:${TL_ACTION})`),
      'giu',
    ),
  },
  {
    name: 'second-person imperative',
    pattern: new RegExp(k(`(?:${TL_ACTION})\\s+(?:ka|mo|mo na|muna)\\b`), 'giu'),
  },
  {
    name: 'first-person recommendation',
    pattern: new RegExp(k('(?:kami|ako|ayoko)\\s+(?:ay\\s+)?(?:nag-)?(?:mga\\s+)?rekomenda'), 'giu'),
  },
  { name: 'impersonal recommendation', pattern: new RegExp(k('(?:rekomenda ang|pinakamainam na)'), 'giu') },
  {
    name: 'worth-it verdict',
    pattern: new RegExp(k('(?:sulit|hindi sulit|oras na sulit) (?:mamili|bumili|invest|umuha)'), 'giu'),
  },
  {
    name: 'has-sense verdict',
    pattern: new RegExp(k('(?:may katuwiran|makatuwiran) (?:mamili|bumili|invest)'), 'giu'),
  },
  {
    name: 'option verdict',
    pattern: new RegExp(k('(?:mamili|umuha|invest|mag-utanga|mag-utang) ang (?:mas pinakamainam|mas ligtas|pinakamainam)'), 'giu'),
  },
  {
    name: 'best-option verdict',
    pattern: new RegExp(k('(?:pinakamainam na|pinakamahusay na) (?:piliin|opsyon|desisyon|paraan)'), 'giu'),
  },
  { name: 'must directive', pattern: new RegExp(k(`kailangang (?:${TL_ACTION})`), 'giu') },
  {
    name: 'avoid directive',
    pattern: new RegExp(k(`(?:iwasan|huwag|iwasan mong) (?:${TL_ACTION})`), 'giu'),
  },
  {
    name: 'consider directive',
    pattern: new RegExp(k('(?:isipin|ungkahin|tingnan) ang (?:pagbili|pagsama|pag-utang|palit)'), 'giu'),
  },
  { name: 'superlative claim', pattern: new RegExp(k('(?:pinakamura|pinakamabilis|pinakaligtas|pinakamainam)'), 'giu') },
  { name: 'advisory verb', pattern: new RegExp(k('(?:ipinapay|irekomenda|nagrekomenda)'), 'giu') },
];

/** Ukrainian. */
const UK_DENY: Rule[] = [
  {
    name: 'second-person directive',
    pattern: new RegExp(w('(?:ви|вам|ти|тебе|тобі) (?:не )?(?:повинні|слід|треба|варто|краще|мусите)'), 'giu'),
  },
  {
    name: 'second-person imperative',
    pattern: new RegExp(w('(?:купуйте|інвестуйте|продавайте|орендуйте|вкладайте|оформлюйте|рефінансуйте)'), 'giu'),
  },
  {
    name: 'first-person recommendation',
    pattern: new RegExp(w('(?:ми|я) (?:не )?(?:рекомендуємо|радимо|рекомендував|радив)'), 'giu'),
  },
  { name: 'impersonal recommendation', pattern: new RegExp(w('рекоменду(?:ємо|ється)'), 'giu') },
  {
    name: 'worth-it verdict',
    pattern: new RegExp(w('варто (?:купувати|інвестувати|продати|взяти|оформити|орендувати)'), 'giu'),
  },
  { name: 'has-sense verdict', pattern: new RegExp(w('має сенс (?:купувати|інвестувати|взяти)'), 'giu') },
  {
    name: 'option verdict',
    pattern: new RegExp(w('найкращ(?:ий|а|е) (?:варіант|рішення|вибір|момент|дія)'), 'giu'),
  },
  {
    name: 'best-option verdict',
    pattern: new RegExp(w('(?:найкращий варіант|ідеальний варіант|оптимальний варіант)'), 'giu'),
  },
  {
    name: 'must directive',
    pattern: new RegExp(w('необхідно (?:купити|продати|інвестувати|орендувати|оформити)'), 'giu'),
  },
  {
    name: 'avoid directive',
    pattern: new RegExp(w('(?:уникайте|не варто) (?:покупки|продажу|інвестицій|рефінансування)'), 'giu'),
  },
  {
    name: 'consider directive',
    pattern: new RegExp(w('подумайте про (?:покупку|продаж|інвестиції|рефінансування)'), 'giu'),
  },
  {
    name: 'superlative claim',
    pattern: new RegExp(w('най(?:дешевший|швидший|безпечніший|вигідніший|кращий)'), 'giu'),
  },
  { name: 'advisory verb', pattern: new RegExp(w('(?:радимо|рекомендуємо|порекомендуємо)'), 'giu') },
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
  zh: {
    deny: ZH_DENY,
    negations: [
      /不/,
      /别/,
      /勿/,
      /无需/,
      /无须/,
      /不必/,
      /没必要/,
      /不建议/,
      /无法/,
      /不是/,
      /不如/,
      /而不是/,
      /与其/,
      /并非/,
      /难以/,
    ],
  },
  ko: {
    deny: KO_DENY,
    negations: [
      /않/,
      /없/,
      /아니/,
      /대신/,
      /만큼/,
      /필요는 없/,
      /할 필요는 없/,
      /필요가 없/,
    ],
  },
  vi: {
    deny: VI_DENY,
    negations: [
      /không/,
      /chưa/,
      /chẳng/,
      /thay vì/,
      /nên là/,
      /hơn là/,
      /không cần/,
      /không nên/,
      /có thể/,
    ],
  },
  pt: {
    deny: PT_DENY,
    negations: [
      /\bnão\b/,
      /\bnunca\b/,
      /\bjamás\b/,
      /\bsem\b/,
      /\bem vez de\b/,
      /\bnem\b/,
      /\bnenhum/,
    ],
  },
  ar: {
    deny: AR_DENY,
    negations: [
      /لا/,
      /ليس/,
      /لن/,
      /لم/,
      /بدون/,
      /بدلاً من/,
      /لا حاجة/,
    ],
  },
  tl: {
    deny: TL_DENY,
    negations: [
      /hindi/,
      /huwag/,
      /iwasan/,
      /sa hindi/,
      /wala/,
      /bakit/,
      /hindi dapat/,
    ],
  },
  uk: {
    deny: UK_DENY,
    negations: [
      /не/,
      /ні/,
      /нет/,
      /без/,
      /замість/,
      /немає/,
      /не варто/,
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

/**
 * Split a line into sentences.
 *
 * The Latin and Cyrillic split needs a space and a capital letter after the
 * mark, or "3.14" and "U.S." would fall apart. CJK and Arabic have neither:
 * the mark is `。`, `！`, `？`, `؟`, the next character carries no case, and
 * two Chinese sentences are not separated by a space at all. So the marks
 * that carry no space split on their own, and the Latin rule additionally
 * accepts an Arabic letter, which has no uppercase to look for.
 */
function splitSentences(text: string): string[] {
  const flat = text.replace(/\s+/g, ' ');
  const parts: string[] = [];

  for (const chunk of flat.split(/(?<=[。！？؟])\s*/u)) {
    for (const piece of chunk.split(/(?<=[.!?])\s+(?=[A-ZА-ЯЁЇІЄҐ¿¡"'(\[]|\u0600-\u06FF)/u)) {
      if (piece.trim().length > 0) parts.push(piece);
    }
  }

  return parts;
}

function isNegated(sentence: string, matchIndex: number, negations: RegExp[]): boolean {
  const before = sentence.slice(Math.max(0, matchIndex - 90), matchIndex).toLowerCase();
  return negations.some((pattern) => pattern.test(before));
}

/** The locales that get their own folder of guides and their own dictionary. */
const LOCALE_FOLDERS = new Set<string>(['ru', 'es', 'zh', 'ko', 'vi', 'pt', 'ar', 'tl', 'uk']);

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
    if (candidate && LOCALE_FOLDERS.has(candidate)) return candidate as Locale;
    return 'en';
  }

  if (parts[0] === 'src' && parts[1] === 'i18n' && parts[2] === 'ui') {
    const name = (parts[3] ?? '').replace(/\.ts$/, '');
    if (LOCALE_FOLDERS.has(name)) return name as Locale;
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
  const byLocale = Object.fromEntries(LOCALES.map((locale) => [locale, 0])) as Record<Locale, number>;
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

  const tally = LOCALES.map((locale) => `${locale} ${byLocale[locale]}`).join(', ');
  console.log(`Advisory-language lint passed: ${targets.length} files checked (${tally}), 0 findings.`);
}

if (import.meta.main) {
  main();
}
