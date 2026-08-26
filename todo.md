# Milestone 2 Checklist

- [x] Review the current registry, tool workspace, contact page, deployment notes, and asset source files.
- [x] Select the next browser-local tools that require no legacy API endpoint.
- [x] Implement and register the new tools with accessible local-only interactions.
- [x] Expand the Tools hub copy and counts to reflect the verified catalog.
- [x] Package the four original generated assets for Hostinger upload and map every deployed asset URL.
- [x] Provide a secure PHP contact/API contract and a frontend-ready contact request shape.
- [x] Run type-check and production build.
- [x] Verify representative desktop and mobile routes.
- [ ] Save an updated checkpoint.

## PWA and Circuit Shift Refinement Checklist

- [x] Review the static-hosting build setup and define an install-safe PWA asset strategy.
- [x] Add a manifest, service worker, offline fallback, and install guidance without any backend dependency.
- [x] Add browser-local Circuit Shift difficulty presets while preserving opt-in sound and deterministic demo mode.
- [x] Update Hostinger deployment guidance and project architecture notes.
- [x] Validate install/offline behavior where available, TypeScript, production build, current browser logs, and desktop/mobile routes before checkpointing.

## PWA Update Notice and Local History Checklist

- [x] Define which route-level metadata can be stored locally without retaining user inputs or generated content.
- [x] Add a recent-tools history panel with clear and JSON-export controls.
- [ ] Add a recent-tools history panel with clear and JSON-export controls.
- [x] Document the local-storage, privacy, and Hostinger delivery behavior.
- [x] Validate TypeScript, production build, current browser logs, and desktop/mobile routes before checkpointing.

## Circuit Shift Daily Challenge Checklist

- [x] Define a date-based deterministic seed, local completion storage, and a no-network privacy boundary.
- [x] Implement the daily board mode, daily best score, and HUD/overlay selection flow.
- [x] Preserve touch, keyboard, explicit sound opt-in, and `?demo` behavior across normal and daily modes.
- [x] Document the static local challenge contract and update relevant game architecture notes.
- [x] Validate TypeScript, production build, current browser logs, and desktop/mobile daily routes before checkpointing.

## Tool Favorites Checklist

- [x] Define a metadata-only local favorites storage boundary with no tool workspace data.
- [x] Add accessible favorite/unfavorite controls to tool cards and workspaces.
- [x] Add a Favorites deck to the Tools hub with a local clear action and transparent privacy note.
- [x] Document the browser-local favorite contract and update architecture notes.
- [x] Validate TypeScript, production build, current browser logs, and desktop/mobile favorites behavior before checkpointing.

## Circuit Shift Daily Streak Checklist

- [x] Define same-device daily completion and consecutive-date calculation without accounts or remote storage.
- [x] Add the streak record, completion update, and Daily Challenge HUD/status treatment.
- [x] Preserve normal practice play, explicit sound opt-in, and deterministic `?daily=1&demo=1` behavior.
- [x] Document the local streak privacy and deployment contract.
- [x] Validate TypeScript, production build, current browser logs, and desktop/mobile daily-streak routes before checkpointing.

## Keyboard Shortcut Reference Checklist

- [x] Define browser-safe shortcut guidance without intercepting normal typing or existing game keys.
- [x] Add an accessible shortcut reference trigger and panel to the shared application shell.
- [x] Add contextual Circuit Shift keyboard guidance and visible touch-equivalent messaging.
- [x] Document shortcut behavior and update architecture notes.
- [x] Validate TypeScript, production build, current browser logs, and desktop/mobile shortcut-reference routes before checkpointing.

## Command Palette Checklist

- [x] Define navigation-only command coverage and safe keyboard activation outside editable fields or open dialogs.
- [x] Add an accessible command palette trigger, search, route results, keyboard navigation, and explicit close behavior.
- [x] Integrate the palette with the shared shell and protect Circuit Shift from background game-key input while it is open.
- [x] Document command palette behavior and update architecture notes.
- [x] Validate TypeScript, production build, current browser logs, and desktop/mobile command-palette routes before checkpointing.

## Circuit Shift Local Score Sharing Checklist

- [x] Define an exact result-summary payload that excludes player identity, browser history, and hidden game state.
- [x] Add native share, clipboard-copy, and downloadable-text fallback controls after a real score result.
- [x] Preserve Daily Challenge privacy, demo exclusion, explicit sound opt-in, and all existing practice/daily controls.
- [x] Document the no-network local sharing contract and update game architecture notes.
- [x] Validate TypeScript, static production build, current browser logs, and desktop/mobile sharing routes before checkpointing.

