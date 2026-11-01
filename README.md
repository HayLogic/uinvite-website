# uinvite-website
this is the version of uinvite website 

## New Year section

The `Նոր տարի` category is available in the homepage catalogue, `/templates`, the main menu and footer. Its direct link is `/templates#category-new-year`.

The festive placeholder uses evergreen/burgundy/gold colours, decorative SVG branches/ornaments and subtle CSS sparkle animation with reduced-motion support. It is shared by both catalogues through `src/components/NewYearSection.tsx` and `NewYearSection.css`.

Per the latest owner instruction, **do not add invitation templates or assign/change package prices yet**. Existing 62 catalogue records, tier prices and public template folders are preserved. The new category shows `Տոնական հավաքածուն՝ շուտով` and no package filters until its collection is ready. Template assets 067–076 remain in the separate invitation repository and have not been imported here.

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

`public/templates/079/` (baptism) and `public/templates/080/` (first birthday) follow 055's exact fixed-background/transparent-sections structure with adapted Armenian copy and sample event data. They are not catalogue entries and have no assigned prices. Original 055 is unchanged. Their user-supplied inline photographs are still pending downloadable JPG/PNG files; each draft's README explains the expected `hero-bg.jpg`/`CONFIG.backgroundImage` setting. Do not generate replacements without permission.
