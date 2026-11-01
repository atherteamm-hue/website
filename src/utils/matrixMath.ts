// src/utils/matrixMath.ts
// Athar Matrix Studio — exact rational linear-algebra engine with step-by-step output.

// ==========================================
// 0. Exact Rational Engine (BigInt)
// ==========================================
export const gcdBigInt = (a: bigint, b: bigint): bigint => {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a === 0n ? 1n : a;
};

const lcmBig = (a: bigint, b: bigint): bigint => (a / gcdBigInt(a, b)) * b;

export const bigSqrt = (n: bigint): bigint => {
  if (n < 0n) throw new Error('Cannot compute the square root of a negative number.');
  if (n < 2n) return n;
  let x = n;
  let y = (x + 1n) / 2n;
  while (y < x) {
    x = y;
    y = (x + n / x) / 2n;
  }
  return x;
};

/** √m = out · √inner, with inner square-free (as far as trial division up to 1e5 allows). */
export function simplifySqrt(m: bigint): [bigint, bigint] {
  if (m < 0n) throw new Error('simplifySqrt expects a non-negative integer.');
  if (m === 0n) return [0n, 1n];
  const s = bigSqrt(m);
  if (s * s === m) return [s, 1n];
  let out = 1n;
  let inner = m;
  for (let p = 2n; p <= 100000n && p * p <= inner; p++) {
    const pp = p * p;
    while (inner % pp === 0n) {
      inner /= pp;
      out *= p;
    }
  }
  return [out, inner];
}

export class Frac {
  public readonly n: bigint;
  public readonly d: bigint;

  constructor(n: bigint | number, d: bigint | number = 1n) {
    let num = typeof n === 'number' ? BigInt(Math.trunc(n)) : n;
    let den = typeof d === 'number' ? BigInt(Math.trunc(d)) : d;
    if (den === 0n) throw new Error('Division by zero.');
    if (den < 0n) {
      num = -num;
      den = -den;
    }
    if (num === 0n) {
      this.n = 0n;
      this.d = 1n;
    } else {
      const g = gcdBigInt(num, den);
      this.n = num / g;
      this.d = den / g;
    }
  }

  static from(val: Frac | number | string): Frac {
    if (val instanceof Frac) return val;
    if (typeof val === 'number') {
      if (!Number.isFinite(val)) throw new Error('Numbers must be finite.');
      return Frac.parse(String(val));
    }
    return Frac.parse(val);
  }

  /** Strict parser: "3", "-2/5", "0.75", "1e-3", "1.5/4". Empty string = 0. Anything else throws. */
  static parse(raw: string): Frac {
    const s = (raw ?? '').replace(/\s+/g, '').replace(/[−–]/g, '-');
    if (s === '') return new Frac(0n);
    if (s.includes('/')) {
      const parts = s.split('/');
      if (parts.length !== 2) throw new Error(`Invalid fraction: "${raw}"`);
      const num = Frac.parseSigned(parts[0], raw);
      const den = Frac.parseSigned(parts[1], raw);
      if (den.isZero()) throw new Error(`Denominator cannot be zero in "${raw}".`);
      return num.div(den);
    }
    return Frac.parseSigned(s, raw);
  }

  private static parseSigned(s: string, raw: string): Frac {
    let neg = false;
    let t = s;
    if (t[0] === '-') {
      neg = true;
      t = t.slice(1);
    } else if (t[0] === '+') {
      t = t.slice(1);
    }
    const v = Frac.parseUnsigned(t, raw);
    return neg ? v.neg() : v;
  }

  private static parseDecimal(t: string): Frac {
    const [i = '', d = ''] = t.split('.');
    const digits = (i === '' ? '0' : i) + d;
    return new Frac(BigInt(digits), 10n ** BigInt(d.length));
  }

  private static parseUnsigned(t: string, raw: string): Frac {
    const sci = /^(\d+\.?\d*|\.\d+)[eE]([+-]?\d+)$/.exec(t);
    if (sci) {
      const base = Frac.parseDecimal(sci[1]);
      const e = parseInt(sci[2], 10);
      if (Math.abs(e) > 300) throw new Error(`Exponent too large in "${raw}".`);
      const p = new Frac(10n ** BigInt(Math.abs(e)));
      return e >= 0 ? base.mul(p) : base.div(p);
    }
    if (/^(\d+\.?\d*|\.\d+)$/.test(t)) return Frac.parseDecimal(t);
    throw new Error(`Invalid number: "${raw}"`);
  }

