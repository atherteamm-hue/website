// src/utils/matrixMath.ts

export interface MathStep {
  title: string;
  description: string;
  matrix?: number[][];
  vector?: number[];
  resultText?: string;
}

export function getVarName(index: number): string {
  const vars = ['X', 'Y', 'Z', 'W', 'V', 'U'];
  return vars[index] || `X${index + 1}`;
}

// ==========================================
// 1. Basic Operations & Properties
// ==========================================
export function getDeterminant(matrix: number[][]): number {
  const n = matrix.length;
  if (n === 1) return matrix[0][0];
  if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  let det = 0;
  let sign = 1;
  for (let j = 0; j < n; j++) {
    const subMatrix = matrix.slice(1).map(row => row.filter((_, colIndex) => colIndex !== j));
    det += sign * matrix[0][j] * getDeterminant(subMatrix);
    sign = -sign;
  }
  return det;
}

export function getTranspose(A: number[][]): number[][] {
  return A[0].map((_, colIndex) => A.map(row => row[colIndex]));
}

export function getTrace(A: number[][]): number {
  return A.reduce((sum, row, i) => sum + row[i], 0);
}

export function isSymmetric(A: number[][]): boolean {
  if (A.length !== A[0].length) return false;
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A[0].length; j++) {
      if (Math.abs(A[i][j] - A[j][i]) > 1e-9) return false;
    }
  }
  return true;
}

export function getCofactorMatrix(A: number[][]): number[][] {
  const n = A.length;
  if (n === 1) return [[1]];
  return A.map((row, i) =>
    row.map((_, j) => {
      const sub = A.filter((_, r) => r !== i).map(cRow => cRow.filter((_, c) => c !== j));
      const sign = (i + j) % 2 === 0 ? 1 : -1;
      return sign * getDeterminant(sub);
    })
  );
}

export function getInverse(A: number[][]): number[][] {
  const det = getDeterminant(A);
  if (Math.abs(det) < 1e-10) throw new Error("Matrix is singular (Det = 0). No inverse exists.");
  const n = A.length;
  if (n === 1) return [[1 / A[0][0]]];
  const adjugate = getCofactorMatrix(A);
  return getTranspose(adjugate).map(row => row.map(val => val / det));
}

export function operateMatrices(A: number[][], B: number[][], operation: 'add' | 'sub' | 'mul'): number[][] {
  if (operation === 'add' || operation === 'sub') {
    if (A.length !== B.length || A[0].length !== B[0].length) throw new Error("Dimensions must match for Add/Subtract.");
    return A.map((row, i) => row.map((val, j) => operation === 'add' ? val + B[i][j] : val - B[i][j]));
  } else {
    if (A[0].length !== B.length) throw new Error("Cols of A must match Rows of B for Multiplication.");
    return A.map(rowA => B[0].map((_, j) => rowA.reduce((sum, val, k) => sum + val * B[k][j], 0)));
  }
}

// ==========================================
// 2. Advanced & Subspaces (RREF, Rank, Nullity, Eigen, Gram-Schmidt)
// ==========================================

export function getRREFSteps(A: number[][]): MathStep[] {
  const steps: MathStep[] = [];
  let mat = A.map(row => [...row]);
  const rows = mat.length;
  const cols = mat[0].length;
  
  steps.push({ title: "Initial Matrix", description: "Starting matrix before reduction.", matrix: mat.map(row => [...row]) });

  let lead = 0;
  for (let r = 0; r < rows; r++) {
    if (cols <= lead) break;
    let i = r;
    while (Math.abs(mat[i][lead]) < 1e-10) {
      i++;
      if (rows === i) { i = r; lead++; if (cols === lead) return steps; }
    }
    
    if (i !== r) {
      [mat[i], mat[r]] = [mat[r], mat[i]];
      steps.push({ title: `Swap Rows`, description: `R${r + 1} ↔ R${i + 1}`, matrix: mat.map(row => [...row]) });
    }

    let val = mat[r][lead];
    for (let j = 0; j < cols; j++) mat[r][j] /= val;
    steps.push({ title: `Normalize R${r + 1}`, description: `Divide row by ${val.toFixed(2)} to create leading 1.`, matrix: mat.map(row => [...row]) });

    for (let i = 0; i < rows; i++) {
      if (i !== r) {
        val = mat[i][lead];
        for (let j = 0; j < cols; j++) mat[i][j] -= val * mat[r][j];
      }
    }
    steps.push({ title: `Clear Column ${lead + 1}`, description: `Make all other elements in column ${lead + 1} zero.`, matrix: mat.map(row => [...row]) });
    lead++;
  }
  return steps;
}

export function getRank(A: number[][]): number {
  const rref = getRREFSteps(A).pop()?.matrix || A;
  let rank = 0;
  rref.forEach(row => { if (row.some(val => Math.abs(val) > 1e-10)) rank++; });
  return rank;
}

