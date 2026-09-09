import express from "express";
import { createServer } from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Robust static dist path resolution with validation
function findValidDistPath(): string | null {
  const candidates = [
    path.resolve(process.cwd(), "dist"),
    path.resolve(__dirname, "..", "dist"),
    path.resolve(__dirname, "dist"),
    path.resolve(process.cwd(), "client", "dist"),
    path.resolve(__dirname, "..", "client", "dist"),
    path.resolve(__dirname, "public"),
  ];

  for (const dir of candidates) {
    try {
      if (!fs.existsSync(dir)) continue;
      const indexPath = path.join(dir, "index.html");
      if (!fs.existsSync(indexPath)) continue;

      const stat = fs.statSync(indexPath);
      if (stat.size < 50) continue;

      const content = fs.readFileSync(indexPath, "utf-8");
      if (content.includes("<html") || content.includes("<!DOCTYPE") || fs.existsSync(path.join(dir, "assets"))) {
        return dir;
      }
    } catch {
      // Ignore read/stat errors and check next candidate
    }
  }

  return null;
}

function getFallbackHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Toolbox Galaxy – Initializing</title>
  <style>
    body {
      margin: 0;
      background: #0b1020;
      color: #f4f2ea;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
      padding: 24px;
      box-sizing: border-box;
    }
    .card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 32px 24px;
      max-width: 480px;
      width: 100%;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    }
    .badge {
      display: inline-block;
      font-family: monospace;
      font-size: 11px;
      letter-spacing: 0.1em;
      padding: 4px 10px;
      border-radius: 9999px;
      background: rgba(199, 243, 107, 0.15);
      color: #c7f36b;
      border: 1px solid rgba(199, 243, 107, 0.3);
      margin-bottom: 16px;
      text-transform: uppercase;
    }
    h1 {
      margin: 0 0 12px;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: -0.03em;
    }
    p {
      margin: 0 0 24px;
      color: rgba(244, 242, 234, 0.65);
      font-size: 14px;
      line-height: 1.6;
    }
    .spinner {
      width: 28px;
      height: 28px;
      border: 3px solid rgba(199, 243, 107, 0.2);
      border-top-color: #c7f36b;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .button {
      display: inline-block;
      background: #c7f36b;
      color: #0b1020;
      font-weight: 600;
      font-size: 13px;
      padding: 10px 20px;
      border-radius: 10px;
      text-decoration: none;
      border: none;
      cursor: pointer;
      font-family: inherit;
      transition: opacity 0.2s;
    }
    .button:hover { opacity: 0.9; }
  </style>
  <script>
    setInterval(async () => {
      try {
        const res = await fetch("/api/health");
        if (res.ok) {
          const check = await fetch("/");
          if (check.ok && check.headers.get("content-type")?.includes("text/html")) {
            const text = await check.text();
            if (!text.includes("build-in-progress-screen")) {
              window.location.reload();
            }
          }
        }
      } catch (e) {}
    }, 2500);
  </script>
</head>
<body id="build-in-progress-screen">
  <div class="card">
    <div class="badge">Workbench Boot Sequence</div>
    <div class="spinner"></div>
    <h1>Application Assets Initializing</h1>
    <p>The client bundle is being prepared or compiled. This page will automatically refresh as soon as static production assets are mounted.</p>
    <button class="button" onclick="window.location.reload()">Reload Now</button>
  </div>
