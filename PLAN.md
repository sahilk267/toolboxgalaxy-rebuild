# Game Plan: Orbit Dash

## Main Build

Orbit Dash is a lightweight, single-player browser arcade game. The player moves a lime signal ship vertically through incoming orbital gates, collects orange signal fragments, and builds a local high score. The implementation uses a fixed top-down orthographic Babylon scene; no physics plugin, network service, login, or server persistence is required.

- **Assets needed:** The generated wide arcade artwork is used as the background art direction layer. The ship, gates, fragments, stars, and arena grid are procedural Babylon meshes so the game remains lightweight for shared hosting.
- **Verify:**
  - Arrow keys, W/S, pointer position, and touch movement move the ship in the intended vertical direction.
  - Gates move right-to-left, retain a passable gap, and trigger a visible game-over state on collision.
  - Signal fragments increase the score when collected; passed gates increase the score.
  - Space or R starts a new run after a game over; local high score persists in the browser.
  - `?demo` activates a deterministic autopilot so a screenshot visibly shows gameplay in progress.
  - No missing textures, clipped HUD, or console errors occur during the captured run.
  - The finished route retains the Orbit Workbench palette: midnight ink, signal lime, controlled ember-orange, and a compact telemetry HUD.

---

# Game Plan: Signal Switch

## Main Build

Signal Switch is a lightweight, single-player browser reflex game. A signal packet arrives at one of four relay pads around a central hub. The player selects the matching pad using arrow keys, WASD, or a direct tap/click before the countdown expires. Correct relays increase a browser-local score and shorten the next relay window; an incorrect selection or expiry ends the run. The fixed top-down orthographic scene uses procedural Babylon meshes, local high score storage, and the existing user-initiated sound-effect model.

- **Assets needed:** One generated 16:9 in-game reference image establishes the midnight-blue console board, signal-lime active pad, ember packet, and sparse starfield. The pad grid, hub, selector, and packet remain lightweight procedural geometry.
- **Verify:**
  - Arrow keys and WASD select the matching relay pad; clicking/tapping a pad selects it directly.
  - A correct input updates score, progresses the relay sequence, and triggers the appropriate opt-in sound effect.
  - A wrong input or completed countdown shows a clear game-over state and keeps the high score local to the browser.
  - `?demo` runs a deterministic relay sequence for visual verification.
- The HUD, touch targets, sound toggle, and start/restart controls stay readable on desktop and mobile.
- No missing textures, console errors, clipped controls, or placeholder gameplay elements appear in the captured run.

---

# Game Plan: Circuit Shift

## Main Build

Circuit Shift is a lightweight, single-player rotation puzzle. The player turns tiles on a fixed 4×4 board until a continuous signal path reaches the output relay. A solved board starts the next deterministic layout and improves a browser-local score; a timer measures the current solve without a forced game-over. The scene uses procedural tiles and one generated reference image, avoiding physics, imported models, multiplayer, and server state.

- **Assets needed:** One generated 16:9 in-game reference establishes the navy control-board, lime circuit traces, cyan selection outline, and restrained amber warning accent. The sixteen tiles, input/output sockets, board frame, and glow effects remain procedural Babylon geometry.
- **Verify:**
  - Clicking/tapping a tile or using arrow keys plus space rotates the selected tile by exactly 90 degrees.
  - A valid connected route from input to output visibly changes the HUD to solved, adds score, and triggers the opt-in success sound.
  - Reset loads the deterministic starting layout; local high score remains only in browser storage.
  - `?demo` rotates the known solution sequence so capture shows an in-progress or completed board.
- HUD, touch targets, sound control, and restart behavior are readable on desktop and mobile, with no missing asset, console, or network failures.

### Daily Challenge extension

The Daily Challenge derives the board scramble from the visitor’s local calendar date. For the same device-local date, the challenge seed and tile offsets are reproducible; no time service, account, API, or server leaderboard is used. The mode stores only that date’s local best score under its own browser key and applies a fixed 1.9× score multiplier. A Daily Streak stores only successfully completed device-local date IDs, counts consecutive calendar dates, and is idempotent for a same-day retry. `?daily=1&demo=1` runs the daily board’s known auto-rotation sequence for visual verification while sound remains disabled until the player uses the visible sound/start action; demo completion never writes a streak.

---

# Game Plan: Logic Puzzle Suite

The Games Bay adds six browser-local puzzle editions informed by Patches, Zip, Mini Sudoku, Tango, Queens, and Wend. Detailed source-backed rules, local geometry choices, solver requirements, and authoring tests are maintained in [`PUZZLE_RULES_SPEC.md`](./PUZZLE_RULES_SPEC.md). The implementation ships only fixed puzzle definitions that pass independent validators and uniqueness checks where applicable; it does not scrape, reproduce, or depend on LinkedIn’s daily data.

The completed suite launches directly from Games Bay at `/games/mini-sudoku`, `/games/tango`, `/games/queens`, `/games/patches`, `/games/zip`, and `/games/wend`; `/games/logic-lab` and `/games/logic/:slug` remain secondary catalog and compatible legacy routes. All six now use a dedicated full-screen cockpit field with high-contrast semantic controls, visible reset and verified-next-move hint actions, keyboard-focusable boards, and a silent deterministic demo route.

Each direct route derives a repeatable local-date orientation plus Calm, Standard, or Dense assist profile. Mini Sudoku’s three clue-density profiles are solver-checked for unique completion. Patches is an authored 6×6 exact-cover partition. Zip now has seven independently solver-verified 6×6 board-bank editions—each with a different route, checkpoint arrangement, wall layout, and difficulty band—selected from the device-local date; it is the first module allowed to present a genuinely new local daily field. The remaining five logic modules still use one authored reasoning topology each and must not be described as fresh daily boards until they receive equivalent board banks. Shared Games Bay SOUND uses one local browser preference; Logic Lab’s optional ambient MUSIC still requires a visible user gesture. The project validation script is `pnpm exec tsx scripts/verify-logic-puzzles.ts`.
