# Toolbox Galaxy Logic Puzzle Contract

This document defines the **browser-local Toolbox Galaxy editions** of the requested daily logic-puzzle concepts. They are not LinkedIn services or copies of LinkedIn’s daily data. Each edition uses fixed, source-verified mechanics, deterministic boards, independent validation, optional local progress, and no account, API, or leaderboard.

| Puzzle | Board model | Core condition | Primary validation |
|---|---|---|---|
| Patches | 6×6 rectangle partition | Every cell belongs to one clue-owned rectangle | Exact-cover partition search |
| Zip | 5×5 path grid with optional walls | One ordered path covers all cells | Hamiltonian-path validation |
| Mini Sudoku | 6×6, 2×3 boxes | Digits 1–6 occur once per unit | All-different solver |
| Tango | 6×6 binary grid | Balanced lines, no triples, relation markers | Binary constraint solver |
| Queens | 6×6 colored regions | One queen per row, column, region; no touching | Region/row/column adjacency validator |
| Wend | 5×5 letter grid | Target word paths exactly cover tiles | Orthogonal word-path exact cover |

## Shared implementation contract

All puzzle engines are framework-independent TypeScript modules under `client/src/game/logicPuzzles/`. React components only own the HUD, timer, local UI state, and explicit audio consent. Each puzzle definition must include an immutable board, a known solution, a validator, and a `?demo` deterministic playback sequence. The engine must never mutate its initial puzzle definition.

> **Completion rule.** A board is shown as solved only when its own validator confirms every stated constraint. UI state, visual fill, or a guessed answer is never enough by itself.

| Cross-cutting requirement | Contract |
|---|---|
| Input | Click/tap is the baseline; keyboard selection/action parity is supplied for each puzzle. |
| Audio | A single browser-local sound preference applies across all Games Bay routes. Audio contexts and optional music may start only from a visible user gesture; demo mode remains silent. |
| Local state | Only progress, best result, and optional streak date are retained in `localStorage`; no inputs are transmitted. |
| Undo/reset | User moves are stored as immutable snapshots. Reset returns to the original deterministic board. |
| Daily-style boards | A local calendar date chooses a pre-validated bundled edition where a game claims genuine daily freshness. Orientation remains a display transform only; it is never presented as a new board. The local `calm`/`standard`/`dense` label is tied to that authored edition and never fetches a remote challenge. |
| Accessibility | Cells have accessible labels describing coordinates, clue/state, and violation state; color is never the only status indicator. |

## Assistance and local daily-edition contract

The local assistance controls adapt the documented in-game interaction patterns without pretending to mirror any network edition. A hint always uses the already authored verified solution and communicates exactly what it changed; it never queries an external solver or dictionary. Patches reveals one correct region; Zip removes the path after the first incorrect step and reveals the next correct cell; Mini Sudoku reveals one empty value and highlights its row/column/2×3 box; Tango identifies one incorrect/forced cell; Queens identifies one correct queen location or excess queen; and Wend clears an active mistaken trace or reveals the next tile of one unsolved target. Each module also records immutable move snapshots for **Undo**, while Reset restores the date-selected starting state.

Every claimed fresh daily edition is selected deterministically from a device-local `YYYY-MM-DD` ID and a small independently authored bank. Its solution and relevant reasoning topology must be distinct, and it must pass known-solution, mutation, and uniqueness checks before shipping. Rotation, reflection, symbol-theme swap, or opening assistance may improve presentation but cannot by themselves be called a fresh board.

## Patches contract

LinkedIn’s official help requires full non-overlapping coverage and exactly one clue per shape.[^patches-help] LinkedIn’s announcement describes rectangles and squares.[^patches-news] The local edition therefore uses **axis-aligned rectangles only**. `square`, `wide`, and `tall` constrain aspect ratio; `free` means any axis-aligned rectangle, a disclosed local interpretation of the official freeform clue label.

```ts
type PatchClue = {
  cell: Cell;
  area?: number;
  shape?: "square" | "wide" | "tall" | "free";
};
type Patch = { top: number; left: number; height: number; width: number };
```

The validator rejects a patch when it is out of bounds, overlaps an existing patch, includes zero or multiple clue cells, conflicts with its clue’s area/aspect, or leaves a cell uncovered at completion. Solver validation enumerates candidate rectangles per clue and runs exact cover; shipped boards require exactly one solution.

| Required edge case | Expected result |
|---|---|
| Rectangle contains two clues | Reject before placement. |
| Correct area but wrong aspect | Reject before placement. |
| Valid patch overlaps existing patch | Reject before placement. |
| All patches placed with a gap | Remain unsolved. |
| Alternate complete partition | Board is rejected during authoring. |

## Zip contract

