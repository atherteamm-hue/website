// src/components/MatrixSimulatorModal.tsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X, Calculator, Play, Pause, RefreshCw, Trash2, FileText,
  Copy, Check, ChevronLeft, ChevronRight, Sparkles, CheckCircle2,
  AlertTriangle, Layers, Download, History as HistoryIcon
} from 'lucide-react';
import {
  Frac, MathStep, getVarName, stepsToLatexDocument,
  solveGaussJordanSteps, solveGaussianSteps, solveCramerSteps, solveInverseMethodSteps, getLeastSquaresSteps,
  getRREFSteps, getSubspaceSteps, getIndependenceSteps, getEigenSteps, getLUSteps, gramSchmidtSteps,
  getDeterminantSteps, getInverseSteps, getInverseGaussJordanSteps, getTransposeSteps, getCofactorSteps,
  getTraceSteps, getSymmetrySteps, getOperationSteps, linearTransformation,
  dotProductSteps, crossProductSteps, angleSteps, projectionSteps
} from '../utils/matrixMath';

// ------------------------------------------------------------------
// Operation catalogue
// ------------------------------------------------------------------
type OpKind = 'matrix' | 'system' | 'pair' | 'transform' | 'vectors';

interface OpDef {
  key: string;
  label: string;
  group: string;
  kind: OpKind;
  square?: boolean;
  aLabel?: string;
}

const OPS: OpDef[] = [
  { key: 'gauss', label: 'Gauss-Jordan Elimination (RREF)', group: 'Solve systems [A | b]', kind: 'system' },
  { key: 'gaussian', label: 'Gaussian Elimination + Back-Substitution', group: 'Solve systems [A | b]', kind: 'system' },
  { key: 'cramer', label: "Cramer's Rule", group: 'Solve systems [A | b]', kind: 'system', square: true },
  { key: 'inverse_method', label: 'Inverse Method  x = A⁻¹b', group: 'Solve systems [A | b]', kind: 'system', square: true },
  { key: 'lsq', label: 'Least Squares  (AᵀA x = Aᵀb)', group: 'Solve systems [A | b]', kind: 'system' },

  { key: 'rref', label: 'RREF · Rank · Nullity', group: 'Matrix analysis', kind: 'matrix' },
  { key: 'subspaces', label: 'Bases: Column / Row / Null space', group: 'Matrix analysis', kind: 'matrix' },
  { key: 'indep', label: 'Linear independence of columns', group: 'Matrix analysis', kind: 'matrix', aLabel: 'Vectors (columns)' },
  { key: 'eigen', label: 'Eigenvalues · Eigenvectors · Diagonalization', group: 'Matrix analysis', kind: 'matrix', square: true },
  { key: 'lu', label: 'LU Decomposition (PA = LU)', group: 'Matrix analysis', kind: 'matrix', square: true },
  { key: 'gram', label: 'Gram-Schmidt Process', group: 'Matrix analysis', kind: 'matrix', aLabel: 'Vectors (rows)' },

  { key: 'det', label: 'Determinant |A| (cofactor expansion)', group: 'Matrix properties', kind: 'matrix', square: true },
  { key: 'inv', label: 'Inverse A⁻¹ (adjugate method)', group: 'Matrix properties', kind: 'matrix', square: true },
  { key: 'inv_gj', label: 'Inverse A⁻¹ (Gauss-Jordan [A | I])', group: 'Matrix properties', kind: 'matrix', square: true },
  { key: 'trans', label: 'Transpose Aᵀ', group: 'Matrix properties', kind: 'matrix' },
  { key: 'cofactor', label: 'Cofactor matrix', group: 'Matrix properties', kind: 'matrix', square: true },
  { key: 'trace', label: 'Trace(A)', group: 'Matrix properties', kind: 'matrix', square: true },
  { key: 'sym', label: 'Check symmetry', group: 'Matrix properties', kind: 'matrix', square: true },

  { key: 'add', label: 'Add  A + B', group: 'Matrix operations', kind: 'pair' },
  { key: 'sub', label: 'Subtract  A − B', group: 'Matrix operations', kind: 'pair' },
  { key: 'mul', label: 'Multiply  A × B', group: 'Matrix operations', kind: 'pair' },

  { key: 'linear_transform', label: 'Linear transformation T(v) = A·v', group: 'Transformations', kind: 'transform', aLabel: 'Transformation matrix T' },

  { key: 'dot', label: 'Dot product U • V', group: 'Vectors', kind: 'vectors' },
  { key: 'cross', label: 'Cross product U × V (3D)', group: 'Vectors', kind: 'vectors' },
  { key: 'angle', label: 'Angle between U and V', group: 'Vectors', kind: 'vectors' },
  { key: 'proj', label: 'Projection of U onto V', group: 'Vectors', kind: 'vectors' }
];

