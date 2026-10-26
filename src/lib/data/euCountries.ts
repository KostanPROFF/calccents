/**
 * The member states of the European Union.
 *
 * Cloudflare's dashboard can be told not to count visitors from the
 * European Union, but that setting only covers the beacon the edge adds to
 * every page it serves. This site loads the beacon itself, after the reader
 * has answered the cookie question, so the country is asked for and the
 * beacon is left out for a reader in the EU.
 *
 * The codes are the two-letter ones the network reports, upper case.
 *
 * The list is the twenty-seven member states. The United Kingdom is not one
 * of them and is not in here.
 */
export const EU_COUNTRIES: readonly string[] = [
  'AT',
  'BE',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SK',
  'SI',
  'ES',
  'SE',
];

/** Whether a country code is one of the member states of the European Union. */
export function isEuCountry(code: string | null | undefined): boolean {
  if (!code) {
    return false;
  }
  return EU_COUNTRIES.includes(code.trim().toUpperCase());
}
