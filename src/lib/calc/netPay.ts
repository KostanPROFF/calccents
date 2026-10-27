/**
 * Take-home pay.
 *
 * The question this answers is the one a reader with a job actually has:
 * how much of the number on the paycheque stays. It starts from the gross
 * amount, removes the taxes that come out of a wage, and divides what is
 * left by the number of pay periods in the year.
 *
 * The model is deliberately plain. Every number it produces comes from one
 * of three places: the gross amount the reader typed, the tax year figures
 * in tax.ts, or the rate the reader typed for their state.
 *
 * The pre-tax deductions are the part that needs care, because the IRS
 * does not treat all of them the same way:
 *
 *   - A 401(k) or 403(b) contribution is excluded from income, but it is
 *     still wages for Social Security and Medicare. See IRS Topic 401,
 *     "Wages and salaries", and Publication 525, "Taxable and Nontaxable
 *     Income": the amount is not included in wages subject to income tax,
 *     but it "is included in wages subject to social security and Medicare
 *     taxes".
 *
 *   - A health FSA contribution and an HSA contribution made through a
 *     section 125 cafeteria plan are excluded from income *and* from
 *     Social Security wages. See SSA POMS RS 01402.038, "Tax-Favored
 *     Health Plans": an employee contribution to an FSA "via a qualified
 *     salary reduction agreement" is not wages for Social Security, and an
 *     HSA contribution made that way is not either.
 *
 * So the two are entered separately: the retirement contribution lowers
 * the federal tax only, and the health account contribution lowers the
 * federal tax and the payroll taxes as well.
 */

import { roundCents } from './money.ts';
import {
  additionalMedicareTax,
  federalIncomeTax,
  marginalRate,
  medicareTax,
  socialSecurityTax,
  stateIncomeTax,
  taxableIncome,
  type FilingStatus,
} from './tax.ts';

/** How often a reader is paid. */
export type PayPeriod = 'year' | 'month' | 'week' | 'day' | 'hour';

/**
 * The number of periods in a year.
 *
 * These are the conventional counts: 12 months, 52 weeks, 260 working
 * days, and 2,080 hours for a 40-hour week over 52 weeks. They are
 * assumptions, they are stated on the page, and a reader who is paid on
 * different numbers can work with their own.
 */
export const PERIODS_PER_YEAR: Record<PayPeriod, number> = {
  year: 1,
  month: 12,
  week: 52,
  day: 260,
  hour: 2_080,
};

export interface NetPayInput {
  /** The gross amount, in the period the reader chose. */
  grossPay: number;
  period: PayPeriod;
  filingStatus: FilingStatus;
  /** The reader's state income tax rate, as a percentage. */
  stateRatePercent: number;
  /**
   * The 401(k) or 403(b) contribution for the year.
   *
   * It comes off the taxable income and it comes out of the paycheque, but
   * it is still subject to Social Security and Medicare.
   */
  retirementContributionAnnual: number;
  /**
   * The health account contribution for the year: an HSA or a health FSA
   * taken out of the paycheque before the tax.
   *
   * It comes off the taxable income and it comes off the payroll taxes as
   * well.
   */
  healthAccountDeductionsAnnual: number;
}

export interface NetPayResult {
  annualGross: number;
  /** Gross income before the pre-tax deductions are taken out. */
  annualTaxableIncome: number;
  /** Both pre-tax deductions together. */
  preTaxDeductions: number;
  /** The 401(k) or 403(b) contribution. */
  retirementContribution: number;
  /** The HSA or FSA contribution. */
  healthAccountDeductions: number;
  federalTax: number;
  socialSecurity: number;
  medicare: number;
  additionalMedicare: number;
  stateTax: number;
  totalTax: number;
  annualNet: number;
  /** The take-home amount for the period the reader chose. */
  netPerPeriod: number;
  /** The take-home amount for a month, which is what most readers compare against. */
  netPerMonth: number;
  /** Total tax as a share of gross income. */
  effectiveTaxRate: number;
  /** The rate the next dollar of taxable income is taxed at. */
  marginalRate: number;
}

/**
 * The take-home calculation.
 *
 * The deductions come out of the gross first, because that is what they
 * do: a contribution taken before the tax is taken out of the paycheque
 * before the tax is worked out. What each one does to the taxes depends on
 * what it is, which is why there are two of them.
 */
export function computeNetPay(input: NetPayInput): NetPayResult {
  const periodsPerYear = PERIODS_PER_YEAR[input.period];
  const gross = Number.isFinite(input.grossPay) ? Math.max(0, input.grossPay) : 0;
  const annualGross = roundCents(gross * periodsPerYear);

  /*
   * Neither deduction can be larger than the pay it comes out of, and the
   * two together cannot be larger than the gross either.
   */
  const retirement = Math.min(
    Number.isFinite(input.retirementContributionAnnual)
      ? Math.max(0, input.retirementContributionAnnual)
      : 0,
    annualGross,
  );
  const healthAccount = Math.min(
    Number.isFinite(input.healthAccountDeductionsAnnual)
      ? Math.max(0, input.healthAccountDeductionsAnnual)
      : 0,
    annualGross - retirement,
  );
  const preTax = roundCents(retirement + healthAccount);

  // The income the federal tax is worked out on.
  const taxable = taxableIncome(annualGross - preTax, input.filingStatus);

  /*
   * The wages the payroll taxes are calculated on. The retirement
   * contribution is still FICA wages; the health account contribution is
   * not.
   */
  const ficaWages = roundCents(annualGross - healthAccount);

  const federalTax = federalIncomeTax(taxable, input.filingStatus);
  const socialSecurity = socialSecurityTax(ficaWages);
  const medicare = medicareTax(ficaWages);
  const additionalMedicare = additionalMedicareTax(ficaWages, input.filingStatus);
  const stateTax = stateIncomeTax(taxable, input.stateRatePercent);

  const totalTax = roundCents(federalTax + socialSecurity + medicare + additionalMedicare + stateTax);
  const annualNet = roundCents(annualGross - preTax - totalTax);

  return {
    annualGross,
    annualTaxableIncome: taxable,
    preTaxDeductions: preTax,
    retirementContribution: roundCents(retirement),
    healthAccountDeductions: roundCents(healthAccount),
    federalTax,
    socialSecurity,
    medicare,
    additionalMedicare,
    stateTax,
    totalTax,
    annualNet,
    netPerPeriod: roundCents(annualNet / periodsPerYear),
    netPerMonth: roundCents(annualNet / 12),
    effectiveTaxRate: annualGross > 0 ? roundCents((totalTax / annualGross) * 100) : 0,
    marginalRate: marginalRate(taxable, input.filingStatus),
  };
}