## LinkedIn-Style Logic Puzzle Games Checklist

- [x] Research official or authoritative rules, win conditions, constraints, interactions, and variants for Patches, Zip, Mini Sudoku, Tango, Queens, and Wend.
- [x] Resolve the exact “Wend” game identity/variant before choosing its puzzle logic.
- [x] Record source-backed game contracts, generators, solvers, and edge-case validation cases before UI implementation.
- [x] Build a reusable browser-local puzzle framework with keyboard/touch parity, opt-in sound, local progress, and deterministic visual QA routes.
- [x] Implement every confirmed puzzle with logic validation before styling/integration.
- [x] Integrate all confirmed puzzles into Games Bay, documentation, and static Hostinger deployment guidance.
- [x] Validate unit logic, user interactions, desktop/mobile routes, TypeScript, static production build, and current browser logs before checkpointing.

## Logic Lab Full-Screen and Daily Upgrade Checklist

- [x] Research and document the refined daily variation, difficulty, hint, shared-audio, and browser-autoplay contracts without compromising source-verified puzzle rules.
- [x] Surface all six puzzle modules directly in Games Bay while retaining a catalog only as an optional secondary route.
- [x] Rebuild every puzzle into the existing full-screen Games Bay treatment with clear exits, high-contrast controls, and a shared visual language.
- [x] Correct Mini Sudoku’s six 2×3 region boundaries and strengthen puzzle-grid contrast for dark displays.
- [x] Add a global browser-local game sound preference and a secondary music control that respects browser autoplay requirements.
- [x] Add deterministic local-date puzzle transformations, rotating daily difficulty, and source-aligned next-move hints for all six modules.
- [x] Validate full-screen desktop/mobile routes, contrast, audio preference behavior, daily variation, hints, logic tests, current logs, and a static build before checkpointing.

## Required Hands-On Playtest Gate

- [x] Play every direct puzzle route in a browser before further feature work: normal input, one wrong move, Hint, Reset, daily field, and completion behavior.
- [x] Verify master sound and optional music from visible controls using a user gesture, including shared persistence across Games Bay routes.
- [x] Record confirmed findings and repair only verified interaction defects before proposing another game change. The only confirmed defect was delayed visible MUSIC feedback during asynchronous playback startup; the common control now updates immediately and reconciles with persisted state.

## Visible Play and Completion Feedback

- [x] Add clear, non-color-only progress counters and board/path highlights for all six puzzle modules.
- [x] Add an unmistakable completed-state panel with visible solved evidence and clear replay/reset behavior for every puzzle.
- [x] Record a privacy-safe browser-local per-puzzle completion marker and show when the current local daily field has been completed.
- [x] Play-test normal, completed, and reset states in the browser so completion is visibly understandable without reading hidden feedback text.

## Mini Sudoku Seven-Edition Board Bank

- [x] Define the verified 6×6 Mini Sudoku edition schema, daily selection policy, difficulty bands, and per-edition completion key.
- [x] Author seven non-equivalent Mini Sudoku solutions with distinct solver-verified clue layouts and no repeated solution grid.
- [x] Prove every Mini Sudoku edition has exactly one solution and preserves 2×3 box, row, and column constraints.
- [x] Integrate device-local date selection from the bundled board bank and display the actual edition/difficulty honestly.
- [x] Extend hints, reset, completion, replay, and progress persistence to the selected edition without mixing daily records.
- [x] Run full keyboard/pointer browser playtests for all seven editions plus desktop/mobile screens, TypeScript, all logic validators, and a static build before checkpointing.

## Tango Seven-Edition Board Bank

- [x] Define the verified 6×6 Tango edition schema, local-date selection policy, difficulty bands, and per-edition completion key.
- [x] Author seven non-equivalent binary solution layouts with distinct givens, equal/different relation maps, and no repeated solution or relation topology.
- [x] Prove every Tango edition has exactly one solution and satisfies line balance, triple prevention, and all visible relation constraints.
- [x] Integrate device-local date selection from the bundled board bank and display the actual edition/difficulty honestly.
- [x] Extend hints, reset, completion, replay, relation markers, and progress persistence to the selected edition without mixing daily records.
- [x] Run full keyboard/pointer browser playtests for all seven editions plus desktop/mobile screens, TypeScript, all logic validators, a static build, PWA artifact checks, and a current clean log tail before checkpointing.
