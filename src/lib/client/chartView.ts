/**
 * Drawing the chart into the page.
 *
 * The numbers arrive from the calculator that has already worked them out;
 * this module only turns them into SVG. The words on the chart are read
 * back out of the markup, so they are always the words of the language
 * the page is in, and no dictionary is loaded twice.
 */

import {
  CHART_HEIGHT,
  bandPath,
  computeDomain,
  formatTick,
  linePath,
  plotArea,
  scaleXByValue,
  scaleY,
  stackSegments,
  type Point,
  type PlotArea,
} from './chart.ts';

const SVG_NS = 'http://www.w3.org/2000/svg';

/** The height of one row of the legend. */
const LEGEND_ROW = 13;

/** The space above the first row of the legend. */
const LEGEND_TOP = 10;

/** The height of the bar on a chart that has no axis. */
const BAR_HEIGHT = 40;

/** The room the axis labels need under the drawing area. */
const AXIS_ROOM = 34;

/** A series of values with the key it is filed under in the dictionary. */
export interface ChartSeriesInput {
  key: string;
  values: number[];
  /**
   * `line` draws a line. `band` fills the space between the series and
   * the first series of the chart, which is how the part of a balance
   * that came from interest is shown.
   */
  style?: 'line' | 'band';
}

/** What the chart should show right now. */
export interface ChartUpdate {
  kind: 'line' | 'bar';
  /** The values on the x axis, one per point. */
  xValues?: number[];
  series: ChartSeriesInput[];
}

/** The settings the markup carries for the chart. */
interface ChartConfig {
  xAxis: string;
  unitLabel: string;
  startLabel: string;
  endLabel: string;
  series: { key: string; label: string }[];
}

/** The last update for each chart, so a resize can redraw them. */
const lastUpdates = new Map<string, ChartUpdate>();

let resizeBound = false;

function element(name: string, attributes: Record<string, string | number> = {}): SVGElement {
  const node = document.createElementNS(SVG_NS, name);
  for (const [key, value] of Object.entries(attributes)) {
    node.setAttribute(key, String(value));
  }
  return node;
}

function readConfig(figure: HTMLElement): ChartConfig {
  const raw = figure.dataset.chart;
  if (!raw) {
    return { xAxis: 'none', unitLabel: '', startLabel: '', endLabel: '', series: [] };
  }
  try {
    const parsed = JSON.parse(raw) as Partial<ChartConfig>;
    return {
      xAxis: parsed.xAxis ?? 'none',
      unitLabel: parsed.unitLabel ?? '',
      startLabel: parsed.startLabel ?? '',
      endLabel: parsed.endLabel ?? '',
      series: parsed.series ?? [],
    };
  } catch {
    return { xAxis: 'none', unitLabel: '', startLabel: '', endLabel: '', series: [] };
  }
}

/** Remove everything the previous draw put on the chart. */
function clear(svg: SVGSVGElement): void {
  for (const child of Array.from(svg.children)) {
    if (child.tagName !== 'title') child.remove();
  }
}

/** The label of a series, taken from the words on the page. */
function labelFor(config: ChartConfig, key: string): string {
  return config.series.find((entry) => entry.key === key)?.label ?? key;
}

/** The colour of a series: the first is the accent, the rest are muted. */
function lineClass(index: number): string {
  if (index === 0) return 'chart-line chart-line--accent';
  if (index === 1) return 'chart-line chart-line--muted';
  if (index === 2) return 'chart-line chart-line--muted chart-line--dashed';
  return 'chart-line chart-line--accent chart-line--dashed';
}

/** The colour of the marker that stands for a series of one point. */
function dotClass(index: number): string {
  if (index === 0) return 'chart-dot chart-dot--accent';
  return 'chart-dot chart-dot--muted';
}

/** The fill of a part of a stacked bar. */
function segmentClass(index: number): string {
  const classes = [
    'chart-segment chart-segment--accent',
    'chart-segment chart-segment--muted',
    'chart-segment chart-segment--soft-accent',
    'chart-segment chart-segment--soft-muted',
    'chart-segment chart-segment--faint-accent',
  ];
  return classes[index] ?? 'chart-segment chart-segment--soft-muted';
}

/** The fill of the swatch that stands for a part of a stacked bar. */
function swatchClass(index: number): string {
  const classes = [
    'chart-swatch chart-swatch--accent',
    'chart-swatch chart-swatch--muted',
    'chart-swatch chart-swatch--soft-accent',
    'chart-swatch chart-swatch--soft-muted',
    'chart-swatch chart-swatch--faint-accent',
  ];
  return classes[index] ?? 'chart-swatch chart-swatch--soft-muted';
}

