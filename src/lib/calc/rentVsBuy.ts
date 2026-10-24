/**
 * Renting versus owning.
 *
 * The comparison is arithmetic only. It reports two cash-flow series, the
 * equity that builds up, and the month where the net cost of owning drops
 * below the cash cost of renting. It never states which option is better.
 *
 * Two things about the owning side are easy to get wrong and are handled
 * here explicitly:
 *
 *   - the mortgage payment stops when the loan is paid off, while tax,
 *     insurance, HOA and maintenance carry on for as long as the home is
 *     owned
 *   - selling costs are charged on the price of the home at the moment of
 *     the sale, so they reduce the equity that the comparison counts
 */

import { roundCents, roundTo } from './money.ts';
import { balanceAfterMonths, buildAmortization, type MortgageResult } from './mortgage.ts';

export interface RentVsBuyInput {
  /** Purchase price of the home, in dollars. */
  homePrice: number;
  /** Down payment as a percentage of the purchase price. */
  downPaymentPercent: number;
  /** Nominal annual mortgage rate, in percent. */
  mortgageRatePercent: number;
  /** Mortgage term, in years. */
  mortgageTermYears: number;
  /** Monthly rent, in dollars. */
  monthlyRent: number;
  /** Annual property tax as a percentage of the home price. */
  annualPropertyTaxPercent: number;
  /** Annual homeowner's insurance, in dollars. */
  annualInsurance: number;
  /** Monthly HOA or condo fee, in dollars. */
  monthlyHoa: number;
  /** Annual upkeep as a percentage of the home price. */
  annualMaintenancePercent: number;
  /** Annual change in home value, in percent. Negative values are allowed. */
  annualAppreciationPercent: number;
  /** Selling costs as a percentage of the final price, paid only on sale. */
  sellingCostPercent: number;
  /** Closing costs as a percentage of the purchase price, paid once. */
  closingCostPercent: number;
  /** Monthly renter's insurance, in dollars. */
  rentersInsuranceMonthly: number;
  /** How many years to compare, in years. */
  horizonYears: number;
  /** Month the comparison starts. */
  startDate: Date;
}

export interface RentVsBuyYearRow {
  year: number;
  cumulativeRent: number;
  cumulativeOwnership: number;
  homeValue: number;
  remainingBalance: number;
  equity: number;
  /**
   * Cash paid towards the home, minus the equity that would reach you if
   * you sold at that point, after the selling costs of that sale.
   */
  netOwnershipCost: number;
}

export interface RentVsBuyResult {
  downPayment: number;
  closingCosts: number;
  upfrontCost: number;
  loanAmount: number;
  monthlyPrincipalAndInterest: number;
  /** Monthly ownership cost while the loan is running. */
  monthlyOwnership: number;
  /**
   * Monthly ownership cost once the loan is paid off: property tax,
   * insurance, HOA and maintenance, which do not stop with the loan.
   */
  monthlyOwnershipAfterPayoff: number;
  monthlyRentTotal: number;
  monthlyDifference: number;
  totalRentOverHorizon: number;
  ownershipCashOutOverHorizon: number;
  homeValueAtHorizon: number;
  equityAtHorizon: number;
  /** Equity at the horizon after the selling costs of that sale. */
  netEquityAtHorizon: number;
  netOwnershipCostAtHorizon: number;
  sellingCostsAtHorizon: number;
  /**
   * First month where the net cost of owning (cash paid minus the equity a
   * sale would leave you) is lower than the cash cost of renting over the
   * same period.
   * `null` when the two paths never cross inside the horizon.
   */
  breakEvenMonth: number | null;
  breakEvenDate: Date | null;
  yearly: RentVsBuyYearRow[];
}

