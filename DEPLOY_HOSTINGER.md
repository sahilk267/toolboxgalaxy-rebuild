# Hostinger Shared Hosting Deployment

This project is designed to publish as a **static Vite build**. Hostinger does not need a permanent Node.js process to run the Tools and Games UI. The current twenty-four tools plus Orbit Dash, Signal Switch, and Circuit Shift are browser-local, so the core experience does not require an API or database.

## Build and upload

Run the following from the project directory:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build
```

Upload the contents of `dist/public/` to the domain document root, usually `public_html/` in Hostinger File Manager or SFTP. Upload the **contents** of that folder rather than the folder itself. The generated `.htaccess` file is copied from `client/public/` into the output and ensures direct visits to routes such as `/tools/json-station` or `/games/orbit-dash` serve the React application.

## Hostinger checklist

| Check | Expected result |
|---|---|
| Root document | `public_html/index.html` exists after upload |
| SPA fallback | `/tools`, `/tools/image-resizer`, `/games/orbit-dash`, `/games/signal-switch`, and `/games/circuit-shift` open directly without 404 errors |
| HTTPS | `https://toolboxgalaxy.com` is enabled and the HTTP version redirects to HTTPS |
| Assets | `/manus-storage/` URLs must be replaced by equivalent permanent image URLs if deploying outside Manus hosting |
| Headers | Confirm the `.htaccess` header directives work with the selected Hostinger server stack |
| PWA files | `manifest.webmanifest`, `service-worker.js`, and `offline.html` are present at the document root after upload |
| Offline fallback | After one successful load over HTTPS, temporarily disable the network and reload a recently visited route; the cached app shell or the explicit offline screen appears |
| Sitemap | `https://toolboxgalaxy.com/sitemap.xml` returns the new sitemap |

## Important asset note

The current build uses Manus-hosted visual asset URLs. Those URLs are suitable for the project preview. Before the Hostinger release, export the five generated assets and upload them to the Hostinger site (for example, `public_html/assets/`), then replace the `/manus-storage/...` references with your permanent HTTPS asset paths. Do not leave preview-only asset URLs in a production Hostinger upload.

The complete source-to-destination list is in [`HOSTINGER_ASSET_MAP.md`](./HOSTINGER_ASSET_MAP.md). Build production with `VITE_ASSET_BASE_URL=/assets` after the asset references have been moved to the Hostinger location.

## Offline and install behavior

The service worker is a small static file with no API dependency. It caches the app shell plus same-origin files that the browser has successfully visited, and it uses a network-first path for navigations so new releases are discovered whenever the visitor is online. A new worker waits for the user’s explicit **Refresh** action in the visible update-ready notice, avoiding an automatic reload during local tool work. The `.htaccess` file marks `service-worker.js` as non-cacheable so Hostinger clients can receive the next cache version promptly.

The native install button appears only in browsers that emit the standard install prompt and only after the manifest, HTTPS, and service worker meet that browser’s own requirements. The current manifest uses the preview Orbit Mark path; before production, replace its icon source with the permanent `/assets/orbit-mark.png` path alongside the other Manus-hosted image replacements.

## Browser-local recent tools

The Tools hub can retain up to six recently opened tool routes in the current browser’s `localStorage`. It stores only the public route metadata already present in the tool registry—tool slug, name, category, and visit timestamp. It does **not** store workspace inputs, outputs, uploaded files, generated content, passwords, hashes, or images. Visitors can clear that small log or export the metadata as JSON directly from the Tools page; neither action contacts a server.

## Browser-local favorite tools

Visitors can pin up to twelve verified tools for repeat access. The favorite feature stores only the tool route slug in the current browser’s `localStorage`, then resolves its visible title, category, and description from the already bundled registry. It never stores tool inputs, outputs, files, generated content, or account data. A visitor can remove any individual pin or clear all pins directly from the Tools hub; no favorite data is sent to Hostinger or any other service.

## Keyboard shortcut reference

The global shortcut reference is static UI only and has no persistence, API, or analytics dependency. It opens from the visible rail control or with `?` when focus is outside editable fields; it only documents the existing controls and does not create a global command system. All documented game keys retain a visible pointer/touch equivalent. For visual QA, append `?shortcuts=1` to a route to open the reference panel directly.

## Command palette

The command palette is also static UI only. It searches the already bundled route/module catalog and opens from the rail or Ctrl/Cmd+K only when a visitor is not typing and no dialog is open. It does not query an API, persist search terms, or inspect tool workspace content. For visual QA, append `?command=1` to a route to open it directly.

## Circuit Shift Daily Challenge

Circuit Shift’s Daily Challenge is also static and browser-local. Its 4×4 scramble is derived from the visitor device’s local calendar date, so it does not need a clock API, database, login, or leaderboard. The date-specific daily best remains in that browser’s local storage and is separate from normal practice best scores. A local Daily Streak stores only the completed local date plus current/longest consecutive counts; repeat solves on the same date cannot increase it. Confirm `/games/circuit-shift?daily=1` and `/games/circuit-shift?daily=1&demo=1` after Hostinger upload; the latter is a visual QA route only, keeps game sound disabled until a visible player action enables it, and does not write a streak.

## Future PHP APIs

When a tool genuinely needs server processing, expose it behind a single PHP API base such as `/api/v1/`. Keep the frontend request path in one environment-driven adapter instead of hard-coding endpoints in individual pages. The PHP endpoint should validate inputs, return consistent JSON errors, enforce file limits for uploads, and restrict cross-origin access to the production domain.

The contact form boundary and expected `/api/v1/contact` request/response shape are defined in [`API_CONTACT_CONTRACT.md`](./API_CONTACT_CONTRACT.md). The frontend remains in safe email-fallback mode until `VITE_CONTACT_ENDPOINT` is configured at build time.

The upload-ready PHP handoff archive lives outside this static project at `/home/ubuntu/hostinger-toolboxgalaxy-php-handoff.zip`. Copy its endpoint to `public_html/api/v1/contact.php`, copy and configure its secret config file outside `public_html` where the hosting layout allows it, then complete the HTTPS and origin tests described in its `INSTALL.md` before enabling the frontend endpoint variable.

## Before launch

The privacy and terms pages are initial product copy, not legal advice. Review them with the final analytics, advertising, form, file-upload, and retention configuration before publishing publicly.
