/**
 * Paying off several debts at once.
 *
 * The arithmetic is a month-by-month simulation, and the model is stated
 * plainly because a reader who is comparing two strategies has to know
 * what the comparison is between:
 *
 *   - interest accrues on the balance at the start of each month
 *   - payments go to interest first, then to principal
 *   - every debt gets its minimum payment while it still has a balance
 *   - whatever is left over, including the minimums of debts that have
 *     been paid off, goes to the debt the reader picked
 *
 * Two orders are compared. Avalanche pays the highest interest rate
 * first, which is the cheapest order in dollars. Snowball pays the
 * smallest balance first, which is the order that clears a debt soonest
 * and the one a reader is more likely to keep to.
 */

import { roundCents } from './money.ts';

export interface Debt {
  /** A stable key for the row in the interface. */
  id: string;
  name: string;
  balance: number;
  /** The annual interest rate, as a percentage. */
  aprPercent: number;
  /** The minimum monthly payment. */
  minimumPayment: number;
}

/** Which debt the extra money goes to first. */
export type PayoffOrder = 'avalanche' | 'snowball';

export interface PayoffResult {
  order: PayoffOrder;
  /** How many months it takes to clear every debt. */
  months: number;
  totalInterest: number;
  totalPaid: number;
  /**
   * Whether every debt was actually cleared.
   *
   * A balance can fail to fall: when the payments do not cover the interest,
   * the balance grows and the simulation runs to its hard stop without ever
   * clearing the debt. A figure for such a run is not a schedule, it is an
   * artefact of the stop, and the interface has to be able to say so.
   */
  paidOff: boolean;
  /** The month each debt was cleared in, by debt id. */
  payoffMonthById: Record<string, number>;
  /** The month and the balance of every debt at the end of each year. */
  yearlyBalances: { year: number; balances: Record<string, number> }[];
}

/** A hard stop, so a balance that never falls cannot loop forever. */
const MAX_MONTHS = 1_200;

function monthlyRate(debt: Debt): number {
  const apr = Number.isFinite(debt.aprPercent) ? debt.aprPercent : 0;
  return Math.max(0, apr) / 100 / 12;
}

function activeDebts(debts: Debt[]): Debt[] {
  return debts.filter((debt) => debt.balance > 0 && Number.isFinite(debt.balance));
}

/**
 * The order the extra money goes in.
 *
 * Avalanche: the highest rate first. Snowball: the smallest balance
 * first. A tie is broken by the id, so the same input always produces the
 * same schedule.
 */
function orderDebts(debts: Debt[], order: PayoffOrder): Debt[] {
  const sorted = [...debts].sort((a, b) => {
    if (order === 'avalanche') {
      if (b.aprPercent !== a.aprPercent) return b.aprPercent - a.aprPercent;
      return a.id.localeCompare(b.id);
    }
    if (a.balance !== b.balance) return a.balance - b.balance;
    return a.id.localeCompare(b.id);
  });
  return sorted;
}

/**
 * Run one payoff simulation.
 *
 * `extraPayment` is the money above the minimums that the reader can add
 * every month. With zero extra payment this is the "minimums only" case.
 */
