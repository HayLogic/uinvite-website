import { readFile, writeFile } from "node:fs/promises";
import ts from "typescript";
const source = await readFile("src/data/templateAssignments.ts", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const { templateAssignments } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);
const codes = Object.entries(templateAssignments)
  .filter(([, a]) => a.tier.startsWith("premium-"))
  .map(([code]) => code);
const style =
  '<link rel="stylesheet" href="../shared/seating-button.css?v=1" id="premium-seating-styles">';
const button =
  '<!-- premium-seating:start --><div class="premium-seating-cta"><a class="premium-seating-link" href="seating.html"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4zM4 10h16M10 4v16"/></svg>Սեղանների դասավորություն</a></div><!-- premium-seating:end -->';
for (const code of codes) {
  const path = `public/templates/${code}`;
  let html = await readFile(`${path}/index.html`, "utf8");
  html = html
    .replace(/<link\b[^>]*id="premium-seating-styles"[^>]*>/g, "")
    .replace(/<!-- premium-seating:start -->[\s\S]*?<!-- premium-seating:end -->/g, "");
  html = html.replace(/<\/head>/i, `${style}</head>`);
  const rsvp = html.match(/<section\b[^>]*\bid=["']rsvp["'][^>]*>/i);
  if (rsvp) html = html.slice(0, rsvp.index) + button + html.slice(rsvp.index);
  else {
    const end = html.toLowerCase().lastIndexOf("</main>");
    if (end >= 0) html = html.slice(0, end) + button + html.slice(end);
    else html = html.replace(/<\/body>/i, `${button}</body>`);
  }
  await writeFile(`${path}/index.html`, html);
  await writeFile(
    `${path}/seating.html`,
    `<!doctype html><html lang="hy"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Սեղանների դասավորություն · ${code}</title><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Armenian:wght@400;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="../shared/seating.css?v=1"><script src="../shared/seating-data.js?v=1" defer></script><script src="../shared/seating.js?v=1" defer></script></head><body><main class="container"><a class="seating-back" href="index.html">← Վերադառնալ հրավիրատոմսին</a><h1>Սեղանների դասավորություն</h1><p class="subtitle">Ընտրեք սեղանը</p><p class="seating-note">Օրինակային դասավորություն․ հյուրերի ցուցակը ներկայացված է որպես օրինակ։</p><label class="search-label" for="search">Գտնել հյուրին</label><input id="search" type="search" placeholder="Գտնել հյուրին…" autocomplete="off"><p id="search-status" class="search-status" role="status" aria-live="polite"></p><div class="floor" id="floor"></div></main><dialog class="popup" id="popup" aria-labelledby="popup-title"><div class="popup-card"><button class="close" id="close" type="button" aria-label="Փակել">&times;</button><h2 id="popup-title" class="sr-only"></h2><div class="popup-table" id="ptable"></div></div></dialog><noscript>Սեղանների դասավորությունը դիտելու համար միացրեք JavaScript-ը։</noscript></body></html>\n`,
  );
}
await writeFile(
  "public/templates/shared/seating-premium.json",
  JSON.stringify(codes, null, 2) + "\n",
);
console.log(
  `Added seating buttons and pages to ${codes.length} Premium invitations: ${codes.join(", ")}`,
);