const GROUPS = Array.from(new Set(OPS.map(o => o.group)));
const opOf = (k: string): OpDef => OPS.find(o => o.key === k) ?? OPS[0];

interface Preset {
  label: string;
  op: string;
  A: string[][];
  b?: string[];
  tone?: 'normal' | 'accent';
}

const PRESETS: Preset[] = [
  { label: 'Unique solution', op: 'gauss', A: [['2', '1', '-1'], ['-3', '-1', '2'], ['-2', '1', '2']], b: ['8', '-11', '-3'] },
  { label: 'Infinite solutions', op: 'gauss', A: [['1', '2', '-1'], ['2', '4', '-2'], ['1', '1', '1']], b: ['3', '6', '4'] },
  { label: 'No solution', op: 'gauss', A: [['1', '-1', '2'], ['2', '-2', '4'], ['3', '1', '-1']], b: ['5', '14', '2'] },
  { label: 'Fractions', op: 'gauss', tone: 'accent', A: [['1/2', '1/3', '-1/4'], ['2/3', '-1/2', '1/6'], ['1/4', '1/2', '1/3']], b: ['7/12', '1/3', '13/12'] },
  { label: 'Eigen (repeated λ)', op: 'eigen', A: [['2', '1', '0'], ['1', '2', '0'], ['0', '0', '3']] },
  { label: 'LU', op: 'lu', A: [['2', '1', '1'], ['4', '-6', '0'], ['-2', '7', '2']] },
  { label: 'Least squares line', op: 'lsq', A: [['1', '1'], ['1', '2'], ['1', '3']], b: ['1', '2', '2'] }
];

