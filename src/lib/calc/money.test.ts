import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  addMonths,
  clamp,
  formatCurrency,
  formatMonthYear,
  formatNumber,
  formatPercent,
  roundCents,
  roundTo,
  sum,
} from './money.ts';

test('roundTo rounds halves away from zero', () => {
  assert.equal(roundTo(1.005, 2), 1.01);
  assert.equal(roundTo(2.675, 2), 2.68);
  assert.equal(roundTo(-1.005, 2), -1.01);
  assert.equal(roundTo(-2.5, 0), -3);
  assert.equal(roundTo(2.5, 0), 3);
});

test('roundTo absorbs binary floating point error', () => {
  assert.equal(roundTo(0.1 + 0.2, 2), 0.3);
  assert.equal(roundTo(1.1 * 3, 2), 3.3);
  assert.equal(roundCents(19.995), 20);
});

test('roundTo leaves non-finite values untouched', () => {
  assert.equal(roundTo(Number.NaN, 2), Number.NaN);
  assert.equal(roundTo(Number.POSITIVE_INFINITY, 2), Number.POSITIVE_INFINITY);
});

test('roundTo handles zero and negative decimals', () => {
  assert.equal(roundTo(1234.5678, 0), 1235);
  assert.equal(roundTo(1234.5678, 3), 1234.568);
  assert.equal(roundTo(0, 2), 0);
});

test('clamp keeps values inside the range and repairs NaN', () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-5, 0, 10), 0);
  assert.equal(clamp(50, 0, 10), 10);
  assert.equal(clamp(Number.NaN, 3, 10), 3);
});

test('sum adds an empty list to zero', () => {
  assert.equal(sum([]), 0);
  assert.equal(sum([1.5, 2.5, 3]), 7);
});

test('formatCurrency renders US dollars', () => {
  assert.equal(formatCurrency(1234.5), '$1,234.50');
  assert.equal(formatCurrency(0), '$0.00');
  assert.equal(formatCurrency(-250.25), '-$250.25');
  assert.equal(formatCurrency(1234.5, 0), '$1,235');
});

test('formatPercent appends a percent sign', () => {
  assert.equal(formatPercent(6.5), '6.50%');
  assert.equal(formatPercent(6.5, 1), '6.5%');
});

test('formatNumber groups thousands', () => {
  assert.equal(formatNumber(1234567), '1,234,567');
  assert.equal(formatNumber(1234.5, 1), '1,234.5');
});

test('addMonths clamps the day to the length of the target month', () => {
  assert.equal(addMonths(new Date(2026, 0, 31), 1).getTime(), new Date(2026, 1, 28).getTime());
  assert.equal(addMonths(new Date(2028, 0, 31), 1).getTime(), new Date(2028, 1, 29).getTime());
  assert.equal(addMonths(new Date(2026, 2, 15), 12).getTime(), new Date(2027, 2, 15).getTime());
  assert.equal(addMonths(new Date(2026, 0, 15), 0).getTime(), new Date(2026, 0, 15).getTime());
});

test('formatMonthYear renders a readable month', () => {
  assert.equal(formatMonthYear(new Date(2026, 2, 15)), 'March 2026');
  assert.equal(formatMonthYear(new Date(2026, 11, 1)), 'December 2026');
});
