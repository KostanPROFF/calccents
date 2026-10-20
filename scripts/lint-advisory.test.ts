import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { findAdvisoryHits } from './lint-advisory.ts';

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
