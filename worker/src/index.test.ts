import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import worker from './index.ts';

/**
 * The mailer worker.
 *
 * It is reached over a service binding, so it is not on the open internet,
 * but it is the last thing between a message and a real mailbox, so it
 * checks the same things the Pages function checks.
 */

interface Sent {
  to: string;
  from: string;
  subject: string;
  text: string;
  replyTo?: string;
}

function env(sent: Sent[] = []): {
  EMAIL: { send(message: Sent): Promise<unknown> };
} {
  return {
    EMAIL: {
      send: async (message: Sent) => {
        sent.push(message);
        return { messageId: 'test' };
      },
    },
  };
}

function post(body: string, headers: Record<string, string> = {}): Request {
  return new Request('https://mailer.internal/send', {
    method: 'POST',
    headers,
    body,
  });
}

const MESSAGE = JSON.stringify({
  name: 'A Reader',
  email: 'reader@example.com',
  subject: 'A wrong figure',
  message: 'The mortgage figure does not match mine.',
});

describe('the mailer worker', () => {
  it('refuses a request from an address that begins with the address of the site', async () => {
    const response = await worker.fetch(
      post('{}', { Origin: 'https://www.calccents.com.attacker.example' }),
      env(),
    );
    assert.equal(response.status, 403);
  });

  it('accepts a request from the site itself', async () => {
    const response = await worker.fetch(
      post(MESSAGE, { Origin: 'https://calccents.com' }),
      env(),
    );
    assert.equal(response.status, 200);
  });

  it('accepts a request from the www address of the site', async () => {
    const response = await worker.fetch(
      post(MESSAGE, { Origin: 'https://www.calccents.com' }),
      env(),
    );
    assert.equal(response.status, 200);
  });

  it('answers a body of null with a bad request rather than an exception', async () => {
    const response = await worker.fetch(post('null'), env());
    assert.equal(response.status, 400);
  });

  it('answers a body that is a list with a bad request', async () => {
    const response = await worker.fetch(post('[]'), env());
    assert.equal(response.status, 400);
  });

  it('refuses every method other than POST', async () => {
    const response = await worker.fetch(
      new Request('https://mailer.internal/send', { method: 'GET' }),
      env(),
    );
    assert.equal(response.status, 405);
  });

  it('sends the message to the address that reads the mail', async () => {
    const sent: Sent[] = [];
    await worker.fetch(post(MESSAGE), env(sent));
    assert.equal(sent.length, 1);
    assert.equal(sent[0]?.to, 'info@constantinecs.com');
    assert.equal(sent[0]?.from, 'hello@calccents.com');
    assert.equal(sent[0]?.replyTo, 'reader@example.com');
  });

  it('does not send anything when the hidden field is filled', async () => {
    const sent: Sent[] = [];
    const body = JSON.stringify({
      name: 'A Robot',
      email: 'robot@example.com',
      subject: 'Hello',
      message: 'A message.',
      trap: 'filled',
    });
    const response = await worker.fetch(post(body), env(sent));
    assert.equal(response.status, 200);
    assert.equal(sent.length, 0);
  });
});
