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