export function simulatePayoff(
  debts: Debt[],
  extraPayment: number,
  order: PayoffOrder,
): PayoffResult {
  const balances = new Map<string, number>();
  const minimums = new Map<string, number>();
  for (const debt of debts) {
    balances.set(debt.id, Math.max(0, debt.balance));
    minimums.set(debt.id, Math.max(0, debt.minimumPayment));
  }

  const extra = Number.isFinite(extraPayment) ? Math.max(0, extraPayment) : 0;

  let totalInterest = 0;
  let totalPaid = 0;
  let month = 0;
  let paidOff = false;
  const payoffMonthById: Record<string, number> = {};
  const yearlyBalances: PayoffResult['yearlyBalances'] = [];

  while (month < MAX_MONTHS) {
    const live = activeDebts(debts).filter((debt) => (balances.get(debt.id) ?? 0) > 0);
    if (live.length === 0) {
      paidOff = true;
      break;
    }
    month += 1;

    // Interest for the month, on the balance at the start of the month.
    // It is added to the balance first: that is what a lender does, and
    // skipping that step would make every balance look smaller than it is.
    const interest: Record<string, number> = {};
    for (const debt of live) {
      const amount = roundCents((balances.get(debt.id) ?? 0) * monthlyRate(debt));
      interest[debt.id] = amount;
      totalInterest = roundCents(totalInterest + amount);
      balances.set(debt.id, roundCents((balances.get(debt.id) ?? 0) + amount));
    }

    // The money available this month: every minimum plus the extra.
    let budget =
      live.reduce((total, debt) => total + (minimums.get(debt.id) ?? 0), 0) + extra;

    // Interest first.
    for (const debt of live) {
      const balance = balances.get(debt.id) ?? 0;
      const payment = Math.min(balance, interest[debt.id]);
      balances.set(debt.id, roundCents(balance - payment));
      budget = roundCents(budget - payment);
      totalPaid = roundCents(totalPaid + payment);
    }

    // Then principal, in the order the reader picked.
    for (const debt of orderDebts(live, order)) {
      if (budget <= 0) break;
      const balance = balances.get(debt.id) ?? 0;
      if (balance <= 0) continue;
      const payment = Math.min(balance, budget);
      balances.set(debt.id, roundCents(balance - payment));
      budget = roundCents(budget - payment);
      totalPaid = roundCents(totalPaid + payment);
    }

    for (const debt of live) {
      const balance = balances.get(debt.id) ?? 0;
      if (balance <= 0 && payoffMonthById[debt.id] === undefined) {
        payoffMonthById[debt.id] = month;
      }
    }

    if (month % 12 === 0) {
      const snapshot: Record<string, number> = {};
      for (const debt of debts) snapshot[debt.id] = balances.get(debt.id) ?? 0;
      yearlyBalances.push({ year: month / 12, balances: snapshot });
    }
  }

  return {
    order,
    months: month,
    totalInterest,
    totalPaid,
    paidOff,
    payoffMonthById,
    yearlyBalances,
  };
}

export interface PayoffComparison {
  minimumOnly: PayoffResult;
  avalanche: PayoffResult;
  snowball: PayoffResult;
  /**
   * Interest the avalanche order saves against paying the minimums only.
   *
   * Null when the minimums never clear the debts on their own: the balance
   * grows, the baseline never finishes, and there is no finished schedule
   * to save interest against. The figure would be an artefact of the hard
   * stop rather than a number about the reader's debts.
   */
  interestSavedAvalanche: number | null;
  /** Interest the snowball order saves against paying the minimums only. */
  interestSavedSnowball: number | null;
  /** The debt each order clears first. */
  firstDebtAvalanche: string | null;
  firstDebtSnowball: string | null;
}

/**
 * Compare the three ways of paying the debts off.
 *
 * The comparison is the point of the tool: the same extra payment clears
 * the debts in a different order and costs a different number of dollars.
 */
export function comparePayoff(debts: Debt[], extraPayment: number): PayoffComparison {
  const minimumOnly = simulatePayoff(debts, 0, 'avalanche');
  const avalanche = simulatePayoff(debts, extraPayment, 'avalanche');
  const snowball = simulatePayoff(debts, extraPayment, 'snowball');

  const firstDebt = (result: PayoffResult): string | null => {
    const entries = Object.entries(result.payoffMonthById);
    if (entries.length === 0) return null;
    entries.sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0]));
    return entries[0][0];
  };

  const saved = (result: PayoffResult): number | null => {
    if (!minimumOnly.paidOff) return null;
    return roundCents(minimumOnly.totalInterest - result.totalInterest);
  };

  return {
    minimumOnly,
    avalanche,
    snowball,
    interestSavedAvalanche: saved(avalanche),
    interestSavedSnowball: saved(snowball),
    firstDebtAvalanche: firstDebt(avalanche),
    firstDebtSnowball: firstDebt(snowball),
  };
}