const statusStyle: Record<string, { bar: string; pill: string }> = {
  info: { bar: 'border-l-neutral-300', pill: 'bg-neutral-100 text-neutral-700 border-neutral-300' },
  pivot: { bar: 'border-l-blue-500', pill: 'bg-blue-100 text-blue-800 border-blue-300' },
  swap: { bar: 'border-l-amber-500', pill: 'bg-amber-100 text-amber-800 border-amber-300' },
  eliminate: { bar: 'border-l-purple-500', pill: 'bg-purple-100 text-purple-800 border-purple-300' },
  success: { bar: 'border-l-emerald-500', pill: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  warning: { bar: 'border-l-orange-500', pill: 'bg-orange-100 text-orange-800 border-orange-300' },
  error: { bar: 'border-l-red-500', pill: 'bg-red-100 text-red-800 border-red-300' }
};

// ------------------------------------------------------------------
// Small helpers
// ------------------------------------------------------------------
const resize2 = (prev: string[][], r: number, c: number): string[][] =>
  Array.from({ length: r }, (_, i) => Array.from({ length: c }, (__, j) => prev[i]?.[j] ?? '0'));
const resize1 = (prev: string[], n: number): string[] => Array.from({ length: n }, (_, i) => prev[i] ?? '0');

const isValidEntry = (s: string): boolean => {
  try { Frac.parse(s); return true; } catch { return false; }
};

const parseGrid = (g: string[][], name: string): Frac[][] =>
  g.map((row, i) => row.map((v, j) => {
    try { return Frac.parse(v); } catch {
      throw new Error(`Invalid entry in ${name} (row ${i + 1}, column ${j + 1}): "${v}". Use integers, decimals or fractions such as 1/3.`);
    }
  }));

const parseVec = (g: string[], name: string): Frac[] =>
  g.map((v, i) => {
    try { return Frac.parse(v); } catch {
      throw new Error(`Invalid entry in ${name} (position ${i + 1}): "${v}". Use integers, decimals or fractions such as 1/3.`);
    }
  });

interface HistoryItem {
  id: number;
  op: string;
  rows: number;
  cols: number;
  bCols: number;
  vecSize: number;
  A: string[][];
  B: string[][];
  b: string[];
  U: string[];
  V: string[];
}

const HISTORY_KEY = 'athar_matrix_history_v1';

// ------------------------------------------------------------------
// Presentational components
// ------------------------------------------------------------------
type Tone = 'neutral' | 'blue';

function MatrixView({
  m, aug, hRows = [], hCols = [], pivot, fmt, label, tone = 'neutral'
}: {
  m: Frac[][]; aug?: Frac[][]; hRows?: number[]; hCols?: number[]; pivot?: [number, number];
  fmt: (f: Frac) => string; label?: string; tone?: Tone;
}) {
  const border = tone === 'blue' ? 'border-blue-500' : 'border-neutral-900';
  return (
    <div className="flex flex-col items-center gap-1">
      {label && <span className="text-[11px] font-bold text-neutral-500">{label}</span>}
      <div className={`flex flex-col border-l-2 border-r-2 ${border} px-2 py-1`}>
        {m.map((row, i) => (
          <div key={i} className={`flex items-center rounded ${hRows.includes(i) ? 'bg-amber-100' : ''}`}>
            {row.map((val, j) => {
              const isPivot = pivot?.[0] === i && pivot?.[1] === j;
              return (
                <span
                  key={j}
                  className={`min-w-[3rem] px-1.5 py-1 text-center font-mono text-sm font-bold rounded ${
                    isPivot ? 'bg-black text-white' : hCols.includes(j) ? 'bg-sky-100 text-sky-900' : tone === 'blue' ? 'text-blue-700' : 'text-neutral-800'
                  }`}
                >
                  {fmt(val)}
                </span>
              );
            })}
            {aug && aug[i] && (
              <>
                <span className="w-px self-stretch bg-neutral-400 mx-1" />
                {aug[i].map((val, j) => (
                  <span key={`a${j}`} className="min-w-[3rem] px-1.5 py-1 text-center font-mono text-sm font-bold text-blue-700">{fmt(val)}</span>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepCard({ step, label, fmt }: { step: MathStep; label: string; fmt: (f: Frac) => string }) {
  const st = statusStyle[step.status ?? 'info'];
  const badges = step.operationBadge ? step.operationBadge.split(' ; ') : [];
  const hasViz = !!(step.fracMatrix || step.fracVector || step.extraMatrices?.length);
  return (
    <div className={`bg-white rounded-3xl border border-neutral-200 border-l-[6px] ${st.bar} shadow-sm p-5 md:p-6 flex flex-col xl:flex-row gap-5`}>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-neutral-900 text-white text-xs font-black rounded-full">{label}</span>
          {badges.map((b, i) => (
            <code key={i} className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${st.pill}`}>{b}</code>
          ))}
        </div>
        <h4 className="text-lg font-black text-neutral-900 mb-2 leading-snug">{step.title}</h4>
        {step.description && (
          <p className="text-sm text-neutral-600 font-medium whitespace-pre-line leading-relaxed">{step.description}</p>
        )}

        {step.parametricSolution && (
          <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-2xl">
            <div className="text-xs font-black text-orange-800 mb-2">General solution (t₁, t₂ … ∈ ℝ)</div>
            {step.parametricSolution.map((eq, i) => (
              <div key={i} className="font-mono text-sm font-bold text-orange-900">{eq}</div>
            ))}
          </div>
        )}

        {step.verification && (
          <div className={`mt-4 p-4 rounded-2xl border ${step.verification.passed ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
            <div className={`flex items-center gap-2 text-xs font-black mb-2 ${step.verification.passed ? 'text-emerald-800' : 'text-red-800'}`}>
              <CheckCircle2 size={15} /> Verification
            </div>
            {step.verification.equations.map((eq, i) => (
              <div key={i} className="font-mono text-xs md:text-sm font-bold text-neutral-800 break-words">{eq}</div>
            ))}
          </div>
        )}

        {step.resultText && step.status !== 'info' && (
          <div className="mt-4 inline-block px-4 py-2 bg-neutral-900 text-white rounded-xl font-mono text-sm font-bold break-words max-w-full">
            {step.resultText}
          </div>
        )}
      </div>

      {hasViz && (
        <div className="flex flex-wrap items-center justify-center gap-5 bg-neutral-50 border border-neutral-200 rounded-2xl p-4 overflow-x-auto xl:max-w-[55%] self-start">
          {step.fracMatrix && (
            <MatrixView
              m={step.fracMatrix} aug={step.augMatrix} fmt={fmt} label={step.matrixLabel}
              hRows={step.highlightRows} hCols={step.highlightCols} pivot={step.pivotCell}
            />
          )}
          {step.fracVector && (
            <MatrixView m={step.fracVector.map(v => [v])} fmt={fmt} tone="blue" label={step.vectorLabel} />
          )}
          {step.extraMatrices?.map((e, i) => (
            <MatrixView key={i} m={e.matrix} fmt={fmt} label={e.label} />
          ))}
        </div>
      )}
    </div>
  );
}

function Cell({
  value, onChange, onEnter, tone = 'neutral'
}: { value: string; onChange: (v: string) => void; onEnter: () => void; tone?: 'neutral' | 'blue' | 'green' }) {
  const valid = isValidEntry(value);
  const base = tone === 'blue' ? 'bg-blue-50 border-blue-200 focus:border-blue-600' : tone === 'green' ? 'bg-emerald-50 border-emerald-200 focus:border-emerald-600' : 'bg-neutral-50 border-neutral-300 focus:border-black';
  return (
    <input
      value={value}
      inputMode="text"
      spellCheck={false}
      autoComplete="off"
      onFocus={e => e.currentTarget.select()}
      onChange={e => onChange(e.target.value)}
      onKeyDown={e => { if (e.key === 'Enter') onEnter(); }}
      aria-invalid={!valid}
      className={`w-16 h-12 text-center font-mono font-bold rounded-xl border outline-none transition-colors ${valid ? base : 'bg-red-50 border-red-400 text-red-700'}`}
    />
  );
}

function GridInput({
  title, grid, onCell, onEnter, tone, vars
}: {
  title: string; grid: string[][]; onCell: (r: number, c: number, v: string) => void;
  onEnter: () => void; tone?: 'neutral' | 'blue' | 'green'; vars?: boolean;
}) {
  const border = tone === 'blue' ? 'border-blue-500' : tone === 'green' ? 'border-emerald-500' : 'border-neutral-900';
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-bold text-neutral-500 text-xs bg-neutral-100 px-3 py-1 rounded-full">{title}</span>
      <div className={`flex flex-col gap-1.5 border-l-[3px] border-r-[3px] ${border} px-3 py-2`}>
        {grid.map((row, i) => (
          <div key={i} className="flex items-center gap-1.5">
            {vars && <span className="font-mono font-bold text-neutral-400 text-xs w-4">{getVarName(i)}</span>}
            {row.map((v, j) => <Cell key={j} value={v} tone={tone} onChange={nv => onCell(i, j, nv)} onEnter={onEnter} />)}
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Main modal
// ------------------------------------------------------------------
export function MatrixSimulatorModal({ onClose }: { onClose: () => void }) {
  const [operation, setOperation] = useState<string>('gauss');
  const def = opOf(operation);

  const [rows, setRows] = useState<number>(3);
  const [cols, setCols] = useState<number>(3);
  const [bCols, setBCols] = useState<number>(3);
  const [vecSize, setVecSize] = useState<number>(3);

  const [rawA, setRawA] = useState<string[][]>(() => resize2([], 3, 3));
  const [rawB, setRawB] = useState<string[][]>(() => resize2([], 3, 3));
  const [rawVecB, setRawVecB] = useState<string[]>(() => resize1([], 3));
  const [rawU, setRawU] = useState<string[]>(() => resize1([], 3));
  const [rawV, setRawV] = useState<string[]>(() => resize1([], 3));

  const [useFractions, setUseFractions] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'all' | 'player'>('all');
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const [steps, setSteps] = useState<MathStep[]>([]);
  const [error, setError] = useState<string>('');
  const resultsRef = useRef<HTMLDivElement>(null);

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
  });
  useEffect(() => {
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch { /* storage unavailable */ }
  }, [history]);

  // dimensions of the secondary inputs
  const bRowsN = operation === 'mul' ? cols : rows;
  const bColsN = operation === 'mul' ? bCols : cols;
  const vecBLen = def.kind === 'transform' ? cols : rows;

  useEffect(() => { setRawA(p => resize2(p, rows, cols)); }, [rows, cols]);
  useEffect(() => { setRawB(p => resize2(p, bRowsN, bColsN)); }, [bRowsN, bColsN]);
  useEffect(() => { setRawVecB(p => resize1(p, vecBLen)); }, [vecBLen]);
  useEffect(() => {
    setRawU(p => resize1(p, vecSize));
    setRawV(p => resize1(p, vecSize));
  }, [vecSize]);

  // lock page scroll + Esc to close
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  // step player: autoplay + arrow keys
  useEffect(() => {
    if (!isPlaying || steps.length === 0) return;
    const t = setInterval(() => {
      setActiveIdx(p => {
        if (p < steps.length - 1) return p + 1;
        setIsPlaying(false);
        return p;
      });
    }, 1600);
    return () => clearInterval(t);
  }, [isPlaying, steps.length]);

  useEffect(() => {
    if (viewMode !== 'player' || steps.length === 0) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'SELECT') return;
      if (e.key === 'ArrowRight') { setIsPlaying(false); setActiveIdx(p => Math.min(steps.length - 1, p + 1)); }
      if (e.key === 'ArrowLeft') { setIsPlaying(false); setActiveIdx(p => Math.max(0, p - 1)); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewMode, steps.length]);

  const resetUI = () => { setSteps([]); setError(''); setActiveIdx(0); setIsPlaying(false); };

  const fmt = (v: Frac) => v.toString(!useFractions);

  // ---------- handlers ----------
  const handleOperationChange = (key: string) => {
    const d = opOf(key);
    setOperation(key);
    if (d.square) setCols(rows);
    if (key === 'cross') setVecSize(3);
    resetUI();
  };

  const onRows = (n: number) => { setRows(n); if (def.square) setCols(n); resetUI(); };
  const onCols = (n: number) => { setCols(n); resetUI(); };

  const setCell = (setter: React.Dispatch<React.SetStateAction<string[][]>>) => (r: number, c: number, v: string) =>
    setter(prev => prev.map((row, i) => (i === r ? row.map((x, j) => (j === c ? v : x)) : row)));
  const setVecCell = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (i: number, v: string) =>
    setter(prev => prev.map((x, k) => (k === i ? v : x)));

  const rnd = () => String(Math.floor(Math.random() * 15) - 7);
  const fillRandom = () => {
    setRawA(Array.from({ length: rows }, () => Array.from({ length: cols }, rnd)));
    setRawB(Array.from({ length: bRowsN }, () => Array.from({ length: bColsN }, rnd)));
    setRawVecB(Array.from({ length: vecBLen }, rnd));
    setRawU(Array.from({ length: vecSize }, rnd));
    setRawV(Array.from({ length: vecSize }, rnd));
    resetUI();
  };

  const clearAll = () => {
    setRawA(resize2([], rows, cols));
    setRawB(resize2([], bRowsN, bColsN));
    setRawVecB(resize1([], vecBLen));
    setRawU(resize1([], vecSize));
    setRawV(resize1([], vecSize));
    resetUI();
  };

  const loadPreset = (p: Preset) => {
    setOperation(p.op);
    setRows(p.A.length);
    setCols(p.A[0].length);
    setRawA(p.A.map(r => [...r]));
    if (p.b) setRawVecB([...p.b]);
    resetUI();
  };

  const runOperation = (): MathStep[] => {
    const A = parseGrid(rawA, 'A');
    switch (operation) {
      case 'gauss': return solveGaussJordanSteps(A, parseVec(rawVecB, 'b'));
      case 'gaussian': return solveGaussianSteps(A, parseVec(rawVecB, 'b'));
      case 'cramer': return solveCramerSteps(A, parseVec(rawVecB, 'b'));
      case 'inverse_method': return solveInverseMethodSteps(A, parseVec(rawVecB, 'b'));
      case 'lsq': return getLeastSquaresSteps(A, parseVec(rawVecB, 'b'));
      case 'rref': return getRREFSteps(A);
      case 'subspaces': return getSubspaceSteps(A);
      case 'indep': return getIndependenceSteps(A);
      case 'eigen': return getEigenSteps(A);
      case 'lu': return getLUSteps(A);
      case 'gram': return gramSchmidtSteps(A);
      case 'det': return getDeterminantSteps(A);
      case 'inv': return getInverseSteps(A);
      case 'inv_gj': return getInverseGaussJordanSteps(A);
      case 'trans': return getTransposeSteps(A);
      case 'cofactor': return getCofactorSteps(A);
      case 'trace': return getTraceSteps(A);
      case 'sym': return getSymmetrySteps(A);
      case 'add': case 'sub': case 'mul':
        return getOperationSteps(A, parseGrid(rawB, 'B'), operation as 'add' | 'sub' | 'mul');
      case 'linear_transform': return linearTransformation(A, parseVec(rawVecB, 'v'));
      case 'dot': return dotProductSteps(parseVec(rawU, 'U'), parseVec(rawV, 'V'));
      case 'cross': return crossProductSteps(parseVec(rawU, 'U'), parseVec(rawV, 'V'));
      case 'angle': return angleSteps(parseVec(rawU, 'U'), parseVec(rawV, 'V'));
      case 'proj': return projectionSteps(parseVec(rawU, 'U'), parseVec(rawV, 'V'));
      default: return [];
    }
  };

  const handleSolve = () => {
    resetUI();
    try {
      if (def.square && def.kind !== 'vectors' && rows !== cols) {
        throw new Error(`"${def.label}" needs a square matrix (n × n). Yours is ${rows} × ${cols}.`);
      }
      const out = runOperation();
      setSteps(out);
      const item: HistoryItem = {
        id: Date.now(), op: operation, rows, cols, bCols, vecSize,
        A: rawA, B: rawB, b: rawVecB, U: rawU, V: rawV
      };
      setHistory(h => {
        const key = JSON.stringify({ ...item, id: 0 });
        const rest = h.filter(x => JSON.stringify({ ...x, id: 0 }) !== key);
        return [item, ...rest].slice(0, 8);
      });
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    }
  };

  const restore = (h: HistoryItem) => {
    setOperation(h.op); setRows(h.rows); setCols(h.cols); setBCols(h.bCols); setVecSize(h.vecSize);
    setRawA(h.A); setRawB(h.B); setRawVecB(h.b); setRawU(h.U); setRawV(h.V);
    resetUI();
    setShowHistory(false);
  };

  const latexText = () => stepsToLatexDocument(`Athar Matrix Studio: ${def.label}`, steps, true);

  const copyLatex = async () => {
    try {
      await navigator.clipboard.writeText(latexText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { setError('Could not access the clipboard. Use "Download .tex" instead.'); }
  };

  // Export Academic PDF Worksheet via Print Window
  const handleExportPDF = () => {
    const printWin = window.open('', '_blank', 'width=950,height=800');
    if (!printWin) return;

    const renderMatrixHtml = (step: MathStep) => {
      if (!step.fracMatrix) return '';
      const rCount = step.fracMatrix.length;
      const rowsHtml = Array.from({ length: rCount }, (_, r) => {
        const cCount = step.fracMatrix![r].length;
        const cells = Array.from({ length: cCount }, (__, c) => {
          const txt = fmt(step.fracMatrix![r][c]);
          return `<td style="padding:6px 12px; text-align:center; font-family:monospace; font-weight:700;">${txt}</td>`;
        }).join('');
        const augCell = step.augMatrix
          ? `<td style="padding:6px 12px; border-left:2px solid #94a3b8; color:#1d4ed8; font-family:monospace; font-weight:700; text-align:center;">${fmt(step.augMatrix[r][0])}</td>`
          : '';
        return `<tr>${cells}${augCell}</tr>`;
      }).join('');

      return `<table style="border-collapse:collapse; border-left:2.5px solid #0f172a; border-right:2.5px solid #0f172a; margin:10px 0;">${rowsHtml}</table>`;
    };

    const stepsHtml = steps
      .map(
        (st, idx) => `
      <div style="border:1px solid #e2e8f0; border-radius:12px; padding:16px; margin-bottom:14px; page-break-inside:avoid;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <strong style="font-size:15px;">Step ${idx + 1}: ${st.title}</strong>
          ${st.operationBadge ? `<span style="background:#0f172a; color:#fff; padding:3px 10px; border-radius:99px; font-family:monospace; font-size:12px;">${st.operationBadge}</span>` : ''}
        </div>
        <div style="color:#475569; font-size:13px; white-space:pre-line; margin-bottom:8px;">${st.description}</div>
        ${renderMatrixHtml(st)}
        ${st.fracVector ? `<div style="font-family:monospace; font-weight:700; color:#1d4ed8; margin-top:6px;">Vector = [ ${st.fracVector.map(v => fmt(v)).join(', ')} ]</div>` : ''}
        ${st.resultText && st.status !== 'info' ? `<div style="margin-top:10px; padding:8px 12px; background:#0f172a; color:#fff; border-radius:8px; font-family:monospace; font-size:13px; font-weight:700;">${st.resultText}</div>` : ''}
      </div>`
      )
      .join('');

    printWin.document.write(`
      <html>
        <head>
          <title>Athar Matrix Studio — Solution Report</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; color: #0f172a; padding: 32px; }
            .header { display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #0f172a; padding-bottom:16px; margin-bottom:24px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1 style="margin:0; font-size:24px; text-transform:uppercase;">Athar Matrix Studio</h1>
              <p style="margin:4px 0 0; color:#64748b; font-size:12px; font-weight:700;">ACADEMIC LINEAR ALGEBRA REPORT • OPERATION: ${operation.toUpperCase()}</p>
            </div>
            <div style="text-align:right; font-size:12px; color:#64748b;">
              Date: ${new Date().toLocaleDateString()}
            </div>
          </div>
          ${stepsHtml}
          <script>window.onload = () => { window.print(); };</script>
        </body>
      </html>
    `);
    printWin.document.close();
  };

  const finalResult = useMemo(() => [...steps].reverse().find(s => s.resultText)?.resultText ?? '', [steps]);
  const shown = viewMode === 'player' && steps.length > 0 ? [steps[Math.min(activeIdx, steps.length - 1)]] : steps;

  const aTitle = def.aLabel ?? (def.kind === 'system' ? 'Coefficients A' : 'Matrix A');
  const bTitle = def.kind === 'transform' ? 'Vector v' : 'Constants b';

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center p-3 bg-black/75 backdrop-blur-md" style={{ zIndex: 2147483647 }} onClick={onClose}>
      <div className="bg-neutral-50 w-full max-w-6xl max-h-[94vh] rounded-[32px] shadow-2xl border border-white flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="shrink-0 flex flex-wrap justify-between items-center gap-3 px-5 py-4 bg-white shadow-sm z-30">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-black text-white rounded-2xl"><Calculator size={22} /></div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">Athar Matrix Studio</h2>
              <p className="text-xs font-semibold text-neutral-500">Exact rational engine · every step explained</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={() => setUseFractions(v => !v)} className={`px-4 py-2 rounded-xl text-xs font-bold border ${useFractions ? 'bg-black text-white border-black' : 'bg-white border-neutral-300'}`}>
              {useFractions ? 'Fractions (1/3)' : 'Decimals (0.333)'}
            </button>
            <button onClick={() => setShowHistory(v => !v)} className="px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs font-bold flex gap-1 items-center">
              <HistoryIcon size={15} /> History ({history.length})
            </button>
            {steps.length > 0 && (
              <>
                <button onClick={copyLatex} className="px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs font-bold flex gap-1 items-center">
                  {copied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />} LaTeX
                </button>
                <button onClick={handleExportPDF} className="px-3 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold flex gap-1 items-center">
                  <FileText size={15} /> Export PDF
                </button>
              </>
            )}
            <button onClick={onClose} aria-label="Close" className="p-2 bg-neutral-100 hover:bg-red-100 text-neutral-500 hover:text-red-600 rounded-full transition-colors"><X size={20} /></button>
          </div>
        </div>

        {/* Workspace */}
        <div className="flex-1 overflow-y-auto p-4 md:p-7 flex flex-col gap-5">

          {showHistory && (
            <div className="bg-white border border-neutral-200 rounded-2xl p-4 flex flex-wrap gap-2 items-center">
              {history.length === 0 && <span className="text-sm text-neutral-500">No calculations yet. Press Simulate and it will appear here.</span>}
              {history.map(h => (
                <button key={h.id} onClick={() => restore(h)} className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-xs font-bold">
                  {opOf(h.op).label.split('(')[0].trim()} · {h.rows}×{h.cols}
                </button>
              ))}
              {history.length > 0 && (
                <button onClick={() => setHistory([])} className="ml-auto text-xs font-bold text-red-500 hover:underline">Clear history</button>
              )}
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-neutral-200">
            <div className="flex flex-wrap gap-4 items-center bg-neutral-100 px-4 py-2 rounded-2xl border border-neutral-200">
              {def.kind === 'vectors' ? (
                <label className="flex gap-2 items-center text-xs font-bold">
                  <span className="text-neutral-500">Dimension</span>
                  <input type="range" min={2} max={5} value={vecSize} disabled={operation === 'cross'} onChange={e => { setVecSize(Number(e.target.value)); resetUI(); }} className="w-20 accent-black" />
                  <span className="bg-white px-2 py-1 rounded">{vecSize}D</span>
                </label>
              ) : (
                <>
                  <label className="flex gap-2 items-center text-xs font-bold">
                    <span className="text-neutral-500">{def.square ? 'Size n' : 'Rows'}</span>
                    <input type="range" min={2} max={6} value={rows} onChange={e => onRows(Number(e.target.value))} className="w-20 accent-black" />
                    <span className="bg-white px-2 py-1 rounded">{def.square ? `${rows}×${rows}` : rows}</span>
                  </label>
                  {!def.square && (
                    <label className="flex gap-2 items-center text-xs font-bold">
                      <span className="text-neutral-500">Cols</span>
                      <input type="range" min={2} max={6} value={cols} onChange={e => onCols(Number(e.target.value))} className="w-20 accent-black" />
                      <span className="bg-white px-2 py-1 rounded">{cols}</span>
                    </label>
                  )}
                  {operation === 'mul' && (
                    <label className="flex gap-2 items-center text-xs font-bold">
                      <span className="text-neutral-500">B cols</span>
                      <input type="range" min={2} max={6} value={bCols} onChange={e => { setBCols(Number(e.target.value)); resetUI(); }} className="w-20 accent-black" />
                      <span className="bg-white px-2 py-1 rounded">{bCols}</span>
                    </label>
                  )}
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-2 items-center justify-center">
              <select
                value={operation}
                onChange={e => handleOperationChange(e.target.value)}
                aria-label="Operation"
                className="px-4 py-2.5 rounded-xl font-bold text-sm bg-white border border-neutral-300 outline-none max-w-[20rem]"
              >
                {GROUPS.map(g => (
                  <optgroup key={g} label={g}>
                    {OPS.filter(o => o.group === g).map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
                  </optgroup>
                ))}
              </select>
              <button onClick={fillRandom} title="Random values" className="p-2.5 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100"><RefreshCw size={18} /></button>
              <button onClick={clearAll} title="Clear" className="p-2.5 bg-white border border-neutral-300 text-red-500 rounded-xl hover:bg-red-50"><Trash2 size={18} /></button>
              <button onClick={handleSolve} className="px-6 py-2.5 bg-black text-white font-black text-sm rounded-xl flex items-center gap-2 hover:bg-neutral-800">
                <Play size={16} /> SIMULATE
              </button>
            </div>
          </div>

          {/* Presets */}
          <div className="flex flex-wrap items-center gap-3 px-4 py-3 bg-neutral-900 text-white rounded-2xl text-xs">
            <span className="flex gap-2 items-center font-bold text-neutral-300"><Sparkles size={15} className="text-amber-400" /> Examples</span>
            {PRESETS.map(p => (
              <button key={p.label} onClick={() => loadPreset(p)} className={`px-3 py-1 rounded font-semibold ${p.tone === 'accent' ? 'bg-amber-500/20 text-amber-300' : 'bg-neutral-800 hover:bg-neutral-700'}`}>
                {p.label}
              </button>
            ))}
          </div>

          {/* Inputs */}
          <div className="flex flex-wrap justify-center items-start gap-8 bg-white p-6 md:p-8 rounded-3xl border border-neutral-200 shadow-sm overflow-x-auto">
            {def.kind === 'vectors' ? (
              <div className="flex flex-col gap-4">
                {([['Vector U', rawU, setRawU, 'blue'], ['Vector V', rawV, setRawV, 'green']] as const).map(([name, val, setter, tone]) => (
                  <div key={name} className="flex items-center gap-3">
                    <span className={`font-black w-20 ${tone === 'blue' ? 'text-blue-700' : 'text-emerald-700'}`}>{name}</span>
                    <div className={`flex gap-2 border-l-[3px] border-r-[3px] ${tone === 'blue' ? 'border-blue-600' : 'border-emerald-600'} px-3 py-1`}>
                      {val.map((v, i) => <Cell key={i} value={v} tone={tone} onChange={nv => setVecCell(setter)(i, nv)} onEnter={handleSolve} />)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <GridInput title={aTitle} grid={rawA} onCell={setCell(setRawA)} onEnter={handleSolve} />
                {def.kind === 'pair' && (
                  <>
                    <div className="self-center text-3xl font-black text-neutral-300">{operation === 'add' ? '+' : operation === 'sub' ? '−' : '×'}</div>
                    <GridInput title="Matrix B" grid={rawB} onCell={setCell(setRawB)} onEnter={handleSolve} />
                  </>
                )}
                {(def.kind === 'system' || def.kind === 'transform') && (
                  <>
                    <GridInput
                      title={bTitle}
                      grid={rawVecB.map(v => [v])}
                      onCell={(r, _c, v) => setVecCell(setRawVecB)(r, v)}
                      onEnter={handleSolve}
                      tone="blue"
                      vars={def.kind === 'system'}
                    />
                  </>
                )}
              </>
            )}
            <p className="basis-full text-center text-xs text-neutral-400 font-medium">
              Type integers, decimals or fractions (e.g. -3, 0.25, 2/3). Press Enter in any cell to simulate. Red cells contain invalid input.
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-700 font-bold rounded-2xl flex items-start gap-2 border border-red-200">
              <AlertTriangle size={18} className="shrink-0 mt-0.5" /> <span>{error}</span>
            </div>
          )}

          <div ref={resultsRef} className="flex flex-col gap-5 scroll-mt-4">
            {finalResult && (
              <div className="p-5 bg-emerald-50 text-emerald-900 font-black text-lg md:text-xl text-center rounded-3xl border border-emerald-200 break-words">
                {finalResult}
              </div>
            )}

            {steps.length > 0 && (
              <div className="flex flex-wrap justify-between items-center gap-3 bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm">
                <div className="flex gap-2">
                  <button onClick={() => { setViewMode('all'); setIsPlaying(false); }} className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 ${viewMode === 'all' ? 'bg-black text-white' : 'bg-neutral-100'}`}>
                    <Layers size={14} /> Full solution ({steps.length})
                  </button>
                  <button onClick={() => setViewMode('player')} className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 ${viewMode === 'player' ? 'bg-blue-600 text-white' : 'bg-neutral-100'}`}>
                    <Play size={14} /> Step player
                  </button>
                </div>
                {viewMode === 'player' && (
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setIsPlaying(false); setActiveIdx(p => Math.max(0, p - 1)); }} disabled={activeIdx === 0} aria-label="Previous step" className="p-2 bg-neutral-100 rounded-xl disabled:opacity-40"><ChevronLeft size={18} /></button>
                    <button onClick={() => { if (activeIdx >= steps.length - 1) setActiveIdx(0); setIsPlaying(p => !p); }} className="px-3 py-2 bg-black text-white text-xs font-bold rounded-xl flex items-center gap-1">
                      {isPlaying ? <><Pause size={13} /> Pause</> : <><Play size={13} /> Play</>}
                    </button>
                    <button onClick={() => { setIsPlaying(false); setActiveIdx(p => Math.min(steps.length - 1, p + 1)); }} disabled={activeIdx >= steps.length - 1} aria-label="Next step" className="p-2 bg-neutral-100 rounded-xl disabled:opacity-40"><ChevronRight size={18} /></button>
                    <span className="text-xs font-bold text-neutral-500 w-14 text-center">{Math.min(activeIdx, steps.length - 1) + 1} / {steps.length}</span>
                  </div>
                )}
                {viewMode === 'player' && (
                  <div className="basis-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 transition-all" style={{ width: `${((Math.min(activeIdx, steps.length - 1) + 1) / steps.length) * 100}%` }} />
                  </div>
                )}
              </div>
            )}

            {shown.map((step, i) => {
              const n = viewMode === 'player' ? Math.min(activeIdx, steps.length - 1) + 1 : i + 1;
              return <StepCard key={`${viewMode}-${n}`} step={step} label={`Step ${n}`} fmt={fmt} />;
            })}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
