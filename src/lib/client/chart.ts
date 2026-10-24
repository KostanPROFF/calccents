/**
 * The geometry behind the result charts.
 *
 * Pure functions: numbers in, numbers out. There is no DOM here and no
 * global state, so the shapes can be worked out and checked without a
 * browser. The page script takes the numbers a calculator has already
 * worked out and turns them into coordinates; nothing is recalculated for
 * the picture, so the picture cannot disagree with the figures above it.
 */

/** The height of every chart, in pixels. */
export const CHART_HEIGHT = 170;

/** A point in the drawing area. */
export interface Point {
  x: number;
  y: number;
}

/** The area of the chart the data is drawn in. */
export interface PlotArea {
  /** Distance from the left edge of the chart. */
  left: number;
  /** Distance from the top edge of the chart. */
  top: number;
  /** Width of the drawing area. */
  width: number;
  /** Height of the drawing area. */
  height: number;
  /** The y coordinate of the zero line. */
  baseline: number;
}

/** The lowest and the highest value on the chart. */
export interface Domain {
  min: number;
  max: number;
}

/** Round to two decimals, so the path data stays small and readable. */
function round(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * The drawing area inside the chart.
 *
 * The padding on the top is where the legend sits, the padding at the
 * bottom is where the axis labels sit.
 */
export function plotArea(
  width: number,
  height: number,
  top: number,
  bottom: number,
  side = 12,
): PlotArea {
  const plotWidth = Math.max(0, width - side * 2);
  const plotHeight = Math.max(0, height - top - bottom);
  return {
    left: side,
    top,
    width: plotWidth,
    height: plotHeight,
    baseline: top + plotHeight,
  };
}

/**
 * The range the values cover.
 *
 * The zero line is always inside the range, because a balance and a
 * cumulative cost are read against it. When every value is the same the
 * range is widened, so a scale never collapses onto a single line.
 */
export function computeDomain(values: number[][]): Domain {
  let min = 0;
  let max = 0;
  let seen = false;

  for (const list of values) {
    for (const value of list) {
      if (!Number.isFinite(value)) continue;
      if (!seen) {
        min = value;
        max = value;
        seen = true;
        continue;
      }
      if (value < min) min = value;
      if (value > max) max = value;
    }
  }

  if (!seen) return { min: 0, max: 1 };
  if (min > 0) min = 0;
  if (max <= min) max = min + 1;
  return { min, max };
}

/** Turn a value into a y coordinate. */
export function scaleY(value: number, domain: Domain, plot: PlotArea): number {
  const span = domain.max - domain.min;
  if (span <= 0) return round(plot.baseline);
  const ratio = (value - domain.min) / span;
  return round(plot.baseline - ratio * plot.height);
}

/**
 * Turn a position in the series into an x coordinate.
 *
 * The first point sits on the left edge and the last one on the right
 * edge, so a series of one point sits in the middle rather than on the
 * left edge, where it would look like a value of zero.
 */
export function scaleX(index: number, count: number, plot: PlotArea): number {
  if (count <= 1) return round(plot.left + plot.width / 2);
  return round(plot.left + (index / (count - 1)) * plot.width);
}

/** The path of a line through the given points. */
export function linePath(points: Point[]): string {
  if (points.length === 0) return '';
  return points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');
}

/**
 * The closed path of the band between two lines.
 *
 * The band is what sits between one series and the one above it — the
 * part of a balance that came from interest rather than from what was
 * paid in.
 */
export function bandPath(upper: Point[], lower: Point[]): string {
  if (upper.length === 0 || lower.length === 0) return '';
  const count = Math.min(upper.length, lower.length);
  const top = upper.slice(0, count);
  const bottom = lower.slice(0, count).reverse();
  const parts = [
    `M ${top[0]?.x} ${top[0]?.y}`,
    ...top.slice(1).map((point) => `L ${point.x} ${point.y}`),
    ...bottom.map((point) => `L ${point.x} ${point.y}`),
  ];
  return `${parts.join(' ')} Z`;
}

/** One part of a stacked bar. */
export interface StackSegment {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * The parts of a horizontal stacked bar.
 *
 * The parts share the full width of the drawing area, in proportion to
 * what each one is worth. A total of zero produces no parts at all rather
 * than a bar of dividing by zero.
 */
export function stackSegments(
  values: number[],
  plot: PlotArea,
  barHeight: number,
): StackSegment[] {
  const positive = values.map((value) =>
    Number.isFinite(value) && value > 0 ? value : 0,
  );
  const total = positive.reduce((sum, value) => sum + value, 0);
  if (total <= 0) return [];

  const y = round(plot.top + (plot.height - barHeight) / 2);
  const segments: StackSegment[] = [];
  let x = plot.left;

  for (const value of positive) {
    const width = round((value / total) * plot.width);
    segments.push({
      x: round(x),
      y,
      width: Math.max(0, width),
      height: round(barHeight),
    });
    x += width;
  }

  return segments;
}

/**
 * The text of an axis label.
 *
 * The axis carries years or months, so the label is a whole number. A
 * value that is not whole is rounded rather than printed with a tail of
 * decimals.
 */
export function formatTick(value: number): string {
  if (!Number.isFinite(value)) return '';
  if (Number.isInteger(value)) return String(value);
  return String(Math.round(value * 10) / 10);
}
