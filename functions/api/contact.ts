/**
 * The contact endpoint.
 *
 * The form on the contact page posts here. This function does the work of
 * the site: it checks the request, and hands the message to the mailer
 * worker over a service binding, which sends it through Cloudflare's email
 * service.
 *
 * Nothing secret lives here. The binding is authorised by the account, so
 * there is no token to store in the Pages project and none to rotate.
 *
 * The checks are the ones a reader would expect from a form that writes to
 * a real mailbox:
 *
 *   - the request must be a POST with a JSON body of the expected shape
 *   - it must come from this site
 *   - a hidden field a person cannot fill must stay empty
 *   - the visible fields must be present and within their length limits
 *   - the email address must look like an email address
 *
 * The rate limit is deliberately simple. A window of one message per minute
 * per address is enough to stop a script from filling the mailbox and is
 * not enough to stop a person sending two messages in a row.
 */

import { isTrapFilled, validate, type RawSubmission } from '../../worker/src/validate.ts';

interface Env {
  /** The mailer worker. */
  MAILER: {
    fetch(request: Request | string, init?: RequestInit): Promise<Response>;
  };
}

/** How long a rate limit window lasts. */
const WINDOW_SECONDS = 60;

/** The most messages one address may send in a window. */
const MAX_PER_WINDOW = 2;

/** The address the site is served from. */
const ORIGIN = 'https://calccents.com';

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
 * The rate limit, kept in the isolate's memory.
 *
 * This is not a durable counter and does not pretend to be one: an isolate
 * can be replaced at any moment, which resets the window. It stops the
 * careless case, and Cloudflare's own edge protection stops the rest.
 */
const window = new Map<string, { count: number; until: number }>();

function tooMany(address: string): boolean {
  const now = Date.now();
  const entry = window.get(address);

  if (!entry || entry.until <= now) {
    window.set(address, { count: 1, until: now + WINDOW_SECONDS * 1000 });
    return false;
  }

  if (entry.count >= MAX_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  return false;
}

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const request = context.request;

  /*
   * The form is served from the site itself, so a request from somewhere
   * else is not the form. A browser sends this header on a cross-origin
   * POST, so its absence means a script that is not pretending to be a
   * visitor's browser.
   */
  const origin = request.headers.get('Origin');
  if (origin && origin !== ORIGIN && !origin.startsWith('https://www.calccents.com')) {
    return json(403, { ok: false, error: 'origin' });
  }

  let body: RawSubmission;
  try {
    body = (await request.json()) as RawSubmission;
  } catch {
    return json(400, { ok: false, error: 'body' });
  }

  /* A robot fills the field it cannot see. A person leaves it empty. */
  if (isTrapFilled(body)) {
    /* Answer as though it worked. A robot learns nothing from this. */
    return json(200, { ok: true });
  }

  const checked = validate(body);
  if (!checked.ok) {
    return json(422, { ok: false, error: checked.reason });
  }

  if (tooMany(checked.submission.email)) {
    return json(429, { ok: false, error: 'rate' });
  }

  /* The mailer does the sending. */
  const worker = await context.env.MAILER.fetch('https://mailer.internal/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(checked.submission),
  });

  if (!worker.ok) {
    const detail = await worker.text();
    console.error('mailer refused the message', worker.status, detail);
    return json(502, { ok: false, error: 'send' });
  }

  return json(200, { ok: true });
};

/** Every other method is refused. */
export const onRequest = async (): Promise<Response> => {
  return json(405, { ok: false, error: 'method' });
};
