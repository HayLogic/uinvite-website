# 077 · Լևոն և Մելինե

The owner supplied the names and wedding date: **7 August 2027**. Ceremony: **14:00, Սուրբ Գայանե եկեղեցի**. Reception: **17:30, Ադան Կոմպլեքս**. The supplied names/spelling are retained; no street addresses or coordinates were invented. Map links use Google Maps searches for those exact names.

Entry: portrait burgundy envelope, red wax seal with gold LM, and a slow side-flap opening (~5.3 seconds). Keyboard support, one activation and immediate reduced-motion opening remain intact.

Opening content order:

1. Full-screen portrait hero with curved photo edge, Լևոն և Մելինե and 07.08.2027 below.
2. Armenian invitation greeting and two unattributed aphorisms.
3. Ivory calendar card; the wedding week runs Monday 2 to Sunday 8 August, with Saturday 7 marked by a heart. Calendar derives from CONFIG.eventDate in Armenia (+04:00).
4. Separate ceremony/reception cards with times and map links.
5. Timeline: 10:00 groom's home; 12:00 bride's home; 14:00 ceremony; 17:30 wedding celebration.
6. Dress code: existing five wine/rose/taupe/ivory/sage swatches on a burgundy background.
7. Existing story, details and decorative photographs.
8. RSVP form, then closing portrait with full names and date.

The story remains example copy and is marked accordingly. Existing illustrative photography is retained; the website catalogue preview is recaptured from the updated invitation.

## Music

`assets/la-boheme.m4a` is the owner's uploaded **La boheme music.m4a** (original file, approximately 4:15). Playback is requested only inside the user's envelope click, at 35% volume, looping. The accessible toggle allows pause/resume and reflects actual playback; a rejected play request is handled. No automatic playback before interaction. Mobile/desktop playback tested in Chromium.

## RSVP

`CONFIG.rsvpEndpoint` is still empty: the form explicitly reports preview mode and sends/stores nothing. Name/surname and attendance validation, duplicate-submit prevention and the existing optional HTTP(S) JSON endpoint integration are preserved. Configure a real endpoint before collecting responses; do not put secrets in browser code.

## Verification

Production build and SEO check; 390/1440 px checks for names/date, heart on Saturday 7 August 2027, section order, two map links, four timeline times, five dress colours, no overflow or runtime errors; real supplied audio play/pause/resume after interaction; final RSVP and closing names; truthful preview form behavior. Original slow envelope, keyboard and reduced-motion behavior retained. Only 077 and its catalogue image are updated; no live deployment.
