/**
 * What a contact submission must look like.
 *
 * The rules live in one place because two places need them: the mailer
 * worker checks them before it sends, and the Pages function that receives
 * the form checks the same things before it forwards the message. The
 * worker is the one that has to be right — it is the last thing between the
 * public internet and a real mailbox — but the function checks first so
 * that a message which cannot be sent is never handed over at all.
 */

/** The longest the subject may be. */
export const MAX_SUBJECT = 120;

/** The longest a message may be. */
export const MAX_MESSAGE = 4000;

/** The longest a name may be. */
export const MAX_NAME = 80;

/** The longest an email address may be. */
export const MAX_EMAIL = 120;

/**
 * A deliberately plain address check. It exists to catch a typo, not to
 * decide whether an address exists, and the mail bounces if it is wrong.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

export interface Submission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface RawSubmission {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  /** A field a person does not see. A filled one means a robot. */
  trap?: unknown;
}

/**
 * Strip the control characters that would break a plain text header or
 * corrupt the body, and remove the two characters that could start markup
 * in a mail client that renders the body as HTML.
 *
 * A line break survives in the body, because a message written in
 * paragraphs is a message a person can read. It does not survive in the
 * fields that end up in a header, which is what singleLine is for.
 */
export function clean(value: string): string {
  return value
    /* A Windows line break becomes a Unix one before anything else looks at
       the text, so the two are not counted as two characters. */
    .replace(/\r\n/g, '\n')
    /* A carriage return on its own is a leftover, not a line break. */
    .replace(/\r/g, ' ')
    .replace(/[\u0000-\u0009\u000b\u000c\u000e-\u001f\u007f]/g, ' ')
    .replace(/[<>]/g, '')
    .trim();
}

/**
 * Put a value on one line.
 *
 * A header is one line. A value carrying a line break into a header is an
 * attempt to write a second header, so the break becomes a space.
 */
export function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function asText(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

/** Whether the address looks like an address. */
export function looksLikeEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}

/**
 * Whether the hidden field was filled, which means the sender is a robot.
 */
export function isTrapFilled(raw: RawSubmission): boolean {
  return asText(raw.trap).length > 0;
}

/**
 * Check a submission and return it in the shape the mailer wants.
 *
 * The reason is returned rather than a boolean, because the form tells the
 * reader what to fix, and "your email address is wrong" is a different
 * message from "your message was empty".
 */
export function validate(raw: RawSubmission): { ok: true; submission: Submission } | { ok: false; reason: string } {
  const name = singleLine(clean(asText(raw.name))).slice(0, MAX_NAME);
  const email = singleLine(clean(asText(raw.email))).toLowerCase().slice(0, MAX_EMAIL);
  const subject = singleLine(clean(asText(raw.subject))).slice(0, MAX_SUBJECT);
  const message = clean(asText(raw.message)).slice(0, MAX_MESSAGE);

  if (!name || !email || !subject || !message) {
    return { ok: false, reason: 'fields' };
  }
  if (!looksLikeEmail(email)) {
    return { ok: false, reason: 'email' };
  }

  return { ok: true, submission: { name, email, subject, message } };
}
