import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import ts from "typescript";
const source = await readFile("src/data/templateAssignments.ts", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const { templateAssignments } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);
const images = JSON.parse(await readFile("src/data/shareImages.json", "utf8"));
let count = 0;
for (const [code, { category }] of Object.entries(templateAssignments)) {
  if (!images[category]) continue;
  const expected = new URL(images[category], "https://uinvite.am").href;
  for (const file of [
    `public/templates/${code}/index.html`,
    `.output/public/templates/${code}.html`,
  ]) {
    const html = await readFile(file, "utf8");
    const head = html.slice(0, html.toLowerCase().indexOf("</head>"));
    for (const key of ["og:image", "twitter:image"]) {
      const tags = [...head.matchAll(/<meta\b[^>]*>/gi)]
        .map((m) => m[0])
        .filter((tag) => new RegExp(`(?:property|name)=["']${key}["']`).test(tag));
      assert.equal(tags.length, 1, `${file}: duplicate or missing ${key}`);
      assert(tags[0].includes(expected), `${file}: wrong ${key}`);
    }
  }
  count++;
}
console.log(
  `PASS: ${count} invitations have matching category OG/Twitter images in both viewer and standalone HTML.`,
);
const missing = [];
for (const path of new Set(Object.values(images))) {
  try {
    await access(`public${path}`);
  } catch {
    missing.push(`public${path}`);
  }
}
if (missing.length) {
  console.error(`PENDING owner-provided files:\n${missing.join("\n")}`);
  process.exitCode = 1;
} else console.log("PASS: all shared image files exist.");
