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
 * The site is published in ten languages, and a guardrail that only knows
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

/**
 * The seven languages added after Spanish.
 *
 * Each rule set is written in its own language, because a guardrail that
 * only knows English and Russian would pass a Chinese guide full of
 * "你应该购买" without a word.
 */
describe('advisory linter — Chinese', () => {
  const violations: [string, string][] = [
    ['directive', '你应该尽快买房。'],
    ['directive', '您应该尽快买房。'],
    ['imperative', '请务必购买房屋保险。'],
    ['first-person recommendation', '我们建议你尽快贷款。'],
    ['worth-it verdict', '这值得购买这套房。'],
    ['best-option verdict', '最好的方案是提前还款。'],
    ['avoid directive', '避免购买投资房。'],
    ['consider directive', '考虑购买出租房产。'],
  ];

  for (const [label, sentence] of violations) {
    it(`rejects a Chinese ${label}`, () => {
      assert.equal(flaggedIn(sentence, 'zh'), true, `expected a finding in: ${sentence}`);
    });
  }

  const allowed: [string, string][] = [
    ['negated directive', '这个计算器不会告诉你应该买什么。'],
    ['factual comparison', '在这个情景下，租房的月供比买房更低。'],
    ['method statement', '表格按月逐期计算，所以年表用的是同一套算术。'],
  ];

  for (const [label, sentence] of allowed) {
    it(`accepts a Chinese ${label}`, () => {
      assert.equal(flaggedIn(sentence, 'zh'), false, `unexpected finding in: ${sentence}`);
    });
  }
});

describe('advisory linter — Korean', () => {
  const violations: [string, string][] = [
    ['directive', '당신은 반드시 구매해야 합니다.'],
    ['imperative', '지금 매도하십시오.'],
    ['first-person recommendation', '저희가 추천합니다.'],
    ['impersonal recommendation', '구매하는 것을 권합니다.'],
    ['worth-it verdict', '매도할 가치가 있습니다.'],
    ['option verdict', '구매하는 것이 최선입니다.'],
    ['consider directive', '구매를 고려하세요.'],
  ];

  for (const [label, sentence] of violations) {
    it(`rejects a Korean ${label}`, () => {
      assert.equal(flaggedIn(sentence, 'ko'), true, `expected a finding in: ${sentence}`);
    });
  }

  const allowed: [string, string][] = [
    ['negated directive', '이 계산기는 무엇을 해야 하는지 알려주지 않습니다.'],
    ['factual comparison', '이 상황에서 월세 비용이 소유 비용보다 낮습니다.'],
  ];

  for (const [label, sentence] of allowed) {
    it(`accepts a Korean ${label}`, () => {
      assert.equal(flaggedIn(sentence, 'ko'), false, `unexpected finding in: ${sentence}`);
    });
  }
});

describe('advisory linter — Vietnamese', () => {
  const violations: [string, string][] = [
    ['directive', 'Bạn nên mua ngay bây giờ.'],
    ['imperative', 'Hãy đầu tư vào bất động sản.'],
    ['first-person recommendation', 'Chúng tôi khuyên bạn vay vốn.'],
    ['worth-it verdict', 'Việc mua là đáng để đầu tư.'],
    ['option verdict', 'Mua là lựa chọn tốt nhất.'],
    ['consider directive', 'Hãy cân nhắc mua nhà.'],
  ];

  for (const [label, sentence] of violations) {
    it(`rejects a Vietnamese ${label}`, () => {
      assert.equal(flaggedIn(sentence, 'vi'), true, `expected a finding in: ${sentence}`);
    });
  }

  const allowed: [string, string][] = [
    ['negated directive', 'Máy tính không nói với bạn nên làm gì với kết quả.'],
    ['factual comparison', 'Trong kịch bản này, chi phí thuê hàng tháng thấp hơn chi phí sở hữu.'],
  ];

  for (const [label, sentence] of allowed) {
    it(`accepts a Vietnamese ${label}`, () => {
      assert.equal(flaggedIn(sentence, 'vi'), false, `unexpected finding in: ${sentence}`);
    });
  }
});

describe('advisory linter — Portuguese', () => {
  const violations: [string, string][] = [
    ['directive', 'Você deve comprar uma casa antes que os juros subam.'],
    ['imperative', 'Compre uma casa antes que os juros subam.'],
    ['first-person recommendation', 'Recomendamos refinanciar o empréstimo.'],
    ['worth-it verdict', 'Vale a pena comprar o imóvel.'],
    ['best-option verdict', 'A melhor opção é comprar.'],
    ['consider directive', 'Considere comprar um imóvel.'],
  ];

  for (const [label, sentence] of violations) {
    it(`rejects a Portuguese ${label}`, () => {
      assert.equal(flaggedIn(sentence, 'pt'), true, `expected a finding in: ${sentence}`);
    });
  }

  const allowed: [string, string][] = [
    ['negated directive', 'A calculadora não diz o que você deve fazer com o resultado.'],
    ['factual comparison', 'Alugar custa menos por mês do que comprar neste cenário.'],
  ];

  for (const [label, sentence] of allowed) {
    it(`accepts a Portuguese ${label}`, () => {
      assert.equal(flaggedIn(sentence, 'pt'), false, `unexpected finding in: ${sentence}`);
    });
  }
});

