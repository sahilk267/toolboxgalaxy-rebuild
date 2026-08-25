# Toolbox Galaxy — Design Directions

## Teen stylistic approaches

### 1. Signal Garden
**Very Brief Intro:** Ek bright, optimistic utility space jisme soft sage green, warm orange aur paper-like surfaces hain. Iska mood everyday problem-solving ko calm aur approachable banata hai.

**Probability:** 0.04

### 2. Orbital Workbench — Chosen
**Very Brief Intro:** Ek high-contrast, night-shift digital workshop jahan serious utility tools aur lightweight browser games ek hi visual universe share karte hain. Dark ink background, solar-lime signals aur blueprint-like information blocks precision aur play dono ko express karte hain.

**Probability:** 0.07

### 3. Paper Arcade
**Very Brief Intro:** Retro editorial print ke saath arcade energy: cobalt panels, off-white paper, stamped labels aur bold geometric blocks. Is direction mein tactile character strong hai, lekin technical tool workflows ke liye thoda less neutral rahega.

**Probability:** 0.02

---

# Chosen System: Orbital Workbench

## Design Movement

**Contemporary space-industrial editorial design** — observatory interfaces, spacecraft checklists aur independent developer tools ki directness ka blend. Yeh cyberpunk neon aesthetic nahi hai; yeh restrained, precise aur purpose-led night-workstation feel hai.

## Core Principles

1. **Utility first, spectacle second:** Har visual element user ko tool ya game tak jaldi pahunchane mein help karega.
2. **Two speeds, one universe:** Tools systematic, clear aur calm; games playful aur kinetic, lekin same material language ke andar.
3. **Visible system logic:** Labels, status chips, grid lines aur compact metadata user ko orientation dete hain.
4. **Deliberate contrast:** Dark ink surfaces par solar-lime sirf important interaction aur verified status ke liye use hoga.

## Color Philosophy

Base palette midnight ink aur graphite rakhegi, jisse screens focused aur low-glare feel karein. **Signal Lime (`#C7F36B`)** ownable brand color hai: isko verified status, active navigation, important CTAs aur interactive moments ke liye reserve kiya jayega. Warm ember (`#FF9B54`) game energy aur secondary emphasis ko signal karega. Parchment-tint (`#F4F2EA`) readable long-form tool surfaces aur data panels ko soften karega.

## Layout Paradigm

Homepage ek symmetrical centered landing page nahi hoga. Desktop par **left rail + offset content runway** hoga: fixed identity/navigation rail, hero ke liye asymmetrical signal panel, tool categories ke liye masonry-like rail-aligned cards, aur games ke liye horizontal playable strip. Mobile par rail compact top bar mein collapse hoga; content single-column but status-rich rahega.

## Signature Elements

1. **Orbit Mark:** thin orbital ring ke center mein four-point signal spark; transparent icon without text.
2. **Telemetry Strips:** cards aur panels par compact uppercase metadata rows, e.g. `VERIFIED · LOCAL · 0.2s`.
3. **Dock Lines:** subtle 1px grid/docking lines that connect home modules and provide a workshop blueprint feel.

## Interaction Philosophy

Interactions tool-like honge: controls immediate feedback denge, state visibly confirm hogi, aur feature placeholders clear "planned" status ke saath honest rahenge. Games navigation playful hover preview use karega, but core tools par motion restrained rahegi.

## Animation

Hover states 140–180ms ke snappy ease-out par use honge. Cards ek 2–4px lift aur signal border shift use karenge; buttons active press par `scale(0.97)` feel denge. Hero telemetry aur game tiles small staggered fade/translate entry use karenge. `prefers-reduced-motion` users ke liye saari non-essential motion disable hogi. No constant floating objects, no excessive glow.

## Typography System

**Space Grotesk** headings ke liye use hoga: technical, compact aur human. **IBM Plex Mono** labels, tool metadata aur values ke liye use hoga. Body text `Manrope` use karega for clear readability. Headings short, declarative aur left-aligned rahenge; all-caps mono text sirf metadata aur status ke liye.

## Brand Essence

**Positioning:** A browser-first workbench for people who need a reliable tool now and a quick game when they need a reset.

**Personality:** Precise, spirited, trustworthy.

## Brand Voice

Headlines direct aur useful honge; CTAs action-focused rahenge. Generic filler aur vague AI promises avoid karne hain.

> “Make the small thing easy.”

> “Run a tool. Take a break. Keep moving.”

## Wordmark & Logo

Wordmark custom Space Grotesk construction mein `TOOLBOX / GALAXY` two-line lockup hoga, with the Orbit Mark acting as a visual separator. Primary icon ek asymmetric orbital loop ke andar four-point spark hoga; koi embedded text nahi hoga, transparent PNG favicon/header use ke liye.

## Signature Brand Color

**Signal Lime — `#C7F36B`**

## Build Reminder

Har CSS/component/page file ke top par style reminder add karna hai:

> `Orbital Workbench: midnight-ink workshop surfaces, signal-lime reserved for key actions, Space Grotesk + IBM Plex Mono, left-rail layout, calm utility motion.`

## Style Decisions

- The `TOOLBOX / GALAXY` wordmark and Orbit Mark remain visible in the primary navigation/identity area on every AppShell route.
- Dock lines and telemetry strips are structural motifs: each major card, form, and feature panel exposes a visible metadata or status layer.
- Tool detail pages are treated as operational instrument consoles, using labeled input/output zones, verified/local state, and precise panel framing.
- Game play screens retain a compact Toolbox Galaxy identity layer with the Orbit Mark, Games Bay route label, and telemetry HUD so they remain part of the same workbench system.
- Dock lines are structural rather than decorative: each major page exposes a visible runway relationship between its rail, hero, and primary panels.
- Games use warm ember for launch energy and playful module accents; Signal Lime remains reserved for active, verified, successful, and primary-action states.
- Every route, including games and offline states, exposes a compact Orbit Mark, `TOOLBOX / GALAXY` lockup, route label, and telemetry/status signal.
- Games use Ember for score and playful module energy; Signal Lime is retained for live paths, verified state, success, and primary actions.
- Dock lines must visibly relate the shell, hero or playfield, and primary panels as a structural blueprint system rather than decorative borders.
