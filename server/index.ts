import express from "express";
import { createServer } from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Robust static dist path resolution
  let staticPath = path.resolve(process.cwd(), "dist");
  if (!fs.existsSync(path.join(staticPath, "index.html"))) {
    if (fs.existsSync(path.resolve(__dirname, "..", "dist", "index.html"))) {
      staticPath = path.resolve(__dirname, "..", "dist");
    } else if (fs.existsSync(path.resolve(__dirname, "public", "index.html"))) {
      staticPath = path.resolve(__dirname, "public");
    } else if (fs.existsSync(path.resolve(process.cwd(), "client", "dist", "index.html"))) {
      staticPath = path.resolve(process.cwd(), "client", "dist");
    }
  }

  app.use(express.static(staticPath));

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    const indexPath = path.join(staticPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("Application build not found. Please run 'npm run build' first.");
    }
  });

  const port = Number(process.env.PORT) || 3000;
  const host = "0.0.0.0";

  server.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}/ (serving ${staticPath})`);
  });
}

startServer().catch(console.error);
