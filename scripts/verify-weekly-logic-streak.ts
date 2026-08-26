import { completedFieldsForDate, completedLogicDates, weeklyLogicSummary } from "../client/src/lib/weeklyLogicStreak";
import type { PuzzleCompletionMap } from "../client/src/lib/puzzleCompletion";

const assert = (condition: unknown, message: string) => { if (!condition) throw new Error(message); };
const reference = new Date(2026, 7, 27);
const base: PuzzleCompletionMap = {
  "mini-sudoku-sudoku-apollo:2026-08-24": true,
  "tango-tango-apollo:2026-08-25": true,
  "queens-queens-apollo:2026-08-26": true,
  "zip-zip-apollo:2026-08-26": true,
  "patches-patches-apollo:2026-08-26": true,
  "tango:2026-08-27": true,
  "queens-queens-apollo:2026-08-28": true,
};

const blank = weeklyLogicSummary(reference, 0, {});
assert(blank.weekStart === "2026-08-24" && blank.weekEnd === "2026-08-30", "The current weekly view must begin on Monday and end on Sunday.");
assert(blank.currentStreak === 0 && blank.longestStreak === 0 && blank.completedDays === 0 && blank.totalCompletedFields === 0, "An empty local record must render zero activity without inferred completions.");

const summary = weeklyLogicSummary(reference, 0, base);
assert(completedLogicDates(base).join(",") === "2026-08-24,2026-08-25,2026-08-26,2026-08-28", "Only edition-specific genuine keys may become candidate activity dates.");
assert(summary.currentStreak === 0 && summary.longestStreak === 3, "The model must calculate a completed historical run without inventing a current-day completion.");
assert(summary.completedDays === 3 && summary.totalCompletedFields === 5, "Several genuine fields on one day must count as one verified day while retaining their separate completed-field total.");
assert(completedFieldsForDate("2026-08-26", base).join(",") === "queens,patches,zip", "The calendar must expose the actual completed genuine field types for a day.");
assert(summary.days.find((day) => day.id === "2026-08-28")?.completedFields.length === 0, "Future-dated records must never light a future local calendar day.");
assert(summary.days.find((day) => day.id === "2026-08-27")?.completedFields.length === 0, "Legacy fixed-board completions must not count toward the genuine daily calendar.");

const withToday: PuzzleCompletionMap = { ...base, "tango-tango-apollo:2026-08-27": true };
const current = weeklyLogicSummary(reference, 0, withToday);
assert(current.currentStreak === 4 && current.longestStreak === 4 && current.completedDays === 4 && current.totalCompletedFields === 6, "A current genuine field must extend the local run once while retaining same-day aggregation.");
assert(weeklyLogicSummary(reference, -1, withToday).days.every((day) => day.completedFields.length === 0), "Previous-week navigation must keep non-overlapping weeks free of later activity.");

const monthBoundary: PuzzleCompletionMap = { "zip-zip-apollo:2026-08-30": true, "queens-queens-apollo:2026-08-31": true };
const boundarySummary = weeklyLogicSummary(new Date(2026, 7, 31), 0, monthBoundary);
assert(boundarySummary.weekStart === "2026-08-31" && boundarySummary.currentStreak === 2 && boundarySummary.longestStreak === 2, "Sunday-to-Monday activity must remain a two-day consecutive streak across the calendar-week boundary.");
assert(weeklyLogicSummary(new Date(2026, 7, 31), -1, monthBoundary).days.find((day) => day.id === "2026-08-30")?.completedFields.join(",") === "zip", "Previous-week navigation must retain the Sunday completed field at a month boundary.");

console.log("Weekly local streak model verified: genuine edition parsing, same-day idempotence, current/longest runs, week navigation, boundaries, future suppression, and legacy-key exclusion.");
