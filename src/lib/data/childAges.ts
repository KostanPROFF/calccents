/**
 * The age of the children, in bands.
 *
 * A number of children is not enough to work out a state credit. New York pays
 * $1,000 for a child under four and $500 for a child from four to sixteen,
 * Minnesota pays $1,800 for a child under eighteen, Illinois needs a child
 * under twelve and Vermont pays for a child of six or younger. A single count
 * of children cannot carry that, so the calculator asks for the number of
 * children in each band instead.
 *
 * The bands are the ones the states' own rules cut at. Every age limit the
 * model carries falls on a band edge, which is what makes the credit exact
 * rather than approximate:
 *
 *   0-3      under four          New York pays the higher amount
 *   4-5      four and five       the rest of New York's band
 *   6        six                 Vermont is the one state that pays for a
 *                               child of six
 *   7-11     seven to eleven     Illinois cuts at twelve
 *   12       twelve              Massachusetts cuts at thirteen
 *   13-16    thirteen to sixteen the rest of the under-seventeen band
 *   17       seventeen           Minnesota pays for a child under eighteen
 *                               and Arizona pays a smaller amount for a
 *                               dependent of seventeen or older
 *
 * The bands are a construct of this site and not a published table. What is
 * published is the age limit each state uses, and the bands are the smallest
 * set that carries all of those limits without splitting a limit in half.
 */

/** One band of ages. */
export interface ChildAgeBand {
  /** The stable name of the band, used in the credit rules and in the DOM. */
  readonly id: ChildAgeBandId;
  /** The age at the bottom of the band. */
  readonly from: number;
  /** The age at the top of the band. */
  readonly to: number;
  /** The ages as they are shown on the page, before the translated caption. */
  readonly label: string;
}

/** The name of a band. */
export type ChildAgeBandId =
  | 'under4'
  | 'fourToFive'
  | 'six'
  | 'sevenToEleven'
  | 'twelve'
  | 'thirteenToSixteen'
  | 'seventeen';

/** The bands the children are counted in. */
export const CHILD_AGE_BANDS: readonly ChildAgeBand[] = [
  { id: 'under4', from: 0, to: 3, label: '0–3' },
  { id: 'fourToFive', from: 4, to: 5, label: '4–5' },
  { id: 'six', from: 6, to: 6, label: '6' },
  { id: 'sevenToEleven', from: 7, to: 11, label: '7–11' },
  { id: 'twelve', from: 12, to: 12, label: '12' },
  { id: 'thirteenToSixteen', from: 13, to: 16, label: '13–16' },
  { id: 'seventeen', from: 17, to: 17, label: '17' },
];

/** The number of children in each band. */
export type ChildAgeCounts = Record<ChildAgeBandId, number>;

/** No children in any band. */
export function emptyChildAges(): ChildAgeCounts {
  const counts = {} as ChildAgeCounts;
  for (const band of CHILD_AGE_BANDS) counts[band.id] = 0;
  return counts;
}

/**
 * The number of children in the bands named.
 *
 * A band that is not named counts for nothing, so a rule that names the bands
 * it covers adds up only the children it pays for.
 */
export function childrenIn(counts: ChildAgeCounts, bands: readonly ChildAgeBandId[]): number {
  let total = 0;
  for (const id of bands) {
    const count = counts[id];
    if (Number.isFinite(count) && count > 0) total += Math.trunc(count);
  }
  return total;
}

/**
 * The number of children younger than an age.
 *
 * The age is exclusive: a child of six is not younger than six.
 */
export function childrenUnder(counts: ChildAgeCounts, age: number): number {
  let total = 0;
  for (const band of CHILD_AGE_BANDS) {
    if (band.from >= age) break;
    const count = counts[band.id];
    if (Number.isFinite(count) && count > 0) total += Math.trunc(count);
  }
  return total;
}

/** The number of children in every band, which is the whole count. */
export function totalChildren(counts: ChildAgeCounts): number {
  let total = 0;
  for (const band of CHILD_AGE_BANDS) {
    const count = counts[band.id];
    if (Number.isFinite(count) && count > 0) total += Math.trunc(count);
  }
  return total;
}

/**
 * The youngest child in the counts, or null when there are none.
 *
 * Some states pay a larger share of the federal earned income credit when the
 * youngest child is under three, which is Oregon.
 */
export function youngestChildAge(counts: ChildAgeCounts): number | null {
  for (const band of CHILD_AGE_BANDS) {
    const count = counts[band.id];
    if (Number.isFinite(count) && count > 0) return band.from;
  }
  return null;
}
