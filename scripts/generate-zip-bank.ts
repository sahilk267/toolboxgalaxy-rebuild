// Deterministic authoring utility. It produces a candidate bank only; every result must be reviewed and copied into the shipped static data after solver verification.
type Cell = { row: number; col: number };
type Edge = [Cell, Cell];
type Edition = { id: string; difficulty: "calm" | "standard" | "dense"; solution: Cell[]; numbers: { value: number; cell: Cell }[]; blockedEdges: Edge[]; turns: number; solverNodes: number };
const rows = 6; const cols = 6; const total = rows * cols;
let state = 0x8f31a7c9;
const random = () => { state = (state * 1664525 + 1013904223) >>> 0; return state / 0xffffffff; };
const key = (cell: Cell) => `${cell.row}:${cell.col}`;
const same = (a: Cell, b: Cell) => a.row === b.row && a.col === b.col;
const edgeKey = (a: Cell, b: Cell) => [key(a), key(b)].sort().join("|");
const cells = Array.from({ length: total }, (_, index) => ({ row: Math.floor(index / cols), col: index % cols }));
const neighbors = (cell: Cell) => [{ row: cell.row - 1, col: cell.col }, { row: cell.row + 1, col: cell.col }, { row: cell.row, col: cell.col - 1 }, { row: cell.row, col: cell.col + 1 }].filter((next) => next.row >= 0 && next.row < rows && next.col >= 0 && next.col < cols);
const allEdges: Edge[] = cells.flatMap((cell) => neighbors(cell).filter((next) => key(cell) < key(next)).map((next) => [cell, next] as Edge));
const shuffle = <T,>(items: T[]) => [...items].sort(() => random() - .5);

// A 6×6 Hamiltonian cycle cut into a path; endpoint backbites rapidly generate new non-equivalent full-grid routes.
const initialPath: Cell[] = [
  { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 }, { row: 0, col: 4 }, { row: 0, col: 5 },
  { row: 1, col: 5 }, { row: 1, col: 4 }, { row: 1, col: 3 }, { row: 1, col: 2 }, { row: 1, col: 1 }, { row: 2, col: 1 },
  { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }, { row: 2, col: 5 }, { row: 3, col: 5 }, { row: 3, col: 4 },
  { row: 3, col: 3 }, { row: 3, col: 2 }, { row: 3, col: 1 }, { row: 4, col: 1 }, { row: 4, col: 2 }, { row: 4, col: 3 },
  { row: 4, col: 4 }, { row: 4, col: 5 }, { row: 5, col: 5 }, { row: 5, col: 4 }, { row: 5, col: 3 }, { row: 5, col: 2 },
  { row: 5, col: 1 }, { row: 5, col: 0 }, { row: 4, col: 0 }, { row: 3, col: 0 }, { row: 2, col: 0 }, { row: 1, col: 0 },
];

function backbite(path: Cell[]) {
  const front = random() < .5; const endpoint = front ? path[0] : path[path.length - 1]; const adjacent = front ? path[1] : path[path.length - 2]; const candidates = neighbors(endpoint).filter((next) => !same(next, adjacent)); if (!candidates.length) return path;
  const pivot = candidates[Math.floor(random() * candidates.length)]; const index = path.findIndex((cell) => same(cell, pivot)); if (index <= 0 || index >= path.length - 1) return path;
  return front ? [...path.slice(0, index).reverse(), ...path.slice(index)] : [...path.slice(0, index + 1), ...path.slice(index + 1).reverse()];
}
function makeRoute() { let route = initialPath.map((cell) => ({ ...cell })); for (let index = 0; index < 1200; index += 1) route = backbite(route); return route; }
function countTurns(route: Cell[]) { return route.slice(2).filter((cell, index) => { const a = route[index]; const b = route[index + 1]; return b.row - a.row !== cell.row - b.row || b.col - a.col !== cell.col - b.col; }).length; }
function transformCell(cell: Cell, transform: number) { if (transform === 0) return cell; if (transform === 1) return { row: cell.row, col: cols - 1 - cell.col }; if (transform === 2) return { row: rows - 1 - cell.row, col: cell.col }; if (transform === 3) return { row: rows - 1 - cell.row, col: cols - 1 - cell.col }; if (transform === 4) return { row: cell.col, col: cell.row }; if (transform === 5) return { row: cols - 1 - cell.col, col: rows - 1 - cell.row }; if (transform === 6) return { row: cell.col, col: rows - 1 - cell.row }; return { row: cols - 1 - cell.col, col: cell.row }; }
function canonical(route: Cell[]) { return Array.from({ length: 8 }, (_, transform) => route.map((cell) => key(transformCell(cell, transform))).join(",")).sort()[0]; }

