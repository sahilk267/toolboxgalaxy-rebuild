# Hostinger Shared Hosting Deployment

This project is designed to publish as a **static Vite build**. Hostinger does not need a permanent Node.js process to run the Tools and Games UI. The first eight tools and the Orbit Dash game are browser-local, so this deployment does not require an API or database.

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
| SPA fallback | `/tools`, `/tools/json-station`, and `/games/orbit-dash` open directly without 404 errors |
| HTTPS | `https://toolboxgalaxy.com` is enabled and the HTTP version redirects to HTTPS |
| Assets | `/manus-storage/` URLs must be replaced by equivalent permanent image URLs if deploying outside Manus hosting |
| Headers | Confirm the `.htaccess` header directives work with the selected Hostinger server stack |
| Sitemap | `https://toolboxgalaxy.com/sitemap.xml` returns the new sitemap |

## Important asset note

The first build uses Manus-hosted visual asset URLs. Those URLs are suitable for the current project preview. Before the Hostinger release, download/export the four generated assets and upload them to the Hostinger site (for example, `public_html/assets/`), then replace the `/manus-storage/...` references with your permanent HTTPS asset paths. Do not leave preview-only asset URLs in a production Hostinger upload.

## Future PHP APIs

When a tool genuinely needs server processing, expose it behind a single PHP API base such as `/api/v1/`. Keep the frontend request path in one environment-driven adapter instead of hard-coding endpoints in individual pages. The PHP endpoint should validate inputs, return consistent JSON errors, enforce file limits for uploads, and restrict cross-origin access to the production domain.

## Before launch

The privacy and terms pages are initial product copy, not legal advice. Review them with the final analytics, advertising, form, file-upload, and retention configuration before publishing publicly.
