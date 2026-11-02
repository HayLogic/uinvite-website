# Premium seating pages

The owner supplied an Armenian HTML example with 10 round tables and 12 named seats at each table. The ivory/gold design and guest list are preserved in the shared CSS/data. Each Premium Start/Classic/Plus invitation has a local `seating.html` with its own return link; the invitation links to it before RSVP (or at the content end if no RSVP section exists).

Current eligible invitations: 003, 006, 064, 068, 069, 070, 071, 073, 076. The guest list is explicitly labelled as example data. No guest/table assignments have been invented. Search highlights matching tables and popup guests; no-match status is announced. Native dialog provides keyboard access, Escape, backdrop/close dismissal and focus return. Mobile popup dimensions are calculated from the card's actual width.

Run `node scripts/sync-premium-seating.mjs` to regenerate links/pages from package assignments without duplicating controls. If a package is downgraded, remove its generated button/page as part of that package change; this script only installs current Premium pages and deliberately does not delete existing files automatically.

Verified at 320/390/768/1440 px: ten tables, search, selected guest highlight, twelve popup seats, no modal overflow, keyboard activation/Escape/close, invitation link and return. All ten Premium helper URLs and buttons were checked; representative Standart invitations have no added button.

# QR generator

`qrcode.js` is qrcode-generator 2.0.4 by Kazuhiko Arase (MIT, see LICENSE-qrcode.txt). The 068 QR page generates PNGs locally with no external QR service, matching the page's actual origin. On production this points to the public 068 invitation; for phone testing open the QR page with the computer's reachable LAN address, not localhost. The static PNG remains a public-domain fallback.

072 was changed to Standart Plus (10,900 ֏) at the owner’s request; its generated Premium seating button/page were removed, leaving nine eligible invitations.