export function getNullity(A: number[][]): number {
  const rank = getRank(A);
  return A[0].length - rank;
}

export function getEigenvalues2x2(A: number[][]): MathStep[] {
  if (A.length !== 2 || A[0].length !== 2) throw new Error("This calculator currently supports Eigenvalues analytical solving for 2x2 matrices only.");
  const a = A[0][0], b = A[0][1], c = A[1][0], d = A[1][1];
  const trace = a + d;
  const det = a * d - b * c;
  const desc = trace * trace - 4 * det;
  
  const steps: MathStep[] = [];
  steps.push({ 
    title: "Characteristic Equation", 
    description: `Det(A - λI) = 0\nλ² - Trace(A)λ + Det(A) = 0\nλ² - (${trace})λ + (${det}) = 0` 
  });

  if (desc >= 0) {
    const l1 = (trace + Math.sqrt(desc)) / 2;
    const l2 = (trace - Math.sqrt(desc)) / 2;
    steps.push({ title: "Eigenvalues (Real Roots)", description: `λ₁ = ${l1.toFixed(4)}\nλ₂ = ${l2.toFixed(4)}` });
  } else {
    const real = trace / 2;
    const img = Math.sqrt(-desc) / 2;
    steps.push({ title: "Eigenvalues (Complex Roots)", description: `λ₁ = ${real.toFixed(4)} + ${img.toFixed(4)}i\nλ₂ = ${real.toFixed(4)} - ${img.toFixed(4)}i` });
  }
  return steps;
}

export function gramSchmidtSteps(vectors: number[][]): MathStep[] {
  const steps: MathStep[] = [];
  const u: number[][] = [];
  
  steps.push({ title: "Initial Vectors", description: "Treating rows of Matrix A as input vectors v1, v2...", matrix: vectors.map(v => [...v]) });

  for (let i = 0; i < vectors.length; i++) {
    let vi = [...vectors[i]];
    let ui = [...vi];
    let projDesc = `u${i + 1} = v${i + 1}`;

    for (let j = 0; j < i; j++) {
      const dotUV = dotProduct(vi, u[j]);
      const dotUU = dotProduct(u[j], u[j]);
      if (dotUU === 0) continue;
      const projFactor = dotUV / dotUU;
      ui = ui.map((val, idx) => val - projFactor * u[j][idx]);
      projDesc += ` - proj_u${j + 1}(v${i + 1})`;
    }
    u.push(ui);
    steps.push({ title: `Calculate Orthogonal Vector u${i + 1}`, description: projDesc, vector: [...ui] });
  }
  
  steps.push({ title: "Final Orthogonal Basis", description: "The set of orthogonal vectors (u1, u2...). Note: Normalize them to get Orthonormal basis.", matrix: u });
  return steps;
}

// ==========================================
// 3. Vectors Math & Transformations
// ==========================================

export function dotProduct(u: number[], v: number[]): number {
  return u.reduce((sum, val, i) => sum + val * (v[i] || 0), 0);
}

export function vectorMagnitude(v: number[]): number {
  return Math.sqrt(dotProduct(v, v));
}

export function crossProductSteps(u: number[], v: number[]): MathStep[] {
  if (u.length !== 3 || v.length !== 3) throw new Error("Cross product is only defined for 3D vectors.");
  const result = [
    u[1] * v[2] - u[2] * v[1],
    u[2] * v[0] - u[0] * v[2],
    u[0] * v[1] - u[1] * v[0]
  ];
  return [
    { title: "Cross Product (U × V)", description: "Determinant of i, j, k matrix.", vector: result }
  ];
}

export function vectorAngle(u: number[], v: number[]): number {
  const dot = dotProduct(u, v);
  const mags = vectorMagnitude(u) * vectorMagnitude(v);
  if (mags === 0) throw new Error("Cannot find angle with a zero vector.");
  return (Math.acos(dot / mags) * 180) / Math.PI; // In Degrees
}

export function linearTransformation(A: number[][], v: number[]): MathStep[] {
  if (A[0].length !== v.length) throw new Error("Matrix columns must match Vector size for Transformation (T(v) = Av).");
  const result = A.map(row => row.reduce((sum, val, i) => sum + val * v[i], 0));
  return [
    { title: "Linear Transformation", description: "T(v) = A · v", vector: result }
  ];
}

