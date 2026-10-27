/**
 * The contact mailer.
 *
 * The contact form on calccents.com posts to a Pages Function, which calls
 * this worker over a service binding, which sends the message through
 * Cloudflare's own email service. Three things follow from that arrangement,
 * and they are the reason it is built this way.
 *
 * The worker holds no credential. The `send_email` binding is authorised by
 * the account itself, so there is no API token in this code, none in the
 * Pages project, and nothing to leak or rotate.
 *
 * The binding is restricted twice over. The destination is pinned to the
 * address that reads the mail and the sender is pinned to the address on
 * this domain, so the worker cannot be used to send mail anywhere else,
 * even if somebody finds a way to make it run.
 *
 * The message is not trusted. It arrives as JSON from the public internet,
 * so every field is length-checked, the email address is pattern-checked,
 * and the text that goes into the mail body is stripped of anything that
 * could turn into markup in a mail client.
 */

import { isTrapFilled, validate, type RawSubmission } from './validate.ts';

/** The address that reads the mail. */
const TO = 'info@constantinecs.com';

/** The address the mail appears to come from. */
const FROM = 'hello@calccents.com';

/**
 * The addresses the site is served from.
 *
 * The check is an exact match rather than a prefix. A prefix would let
 * "https://www.calccents.com.attacker.example" through, and that address
 * belongs to somebody else.
 */
const ORIGINS = new Set(['https://calccents.com', 'https://www.calccents.com']);

interface Env {
  EMAIL: {
    send(message: {
      to: string;
      from: string;
      subject: string;
      text: string;
      replyTo?: string;
    }): Promise<unknown>;
  };
}

function fail(status: number, reason: string): Response {
  return Response.json({ ok: false, error: reason }, { status });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'POST') {
      return fail(405, 'method');
    }

    /*
     * The form is served from the site itself, so a request from anywhere
     * else is not the form. A browser sends this header on a cross-origin
     * POST, so its absence means a script that is not pretending to be a
     * visitor's browser.
     */
    const origin = request.headers.get('Origin');
    if (origin && !ORIGINS.has(origin)) {
      return fail(403, 'origin');
    }

    let parsed: unknown;
    try {
      parsed = await request.json();
    } catch {
      return fail(400, 'body');
    }
    /*
     * A body of null, or a number, or a list, is not a submission. Reading
     * a field out of it would throw, and a thrown error is an answer the
     * caller cannot do anything with.
     */
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return fail(400, 'body');
    }
    const body = parsed as RawSubmission;

    /* A robot fills the field it cannot see. A person leaves it empty. */
    if (isTrapFilled(body)) {
      /* Answer as though it worked. A robot learns nothing from this. */
      return Response.json({ ok: true });
    }

    const checked = validate(body);
    if (!checked.ok) {
      return fail(422, checked.reason);
    }
    const { name, email, subject, message } = checked.submission;

    const bodyText = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Page: ${request.headers.get('Referer') ?? 'unknown'}`,
      '',
      message,
    ].join('\n');

    try {
      await env.EMAIL.send({
        to: TO,
        from: FROM,
        subject: `[Calccents] ${subject}`,
        text: bodyText,
        /* A reply goes to the person who wrote, not to the site. */
        replyTo: email,
      });
    } catch (error) {
      console.error('send failed', error);
      return fail(502, 'send');
    }

    return Response.json({ ok: true });
  },
};
