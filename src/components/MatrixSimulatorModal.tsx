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
                  <option data-mode="vectors" value="dot">Dot Product (U • V)</option>
                  <option data-mode="vectors" value="cross">Cross Product (U × V) 3D</option>
                  <option data-mode="vectors" value="angle">Angle Between (θ)</option>
                  <option data-mode="vectors" value="proj">Projection (Proj_v U)</option>
                </optgroup>
                <optgroup label="Matrix Properties">
                  <option data-mode="properties" value="det">Determinant |A|</option>
                  <option data-mode="properties" value="inv">Inverse A⁻¹</option>
                  <option data-mode="properties" value="trans">Transpose Aᵀ</option>
                  <option data-mode="properties" value="trace">Trace(A)</option>
                  <option data-mode="properties" value="sym">Check Symmetry</option>
                </optgroup>
                <optgroup label="Matrix Operations">
                  <option data-mode="operations" value="add">Add (A + B)</option>
                  <option data-mode="operations" value="sub">Subtract (A - B)</option>
                  <option data-mode="operations" value="mul">Multiply (A × B)</option>
                </optgroup>
              </select>
              
              <button onClick={fillRandom} className="p-2 bg-white/80 border border-white rounded-xl hover:bg-neutral-100 shadow-sm backdrop-blur-md transition-colors" title="Randomize"><RefreshCw size={20} /></button>
              <button onClick={clearAll} className="p-2 bg-white/80 border border-white text-red-500 rounded-xl hover:bg-red-50 shadow-sm backdrop-blur-md transition-colors" title="Clear"><Trash2 size={20} /></button>
              <button onClick={handleSolve} className="px-6 py-2 bg-black text-white font-bold rounded-xl hover:bg-neutral-800 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                <Play size={16} fill="currentColor" /> CALCULATE
              </button>
            </div>
          </div>

          {/* مساحة إدخال الأرقام */}
          <div className="flex flex-wrap justify-center gap-8 bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-white shadow-sm">
            {mode === 'vectors' ? (
              <div className="flex flex-col gap-8 w-full items-center">
                <div className="flex items-center gap-4">
                  <span className="font-black text-xl text-neutral-400">Vector U = [</span>
                  {vectorU.map((val, i) => (
                    <input key={`U-${i}`} type="number" value={val || ''} placeholder="0" onChange={(e) => updateVector(setVectorU, vectorU, i, e.target.value)} className="w-20 h-14 text-xl text-center bg-blue-50/50 border-2 border-blue-200 rounded-xl font-mono font-bold focus:border-blue-600 outline-none transition-colors" />
                  ))}
                  <span className="font-black text-xl text-neutral-400">]</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-black text-xl text-neutral-400">Vector V = [</span>
                  {vectorV.map((val, i) => (
                    <input key={`V-${i}`} type="number" value={val || ''} placeholder="0" onChange={(e) => updateVector(setVectorV, vectorV, i, e.target.value)} className="w-20 h-14 text-xl text-center bg-green-50/50 border-2 border-green-200 rounded-xl font-mono font-bold focus:border-green-600 outline-none transition-colors" />
                  ))}
                  <span className="font-black text-xl text-neutral-400">]</span>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center gap-3">
                  <span className="font-bold text-neutral-500 text-sm bg-neutral-200/50 px-4 py-1.5 rounded-full">{operation === 'gram' ? 'Vectors (Rows)' : 'Matrix A'}</span>
                  <div className="flex flex-col gap-1.5 border-l-2 border-r-2 border-black px-3 py-2">
                    {matrixA.map((row, i) => (
                      <div key={`A-${i}`} className="flex gap-1.5">
                        {row.map((val, j) => (
                          <input key={`A-${i}-${j}`} type="number" value={val || ''} placeholder="0" onChange={(e) => updateMatrix(setMatrixA, matrixA, i, j, e.target.value)} className="w-14 h-12 text-center bg-neutral-50/80 border border-neutral-200 rounded-lg font-mono font-bold focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {mode === 'operations' && (
                  <>
                    <div className="flex items-center text-3xl font-black text-neutral-300">{operation === 'add' ? '+' : operation === 'sub' ? '-' : '×'}</div>
                    <div className="flex flex-col items-center gap-3">
                      <span className="font-bold text-neutral-500 text-sm bg-neutral-200/50 px-4 py-1.5 rounded-full">Matrix B</span>
                      <div className="flex flex-col gap-1.5 border-l-2 border-r-2 border-black px-3 py-2">
                        {matrixB.map((row, i) => (
                          <div key={`B-${i}`} className="flex gap-1.5">
                            {row.map((val, j) => (
                              <input key={`B-${i}-${j}`} type="number" value={val || ''} placeholder="0" onChange={(e) => updateMatrix(setMatrixB, matrixB, i, j, e.target.value)} className="w-14 h-12 text-center bg-neutral-50/80 border border-neutral-200 rounded-lg font-mono font-bold focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {mode === 'system' && (
                  <>
                    <div className="flex items-center text-3xl font-black text-neutral-300">|</div>
                    <div className="flex flex-col items-center gap-3">
                      <span className="font-bold text-blue-600 text-sm bg-blue-100/50 px-4 py-1.5 rounded-full">Vector B</span>
                      <div className="flex flex-col gap-1.5 border-l-2 border-r-2 border-blue-400 px-3 py-2">
                        {vectorB.map((val, i) => (
                          <div key={`v-wrap-${i}`} className="flex items-center gap-3">
                            <span className="font-bold font-mono text-neutral-400 text-xs w-3">{getVarName(i)}</span>
                            <input key={`v-${i}`} type="number" value={val || ''} placeholder="0" onChange={(e) => updateVector(setVectorB, vectorB, i, e.target.value)} className="w-14 h-12 text-center bg-blue-50/50 border border-blue-200 rounded-lg font-mono font-bold focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* منطقة النتائج والخطوات */}
          {error && <div className="p-4 bg-red-50/90 text-red-600 font-bold rounded-xl border border-red-200 text-center animate-in slide-in-from-top-2 shadow-sm backdrop-blur-sm">{error}</div>}
          
          {resultText && (
            <div className="bg-green-50/90 p-6 rounded-3xl border border-green-200 text-center animate-in zoom-in-95 shadow-sm backdrop-blur-sm">
              <h3 className="text-green-800 font-black text-2xl">{resultText}</h3>
            </div>
          )}

          {steps.map((step, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-white shadow-sm hover:shadow-md transition-shadow flex flex-col lg:flex-row gap-6 items-center animate-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="flex-1 w-full text-center lg:text-left">
                {(mode === 'system' || operation === 'rref' || operation === 'gram') && <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-bold rounded-full mb-3 shadow-sm">Step {index + 1}</div>}
                <h5 className="text-lg font-black text-black mb-1">{step.title}</h5>
                <p className="text-sm text-neutral-500 leading-relaxed">{step.description}</p>
              </div>
              
              {(step.matrix || step.vector) && (
                <div className="flex gap-4 items-center bg-neutral-100/50 border border-neutral-200/50 p-4 rounded-2xl overflow-x-auto w-full lg:w-auto justify-center shadow-inner">
                  {step.matrix && (
                    <div className="flex flex-col gap-1.5 border-l-2 border-r-2 border-black px-3">
                      {step.matrix.map((row, i) => (
                        <div key={i} className="flex gap-4">
                          {row.map((val, j) => <span key={j} className="w-12 text-center font-mono text-sm font-bold text-neutral-800">{Number.isInteger(val) ? val : val.toFixed(2)}</span>)}
                        </div>
                      ))}
                    </div>
                  )}
                  {step.vector && (
                    <>
                      {step.matrix && <div className="w-px h-full bg-neutral-300 mx-2"></div>}
                      <div className="flex flex-col gap-2">
                        {mode === 'vectors' || operation === 'gram' ? (
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-neutral-400">[</span>
                            {step.vector.map((val, i) => <span key={i} className="w-14 text-center font-mono text-sm font-bold text-blue-600">{Number.isInteger(val) ? val : val.toFixed(2)}</span>)}
                            <span className="font-bold text-neutral-400">]</span>
                          </div>
                        ) : (
                          step.vector.map((val, i) => <span key={i} className="w-14 text-center font-mono text-sm font-bold text-blue-600">{Number.isInteger(val) ? val : val.toFixed(2)}</span>)
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}

          {mode === 'system' && steps.length > 0 && steps[steps.length - 1].vector && !error && (
             <div className="bg-green-50/90 p-6 rounded-3xl border border-green-200 text-center animate-in zoom-in-95 mt-4 shadow-sm backdrop-blur-sm">
               <h3 className="text-green-800 font-black text-xl mb-4">Final Values</h3>
               <div className="flex flex-wrap justify-center gap-4">
                 {steps[steps.length - 1].vector!.map((val, i) => (
                   <span key={i} className="font-mono text-xl font-bold bg-white px-6 py-3 rounded-xl border border-green-200 shadow-sm text-green-700">
                     {getVarName(i)} = {Number.isInteger(val) ? val : val.toFixed(3)}
                   </span>
                 ))}
               </div>
             </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