</body>
</html>`;
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Robust static dist path resolution with fallback search
  let staticPath = findValidDistPath() || path.resolve(process.cwd(), "dist");

  // Mount express.static handler dynamically checking the resolved path
  app.use((req, res, next) => {
    const valid = findValidDistPath();
    if (valid) staticPath = valid;
    express.static(staticPath)(req, res, next);
  });

  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      staticPath,
      hasIndex: fs.existsSync(path.join(staticPath, "index.html")),
    });
  });

  // Handle client-side routing - serve index.html with automated dynamic SEO & OpenGraph meta tags
  app.get("*", (req, res) => {
    const pathname = req.path;

    // If it is a missing static file asset, return a clean 404 instead of HTML to prevent syntax errors
    if (/\.(?:js|css|png|jpg|jpeg|gif|svg|ico|json|woff2?|ttf|map)$/i.test(pathname) || pathname.startsWith("/assets/")) {
      return res.status(404).type("text/plain").send("Asset not found");
    }

    // Refresh valid path if needed
    const verifiedPath = findValidDistPath() || staticPath;
    const indexPath = path.join(verifiedPath, "index.html");

    if (!fs.existsSync(indexPath)) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(getFallbackHtml());
    }

    let html: string;
    try {
      html = fs.readFileSync(indexPath, "utf-8");
    } catch {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(getFallbackHtml());
    }

    const query = req.query as Record<string, string>;

    let pageTitle = "Toolbox Galaxy – Private In-Browser Tools & Daily Logic Hub";
    let ogTitle = "Toolbox Galaxy – Free In-Browser Tools & Daily Logic Puzzles";
    let ogDesc = "100% client-side privacy-first workbench: PDF & Doc Studio, 120+ utilities, and daily logic puzzles (The Hive, Wordle, Connections).";

    if (pathname.startsWith("/games/hive")) {
      if (query.by) {
        pageTitle = `⚔️ Challenge from ${query.by} – The Hive | Toolbox Galaxy`;
        ogTitle = `⚔️ ${query.by} challenged you in The Hive!`;
        ogDesc = `Can you beat ${query.by}'s time in today's hexagonal word puzzle? Play now with zero install!`;
      } else {
        pageTitle = "The Hive – Daily Spelling Logic Puzzle | Toolbox Galaxy";
        ogTitle = "🐝 The Hive – Daily Hex Word Puzzle";
        ogDesc = "Find words, discover the secret pangram, and reach Queen Bee rank! 100% free with daily curated puzzles.";
      }
    } else if (pathname.startsWith("/games/wordle")) {
      if (query.by) {
        pageTitle = `⚔️ Wordle Challenge from ${query.by} | Toolbox Galaxy`;
        ogTitle = `⚔️ ${query.by} challenged you to Wordle Plus!`;
        ogDesc = `Can you guess the 5-letter word faster than ${query.by}? Step up to the challenge!`;
      } else {
        pageTitle = "Wordle Plus – Daily 5-Letter Word Puzzle | Toolbox Galaxy";
        ogTitle = "🟩 Wordle Plus – Daily Word Challenge";
        ogDesc = "Test your vocabulary with daily 5-letter puzzles. Free, clean UI, audio cues, and zero ads.";
      }
    } else if (pathname.startsWith("/games/connections")) {
      if (query.by) {
        pageTitle = `⚔️ Connections Challenge from ${query.by} | Toolbox Galaxy`;
        ogTitle = `⚔️ ${query.by} challenged you to Connections!`;
        ogDesc = `Can you group all 4 word categories with fewer mistakes than ${query.by}? Accept the challenge!`;
      } else {
        pageTitle = "Connections – Daily 4×4 Word Association Puzzle | Toolbox Galaxy";
        ogTitle = "🔠 Connections – Daily Word Association Puzzle";
        ogDesc = "Find four groups of 4 related words across 4 hidden categories. 100% free with daily new editions.";
      }
    } else if (pathname.startsWith("/games/mini-crossword")) {
      if (query.by) {
        pageTitle = `⚔️ Crossword Challenge from ${query.by} | Toolbox Galaxy`;
        ogTitle = `⚔️ ${query.by} challenged you to Mini Crossword!`;
        ogDesc = `Can you solve today's 5×5 crossword faster than ${query.by}? Play now!`;
      } else {
        pageTitle = "Mini Crossword – Daily 5×5 Speed Puzzle | Toolbox Galaxy";
        ogTitle = "📰 Mini Crossword – Daily 5×5 Speed Puzzle";
        ogDesc = "Solve the daily 5×5 mini crossword puzzle across and down. Fast, clean, and 100% free.";
      }
    } else if (pathname.startsWith("/games")) {
      if (query.by) {
        const rawSlug = pathname.replace(/^\/games\/?/, "").split("/")[0] || "puzzle";
        const formatted = rawSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        pageTitle = `⚔️ ${formatted} Challenge from ${query.by} | Toolbox Galaxy`;
        ogTitle = `⚔️ ${query.by} challenged you in ${formatted}!`;
        ogDesc = `Can you beat ${query.by}'s time in today's daily logic puzzle? Play now with zero ads and zero install!`;
      } else {
        pageTitle = "Games Bay – Free Daily Brain & Logic Puzzles | Toolbox Galaxy";
        ogTitle = "🎮 Games Bay – Daily Brain & Word Puzzles";
        ogDesc = "Play The Hive, Wordle Plus, Queens, Connections, and Mini-Sudoku in your browser.";
      }
    } else if (pathname.startsWith("/pdf-studio")) {
      pageTitle = "PDF Studio – Free Private In-Browser PDF Editor | Toolbox Galaxy";
      ogTitle = "📄 PDF Studio – 100% Client-Side Private PDF Tools";
      ogDesc = "Merge, split, rotate, convert, and edit PDFs locally in your browser. Zero cloud uploads, 100% confidential.";
    }

    // Replace meta tags dynamically for social crawlers (WhatsApp, Twitter, Facebook, Slack, Googlebot)
    html = html
      .replace(/<title>.*?<\/title>/, `<title>${pageTitle}</title>`)
      .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${ogTitle}" />`)
      .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${ogDesc}" />`)
      .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${ogTitle}" />`)
      .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${ogDesc}" />`)
      .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${ogDesc}" />`);

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(html);
  });

  const port = Number(process.env.PORT) || 3000;
  const host = "0.0.0.0";

  server.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}/ (serving ${staticPath})`);
  });
}

startServer().catch(console.error);
