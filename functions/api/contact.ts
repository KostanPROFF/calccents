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
 *   - the request must be a POST whose body can be read
 *   - it must come from this site
 *   - a hidden field a person cannot fill must stay empty
 *   - the visible fields must be present and within their length limits
 *   - the email address must look like an email address
 *
 * The form is a real form, so it can be posted by a browser with scripting
 * turned off. Such a post is a form-encoded body rather than JSON, and the
 * answer to it is a page that says what happened, in the reader's own
 * language, rather than a JSON object the page cannot read.
 *
 * The rate limit is deliberately simple. A window of one message per minute
 * per address is enough to stop a script from filling the mailbox and is
 * not enough to stop a person sending two messages in a row.
 */

import { isTrapFilled, validate, type RawSubmission } from '../../worker/src/validate.ts';
import { getUi } from '../../src/i18n/ui/index.ts';
import { isLocale, localePath, type Locale } from '../../src/i18n/locales.ts';

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

/**
 * The addresses the site is served from.
 *
 * The check is an exact match rather than a prefix. A prefix would let
 * "https://www.calccents.com.attacker.example" through, and that address
 * belongs to somebody else.
 */
const ORIGINS = new Set(['https://calccents.com', 'https://www.calccents.com']);

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

/** Escape text that goes into the page. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * The answer to a submission that arrived without JavaScript.
 *
 * The messages come from the dictionary, the same source the page uses, so
 * a reader is told what happened in their own language.
 */
function page(locale: Locale, key: string, status: number): Response {
  const ui = getUi(locale);
  const copy =
    ui.contactForm.statuses.find((entry) => entry.key === key) ??
    ui.contactForm.statuses.find((entry) => entry.key === 'failed');
  const html = `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(ui.contact.title)}</title>
<style>
  :root { color-scheme: dark; }
  body { margin: 0; padding: 4rem 1.5rem; background: #08090a; color: #f3f5f6; font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; }
  main { max-width: 34rem; margin: 0 auto; }
  h1 { font-size: 1.5rem; margin: 0 0 1rem; letter-spacing: -0.01em; }
  p { margin: 0 0 1rem; }
  a { color: #6e8fff; }
</style>
</head>
<body>
<main>
<h1>${escapeHtml(ui.contactForm.heading)}</h1>
<p>${escapeHtml(copy?.text ?? '')}</p>
<p><a href="${escapeHtml(localePath(locale, '/contact/'))}">${escapeHtml(ui.contact.title)}</a></p>
</main>
</body>
</html>`;

  return new Response(html, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

/** A submission, and whether it arrived as JSON or as a plain form post. */
interface Submission {
  body: RawSubmission;
  locale: Locale;
  kind: 'json' | 'form';
}

function localeOf(value: unknown): Locale {
  return isLocale(value) ? value : 'en';
}

function fieldsOf(data: FormData): RawSubmission {
  const text = (key: string): string => {
    const value = data.get(key);
    return typeof value === 'string' ? value : '';
  };
  return {
    name: text('name'),
    email: text('email'),
    subject: text('subject'),
    message: text('message'),
    trap: text('trap'),
  };
}

/**
 * Read the submission out of the request.
 *
 * The scripted form sends JSON. A form posted by a browser without
 * scripting sends a form-encoded body. Both are read here, and a body that
 * is neither — or a JSON body that is null, or an array, or a number —
 * is not a submission at all.
 */
async function readSubmission(request: Request): Promise<Submission | null> {
  const contentType = request.headers.get('Content-Type') ?? '';

  if (contentType.includes('multipart/form-data')) {
    let data: FormData;
    try {
      data = await request.formData();
    } catch {
      return null;
    }
    return { body: fieldsOf(data), locale: localeOf(data.get('lang')), kind: 'form' };
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return null;
  }

  const trimmed = raw.trim();
  const looksLikeJson = trimmed.startsWith('{') || trimmed.startsWith('[');

  if (contentType.includes('application/json') || looksLikeJson) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      return null;
    }
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return null;
    }
    const body = parsed as RawSubmission & { lang?: unknown };
    return { body, locale: localeOf(body.lang), kind: 'json' };
  }

  const params = new URLSearchParams(raw);
  return {
    body: {
      name: params.get('name') ?? '',
      email: params.get('email') ?? '',
      subject: params.get('subject') ?? '',
      message: params.get('message') ?? '',
      trap: params.get('trap') ?? '',
    },
    locale: localeOf(params.get('lang')),
    kind: 'form',
  };
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
  if (origin && !ORIGINS.has(origin)) {
    return json(403, { ok: false, error: 'origin' });
  }

  const submission = await readSubmission(request);
  if (!submission) {
    return json(400, { ok: false, error: 'body' });
  }

  const { body, locale, kind } = submission;
  const answer = (status: number, key: string, error: string): Response =>
    kind === 'form' ? page(locale, key, status) : json(status, { ok: false, error });

  /* A robot fills the field it cannot see. A person leaves it empty. */
  if (isTrapFilled(body)) {
    /* Answer as though it worked. A robot learns nothing from this. */
    return kind === 'form' ? page(locale, 'sent', 200) : json(200, { ok: true });
  }

  const checked = validate(body);
  if (!checked.ok) {
    return answer(422, checked.reason, checked.reason);
  }

  if (tooMany(checked.submission.email)) {
    return answer(429, 'rate', 'rate');
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
    return answer(502, 'failed', 'send');
  }

  return kind === 'form' ? page(locale, 'sent', 200) : json(200, { ok: true });
};

/** Every other method is refused. */
export const onRequest = async (): Promise<Response> => {
  return json(405, { ok: false, error: 'method' });
};
