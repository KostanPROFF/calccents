/**
 * Mortgage payment and amortization.
 *
 * The engine works on plain numbers and never reads the system clock, so
 * every result is reproducible from its inputs.
 */

import { addMonths, roundCents, roundTo, sum } from './money.ts';

export interface MortgageInput {
  /** Loan amount in dollars. */
  principal: number;
  /** Nominal annual interest rate, in percent (6.5 means 6.5%). */
  annualRatePercent: number;
  /** Term of the loan, in years. */
  termYears: number;
  /** Annual property tax in dollars. */
  propertyTaxAnnual: number;
  /** Annual homeowner's insurance in dollars. */
  homeownersInsuranceAnnual: number;
  /** Monthly HOA or condo fee in dollars. */
  hoaMonthly: number;
  /** Optional extra principal paid every month, in dollars. */
  extraMonthlyPayment: number;
  /** Month the first payment is made. */
  startDate: Date;
}

export interface AmortizationRow {
  month: number;
  year: number;
  scheduledPayment: number;
  principal: number;
  interest: number;
  extra: number;
  balance: number;
  cumulativeInterest: number;
}

export interface YearlySummaryRow {
  year: number;
  payments: number;
  principalPaid: number;
  interestPaid: number;
  extraPaid: number;
  yearEndBalance: number;
  cumulativeInterest: number;
}

export interface MortgageResult {
  /** The amount originally borrowed. */
  originalPrincipal: number;
  /** Scheduled monthly principal and interest. */
  monthlyPrincipalAndInterest: number;
  /** Scheduled payment plus tax, insurance and HOA, per month. */
  monthlyPiti: number;
  /** Number of payments actually made. */
  numberOfPayments: number;
  /** Months until the loan is paid off. */
  payoffMonths: number;
  /** Month the loan is paid off. */
  payoffDate: Date;
  totalInterest: number;
  totalPrincipal: number;
  totalExtraPayments: number;
  /** Principal, interest and extra payments combined. */
  totalPaid: number;
  /** Total paid including tax, insurance and HOA over the life of the loan. */
  totalHousingCost: number;
  schedule: AmortizationRow[];
  yearly: YearlySummaryRow[];
}

