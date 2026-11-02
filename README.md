# uinvite-website
this is the version of uinvite website 

## New Year section

The `Նոր տարի` category is available in the homepage catalogue, `/templates`, the main menu and footer. Its direct link is `/templates#category-new-year`.

The festive placeholder uses evergreen/burgundy/gold colours, decorative SVG branches/ornaments and subtle CSS sparkle animation with reduced-motion support. It is shared by both catalogues through `src/components/NewYearSection.tsx` and `NewYearSection.css`.

The owner has now authorized publishing **all 001–080 invitations**. Both catalogues use the same card fields: number, live price, full package label, category, badges, preview and WhatsApp order links. TOP records appear first in descending code order; all other records follow in descending code order (New/Discount badges do not override that order). The New Year category contains 067–076 and its “coming soon” notice has been replaced by the available collection. Those Excel rows remain tagged Other in the source assignment table, and are exposed under New Year in the catalogue based on their seasonal content.

All public/template entrypoints exist, including a new `066/index.html` copied from its original Armenian-named HTML file. Existing original 066 file is retained. Templates 067–078 are imported from the separate numbered invitation repository, including local assets and music where present. Card previews for 063–080 are WebP captures of the actual invitations. 079/080 use the owner-supplied baptism and birthday photographs (see below).

## Local development

```sh
npm ci --legacy-peer-deps
npm run dev
```

The existing lockfile has a Nitro prerelease peer-resolution conflict with the Lovable configuration package under npm; `--legacy-peer-deps` installs the recorded dependency set without changing package versions.

```sh
npm exec -- tsc --noEmit
npm run build
```

Production output is generated under `.output/`. Preview the prerendered production site with:

```sh
npm run preview
npm run check:seo
```

The preview serves `.output/public` at port 4173 (override with `-- --port 8037`). The existing Nitro preset is Cloudflare; its server module is a worker handler, not a standalone Node HTTP server. The custom preview also avoids the old `vite preview` path mismatch. Do not commit `node_modules` or `.output`.

## Invitations 079 and 080

`public/templates/079/` (baptism) and `public/templates/080/` (first birthday) follow 055's exact fixed-background/transparent-sections structure with adapted Armenian copy and sample event data. They are now published catalogue entries with package metadata from the owner-provided 001–080 assignment table. Original 055 is unchanged. The owner-supplied `hero-bg.png` photographs are now connected through `CONFIG.backgroundImage` and the CSS fallback. The original PNG files and existing design are preserved. Catalogue WebP previews have been recaptured from the actual invitations.


## Six-package pricing (latest owner update)

| Type | Start | Classic | Plus |
| --- | --- | --- | --- |
| Standart | 4,900 ֏ | 6,900 ֏ | 10,900 ֏ |
| Premium | 15,900 ֏ | 21,900 ֏ | 28,900 ֏ |

`src/data/pricing.ts` is the single source of package names/prices. `src/data/templateAssignments.ts` records all 001–080 assignments imported from the owner-supplied uinvite_templates_001_080.xlsx, including categories and badges. All 001–080 cards are now published following the later owner request. The owner will supply images through GitHub.

Homepage pricing shows two groups with three cards each and announces Premium availability. Catalog filters, labels, FAQ and WhatsApp order messages use the new labels/prices. Old struck-through marketing prices and stale autumn-sale copy were removed. No new service benefits were invented. Individual-design pricing is discussed rather than retaining the outdated 15,000 ֏ figure.

Discounts end 31 December 2026, 23:59:59.999 Armenia (+04:00), per the owner's clarification. 036, 056, 057, 061, 062: Standart Plus → Classic (6,900 ֏). 037, 053, 059: Standart Classic → Start (4,900 ֏). The owner explicitly corrected 057 to Plus → Classic; 036/037 retain the prior one-level-discount pattern. Badge-only discounts without a target/end date are never advertised. After the deadline, prices revert to the base package and discount indicators disappear; open catalogues refresh at the deadline.

