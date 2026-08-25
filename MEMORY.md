# Orbit Dash Build Notes

- Orbit Dash is deliberately a lightweight, local-score game so it fits the shared Hostinger deployment constraint.
- Generated artwork is loaded from Manus storage rather than committed into the project tree.
- The `?demo` URL flag enables a deterministic autopilot used for visual verification.
- The page route is `/games/orbit-dash`; it is intentionally full-screen and does not use the standard AppShell during play.