Zip needs one path that fills every cell, visits numbered cells in order, and does not cross walls.[^zip-help] The local board stores an ordered `solutionPath`, required numbered waypoints, and blocked adjacent-edge pairs.

```ts
type ZipBoard = {
  rows: number; cols: number;
  numbers: Record<number, Cell>;
  blockedEdges: Edge[];
  solutionPath: Cell[];
};
```

The live path must begin at number 1, add only orthogonally adjacent unvisited cells, respect walls, and never reach a numbered cell before the previous number. Completion requires the path length to equal the grid cell count and the final waypoint sequence to be complete. Drag-back performs legitimate path backtracking; it does not create a branch.

## Mini Sudoku contract

Mini Sudoku is a 6×6 grid with digits 1–6 exactly once in each row, column, and shaded box.[^mini-sudoku-tutorial] The local edition uses 2-row × 3-column boxes and a fixed, independently checked solution.

The validator supports partial play: it marks duplicates in the active row, column, or box but only declares success when all 36 cells are populated and match all all-different constraints. Puzzle authoring removes clues from a solved grid and requires the solver to count exactly one completion.

## Tango contract

Tango requires a binary symbol in every cell, balanced rows/columns, no run of three identical symbols, and `=`/`×` adjacency relations.[^tango-help] The local edition models symbols as `0 | 1`, rendering them as a controlled pair of workbench glyphs.

```ts
type TangoRelation = { a: Cell; b: Cell; relation: "same" | "different" };
```

For a 6-cell line, partial validation rejects counts above three, prevents remaining blanks from making balance impossible, rejects any horizontal/vertical triple, and enforces every completed relation. Shipped boards must be uniquely solvable under all four constraint families.

`tangoBank.ts` contains seven date-selected editions (`Apollo` through `Galileo`). Each stores its own 6×6 solution, null-preserving given mask, equal/different adjacent relation map, clue count, and Calm/Standard/Dense authoring band. The permanent verifier rejects any repeated solution signature, given-mask signature, or relation-topology signature; it also asserts a unique solution, a triple violation, a direct relation violation, and coverage across seven consecutive local dates. Completion storage uses `tango-<edition-id>` plus the local date so records cannot mix.

## Queens contract

Queens uses exactly one Crown in every row, column, and colored region, with no orthogonal or diagonal touching.[^queens-help] The local edition separates cell marking from Queen placement: `empty`, `marked`, and `queen` are distinct player states.

The validator checks per-row, per-column, and per-region counts, then checks all eight neighboring cells of every queen. Marked cells are ignored by the solver and never count toward completion. Shipped region maps require a single valid queen assignment.

## Wend contract

Wend forms words from orthogonally adjacent letters; every letter must be used exactly once and words cannot overlap.[^wend-help] A local board stores a fixed letter grid, target words/lengths, and one valid path per target word.

```ts
type WendWord = { word: string; path: Cell[] };
```

Each submitted selection must be an orthogonal non-repeating path. A selection resolves only when its letters match an unsolved target word and its path is valid for that target. Completion requires every target word and all 25 tiles. This avoids any network dictionary dependency and removes ambiguity from homographs or multiple external dictionary variants.

## Verification sequence

Every shipped board must pass these checks before it is exposed in the Games Bay.

1. Run the independent solver/validator on the authored solution and require `true`.
2. Mutate one required constraint at a time and require `false`.
3. For uniqueness-required boards, enumerate solution count and require exactly one.
4. Replay the deterministic `?demo` move list and require the same solved state without local progress writes.
5. Exercise pointer/touch and keyboard input paths against the same state transition assertions.

[^patches-help]: [LinkedIn Help — Play Patches](https://www.linkedin.com/help/linkedin/answer/a10314037).
[^patches-news]: [LinkedIn News — Patches announcement](https://news.linkedin.com/2026/LinkedIn-Announces-Patches-A-New-Thinking-Oriented-Game-Inspired-by-Zip/LinkedIn-Announces-Patches-A-New-Thinking-Oriented-Game-Inspired-by-Zip).
[^zip-help]: [LinkedIn Help — Play Zip](https://www.linkedin.com/help/linkedin/answer/a7445030).
[^mini-sudoku-tutorial]: [LinkedIn — Mini Sudoku tutorial](https://www.linkedin.com/posts/minisudoku-game_how-to-play-mini-sudoku-activity-7379409304770039808-Gc8-).
[^tango-help]: [LinkedIn Help — Play Tango](https://www.linkedin.com/help/linkedin/answer/a6861672).
[^queens-help]: [LinkedIn Help — Play Queens](https://www.linkedin.com/help/linkedin/answer/a6269510).
[^wend-help]: [LinkedIn Help — Play Wend](https://www.linkedin.com/help/linkedin/answer/a6565995).
