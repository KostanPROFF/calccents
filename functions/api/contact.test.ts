import { test } from 'node:test';
import assert from 'node:assert/strict';

import { onRequestPost, onRequest } from './contact.ts';

interface Env {
  MAILER: {
    fetch(request: Request | string, init?: RequestInit): Promise<Response>;
  };
}

/** A mailer that accepts every message and counts what it was given. */
function env(sent: string[] = []): Env {
  return {
    MAILER: {
      fetch: async (_request: Request | string, init?: RequestInit) => {
        sent.push(String(init?.body ?? ''));
        return new Response('ok', { status: 200 });
      },
    },
  };
}

function post(body: string, headers: Record<string, string> = {}): Request {
  return new Request('https://calccents.com/api/contact', {
    method: 'POST',
    headers,
    body,
  });
}

const JSON_HEADERS = { 'Content-Type': 'application/json' };
const FORM_HEADERS = { 'Content-Type': 'application/x-www-form-urlencoded' };

/*
 * The rate limit is kept in the module, so it is shared between the tests.
 * Every test therefore uses its own address, or the test after the second
 * one gets a 429 and fails for the wrong reason.
 */
function message(email: string): string {
  return JSON.stringify({
    name: 'Kostan',
    email,
    subject: 'Hello',
    message: 'A message.',
  });
}

test('a request from another origin is refused', async () => {
  const response = await onRequestPost({
    request: post('{}', { Origin: 'https://www.calccents.com.attacker.example' }),
    env: env(),
  });

  assert.equal(response.status, 403);
});

test('a request from the site itself is accepted', async () => {
  const response = await onRequestPost({
    request: post(message('one@example.com'), { ...JSON_HEADERS, Origin: 'https://calccents.com' }),
    env: env(),
  });

  assert.equal(response.status, 200);
});

test('a request from the www address of the site is accepted', async () => {
  const response = await onRequestPost({
    request: post(message('two@example.com'), { ...JSON_HEADERS, Origin: 'https://www.calccents.com' }),
    env: env(),
  });

  assert.equal(response.status, 200);
});

test('a JSON body of null is a bad request rather than a crash', async () => {
  const response = await onRequestPost({
    request: post('null', JSON_HEADERS),
    env: env(),
  });

  assert.equal(response.status, 400);
});

test('a JSON body that is an array is a bad request', async () => {
  const response = await onRequestPost({
    request: post('[]', JSON_HEADERS),
    env: env(),
  });

  assert.equal(response.status, 400);
});

test('a body that is not JSON at all is a bad request', async () => {
  const response = await onRequestPost({
    request: post('not a body', JSON_HEADERS),
    env: env(),
  });

  assert.equal(response.status, 400);
});

test('a form post without JavaScript is answered with a page', async () => {
  const sent: string[] = [];
  const response = await onRequestPost({
    request: post(
      'name=Kostan&email=three%40example.com&subject=Hello&message=A+message.&lang=ru',
      FORM_HEADERS,
    ),
    env: env(sent),
  });

  assert.equal(response.status, 200);
  assert.match(response.headers.get('Content-Type') ?? '', /text\/html/);
  const html = await response.text();
  assert.match(html, /<html lang="ru">/);
  assert.equal(sent.length, 1);
});

test('a form post without JavaScript is answered in the language of the page', async () => {
  const response = await onRequestPost({
    request: post(
      'name=Kostan&email=four%40example.com&subject=Hello&message=A+message.&lang=es',
      FORM_HEADERS,
    ),
    env: env(),
  });

  const html = await response.text();
  assert.match(html, /<html lang="es">/);
});

test('a form post with an empty field is answered with the field message', async () => {
  const response = await onRequestPost({
    request: post('name=&email=&subject=&message=&lang=en', FORM_HEADERS),
    env: env(),
  });

  assert.equal(response.status, 422);
  const html = await response.text();
  assert.match(html, /<html lang="en">/);
});

test('a filled trap is answered as though the message went out', async () => {
  const sent: string[] = [];
  const response = await onRequestPost({
    request: post('{"name":"Kostan","email":"five@example.com","subject":"Hello","message":"A message.","trap":"filled"}', JSON_HEADERS),
    env: env(sent),
  });

  assert.equal(response.status, 200);
  assert.equal(sent.length, 0);
});

test('every method other than POST is refused', async () => {
  const response = await onRequest();
  assert.equal(response.status, 405);
});
