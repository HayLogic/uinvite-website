import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve(".output/public");
const portArg = process.argv.indexOf("--port");
const port = Number(process.env.PORT || (portArg >= 0 ? process.argv[portArg + 1] : 4173));
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp3": "audio/mpeg",
  ".m4a": "audio/mp4",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};
async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}
http
  .createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
      let file = resolve(root, "." + pathname),
        status = 200;
      if (file !== root && !file.startsWith(root + sep)) throw Error("Invalid path");
      if (/^\/templates\/\d{3}\/?$/.test(pathname))
        file = resolve(root, pathname.slice(1).replace(/\/$/, "") + ".html");
      else if (pathname === "/" || /^\/templates\/?$/.test(pathname))
        file = resolve(root, pathname === "/" ? "index.html" : "templates/index.html");
      else if (!(await isFile(file)) && (await isFile(resolve(file, "index.html"))))
        file = resolve(file, "index.html");
      if (!(await isFile(file))) {
        file = resolve(root, "404.html");
        status = 404;
      }
      const body = await readFile(file);
      res.writeHead(status, {
        "Content-Type": mime[extname(file)] || "application/octet-stream",
        "Cache-Control": "no-cache",
      });
      res.end(req.method === "HEAD" ? undefined : body);
    } catch {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Bad request");
    }
  })
  .listen(port, "0.0.0.0", () => console.log(`Built site preview: http://localhost:${port}`));