describe('advisory linter — Arabic', () => {
  const violations: [string, string][] = [
    ['directive', 'يجب أن تشتري منزلاً قبل أن ترتفع الأسعار.'],
    ['imperative', 'اشتر منزلاً الآن.'],
    ['first-person recommendation', 'نوصي بإتمام عملية الشراء.'],
    ['worth-it verdict', 'يستحق الشراء في هذا الوقت.'],
    ['best-option verdict', 'أفضل خيار هو الشراء.'],
    ['consider directive', 'فكر في شراء منزل آخر.'],
    ['superlative', 'هذا هو الأرخص بين العروض.'],
  ];

  for (const [label, sentence] of violations) {
    it(`rejects an Arabic ${label}`, () => {
      assert.equal(flaggedIn(sentence, 'ar'), true, `expected a finding in: ${sentence}`);
    });
  }

  const allowed: [string, string][] = [
    ['negated directive', 'لا يخبرك الحاسوب بما يجب أن تفعل بالنتيجة.'],
    ['factual comparison', 'في هذا السيناريو، الإيجار الشهري أقل من تكلفة الملكية.'],
    ['method statement', 'الترتيب الأفضل هو قصير.'],
    ['epistemic best', 'من الأفضل فهم ذلك ميكانيكيًا لا بصورة مجردة.'],
    ['question about a choice', 'هل من الأفضل سداد مبلغ إضافي أم استثمار الأموال؟'],
    ['a noun, not an imperative', 'اشتراكات لاستخدام أي منها.'],
  ];

  for (const [label, sentence] of allowed) {
    it(`accepts an Arabic ${label}`, () => {
      assert.equal(flaggedIn(sentence, 'ar'), false, `unexpected finding in: ${sentence}`);
    });
  }
});

describe('advisory linter — Tagalog', () => {
  const violations: [string, string][] = [
    ['directive', 'Kailangan mong bumili ng bahay.'],
    ['imperative', 'Bumili ka ng bahay ngayon.'],
    ['first-person recommendation', 'Kami ay nag-rekomenda na bumili ka.'],
    ['worth-it verdict', 'Sulit bumili ngayon bago magtaas ang presyo.'],
    ['must directive', 'Kailangang bumili ngayon.'],
    ['avoid directive', 'Iwasan bumili kapag mahina ang merkado.'],
  ];

  for (const [label, sentence] of violations) {
    it(`rejects a Tagalog ${label}`, () => {
      assert.equal(flaggedIn(sentence, 'tl'), true, `expected a finding in: ${sentence}`);
    });
  }

  const allowed: [string, string][] = [
    ['negated directive', 'Hindi sinasabi ng calculator kung ano ang gagawin mo sa resulta.'],
    ['factual comparison', 'Sa sitwasyong ito, mas mababa ang buwanang upa kaysa sa gastos ng pag-aari.'],
  ];

  for (const [label, sentence] of allowed) {
    it(`accepts a Tagalog ${label}`, () => {
      assert.equal(flaggedIn(sentence, 'tl'), false, `unexpected finding in: ${sentence}`);
    });
  }
});

describe('advisory linter — Ukrainian', () => {
  const violations: [string, string][] = [
    ['directive', 'Ви повинні купити житло до зростання ставок.'],
    ['imperative', 'Купуйте будинок зараз.'],
    ['first-person recommendation', 'Ми рекомендуємо рефінансувати кредит.'],
    ['worth-it verdict', 'Варто купувати житло, якщо ставки зростуть.'],
    ['option verdict', 'Найкращий варіант — купити квартиру.'],
    ['consider directive', 'Подумайте про покупку житла.'],
  ];

  for (const [label, sentence] of violations) {
    it(`rejects a Ukrainian ${label}`, () => {
      assert.equal(flaggedIn(sentence, 'uk'), true, `expected a finding in: ${sentence}`);
    });
  }

  const allowed: [string, string][] = [
    ['negated directive', 'Калькулятор не каже, що вам робити з результатом.'],
    ['factual comparison', 'У цій ситуації оренда коштує менше на місяць, ніж володіння.'],
  ];

  for (const [label, sentence] of allowed) {
    it(`accepts a Ukrainian ${label}`, () => {
      assert.equal(flaggedIn(sentence, 'uk'), false, `unexpected finding in: ${sentence}`);
    });
  }
});