/** The width of a piece of text, estimated for the legend layout. */
function estimateWidth(text: string): number {
  return text.length * 5.6;
}

function drawGrid(svg: SVGSVGElement, plot: PlotArea): void {
  for (let step = 0; step <= 4; step += 1) {
    const y = Math.round(plot.top + (plot.height * step) / 4);
    svg.appendChild(
      element('line', {
        x1: plot.left,
        x2: plot.left + plot.width,
        y1: y,
        y2: y,
        class: 'chart-grid',
      }),
    );
  }
}

function drawAxis(
  svg: SVGSVGElement,
  config: ChartConfig,
  plot: PlotArea,
  xValues: number[],
): void {
  if (xValues.length === 0) return;

  const first = formatTick(xValues[0] ?? 0);
  const last = formatTick(xValues[xValues.length - 1] ?? 0);

  svg.appendChild(
    element('text', {
      x: plot.left,
      y: plot.baseline + 13,
      class: 'chart-tick',
      'text-anchor': 'start',
    }),
  ).textContent = first;

  /*
   * A horizon of less than a year has one point, and the number on the
   * right would be the same number as the one on the left.
   */
  if (last !== first) {
    svg.appendChild(
      element('text', {
        x: plot.left + plot.width,
        y: plot.baseline + 13,
        class: 'chart-tick',
        'text-anchor': 'end',
      }),
    ).textContent = last;
  }

  svg.appendChild(
    element('text', {
      x: plot.left,
      y: plot.baseline + 27,
      class: 'chart-caption',
      'text-anchor': 'start',
    }),
  ).textContent = config.startLabel;

  svg.appendChild(
    element('text', {
      x: plot.left + plot.width / 2,
      y: plot.baseline + 27,
      class: 'chart-caption',
      'text-anchor': 'middle',
    }),
  ).textContent = config.unitLabel;

  svg.appendChild(
    element('text', {
      x: plot.left + plot.width,
      y: plot.baseline + 27,
      class: 'chart-caption',
      'text-anchor': 'end',
    }),
  ).textContent = config.endLabel;
}

/**
 * Draw the lines of a chart, the band between them, and the axis.
 */
function drawLines(
  svg: SVGSVGElement,
  config: ChartConfig,
  plot: PlotArea,
  series: ChartSeriesInput[],
  xValues: number[],
  hasAxis: boolean,
): void {
  drawGrid(svg, plot);

  const domain = computeDomain(series.map((entry) => entry.values));
  const count = Math.max(1, ...series.map((entry) => entry.values.length));
  const xAt = scaleXByValue(xValues, count, plot);

  const pointsFor = (values: number[]): Point[] =>
    values.map((value, index) => ({
      x: xAt(index),
      y: scaleY(value, domain, plot),
    }));

  const points = series.map((entry) => pointsFor(entry.values));

  // The bands go down first, so the lines are drawn over them.
  series.forEach((entry, index) => {
    if (entry.style !== 'band' || index === 0) return;
    const upper = points[0];
    const lower = points[index];
    if (!upper || !lower) return;
    svg.appendChild(
      element('path', {
        d: bandPath(upper, lower),
        class: 'chart-band chart-band--muted',
      }),
    );
  });

  series.forEach((entry, index) => {
    const own = points[index];
    if (!own) return;
    /*
     * A series of one point has no line to draw, and a horizon of less
     * than a year leaves the chart with exactly one point. The marker
     * stands for it, so the figure is on the chart rather than only in
     * the table above it.
     */
    if (own.length === 1) {
      const point = own[0];
      if (!point) return;
      svg.appendChild(
        element('circle', {
          cx: point.x,
          cy: point.y,
          r: 3,
          class: dotClass(index),
        }),
      );
      return;
    }
    if (entry.style === 'band') {
      svg.appendChild(
        element('path', { d: linePath(own), class: 'chart-line chart-line--muted' }),
      );
      return;
    }
    svg.appendChild(element('path', { d: linePath(own), class: lineClass(index) }));
  });

  if (hasAxis) drawAxis(svg, config, plot, xValues);
}

function drawBar(
  svg: SVGSVGElement,
  plot: PlotArea,
  series: ChartSeriesInput[],
): void {
  const values = series.map((entry) =>
    entry.values.reduce((total, value) => total + (Number.isFinite(value) ? value : 0), 0),
  );
  const segments = stackSegments(values, plot, BAR_HEIGHT);

  segments.forEach((segment, index) => {
    svg.appendChild(
      element('rect', {
        x: segment.x,
        y: segment.y,
        width: segment.width,
        height: segment.height,
        class: segmentClass(index),
      }),
    );
  });

  // A hairline under the bar, so the bar sits on something.
  svg.appendChild(
    element('line', {
      x1: plot.left,
      x2: plot.left + plot.width,
      y1: plot.top + plot.height,
      y2: plot.top + plot.height,
      class: 'chart-grid',
    }),
  );
}

