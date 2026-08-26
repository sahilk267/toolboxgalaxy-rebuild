import { countSudokuSolutions, miniSudokuGivens, miniSudokuSolution, solvedSudoku } from "../client/src/game/logicPuzzles/miniSudoku";
import { countTangoSolutions, solvedTango, tangoGivens, tangoSolution, tangoViolations } from "../client/src/game/logicPuzzles/tango";
import { countQueensSolutions, queensSolution, solvedQueens, queensViolations, type QueenState } from "../client/src/game/logicPuzzles/queens";
import { countPatchSolutions, patchesSolution, solvedPatches } from "../client/src/game/logicPuzzles/patches";
import { countZipSolutions, solvedZip, zipSolution } from "../client/src/game/logicPuzzles/zip";
import { solvedWend, validWendPath, wendWords } from "../client/src/game/logicPuzzles/wend";

const assert = (condition: unknown, message: string) => { if (!condition) throw new Error(message); };
assert(solvedSudoku(miniSudokuSolution), "Mini Sudoku solution must validate");
assert(countSudokuSolutions(miniSudokuGivens) === 1, "Mini Sudoku givens must have one solution");
const duplicateSudoku = miniSudokuSolution.map((row) => [...row]); duplicateSudoku[0][1] = 1; assert(!solvedSudoku(duplicateSudoku), "Mini Sudoku duplicate must fail");
assert(solvedTango(tangoSolution), "Tango solution must validate");
assert(countTangoSolutions(tangoGivens) === 1, "Tango givens must have one solution");
const tripleTango = tangoSolution.map((row) => [...row]); tripleTango[0][2] = 0; assert(tangoViolations(tripleTango).size > 0, "Tango triple must fail");
const queensGrid: QueenState[][] = Array.from({ length: 6 }, () => Array.from({ length: 6 }, () => "empty")); queensSolution.forEach((col, row) => { queensGrid[row][col] = "queen"; }); assert(solvedQueens(queensGrid), "Queens solution must validate"); assert(countQueensSolutions() === 1, "Queens regions must have one solution"); const adjacentQueens = queensGrid.map((row) => [...row]); adjacentQueens[0][2] = "queen"; assert(queensViolations(adjacentQueens).size > 0, "Adjacent/duplicate queens must fail");
assert(solvedPatches(patchesSolution), "Patches authored partition must validate"); assert(countPatchSolutions() === 1, "Patches clues must have one partition"); assert(!solvedPatches(patchesSolution.slice(0, -1)), "Patches incomplete cover must fail");
assert(solvedZip(zipSolution), "Zip authored path must validate"); assert(countZipSolutions() === 1, "Zip board must have one valid path"); assert(!solvedZip([...zipSolution.slice(0, 3), zipSolution[4]]), "Zip skipped cell must fail");
assert(validWendPath(wendWords[0].path), "Wend authored word path must be orthogonal"); assert(solvedWend(wendWords), "Wend authored paths must exactly cover grid"); assert(!solvedWend(wendWords.slice(0, -1)), "Wend incomplete word cover must fail");
console.log("Logic puzzle validators passed: Mini Sudoku, Tango, Queens, Patches, Zip, Wend.");
