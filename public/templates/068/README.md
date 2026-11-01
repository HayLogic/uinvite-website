# Հրավիրատոմս 068 — HayLogic Line Day

Ամբողջական ինքնուրույն տարբերակ՝ բորդո թավշյա ծրար, ոսկեգույն կնիք, անիմացիոն տոնածառ, երաժշտություն, օրացույց, ծրագիր, դրես կոդ, նվերներ և հաստատման ձև։ Սա պահոցի արմատում պահպանված 068-ի նույն էջի ֆայլերի պատճենն է՝ առանց տվյալների կամ ձևավորման փոփոխության։

Տվյալները՝ HayLogic Line Day, 18․12․2026, 18։00 Հայաստանի ժամանակով, Ադանա Կոմպլեքս։ Բոլոր փոփոխելի տվյալները `script.js`-ի սկզբի `CONFIG`-ում են։ Ռեստորանի իրական լուսանկար/ճշգրիտ հասցե դեռ չկան, քարտեզը բացում է անվան որոնումը։ Իրական RSVP endpoint դեռ միացված չէ․ ցուցադրական ձևը չի ուղարկում կամ պահպանում պատասխանները։

## Գործարկում

Այս պանակում՝ `npx serve . -p 3000` կամ `python3 -m http.server 8000`։ Կարելի է նաև անմիջապես բացել `index.html`-ը։ Պահոցի արմատից սերվեր գործարկելիս ուղին է `/invitations/068/`։

cPanel-ում վերբեռնեք այս պանակի `index.html`, `style.css`, `script.js` և `assets/`-ը document root-ում։ Build, npm install կամ մյուս հրավիրատոմսերի ֆայլերը պետք չեն։ Երաժշտությունը ներառված է՝ `assets/music.mp3`։

Հին արմատային 068 պատճենը պահպանված է։ Հետագա 068-ի աշխատանքի համար օգտագործեք այս համարակալված պանակը։


## QR sharing (latest update)

The final section links to `qr.html`, an invitation-styled burgundy/gold utility page. `assets/invitation-qr.png` is a real QR code with the fixed payload `https://uinvite.am/templates/068/index.html`, opening this standalone invitation rather than the catalogue. Dark wine modules on an ivory quiet zone keep scanning contrast. The page supports PNG download, clipboard copy when available and native file sharing when supported; nothing is sent without a visitor action. The public domain is intentionally encoded, never localhost. Publication of new helper files still requires the owner's normal deployment; local testing alone does not publish them.

Verified at 390/1440 px: final section, direct QR page, loaded image, download filename and correct invitation return. QR decoding of both the source PNG and rendered mobile page matches the exact target. Native file sharing tested with a mock (no actual messages sent). TypeScript, build and SEO checks pass.

Seating-plan button/page are pending the owner's promised reference; no table numbers or guest assignments have been invented.
