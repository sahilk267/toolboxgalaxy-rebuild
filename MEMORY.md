# Orbit Dash Build Notes

- Orbit Dash is deliberately a lightweight, local-score game so it fits the shared Hostinger deployment constraint.
- Generated artwork is loaded from Manus storage rather than committed into the project tree.
- The `?demo` URL flag enables a deterministic autopilot used for visual verification.
- The page route is `/games/orbit-dash`; it is intentionally full-screen and does not use the standard AppShell during play.

## Signal Switch Build Notes

- Signal Switch will be a distinct four-pad reaction game rather than a second scrolling obstacle game, so the Games Bay has clear mechanical variety without adding physics, multiplayer, or server dependencies.
- Its reference art uses the same midnight-ink, signal-lime, ember-orange, and deep-navy workbench system as Orbit Dash. The individual board objects will be procedural Babylon geometry, keeping the shared-hosting bundle compact.
- Browser sound must remain opt-in. The game will unlock audio only from the visible player control, then use short synthesized feedback tones rather than bundled audio files.

### Daily Challenge extension

- Daily Challenge is a second Circuit Shift mode, not an external service. It uses the player device’s local calendar date to generate a repeatable set of tile offsets.
- Its daily best is stored separately in localStorage under the date ID. No leaderboard, account, analytics event, puzzle input, or network call is involved.
- Use `/games/circuit-shift?daily=1&demo=1` for the deterministic visual route; its autoplay board stays silent unless the player explicitly opts into sound.

## Circuit Shift Build Notes

- Circuit Shift intentionally uses a fixed 4×4 board and deterministic layouts rather than procedural level generation. That keeps visual QA, touch targets, and puzzle completion logic predictable on shared hosting.
- Puzzle mechanics must remain readable in one screenshot: lime connected paths, dark inactive traces, a cyan selection outline, and a visible input/output relay.
- The game will share the existing synthesized browser sound system, but only after the player explicitly enables sound through the game HUD.

## Logic Lab Build Notes

- Logic Lab is a DOM/React puzzle suite rather than a Babylon canvas game because fixed grid constraints need reliable semantic buttons, keyboard access, and deterministic touch targets.
- It provides direct full-screen Games Bay routes: `/games/mini-sudoku`, `/games/tango`, `/games/queens`, `/games/patches`, `/games/zip`, and `/games/wend`. `/games/logic-lab` is optional navigation and `/games/logic/:slug` remains compatible. `PUZZLE_RULES_SPEC.md` remains the implementation contract; `research-linkedin-puzzles.md` records the underlying source research.
- Every board is authored and deterministic. `scripts/verify-logic-puzzles.ts` verifies known solutions, representative invalid states, applicable uniqueness claims, local daily-transform coordinate round trips, every Mini Sudoku, Tango, Queens, Patches, Zip, and Wend bank field, and seven-day selection coverage before release.
- Mini Sudoku has seven distinct 6×6 solution grids with unique clue masks from 13 to 20 clues; Tango has seven distinct binary solution layouts, clue masks, and equal/different relation topologies with solver-unique completions; Queens has seven distinct connected region maps and non-touching queen arrangements with unique solver results, non-symmetry-equivalent map signatures, and recorded search-depth bands; Patches has seven non-symmetry-equivalent 6×6 clue-owned rectangle covers with unique exact-cover results, varied clue/shape layouts, and recorded search-depth bands; Zip has seven distinct 6×6 non-repeating ordered orthogonal paths with unique solver results, scattered checkpoints, meaningful walls, and at least twenty turns; Wend has seven distinct 5×5 target-word sets and non-symmetry-equivalent orthogonal path covers with unique exact-cover results and recorded target-branch profiles.
- `daily.ts` derives a browser-local date ID, Calm/Standard/Dense profile, and reversible mirror orientation—no calendar API, remote daily feed, or account is involved. `miniSudokuBank.ts`, `tangoBank.ts`, `queensBank.ts`, `patchesBank.ts`, `zipBank.ts`, and `wendBank.ts` turn that local date into actual independently authored editions and board-specific completion keys.
- `WeeklyLogicCalendar` on `/games` reads the existing `toolboxgalaxy:puzzle-completions` map through `weeklyLogicStreak.ts`; it writes no new player state. It recognizes only edition-specific Mini Sudoku, Tango, Queens, Patches, Zip, and Wend completion prefixes, aggregates several same-day fields into one verified day, and derives current plus longest consecutive-day runs in memory. `logicPersonalBest.ts` then validates the full authored edition ID against each seven-field bank before a per-game card may count it, avoids misleading speed/score claims, and derives only distinct completed editions plus current/longest local-date runs. Its `All fields`/individual-game filter and Grid/Timeline calendar arrangement are browser-session UI only: they recompute or rearrange the same calendar data, preserve marker/metric/share values, clearly show a selected-game no-match week, and reset to All fields plus Grid on a reload. `weeklyLogicShare.ts` exports only visible calendar range/scope/current-longest streak/verified-day/field total values after a user gesture; native share, clipboard copy, and text download all remain optional browser features and reveal no completion key, board path, edition ID, identity, or hidden record. There is no server clock, background schedule, account, filter/view preference, personal profile, or sharing API request. Run `pnpm exec tsx scripts/verify-weekly-logic-streak.ts`, `pnpm exec tsx scripts/verify-logic-personal-bests.ts`, `pnpm exec tsx scripts/verify-weekly-logic-share.ts`, and `CALENDAR_ONLY=1 pnpm exec tsx /home/ubuntu/games-bay-playtest.ts` before release.
- Every direct game page has a visible Reset and one verified next-move Hint. Hints never consult a service; they reveal or repair only an authored solution fact that the local validator already owns.
- `OrbitAudio` persists one Games Bay master SOUND preference across Orbit Dash, Signal Switch, Circuit Shift, and Logic Lab. Logic Lab offers an optional ambient MUSIC loop. Both controls remain explicit user gestures, and master sound off pauses music; no route autoplay is attempted.
- The route flag `?demo=1` is purely visual QA. It stays silent, does not persist completion/progress, and never contacts a service.

