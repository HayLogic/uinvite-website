# 077 · Մեր հարսանիքը

Standalone Armenian wedding invitation following the burgundy silk/ivory romantic editorial reference. Entry: portrait burgundy envelope following the owner’s latest reference, diagonal side folds and a red wax seal with gold LM lettering. Click/Enter/Space slowly opens the side flaps and reveals/focuses the invitation (about 5.3 seconds total); double opening is prevented and reduced-motion opening is immediate. Only the entry cover and its animation were changed; invitation content/names remain unchanged. CSS/script cache keys are updated.

Inside: full wedding portrait hero with names/date; love story and tilted keepsake portrait with wax seal/botanical illustration; burgundy details and dress palette; candlelit table photo; five-step timeline; garden venue; RSVP and portrait thank-you footer. Generated imagery is illustrative, not actual couple or venue photography. No inherited corporate/New Year text or festive snow/tree imagery. No music requested for 077 (earlier collection-wide request explicitly covered 067–076).

CONFIG in script.js: example names Մարիամ and Արամ, date 14 June 2027 at 16:00 Armenia (+04:00), example story/program. Names/date/time/program remain illustrative until supplied. Venue/city are placeholders; exact address/map are empty and hidden. Do not invent venue information. Data-note clearly marks example content. Explicit Armenian dates use Asia/Yerevan.

RSVP requires name/surname and yes/no attendance. With no rsvpEndpoint, form is explicitly a preview and sends/stores nothing. HTTP(S) endpoint receives fullName, attendance, comment (empty) JSON. Timeout, duplicate-submit guard and error/retry handling retained; never put secrets in browser code.

Local licensed Armenian font and imagery, HTML/CSS/vanilla JS, no build/dependencies. Relative asset paths support cPanel upload. From this folder: npx serve . -p 3000. Previous numbered invitations remain unchanged. One-time opacity reveals avoid flicker; keyboard focus, menu Escape/outside close and reduced-motion supported.

Verified at 390 and 1440 px: gold LM visible, invitation remains hidden during early opening, one activation, final reveal, keyboard access and reduced-motion mode; no runtime errors. Production build and SEO checks passed.
