/**
 * Finding the state the request came from.
 *
 * The site is served from a network that knows where a request came from, and
 * two of the calculators use that: the state income tax rate and the average
 * property tax rate of the state the reader is in. The page asks this site's
 * own endpoint for it, and the endpoint answers from the edge.
 *
 * Everything about this is a convenience:
 *
 *   - the answer is a default the reader can change, and the page says so
 *   - the answer is approximate: a virtual private network, a corporate proxy
 *     or a mobile network can point it at the wrong state
 *   - nothing is stored, nothing is written to a cookie, and nothing is sent
 *     to the advertising or the analytics providers
 *
 * So a failure is not an error worth showing. The page simply carries on with
 * the rate the reader types, which is what it carried before this existed.
 */

import { stateName } from '../calc/stateTax.ts';

/** The state the request came from. */
export interface DetectedState {
  /** The two-letter code, as the edge reports it. */
  readonly code: string;
  /** The name of the state. */
  readonly name: string;
}

/** Where the page asks for the state. */
const ENDPOINT = '/api/region';

/** How long the page waits for the answer before it gives up. */
const TIMEOUT_MS = 2500;

/**
 * Ask the site which state the request came from.
 *
 * Returns null when the request cannot be placed, when the reader is not in
 * the United States, when the network cannot tell, and when the answer takes
 * too long to arrive. Every one of those is the same to the page: the field
 * keeps the value it had.
 */
export async function detectState(): Promise<DetectedState | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(ENDPOINT, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
      credentials: 'omit',
      cache: 'no-store',
    });
    if (!response.ok) return null;

    const body = (await response.json()) as { stateCode?: unknown };
    const code = typeof body.stateCode === 'string' ? body.stateCode : null;
    if (!code) return null;

    /*
     * The name comes from the table that ships with the page rather than
     * from the answer, so the page needs no second request to turn a code
     * into a name, and a name that comes from the site cannot be wrong.
     */
    const name = stateName(code);
    if (!name) return null;

    return { code, name };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
