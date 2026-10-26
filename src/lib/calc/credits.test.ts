import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  FEDERAL_EITC_MAX_CREDIT,
  federalEitc,
} from './credits.ts';

test('the credit is earned at the rate of the number of children', () => {
  // No children: 7.65% of the earned income up to 8,680.
  assert.equal(federalEitc(8680, 0), 664);
  assert.equal(federalEitc(4000, 0), 306);

  // One child: 34% up to 13,020, which is 4,426.80 — the credit reaches
  // 4,427 a few cents later.
  assert.equal(federalEitc(13020, 1), 4426.8);

  // Two children: 40% up to 18,290.
  assert.equal(federalEitc(18290, 2), 7316);

  // Three children: 45% up to 18,291, which is 8,230.95.
  assert.equal(federalEitc(18291, 3), 8230.95);
});

test('the credit is at its maximum between the two points', () => {
  assert.equal(federalEitc(10860, 0), 664);
  assert.equal(federalEitc(23890, 1), 4427);
  assert.equal(federalEitc(23890, 2), 7316);
  assert.equal(federalEitc(23890, 3), 8231);
});

test('the credit falls away above the income the source sets', () => {
  assert.equal(federalEitc(19540, 0), 0);
  assert.equal(federalEitc(20000, 0), 0);

  // One child: 4,427 less 15.98% of the income above 23,890.
  assert.equal(federalEitc(23890, 1), 4427);
  assert.equal(federalEitc(30000, 1), 3450.62);
  assert.equal(federalEitc(51600, 1), 0);

  // Two children: 7,316 less 21.06% of the income above 23,890.
  assert.equal(federalEitc(58629, 2), 0);
});

test('a married couple is paid on a larger income', () => {
  assert.equal(federalEitc(18140, 0, true), 664);
  assert.equal(federalEitc(26820, 0, true), 0);
  assert.equal(federalEitc(31160, 1, true), 4427);
});

test('no income means no credit', () => {
  assert.equal(federalEitc(0, 0), 0);
  assert.equal(federalEitc(-1000, 2), 0);
  assert.equal(federalEitc(Number.NaN, 1), 0);
});

test('the maximum credits are the published ones', () => {
  assert.deepEqual([...FEDERAL_EITC_MAX_CREDIT], [664, 4427, 7316, 8231]);
});

test('more children than the table carries use the largest band', () => {
  assert.equal(federalEitc(23890, 3), 8231);
  assert.equal(federalEitc(23890, 7), 8231);
});
