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
