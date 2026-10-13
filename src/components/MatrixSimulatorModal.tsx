// src/components/MatrixSimulatorModal.tsx
import React, { useState, useEffect } from 'react';
import { X, Calculator, Play, RefreshCw, Trash2 } from 'lucide-react';
import { 
  solveGaussJordanSteps, solveGaussianSteps, solveCramerSteps, solveInverseMethodSteps,
  getDeterminant, getTranspose, getTrace, getInverse, isSymmetric, operateMatrices, 
  MathStep, getVarName, getRREFSteps, getRank, gramSchmidtSteps, 
  dotProduct, crossProductSteps, vectorAngle, vectorMagnitude
} from '../utils/matrixMath';

export function MatrixSimulatorModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<'system' | 'properties' | 'operations' | 'advanced' | 'vectors'>('system');
  const [operation, setOperation] = useState('gauss'); 
  
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [vecSize, setVecSize] = useState(3);
  
  const [matrixA, setMatrixA] = useState<number[][]>([]);
  const [matrixB, setMatrixB] = useState<number[][]>([]);
  const [vectorB, setVectorB] = useState<number[]>([]);
  
  const [vectorU, setVectorU] = useState<number[]>([]);
  const [vectorV, setVectorV] = useState<number[]>([]);

  const [steps, setSteps] = useState<MathStep[]>([]);
  const [resultText, setResultText] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setMatrixA(Array.from({ length: rows }, () => new Array(cols).fill(0)));
    setMatrixB(Array.from({ length: rows }, () => new Array(cols).fill(0)));
    setVectorB(new Array(rows).fill(0));
    setSteps([]); setResultText(''); setError('');
  }, [rows, cols]);

  useEffect(() => {
    setVectorU(new Array(vecSize).fill(0));
    setVectorV(new Array(vecSize).fill(0));
    setSteps([]); setResultText(''); setError('');
  }, [vecSize]);

  const fillRandom = () => {
    setMatrixA(matrixA.map(row => row.map(() => Math.floor(Math.random() * 20) - 10)));
    setMatrixB(matrixB.map(row => row.map(() => Math.floor(Math.random() * 20) - 10)));
    setVectorB(vectorB.map(() => Math.floor(Math.random() * 20) - 10));
    setVectorU(vectorU.map(() => Math.floor(Math.random() * 20) - 10));
    setVectorV(vectorV.map(() => Math.floor(Math.random() * 20) - 10));
  };

  const clearAll = () => {
    setMatrixA(matrixA.map(row => row.map(() => 0)));
    setMatrixB(matrixB.map(row => row.map(() => 0)));
    setVectorB(vectorB.map(() => 0));
    setVectorU(vectorU.map(() => 0));
    setVectorV(vectorV.map(() => 0));
    setSteps([]); setResultText(''); setError('');
  };

  const updateMatrix = (setter: any, matrix: number[][], r: number, c: number, v: string) => {
    const newM = [...matrix]; newM[r][c] = parseFloat(v) || 0; setter(newM);
  };

  const updateVector = (setter: any, vec: number[], i: number, v: string) => {
    const newV = [...vec]; newV[i] = parseFloat(v) || 0; setter(newV);
  };

  const validateOperation = () => {
    const requiresSquare = ['gauss', 'gaussian', 'cramer', 'inverse_method', 'det', 'inv', 'trace', 'sym'];
    if (requiresSquare.includes(operation) && rows !== cols && mode !== 'vectors') {
      throw new Error(`This operation requires a Square Matrix (N × N). Your matrix is ${rows} × ${cols}.`);
    }
  };

  const handleSolve = () => {
    try {
      setError(''); setSteps([]); setResultText('');
      validateOperation();
      
      if (mode === 'system') {
        if (operation === 'gauss') setSteps(solveGaussJordanSteps(matrixA, vectorB));
        if (operation === 'gaussian') setSteps(solveGaussianSteps(matrixA, vectorB));
        if (operation === 'cramer') setSteps(solveCramerSteps(matrixA, vectorB));
        if (operation === 'inverse_method') setSteps(solveInverseMethodSteps(matrixA, vectorB));
      } 
      else if (mode === 'properties') {
        if (operation === 'det') setResultText(`Determinant |A| = ${getDeterminant(matrixA).toFixed(4)}`);
        if (operation === 'trace') setResultText(`Trace(A) = ${getTrace(matrixA)}`);
        if (operation === 'sym') setResultText(isSymmetric(matrixA) ? 'Matrix is SYMMETRIC' : 'Matrix is NOT SYMMETRIC');
        if (operation === 'trans') setSteps([{ title: "Transpose Aᵀ", description: "", matrix: getTranspose(matrixA) }]);
        if (operation === 'inv') setSteps([{ title: "Inverse A⁻¹", description: "", matrix: getInverse(matrixA) }]);
      }
      else if (mode === 'operations') {
        setSteps([{ title: `Result of A ${operation === 'add' ? '+' : operation === 'sub' ? '-' : '×'} B`, description: "", matrix: operateMatrices(matrixA, matrixB, operation as any) }]);
      }
      else if (mode === 'advanced') {
        if (operation === 'rref') setSteps(getRREFSteps(matrixA));
        if (operation === 'rank') setResultText(`Rank(A) = ${getRank(matrixA)}`);
        if (operation === 'gram') setSteps(gramSchmidtSteps(matrixA));
      }
      else if (mode === 'vectors') {
        if (operation === 'dot') setResultText(`U • V (Dot Product) = ${dotProduct(vectorU, vectorV)}`);
        if (operation === 'cross') setSteps(crossProductSteps(vectorU, vectorV));
        if (operation === 'angle') setResultText(`Angle θ = ${vectorAngle(vectorU, vectorV).toFixed(2)}°`);
        if (operation === 'proj') {
          const dot = dotProduct(vectorU, vectorV);
          const magV2 = dotProduct(vectorV, vectorV);
          if (magV2 === 0) throw new Error("Cannot project onto a zero vector.");
          const scalar = dot / magV2;
          setSteps([{ title: "Projection of U onto V", description: `proj_V(U) = (U•V / ||V||²) * V`, vector: vectorV.map(v => v * scalar) }]);
        }
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    // هنا السر: zIndex: 2147483647 رح يخلي المحاكي فوق كل شيء حرفياً
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-all" style={{ zIndex: 2147483647 }} onClick={onClose}>
      
      <div className="bg-gradient-to-br from-neutral-50 to-neutral-200 w-full max-w-5xl max-h-[90vh] rounded-[30px] shadow-2xl flex flex-col overflow-y-auto relative custom-scrollbar" onClick={e => e.stopPropagation()}>
        
        {/* =========================================
            الهيدر الثابت (Title & Close) - رح يضل ملزق فوق
            ========================================= */}
        <div className="sticky top-0 z-50 flex justify-between items-center p-5 md:p-6 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-black text-white rounded-xl shadow-md"><Calculator size={24} /></div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">Athar Matrix Studio</h2>
              <h3 className="text-xs font-bold text-neutral-500 tracking-widest uppercase">Academic Edition</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-white/60 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors shadow-sm backdrop-blur-md"><X size={20}/></button>
        </div>

        {/* =========================================
            المحتوى المتحرك (بيختفي مع السكرول تحت الغباش)
            ========================================= */}
        <div className="p-6 md:p-8 flex flex-col gap-8">
          
          {/* لوحة التحكم */}
          <div className="flex flex-col lg:flex-row flex-wrap justify-between items-center gap-6 bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm">
            
            {/* العدادات */}
            <div className="flex items-center gap-6 bg-white/80 px-4 py-2 rounded-2xl border border-white shadow-sm">
              {mode === 'vectors' ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-500 uppercase">Size</span>
                  <input type="range" min="2" max="5" value={vecSize} onChange={(e) => setVecSize(Number(e.target.value))} className="w-24 accent-black" />
                  <span className="font-mono font-bold text-lg">{vecSize}</span>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-500 uppercase">Rows</span>
                    <input type="range" min="2" max="5" value={rows} onChange={(e) => setRows(Number(e.target.value))} className="w-16 accent-black" />
                    <span className="font-mono font-bold">{rows}</span>
                  </div>
                  <div className="w-px h-6 bg-neutral-300/50"></div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-500 uppercase">Cols</span>
                    <input type="range" min="2" max="5" value={cols} onChange={(e) => setCols(Number(e.target.value))} className="w-16 accent-black" />
                    <span className="font-mono font-bold">{cols}</span>
                  </div>
                </>
              )}
            </div>

            {/* أدوات الخيارات */}
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <select className="px-4 py-2 rounded-xl font-bold bg-white/80 border border-white shadow-sm outline-none backdrop-blur-md focus:ring-2 focus:ring-black" 
                      onChange={(e) => { setMode(e.target.selectedOptions[0].dataset.mode as any); setOperation(e.target.value); }}>
                <optgroup label="Solve Systems [A|B]">
                  <option data-mode="system" value="gauss">Gauss-Jordan Elimination</option>
                  <option data-mode="system" value="gaussian">Gaussian Elimination</option>
                  <option data-mode="system" value="cramer">Cramer's Rule</option>
                  <option data-mode="system" value="inverse_method">Inverse Method (A⁻¹B)</option>
                </optgroup>
                <optgroup label="Advanced & Subspaces">
                  <option data-mode="advanced" value="rref">RREF (Row Echelon Form)</option>
                  <option data-mode="advanced" value="rank">Matrix Rank</option>
                  <option data-mode="advanced" value="gram">Gram-Schmidt Process</option>
                </optgroup>
                <optgroup label="Vector Calculus">
                  <option data