// ==========================================
// 4. Solving Systems
// ==========================================
export function solveGaussJordanSteps(A: number[][], B: number[]): MathStep[] {
    const steps: MathStep[] = [];
    const n = A.length;
    let mat = A.map(row => [...row]);
    let vec = [...B];
    steps.push({ title: "Initial Augmented Matrix", description: "[A | B]", matrix: mat.map(row => [...row]), vector: [...vec] });
    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let k = i + 1; k < n; k++) if (Math.abs(mat[k][i]) > Math.abs(mat[maxRow][i])) maxRow = k;
      if (maxRow !== i) {
        [mat[i], mat[maxRow]] = [mat[maxRow], mat[i]];
        [vec[i], vec[maxRow]] = [vec[maxRow], vec[i]];
        steps.push({ title: `Swap Rows`, description: `R${i + 1} ↔ R${maxRow + 1}`, matrix: mat.map(row => [...row]), vector: [...vec] });
      }
      let pivot = mat[i][i];
      if (Math.abs(pivot) < 1e-10) throw new Error("System has no unique solution.");
      for (let j = i; j < n; j++) mat[i][j] /= pivot;
      vec[i] /= pivot;
      steps.push({ title: `Normalize R${i + 1}`, description: `R${i + 1} ÷ ${pivot.toFixed(2)}`, matrix: mat.map(row => [...row]), vector: [...vec] });
      for (let k = 0; k < n; k++) {
        if (k !== i) {
          let factor = mat[k][i];
          for (let j = i; j < n; j++) mat[k][j] -= factor * mat[i][j];
          vec[k] -= factor * vec[i];
        }
      }
      steps.push({ title: `Eliminate Col ${i + 1}`, description: `Make zeros above and below pivot`, matrix: mat.map(row => [...row]), vector: [...vec] });
    }
    return steps;
  }
  
  export function solveGaussianSteps(A: number[][], B: number[]): MathStep[] {
    const steps: MathStep[] = [];
    const n = A.length;
    let mat = A.map(row => [...row]);
    let vec = [...B];
    steps.push({ title: "Initial Augmented Matrix", description: "[A | B]", matrix: mat.map(row => [...row]), vector: [...vec] });
    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let k = i + 1; k < n; k++) if (Math.abs(mat[k][i]) > Math.abs(mat[maxRow][i])) maxRow = k;
      if (maxRow !== i) {
        [mat[i], mat[maxRow]] = [mat[maxRow], mat[i]];
        [vec[i], vec[maxRow]] = [vec[maxRow], vec[i]];
      }
      let pivot = mat[i][i];
      if (Math.abs(pivot) < 1e-10) throw new Error("System has no unique solution.");
      for (let k = i + 1; k < n; k++) {
        let factor = mat[k][i] / pivot;
        for (let j = i; j < n; j++) mat[k][j] -= factor * mat[i][j];
        vec[k] -= factor * vec[i];
      }
      steps.push({ title: `Forward Elimination (Col ${i + 1})`, description: `Make zeros below pivot`, matrix: mat.map(row => [...row]), vector: [...vec] });
    }
    const solution = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      let sum = vec[i];
      for (let j = i + 1; j < n; j++) sum -= mat[i][j] * solution[j];
      solution[i] = sum / mat[i][i];
    }
    steps.push({ title: "Back Substitution", description: "Solving from bottom to top", vector: solution });
    return steps;
  }
  
  export function solveCramerSteps(A: number[][], B: number[]): MathStep[] {
    const steps: MathStep[] = [];
    const detA = getDeterminant(A);
    if (Math.abs(detA) < 1e-10) throw new Error("Determinant is 0. Cramer's rule cannot be used.");
    steps.push({ title: "Determinant of A", description: `|A| = ${detA.toFixed(4)}` });
    const solution: number[] = [];
    for (let i = 0; i < A.length; i++) {
      const Ai = A.map((row, rowIndex) => row.map((val, colIndex) => colIndex === i ? B[rowIndex] : val));
      const detAi = getDeterminant(Ai);
      solution.push(detAi / detA);
      steps.push({ 
        title: `Find ${getVarName(i)}`, 
        description: `Replace Col ${i + 1} with B. |A${i + 1}| = ${detAi.toFixed(4)}. ${getVarName(i)} = ${detAi.toFixed(4)} / ${detA.toFixed(4)} = ${(detAi/detA).toFixed(4)}`,
        matrix: Ai
      });
    }
    steps.push({ title: "Final Solution", description: "Result vector", vector: solution });
    return steps;
  }
  
  export function solveInverseMethodSteps(A: number[][], B: number[]): MathStep[] {
    const steps: MathStep[] = [];
    const detA = getDeterminant(A);
    if (Math.abs(detA) < 1e-10) throw new Error("Matrix is singular. Cannot use Inverse Method.");
    const invA = getInverse(A);
    steps.push({ title: "1. Find Inverse A⁻¹", description: "Calculate the inverse of coefficient matrix A", matrix: invA });
    const solution = invA.map(row => row.reduce((sum, val, i) => sum + val * B[i], 0));
    steps.push({ title: "2. Multiply A⁻¹ × B", description: "X = A⁻¹ · B", vector: solution });
    return steps;
  }