function assertNonNegative(value: number, label: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${label} must be a finite number of zero or more`);
  }
}

/**
 * Standard amortization payment.
 *
 *   M = P * r * (1 + r)^n / ((1 + r)^n - 1)
 *
 * where r is the monthly rate and n the number of months. At a zero rate
 * the formula degenerates to P / n.
 *
 * The same thing is true as the rate gets very small: the payment tends to
 * P / n, and the denominator (1 + r)^n - 1 tends to zero with it. So the
 * growth is worked out with exp and expm1, which keep their accuracy when
 * the exponent is tiny, and a rate that is too small to divide by falls
 * back on P / n instead of running off to infinity.
 */
export function computeMonthlyPayment(
  principal: number,
  annualRatePercent: number,
  termMonths: number,
): number {
  if (!Number.isFinite(termMonths) || termMonths <= 0) {
    throw new Error('Term must be at least one month');
  }
  if (!Number.isFinite(principal) || principal < 0) {
    throw new Error('Loan amount must be a finite number of zero or more');
  }
  if (!Number.isFinite(annualRatePercent) || annualRatePercent < 0) {
    throw new Error('Interest rate must be a finite number of zero or more');
  }
  if (principal === 0) return 0;

  const monthlyRate = annualRatePercent / 100 / 12;
  if (monthlyRate === 0) {
    return roundCents(principal / termMonths);
  }
  const exponent = termMonths * Math.log1p(monthlyRate);
  const growth = Math.exp(exponent);
  const denominator = Math.expm1(exponent);
  if (denominator <= 0) {
    return roundCents(principal / termMonths);
  }
  return roundCents((principal * monthlyRate * growth) / denominator);
}

/**
 * Build the full amortization schedule and the totals that go with it.
 *
 * Extra monthly payments are applied to principal, so they shorten the
 * schedule rather than shortening the term in the calculation.
 */
export function buildAmortization(input: MortgageInput): MortgageResult {
  assertNonNegative(input.principal, 'Loan amount');
  assertNonNegative(input.annualRatePercent, 'Interest rate');
  assertNonNegative(input.termYears, 'Term');
  assertNonNegative(input.propertyTaxAnnual, 'Annual property tax');
  assertNonNegative(input.homeownersInsuranceAnnual, 'Annual insurance');
  assertNonNegative(input.hoaMonthly, 'Monthly HOA');
  assertNonNegative(input.extraMonthlyPayment, 'Extra monthly payment');
  if (input.termYears <= 0) {
    throw new Error('Term must be at least one year');
  }
  if (!(input.startDate instanceof Date) || Number.isNaN(input.startDate.getTime())) {
    throw new Error('Start date must be a valid date');
  }

  const termMonths = Math.round(input.termYears * 12);
  const monthlyRate = input.annualRatePercent / 100 / 12;
  const scheduledPayment = computeMonthlyPayment(
    input.principal,
    input.annualRatePercent,
    termMonths,
  );

  const schedule: AmortizationRow[] = [];
  let balance = input.principal;
  let cumulativeInterest = 0;
  let totalExtra = 0;
  let totalInterest = 0;
  let month = 0;

  while (month < termMonths && balance > 0) {
    month += 1;
    const interest = roundCents(balance * monthlyRate);
    const isFinalScheduledMonth = month === termMonths;

    // On the last scheduled month the remaining balance is paid off in
    // full, so the loan closes at exactly zero. A rounded monthly payment
    // would otherwise leave a few cents outstanding.
    const principalPortion = isFinalScheduledMonth
      ? roundCents(balance)
      : roundCents(Math.min(scheduledPayment - interest, balance));

    const remainingAfterPrincipal = Math.max(0, balance - principalPortion);
    const extra = isFinalScheduledMonth
      ? 0
      : roundCents(Math.min(input.extraMonthlyPayment, remainingAfterPrincipal));

    // Only the principal part reduces the balance; interest is money the
    // borrower has already paid away.
    balance = roundCents(balance - principalPortion - extra);
    if (balance < 0.01) balance = 0;

    cumulativeInterest = roundCents(cumulativeInterest + interest);
    totalInterest = cumulativeInterest;
    totalExtra = roundCents(totalExtra + extra);

    schedule.push({
      month,
      year: Math.ceil(month / 12),
      scheduledPayment: roundCents(interest + principalPortion),
      principal: principalPortion,
      interest,
      extra,
      balance,
      cumulativeInterest,
    });
  }

  const totalPrincipal = roundCents(
    sum(schedule.map((row) => row.principal)) + totalExtra,
  );
  const totalPaid = roundCents(totalPrincipal + totalInterest);
  const monthlyPiti = roundCents(
    scheduledPayment +
      input.propertyTaxAnnual / 12 +
      input.homeownersInsuranceAnnual / 12 +
      input.hoaMonthly,
  );
  const yearsHeld = month / 12;
  const totalHousingCost = roundCents(
    totalPaid +
      input.propertyTaxAnnual * yearsHeld +
      input.homeownersInsuranceAnnual * yearsHeld +
      input.hoaMonthly * month,
  );

  return {
    originalPrincipal: roundCents(input.principal),
    monthlyPrincipalAndInterest: roundCents(scheduledPayment),
    monthlyPiti,
    numberOfPayments: month,
    payoffMonths: month,
    /*
     * The first payment is made in the start month, so a loan that is paid
     * off in the first month is paid off in the start month itself. The
     * number of months between the two is one less than the number of
     * payments made.
     */
    payoffDate: month > 0 ? addMonths(input.startDate, month - 1) : input.startDate,
    totalInterest,
    totalPrincipal,
    totalExtraPayments: totalExtra,
    totalPaid,
    totalHousingCost,
    schedule,
    yearly: buildYearlySummary(schedule),
  };
}

function buildYearlySummary(schedule: AmortizationRow[]): YearlySummaryRow[] {
  const rows: YearlySummaryRow[] = [];
  for (const row of schedule) {
    const index = row.year - 1;
    if (!rows[index]) {
      rows[index] = {
        year: row.year,
        payments: 0,
        principalPaid: 0,
        interestPaid: 0,
        extraPaid: 0,
        yearEndBalance: 0,
        cumulativeInterest: 0,
      };
    }
    const summary = rows[index];
    summary.payments = roundCents(summary.payments + row.scheduledPayment + row.extra);
    summary.principalPaid = roundCents(summary.principalPaid + row.principal);
    summary.interestPaid = roundCents(summary.interestPaid + row.interest);
    summary.extraPaid = roundCents(summary.extraPaid + row.extra);
    summary.yearEndBalance = row.balance;
    summary.cumulativeInterest = row.cumulativeInterest;
  }
  return rows;
}

/** Remaining loan balance after a number of payments, 0 once it is paid off. */
export function balanceAfterMonths(result: MortgageResult, months: number): number {
  if (months <= 0) return result.originalPrincipal;
  if (months >= result.numberOfPayments) return 0;
  const row = result.schedule[months - 1];
  return row ? row.balance : 0;
}

/** Percentage of the original loan still outstanding after a number of months. */
export function percentPaid(result: MortgageResult, months: number): number {
  if (result.originalPrincipal <= 0) return 0;
  const paid = result.originalPrincipal - balanceAfterMonths(result, months);
  return roundTo((paid / result.originalPrincipal) * 100, 2);
}
