// Logic Lab / Wend: fixed target-word paths form an orthogonal exact cover; no remote dictionary is required.
import type { Cell } from "@/game/logicPuzzles/core";
import { keyOf, orthogonal, sameCell } from "@/game/logicPuzzles/core";

export type WendWord = { word: string; path: Cell[] };
export const wendGrid = [["T", "A", "N", "G", "O"], ["S", "U", "D", "O", "K"], ["P", "U", "Z", "Z", "U"], ["G", "S", "E", "L", "Z"], ["R", "I", "D", "P", "I"]];
export const wendWords: WendWord[] = [{ word: "TANGO", path: [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 }, { row: 0, col: 4 }] }, { word: "SUDOKU", path: [{ row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }, { row: 2, col: 4 }] }, { word: "PUZZLES", path: [{ row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 3, col: 3 }, { row: 3, col: 2 }, { row: 3, col: 1 }] }, { word: "GRID", path: [{ row: 3, col: 0 }, { row: 4, col: 0 }, { row: 4, col: 1 }, { row: 4, col: 2 }] }, { word: "ZIP", path: [{ row: 3, col: 4 }, { row: 4, col: 4 }, { row: 4, col: 3 }] }];
export const wordFromPath = (path: Cell[]) => path.map((cell) => wendGrid[cell.row]?.[cell.col] || "").join("");
export function validWendPath(path: Cell[]) { return path.length > 0 && path.every((cell, index) => cell.row >= 0 && cell.row < 5 && cell.col >= 0 && cell.col < 5 && !path.slice(0, index).some((previous) => sameCell(previous, cell)) && (index === 0 || orthogonal(path[index - 1], cell))); }
export function matchesWendWord(path: Cell[], word: WendWord) { return wordFromPath(path) === word.word && path.length === word.path.length && path.every((cell, index) => sameCell(cell, word.path[index])); }
export function solvedWend(found: WendWord[]) { if (found.length !== wendWords.length || new Set(found.map((word) => word.word)).size !== wendWords.length) return false; const cells = found.flatMap((word) => word.path).map(keyOf); return new Set(cells).size === 25 && cells.length === 25; }
