# uinvite-website
this is the version of uinvite website 

## New Year section

The `Նոր տարի` category is available in the homepage catalogue, `/templates`, the main menu and footer. Its direct link is `/templates#category-new-year`.

The festive placeholder uses evergreen/burgundy/gold colours, decorative SVG branches/ornaments and subtle CSS sparkle animation with reduced-motion support. It is shared by both catalogues through `src/components/NewYearSection.tsx` and `NewYearSection.css`.

The owner has now authorized publishing **all 001–080 invitations**. Both catalogues use the same card fields: number, live price, full package label, category, badges, preview and WhatsApp order links. TOP records appear first in descending code order; all other records follow in descending code order (New/Discount badges do not override that order). The New Year category contains 067–076 and its “coming soon” notice has been replaced by the available collection. Those Excel rows remain tagged Other in the source assignment table, and are exposed under New Year in the catalogue based on their seasonal content.

All public/template entrypoints exist, including a new `066/index.html` copied from its original Armenian-named HTML file. Existing original 066 file is retained. Templates 067–078 are imported from the separate numbered invitation repository, including local assets and music where present. Card previews for 063–080 are WebP captures of the actual invitations. 079/080 still have neutral backgrounds pending the owner's supplied photos (see below).

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

Production output is generated under `.output/`. To run its server directly after building:

```sh
node .output/server/index.mjs
```

This avoids the existing `vite preview` path mismatch that searches for `dist/server/server.js`. Do not commit `node_modules` or `.output`.

## Drafts 079 and 080

`public/templates/079/` (baptism) and `public/templates/080/` (first birthday) follow 055's exact fixed-background/transparent-sections structure with adapted Armenian copy and sample event data. They are now published catalogue entries with package metadata from the owner-provided 001–080 assignment table. Original 055 is unchanged. Their user-supplied inline photographs are still pending downloadable JPG/PNG files; each draft's README explains the expected `hero-bg.jpg`/`CONFIG.backgroundImage` setting. Do not generate replacements without permission.


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