function solve(numbers: Edition["numbers"], walls: Edge[], limit = 2) {
  const labelAt = (cell: Cell) => numbers.find((item) => same(item.cell, cell))?.value; const blocked = (a: Cell, b: Cell) => walls.some(([left, right]) => edgeKey(left, right) === edgeKey(a, b)); let found = 0; let nodes = 0;
  const connected = (current: Cell, seen: Set<string>) => { const remaining = new Set([key(current), ...cells.filter((cell) => !seen.has(key(cell))).map(key)]); const visited = new Set<string>(); const stack = [current]; while (stack.length) { const cell = stack.pop()!; if (visited.has(key(cell))) continue; visited.add(key(cell)); neighbors(cell).filter((next) => !blocked(cell, next) && remaining.has(key(next)) && !visited.has(key(next))).forEach((next) => stack.push(next)); } return visited.size === remaining.size; };
  const walk = (path: Cell[], seen: Set<string>, expected: number): void => { if (found >= limit) return; nodes += 1; if (path.length === total) { if (expected === numbers.length + 1) found += 1; return; } const current = path[path.length - 1]; const options = neighbors(current).filter((next) => !seen.has(key(next)) && !blocked(current, next)).filter((next) => { const label = labelAt(next); return label === undefined || label === expected; }).sort((a, b) => neighbors(a).filter((next) => !seen.has(key(next))).length - neighbors(b).filter((next) => !seen.has(key(next))).length); for (const next of options) { const label = labelAt(next); seen.add(key(next)); if (connected(next, seen)) walk([...path, next], seen, label === expected ? expected + 1 : expected); seen.delete(key(next)); } };
  walk([numbers[0].cell], new Set([key(numbers[0].cell)]), 2); return { found, nodes };
}

const configs: { id: string; difficulty: Edition["difficulty"]; checkpoints: number[]; wallCount: number }[] = [
  { id: "zip-aegis", difficulty: "calm", checkpoints: [0, 4, 8, 12, 16, 20, 24, 28, 32, 35], wallCount: 7 },
  { id: "zip-borealis", difficulty: "calm", checkpoints: [0, 4, 9, 13, 17, 21, 25, 29, 33, 35], wallCount: 8 },
  { id: "zip-cinder", difficulty: "standard", checkpoints: [0, 5, 10, 14, 18, 22, 26, 30, 35], wallCount: 8 },
  { id: "zip-delta", difficulty: "standard", checkpoints: [0, 4, 9, 15, 20, 25, 30, 35], wallCount: 9 },
  { id: "zip-ember", difficulty: "standard", checkpoints: [0, 5, 11, 16, 21, 26, 31, 35], wallCount: 9 },
  { id: "zip-fathom", difficulty: "dense", checkpoints: [0, 6, 12, 18, 24, 30, 35], wallCount: 9 },
  { id: "zip-gamma", difficulty: "dense", checkpoints: [0, 7, 14, 21, 28, 35], wallCount: 10 },
];
const editions: Edition[] = []; const used = new Set<string>();
for (const config of configs) {
  let chosen: Edition | null = null;
  for (let attempt = 0; attempt < 240 && !chosen; attempt += 1) {
    const solution = makeRoute(); const turns = countTurns(solution); const signature = canonical(solution); if (turns < 20 || used.has(signature)) continue;
    const numbers = config.checkpoints.map((index, position) => ({ value: position + 1, cell: solution[index] })); const routeEdges = new Set(solution.slice(1).map((cell, index) => edgeKey(solution[index], cell)));
    const candidates = shuffle(allEdges.filter(([a, b]) => !routeEdges.has(edgeKey(a, b))));
    for (let offset = 0; offset < Math.min(14, candidates.length - config.wallCount); offset += 1) { const blockedEdges = candidates.slice(offset, offset + config.wallCount); const result = solve(numbers, blockedEdges); if (result.found === 1) { chosen = { id: config.id, difficulty: config.difficulty, solution, numbers, blockedEdges, turns, solverNodes: result.nodes }; used.add(signature); break; } }
  }
  if (!chosen) throw new Error(`No uniquely solvable strategic field found for ${config.id}.`); editions.push(chosen);
}
console.log(JSON.stringify(editions, null, 2));
