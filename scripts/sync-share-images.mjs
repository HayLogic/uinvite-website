import { readFile, writeFile } from "node:fs/promises";
import ts from "typescript";

// Assignment data imports only TypeScript types; transpile without executing site UI.
const source = await readFile(
  new URL("../src/data/templateAssignments.ts", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const { templateAssignments } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);
const images = JSON.parse(
  await readFile(new URL("../src/data/shareImages.json", import.meta.url), "utf8"),
);
let count = 0;
for (const [code, { category }] of Object.entries(templateAssignments)) {
  if (!images[category]) continue;
  const file = new URL(`../public/templates/${code}/index.html`, import.meta.url);
  const html = await readFile(file, "utf8");
  const end = html.toLowerCase().indexOf("</head>");
  if (end < 0) throw new Error(`Missing head: ${code}`);
  const head = html
    .slice(0, end)
    .replace(/[ \t]*<meta\b[^>]*>/gi, (tag) =>
      /(?:property|name)\s*=\s*["'](?:og:image(?::(?:url|secure_url|width|height|alt))?|twitter:image(?::(?:src|alt))?|twitter:card)["']/i.test(
        tag,
      )
        ? ""
        : tag,
    );
  const url = new URL(images[category], "https://uinvite.am").href;
  const meta = `  <!-- Shared category preview; invitation photography is unchanged. -->\n  <meta property="og:image" content="${url}">\n  <meta name="twitter:card" content="summary_large_image">\n  <meta name="twitter:image" content="${url}">\n`;
  // Keep the script idempotent when a new category assignment is introduced.
  const clean = head.replace(
    /\s*<!-- Shared category preview; invitation photography is unchanged\. -->\s*$/i,
    "\n",
  );
  await writeFile(file, clean + meta + html.slice(end));
  count++;
}
console.log(`Updated sharing metadata for ${count} invitations.`);
