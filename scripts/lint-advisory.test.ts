import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { findAdvisoryHits, type Locale } from './lint-advisory.ts';

/**
 * The YMYL guardrail is only worth having if it fires on real violations.
 * These cases are the reason the linter exists, so they are pinned: a rule
 * change that silences one of them is a regression, not a cleanup.
 */

function flagged(sentence: string): boolean {
  return findAdvisoryHits(sentence).length > 0;
}

describe('advisory linter — sentences that must be rejected', () => {
  const violations: [string, string][] = [
    ['directive', 'You should buy a house before the rate goes up.'],
    ['obligation', 'You must buy a home before the market closes.'],
    ['first-person recommendation', 'We recommend refinancing this loan today.'],
    ['first-person advice', 'I advise locking the rate this week.'],
    ['worth it', 'Buying is worth it in the long run.'],
    ['worth the risk', 'This mortgage is worth the risk.'],
    ['worth the cost', 'Waiting another year is worth the cost of rent.'],
    ['worth buying', 'It is worth buying the house next door.'],
    ['worth investing', 'It is worth investing the down payment.'],
    ['option verdict', 'Buying is the better option here.'],
    ['option verdict', 'Renting would be the smarter choice.'],
    ['best option', 'The best option is to refinance.'],
    ['best rate', 'Find the best rate available today.'],
    ['superlative', 'This is the cheapest loan on the market.'],
    ['consider directive', 'Consider buying a rental property.'],
    ['avoid directive', 'Avoid buying in a weak market.'],
  ];

  for (const [label, sentence] of violations) {
    it(`rejects a ${label}`, () => {
      assert.equal(flagged(sentence), true, `expected a finding in: ${sentence}`);
    });
  }
});

describe('advisory linter — sentences that must be accepted', () => {
  const allowed: [string, string][] = [
    ['epistemic worth', 'The rate and the term are worth separating, because they behave differently.'],
    ['epistemic worth', 'It is worth reading the contract before making a decision.'],
    ['epistemic worth', 'Two consequences are worth knowing before a purchase.'],
    ['quantitative worth', 'A rate change of a percentage point is worth more than a term change of five years.'],
    ['quantitative worth', 'The compounding effect is worth money over long horizons.'],
    ['epistemic worth', 'The formula is worth reading once, because it explains something the table does not.'],
    ['negated directive', 'The tool does not tell you what you should do with the result.'],
    ['negated verdict', 'It does not tell you which option is better for you.'],
    ['negated superlative', 'This is not the best option for everyone.'],
    ['factual comparison', 'Renting costs less per month than owning in this scenario.'],
    ['method statement', 'The projection runs one period at a time, so the yearly table uses the same arithmetic.'],
  ];

  for (const [label, sentence] of allowed) {
    it(`accepts ${label}`, () => {
      assert.equal(flagged(sentence), false, `unexpected finding in: ${sentence}`);
    });
  }
});

describe('advisory linter — scope of the rule set', () => {
  it('reports the rule that fired', () => {
    const hits = findAdvisoryHits('You should buy a house before the rate goes up.');
    assert.equal(hits.length, 1);
    assert.equal(hits[0]?.rule, 'second-person directive');
  });

  it('reads prose, not markup', () => {
    const html = '<p>A paragraph that says you should buy a house.</p>';
    assert.equal(findAdvisoryHits(html).length > 0, true);
  });

  it('ignores code blocks', () => {
    const markdown = '```\nyou should buy a house\n```';
    assert.equal(flagged(markdown), false);
  });

  it('treats a negated directive in the same sentence as acceptable', () => {
    assert.equal(flagged('We do not advise buying more than one property.'), false);
  });
});

/**
 * The site is published in three languages, and a guardrail that only knows
 * English would pass a Russian guide full of "вы должны покупать" without a
 * word. These cases pin the other two rule sets.
 */
function flaggedIn(sentence: string, locale: Locale): boolean {
  return findAdvisoryHits(sentence, '<text>', locale).length > 0;
}