  add(o: Frac): Frac { return new Frac(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o: Frac): Frac { return new Frac(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o: Frac): Frac { return new Frac(this.n * o.n, this.d * o.d); }
  div(o: Frac): Frac {
    if (o.n === 0n) throw new Error('Division by zero.');
    return new Frac(this.n * o.d, this.d * o.n);
  }
  neg(): Frac { return new Frac(-this.n, this.d); }
  abs(): Frac { return new Frac(this.n < 0n ? -this.n : this.n, this.d); }

  isZero(): boolean { return this.n === 0n; }
  isOne(): boolean { return this.n === 1n && this.d === 1n; }
  isNegOne(): boolean { return this.n === -1n && this.d === 1n; }
  isNegative(): boolean { return this.n < 0n; }
  isInteger(): boolean { return this.d === 1n; }
  equals(o: Frac): boolean { return this.n === o.n && this.d === o.d; }
  cmp(o: Frac): number {
    const l = this.n * o.d;
    const r = o.n * this.d;
    return l < r ? -1 : l > r ? 1 : 0;
  }
  gt(o: Frac): boolean { return this.cmp(o) > 0; }
  lt(o: Frac): boolean { return this.cmp(o) < 0; }

  toNumber(): number {
    const a = Number(this.n);
    const b = Number(this.d);
    if (Number.isFinite(a) && Number.isFinite(b)) return a / b;
    return Number((this.n * 10n ** 20n) / this.d) / 1e20;
  }

  toString(asDecimal = false, decimals = 3): string {
    if (this.n === 0n) return '0';
    if (asDecimal) {
      const val = this.toNumber();
      if (Number.isInteger(val)) return val.toString();
      const r = Number(val.toFixed(decimals));
      // Fix: Display extremely small numbers precisely rather than rounding to '0'
      return r === 0 ? val.toPrecision(3) : r.toString();
    }
    return this.d === 1n ? `${this.n}` : `${this.n}/${this.d}`;
  }

  /** Wrapped in parentheses when needed inside products, e.g. (−2) or (1/3). */
  toFactorString(): string {
    const str = this.toString(false);
    return this.d !== 1n || this.n < 0n ? `(${str})` : str;
  }

  toLatex(): string {
    if (this.n === 0n) return '0';
    if (this.d === 1n) return `${this.n}`;
    const sign = this.n < 0n ? '-' : '';
    const absN = this.n < 0n ? -this.n : this.n;
    return `${sign}\\frac{${absN}}{${this.d}}`;
  }
}

export const F0 = new Frac(0n);
export const F1 = new Frac(1n);

// ==========================================
// Types & helpers
// ==========================================
export type Mat = (number | string | Frac)[][];
export type Vec = (number | string | Frac)[];
export type StepStatus = 'info' | 'pivot' | 'swap' | 'eliminate' | 'success' | 'warning' | 'error';

export interface MathStep {
  title: string;
  description?: string;
  /** Several operations are separated by " ; " so the UI can show them as separate pills. */
  operationBadge?: string;
  fracMatrix?: Frac[][];
  matrixLabel?: string;
  /** Extra columns shown after a vertical bar: [A | b]. */
  augMatrix?: Frac[][];
  fracVector?: Frac[];
  vectorLabel?: string;
  extraMatrices?: { label: string; matrix: Frac[][] }[];
  highlightRows?: number[];
  highlightCols?: number[];
  pivotCell?: [number, number];
  status?: StepStatus;
  systemClassification?: 'unique' | 'infinite' | 'inconsistent';
  parametricSolution?: string[];
  verification?: { equations: string[]; passed: boolean };
  resultText?: string;
}

export function getVarName(index: number): string {
  const vars = ['X', 'Y', 'Z', 'W', 'V', 'U'];
  return vars[index] || `X${index + 1}`;
}

const SUB = '₀₁₂₃₄₅₆₇₈₉';
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const sub = (n: number) => String(n).split('').map(d => SUB[+d]).join('');
const sup = (n: number) => String(n).split('').map(d => SUP[+d]).join('');

export const toFracMatrix = (A: Mat): Frac[][] => A.map(row => row.map(v => Frac.from(v)));
export const toFracVector = (V: Vec): Frac[] => V.map(v => Frac.from(v));

const cloneM = (M: Frac[][]): Frac[][] => M.map(r => [...r]);
const range = (n: number): number[] => Array.from({ length: n }, (_, i) => i);
const fmt = (f: Frac): string => f.toString();
const vecStr = (v: Frac[]): string => `[${v.map(fmt).join(', ')}]ᵀ`;
const identity = (n: number): Frac[][] => range(n).map(i => range(n).map(j => (i === j ? F1 : F0)));
const zerosM = (r: number, c: number): Frac[][] => range(r).map(() => range(c).map(() => F0));
const fromColumns = (cols: Frac[][]): Frac[][] =>
  cols.length === 0 ? [] : cols[0].map((_, i) => cols.map(c => c[i]));

function assertRect(M: Frac[][], name = 'Matrix'): void {
  if (!M.length || !M[0].length) throw new Error(`${name} is empty.`);
  const c = M[0].length;
  if (M.some(r => r.length !== c)) throw new Error(`${name} has rows of different lengths.`);
}

function assertSquare(M: Frac[][], what: string): void {
  assertRect(M);
  if (M.length !== M[0].length) {
    throw new Error(`${what} requires a square matrix (n × n). Yours is ${M.length} × ${M[0].length}.`);
  }
}

export const getTransposeFrac = (A: Frac[][]): Frac[][] => A[0].map((_, c) => A.map(row => row[c]));
export const getTraceFrac = (A: Frac[][]): Frac => A.reduce((s, row, i) => s.add(row[i]), F0);
export const dotProductFrac = (u: Frac[], v: Frac[]): Frac =>
  u.reduce((s, x, i) => s.add(x.mul(v[i] ?? F0)), F0);

function mulMat(A: Frac[][], B: Frac[][]): Frac[][] {
  if (A[0].length !== B.length) {
    throw new Error(`Columns of A (${A[0].length}) must equal rows of B (${B.length}) for multiplication.`);
  }
  return A.map(rowA => B[0].map((_, j) => rowA.reduce((s, v, k) => s.add(v.mul(B[k][j])), F0)));
}

const matEquals = (A: Frac[][], B: Frac[][]): boolean =>
  A.length === B.length && A.every((r, i) => r.length === B[i].length && r.every((v, j) => v.equals(B[i][j])));

/** "R2 ← R2 − 3·R1" */
const rowOp = (k: number, p: number, f: Frac): string => {
  const sign = f.isNegative() ? '+' : '-';
  const a = f.abs();
  return `R${k + 1} ← R${k + 1} ${sign} ${a.isOne() ? '' : a.toFactorString() + '·'}R${p + 1}`;
};

/** c + Σ coef·name, printed nicely (e.g. "3 - 2·t₁ + t₂"). */
function linearExpr(c: Frac, terms: { coef: Frac; name: string }[]): string {
  const parts: string[] = [];
  if (!c.isZero()) parts.push(c.toString());
  for (const { coef, name } of terms) {
    if (coef.isZero()) continue;
    const a = coef.abs();
    const body = (a.isOne() ? '' : a.isInteger() ? `${a.toString()}·` : `(${a.toString()})·`) + name;
    if (parts.length === 0) parts.push(coef.isNegative() ? `-${body}` : body);
    else parts.push(`${coef.isNegative() ? '-' : '+'} ${body}`);
  }
  return parts.length ? parts.join(' ') : '0';
}

function polyStr(c: Frac[], v = 'λ'): string {
  const parts: string[] = [];
  for (let i = c.length - 1; i >= 0; i--) {
    const a = c[i];
    if (a.isZero()) continue;
    const abs = a.abs();
    let body: string;
    if (i === 0) body = abs.toString();
    else {
      const coef = abs.isOne() ? '' : abs.isInteger() ? abs.toString() : `(${abs.toString()})`;
      body = coef + (i === 1 ? v : `${v}${sup(i)}`);
    }
    if (parts.length === 0) parts.push(a.isNegative() ? `-${body}` : body);
    else parts.push(`${a.isNegative() ? '-' : '+'} ${body}`);
  }
  return parts.length ? parts.join(' ') : '0';
}

function buildVerification(A: Frac[][], x: Frac[], B: Frac[]): { equations: string[]; passed: boolean } {
  const equations: string[] = [];
  let passed = true;
  for (let i = 0; i < A.length; i++) {
    let sum = F0;
    const terms: string[] = [];
    for (let j = 0; j < A[i].length; j++) {
      sum = sum.add(A[i][j].mul(x[j]));
      terms.push(`(${fmt(A[i][j])})·(${fmt(x[j])})`);
    }
    const ok = sum.equals(B[i]);
    if (!ok) passed = false;
    equations.push(`Eq${i + 1}: ${terms.join(' + ')} = ${fmt(sum)} ${ok ? '✓' : `≠ ${fmt(B[i])} ✗`}`);
  }
  return { equations, passed };
}

/** √x for a non-negative fraction, simplified: 2√3, √5/2, 3/2 ... */
function sqrtExpr(x: Frac): string {
  const [out0, inner] = simplifySqrt(x.n * x.d);
  let out = out0;
  let d = x.d;
  if (inner === 1n) return new Frac(out, d).toString();
  const g = gcdBigInt(out, d);
  out /= g;
  d /= g;
  const num = (out === 1n ? '' : `${out}`) + `√${inner}`;
  return d === 1n ? num : `${num}/${d}`;
}

const initStep = (
  mat: Frac[][], aug: Frac[][] | null, title: string, description: string, badge: string
): MathStep => ({
  title,
  description,
  operationBadge: badge,
  fracMatrix: cloneM(mat),
  augMatrix: aug ? cloneM(aug) : undefined,
  status: 'info'
});

// ==========================================
// 1. Core elimination engine (shared by RREF, systems, rank, inverse, eigen, ...)
// ==========================================
interface EngineResult {
  mat: Frac[][];
  aug: Frac[][] | null;
  pivotCols: number[];
  rowOfPivotCol: Record<number, number>;
  steps: MathStep[];
}

function rrefEngine(
  A: Frac[][],
  aug: Frac[][] | null,
  o: { record: boolean; jordan: boolean }
): EngineResult {
  const mat = cloneM(A);
  const ag = aug ? cloneM(aug) : null;
  const rows = mat.length;
  const cols = mat[0].length;
  const steps: MathStep[] = [];
  const push = (s: MathStep) => {
    if (o.record) steps.push({ ...s, fracMatrix: cloneM(mat), augMatrix: ag ? cloneM(ag) : undefined });
  };
  const pivotCols: number[] = [];
  const rowOfPivotCol: Record<number, number> = {};
  let pr = 0;

  for (let col = 0; col < cols && pr < rows; col++) {
    // 1) choose a pivot: prefer ±1 (no fractions), otherwise the first non-zero entry
    let sel = -1;
    if (mat[pr][col].isOne() || mat[pr][col].isNegOne()) sel = pr;
    if (sel === -1) {
      for (let r = pr + 1; r < rows; r++) {
        if (mat[r][col].isOne() || mat[r][col].isNegOne()) { sel = r; break; }
      }
    }
    if (sel === -1) {
      for (let r = pr; r < rows; r++) {
        if (!mat[r][col].isZero()) { sel = r; break; }
      }
    }

    if (sel === -1) {
      push({
        title: `No pivot in column ${col + 1}`,
        description: `Every entry of column ${col + 1} from row ${pr + 1} downward is 0, so this column has no pivot. It corresponds to a free variable (${getVarName(col)}). Move on to the next column.`,
        operationBadge: `col ${col + 1}: no pivot`,
        highlightCols: [col],
        status: 'info'
      });
      continue;
    }

    // 2) swap if needed
    if (sel !== pr) {
      const wasZero = mat[pr][col].isZero();
      [mat[sel], mat[pr]] = [mat[pr], mat[sel]];
      if (ag) [ag[sel], ag[pr]] = [ag[pr], ag[sel]];
      const unit = mat[pr][col].isOne() || mat[pr][col].isNegOne();
      const why = wasZero
        ? `The entry at (${pr + 1}, ${col + 1}) is 0, so a row with a non-zero entry must be brought up to serve as the pivot.`
        : `Row ${pr + 1} was swapped with a row that has ±1 in column ${col + 1}, which gives a pivot without introducing fractions.`;
      push({
        title: `Swap R${pr + 1} ↔ R${sel + 1}`,
        description: `${why}${wasZero && unit ? ' The new pivot is ±1, which is the easiest to work with.' : ''}`,
        operationBadge: `R${pr + 1} ↔ R${sel + 1}`,
        highlightRows: [pr, sel],
        pivotCell: [pr, col],
        status: 'swap'
      });
    }

    // 3) normalise (Gauss-Jordan only)
    const pv = mat[pr][col];
    if (o.jordan && !pv.isOne()) {
      for (let j = 0; j < cols; j++) mat[pr][j] = mat[pr][j].div(pv);
      if (ag) for (let j = 0; j < ag[pr].length; j++) ag[pr][j] = ag[pr][j].div(pv);
      push({
        title: `Scale R${pr + 1} to get a leading 1`,
        description: `The pivot at (${pr + 1}, ${col + 1}) is ${fmt(pv)}. Divide the whole row (including the right-hand side) by ${fmt(pv)} so the pivot becomes 1.`,
        operationBadge: `R${pr + 1} ← R${pr + 1} ÷ ${pv.toFactorString()}`,
        highlightRows: [pr],
        pivotCell: [pr, col],
        status: 'pivot'
      });
    }

    // 4) eliminate
    const piv = mat[pr][col];
    const ops: string[] = [];
    const affected: number[] = [];
    for (let k = o.jordan ? 0 : pr + 1; k < rows; k++) {
      if (k === pr || mat[k][col].isZero()) continue;
      const f = mat[k][col].div(piv);
      for (let j = 0; j < cols; j++) mat[k][j] = mat[k][j].sub(f.mul(mat[pr][j]));
      if (ag) for (let j = 0; j < ag[k].length; j++) ag[k][j] = ag[k][j].sub(f.mul(ag[pr][j]));
      ops.push(rowOp(k, pr, f));
      affected.push(k);
    }
    if (ops.length > 0) {
      push({
        title: `Eliminate column ${col + 1}`,
        description: `Use the pivot ${fmt(piv)} in R${pr + 1} to create zeros ${o.jordan ? 'above and below' : 'below'} it in column ${col + 1}. Each operation subtracts (entry ÷ pivot) times the pivot row.`,
        operationBadge: ops.join(' ; '),
        highlightRows: affected,
        pivotCell: [pr, col],
        status: 'eliminate'
      });
    }

    pivotCols.push(col);
    rowOfPivotCol[col] = pr;
    pr++;
  }
  return { mat, aug: ag, pivotCols, rowOfPivotCol, steps };
}

export function nullSpaceBasis(
  rref: Frac[][], pivotCols: number[], rowOf: Record<number, number>, cols: number
): Frac[][] {
  const free = range(cols).filter(c => !pivotCols.includes(c));
  return free.map(f => {
    const v: Frac[] = range(cols).map(() => F0);
    v[f] = F1;
    for (const pc of pivotCols) v[pc] = rref[rowOf[pc]][f].neg();
    return v;
  });
}

// ==========================================
// 2. Determinant, transpose, trace, symmetry, cofactors, inverse
// ==========================================
export function getDeterminantFrac(M: Frac[][]): Frac {
  assertSquare(M, 'Determinant');
  const a = cloneM(M);
  const n = a.length;
  let det = F1;
  for (let c = 0; c < n; c++) {
    let p = -1;
    for (let r = c; r < n; r++) if (!a[r][c].isZero()) { p = r; break; }
    if (p === -1) return F0;
    if (p !== c) { [a[p], a[c]] = [a[c], a[p]]; det = det.neg(); }
    det = det.mul(a[c][c]);
    for (let r = c + 1; r < n; r++) {
      if (a[r][c].isZero()) continue;
      const f = a[r][c].div(a[c][c]);
      for (let j = c; j < n; j++) a[r][j] = a[r][j].sub(f.mul(a[c][j]));
    }
  }
  return det;
}

const minorOf = (M: Frac[][], i: number, j: number): Frac[][] =>
  M.filter((_, r) => r !== i).map(row => row.filter((_, c) => c !== j));

export function getDeterminantSteps(A: Mat): MathStep[] {
  const mat = toFracMatrix(A);
  assertSquare(mat, 'Determinant');
  const n = mat.length;
  const steps: MathStep[] = [
    { title: 'Matrix A', description: `Compute |A| for a ${n}×${n} matrix.`, operationBadge: 'det(A)', fracMatrix: cloneM(mat), status: 'info' }
  ];

  if (n === 1) {
    steps.push({ title: '1×1 determinant', description: `|A| = a₁₁ = ${fmt(mat[0][0])}`, resultText: `|A| = ${fmt(mat[0][0])}`, status: 'success' });
    return steps;
  }
  if (n === 2) {
    const ad = mat[0][0].mul(mat[1][1]);
    const bc = mat[0][1].mul(mat[1][0]);
    const det = ad.sub(bc);
    steps.push({
      title: '2×2 formula: ad − bc',
      description: `|A| = a₁₁·a₂₂ − a₁₂·a₂₁\n|A| = (${fmt(mat[0][0])})(${fmt(mat[1][1])}) − (${fmt(mat[0][1])})(${fmt(mat[1][0])}) = ${fmt(ad)} − (${fmt(bc)}) = ${fmt(det)}`,
      operationBadge: `ad − bc = ${fmt(det)}`,
      resultText: `|A| = ${fmt(det)}`,
      status: det.isZero() ? 'warning' : 'success'
    });
    return steps;
  }

  // choose the row/column with the most zeros
  let best = { isRow: true, idx: 0, zeros: -1 };
  for (let i = 0; i < n; i++) {
    const zr = mat[i].filter(x => x.isZero()).length;
    if (zr > best.zeros) best = { isRow: true, idx: i, zeros: zr };
    const zc = mat.map(r => r[i]).filter(x => x.isZero()).length;
    if (zc > best.zeros) best = { isRow: false, idx: i, zeros: zc };
  }
  steps.push({
    title: `Choose ${best.isRow ? 'row' : 'column'} ${best.idx + 1} for cofactor expansion`,
    description: `${best.isRow ? 'Row' : 'Column'} ${best.idx + 1} has the most zeros (${best.zeros}). Every zero entry kills its whole term, so fewer minors have to be computed.\nFormula: |A| = Σ aᵢⱼ · (−1)^(i+j) · Mᵢⱼ`,
    operationBadge: `expand ${best.isRow ? 'R' : 'C'}${best.idx + 1}`,
    fracMatrix: cloneM(mat),
    highlightRows: best.isRow ? [best.idx] : undefined,
    highlightCols: best.isRow ? undefined : [best.idx],
    status: 'info'
  });

  const terms: string[] = [];
  let total = F0;
  for (let k = 0; k < n; k++) {
    const r = best.isRow ? best.idx : k;
    const c = best.isRow ? k : best.idx;
    const elem = mat[r][c];
    if (elem.isZero()) continue;
    const positive = (r + c) % 2 === 0;
    const minor = minorOf(mat, r, c);
    const mDet = getDeterminantFrac(minor);
    const term = (positive ? F1 : F1.neg()).mul(elem).mul(mDet);
    total = total.add(term);
    terms.push(`${positive ? '+' : '-'} (${fmt(elem)})(${fmt(mDet)})`);
    steps.push({
      title: `Term a${sub(r + 1)}${sub(c + 1)} = ${fmt(elem)}`,
      description: `Sign = (−1)^(${r + 1}+${c + 1}) = ${positive ? '+1' : '−1'}\nMinor M${sub(r + 1)}${sub(c + 1)} = delete row ${r + 1} and column ${c + 1}, then |M| = ${fmt(mDet)}\nTerm = (${positive ? '+' : '−'}1)·(${fmt(elem)})·(${fmt(mDet)}) = ${fmt(term)}`,
      operationBadge: `${fmt(term)}`,
      fracMatrix: minor,
      matrixLabel: `Minor M${sub(r + 1)}${sub(c + 1)}`,
      status: 'eliminate'
    });
  }

  const check = getDeterminantFrac(mat);
  steps.push({
    title: 'Add the terms',
    description: `|A| = ${terms.length ? terms.join(' ') : '0'} = ${fmt(total)}\nCross-check with row reduction: ${fmt(check)} ${check.equals(total) ? '✓' : '✗'}\n${total.isZero() ? '⚠ |A| = 0: the matrix is singular (no inverse, rank < n, columns are linearly dependent).' : '✓ |A| ≠ 0: the matrix is invertible (rank = n, columns are linearly independent).'}`,
    operationBadge: `|A| = ${fmt(total)}`,
    resultText: `|A| = ${fmt(total)}`,
    status: total.isZero() ? 'warning' : 'success'
  });
  return steps;
}

export function getCofactorMatrixFrac(A: Frac[][]): Frac[][] {
  assertSquare(A, 'Cofactor matrix');
  if (A.length === 1) return [[F1]];
  return A.map((row, i) =>
    row.map((_, j) => {
      const d = getDeterminantFrac(minorOf(A, i, j));
      return (i + j) % 2 === 0 ? d : d.neg();
    })
  );
}

export function getInverseFrac(A: Frac[][]): Frac[][] {
  const det = getDeterminantFrac(A);
  if (det.isZero()) throw new Error('Matrix is singular (|A| = 0): no inverse exists.');
  if (A.length === 1) return [[F1.div(A[0][0])]];
  return getTransposeFrac(getCofactorMatrixFrac(A)).map(row => row.map(v => v.div(det)));
}

export function getCofactorSteps(A: Mat): MathStep[] {
  const mat = toFracMatrix(A);
  assertSquare(mat, 'Cofactor matrix');
  const cof = getCofactorMatrixFrac(mat);
  return [
    { title: 'Matrix A', fracMatrix: cloneM(mat), operationBadge: 'A', status: 'info' },
    {
      title: 'Cofactor matrix C',
      description: 'Cᵢⱼ = (−1)^(i+j) · Mᵢⱼ, where Mᵢⱼ is the determinant after deleting row i and column j.\nSign pattern: + − + − … (checkerboard starting with + in the top-left).',
      operationBadge: 'C = [Cᵢⱼ]',
      fracMatrix: cof,
      status: 'success'
    }
  ];
}

export function getInverseSteps(A: Mat): MathStep[] {
  const mat = toFracMatrix(A);
  assertSquare(mat, 'Inverse');
  const det = getDeterminantFrac(mat);
  const steps: MathStep[] = [{
    title: 'Step 1: Check invertibility',
    description: `|A| = ${fmt(det)}. ${det.isZero() ? '⚠ |A| = 0, so A is singular and has NO inverse.' : '|A| ≠ 0, so A⁻¹ exists.'}`,
    operationBadge: `|A| = ${fmt(det)}`,
    fracMatrix: cloneM(mat),
    status: det.isZero() ? 'error' : 'info',
    resultText: det.isZero() ? 'A is singular: no inverse' : undefined
  }];
  if (det.isZero()) return steps;

  const cof = getCofactorMatrixFrac(mat);
  steps.push({
    title: 'Step 2: Cofactor matrix C',
    description: 'Cᵢⱼ = (−1)^(i+j) · Mᵢⱼ for every entry.',
    operationBadge: 'C = [Cᵢⱼ]',
    fracMatrix: cof,
    status: 'eliminate'
  });
  const adj = getTransposeFrac(cof);
  steps.push({
    title: 'Step 3: Adjugate adj(A) = Cᵀ',
    description: 'Transpose the cofactor matrix (swap rows and columns).',
    operationBadge: 'adj(A) = Cᵀ',
    fracMatrix: adj,
    status: 'swap'
  });
  const inv = getInverseFrac(mat);
  const prod = mulMat(mat, inv);
  const ok = matEquals(prod, identity(mat.length));
  steps.push({
    title: 'Step 4: A⁻¹ = (1/|A|) · adj(A)',
    description: `Multiply every entry of adj(A) by 1/(${fmt(det)}).\nCheck: A·A⁻¹ = I ${ok ? '✓' : '✗'}`,
    operationBadge: `A⁻¹ = (1/${fmt(det)})·adj(A)`,
    fracMatrix: inv,
    matrixLabel: 'A⁻¹',
    extraMatrices: [{ label: 'A · A⁻¹', matrix: prod }],
    verification: { equations: [`A·A⁻¹ = I ${ok ? '✓' : '✗'}`], passed: ok },
    status: 'success'
  });
  return steps;
}

export function getInverseGaussJordanSteps(A: Mat): MathStep[] {
  const mat = toFracMatrix(A);
  assertSquare(mat, 'Inverse');
  const n = mat.length;
  const id = identity(n);
  const steps: MathStep[] = [
    initStep(mat, id, 'Form [A | I]', 'Write the identity matrix next to A. Row operations that turn A into I will turn I into A⁻¹.', '[A | I]')
  ];
  const eng = rrefEngine(mat, id, { record: true, jordan: true });
  steps.push(...eng.steps);
  if (eng.pivotCols.length < n) {
    steps.push({
      title: 'A is singular',
      description: `Only ${eng.pivotCols.length} pivots were found (need ${n}). A cannot be reduced to I, so A⁻¹ does not exist.`,
      fracMatrix: cloneM(eng.mat),
      augMatrix: eng.aug ? cloneM(eng.aug) : undefined,
      status: 'error',
      resultText: 'A is singular: no inverse'
    });
    return steps;
  }
  const inv = eng.aug!;
  const ok = matEquals(mulMat(mat, inv), identity(n));
  steps.push({
    title: 'Read A⁻¹ from the right block',
    description: `The left block is now I, so the right block is A⁻¹.\nCheck: A·A⁻¹ = I ${ok ? '✓' : '✗'}`,
    fracMatrix: inv,
    matrixLabel: 'A⁻¹',
    verification: { equations: [`A·A⁻¹ = I ${ok ? '✓' : '✗'}`], passed: ok },
    status: 'success'
  });
  return steps;
}

export function getTransposeSteps(A: Mat): MathStep[] {
  const mat = toFracMatrix(A);
  assertRect(mat);
  return [
    { title: 'Matrix A', fracMatrix: cloneM(mat), operationBadge: 'A', status: 'info' },
    {
      title: 'Transpose Aᵀ',
      description: 'Row i of A becomes column i of Aᵀ, i.e. (Aᵀ)ⱼᵢ = Aᵢⱼ.',
      operationBadge: 'Aᵀ',
      fracMatrix: getTransposeFrac(mat),
      status: 'success'
    }
  ];
}

export function getTraceSteps(A: Mat): MathStep[] {
  const mat = toFracMatrix(A);
  assertSquare(mat, 'Trace');
  const tr = getTraceFrac(mat);
  return [{
    title: 'Trace of A',
    description: `Trace = sum of the main-diagonal entries\nTr(A) = ${mat.map((r, i) => fmt(r[i])).join(' + ')} = ${fmt(tr)}\nTr(A) also equals the sum of the eigenvalues.`,
    operationBadge: `Tr(A) = ${fmt(tr)}`,
    fracMatrix: cloneM(mat),
    resultText: `Trace(A) = ${fmt(tr)}`,
    status: 'success'
  }];
}

export function getSymmetrySteps(A: Mat): MathStep[] {
  const mat = toFracMatrix(A);
  assertSquare(mat, 'Symmetry check');
  const t = getTransposeFrac(mat);
  const diffs: string[] = [];
  for (let i = 0; i < mat.length; i++) {
    for (let j = i + 1; j < mat.length; j++) {
      if (!mat[i][j].equals(mat[j][i])) diffs.push(`a${sub(i + 1)}${sub(j + 1)} = ${fmt(mat[i][j])} but a${sub(j + 1)}${sub(i + 1)} = ${fmt(mat[j][i])}`);
    }
  }
  const sym = diffs.length === 0;
  return [{
    title: 'Compare A with Aᵀ',
    description: sym ? 'A = Aᵀ: every aᵢⱼ equals aⱼᵢ. ✓' : `A ≠ Aᵀ:\n${diffs.slice(0, 6).join('\n')}`,
    operationBadge: sym ? 'A = Aᵀ ✓' : 'A ≠ Aᵀ ✗',
    fracMatrix: cloneM(mat),
    extraMatrices: [{ label: 'Aᵀ', matrix: t }],
    resultText: sym ? '✓ Matrix is SYMMETRIC' : '✗ Matrix is NOT symmetric',
    status: sym ? 'success' : 'warning'
  }];
}

export function operateMatricesFrac(A: Frac[][], B: Frac[][], op: 'add' | 'sub' | 'mul'): Frac[][] {
  if (op === 'add' || op === 'sub') {
    if (A.length !== B.length || A[0].length !== B[0].length) {
      throw new Error(`Dimensions must match for ${op === 'add' ? 'addition' : 'subtraction'}: A is ${A.length}×${A[0].length}, B is ${B.length}×${B[0].length}.`);
    }
    return A.map((row, i) => row.map((v, j) => (op === 'add' ? v.add(B[i][j]) : v.sub(B[i][j]))));
  }
  return mulMat(A, B);
}

export function getOperationSteps(A: Mat, B: Mat, op: 'add' | 'sub' | 'mul'): MathStep[] {
  const a = toFracMatrix(A);
  const b = toFracMatrix(B);
  const res = operateMatricesFrac(a, b, op);
  const sym = op === 'add' ? '+' : op === 'sub' ? '−' : '×';
  const lines: string[] = [];
  outer: for (let i = 0; i < res.length; i++) {
    for (let j = 0; j < res[0].length; j++) {
      if (lines.length >= 16) { lines.push('…'); break outer; }
      if (op === 'mul') {
        const t = a[i].map((v, k) => `(${fmt(v)})(${fmt(b[k][j])})`).join(' + ');
        lines.push(`c${i + 1}${j + 1} = ${t} = ${fmt(res[i][j])}`);
      } else {
        lines.push(`c${i + 1}${j + 1} = ${fmt(a[i][j])} ${sym} (${fmt(b[i][j])}) = ${fmt(res[i][j])}`);
      }
    }
  }
  return [
    {
      title: 'Inputs',
      description: op === 'mul' ? `A is ${a.length}×${a[0].length}, B is ${b.length}×${b[0].length} → A·B is ${res.length}×${res[0].length}.` : `Both matrices are ${a.length}×${a[0].length}; operate entry by entry.`,
      fracMatrix: a,
      matrixLabel: 'A',
      extraMatrices: [{ label: 'B', matrix: b }],
      operationBadge: `A ${sym} B`,
      status: 'info'
    },
    {
      title: `Result of A ${sym} B`,
      description: (op === 'mul' ? 'cᵢⱼ = (row i of A) • (column j of B)\n' : '') + lines.join('\n'),
      fracMatrix: res,
      matrixLabel: `A ${sym} B`,
      status: 'success'
    }
  ];
}

// ==========================================
// 3. RREF, rank, subspaces, independence
// ==========================================
export function getRREFSteps(A: Mat): MathStep[] {
  const mat = toFracMatrix(A);
  assertRect(mat);
  const rows = mat.length;
  const cols = mat[0].length;
  const steps: MathStep[] = [initStep(mat, null, 'Starting matrix', `A ${rows}×${cols} matrix. Goal: Reduced Row Echelon Form (leading 1s, zeros above and below every pivot).`, 'Start')];
  const eng = rrefEngine(mat, null, { record: true, jordan: true });
  steps.push(...eng.steps);
  const rank = eng.pivotCols.length;
  steps.push({
    title: 'RREF reached',
    description: `Pivot columns: ${eng.pivotCols.map(c => c + 1).join(', ') || 'none'}\nRank(A) = number of pivots = ${rank}\nNullity(A) = columns − rank = ${cols} − ${rank} = ${cols - rank}\nRank-Nullity theorem: ${rank} + ${cols - rank} = ${cols} ✓`,
    operationBadge: `Rank = ${rank}, Nullity = ${cols - rank}`,
    fracMatrix: cloneM(eng.mat),
    highlightCols: eng.pivotCols,
    resultText: `Rank(A) = ${rank}   |   Nullity(A) = ${cols - rank}`,
    status: 'success'
  });
  return steps;
}

export const getRankFrac = (A: Frac[][]): number =>
  rrefEngine(A, null, { record: false, jordan: true }).pivotCols.length;

export const getNullityFrac = (A: Frac[][]): number => A[0].length - getRankFrac(A);

export function getSubspaceSteps(A: Mat): MathStep[] {
  const mat = toFracMatrix(A);
  assertRect(mat);
  const rows = mat.length;
  const cols = mat[0].length;
  const eng = rrefEngine(mat, null, { record: false, jordan: true });
  const rank = eng.pivotCols.length;
  const steps: MathStep[] = [];

  steps.push({
    title: 'Step 1: Reduce A to RREF',
    description: `Pivot columns: ${eng.pivotCols.map(c => c + 1).join(', ') || 'none'}. Rank = ${rank}.\nUse the Gauss-Jordan operation to see every row operation.`,
    fracMatrix: cloneM(eng.mat),
    highlightCols: eng.pivotCols,
    operationBadge: 'RREF(A)',
    status: 'info'
  });

  const colBasis = eng.pivotCols.map(c => mat.map(r => r[c]));
  steps.push({
    title: 'Step 2: Basis of the Column Space Col(A)',
    description: `Take the columns of the ORIGINAL matrix A that sit in the pivot positions (columns ${eng.pivotCols.map(c => c + 1).join(', ') || '—'}).\ndim Col(A) = ${rank}`,
    fracMatrix: colBasis.length ? fromColumns(colBasis) : undefined,
    matrixLabel: 'Basis vectors as columns',
    operationBadge: `dim = ${rank}`,
    status: 'success'
  });

  const rowBasis = eng.mat.filter(r => r.some(v => !v.isZero()));
  steps.push({
    title: 'Step 3: Basis of the Row Space Row(A)',
    description: `The non-zero rows of the RREF form a basis of the row space.\ndim Row(A) = ${rank} (always equal to dim Col(A)).`,
    fracMatrix: rowBasis.length ? rowBasis : undefined,
    matrixLabel: 'Basis vectors as rows',
    operationBadge: `dim = ${rank}`,
    status: 'success'
  });

  const nb = nullSpaceBasis(eng.mat, eng.pivotCols, eng.rowOfPivotCol, cols);
  steps.push({
    title: 'Step 4: Basis of the Null Space Null(A)',
    description: nb.length
      ? `Solve A·x = 0. Each free variable gives one basis vector (set it to 1, the other free variables to 0, solve for the pivot variables).\n${nb.map((v, i) => `n${sub(i + 1)} = ${vecStr(v)}`).join('\n')}`
      : 'There are no free variables, so Null(A) = {0}.',
    fracMatrix: nb.length ? fromColumns(nb) : undefined,
    matrixLabel: 'Basis vectors as columns',
    operationBadge: `dim = ${nb.length}`,
    status: 'success'
  });

  steps.push({
    title: 'Step 5: Rank-Nullity theorem',
    description: `rank(A) + nullity(A) = ${rank} + ${nb.length} = ${cols} = number of columns ✓\ndim Col(A) = dim Row(A) = ${rank}\nLeft null space has dimension ${rows} − ${rank} = ${rows - rank}.`,
    resultText: `Rank = ${rank}   |   Nullity = ${nb.length}`,
    status: 'success'
  });
  return steps;
}

export function getIndependenceSteps(A: Mat): MathStep[] {
  const mat = toFracMatrix(A);
  assertRect(mat);
  const cols = mat[0].length;
  const steps = getRREFSteps(A).slice(0, -1);
  const eng = rrefEngine(mat, null, { record: false, jordan: true });
  const rank = eng.pivotCols.length;
  if (rank === cols) {
    steps.push({
      title: 'Columns are linearly INDEPENDENT',
      description: `Every column has a pivot (rank = ${rank} = number of vectors), so A·x = 0 has only the trivial solution x = 0.`,
      fracMatrix: cloneM(eng.mat),
      highlightCols: eng.pivotCols,
      operationBadge: 'independent ✓',
      resultText: '✓ Linearly independent',
      status: 'success'
    });
  } else {
    const nb = nullSpaceBasis(eng.mat, eng.pivotCols, eng.rowOfPivotCol, cols);
    const rel = nb[0];
    const relation = rel.map((c, i) => (c.isZero() ? null : `(${fmt(c)})·v${sub(i + 1)}`)).filter(Boolean).join(' + ');
    steps.push({
      title: 'Columns are linearly DEPENDENT',
      description: `Only ${rank} pivots for ${cols} vectors, so there are free variables and A·x = 0 has non-trivial solutions.\nOne dependency relation:\n${relation} = 0\nPivot columns (${eng.pivotCols.map(c => c + 1).join(', ')}) form a maximal independent subset.`,
      fracMatrix: cloneM(eng.mat),
      highlightCols: eng.pivotCols,
      fracVector: rel,
      vectorLabel: 'coefficients',
      operationBadge: 'dependent ✗',
      resultText: '✗ Linearly dependent',
      status: 'warning'
    });
  }
  return steps;
}

// ==========================================
// 4. Eigenvalues, eigenvectors, diagonalization
// ==========================================
export function charPolyCoeffs(A: Frac[][]): Frac[] {
  const n = A.length;
  const coef: Frac[] = range(n + 1).map(() => F0);
  coef[n] = F1;
  let M = identity(n);
  for (let k = 1; k <= n; k++) {
    const AM = mulMat(A, M);
    const c = getTraceFrac(AM).neg().div(new Frac(BigInt(k)));
    coef[n - k] = c;
    M = AM.map((row, i) => row.map((v, j) => (i === j ? v.add(c) : v)));
  }
  return coef; // det(λI − A) = Σ coef[i] λ^i
}

const polyEval = (c: Frac[], x: Frac): Frac => {
  let r = F0;
  for (let i = c.length - 1; i >= 0; i--) r = r.mul(x).add(c[i]);
  return r;
};

function polyDeflate(c: Frac[], root: Frac): Frac[] {
  const n = c.length - 1;
  const q: Frac[] = new Array(n);
  let carry = F0;
  for (let i = n; i >= 1; i--) {
    carry = c[i].add(carry.mul(root));
    q[i - 1] = carry;
  }
  return q;
}

function divisorsOf(n: bigint): bigint[] {
  if (n < 0n) n = -n;
  if (n === 0n) return [];
  if (n > 10n ** 12n) return [1n, n];
  const N = Number(n);
  const out: bigint[] = [];
  for (let i = 1; i * i <= N; i++) {
    if (N % i === 0) {
      out.push(BigInt(i));
      if (i * i !== N) out.push(BigInt(N / i));
    }
  }
  return out;
}

function findRationalRoots(coef: Frac[]): { roots: { value: Frac; mult: number }[]; remainder: Frac[] } {
  let p = [...coef];
  const roots: { value: Frac; mult: number }[] = [];
  const add = (r: Frac) => {
    const e = roots.find(x => x.value.equals(r));
    if (e) e.mult++;
    else roots.push({ value: r, mult: 1 });
  };
  while (p.length > 1) {
    if (p[0].isZero()) { add(F0); p = p.slice(1); continue; }
    let L = 1n;
    for (const x of p) L = lcmBig(L, x.d);
    const ints = p.map(x => x.n * (L / x.d));
    const a0 = ints[0] < 0n ? -ints[0] : ints[0];
    const an = ints[ints.length - 1] < 0n ? -ints[ints.length - 1] : ints[ints.length - 1];
    let found: Frac | null = null;
    outer: for (const q of divisorsOf(an)) {
      for (const s of divisorsOf(a0)) {
        for (const sg of [1n, -1n]) {
          const cand = new Frac(sg * s, q);
          if (polyEval(p, cand).isZero()) { found = cand; break outer; }
        }
      }
    }
    if (!found) break;
    add(found);
    p = polyDeflate(p, found);
  }
  roots.sort((x, y) => x.value.cmp(y.value));
  return { roots, remainder: p };
}

function quadraticRoots(p: Frac[]): { complex: boolean; r1: string; r2: string; approx: string; disc: string } {
  let L = 1n;
  for (const x of p) L = lcmBig(L, x.d);
  const [c, b, a] = p.map(x => x.n * (L / x.d));
  const D = b * b - 4n * a * c;
  const [out, inner] = simplifySqrt(D < 0n ? -D : D);
  let P = -b;
  let S = 2n * a;
  if (S < 0n) { P = -P; S = -S; }
  const g = gcdBigInt(gcdBigInt(P, out), S);
  P /= g;
  const Q = out / g;
  S /= g;
  const complex = D < 0n;
  const rad = (inner === 1n ? '' : `√${inner}`) + (complex ? 'i' : '');
  const radical = (Q === 1n && rad ? '' : `${Q}`) + rad;
  const build = (sg: '+' | '-') => {
    const num = P === 0n ? (sg === '+' ? radical : `-${radical}`) : `${P} ${sg} ${radical}`;
    if (S === 1n) return num;
    return P === 0n ? `${num}/${S}` : `(${num})/${S}`;
  };
  const re = -Number(b) / (2 * Number(a));
  const im = Math.sqrt(Math.abs(Number(D))) / (2 * Math.abs(Number(a)));
  const approx = complex
    ? `≈ ${re.toFixed(4)} ± ${im.toFixed(4)}i`
    : `≈ ${(re + im).toFixed(4)} , ${(re - im).toFixed(4)}`;
  return { complex, r1: build('+'), r2: build('-'), approx, disc: `${D}` };
}

/** Durand–Kerner: numeric roots of a real polynomial (used only for leftover factors of degree ≥ 3). */
function numericRoots(c: number[]): { re: number; im: number }[] {
  const n = c.length - 1;
  const lead = c[n];
  const a = c.map(x => x / lead);
  const R = 1 + Math.max(...a.slice(0, n).map(Math.abs));
  const z = range(n).map(k => ({ re: R * Math.cos((2 * Math.PI * k) / n + 0.4), im: R * Math.sin((2 * Math.PI * k) / n + 0.4) }));
  const mul = (x: { re: number; im: number }, y: { re: number; im: number }) => ({ re: x.re * y.re - x.im * y.im, im: x.re * y.im + x.im * y.re });
  const div = (x: { re: number; im: number }, y: { re: number; im: number }) => {
    const d = y.re * y.re + y.im * y.im || 1e-300;
    return { re: (x.re * y.re + x.im * y.im) / d, im: (x.im * y.re - x.re * y.im) / d };
  };
  for (let it = 0; it < 500; it++) {
    for (let i = 0; i < n; i++) {
      let pv = { re: 0, im: 0 };
      for (let k = n; k >= 0; k--) {
        pv = mul(pv, z[i]);
        pv.re += a[k];
      }
      let den = { re: 1, im: 0 };
      for (let j = 0; j < n; j++) if (j !== i) den = mul(den, { re: z[i].re - z[j].re, im: z[i].im - z[j].im });
      const delta = div(pv, den);
      z[i] = { re: z[i].re - delta.re, im: z[i].im - delta.im };
    }
  }
  return z;
}

export function getEigenSteps(A: Mat): MathStep[] {
  const mat = toFracMatrix(A);
  assertSquare(mat, 'Eigenvalues / eigenvectors');
  const n = mat.length;
  const steps: MathStep[] = [];

  steps.push({
    title: 'Goal',
    description: 'Find all λ and non-zero v with A·v = λ·v. This is equivalent to (A − λI)·v = 0 having a non-trivial solution, i.e. det(A − λI) = 0.',
    operationBadge: 'A·v = λ·v',
    fracMatrix: cloneM(mat),
    status: 'info'
  });

  const coef = charPolyCoeffs(mat);
  const tr = getTraceFrac(mat);
  const det = getDeterminantFrac(mat);
  steps.push({
    title: 'Step 1: Characteristic polynomial',
    description: `p(λ) = det(λI − A) = ${polyStr(coef)}\n(Computed exactly with the Faddeev–LeVerrier method; it has the same roots as det(A − λI).)\nChecks: sum of eigenvalues = Tr(A) = ${fmt(tr)}, product of eigenvalues = |A| = ${fmt(det)}.`,
    operationBadge: `p(λ) = ${polyStr(coef)}`,
    status: 'info'
  });

  const { roots, remainder } = findRationalRoots(coef);
  const rationalFactors = roots.map(r => `(λ ${r.value.isNegative() ? '+' : '−'} ${r.value.abs().toString()})${r.mult > 1 ? sup(r.mult) : ''}`.replace('λ − 0', 'λ').replace('λ + 0', 'λ'));
  const rem = remainder.length > 1 ? `(${polyStr(remainder)})` : '';
  steps.push({
    title: 'Step 2: Solve p(λ) = 0',
    description: `Rational-root theorem: any rational root is ± (divisor of the constant term) / (divisor of the leading coefficient).\np(λ) = ${[...rationalFactors, rem].filter(Boolean).join(' ') || '1'}\n${roots.length ? roots.map(r => `λ = ${fmt(r.value)}  (algebraic multiplicity ${r.mult})`).join('\n') : 'No rational eigenvalues.'}`,
    operationBadge: roots.length ? roots.map(r => `λ = ${fmt(r.value)}${r.mult > 1 ? ` (×${r.mult})` : ''}`).join(' ; ') : 'no rational roots',
    status: roots.length ? 'success' : 'warning'
  });

  let nonRational = false;
  if (remainder.length === 3) {
    nonRational = true;
    const q = quadraticRoots(remainder);
    steps.push({
      title: q.complex ? 'Complex eigenvalues (quadratic factor)' : 'Irrational eigenvalues (quadratic factor)',
      description: `Remaining factor: ${polyStr(remainder)}\nDiscriminant Δ = b² − 4ac = ${q.disc} ${q.complex ? '< 0 → complex conjugate pair' : '> 0, not a perfect square → irrational pair'}\nλ = ${q.r1}\nλ = ${q.r2}\n${q.approx}`,
      operationBadge: `λ = ${q.r1} ; λ = ${q.r2}`,
      status: 'warning'
    });
  } else if (remainder.length > 3) {
    nonRational = true;
    const nr = numericRoots(remainder.map(x => x.toNumber()));
    const txt = nr.map(z => (Math.abs(z.im) < 1e-7 ? z.re.toFixed(5) : `${z.re.toFixed(5)} ${z.im < 0 ? '-' : '+'} ${Math.abs(z.im).toFixed(5)}i`)).join('\n');
    steps.push({
      title: `Remaining factor of degree ${remainder.length - 1} has no rational roots`,
      description: `${polyStr(remainder)}\nNumerical approximations of its roots:\n${txt}`,
      operationBadge: 'numeric roots',
      status: 'warning'
    });
  }

  // eigenspaces for rational eigenvalues
  const basisAll: Frac[][] = [];
  const lambdas: Frac[] = [];
  let defective = false;
  for (const r of roots) {
    const lam = r.value;
    const M = mat.map((row, i) => row.map((v, j) => (i === j ? v.sub(lam) : v)));
    const eng = rrefEngine(M, null, { record: true, jordan: true });
    steps.push({
      title: `Eigenvectors for λ = ${fmt(lam)}: form A − λI`,
      description: `Subtract ${fmt(lam)} from every diagonal entry, then solve (A − λI)·v = 0 by row reduction.`,
      operationBadge: `A − (${fmt(lam)})·I`,
      fracMatrix: cloneM(M),
      status: 'info'
    });
    steps.push(...eng.steps.map(s => ({ ...s, title: `[λ = ${fmt(lam)}] ${s.title}` })));
    const basis = nullSpaceBasis(eng.mat, eng.pivotCols, eng.rowOfPivotCol, n);
    const geo = basis.length;
    const bad = geo < r.mult;
    if (bad) defective = true;
    basis.forEach(b => { basisAll.push(b); lambdas.push(lam); });
    steps.push({
      title: `Eigenspace E(${fmt(lam)})`,
      description: `${basis.map((b, i) => `v${sub(i + 1)} = ${vecStr(b)}`).join('\n')}\nGeometric multiplicity = ${geo}, algebraic multiplicity = ${r.mult}.${bad ? '\n⚠ Geometric < algebraic: this eigenvalue is defective, so A cannot be diagonalized.' : ''}\nAny non-zero combination of these vectors is an eigenvector for λ = ${fmt(lam)}.`,
      operationBadge: `dim E = ${geo}`,
      fracMatrix: fromColumns(basis),
      matrixLabel: 'Eigenvectors as columns',
      status: bad ? 'warning' : 'success'
    });
  }

  // diagonalization
  if (!nonRational && !defective && basisAll.length === n) {
    const P = fromColumns(basisAll);
    const D = zerosM(n, n);
    lambdas.forEach((l, i) => { D[i][i] = l; });
    const AP = mulMat(mat, P);
    const PD = mulMat(P, D);
    const ok = matEquals(AP, PD);
    const sym = matEquals(mat, getTransposeFrac(mat));
    const extra: { label: string; matrix: Frac[][] }[] = [{ label: 'D (eigenvalues)', matrix: D }];
    if (!getDeterminantFrac(P).isZero()) extra.push({ label: 'P⁻¹', matrix: getInverseFrac(P) });
    steps.push({
      title: 'Diagonalization A = P·D·P⁻¹',
      description: `A has ${n} linearly independent eigenvectors, so it is diagonalizable.\nP = eigenvectors as columns, D = diagonal matrix of the matching eigenvalues.\nCheck: A·P = P·D ${ok ? '✓' : '✗'}${sym ? '\nA is symmetric, so by the Spectral Theorem it is even orthogonally diagonalizable (eigenvectors of different eigenvalues are orthogonal).' : ''}`,
      operationBadge: 'A = P·D·P⁻¹',
      fracMatrix: P,
      matrixLabel: 'P',
      extraMatrices: extra,
      verification: { equations: [`A·P = P·D ${ok ? '✓' : '✗'}`], passed: ok },
      resultText: 'A is diagonalizable',
      status: 'success'
    });
  } else {
    const reason = nonRational
      ? 'A has irrational or complex eigenvalues, so it is not diagonalizable over the rationals (it may be over ℝ or ℂ).'
      : defective
        ? 'at least one eigenvalue has geometric multiplicity smaller than its algebraic multiplicity (defective).'
        : 'there are fewer than n independent eigenvectors.';
    steps.push({
      title: 'Diagonalizable?',
      description: `Not diagonalizable over ℚ: ${reason}`,
      resultText: 'Not diagonalizable over ℚ',
      status: 'warning'
    });
  }
  return steps;
}

export const getEigenvalues2x2 = getEigenSteps; // backwards-compatible alias

// ==========================================
// 5. LU decomposition (PA = LU)
// ==========================================
export function getLUSteps(A: Mat): MathStep[] {
  const mat = toFracMatrix(A);
  assertSquare(mat, 'LU decomposition');
  const n = mat.length;
  const U = cloneM(mat);
  const L = identity(n);
  const perm = range(n);
  let swaps = 0;
  const steps: MathStep[] = [{
    title: 'Setup: PA = LU',
    description: 'Run Gaussian elimination. U is the echelon form; the multipliers used are stored in L below its diagonal (L has 1s on the diagonal). If a zero pivot appears, rows are swapped (recorded in P).',
    operationBadge: 'PA = LU',
    fracMatrix: cloneM(U),
    matrixLabel: 'U (start = A)',
    extraMatrices: [{ label: 'L (start = I)', matrix: cloneM(L) }],
    status: 'info'
  }];

  for (let i = 0; i < n; i++) {
    if (U[i][i].isZero()) {
      let p = -1;
      for (let r = i + 1; r < n; r++) if (!U[r][i].isZero()) { p = r; break; }
      if (p === -1) {
        steps.push({ title: `No pivot in column ${i + 1}`, description: 'The column is zero from the diagonal down, so A is singular (|A| = 0). Continue with the next column.', fracMatrix: cloneM(U), highlightCols: [i], status: 'warning' });
        continue;
      }
      [U[i], U[p]] = [U[p], U[i]];
      [perm[i], perm[p]] = [perm[p], perm[i]];
      for (let j = 0; j < i; j++) [L[i][j], L[p][j]] = [L[p][j], L[i][j]];
      swaps++;
      steps.push({
        title: `Swap R${i + 1} ↔ R${p + 1}`,
        description: `The pivot at (${i + 1}, ${i + 1}) is 0, so a row swap is required. This is why we get PA = LU instead of A = LU.`,
        operationBadge: `R${i + 1} ↔ R${p + 1}`,
        fracMatrix: cloneM(U),
        highlightRows: [i, p],
        pivotCell: [i, i],
        extraMatrices: [{ label: 'L so far', matrix: cloneM(L) }],
        status: 'swap'
      });
    }
    const ops: string[] = [];
    const affected: number[] = [];
    for (let k = i + 1; k < n; k++) {
      if (U[k][i].isZero()) continue;
      const f = U[k][i].div(U[i][i]);
      L[k][i] = f;
      for (let j = i; j < n; j++) U[k][j] = U[k][j].sub(f.mul(U[i][j]));
      ops.push(`l${sub(k + 1)}${sub(i + 1)} = ${fmt(f)}  (${rowOp(k, i, f)})`);
      affected.push(k);
    }
    if (ops.length) {
      steps.push({
        title: `Eliminate below pivot (${i + 1}, ${i + 1})`,
        description: 'The multiplier l = (entry to eliminate) ÷ pivot is saved in L at the position of the zero it creates.',
        operationBadge: ops.join(' ; '),
        fracMatrix: cloneM(U),
        matrixLabel: 'U',
        extraMatrices: [{ label: 'L so far', matrix: cloneM(L) }],
        highlightRows: affected,
        pivotCell: [i, i],
        status: 'eliminate'
      });
    }
  }

  const P = zerosM(n, n);
  perm.forEach((src, i) => { P[i][src] = F1; });
  const PA = P.map((_, i) => mat[perm[i]]);
  const LU = mulMat(L, U);
  const ok = matEquals(PA, LU);
  steps.push({
    title: 'Result',
    description: `L is unit lower-triangular, U is upper-triangular${swaps ? `, and P records ${swaps} row swap${swaps > 1 ? 's' : ''}` : ' (no row swaps were needed, so P = I and A = LU)'}.\nCheck: ${swaps ? 'P·A' : 'A'} = L·U ${ok ? '✓' : '✗'}\n|A| = ${swaps % 2 ? '−' : ''}(product of the diagonal of U) = ${fmt(getDeterminantFrac(mat))}`,
    operationBadge: 'PA = LU',
    fracMatrix: L,
    matrixLabel: 'L',
    extraMatrices: [{ label: 'U', matrix: U }, ...(swaps ? [{ label: 'P', matrix: P }] : []), { label: swaps ? 'P·A' : 'A', matrix: PA }, { label: 'L·U', matrix: LU }],
    verification: { equations: [`${swaps ? 'PA' : 'A'} = LU ${ok ? '✓' : '✗'}`], passed: ok },
    resultText: 'LU decomposition found',
    status: ok ? 'success' : 'error'
  });
  return steps;
}

// ==========================================
// 6. Gram-Schmidt
// ==========================================
export function gramSchmidtSteps(vectors: Mat): MathStep[] {
  const V = toFracMatrix(vectors);
  assertRect(V);
  const steps: MathStep[] = [{
    title: 'Input vectors (rows)',
    description: 'Gram–Schmidt turns v₁, v₂, … into mutually orthogonal vectors u₁, u₂, … spanning the same space:\nuₖ = vₖ − Σ ((vₖ•uⱼ)/(uⱼ•uⱼ))·uⱼ',
    operationBadge: '{v₁, v₂, …}',
    fracMatrix: cloneM(V),
    status: 'info'
  }];

  const u: Frac[][] = [];
  const names: number[] = [];
  V.forEach((vi, i) => {
    let ui = [...vi];
    const lines: string[] = [];
    u.forEach((uj, j) => {
      const dUV = dotProductFrac(vi, uj);
      const dUU = dotProductFrac(uj, uj);
      const f = dUV.div(dUU);
      ui = ui.map((x, idx) => x.sub(f.mul(uj[idx])));
      lines.push(`coefficient with u${sub(names[j])}: (v${sub(i + 1)}•u${sub(names[j])}) / (u${sub(names[j])}•u${sub(names[j])}) = ${fmt(dUV)} / ${fmt(dUU)} = ${fmt(f)}`);
    });
    if (ui.every(x => x.isZero())) {
      steps.push({
        title: `v${sub(i + 1)} is linearly dependent`,
        description: `${lines.join('\n')}\nAfter subtracting its projections, v${sub(i + 1)} becomes the zero vector, so it lies in the span of the previous vectors. It is discarded.`,
        operationBadge: `u${sub(i + 1)} = 0 → discard`,
        fracVector: ui,
        status: 'error'
      });
      return;
    }
    u.push(ui);
    names.push(i + 1);
    const nrm = dotProductFrac(ui, ui);
    steps.push({
      title: `Orthogonal vector u${sub(i + 1)}`,
      description: `${lines.length ? lines.join('\n') + '\n' : 'First vector: u₁ = v₁.\n'}u${sub(i + 1)} = ${vecStr(ui)}\n‖u${sub(i + 1)}‖² = ${fmt(nrm)} → ‖u${sub(i + 1)}‖ = ${sqrtExpr(nrm)}\nUnit vector e${sub(i + 1)} = u${sub(i + 1)} / ${sqrtExpr(nrm)}`,
      operationBadge: `u${sub(i + 1)} ⊥ previous`,
      fracVector: [...ui],
      vectorLabel: `u${sub(i + 1)}`,
      status: 'eliminate'
    });
  });

  const checks: string[] = [];
  let ok = true;
  for (let i = 0; i < u.length; i++) {
    for (let j = i + 1; j < u.length; j++) {
      const d = dotProductFrac(u[i], u[j]);
      if (!d.isZero()) ok = false;
      checks.push(`u${sub(names[i])} • u${sub(names[j])} = ${fmt(d)} ${d.isZero() ? '✓' : '✗'}`);
    }
  }
  steps.push({
    title: 'Orthogonal basis',
    description: `${u.length} orthogonal vector${u.length === 1 ? '' : 's'} (rows). Divide each by its length to get an orthonormal basis.`,
    operationBadge: 'orthogonal basis',
    fracMatrix: u.length ? u : undefined,
    verification: checks.length ? { equations: checks, passed: ok } : undefined,
    resultText: `Orthogonal basis of ${u.length} vector${u.length === 1 ? '' : 's'}`,
    status: 'success'
  });
  return steps;
}

// ==========================================
// 7. Vectors
// ==========================================
function twoVectors(U: Vec, V: Vec): [Frac[], Frac[]] {
  const u = toFracVector(U);
  const v = toFracVector(V);
  if (u.length !== v.length) throw new Error('U and V must have the same dimension.');
  return [u, v];
}

export function dotProductSteps(U: Vec, V: Vec): MathStep[] {
  const [u, v] = twoVectors(U, V);
  const d = dotProductFrac(u, v);
  const kind = d.isZero() ? 'U and V are orthogonal (perpendicular).' : d.isNegative() ? 'Negative: the angle between them is obtuse (> 90°).' : 'Positive: the angle between them is acute (< 90°).';
  return [{
    title: 'Dot product U • V',
    description: `U • V = u₁v₁ + u₂v₂ + …\n= ${u.map((x, i) => `(${fmt(x)})(${fmt(v[i])})`).join(' + ')}\n= ${fmt(d)}\n${kind}`,
    operationBadge: `U•V = ${fmt(d)}`,
    resultText: `U • V = ${fmt(d)}`,
    status: 'success'
  }];
}

export function crossProductSteps(U: Vec, V: Vec): MathStep[] {
  const [u, v] = twoVectors(U, V);
  if (u.length !== 3) throw new Error('The cross product is only defined for 3D vectors.');
  const cx = u[1].mul(v[2]).sub(u[2].mul(v[1]));
  const cy = u[2].mul(v[0]).sub(u[0].mul(v[2]));
  const cz = u[0].mul(v[1]).sub(u[1].mul(v[0]));
  const res = [cx, cy, cz];
  const d1 = dotProductFrac(res, u);
  const d2 = dotProductFrac(res, v);
  const ok = d1.isZero() && d2.isZero();
  const area2 = dotProductFrac(res, res);
  return [
    {
      title: 'Step 1: Symbolic determinant',
      description: 'U × V = det [ i  j  k ; u₁ u₂ u₃ ; v₁ v₂ v₃ ], expanded along the first row.',
      operationBadge: 'U × V',
      fracMatrix: [u, v],
      matrixLabel: 'rows: U, V',
      status: 'info'
    },
    {
      title: 'Step 2: Expand each component',
      description: `i: u₂v₃ − u₃v₂ = (${fmt(u[1])})(${fmt(v[2])}) − (${fmt(u[2])})(${fmt(v[1])}) = ${fmt(cx)}\nj: u₃v₁ − u₁v₃ = (${fmt(u[2])})(${fmt(v[0])}) − (${fmt(u[0])})(${fmt(v[2])}) = ${fmt(cy)}   (the j term carries a minus sign in the expansion)\nk: u₁v₂ − u₂v₁ = (${fmt(u[0])})(${fmt(v[1])}) − (${fmt(u[1])})(${fmt(v[0])}) = ${fmt(cz)}`,
      operationBadge: `[${res.map(fmt).join(', ')}]`,
      fracVector: res,
      vectorLabel: 'U × V',
      status: 'eliminate'
    },
    {
      title: 'Step 3: Verify and interpret',
      description: `(U×V)•U = ${fmt(d1)} ${d1.isZero() ? '✓' : '✗'}\n(U×V)•V = ${fmt(d2)} ${d2.isZero() ? '✓' : '✗'}\n‖U×V‖ = ${sqrtExpr(area2)} = area of the parallelogram spanned by U and V.${area2.isZero() ? '\n⚠ U × V = 0: the vectors are parallel (linearly dependent).' : ''}`,
      verification: { equations: [`(U×V)•U = ${fmt(d1)} ${d1.isZero() ? '✓' : '✗'}`, `(U×V)•V = ${fmt(d2)} ${d2.isZero() ? '✓' : '✗'}`], passed: ok },
      resultText: `U × V = ${vecStr(res)}`,
      status: 'success'
    }
  ];
}

export function angleSteps(U: Vec, V: Vec): MathStep[] {
  const [u, v] = twoVectors(U, V);
  const nu = dotProductFrac(u, u);
  const nv = dotProductFrac(v, v);
  if (nu.isZero() || nv.isZero()) throw new Error('Cannot compute an angle with a zero vector.');
  const d = dotProductFrac(u, v);
  const prod = nu.mul(nv);
  const cos = Math.max(-1, Math.min(1, d.toNumber() / Math.sqrt(prod.toNumber())));
  const deg = (Math.acos(cos) * 180) / Math.PI;
  const parallel = d.mul(d).equals(prod);
  return [
    {
      title: 'Step 1: Dot product and lengths',
      description: `U•V = ${fmt(d)}\n‖U‖² = ${fmt(nu)} → ‖U‖ = ${sqrtExpr(nu)}\n‖V‖² = ${fmt(nv)} → ‖V‖ = ${sqrtExpr(nv)}`,
      operationBadge: `U•V = ${fmt(d)}`,
      status: 'info'
    },
    {
      title: 'Step 2: cos θ = (U•V) / (‖U‖·‖V‖)',
      description: `cos θ = ${fmt(d)} / √(${fmt(prod)}) = ${fmt(d)} / (${sqrtExpr(prod)})\ncos θ ≈ ${cos.toFixed(6)}\nθ = arccos(cos θ) ≈ ${deg.toFixed(4)}°${d.isZero() ? '\nθ = 90°: the vectors are orthogonal.' : ''}${parallel ? `\n⚠ |cos θ| = 1: the vectors are ${d.isNegative() ? 'anti-parallel (opposite direction)' : 'parallel (same direction)'}.` : ''}`,
      operationBadge: `θ ≈ ${deg.toFixed(2)}°`,
      resultText: `θ ≈ ${deg.toFixed(2)}°   (cos θ ≈ ${cos.toFixed(4)})`,
      status: 'success'
    }
  ];
}

export function projectionSteps(U: Vec, V: Vec): MathStep[] {
  const [u, v] = twoVectors(U, V);
  const vv = dotProductFrac(v, v);
  if (vv.isZero()) throw new Error('Cannot project onto the zero vector.');
  const uv = dotProductFrac(u, v);
  const k = uv.div(vv);
  const proj = v.map(x => x.mul(k));
  const perp = u.map((x, i) => x.sub(proj[i]));
  const chk = dotProductFrac(perp, v);
  return [
    {
      title: 'Step 1: Scalar factor',
      description: `proj_V(U) = ((U•V) / (V•V)) · V\nU•V = ${fmt(uv)}\nV•V = ‖V‖² = ${fmt(vv)}\nfactor = ${fmt(uv)} / ${fmt(vv)} = ${fmt(k)}`,
      operationBadge: `factor = ${fmt(k)}`,
      status: 'info'
    },
    {
      title: 'Step 2: Projection vector',
      description: `proj_V(U) = (${fmt(k)}) · ${vecStr(v)} = ${vecStr(proj)}\nScalar projection (signed length along V) = (U•V)/‖V‖ = ${fmt(uv)} / (${sqrtExpr(vv)})`,
      operationBadge: `proj = ${vecStr(proj)}`,
      fracVector: proj,
      vectorLabel: 'proj_V(U)',
      status: 'success'
    },
    {
      title: 'Step 3: Orthogonal component',
      description: `U − proj_V(U) = ${vecStr(perp)}\nCheck: (U − proj)•V = ${fmt(chk)} ${chk.isZero() ? '✓' : '✗'}`,
      fracVector: perp,
      vectorLabel: 'U − proj',
      verification: { equations: [`(U − proj)•V = ${fmt(chk)} ${chk.isZero() ? '✓' : '✗'}`], passed: chk.isZero() },
      resultText: `proj_V(U) = ${vecStr(proj)}`,
      status: 'success'
    }
  ];
}

export function linearTransformation(A: Mat, v: Vec): MathStep[] {
  const a = toFracMatrix(A);
  const x = toFracVector(v);
  assertRect(a);
  if (a[0].length !== x.length) throw new Error(`Matrix columns (${a[0].length}) must equal the vector dimension (${x.length}).`);
  const res = a.map(row => row.reduce((s, val, i) => s.add(val.mul(x[i])), F0));
  const lines = a.map((row, r) => `Row ${r + 1}: ${row.map((val, c) => `(${fmt(val)})(${fmt(x[c])})`).join(' + ')} = ${fmt(res[r])}`);
  const steps: MathStep[] = [
    {
      title: 'T(v) = A · v',
      description: `Each output entry is (row of A) • v.\n${lines.join('\n')}`,
      operationBadge: 'T(v) = A·v',
      fracMatrix: a,
      matrixLabel: 'A',
      fracVector: res,
      vectorLabel: 'T(v)',
      resultText: `T(v) = ${vecStr(res)}`,
      status: 'success'
    },
    {
      title: 'Meaning of the columns',
      description: `Column j of A is the image of the standard basis vector eⱼ:\n${a[0].map((_, j) => `T(e${sub(j + 1)}) = ${vecStr(a.map(r => r[j]))}`).join('\n')}\nThe output is the combination ${x.map((c, j) => `(${fmt(c)})·T(e${sub(j + 1)})`).join(' + ')}.`,
      status: 'info'
    }
  ];
  if (a.length === a[0].length) {
    const det = getDeterminantFrac(a);
    steps.push({
      title: 'Geometric facts',
      description: `|A| = ${fmt(det)}: areas/volumes are scaled by |${fmt(det)}|${det.isNegative() ? ' and orientation is flipped (reflection)' : ''}.${det.isZero() ? '\n⚠ |A| = 0: the transformation collapses space onto a lower dimension (not invertible).' : ''}`,
      status: det.isZero() ? 'warning' : 'info'
    });
  }
  return steps;
}

// ==========================================
// 8. Linear systems
// ==========================================
function solveSystem(A: Mat, B: Vec, jordan: boolean): MathStep[] {
  const mat = toFracMatrix(A);
  assertRect(mat, 'A');
  const vec = toFracVector(B);
  if (vec.length !== mat.length) throw new Error('Vector b must have one entry per equation (row of A).');
  const rows = mat.length;
  const cols = mat[0].length;
  const aug = vec.map(v => [v]);
  const steps: MathStep[] = [
    initStep(mat, aug, 'Augmented matrix [A | b]', `${rows} equation${rows > 1 ? 's' : ''} in ${cols} unknown${cols > 1 ? 's' : ''}. ${jordan ? 'Gauss-Jordan: reduce to RREF (leading 1s, zeros above and below).' : 'Gaussian elimination: reduce to row-echelon form (zeros below the pivots), then back-substitute.'}`, '[A | b]')
  ];
  const eng = rrefEngine(mat, aug, { record: true, jordan });
  steps.push(...eng.steps);
  const R = eng.mat;
  const G = eng.aug!;
  const rank = eng.pivotCols.length;

  // inconsistent?
  for (let r = 0; r < rows; r++) {
    if (R[r].every(v => v.isZero()) && !G[r][0].isZero()) {
      steps.push({
        title: 'Classification: NO solution',
        description: `Row ${r + 1} reads 0·x₁ + … + 0·xₙ = ${fmt(G[r][0])}, i.e. 0 = ${fmt(G[r][0])}, which is impossible.\nrank(A) = ${rank} but rank([A | b]) = ${rank + 1}, so the system is inconsistent (the equations contradict each other).`,
        operationBadge: `0 = ${fmt(G[r][0])} ✗`,
        fracMatrix: cloneM(R),
        augMatrix: cloneM(G),
        highlightRows: [r],
        systemClassification: 'inconsistent',
        resultText: 'No solution (inconsistent system)',
        status: 'error'
      });
      return steps;
    }
  }

  // infinitely many solutions
  if (rank < cols) {
    let RR = R;
    let GG = G;
    let pc = eng.pivotCols;
    let rowOf = eng.rowOfPivotCol;
    if (!jordan) {
      const fin = rrefEngine(R, G, { record: false, jordan: true });
      RR = fin.mat; GG = fin.aug!; pc = fin.pivotCols; rowOf = fin.rowOfPivotCol;
      steps.push({
        title: 'Free variables found: continue to RREF',
        description: `rank(A) = ${rank} < ${cols} unknowns, so the solution is not unique. Continue the reduction to RREF to read the general solution.`,
        fracMatrix: cloneM(RR),
        augMatrix: cloneM(GG),
        status: 'info'
      });
    }
    const free = range(cols).filter(c => !pc.includes(c));
    const param: string[] = [];
    for (let c = 0; c < cols; c++) {
      if (free.includes(c)) param.push(`${getVarName(c)} = t${sub(free.indexOf(c) + 1)}   (free)`);
      else {
        const r = rowOf[c];
        param.push(`${getVarName(c)} = ${linearExpr(GG[r][0], free.map((fc, k) => ({ coef: RR[r][fc].neg(), name: `t${sub(k + 1)}` })))}`);
      }
    }
    const xp: Frac[] = range(cols).map(c => (pc.includes(c) ? GG[rowOf[c]][0] : F0));
    const nb = nullSpaceBasis(RR, pc, rowOf, cols);
    steps.push({
      title: `Classification: INFINITELY many solutions (${free.length} free variable${free.length > 1 ? 's' : ''})`,
      description: `rank(A) = rank([A|b]) = ${rank} < ${cols} unknowns.\nFree variables: ${free.map(getVarName).join(', ')} (non-pivot columns). Solve each pivot variable in terms of them.\n\nVector form: x = xₚ + ${nb.map((_, k) => `t${sub(k + 1)}·n${sub(k + 1)}`).join(' + ')}\n${nb.map((b, k) => `n${sub(k + 1)} = ${vecStr(b)}`).join('\n')}\nxₚ (all free variables = 0) = ${vecStr(xp)}`,
      operationBadge: `Rank = ${rank} < ${cols}`,
      fracMatrix: cloneM(RR),
      augMatrix: cloneM(GG),
      fracVector: xp,
      vectorLabel: 'particular xₚ',
      parametricSolution: param,
      verification: buildVerification(mat, xp, vec),
      systemClassification: 'infinite',
      resultText: `Infinitely many solutions (${free.length} free variable${free.length > 1 ? 's' : ''})`,
      status: 'warning'
    });
    return steps;
  }

  // unique solution
  let sol: Frac[];
  if (jordan) {
    sol = range(cols).map(c => G[eng.rowOfPivotCol[c]][0]);
    steps.push({
      title: 'Classification: UNIQUE solution',
      description: `rank(A) = ${rank} = number of unknowns. The left block is the identity, so the right column is the solution.`,
      operationBadge: 'Unique solution ✓',
      fracMatrix: cloneM(R),
      augMatrix: cloneM(G),
      fracVector: sol,
      vectorLabel: 'x',
      verification: buildVerification(mat, sol, vec),
      systemClassification: 'unique',
      resultText: sol.map((v, i) => `${getVarName(i)} = ${fmt(v)}`).join(',   '),
      status: 'success'
    });
  } else {
    sol = range(cols).map(() => F0);
    const lines: string[] = [];
    for (let i = cols - 1; i >= 0; i--) {
      const r = eng.rowOfPivotCol[i];
      let sum = G[r][0];
      const known: string[] = [];
      for (let j = i + 1; j < cols; j++) {
        if (!R[r][j].isZero()) {
          sum = sum.sub(R[r][j].mul(sol[j]));
          known.push(`(${fmt(R[r][j])})(${fmt(sol[j])})`);
        }
      }
      sol[i] = sum.div(R[r][i]);
      lines.push(`${getVarName(i)} = (${fmt(G[r][0])}${known.length ? ' − ' + known.join(' − ') : ''}) / (${fmt(R[r][i])}) = ${fmt(sol[i])}`);
    }
    steps.push({
      title: 'Back-substitution (bottom row first)',
      description: `rank(A) = ${rank} = number of unknowns → unique solution.\nSolve the last equation first, then substitute upward:\n${lines.join('\n')}`,
      operationBadge: 'Unique solution ✓',
      fracMatrix: cloneM(R),
      augMatrix: cloneM(G),
      fracVector: sol,
      vectorLabel: 'x',
      verification: buildVerification(mat, sol, vec),
      systemClassification: 'unique',
      resultText: sol.map((v, i) => `${getVarName(i)} = ${fmt(v)}`).join(',   '),
      status: 'success'
    });
  }
  return steps;
}

export const solveGaussJordanSteps = (A: Mat, B: Vec): MathStep[] => solveSystem(A, B, true);
export const solveGaussianSteps = (A: Mat, B: Vec): MathStep[] => solveSystem(A, B, false);

export function solveCramerSteps(A: Mat, B: Vec): MathStep[] {
  const mat = toFracMatrix(A);
  assertSquare(mat, "Cramer's rule");
  const vec = toFracVector(B);
  if (vec.length !== mat.length) throw new Error('Vector b must have one entry per equation.');
  const detA = getDeterminantFrac(mat);
  const steps: MathStep[] = [{
    title: 'Step 1: |A|',
    description: `Cramer's rule: xᵢ = |Aᵢ| / |A|, where Aᵢ is A with column i replaced by b.\n|A| = ${fmt(detA)}. ${detA.isZero() ? '⚠ |A| = 0, so Cramer\'s rule cannot be used (the system has no solution or infinitely many).' : '|A| ≠ 0, so the solution is unique.'}`,
    operationBadge: `|A| = ${fmt(detA)}`,
    fracMatrix: cloneM(mat),
    status: detA.isZero() ? 'error' : 'info'
  }];
  if (detA.isZero()) {
    steps[0].resultText = "|A| = 0: Cramer's rule does not apply. Use Gauss-Jordan to classify the system.";
    return steps;
  }
  const sol: Frac[] = [];
  mat.forEach((_, i) => {
    const Ai = mat.map((row, r) => row.map((v, c) => (c === i ? vec[r] : v)));
    const dAi = getDeterminantFrac(Ai);
    const xi = dAi.div(detA);
    sol.push(xi);
    steps.push({
      title: `Step ${i + 2}: ${getVarName(i)} = |A${sub(i + 1)}| / |A|`,
      description: `Replace column ${i + 1} of A by b.\n|A${sub(i + 1)}| = ${fmt(dAi)}\n${getVarName(i)} = ${fmt(dAi)} / ${fmt(detA)} = ${fmt(xi)}`,
      operationBadge: `${getVarName(i)} = ${fmt(xi)}`,
      fracMatrix: Ai,
      matrixLabel: `A${sub(i + 1)}`,
      highlightCols: [i],
      status: 'eliminate'
    });
  });
  steps.push({
    title: 'Solution and verification',
    description: 'All unknowns computed. Substitute back into every original equation:',
    fracVector: sol,
    vectorLabel: 'x',
    verification: buildVerification(mat, sol, vec),
    systemClassification: 'unique',
    resultText: sol.map((v, i) => `${getVarName(i)} = ${fmt(v)}`).join(',   '),
    status: 'success'
  });
  return steps;
}

export function solveInverseMethodSteps(A: Mat, B: Vec): MathStep[] {
  const mat = toFracMatrix(A);
  assertSquare(mat, 'The inverse method');
  const vec = toFracVector(B);
  if (vec.length !== mat.length) throw new Error('Vector b must have one entry per equation.');
  const det = getDeterminantFrac(mat);
  if (det.isZero()) {
    return [{
      title: 'A is singular',
      description: '|A| = 0, so A⁻¹ does not exist and x = A⁻¹b cannot be used. Use Gauss-Jordan to see whether there are no solutions or infinitely many.',
      fracMatrix: cloneM(mat),
      resultText: '|A| = 0: the inverse method does not apply.',
      status: 'error'
    }];
  }
  const inv = getInverseFrac(mat);
  const sol = inv.map(row => row.reduce((s, v, i) => s.add(v.mul(vec[i])), F0));
  return [
    {
      title: 'Step 1: Compute A⁻¹',
      description: `|A| = ${fmt(det)} ≠ 0, so A⁻¹ = (1/|A|)·adj(A) exists. (Use the "Inverse" operation to see the cofactor steps.)`,
      operationBadge: `|A| = ${fmt(det)}`,
      fracMatrix: inv,
      matrixLabel: 'A⁻¹',
      status: 'pivot'
    },
    {
      title: 'Step 2: x = A⁻¹ · b',
      description: `From A·x = b, multiply both sides by A⁻¹ on the left.\n${inv.map((row, r) => `${getVarName(r)} = ${row.map((v, c) => `(${fmt(v)})(${fmt(vec[c])})`).join(' + ')} = ${fmt(sol[r])}`).join('\n')}`,
      fracVector: sol,
      vectorLabel: 'x',
      verification: buildVerification(mat, sol, vec),
      systemClassification: 'unique',
      resultText: sol.map((v, i) => `${getVarName(i)} = ${fmt(v)}`).join(',   '),
      status: 'success'
    }
  ];
}

export function getLeastSquaresSteps(A: Mat, B: Vec): MathStep[] {
  const a = toFracMatrix(A);
  assertRect(a);
  const b = toFracVector(B);
  if (b.length !== a.length) throw new Error('Vector b must have one entry per row of A.');
  const At = getTransposeFrac(a);
  const AtA = mulMat(At, a);
  const Atb = At.map(row => row.reduce((s, v, i) => s.add(v.mul(b[i])), F0));
  const steps: MathStep[] = [
    {
      title: 'Least squares: minimise ‖A·x − b‖²',
      description: 'When A·x = b has no exact solution, the best approximation x̂ satisfies the normal equations AᵀA·x̂ = Aᵀb.',
      operationBadge: 'AᵀA x̂ = Aᵀb',
      fracMatrix: cloneM(a),
      augMatrix: b.map(v => [v]),
      status: 'info'
    },
    {
      title: 'Form AᵀA and Aᵀb',
      description: `AᵀA is ${AtA.length}×${AtA.length} (always symmetric); Aᵀb has ${Atb.length} entries.`,
      fracMatrix: AtA,
      matrixLabel: 'AᵀA',
      fracVector: Atb,
      vectorLabel: 'Aᵀb',
      status: 'pivot'
    }
  ];
  const inner = solveSystem(AtA, Atb, true).map(s => ({ ...s, title: `[Normal equations] ${s.title}` }));
  steps.push(...inner);
  const last = inner[inner.length - 1];
  if (last.systemClassification === 'unique' && last.fracVector) {
    const x = last.fracVector;
    const Ax = a.map(row => row.reduce((s, v, i) => s.add(v.mul(x[i])), F0));
    const resid = b.map((v, i) => v.sub(Ax[i]));
    const ss = dotProductFrac(resid, resid);
    steps.push({
      title: 'Residual',
      description: `A·x̂ = ${vecStr(Ax)}\nr = b − A·x̂ = ${vecStr(resid)}\n‖r‖² = ${fmt(ss)}${ss.isZero() ? ' → exact solution (b is in the column space).' : ''}\nCheck: Aᵀr = 0 (the residual is orthogonal to the column space) ${getTransposeFrac(a).every(row => dotProductFrac(row, resid).isZero()) ? '✓' : '✗'}`,
      fracVector: resid,
      vectorLabel: 'r = b − Ax̂',
      resultText: `x̂ = ${vecStr(x)}   (‖r‖² = ${fmt(ss)})`,
      status: 'success'
    });
  }
  return steps;
}

// ==========================================
// 9. LaTeX export
// ==========================================
const LATEX_MAP: Record<string, string> = {
  'λ': '$\\lambda$', 'Δ': '$\\Delta$', 'θ': '$\\theta$', '⊥': '$\\perp$', '↔': '$\\leftrightarrow$',
  '←': '$\\leftarrow$', '➔': '$\\rightarrow$', '→': '$\\rightarrow$', '·': '$\\cdot$', '×': '$\\times$',
  '÷': '$\\div$', '✓': '$\\checkmark$', '✗': '$\\times$', '⚠': '\\textbf{Warning:}', '≠': '$\\neq$',
  '≈': '$\\approx$', '≥': '$\\geq$', '≤': '$\\leq$', '∈': '$\\in$', 'ℝ': '$\\mathbb{R}$', 'ℚ': '$\\mathbb{Q}$',
  'ℂ': '$\\mathbb{C}$', '•': '$\\bullet$', '‖': '$\\|$', 'ᵀ': '$^{T}$', '−': '$-$', '±': '$\\pm$',
  '∞': '$\\infty$', 'Σ': '$\\Sigma$', 'ₚ': '$_{p}$', '—': '---', '…': '\\ldots{}',
  '²': '$^{2}$', '³': '$^{3}$', '⁴': '$^{4}$', '⁵': '$^{5}$', '⁶': '$^{6}$',
  '₀': '$_{0}$', '₁': '$_{1}$', '₂': '$_{2}$', '₃': '$_{3}$', '₄': '$_{4}$',
  '₅': '$_{5}$', '₆': '$_{6}$', '₇': '$_{7}$', '₈': '$_{8}$', '₉': '$_{9}$',
  'ᵢ': '$_{i}$', 'ⱼ': '$_{j}$', 'ₖ': '$_{k}$', 'ₙ': '$_{n}$', '¹': '$^{1}$',
  '⁷': '$^{7}$', '⁸': '$^{8}$', '⁹': '$^{9}$' // Fixed: Missing subscript & superscript unicode chars added
};
const LATEX_CHARS = new RegExp(`[${Object.keys(LATEX_MAP).join('')}]`, 'g');

export function escapeLatex(str: string): string {
  if (!str) return '';
  return str
    .replace(/([&%#_{}$])/g, '\\$1')
    .replace(/\^/g, '\\^{}')
    .replace(/⁻¹/g, () => '$^{-1}$')
    .replace(/√(\d+)/g, (_m, d) => `$\\sqrt{${d}}$`)
    .replace(/√/g, () => '$\\surd$')
    .replace(LATEX_CHARS, ch => LATEX_MAP[ch] ?? ch)
    .replace(/\n/g, ' \\\\ ');
}

export function formatMatrixLatex(M: Frac[][], aug?: Frac[][]): string {
  if (!M || M.length === 0) return '';
  if (aug && aug.length === M.length) {
    const m = aug[0].length;
    const colsFormat = 'c'.repeat(M[0].length) + '|' + 'c'.repeat(m);
    const body = M.map((r, i) => [...r.map(x => x.toLatex()), ...aug[i].map(x => x.toLatex())].join(' & ')).join(' \\\\\n  ');
    return `\\left[\\begin{array}{${colsFormat}}\n  ${body}\n\\end{array}\\right]`;
  }
  const body = M.map(r => r.map(x => x.toLatex()).join(' & ')).join(' \\\\\n  ');
  return `\\begin{bmatrix}\n  ${body}\n\\end{bmatrix}`;
}

export function stepsToLatexDocument(title: string, steps: MathStep[], standalone = true): string {
  const lines: string[] = [];
  if (standalone) {
    lines.push(
      '\\documentclass[11pt]{article}',
      '\\usepackage[utf8]{inputenc}',
      '\\usepackage{amsmath,amssymb}',
      '\\usepackage[margin=2cm]{geometry}',
      '\\setlength{\\parindent}{0pt}',
      '\\begin{document}'
    );
  }
  lines.push('% Generated by Athar Matrix Studio', `\\section*{${escapeLatex(title)}}`);

  steps.forEach((st, idx) => {
    lines.push(`\\subsection*{Step ${idx + 1}: ${escapeLatex(st.title)}}`);
    if (st.operationBadge) {
      lines.push(`\\textbf{Operation:} ${st.operationBadge.split(' ; ').map(o => `\\texttt{${escapeLatex(o)}}`).join(', ')}\\\\`);
    }
    if (st.description) lines.push(`${escapeLatex(st.description)}\\\\`);
    if (st.parametricSolution) lines.push(`\\textbf{Parametric solution:}\\\\ ${st.parametricSolution.map(escapeLatex).join(' \\\\ ')}\\\\`);
    if (st.verification) lines.push(`\\textbf{Verification:}\\\\ ${st.verification.equations.map(escapeLatex).join(' \\\\ ')}\\\\`);
    const blocks: string[] = [];
    if (st.fracMatrix) blocks.push((st.matrixLabel ? `\\text{${escapeLatex(st.matrixLabel)}} = ` : '') + formatMatrixLatex(st.fracMatrix, st.augMatrix));
    if (st.fracVector) blocks.push((st.vectorLabel ? `\\text{${escapeLatex(st.vectorLabel)}} = ` : '') + `\\begin{bmatrix} ${st.fracVector.map(x => x.toLatex()).join(' \\\\ ')} \\end{bmatrix}`);
    st.extraMatrices?.forEach(e => blocks.push(`\\text{${escapeLatex(e.label)}} = ${formatMatrixLatex(e.matrix)}`));
    blocks.forEach(b => lines.push(`\\[\n${b}\n\\]`));
    if (st.resultText) lines.push(`\\fbox{${escapeLatex(st.resultText)}}`);
  });

  if (standalone) lines.push('\\end{document}');
  return lines.join('\n\n');
}
