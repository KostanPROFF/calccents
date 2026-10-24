/**
 * The list of guide pictures.
 *
 * The slugs live here rather than in the component because a `.astro` file
 * cannot export a type: the frontmatter of a component is its own module
 * and nothing leaves it. A plain module next to the component is the
 * smallest place the shared type can live.
 *
 * The slugs are the ones the guides carry in their frontmatter. Six of the
 * guides explain a calculator that already has a picture, so they reuse
 * `ToolIllustration` instead of drawing the same shape twice; the mapping
 * is the table at the bottom of this file.
 */

import type { ToolSlug } from '../../config/tools.ts';

/** Which guide a picture belongs to. */
export type GuideIllustrationSlug =
  | 'mortgage-payment-calculator-explained'
  | 'rent-vs-buy-calculator-explained'
  | 'compound-interest-calculator-explained'
  | 'net-pay-calculator-explained'
  | 'income-tax-calculator-explained'
  | 'debt-payoff-calculator-explained'
  | 'how-mortgage-amortization-works'
  | 'how-to-read-an-amortization-schedule'
  | 'down-payment-and-closing-costs-explained'
  | 'extra-mortgage-payments-math'
  | 'monthly-payment-vs-total-cost-mortgage'
  | 'mortgage-rate-and-term-tradeoffs'
  | 'understanding-apr'
  | 'estimating-property-tax-and-home-insurance'
  | 'rent-vs-buy-common-mistakes'
  | 'compound-vs-simple-interest'
  | 'how-compounding-frequency-changes-results'
  | 'inflation-and-real-returns-explained';

/** Every slug, in the order the guides read them. */
export const GUIDE_ILLUSTRATION_SLUGS = [
  'mortgage-payment-calculator-explained',
  'rent-vs-buy-calculator-explained',
  'compound-interest-calculator-explained',
  'net-pay-calculator-explained',
  'income-tax-calculator-explained',
  'debt-payoff-calculator-explained',
  'how-mortgage-amortization-works',
  'how-to-read-an-amortization-schedule',
  'down-payment-and-closing-costs-explained',
  'extra-mortgage-payments-math',
  'monthly-payment-vs-total-cost-mortgage',
  'mortgage-rate-and-term-tradeoffs',
  'understanding-apr',
  'estimating-property-tax-and-home-insurance',
  'rent-vs-buy-common-mistakes',
  'compound-vs-simple-interest',
  'how-compounding-frequency-changes-results',
  'inflation-and-real-returns-explained',
] as const satisfies readonly GuideIllustrationSlug[];

/** The calculator whose picture a guide reuses, when it has one. */
export const TOOL_ILLUSTRATION_BY_GUIDE = {
  'mortgage-payment-calculator-explained': 'mortgage-payment',
  'rent-vs-buy-calculator-explained': 'rent-vs-buy',
  'compound-interest-calculator-explained': 'compound-interest',
  'net-pay-calculator-explained': 'net-pay',
  'income-tax-calculator-explained': 'income-tax',
  'debt-payoff-calculator-explained': 'debt-payoff',
} as const satisfies Partial<Record<GuideIllustrationSlug, ToolSlug>>;

/** The guide slugs whose picture is a reused calculator illustration. */
export type ReusedGuideSlug = keyof typeof TOOL_ILLUSTRATION_BY_GUIDE;

/** Whether a slug reuses a calculator picture. */
export function isReusedGuideSlug(
  slug: GuideIllustrationSlug,
): slug is ReusedGuideSlug {
  return slug in TOOL_ILLUSTRATION_BY_GUIDE;
}