function assertNonNegative(value: number, label: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${label} must be a finite number of zero or more`);
  }
}

export function compareRentAndBuy(input: RentVsBuyInput): RentVsBuyResult {
  assertNonNegative(input.homePrice, 'Home price');
  assertNonNegative(input.downPaymentPercent, 'Down payment');
  assertNonNegative(input.mortgageRatePercent, 'Mortgage rate');
  assertNonNegative(input.mortgageTermYears, 'Mortgage term');
  assertNonNegative(input.monthlyRent, 'Monthly rent');
  assertNonNegative(input.annualPropertyTaxPercent, 'Property tax rate');
  assertNonNegative(input.annualInsurance, 'Annual insurance');
  assertNonNegative(input.monthlyHoa, 'Monthly HOA');
  assertNonNegative(input.annualMaintenancePercent, 'Maintenance rate');
  assertNonNegative(input.sellingCostPercent, 'Selling cost rate');
  assertNonNegative(input.closingCostPercent, 'Closing cost rate');
  assertNonNegative(input.rentersInsuranceMonthly, 'Renters insurance');
  assertNonNegative(input.horizonYears, 'Comparison horizon');
  if (!Number.isFinite(input.annualAppreciationPercent) || input.annualAppreciationPercent <= -100) {
    throw new Error('Appreciation must be a finite number above -100');
  }
  if (!(input.startDate instanceof Date) || Number.isNaN(input.startDate.getTime())) {
    throw new Error('Start date must be a valid date');
  }
  if (input.homePrice === 0) {
    throw new Error('Home price must be greater than zero');
  }
  if (input.horizonYears <= 0) {
    throw new Error('Comparison horizon must be at least one year');
  }

  const downPayment = roundCents(
    input.homePrice * Math.min(input.downPaymentPercent, 100) / 100,
  );
  const closingCosts = roundCents(input.homePrice * input.closingCostPercent / 100);
  const loanAmount = roundCents(input.homePrice - downPayment);
  const upfrontCost = roundCents(downPayment + closingCosts);

  const mortgage: MortgageResult = buildAmortization({
    principal: loanAmount,
    annualRatePercent: input.mortgageRatePercent,
    termYears: input.mortgageTermYears,
    propertyTaxAnnual: 0,
    homeownersInsuranceAnnual: 0,
    hoaMonthly: 0,
    extraMonthlyPayment: 0,
    startDate: input.startDate,
  });

  const monthlyPropertyTax = input.homePrice * input.annualPropertyTaxPercent / 100 / 12;
  const monthlyInsurance = input.annualInsurance / 12;
  const monthlyMaintenance = input.homePrice * input.annualMaintenancePercent / 100 / 12;
  /*
   * The costs of owning that do not depend on the loan. They run for as
   * long as the home is owned, which is why they are kept apart from the
   * principal and interest of a loan that ends.
   */
  const monthlyOwnershipWithoutLoan = roundCents(
    monthlyPropertyTax +
      monthlyInsurance +
      input.monthlyHoa +
      monthlyMaintenance,
  );
  const monthlyOwnership = roundCents(
    mortgage.monthlyPrincipalAndInterest + monthlyOwnershipWithoutLoan,
  );
  const monthlyRentTotal = roundCents(input.monthlyRent + input.rentersInsuranceMonthly);

  const horizonMonths = Math.round(input.horizonYears * 12);
  const appreciationAnnual = 1 + input.annualAppreciationPercent / 100;

  let cumulativeRent = 0;
  let cumulativeOwnership = 0;
  let breakEvenMonth: number | null = null;
  const monthly: {
    month: number;
    cumulativeRent: number;
    cumulativeOwnership: number;
    homeValue: number;
    remainingBalance: number;
    equity: number;
    netOwnershipCost: number;
  }[] = [];

  for (let month = 1; month <= horizonMonths; month += 1) {
    /*
     * The loan is paid off at the end of its term, and a loan that has
     * been paid off takes no more payments. The other costs of owning —
     * tax, insurance, HOA and maintenance — carry on, because the home is
     * still there after the last payment.
     */
    const loanPayment =
      month <= mortgage.numberOfPayments
        ? (mortgage.schedule[month - 1]?.scheduledPayment ?? 0)
        : 0;
    const ownershipThisMonth = roundCents(loanPayment + monthlyOwnershipWithoutLoan);

    cumulativeRent = roundCents(cumulativeRent + monthlyRentTotal);
    cumulativeOwnership = roundCents(cumulativeOwnership + ownershipThisMonth);
    if (month === 1) {
      cumulativeOwnership = roundCents(cumulativeOwnership + upfrontCost);
    }

    const homeValue = roundCents(
      input.homePrice * appreciationAnnual ** (month / 12),
    );
    const remainingBalance = balanceAfterMonths(mortgage, month);
    const equity = roundCents(homeValue - remainingBalance);
    /*
     * Selling costs are charged on the price of the home at the moment of
     * the sale, so they belong to the month the home is sold in. They are
     * not spread across the months before it: they reduce the equity that
     * a sale would actually leave you, which is what the comparison
     * measures.
     */
    const sellingCosts = roundCents(homeValue * input.sellingCostPercent / 100);
    const netOwnershipCost = roundCents(cumulativeOwnership - equity + sellingCosts);

    monthly.push({
      month,
      cumulativeRent,
      cumulativeOwnership,
      homeValue,
      remainingBalance,
      equity,
      netOwnershipCost,
    });

    if (breakEvenMonth === null && netOwnershipCost <= cumulativeRent) {
      breakEvenMonth = month;
    }
  }

  const last = monthly[monthly.length - 1];
  const homeValueAtHorizon = last ? last.homeValue : input.homePrice;
  const equityAtHorizon = last ? last.equity : 0;
  const netOwnershipCostAtHorizon = last ? last.netOwnershipCost : 0;
  const sellingCostsAtHorizon = roundCents(
    homeValueAtHorizon * input.sellingCostPercent / 100,
  );
  const netEquityAtHorizon = roundCents(equityAtHorizon - sellingCostsAtHorizon);

  const yearly: RentVsBuyYearRow[] = [];
  for (const row of monthly) {
    if (row.month % 12 !== 0 && row.month !== horizonMonths) continue;
    yearly.push({
      year: Math.ceil(row.month / 12),
      cumulativeRent: row.cumulativeRent,
      cumulativeOwnership: row.cumulativeOwnership,
      homeValue: row.homeValue,
      remainingBalance: row.remainingBalance,
      equity: row.equity,
      netOwnershipCost: row.netOwnershipCost,
    });
  }

  return {
    downPayment,
    closingCosts,
    upfrontCost,
    loanAmount,
    monthlyPrincipalAndInterest: mortgage.monthlyPrincipalAndInterest,
    monthlyOwnership,
    monthlyOwnershipAfterPayoff: monthlyOwnershipWithoutLoan,
    monthlyRentTotal,
    monthlyDifference: roundCents(monthlyOwnership - monthlyRentTotal),
    totalRentOverHorizon: last ? last.cumulativeRent : 0,
    ownershipCashOutOverHorizon: last ? last.cumulativeOwnership : 0,
    homeValueAtHorizon,
    equityAtHorizon,
    netEquityAtHorizon,
    netOwnershipCostAtHorizon,
    sellingCostsAtHorizon,
    breakEvenMonth,
    breakEvenDate:
      breakEvenMonth === null
        ? null
        : new Date(
            input.startDate.getFullYear(),
            input.startDate.getMonth() + breakEvenMonth,
            1,
          ),
    yearly,
  };
}

/** Realized return on a home over the comparison horizon, in percent. */
export function realizedHomeReturn(result: RentVsBuyResult, cashInvested: number): number {
  if (cashInvested <= 0) return 0;
  return roundTo(((result.equityAtHorizon - cashInvested) / cashInvested) * 100, 2);
}
