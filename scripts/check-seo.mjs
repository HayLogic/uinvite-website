import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";
const root = resolve(process.argv[2] || ".output/public");
const home = await readFile(resolve(root, "index.html"), "utf8");
const catalogue = await readFile(resolve(root, "templates/index.html"), "utf8");
const meta = (html, key) => {
  const tag = html.match(
    new RegExp(
      `<meta\\b[^>]*(?:name|property)="${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>`,
    ),
  )?.[0];
  return tag?.match(/content="([^"]*)"/)?.[1];
};
for (const [path, html] of [
  ["/", home],
  ["/templates", catalogue],
]) {
  assert.match(html, /<html[^>]*lang="hy"/);
  assert.doesNotMatch(html, /lovable/i);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal(meta(html, "author"), "uInvite");
  assert.equal(meta(html, "twitter:card"), "summary_large_image");
  assert.equal(meta(html, "og:site_name"), "uInvite");
  assert.equal(meta(html, "og:locale"), "hy_AM");
  assert(!meta(html, "twitter:site"));
  assert.match(
    html,
    new RegExp(`rel="canonical"[^>]*href="https://uinvite.am${path === "/" ? "/" : path}"`),
  );
}
assert.equal(meta(home, "og:url"), "https://uinvite.am/");
assert.equal(meta(home, "og:image"), "https://uinvite.am/og-image.png");
assert.equal(meta(home, "og:image:width"), "1200");
assert.equal(meta(home, "og:image:height"), "630");
assert.equal(meta(home, "twitter:image"), "https://uinvite.am/og-image.png");
for (const text of [
  "Ժամանակակից վեբ հրավիրատոմսեր",
  "Մեր փաթեթները",
  "Հաճախ տրվող հարցեր",
  "Պատվիրել հիմա",
  "4,900",
  "28,900",
])
  assert(home.includes(text), `Missing raw HTML text: ${text}`);
const structured = [
  ...home.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
].map((m) => JSON.parse(m[1]));
assert(structured.some((x) => x["@type"] === "Organization"));
const faq = structured.find((x) => x["@type"] === "FAQPage");
assert(faq && faq.mainEntity.length === 16);
const image = await readFile(resolve(root, "og-image.png"));
assert.equal(image.readUInt32BE(16), 1200);
assert.equal(image.readUInt32BE(20), 630);
assert(image.length < 300_000);
for (const file of [
  "favicon.png",
  "apple-touch-icon.png",
  "robots.txt",
  "sitemap.xml",
  "404.html",
  ".htaccess",
])
  await access(resolve(root, file));
const sitemap = await readFile(resolve(root, "sitemap.xml"), "utf8");
assert.equal((sitemap.match(/<loc>/g) || []).length, 82);
for (let n = 1; n <= 80; n++) {
  const code = String(n).padStart(3, "0");
  const html = await readFile(resolve(root, `templates/${code}.html`), "utf8");
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert(html.includes(`/templates/${code}/index.html`));
  await access(resolve(root, `templates/${code}/index.html`));
}
console.log(
  `PASS: static head metadata, raw Armenian content, one h1, Organization + 16 FAQs, 1200×630 OG (${image.length} bytes), 82 prerendered routes, preserved invitation files, sitemap and 404.`,
);
