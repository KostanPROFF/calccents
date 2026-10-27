import { test } from 'node:test';
import assert from 'node:assert/strict';

import { parseNumber } from './dom.ts';

test('parseNumber reads a plain number', () => {
  assert.equal(parseNumber('42'), 42);
  assert.equal(parseNumber('42.5'), 42.5);
  assert.equal(parseNumber('0'), 0);
});

test('parseNumber keeps the exponent of a number in scientific notation', () => {
  assert.equal(parseNumber('1e4'), 10_000);
  assert.equal(parseNumber('1E4'), 10_000);
  assert.equal(parseNumber('1.5e3'), 1_500);
  assert.equal(parseNumber('3.5e-2'), 0.035);
});

test('parseNumber reads the formatting a reader typed', () => {
  assert.equal(parseNumber('$1,234.50'), 1234.5);
  assert.equal(parseNumber('1,234'), 1234);
  assert.equal(parseNumber('50%'), 50);
  assert.equal(parseNumber('  120  '), 120);
});

test('parseNumber keeps the sign', () => {
  assert.equal(parseNumber('-500'), -500);
  assert.equal(parseNumber('+500'), 500);
  assert.equal(parseNumber('$-500'), -500);
});

test('parseNumber refuses text that is not a number', () => {
  assert.ok(Number.isNaN(parseNumber('')));
  assert.ok(Number.isNaN(parseNumber('abc')));
  assert.ok(Number.isNaN(parseNumber('1e')));
  assert.ok(Number.isNaN(parseNumber('1.2.3')));
  assert.ok(Number.isNaN(parseNumber('1-2')));
  assert.ok(Number.isNaN(parseNumber('--5')));
  assert.ok(Number.isNaN(parseNumber('e4')));
});

test('parseNumber refuses a number too large to be one', () => {
  assert.ok(Number.isNaN(parseNumber('1e400')));
});
