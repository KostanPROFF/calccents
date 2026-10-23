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
  /** Pre-tax deductions for the year: 401(k), HSA, FSA. */
  preTaxDeductionsAnnual: number;
}

export interface NetPayResult {
  annualGross: number;
  /** Gross income before the pre-tax deductions are taken out. */
  annualTaxableIncome: number;
  preTaxDeductions: number;
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
 * Pre-tax deductions come out of the gross first, because that is what
 * they do: a 401(k) contribution is taken out before the wage is taxed,
 * and it comes out before the payroll taxes as well.
 */
export function computeNetPay(input: NetPayInput): NetPayResult {
  const periodsPerYear = PERIODS_PER_YEAR[input.period];
  const gross = Number.isFinite(input.grossPay) ? Math.max(0, input.grossPay) : 0;
  const annualGross = roundCents(gross * periodsPerYear);

  const preTax = Number.isFinite(input.preTaxDeductionsAnnual)
    ? Math.min(Math.max(0, input.preTaxDeductionsAnnual), annualGross)
    : 0;

  // The wages the payroll taxes are calculated on.
  const taxableWages = roundCents(annualGross - preTax);
  const taxable = taxableIncome(taxableWages, input.filingStatus);

  const federalTax = federalIncomeTax(taxable, input.filingStatus);
  const socialSecurity = socialSecurityTax(taxableWages);
  const medicare = medicareTax(taxableWages);
  const additionalMedicare = additionalMedicareTax(taxableWages, input.filingStatus);
  const stateTax = stateIncomeTax(taxable, input.stateRatePercent);

  const totalTax = roundCents(federalTax + socialSecurity + medicare + additionalMedicare + stateTax);
  const annualNet = roundCents(annualGross - preTax - totalTax);

  return {
    annualGross,
    annualTaxableIncome: taxable,
    preTaxDeductions: preTax,
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
