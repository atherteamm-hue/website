// src/utils/matrixMath.ts

export interface MathStep {
  title: string;
  description: string;
  matrix?: number[][];
  vector?: number[];
  resultText?: string;
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
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A[0].length; j++) {
      if (A[i][j] !== A[j][i]) return false;
    }
  }
  return true;
}

export function getInverse(A: number[][]): number[][] {
  const det = getDeterminant(A);
  if (Math.abs(det) < 1e-10) throw new Error("Matrix is singular (Det = 0). No inverse exists.");
  const n = A.length;
  if (n === 1) return [[1 / A[0][0]]];
  const adjugate = A.map((row, i) =>
    row.map((_, j) => {
      const sub = A.filter((_, r) => r !== i).map(cRow => cRow.filter((_, c) => c !== j));
      const sign = (i + j) % 2 === 0 ? 1 : -1;
      return sign * getDeterminant(sub);
    })
  );
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
// 2. Solving Linear Systems (Step-by-Step)
// ==========================================

export function solveGaussJordanSteps(A: number[][], B: number[]): MathStep[] {
  const steps: MathStep[] = [];
  const n = A.length;
  let mat = A.map(row => [...row]);
  let vec = [...B];

  steps.push({ title: "Initial Augmented Matrix", description: "[A | B]", matrix: mat.map(row => [...row]), vector: [...vec] });

  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(mat[k][i]) > Math.abs(mat[maxRow][i])) maxRow = k;
    }
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
      title: `Find X${i + 1}`, 
      description: `Replace Col ${i + 1} with B. |A${i + 1}| = ${detAi.toFixed(4)}. X${i + 1} = ${detAi.toFixed(4)} / ${detA.toFixed(4)} = ${(detAi/detA).toFixed(4)}`,
      matrix: Ai
    });
  }
  steps.push({ title: "Final Solution", description: "Result vector X", vector: solution });
  return steps;
}
