/**
 * The one worked example the home page shows.
 *
 * The hero calculator starts from these numbers and the sample result card
 * further down the page is computed from them, so the two cannot disagree.
 */
import { computeMonthlyPayment } from '../../lib/calc/mortgage.ts';

export const HERO_DEFAULTS = { price: 450000, down: 20, rate: 6.5, years: 30 } as const;

const SAMPLE_PROPERTY_TAX_MONTHLY = 280;

export function heroExample() {
  const loan = HERO_DEFAULTS.price * (1 - HERO_DEFAULTS.down / 100);
  const payments = HERO_DEFAULTS.years * 12;
  const monthly = computeMonthlyPayment(loan, HERO_DEFAULTS.rate, payments);
  return {
    loan,
    monthly,
    propertyTax: SAMPLE_PROPERTY_TAX_MONTHLY,
    monthlyWithTax: monthly + SAMPLE_PROPERTY_TAX_MONTHLY,
    totalInterest: monthly * payments - loan,
  };
}
