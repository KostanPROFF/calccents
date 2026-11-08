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

/**
 * The countries where a reader has to agree before cookies are used.
 *
 * These are the countries Google's consent message is shown in: the
 * European Economic Area (the twenty-seven member states plus Iceland,
 * Liechtenstein and Norway), the United Kingdom and Switzerland. Google
 * Analytics starts with storage denied in exactly these countries and waits
 * for the answer to that message; everywhere else it starts with storage
 * granted.
 */
export const CONSENT_COUNTRIES: readonly string[] = [
  ...EU_COUNTRIES,
  'IS',
  'LI',
  'NO',
  'GB',
  'CH',
];
