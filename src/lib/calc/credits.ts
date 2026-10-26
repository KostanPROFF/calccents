/**
 * The credits.
 *
 * The federal earned income tax credit, and the state credits that are set as
 * a share of it. The federal credit is not part of the federal income tax on
 * this site, because the federal calculator models ordinary income tax only.
 * It is here for one reason: the state credits that are a percentage of the
 * federal credit need the federal credit to be worth anything at all.
 *
 * The federal figures are the 2026 ones, from the Congressional Research
 * Service report on the credit, which takes them from Rev. Proc. 2025-32:
 *
 *   https://www.congress.gov/crs-product/R43805
 *
 * The state figures are in `src/lib/data/stateCredits.ts`, with the source
 * and the date of each one.
 */

/** The maximum federal credit, by number of qualifying children. */
export const FEDERAL_EITC_MAX_CREDIT = [664, 4427, 7316, 8231] as const;

/** The rate the credit is earned at, by number of qualifying children. */
export const FEDERAL_EITC_PHASE_IN_RATE = [0.0765, 0.34, 0.4, 0.45] as const;

/** The income the credit starts to fall away at, for a single filer. */
export const FEDERAL_EITC_PHASE_OUT_SINGLE = [10860, 23890, 23890, 23890] as const;

/** The same, for a married couple filing jointly. */
export const FEDERAL_EITC_PHASE_OUT_MARRIED = [18140, 31160, 31160, 31160] as const;

/** The rate the credit falls away at, by number of qualifying children. */
export const FEDERAL_EITC_PHASE_OUT_RATE = [0.0765, 0.1598, 0.2106, 0.2106] as const;

/**
 * The federal credit for an amount of income.
 *
 * The credit is earned at one rate up to a point, is at its maximum between
 * that point and the point where it starts to fall away, and falls away at
 * another rate after that. The income here stands for both the earned income
 * the credit is earned on and the adjusted gross income it falls away
 * against, because the calculator has one income figure.
 */
export function federalEitc(income: number, children: number, married = false): number {
  if (!Number.isFinite(income) || income <= 0) return 0;

  const index = Math.min(Math.max(Math.trunc(children), 0), 3);
  const maxCredit = FEDERAL_EITC_MAX_CREDIT[index];
  const phaseInRate = FEDERAL_EITC_PHASE_IN_RATE[index];
  const phaseInEnd = maxCredit / phaseInRate;
  const phaseOutThreshold = married
    ? FEDERAL_EITC_PHASE_OUT_MARRIED[index]
    : FEDERAL_EITC_PHASE_OUT_SINGLE[index];
  const phaseOutRate = FEDERAL_EITC_PHASE_OUT_RATE[index];
  const phaseOutEnd = phaseOutThreshold + maxCredit / phaseOutRate;

  if (income <= phaseInEnd) return roundCents(income * phaseInRate);
  if (income <= phaseOutThreshold) return maxCredit;
  if (income >= phaseOutEnd) return 0;
  return roundCents(maxCredit - (income - phaseOutThreshold) * phaseOutRate);
}

function roundCents(value: number): number {
  return Math.round(value * 100) / 100;
}
