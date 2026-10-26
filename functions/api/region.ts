/**
 * The region endpoint.
 *
 * Two of the calculators take a state rate as an input, and the state can be
 * worked out before the reader types anything: the network this site is
 * served from knows where a request came from. This function is where that
 * knowledge is read, and it is read in one place, at the edge, rather than in
 * the page.
 *
 * What comes out of here:
 *
 *   - the two-letter code of a US state, or nothing
 *   - the country the request came from, for the record
 *
 * What does not come out of here:
 *
 *   - the address of the request. It is read by the network to place the
 *     request and it is not passed on, logged by this function or kept.
 *   - a name, a city or a precise location. The state is the level of detail
 *     the calculators need.
 *
 * The state is approximate. A virtual private network, a corporate proxy or a
 * mobile network can point it at the wrong state, so the page treats what
 * comes back as a default the reader can change rather than as a fact about
 * the reader.
 *
 * The answer is never cached: it describes the request, not the resource.
 */

interface CfContext {
  /** The two-letter country code of the request. */
  country?: string;
  /** The region, in the long form Cloudflare uses. */
  region?: string;
  /** The two-letter region code, for a US state. */
  regionCode?: string;
}

interface RequestWithCloudflare extends Request {
  cf?: CfContext;
}

/** The country whose regions are the states these calculators model. */
const UNITED_STATES = 'US';

function json(status: number, body: unknown): Response {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

/**
 * The region of a request.
 *
 * Only a US state is reported. Elsewhere in the world Cloudflare reports
 * provinces, states and other first-level divisions, and none of them is a
 * figure these calculators have a rate for.
 */
export const onRequestGet = async (context: { request: Request }): Promise<Response> => {
  const cf = (context.request as RequestWithCloudflare).cf;
  const country = typeof cf?.country === 'string' ? cf.country.toUpperCase() : null;
  const regionCode =
    typeof cf?.regionCode === 'string' ? cf.regionCode.trim().toUpperCase() : null;

  const stateCode = country === UNITED_STATES && regionCode ? regionCode : null;

  return json(200, { country, stateCode });
};

/** Every other method is refused. */
export const onRequest = async (): Promise<Response> => {
  return json(405, { error: 'method' });
};
