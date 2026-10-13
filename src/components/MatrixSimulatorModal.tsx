// src/components/MatrixSimulatorModal.tsx
import React, { useState } from 'react';
import { X, Calculator, Play } from 'lucide-react';
import { 
  solveGaussJordanSteps, solveCramerSteps, getDeterminant, getTranspose, 
  getTrace, getInverse, isSymmetric, operateMatrices, MathStep 
} from '../utils/matrixMath';

export function MatrixSimulatorModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<'system' | 'properties' | 'operations'>('system');
  const [operation, setOperation] = useState('gauss'); // gauss, cramer, det, inv, trans, trace, sym, add, sub, mul
  
  const [matrixA, setMatrixA] = useState<number[][]>([[2, 1, -1], [-3, -1, 2], [-2, 1, 2]]);
  const [matrixB, setMatrixB] = useState<number[][]>([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
  const [vectorB, setVectorB] = useState<number[]>([8, -11, -3]);
  
  const [steps, setSteps] = useState<MathStep[]>([]);
  const [resultText, setResultText] = useState<string>('');
  const [error, setError] = useState<string>('');

  const updateMatrixA = (r: number, c: number, v: string) => {
    const newA = [...matrixA]; newA[r][c] = parseFloat(v) || 0; setMatrixA(newA);
  };
  const updateMatrixB = (r: number, c: number, v: string) => {
    const newB = [...matrixB]; newB[r][c] = parseFloat(v) || 0; setMatrixB(newB);
  };
  const updateVectorB = (r: number, v: string) => {
    const newV = [...vectorB]; newV[r] = parseFloat(v) || 0; setVectorB(newV);
  };

  const handleSolve = () => {
    try {
      setError(''); setSteps([]); setResultText('');
      
      if (mode === 'system') {
        if (operation === 'gauss') setSteps(solveGaussJordanSteps(matrixA, vectorB));
        if (operation === 'cramer') setSteps(solveCramerSteps(matrixA, vectorB));
      } 
      else if (mode === 'properties') {
        if (operation === 'det') setResultText(`Determinant |A| = ${getDeterminant(matrixA)}`);
        if (operation === 'trace') setResultText(`Trace(A) = ${getTrace(matrixA)}`);
        if (operation === 'sym') setResultText(isSymmetric(matrixA) ? 'Matrix is SYMMETRIC' : 'Matrix is NOT SYMMETRIC');
        if (operation === 'trans') setSteps([{ title: "Transposed Matrix A^T", description: "", matrix: getTranspose(matrixA) }]);
        if (operation === 'inv') setSteps([{ title: "Inverse Matrix A^-1", description: "", matrix: getInverse(matrixA) }]);
      }
      else if (mode === 'operations') {
        setSteps([{ 
          title: `Result of A ${operation === 'add' ? '+' : operation === 'sub' ? '-' : '×'} B`, 
          description: "", 
          matrix: operateMatrices(matrixA, matrixB, operation as any) 
        }]);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md" onClick={onClose}>
      <div className="bg-[#fafafa] w-full max-w-5xl max-h-[90vh] rounded-[30px] shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="p-6 bg-white border-b flex justify-between items-start shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-black text-white rounded-xl"><Calculator size={24} /></div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">Athar Matrix Studio</h2>
              <h3 className="text-xs font-bold text-neutral-400 tracking-widest uppercase">Advanced Linear Algebra Simulator</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-neutral-100 hover:bg-red-50 hover:text-red-500 rounded-full"><X size={20}/></button>
        </div>

        {/* Tools Menu */}
        <div className="bg-neutral-100 p-4 flex gap-4 justify-center border-b">
          <select className="px-4 py-2 rounded-xl font-bold bg-white border-2 border-black outline-none" 
                  onChange={(e) => { setMode(e.target.selectedOptions[0].dataset.mode as any); setOperation(e.target.value); }}>
            <optgroup label="Solve Systems [A|B]">
              <option data-mode="system" value="gauss">Gauss-Jordan Elimination</option>
              <option data-mode="system" value="cramer">Cramer's Rule</option>
            </optgroup>
            <optgroup label="Matrix A Properties">
              <option data-mode="properties" value="det">Determinant |A|</option>
              <option data-mode="properties" value="inv">Inverse A⁻¹</option>
              <option data-mode="properties" value="trans">Transpose Aᵀ</option>
              <option data-mode="properties" value="trace">Trace(A)</option>
              <option data-mode="properties" value="sym">Check Symmetry</option>
            </optgroup>
            <optgroup label="A & B Operations">
              <option data-mode="operations" value="add">Add (A + B)</option>
              <option data-mode="operations" value="sub">Subtract (A - B)</option>
              <option data-mode="operations" value="mul">Multiply (A × B)</option>
            </optgroup>
          </select>
          <button onClick={handleSolve} className="px-6 py-2 bg-black text-white font-bold rounded-xl hover:bg-neutral-800 flex items-center gap-2">
            <Play size={16} fill="currentColor" /> CALCULATE
          </button>
        </div>

        {/* Input Area */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          <div className="flex flex-wrap justify-center gap-8 bg-white p-6 rounded-3xl border border-neutral-200">
            {/* Matrix A */}
            <div className="flex flex-col items-center gap-2">
              <span className="font-bold text-neutral-500 text-sm">Matrix A</span>
              <div className="flex flex-col gap-1 border-l-2 border-r-2 border-black px-2 py-1">
                {matrixA.map((row, i) => (
                  <div key={`A-${i}`} className="flex gap-1">
                    {row.map((val, j) => (
                      <input key={`A-${i}-${j}`} type="number" value={val} onChange={(e) => updateMatrixA(i, j, e.target.value)} className="w-16 h-12 text-center bg-neutral-50 border rounded-lg font-mono font-bold focus:border-black outline-none" />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Matrix B (Only for Operations) */}
            {mode === 'operations' && (
              <>
                <div className="flex items-center text-3xl font-black text-neutral-300">
                  {operation === 'add' ? '+' : operation === 'sub' ? '-' : '×'}
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="font-bold text-neutral-500 text-sm">Matrix B</span>
                  <div className="flex flex-col gap-1 border-l-2 border-r-2 border-black px-2 py-1">
                    {matrixB.map((row, i) => (
                      <div key={`B-${i}`} className="flex gap-1">
                        {row.map((val, j) => (
                          <input key={`B-${i}-${j}`} type="number" value={val} onChange={(e) => updateMatrixB(i, j, e.target.value)} className="w-16 h-12 text-center bg-neutral-50 border rounded-lg font-mono font-bold focus:border-black outline-none" />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Vector B (Only for Systems) */}
            {mode === 'system' && (
              <>
                <div className="flex items-center text-3xl font-black text-neutral-300">|</div>
                <div className="flex flex-col items-center gap-2">
                  <span className="font-bold text-neutral-500 text-sm">Vector B</span>
                  <div className="flex flex-col gap-1 border-l-2 border-r-2 border-black px-2 py-1">
                    {vectorB.map((val, i) => (
                      <input key={`v-${i}`} type="number" value={val} onChange={(e) => updateVectorB(i, e.target.value)} className="w-16 h-12 text-center bg-neutral-50 border rounded-lg font-mono font-bold focus:border-black outline-none" />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Results Area */}
          {error && <div className="p-4 bg-red-50 text-red-600 font-bold rounded-xl border text-center">{error}</div>}
          
          {resultText && (
            <div className="bg-green-50 p-6 rounded-3xl border border-green-200 text-center">
              <h3 className="text-green-800 font-black text-2xl">{resultText}</h3>
            </div>
          )}

          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                {mode === 'system' && <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-bold rounded-full mb-2">Step {index + 1}</div>}
                <h5 className="text-lg font-black">{step.title}</h5>
                <p className="text-sm text-neutral-500">{step.description}</p>
              </div>
              
              {step.matrix && (
                <div className="flex gap-4 items-center bg-neutral-50 p-4 rounded-2xl">
                  <div className="flex flex-col gap-1 border-l-2 border-r-2 border-black px-2">
                    {step.matrix.map((row, i) => (
                      <div key={i} className="flex gap-4">
                        {row.map((val, j) => <span key={j} className="w-12 text-center font-mono text-sm font-bold">{Number.isInteger(val) ? val : val.toFixed(2)}</span>)}
                      </div>
                    ))}
                  </div>
                  {step.vector && (
                    <>
                      <div className="w-px h-full bg-neutral-300 mx-2"></div>
                      <div className="flex flex-col gap-1">
                        {step.vector.map((val, i) => <span key={i} className="w-12 text-center font-mono text-sm font-bold text-blue-600">{Number.isInteger(val) ? val : val.toFixed(2)}</span>)}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
