// Orbital Workbench / Zip: a 6×6 strategic full-grid path with dense checkpoints, non-crossable walls, and no obvious serpentine traversal.
import type { Cell } from "@/game/logicPuzzles/core";
import { keyOf, orthogonal, sameCell } from "@/game/logicPuzzles/core";

export type Edge = [Cell, Cell];
export const zipBoard = {
  rows: 6, cols: 6,
  numbers: [{ value: 1, cell: { row: 0, col: 0 } }, { value: 2, cell: { row: 1, col: 1 } }, { value: 3, cell: { row: 3, col: 1 } }, { value: 4, cell: { row: 4, col: 0 } }, { value: 5, cell: { row: 5, col: 4 } }, { value: 6, cell: { row: 4, col: 3 } }, { value: 7, cell: { row: 3, col: 4 } }, { value: 8, cell: { row: 1, col: 3 } }, { value: 9, cell: { row: 0, col: 4 } }, { value: 10, cell: { row: 0, col: 3 } }],
  blockedEdges: [
    [{ row: 0, col: 0 }, { row: 1, col: 0 }], [{ row: 0, col: 2 }, { row: 0, col: 3 }], [{ row: 1, col: 1 }, { row: 2, col: 1 }], [{ row: 2, col: 0 }, { row: 2, col: 1 }],
    [{ row: 2, col: 2 }, { row: 2, col: 3 }], [{ row: 3, col: 1 }, { row: 3, col: 2 }], [{ row: 3, col: 2 }, { row: 3, col: 3 }], [{ row: 3, col: 4 }, { row: 4, col: 4 }], [{ row: 2, col: 3 }, { row: 3, col: 3 }],
  ] as Edge[],
};
export const zipSolution: Cell[] = [
  { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 1, col: 2 }, { row: 1, col: 1 }, { row: 1, col: 0 },
  { row: 2, col: 0 }, { row: 3, col: 0 }, { row: 3, col: 1 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 3, col: 2 },
  { row: 4, col: 2 }, { row: 4, col: 1 }, { row: 4, col: 0 }, { row: 5, col: 0 }, { row: 5, col: 1 }, { row: 5, col: 2 },
  { row: 5, col: 3 }, { row: 5, col: 4 }, { row: 5, col: 5 }, { row: 4, col: 5 }, { row: 4, col: 4 }, { row: 4, col: 3 },
  { row: 3, col: 3 }, { row: 3, col: 4 }, { row: 3, col: 5 }, { row: 2, col: 5 }, { row: 2, col: 4 }, { row: 2, col: 3 },
  { row: 1, col: 3 }, { row: 1, col: 4 }, { row: 1, col: 5 }, { row: 0, col: 5 }, { row: 0, col: 4 }, { row: 0, col: 3 },
];
const blocked = (a: Cell, b: Cell) => zipBoard.blockedEdges.some(([left, right]) => sameCell(left, a) && sameCell(right, b) || sameCell(left, b) && sameCell(right, a));
const numberAt = (cell: Cell) => zipBoard.numbers.find((item) => sameCell(item.cell, cell))?.value;
export function validZipPath(path: Cell[]) { if (!path.length || !sameCell(path[0], zipBoard.numbers[0].cell)) return false; const visited = new Set<string>(); let expected = 1; for (let index = 0; index < path.length; index += 1) { const cell = path[index]; if (cell.row < 0 || cell.row >= zipBoard.rows || cell.col < 0 || cell.col >= zipBoard.cols || visited.has(keyOf(cell))) return false; if (index > 0 && (!orthogonal(path[index - 1], cell) || blocked(path[index - 1], cell))) return false; const label = numberAt(cell); if (label !== undefined) { if (label !== expected) return false; expected += 1; } visited.add(keyOf(cell)); } return true; }
export function solvedZip(path: Cell[]) { return validZipPath(path) && path.length === zipBoard.rows * zipBoard.cols && zipBoard.numbers.every((item) => path.some((cell) => sameCell(cell, item.cell))); }
export function countZipSolutions(limit = 2) { let count = 0; const search = (path: Cell[]): void => { if (count >= limit) return; if (path.length === zipBoard.rows * zipBoard.cols) { if (solvedZip(path)) count += 1; return; } const last = path[path.length - 1]; const visited = new Set(path.map(keyOf)); const nexts = [{ row: last.row - 1, col: last.col }, { row: last.row + 1, col: last.col }, { row: last.row, col: last.col - 1 }, { row: last.row, col: last.col + 1 }].filter((next) => next.row >= 0 && next.row < zipBoard.rows && next.col >= 0 && next.col < zipBoard.cols && !visited.has(keyOf(next)) && !blocked(last, next)); for (const next of nexts) if (validZipPath([...path, next])) search([...path, next]); }; search([zipBoard.numbers[0].cell]); return count; }
