/**
 * Thin helpers the page scripts use to talk to the DOM.
 *
 * Kept separate from `src/lib/calc` so the calculation engine stays free of
 * any browser dependency and can be unit tested in Node.
 */

/** Write text into an element by id, if that element exists. */
export function setText(id: string, value: string): void {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

/** Read a numeric input, ignoring any formatting the user typed. */
export function numberValue(id: string, fallback = 0): number {
  const element = document.getElementById(id) as HTMLInputElement | null;
  if (!element) return fallback;
  const parsed = Number.parseFloat(element.value.replace(/[^0-9.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : fallback;
}

/** Read a `type="month"` input as a date on the first day of that month. */
export function monthValue(id: string, fallback: Date): Date {
  const element = document.getElementById(id) as HTMLInputElement | null;
  if (!element || !element.value) return fallback;
  const parsed = new Date(`${element.value}-01T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

/** Current month as a `type="month"` input value. */
export function currentMonthValue(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${now.getFullYear()}-${month}`;
}