Verification: TypeScript and production build; responsive 360/390/768/1440 pricing/filter/order flows; all 80 assignment records, all 80 published records, and pre/post-deadline price resolution.

Latest catalogue verification: 80 unique cards and valid image/static-preview URLs; TOP order 075, 068, 066, 060, 055, 035 then descending remaining IDs; category and package filters; representative iframe routes; mobile/desktop layout and production build. No prices were changed by this catalogue publication.

Existing preview entrypoints also repaired without removing originals: 037 was nested under 031/037 and is now copied to its own numbered folder; 059 had Index.html and now also has lowercase index.html for Linux/cPanel routing. All 80 image URLs and static entrypoints were verified. 066 also retains its original Armenian filename alongside index.html.

## SEO, prerendering and hosting

TanStack Start's native prerendering generates 83 public routes: `/`, `/templates`, `/corporate` and `/templates/001`–`080`. The built HTML includes the actual Armenian content, navigation, prices and FAQ, plus static canonical/Open Graph/Twitter tags and Organization/FAQPage JSON-LD. Each route has one h1. The 1200×630 share image uses the existing logo and hero phones (166,163 bytes).

Upload the **contents of `.output/public/`**, including the hidden `.htaccess`, to the Apache document root. This serves `/templates` directly, maps `/templates/NNN` to `templates/NNN.html`, and returns HTTP 404 for unknown routes. Keep `templates/NNN/index.html`: those are the original standalone invitations used by the viewer iframe. Do not replace the routing with an unconditional rewrite to the homepage, which would return HTTP 200 for missing pages. Other hosts need equivalent rules; Cloudflare's existing worker build remains available separately.

The header's HY/RU/EN structure lives in `src/i18n/languages.ts`. All three website languages are available. `LanguageProvider` starts in Armenian for matching prerender/hydration, then restores the saved language from browser storage. `messages.json` contains Russian/English UI translations keyed by the original Armenian text. Pricing names and amounts are preserved. Navigation, FAQ, categories, countdown labels, accessibility labels, order messages and viewer controls are localized; invitation documents and the hero's sample invitation contents remain unchanged. Public URLs and Armenian build-time SEO remain intact; page metadata follows the visitor's selected language after hydration. Cross-route section links use the homepage pathname and hash; shared scrolling accounts for the sticky header and reduced motion.

See [SEO verification](docs/SEO-VERIFICATION.md) for test results and deployment limits.

Latest locale verification: TypeScript, production build and SEO checks passed. Chromium checks at 360/390/768/1440 px covered HY/RU/EN switching, reload persistence, translated FAQ/order messages, all 80 cards, single countdown per discounted card, cross-route anchors and no horizontal overflow or application console errors. The 055 viewer retained its Armenian iframe across language switches and reloads. The static 404 respects the saved language. All existing CSS strings and numbered invitation files are unchanged.

## Corporate partnership page

`/corporate` introduces cooperation with wedding venues/restaurants, event planners, agencies, decorators, photographers and other event professionals. Available in HY/RU/EN through the existing switcher, with links in the shared header and homepage footer. Both partnership CTAs open the existing WhatsApp number (+37477198238) with a locale-specific, prefilled enquiry. No message is sent automatically. Commercial terms are discussed individually; no unapproved rates or commissions are advertised.

The page is prerendered with its own metadata/canonical and included in the 83-URL sitemap. Apache rewrite rules preserve direct reloads; the static preview serves its generated directory index. Existing invitation files, prices and URLs are unchanged.

Verification: TypeScript, production build, SEO check, targeted ESLint, and Chromium at 360/390/768/1210/1440 px. Each width covers all three locales, direct load/reload, WhatsApp targets, header/footer entrypoints, active navigation and returning to homepage pricing with header offset. No overflow, header overlap or application errors; external analytics stubbed as in the SEO verification. The prerendered page and enquiry links also work without JavaScript. No live deployment performed.

Homepage hero phones now show the catalogue images for 063 baptism (left), 055 wedding (centre) and 064 birthday (right), keeping the existing phone frames and layout.

## Category sharing images (pending photo files)

