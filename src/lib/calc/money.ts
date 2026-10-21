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

/**
 * Format a number as US dollars, e.g. 1234.5 -> "$1,234.50".
 *
 * The format is the same in every language on purpose. The site calculates
 * in US dollars for a US mortgage, and a reader in Russian or Spanish reads
 * "$2,275.44" as the same figure the lender quotes. Writing it as
 * "2 275,44 $" would change the decimal separator and the grouping, and a
 * financial number that reads differently on two pages of the same site is
 * a number nobody can check.
 */
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

/**
 * Format a date as a month and a year, e.g. "March 2041".
 *
 * A date follows the language of the page it is on. "October 2056" on a
 * Russian page is a bug, not a neutral label, so the locale is a parameter
 * rather than a constant.
 */
export function formatMonthYear(date: Date, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(date);
}

/** Format a date as a month and a year from a month offset, used for payoff dates. */
export function formatMonthYearFrom(start: Date, months: number, locale = 'en-US'): string {
  return formatMonthYear(addMonths(start, months), locale);
}