describe('advisory linter — Russian', () => {
  const violations: [string, string][] = [
    ['directive', 'Вы должны купить дом до роста ставок.'],
    ['dative directive', 'Вам следует инвестировать в недвижимость.'],
    ['negated directive is still a directive', 'Вы не должны покупать жильё.'],
    ['first-person recommendation', 'Мы рекомендуем рефинансировать кредит.'],
    ['worth-it verdict', 'Стоит покупать жильё, если ставки вырастут.'],
    ['option verdict', 'Лучший вариант — купить квартиру.'],
    ['consider directive', 'Подумайте о покупке жилья.'],
  ];

  for (const [label, sentence] of violations) {
    it(`rejects a Russian ${label}`, () => {
      assert.equal(flaggedIn(sentence, 'ru'), true, `expected a finding in: ${sentence}`);
    });
  }

  const allowed: [string, string][] = [
    ['negated directive', 'Калькулятор не говорит вам, что вы должны делать.'],
    ['negated verdict', 'Никто не говорит, что нужно покупать.'],
    ['factual comparison', 'Аренда обходится в месяц дешевле, чем владение.'],
  ];

  for (const [label, sentence] of allowed) {
    it(`accepts a Russian ${label}`, () => {
      assert.equal(flaggedIn(sentence, 'ru'), false, `unexpected finding in: ${sentence}`);
    });
  }
});

describe('advisory linter — Spanish', () => {
  const violations: [string, string][] = [
    ['directive', 'Deberías comprar una vivienda antes de que suban los tipos.'],
    ['impersonal directive', 'Hay que invertir en una casa.'],
    ['first-person recommendation', 'Te recomendamos refinanciar el préstamo.'],
    ['worth-it verdict', 'Vale la pena comprar el piso.'],
    ['best-option verdict', 'La mejor opción es comprar.'],
    ['consider directive', 'Considera comprar una vivienda.'],
  ];

  for (const [label, sentence] of violations) {
    it(`rejects a Spanish ${label}`, () => {
      assert.equal(flaggedIn(sentence, 'es'), true, `expected a finding in: ${sentence}`);
    });
  }

  const allowed: [string, string][] = [
    ['negated directive', 'La calculadora no te dice qué hacer con el resultado.'],
    ['noun infinitive', 'Alquilar y comprar son dos regímenes distintos para lo mismo.'],
    ['editorial statement', 'Una guía que recomienda una acción se reescribe.'],
    ['factual comparison', 'Alquilar cuesta menos al mes que comprar en este escenario.'],
  ];

  for (const [label, sentence] of allowed) {
    it(`accepts a Spanish ${label}`, () => {
      assert.equal(flaggedIn(sentence, 'es'), false, `unexpected finding in: ${sentence}`);
    });
  }
});

describe('advisory linter — the other languages', () => {
  const violations: [Locale, string][] = [
    ['uk', 'Ви повинні купувати житло зараз.'],
    ['uk', 'Ми рекомендуємо рефінансувати кредит.'],
    ['pt', 'Você deve comprar um imóvel agora.'],
    ['pt', 'Vale a pena comprar a casa.'],
    ['zh', '你应该购买房子。'],
    ['zh', '我们建议提前还款。'],
    ['ko', '지금 주택을 구매하세요.'],
    ['ko', '재융자를 추천합니다.'],
    ['vi', 'Bạn nên mua nhà ngay bây giờ.'],
    ['vi', 'Chúng tôi khuyên vay với lãi suất cố định.'],
    ['ar', 'يجب عليك أن تشتري منزلًا الآن.'],
    ['ar', 'ننصح بإعادة التمويل.'],
    ['tl', 'Dapat kang bumili ng bahay ngayon.'],
    ['tl', 'Inirerekomenda namin ang pag-refinance.'],
  ];

  for (const [locale, sentence] of violations) {
    it(`rejects a directive in ${locale}`, () => {
      assert.equal(flaggedIn(sentence, locale), true, `expected a finding in: ${sentence}`);
    });
  }

  const allowed: [Locale, string][] = [
    ['uk', 'Калькулятор не каже, що робити з результатом.'],
    ['pt', 'Os custos de venda reduzem o patrimônio.'],
    ['zh', '计算器不会告诉你应该购买什么。'],
    ['ko', '이 계산기는 무엇을 구매해야 하는지 말하지 않습니다.'],
    ['vi', 'Công cụ này không nói bạn nên mua gì.'],
    ['ar', 'لا تخبرك الحاسبة بما يجب أن تشتري.'],
    ['tl', 'Hindi sinasabi ng calculator kung ano ang dapat mong bilhin.'],
  ];

  for (const [locale, sentence] of allowed) {
    it(`accepts a negated sentence in ${locale}`, () => {
      assert.equal(flaggedIn(sentence, locale), false, `unexpected finding in: ${sentence}`);
    });
  }
});
