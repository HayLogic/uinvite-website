# SEO and navigation verification (initial SEO revision)

Verified against the production build on 1 November 2026, served locally with `scripts/preview.mjs`.

- `npm exec -- tsc --noEmit`: passed.
- `npm run build`: passed; native prerendering produced 82 routes.
- `npm run check:seo`: passed. Checks the generated static metadata, Armenian content, one h1 per route, Organization and 16 FAQ entries, 82 sitemap routes, original standalone invitation files, icons, 404 and routing configuration.
- Raw homepage HTML contains the visible hero heading, pricing, navigation and FAQ. No Lovable reference or twitter:site remains in that source. Canonicals use https://uinvite.am. Metadata is present before JavaScript executes.
- OG image: 1200×630 PNG, 166,163 bytes, returned HTTP 200 locally. Favicon, apple icon, robots and sitemap also returned 200.
- Chromium production checks at 360, 390, 768 and 1440 px: no horizontal overflow; both homepage and catalogue navigation; pricing/why/steps/FAQ section offsets; home-to-top; correct active item; desktop/mobile CTA; RU/EN marked coming soon in the initial SEO revision; WhatsApp responsive appearance; 80 cards after direct catalogue load and refresh; seasonal and tier hash filters; unknown route 404.
- Repeated same-section navigation and header CTA scrolling passed. Native Nitro handler additionally returned 200 for `/templates` and 404 for an unknown route.
- JavaScript disabled: real homepage heading and pricing visible, native FAQ expands, catalogue contains all 80 cards.
- Zero application console errors/page errors in the browser matrix. The existing Facebook Pixel SDK was stubbed only in tests because the environment cannot reach connect.facebook.net. Its production code was retained. A broken provider-only silk-background URL was removed; the existing CSS fallback/colors remain.

## Review source

`npm run build` writes the full raw homepage to `.output/public/index.html`. [view-source-excerpt.html](view-source-excerpt.html) contains verbatim selections from that file, separated by omission comments. The full HTML was also supplied as a workspace artifact with the delivery message.

## Deployment limits

No live deployment or production-domain verification was performed. The session network policy does not allow access to uinvite.am. Upload `.output/public/` including `.htaccess` to Apache hosting, or apply equivalent routing on another host, then repeat HTTP and share-preview checks on the public domain. The Apache rules were reviewed; the equivalent local routing and native worker responses were exercised. Social-app cache refreshes and the external Facebook SDK require production-network verification.

## Follow-up: full website languages and duplicate discount

HY/RU/EN are now active; previous references to disabled RU/EN describe the initial revision only. Verified locally on 1 November 2026:

- TypeScript and the production build passed; `check:seo` still passes for all 82 routes.
- Four widths (360, 390, 768, 1440), each with all three locales: switching, saved choice after reload, homepage headings, all six pricing options, 16 FAQs, catalogue navigation/refresh with 80 cards, one countdown per discounted card, localized WhatsApp order text, cross-route FAQ anchor offset, no overflow or application errors. External Facebook SDK was stubbed as above.
- Russian and English rendered website text was checked for untranslated Armenian, excluding sample names and intentionally unchanged invitation mockups.
- Template 055: website viewer controls change language; iframe URL and its Armenian document language stay unchanged after switching and reload.
- Missing URL remains HTTP 404 and uses the saved English language.
- Existing CSS strings compare equal to the prior revision. No `public/templates/` files, catalogue assignments, prices or invitation addresses were modified.

No production deployment was performed for this follow-up.
