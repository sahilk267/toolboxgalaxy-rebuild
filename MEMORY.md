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
- Every board is authored and deterministic. `scripts/verify-logic-puzzles.ts` verifies known solutions, representative invalid states, applicable uniqueness claims, local daily-transform coordinate round trips, every Mini Sudoku, Tango, Queens, and Zip bank field, and seven-day selection coverage before release.
- Mini Sudoku has seven distinct 6×6 solution grids with unique clue masks from 13 to 20 clues; Tango has seven distinct binary solution layouts, clue masks, and equal/different relation topologies with solver-unique completions; Queens has seven distinct connected region maps and non-touching queen arrangements with unique solver results, non-symmetry-equivalent map signatures, and recorded search-depth bands; Zip has seven distinct 6×6 non-repeating ordered orthogonal paths with unique solver results, scattered checkpoints, meaningful walls, and at least twenty turns. Patches remains a 6×6 exact rectangle cover; Wend remains the confirmed orthogonal word-path exact cover, not a substituted word game.
- `daily.ts` derives a browser-local date ID, Calm/Standard/Dense profile, and reversible mirror orientation—no calendar API, remote daily feed, or account is involved. `miniSudokuBank.ts`, `tangoBank.ts`, `queensBank.ts`, and `zipBank.ts` turn that local date into actual independently authored editions and board-specific completion keys. Patches and Wend still vary orientation and opening assistance while their rule contracts stay intact, so they are not yet substantive daily board banks.
- `WeeklyLogicCalendar` on `/games` reads the existing `toolboxgalaxy:puzzle-completions` map through `weeklyLogicStreak.ts`; it writes no new player state. It recognizes only edition-specific Mini Sudoku, Tango, Queens, and Zip completion prefixes, aggregates several same-day fields into one verified day, ignores demos/route visits/legacy records/future dates, and derives current plus longest consecutive-day runs in memory. Its current-week/past-week controls are browser UI only; there is no server clock, background schedule, or account. Run `pnpm exec tsx scripts/verify-weekly-logic-streak.ts` and `CALENDAR_ONLY=1 pnpm exec tsx /home/ubuntu/games-bay-playtest.ts` before release.
- Every direct game page has a visible Reset and one verified next-move Hint. Hints never consult a service; they reveal or repair only an authored solution fact that the local validator already owns.
- `OrbitAudio` persists one Games Bay master SOUND preference across Orbit Dash, Signal Switch, Circuit Shift, and Logic Lab. Logic Lab offers an optional ambient MUSIC loop. Both controls remain explicit user gestures, and master sound off pauses music; no route autoplay is attempted.
- The route flag `?demo=1` is purely visual QA. It stays silent, does not persist completion/progress, and never contacts a service.
