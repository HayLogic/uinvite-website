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

Homepage hero phones now show the catalogue images for 055 (left), 078 (centre) and 064 (right), keeping the existing phone frames and layout.
