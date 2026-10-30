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

/**
 * Read a number out of text a person typed.
 *
 * A reader may type a currency sign, a thousand separator, a minus sign or
 * scientific notation, so the text is cleaned before it is read. What is
 * left has to look like a number before it is parsed, because otherwise
 * "1e4" loses its exponent and reads as fourteen, and "1,2,3" reads as
 * twelve. Anything that is not a number comes back as NaN, and the caller
 * decides what to do with that.
 */
export function parseNumber(text: string): number {
  const cleaned = text.trim().replace(/[^0-9.eE+-]/g, '');
  const shaped = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(cleaned);
  if (!shaped) return Number.NaN;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

/** Read a numeric input, ignoring any formatting the user typed. */
export function numberValue(id: string, fallback = 0): number {
  const element = document.getElementById(id) as HTMLInputElement | null;
  if (!element) return fallback;
  const parsed = parseNumber(element.value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/** Read the selected value of a `<select>`. */
export function selectValue(id: string, fallback = ''): string {
  const element = document.getElementById(id) as HTMLSelectElement | null;
  return element ? element.value : fallback;
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

/**
 * Fill a table body with rows of text, one array of cells per row.
 *
 * Every cell carries the name of its column in `data-label`, read from the
 * table's own header. On a narrow screen the stylesheet drops the header
 * and stacks each row into a card, and the label is what tells the reader
 * which figure is which.
 */
export function fillTableBody(body: HTMLElement, rows: readonly (readonly string[])[]): void {
  const headers = body.closest('table')?.querySelectorAll('thead th') ?? [];
  const labels = Array.from(headers, (header) => header.textContent?.trim() ?? '');
  const fragment = document.createDocumentFragment();
  for (const cells of rows) {
    const row = document.createElement('tr');
    cells.forEach((text, index) => {
      const cell = document.createElement('td');
      cell.textContent = text;
      if (labels[index]) cell.dataset.label = labels[index];
      row.append(cell);
    });
    fragment.append(row);
  }
  body.replaceChildren(fragment);
}