Wedding invitations share `/assets/meta-photo/wedding.png`; baptisms share `/assets/meta-photo/bapstrim.png`; birthday/children's invitations share `/assets/meta-photo/birthday.png`. The owner confirmed `birthday.png`; the `assets` directory spelling is normalized, while `bapstrim.png` is retained as requested. Other categories keep their existing images.

The 53 affected standalone invitation entrypoints and their React viewer pages now have matching static OG/Twitter image URLs. Invitation body content and photography remain unchanged. The three PNG files have not yet been supplied: add them under `public/assets/meta-photo/`, commit them, then rebuild. `npm run check:share-images` checks all 53 pairs of documents and reports missing image files separately. It currently passes metadata checks and exits with a pending-files status for those three PNGs. No live deployment performed.

## Invitation viewer: menu and order actions

On `/templates/NNN`, the website header is hidden. The three existing Order/Call/Back actions are rendered through a React portal at the end of the same-origin invitation document, so guests reach them by scrolling the actual invitation to the bottom. The iframe retains its viewport height and original fixed backgrounds; invitation files are not resized or rewritten for this change. Cached documents that finish before React hydration are handled as well as normal iframe load events. Returning to the catalogue restores the shared header and its scroll offset measurement.

Verified: TypeScript, production build and SEO checks; representative document layout checks across 19 invitations; complete 390/1440 px flows for 002, 055, 067, 076, 077, 079 and 080 (including envelope/gift opening). Each flow confirmed no website menu, a single action bar after the content, reachable buttons at the bottom, the existing WhatsApp target, and return to all 80 catalogue cards with the menu restored. External services were stubbed in browser tests. No live deployment performed.

## Latest owner update: 077 and 078 removed

Invitations 077 and 078, their catalogue images and assignment entries have been removed at the owner’s request. Their prior versions remain recoverable from Git history. There are now 78 published invitations (001–076, 079–080) and 81 prerendered public routes. Catalogue text/translations, the homepage count, sitemap and verification checks are updated. Apache explicitly returns 404 for the retired URLs even if an older hosting copy still exists. No other invitation data or files were changed. Earlier verification notes above describe the catalogue before this removal. Local review only; no live deployment.

Latest New Year package update: 075 is Standart Plus (10,900 ֏), with only the New badge and no TOP. 068 has a final QR sharing section and matching `templates/068/qr.html` utility page. The real QR opens `https://uinvite.am/templates/068/index.html`. Seating-plan work awaits the owner’s reference. Other templates are unchanged; local review only.

## Premium seating and latest badge/price update

All ten published Premium Start/Classic/Plus invitations (003, 006, 064, 068–073, 076) now link to their own `seating.html`. These pages use the owner's supplied 10-table/120-seat example, with search, matching-table highlights, named popup seats and keyboard-safe modal behavior. The example label is visible; no actual event seating has been inferred. Existing invitation design is unchanged outside the added button. `public/templates/shared/` contains shared assets and documentation; `scripts/sync-premium-seating.mjs` regenerates the links/pages.

Per the owner’s clarification: 079 and 071 have TOP, with unchanged 4,900 ֏ and 28,900 ֏ base prices respectively. Only 073 has the new Discount badge: its Premium Plus base price is discounted to 10,900 ֏ (Standart Plus price) until the established 31 December 2026 deadline.

The 068 QR page now matches the active origin rather than always encoding the public hostname. For local phone scanning, open it via the computer's LAN address on the same Wi-Fi. Public hosting retains the exact public 068 target. Static fallback, download and supported native sharing remain available. No live deployment.

Latest follow-up: 072 is Standart Plus at its regular 10,900 ֏ price, with no new discount. Its Premium seating button/page are removed (nine eligible Premium invitations remain). Homepage menu New Year now has a tree icon and green/gold pill; 065 uses the supplied Let It Snow track through its existing music controls.

070 is now Premium Plus (28,900 ֏), retaining its New badge, track and Premium seating page. 065’s countdown/music helper name collision was fixed so the existing page script and real MP3 playback initialize correctly.
