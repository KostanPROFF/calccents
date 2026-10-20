/**
 * Money helpers shared by every calculator.
 *
 * Everything here is a pure function: no DOM, no globals, no dates read
 * from the system clock. That keeps the calculation engine testable and
 * lets the same functions run in the browser and in unit tests.
 */

/**
 * Round to a fixed number of decimals.
 *
 * Rounds halves away from zero and compensates for binary floating point
 * error, so 1.005 rounds to 1.01 rather than 1.00.
 */
export function roundTo(value: number, decimals: number): number {
  if (!Number.isFinite(value)) return value;
  const factor = 10 ** decimals;
  const scaled = Math.abs(value) * factor;
  const corrected = Math.round(Number(scaled.toPrecision(15)));
  const result = corrected / factor;
  return value < 0 ? -result : result;
}

/** Round to whole cents. */
export function roundCents(value: number): number {
  return roundTo(value, 2);
}

export function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

export function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

/** Format a number as US dollars, e.g. 1234.5 -> "$1,234.50". */
export function formatCurrency(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Format a number as a percentage, e.g. 6.5 -> "6.50%". */
export function formatPercent(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return '—';
  return `${value.toFixed(decimals)}%`;
}

/** Format a number with thousands separators, e.g. 1234567 -> "1,234,567". */
export function formatNumber(value: number, decimals = 0): string {
  if (!Number.isFinite(value)) return '—';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Add whole months to a date, clamping the day to the length of the
 * resulting month (Jan 31 + 1 month -> Feb 28, not Mar 3).
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date.getTime());
  const day = result.getDate();
  result.setDate(1);
  result.setMonth(result.getMonth() + months);
  const lastDayOfMonth = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
  result.setDate(Math.min(day, lastDayOfMonth));
  return result;
}

/** Format a date as "March 2041". */
export function formatMonthYear(date: Date): string {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
}

/** Format a date as "March 2041" from a month offset, used for payoff dates. */
export function formatMonthYearFrom(start: Date, months: number): string {
  return formatMonthYear(addMonths(start, months));
}
