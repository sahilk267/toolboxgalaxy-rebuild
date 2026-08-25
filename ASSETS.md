# Orbit Dash Assets

**Art direction:** Midnight-ink arcade space with crisp geometric gates, a signal-lime player ship, ember-orange fragments, controlled bloom, and a clean side-scrolling playfield. The game should read as a polished casual arcade module within the Orbital Workbench system, not a cyberpunk shooter.

| Asset | Usage | Source |
|---|---|---|
| Orbit Dash wide arcade art | In-game background layer, Games route artwork, and visual QA reference | `/manus-storage/toolbox-galaxy-games-arcade_0b17d873.jpg` |
| Orbit Mark | Global brand mark, favicon, and navigation | `/manus-storage/toolbox-galaxy-orbit-mark_c8160386.png` |
| Orbital Workbench hero art | Homepage hero artwork | `/manus-storage/toolbox-galaxy-hero-orbital-workbench_617f903c.jpg` |
| Tools Station art | Homepage tools story panel | `/manus-storage/toolbox-galaxy-tools-station_0a6e4eb6.jpg` |

The four source images are also mapped for Hostinger in [`HOSTINGER_ASSET_MAP.md`](./HOSTINGER_ASSET_MAP.md). The handoff copies live outside this project at `/home/ubuntu/hostinger-toolboxgalaxy-assets/` so they are not included in the static deployment bundle.

The player ship, gates, collectible signal fragments, and starfield are procedural Babylon geometry. This keeps the game bundle compact and avoids shipping large local media files.

## Signal Switch Assets

**Art direction:** A straight-on, top-down orbital relay console: square midnight-blue metallic board, a central silver-black hub, four large relay pads at cardinal directions, one active pad in signal-lime, one ember-orange packet, and a sparse starfield. The game uses crisp procedural meshes instead of imported models, preserving visual separation and lightweight browser performance.

| Asset | Usage | Source |
|---|---|---|
| Signal Switch 16:9 in-game reference | Games Bay card artwork and visual QA reference | `/manus-storage/toolbox-galaxy-signal-switch-reference_73b96409.jpg` |
