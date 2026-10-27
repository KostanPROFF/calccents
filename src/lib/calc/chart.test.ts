import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  bandPath,
  computeDomain,
  formatTick,
  linePath,
  plotArea,
  scaleX,
  scaleXByValue,
  scaleY,
  stackSegments,
} from '../client/chart.ts';

/*
 * The chart geometry. These are the numbers behind the picture, so they
 * are checked the same way the arithmetic is: against what they should
 * be on the page.
 */

test('computeDomain keeps the zero line inside the range', () => {
  const domain = computeDomain([[100, 50, 0]]);
  assert.equal(domain.min, 0);
  assert.equal(domain.max, 100);
});

test('computeDomain takes the lowest and the highest of every series', () => {
  const domain = computeDomain([[10, 40], [5, 25]]);
  assert.equal(domain.min, 0);
  assert.equal(domain.max, 40);
});

test('computeDomain ignores values that are not finite', () => {
  const domain = computeDomain([[Number.NaN, 30, Number.POSITIVE_INFINITY]]);
  assert.equal(domain.min, 0);
  assert.equal(domain.max, 30);
});

test('computeDomain widens a range that has collapsed onto one value', () => {
  const domain = computeDomain([[0, 0, 0]]);
  assert.ok(domain.max > domain.min);
});

test('computeDomain has a range for an empty set of values', () => {
  const domain = computeDomain([]);
  assert.ok(domain.max > domain.min);
});

test('scaleY puts the largest value at the top and the smallest at the bottom', () => {
  const plot = plotArea(320, 170, 40, 30);
  const domain = { min: 0, max: 100 };
  assert.equal(scaleY(0, domain, plot), plot.baseline);
  assert.equal(scaleY(100, domain, plot), plot.top);
  assert.equal(scaleY(50, domain, plot), (plot.top + plot.baseline) / 2);
});

test('scaleX puts the first point on the left and the last on the right', () => {
  const plot = plotArea(320, 170, 40, 30);
  assert.equal(scaleX(0, 5, plot), plot.left);
  assert.equal(scaleX(4, 5, plot), plot.left + plot.width);
});

test('scaleX puts a single point in the middle of the plot', () => {
  const plot = plotArea(320, 170, 40, 30);
  assert.equal(scaleX(0, 1, plot), plot.left + plot.width / 2);
});

test('scaleXByValue spreads points that are evenly spaced the same way', () => {
  const plot = plotArea(320, 170, 40, 30);
  const at = scaleXByValue([1, 2, 3, 4, 5], 5, plot);
  assert.equal(at(0), plot.left);
  assert.equal(at(4), plot.left + plot.width);
  assert.equal(at(2), plot.left + plot.width / 2);
});

test('scaleXByValue gives a part year the width it covers in time', () => {
  const plot = plotArea(320, 170, 40, 30);
  // A horizon of 2.1 years: the last point covers a tenth of a year, and
  // it is placed a tenth of the way along the axis, not a third.
  const at = scaleXByValue([1, 2, 2.1], 3, plot);
  assert.equal(at(0), plot.left);
  assert.equal(at(2), plot.left + plot.width);
  assert.ok(at(1) > plot.left + plot.width * 0.9);
  assert.ok(at(1) < plot.left + plot.width);
});

test('scaleXByValue falls back on even spacing when the values cannot be used', () => {
  const plot = plotArea(320, 170, 40, 30);
  const byValue = scaleXByValue([1, 2, 3], 3, plot);
  const even = scaleXByValue([1, Number.NaN, 3], 3, plot);
  assert.equal(even(1), scaleX(1, 3, plot));
  assert.equal(byValue(1), scaleX(1, 3, plot));

  const mismatched = scaleXByValue([1, 2], 3, plot);
  assert.equal(mismatched(1), scaleX(1, 3, plot));
});

test('linePath draws a move and then the lines', () => {
  assert.equal(
    linePath([
      { x: 0, y: 10 },
      { x: 5, y: 20 },
    ]),
    'M 0 10 L 5 20',
  );
});

test('linePath is empty when there is nothing to draw', () => {
  assert.equal(linePath([]), '');
});

test('bandPath closes the shape between the two lines', () => {
  const path = bandPath(
    [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    ],
    [
      { x: 0, y: 10 },
      { x: 10, y: 10 },
    ],
  );
  assert.equal(path, 'M 0 0 L 10 0 L 10 10 L 0 10 Z');
});

test('bandPath is empty when one of the lines is empty', () => {
  assert.equal(bandPath([], [{ x: 0, y: 0 }]), '');
});

test('stackSegments shares the full width between the parts', () => {
  const plot = plotArea(320, 170, 40, 30);
  const segments = stackSegments([25, 75], plot, 40);
  assert.equal(segments.length, 2);
  assert.equal(segments[0]?.x, plot.left);
  assert.equal(segments[1]?.x, plot.left + plot.width / 4);
  assert.equal(segments[0]?.width, plot.width / 4);
  assert.equal(segments[1]?.width, (plot.width * 3) / 4);
  assert.equal(segments[0]?.height, 40);
});

test('stackSegments draws nothing when there is no value to share', () => {
  const plot = plotArea(320, 170, 40, 30);
  assert.deepEqual(stackSegments([0, 0], plot, 40), []);
});

test('stackSegments leaves out the parts that are worth nothing', () => {
  const plot = plotArea(320, 170, 40, 30);
  const segments = stackSegments([0, 100], plot, 40);
  assert.equal(segments.length, 2);
  assert.equal(segments[0]?.width, 0);
  assert.equal(segments[1]?.width, plot.width);
});

test('formatTick prints whole years without a tail of decimals', () => {
  assert.equal(formatTick(30), '30');
  assert.equal(formatTick(1.5), '1.5');
  assert.equal(formatTick(Number.NaN), '');
});
