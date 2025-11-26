import fs from "node:fs";
import path from "node:path";
import { type Server } from "node:http";

import express, { type Express } from "express";
import runApp from "./app";
import { startScheduler, stopScheduler } from "./services/syncScheduler";

export async function serveStatic(app: Express, _server: Server) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

(async () => {
  await runApp(serveStatic);
  
  startScheduler();
  console.log("Sync scheduler started");
  
  process.on("SIGTERM", async () => {
    console.log("SIGTERM received, stopping scheduler...");
    await stopScheduler();
    process.exit(0);
  });

  process.on("SIGINT", async () => {
    console.log("SIGINT received, stopping scheduler...");
    await stopScheduler();
    process.exit(0);
  });
})();
