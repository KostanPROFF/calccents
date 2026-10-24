import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import { clean, isTrapFilled, looksLikeEmail, singleLine, validate } from './validate.ts';

describe('clean', () => {
  it('strips the control characters that would break a plain text header', () => {
    assert.equal(clean('hello\rBcc: someone@example.com'), 'hello Bcc: someone@example.com');
  });

  it('keeps a line break in the body, because paragraphs are readable', () => {
    assert.equal(clean('first line\nsecond line'), 'first line\nsecond line');
  });

  it('removes the characters that could start markup', () => {
    assert.equal(clean('<script>alert(1)</script>'), 'scriptalert(1)/script');
  });

  it('trims the ends', () => {
    assert.equal(clean('  hello  '), 'hello');
  });

  it('leaves ordinary text alone', () => {
    assert.equal(clean('a wrong figure on the mortgage page'), 'a wrong figure on the mortgage page');
  });
});

describe('singleLine', () => {
  it('folds a line break into a space', () => {
    assert.equal(singleLine('hello\r\nBcc: someone@example.com'), 'hello Bcc: someone@example.com');
  });

  it('folds several line breaks into one space', () => {
    assert.equal(singleLine('a\n\n\nb'), 'a b');
  });
});

describe('looksLikeEmail', () => {
  it('accepts an ordinary address', () => {
    assert.equal(looksLikeEmail('someone@example.com'), true);
  });

  it('rejects an address with no domain', () => {
    assert.equal(looksLikeEmail('someone@'), false);
  });

  it('rejects an address with no local part', () => {
    assert.equal(looksLikeEmail('@example.com'), false);
  });

  it('rejects a string with a space in it', () => {
    assert.equal(looksLikeEmail('some one@example.com'), false);
  });

  it('rejects an address with no dot in the domain', () => {
    assert.equal(looksLikeEmail('someone@example'), false);
  });
});

describe('isTrapFilled', () => {
  it('is false when the field is empty', () => {
    assert.equal(isTrapFilled({ trap: '' }), false);
  });

  it('is false when the field is missing', () => {
    assert.equal(isTrapFilled({}), false);
  });

  it('is true when a robot filled the field', () => {
    assert.equal(isTrapFilled({ trap: 'Acme Ltd' }), true);
  });
});

describe('validate', () => {
  const good = {
    name: 'A Reader',
    email: 'reader@example.com',
    subject: 'A wrong figure',
    message: 'The mortgage figure does not match mine.',
  };

  it('accepts a complete submission', () => {
    const result = validate(good);
    assert.equal(result.ok, true);
  });

  it('lowercases the email address', () => {
    const result = validate({ ...good, email: 'Reader@Example.com' });
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.submission.email, 'reader@example.com');
    }
  });

  it('refuses a submission with an empty field', () => {
    const result = validate({ ...good, message: '' });
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.reason, 'fields');
    }
  });

  it('refuses a submission with a broken address', () => {
    const result = validate({ ...good, email: 'not-an-address' });
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.reason, 'email');
    }
  });

  it('refuses a submission that is not made of strings', () => {
    const result = validate({ ...good, name: { evil: true } });
    assert.equal(result.ok, false);
  });

  it('cuts a message that is longer than the limit', () => {
    const result = validate({ ...good, message: 'x'.repeat(9000) });
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.submission.message.length, 4000);
    }
  });

  it('does not let a header be smuggled into the subject', () => {
    const result = validate({ ...good, subject: 'hi\r\nBcc: victim@example.com' });
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.submission.subject.includes('\n'), false);
      assert.equal(result.submission.subject.includes('\r'), false);
    }
  });
});