function drawLegend(
  svg: SVGSVGElement,
  config: ChartConfig,
  series: ChartSeriesInput[],
  width: number,
  kind: 'line' | 'bar',
): void {
  const right = width - 12;

  /*
   * The swatches sit in one column and the words start at the same place
   * on every row. Hanging the words off a fixed right edge instead would
   * leave the swatches floating at a different distance on every row,
   * because the words are of different lengths.
   */
  const labels = series.map((entry) => labelFor(config, entry.key));
  const widest = labels.reduce((longest, label) =>
    longest.length > label.length ? longest : label,
  );
  const swatchX = right - estimateWidth(widest) - 14;
  const textX = swatchX + 14;

  series.forEach((entry, index) => {
    const label = labels[index];
    const swatchRight = swatchX + 8;
    const y = LEGEND_TOP + index * LEGEND_ROW + 8;

    if (kind === 'bar') {
      svg.appendChild(
        element('rect', {
          x: swatchX,
          y: y - 7,
          width: 8,
          height: 8,
          class: swatchClass(index),
        }),
      );
    } else if (entry.style === 'band') {
      svg.appendChild(
        element('rect', {
          x: swatchX,
          y: y - 7,
          width: 8,
          height: 8,
          class: 'chart-swatch chart-swatch--muted',
        }),
      );
    } else if (index === 0) {
      svg.appendChild(
        element('line', {
          x1: swatchX,
          x2: swatchRight,
          y1: y - 3,
          y2: y - 3,
          class: 'chart-line chart-line--accent',
        }),
      );
    } else {
      svg.appendChild(
        element('line', {
          x1: swatchX,
          x2: swatchRight,
          y1: y - 3,
          y2: y - 3,
          class: lineClass(index),
        }),
      );
    }

    const text = element('text', {
      x: textX,
      y,
      class: 'chart-legend',
      'text-anchor': 'start',
    });
    text.textContent = label;
    svg.appendChild(text);
  });
}

/**
 * Draw a chart, or clear it and show the empty state when there is
 * nothing to draw.
 */
export function renderChart(chartId: string, update: ChartUpdate): void {
  lastUpdates.set(chartId, update);

  const figure = document.getElementById(chartId);
  if (!figure) return;
  const svg = figure.querySelector('svg');
  if (!svg) return;
  const empty = figure.querySelector('[data-chart-empty]');

  const config = readConfig(figure);
  /*
   * A series is drawn when it holds a figure. A series that is nothing but
   * zeros is an empty line and is left out; a series that is entirely
   * below zero is a real line, and the cost of owning can be lower than
   * the cost of renting for every year of the comparison.
   */
  const drawn = update.series.filter((entry) =>
    entry.values.some((value) => Number.isFinite(value) && value !== 0),
  );

  clear(svg);

  if (drawn.length === 0) {
    if (empty) (empty as HTMLElement).hidden = false;
    return;
  }

  if (empty) (empty as HTMLElement).hidden = true;

  const width = Math.max(240, Math.round(svg.getBoundingClientRect().width) || 320);
  const legendHeight = LEGEND_TOP + LEGEND_ROW * drawn.length;
  const hasAxis = config.xAxis === 'years' || config.xAxis === 'months';
  const bottom = update.kind === 'bar' ? 12 : hasAxis ? AXIS_ROOM : 16;

  /*
   * A bar chart is one bar. It gets a height that fits the bar and the
   * legend above it, rather than the full height of a line chart, which
   * would leave a band of empty canvas between the two.
   */
  const height =
    update.kind === 'bar' ? legendHeight + BAR_HEIGHT + bottom + 6 : CHART_HEIGHT;

  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  const plot = plotArea(width, height, legendHeight + 6, bottom);

  if (update.kind === 'bar') {
    drawBar(svg, plot, drawn);
  } else {
    drawLines(svg, config, plot, drawn, update.xValues ?? [], hasAxis);
  }

  drawLegend(svg, config, drawn, width, update.kind);

  if (!resizeBound) {
    resizeBound = true;
    let frame = 0;
    window.addEventListener('resize', () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        for (const [id, last] of lastUpdates) renderChart(id, last);
      });
    });
  }
}