## Daily Tools Batch 1

- The Tool Foundry now has 29 registry-backed local modules. `dailyToolEngines.ts` is the pure no-storage/no-network owner for Business Days, Time Zone Meeting Planner, Timestamp Converter, Text Diff, and Find / Replace; `DailyToolRunners.tsx` is only the controlled UI layer. Business Days deliberately uses Monday–Friday only, with no holiday data. Time Zone Planner relies on browser `Intl`, detects missing daylight-saving local times, and makes no calendar-sync claim. The five contracts, exclusion boundaries, and duplicate proof are in `TOOL_BATCH_1_SPEC.md`. Before any change run `pnpm exec tsx scripts/verify-daily-tools.ts` for engine plus unique slug/name/kind coverage and `pnpm exec tsx scripts/playtest-daily-tools.ts` for actual Chromium route/input/error/reset/copy coverage.

## Daily Tools Batch 2

- The foundry now has 32 registry-backed local modules. Batch 2 adds unique `splitBill`, `loanEmi`, and `workShift` engine/runner kinds. `TOOL_BATCH_2_SPEC.md` is the contract: Split Bill shares a tax-inclusive total plus chosen tip; Loan / EMI uses a clearly marked fixed-rate equal-payment estimate with no lender/rate/payment advice or integration; Work Shift measures same-day/overnight duration minus a shorter unpaid break but does not make payroll or employment-law decisions. Currency selection formats only the current local result and never fetches exchange data. The `DailyToolRunners` Batch 2 cards have allocation/payment/time operational signatures and dominant result readouts; keep that differentiation when touching the shared workspace style. Run the existing two daily-tool scripts before release; the deterministic suite now expects 32 unique slug/name/runner kinds.

## Structured Data Tools Batch 3

- The foundry now has 34 registry-backed local modules. `structuredDataEngines.ts` owns a no-storage/no-network/no-DOM CSV parser/serializer, JSON-table conversions, cleaner transforms, 250,000-character / 2,000-row / 60-field limits, and 12×12 preview shaping. `StructuredDataRunners.tsx` is the controlled current-tab UI layer for the unique `jsonCsv` and `csvViewer` runner kinds. JSON conversion accepts a non-empty array of flat objects; CSV uses unique trimmed headers and rectangular nonblank data rows. The UI renders cells as text and CSV exports prefix formula-looking values with an apostrophe. It offers no file import, upload, account, remote spreadsheet, or persistence of pasted user content. `TOOL_BATCH_3_SPEC.md` is the definitive contract. Before changes, run `pnpm exec tsx scripts/verify-structured-data-tools.ts`, `pnpm exec tsx scripts/verify-daily-tools.ts`, and `pnpm exec tsx scripts/playtest-daily-tools.ts`; the latter has actual direct-route, keyboard input, pointer clean/action, copy/download/reset, semantic-preview, and no-storage tests.
