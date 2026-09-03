// Orbital Workbench: derive per-puzzle personal records from genuine locally completed authored editions only; the overview never writes data, exposes keys, or infers an in-progress solve.
import { miniSudokuEditionBank } from "@/game/logicPuzzles/miniSudokuBank";
import { patchesEditionBank } from "@/game/logicPuzzles/patchesBank";
import { queensEditionBank } from "@/game/logicPuzzles/queensBank";
import { tangoEditionBank } from "@/game/logicPuzzles/tangoBank";
import { wendEditionBank } from "@/game/logicPuzzles/wendBank";
import { zipEditionBank } from "@/game/logicPuzzles/zipBank";
import { connectionsEditionBank } from "@/game/logicPuzzles/connectionsBank";
import { DAILY_WORDLE_BANK } from "@/game/logicPuzzles/wordleBank";
import { MINI_CROSSWORD_BANK } from "@/game/logicPuzzles/miniCrosswordBank";
import { readPuzzleCompletionMap, type PuzzleCompletionMap } from "@/lib/puzzleCompletion";

export type LogicPersonalBestSlug = "mini-sudoku" | "tango" | "queens" | "patches" | "zip" | "wend" | "connections" | "wordle" | "mini-crossword";
export type LogicPersonalBest = { slug: LogicPersonalBestSlug; label: string; completedEditions: number; availableEditions: number; currentStreak: number; longestStreak: number };

const oneDay = 86_400_000;
const formatId = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const addDays = (date: Date, amount: number) => { const next = new Date(date); next.setDate(next.getDate() + amount); return next; };
const validDate = (id: string) => { const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(id); if (!match) return null; const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])); return formatId(date) === id ? date : null; };
const run = (dateIds: string[]) => { let longest = 0; let current = 0; let previous = ""; dateIds.forEach((id) => { const date = validDate(id); const previousDate = validDate(previous); current = date && previousDate && date.getTime() - previousDate.getTime() === oneDay ? current + 1 : 1; longest = Math.max(longest, current); previous = id; }); return longest; };
const currentRun = (today: Date, dates: Set<string>) => { let count = 0; let cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate()); while (dates.has(formatId(cursor))) { count += 1; cursor = addDays(cursor, -1); } return count; };

const definitions: { slug: LogicPersonalBestSlug; label: string; prefix: string; editionIds: readonly string[] }[] = [
  { slug: "connections", label: "Connections", prefix: "connections-", editionIds: connectionsEditionBank.map((edition) => edition.id) },
  { slug: "wordle", label: "Wordle Plus", prefix: "wordle-", editionIds: DAILY_WORDLE_BANK.map((edition) => edition.id) },
  { slug: "mini-crossword", label: "Mini Crossword", prefix: "mini-crossword-", editionIds: MINI_CROSSWORD_BANK.map((edition) => edition.id) },
  { slug: "queens", label: "Queens", prefix: "queens-", editionIds: queensEditionBank.map((edition) => edition.id) },
  { slug: "mini-sudoku", label: "Mini Sudoku", prefix: "mini-sudoku-", editionIds: miniSudokuEditionBank.map((edition) => edition.id) },
  { slug: "tango", label: "Tango", prefix: "tango-", editionIds: tangoEditionBank.map((edition) => edition.id) },
  { slug: "patches", label: "Patches", prefix: "patches-", editionIds: patchesEditionBank.map((edition) => edition.id) },
  { slug: "zip", label: "Zip", prefix: "zip-", editionIds: zipEditionBank.map((edition) => edition.id) },
  { slug: "wend", label: "Wend", prefix: "wend-", editionIds: wendEditionBank.map((edition) => edition.id) },
];

export function logicPersonalBests(reference = new Date(), completions: PuzzleCompletionMap = readPuzzleCompletionMap()): LogicPersonalBest[] {
  const today = new Date(reference.getFullYear(), reference.getMonth(), reference.getDate()); const todayId = formatId(today);
  return definitions.map((definition) => {
    const editions = new Set<string>(); const dates = new Set<string>(); const available = new Set(definition.editionIds);
    Object.entries(completions).forEach(([key, value]) => { if (value !== true) return; const separator = key.lastIndexOf(":"); if (separator < 0) return; const record = key.slice(0, separator); const dateId = key.slice(separator + 1); const date = validDate(dateId); if (!date || dateId > todayId || !record.startsWith(definition.prefix)) return; const editionId = record.slice(definition.prefix.length); if (!available.has(editionId)) return; editions.add(editionId); dates.add(dateId); });
    const dateIds = Array.from(dates).sort(); return { slug: definition.slug, label: definition.label, completedEditions: editions.size, availableEditions: definition.editionIds.length, currentStreak: currentRun(today, dates), longestStreak: run(dateIds) };
  });
}
