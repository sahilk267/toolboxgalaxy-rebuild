// Authoring check for a deliberately non-serpentine 6×6 Zip candidate. Run with: pnpm exec tsx scripts/verify-zip-strategic-candidate.ts
type Cell = { row: number; col: number };
type Edge = [Cell, Cell];
const rows = 6; const cols = 6; const total = rows * cols;
const solution: Cell[] = [
  { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 1, col: 2 }, { row: 1, col: 1 }, { row: 1, col: 0 },
  { row: 2, col: 0 }, { row: 3, col: 0 }, { row: 3, col: 1 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 3, col: 2 },
  { row: 4, col: 2 }, { row: 4, col: 1 }, { row: 4, col: 0 }, { row: 5, col: 0 }, { row: 5, col: 1 }, { row: 5, col: 2 },
  { row: 5, col: 3 }, { row: 5, col: 4 }, { row: 5, col: 5 }, { row: 4, col: 5 }, { row: 4, col: 4 }, { row: 4, col: 3 },
  { row: 3, col: 3 }, { row: 3, col: 4 }, { row: 3, col: 5 }, { row: 2, col: 5 }, { row: 2, col: 4 }, { row: 2, col: 3 },
  { row: 1, col: 3 }, { row: 1, col: 4 }, { row: 1, col: 5 }, { row: 0, col: 5 }, { row: 0, col: 4 }, { row: 0, col: 3 },
];
const checkpointIndexes = [0, 4, 8, 14, 19, 23, 25, 30, 34, 35];
const numbers = checkpointIndexes.map((index, position) => ({ value: position + 1, cell: solution[index] }));
const walls: Edge[] = [
  [{ row: 0, col: 0 }, { row: 1, col: 0 }], [{ row: 0, col: 2 }, { row: 0, col: 3 }],
  [{ row: 1, col: 1 }, { row: 2, col: 1 }], [{ row: 2, col: 0 }, { row: 2, col: 1 }], [{ row: 2, col: 2 }, { row: 2, col: 3 }],
  [{ row: 3, col: 1 }, { row: 3, col: 2 }], [{ row: 3, col: 2 }, { row: 3, col: 3 }], [{ row: 3, col: 4 }, { row: 4, col: 4 }], [{ row: 2, col: 3 }, { row: 3, col: 3 }],
];
const key = (cell: Cell) => `${cell.row}:${cell.col}`;
const same = (a: Cell, b: Cell) => a.row === b.row && a.col === b.col;
const edgeKey = (a: Cell, b: Cell) => [key(a), key(b)].sort().join("|");
const isWall = (a: Cell, b: Cell) => walls.some(([left, right]) => edgeKey(left, right) === edgeKey(a, b));
const neighbors = (cell: Cell) => [{ row: cell.row - 1, col: cell.col }, { row: cell.row + 1, col: cell.col }, { row: cell.row, col: cell.col - 1 }, { row: cell.row, col: cell.col + 1 }].filter((next) => next.row >= 0 && next.row < rows && next.col >= 0 && next.col < cols && !isWall(cell, next));
const labelAt = (cell: Cell) => numbers.find((item) => same(item.cell, cell))?.value;

function connected(current: Cell, seen: Set<string>) {
  const remaining = new Set<string>([key(current), ...Array.from({ length: total }, (_, index) => ({ row: Math.floor(index / cols), col: index % cols })).filter((cell) => !seen.has(key(cell))).map(key)]); const visited = new Set<string>(); const stack = [current];
  while (stack.length) { const cell = stack.pop()!; if (visited.has(key(cell))) continue; visited.add(key(cell)); for (const next of neighbors(cell)) if (remaining.has(key(next)) && !visited.has(key(next))) stack.push(next); }
  return visited.size === remaining.size;
}

function count(limit = 2) {
  let found = 0; let nodes = 0; const paths: Cell[][] = [];
  const walk = (path: Cell[], seen: Set<string>, expected: number): void => {
    if (found >= limit) return; nodes += 1; if (path.length === total) { if (expected === numbers.length + 1) { found += 1; paths.push([...path]); } return; }
    const current = path[path.length - 1];
    const nexts = neighbors(current).filter((next) => !seen.has(key(next))).filter((next) => { const label = labelAt(next); return label === undefined || label === expected; }).sort((a, b) => neighbors(a).filter((next) => !seen.has(key(next))).length - neighbors(b).filter((next) => !seen.has(key(next))).length);
    for (const next of nexts) { const label = labelAt(next); seen.add(key(next)); if (connected(next, seen)) walk([...path, next], seen, label === expected ? expected + 1 : expected); seen.delete(key(next)); }
  };
  walk([numbers[0].cell], new Set([key(numbers[0].cell)]), 2); return { found, nodes, paths };
}

const result = count();
console.log(JSON.stringify({ rows, cols, numbers, walls, solution, solver: result }, null, 2));
if (result.found !== 1) throw new Error(`Candidate needs revision: expected exactly one route, found ${result.found}.`);
