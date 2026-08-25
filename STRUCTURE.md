# Orbit Dash Runtime Structure

`client/src/pages/OrbitDash.tsx` owns the React page frame and HUD state. `client/src/components/GameCanvas.tsx` owns the Babylon lifecycle and translates runtime callbacks into page state. Gameplay itself is framework-independent:

```text
client/src/game/
├── assets.ts       Generated-art URLs used by the scene
├── GameWorld.ts    Input, player, gates, pickups, score, lifecycle
└── scene.ts        Babylon scene, camera, lights, background, and game handle
```

`GameWorld` owns meshes, input listeners, timing, scoring, game-over, restart, and cleanup. React does not directly mutate Babylon meshes. The game requires no PHP, database, WebSocket, or Node process; the browser stores only its best score in `localStorage`.

## Signal Switch Runtime Structure

Signal Switch will mirror the Orbit Dash lifecycle while staying isolated under `client/src/game/signalSwitch/`. Its React route will own only the HUD, score, sound state, and start/restart action. The Babylon runtime will own the relay-pad meshes, keyboard and pointer input, countdown state, selection validation, high score, and cleanup. Both games share the same browser-first constraints: no server runtime, no automatic audio, no remote score persistence, and a deterministic `?demo` presentation mode.

## Circuit Shift Runtime Structure

Circuit Shift is isolated in `client/src/game/circuitShift/`. Its React route owns only HUD state, sound opt-in, and the restart action. The framework-independent `CircuitShiftWorld` owns the 4×4 tile orientation array, selection index, path evaluation, procedural mesh highlighting, pointer/keyboard listeners, deterministic demo rotations, score, local best score, and cleanup. The canvas adapter retains the same one-engine, one-scene, resize-safe lifecycle used by the first two games. `client/src/game/registerStandardShaders.ts` explicitly registers Babylon’s default material shader pair before each canvas starts, avoiding blank canvases from deferred shader-module loading.
