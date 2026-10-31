import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "uInvite — Էլեկտրոնային հրավիրատոմսեր" },
      { name: "description", content: "Ստեղծեք գեղեցիկ էլեկտրոնային հրավիրատոմսեր հարսանիքի, նշանադրության, կնունքի, ծննդյան և այլ առիթների համար։" },
      { property: "og:title", content: "uInvite — Էլեկտրոնային հրավիրատոմսեր" },
      { property: "og:description", content: "Գեղեցիկ էլեկտրոնային հրավիրատոմսեր ցանկացած առիթի համար։" },
    ],
  }),
  component: Index,
});

import { useEffect, useState } from "react";
import logoUrl from "@/assets/logo-full.png";
import weddingBg from "@/assets/wedding-bg.jpg";
import silkBgAsset from "@/assets/silk-bg.jpg.asset.json";
const silkBg = silkBgAsset.url;
import {
  templates as TPL_DATA,
  categoryLabels as TPL_CAT_LABELS,
  tierLabels as TPL_TIER_LABELS,
  tierPrices as TPL_TIER_PRICES,
  WHATSAPP_URL as TPL_WA,
  type TemplateCategory as TplCat,
} from "@/data/templates";
import {
  Heart, Gem, Cake, Flower2, Bird, PartyPopper, Building2, Sparkles,
  Send, Eye, ShoppingBag, Zap, Palette, Smartphone, MessageCircle,
  Star, Check, PenTool, Play, Link2, Globe2, MapPin, Users, X, Calendar, Wallet,
  ClipboardList, Upload, CreditCard, Info, Lock, Phone,
  ChevronDown, Crown, Tag, Gift,
} from "lucide-react";

const CATEGORIES = [
  { id: "wedding", label: "Հարսանիք" },
  { id: "engagement", label: "Նշանադրություն" },
  { id: "baptism", label: "Կնունք" },
  { id: "birthday", label: "Ծնունդ" },
  { id: "childrens", label: "Մանկական" },
  { id: "other", label: "Այլ" },
  { id: "commercial", label: "Կոմերցիոն" },
];

const TEMPLATES = [
  { id: 1, code: "001", price: "4,900֏", category: "wedding", title: "Սև և սպիտակ", desc: "Էլեգանտ սև-սպիտակ ձևանմուշ՝ նուրբ տիպոգրաֆիայով։", Icon: Heart, theme: "dark", names: "Անի & Արամ", script: "Wedding", date: "12 · 09 · 2026", tag: "top" as const },
  { id: 2, code: "002", price: "4,900֏", category: "wedding", title: "Սեր", desc: "Դասական էսթետիկա, որը միշտ արդիական է։", Icon: Gem, theme: "ivory", names: "Մարիամ & Դավիթ", script: "Save the date", date: "24 · 07 · 2026", tag: "new" as const },
  { id: 3, code: "003", price: "4,900֏", category: "birthday", title: "Ծննդյան օր", desc: "Նուրբ և օդային հրավեր՝ տոնական տրամադրությամբ։", Icon: Cake, theme: "blush", names: "Նարեի 5-ամյակը", script: "Birthday", date: "03 · 06 · 2026", tag: "top" as const },
  { id: 4, code: "004", price: "7,900֏", category: "engagement", title: "Նշանադրություն", desc: "Ռոմանտիկ ձևավորում՝ ձեր կարևոր օրվա համար։", Icon: Flower2, theme: "rose", names: "Լիլիթ & Տիգրան", script: "Engagement", date: "18 · 05 · 2026", tag: "new" as const },
  { id: 5, code: "005", price: "4,900֏", category: "christening", title: "Կնունք", desc: "Հոգևոր և լուսավոր ձևանմուշ սուրբ արարողության համար։", Icon: Bird, theme: "ivory", names: "Արենի կնունքը", script: "Baptism", date: "07 · 04 · 2026" },
  { id: 6, code: "006", price: "4,900֏", category: "kids", title: "Մանկական տոն", desc: "Վառ ու զվարճալի դիզայն փոքրիկների համար։", Icon: PartyPopper, theme: "mint", names: "Մայայի 3-ամյակը", script: "Party Time", date: "21 · 08 · 2026", tag: "new" as const },
  { id: 7, code: "007", price: "7,900֏", category: "commercial", title: "Կորպորատիվ", desc: "Մինիմալիստական ձևանմուշ բիզնես միջոցառումների համար։", Icon: Building2, theme: "dark", names: "Brand Launch", script: "You're Invited", date: "15 · 10 · 2026" },
  { id: 8, code: "008", price: "7,900֏", category: "other", title: "Հոբելյան", desc: "Հատուկ առիթի համար ստեղծված հրավիրատոմս։", Icon: Sparkles, theme: "blush", names: "25-ամյակ", script: "Anniversary", date: "30 · 11 · 2026", tag: "top" as const },
];

function Index() {
  return <IndexInner />;
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`ui-faq-item ${open ? "open" : ""}`}>
      <button className="ui-faq-q" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span>{q}</span>
        <ChevronDown size={20} strokeWidth={2} />
      </button>
      <div className="ui-faq-a"><p>{a}</p></div>
    </div>
  );
}

type Tpl = typeof TEMPLATES[number];

function WebInviteScreen({ screen, tpl }: { screen: "cover" | "schedule" | "map" | "rsvp"; tpl: Tpl }) {
  const Theme = tpl.theme;
  return (
    <div className={`ui-webinvite ui-invite-${Theme}`}>
      <div className="ui-webinvite-bar">
        <span /><span /><span />
        <em>uinvite.am/{tpl.script.toLowerCase().replace(/\s+/g, "-")}</em>
      </div>

      {screen === "cover" && (
        <div className="ui-webinvite-scroll">
          <div className="ui-wi-hero">
            <tpl.Icon size={22} strokeWidth={1.3} />
            <span className="ui-wi-script">{tpl.script}</span>
            <h4>{tpl.names}</h4>
            <div className="ui-wi-divider" />
            <span className="ui-wi-date">{tpl.date}</span>
          </div>
          <div className="ui-wi-section">
            <span className="ui-wi-eyebrow">Մինչև իրադարձությունը</span>
            <div className="ui-wi-countdown">
              {[["128","Օր"],["14","Ժամ"],["32","Րոպե"],["07","Վրկ"]].map(([n,l]) => (
                <div key={l}><strong>{n}</strong><span>{l}</span></div>
              ))}
            </div>
          </div>
          <div className="ui-wi-cta">Հաստատել ներկայությունը</div>
        </div>
      )}

      {screen === "schedule" && (
        <div className="ui-webinvite-scroll">
          <span className="ui-wi-eyebrow ui-wi-eyebrow-top">Օրվա ծրագիր</span>
          <ul className="ui-wi-timeline">
            {[
              { t: "15:30", k: "Հյուրերի դիմավորում" },
              { t: "16:00", k: "Պսակադրություն" },
              { t: "18:00", k: "Տոնական ընթրիք" },
              { t: "21:00", k: "Առաջին պար" },
              { t: "23:30", k: "Տորթ և շնորհավորանք" },
            ].map((e) => (
              <li key={e.t}>
                <span className="ui-wi-time">{e.t}</span>
                <span className="ui-wi-dot" />
                <span className="ui-wi-event">{e.k}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {screen === "map" && (
        <div className="ui-webinvite-scroll">
          <span className="ui-wi-eyebrow ui-wi-eyebrow-top">Վայր</span>
          <h4 className="ui-wi-place">Tsitsernakaberd Hall</h4>
          <p className="ui-wi-addr">Երևան, Սարյան 12</p>
          <div className="ui-wi-map">
            <svg viewBox="0 0 120 80" preserveAspectRatio="none" aria-hidden>
              <rect width="120" height="80" fill="currentColor" opacity=".06" />
              <path d="M0 40 Q30 20 60 35 T120 30" stroke="currentColor" strokeWidth="1.5" fill="none" opacity=".35" />
              <path d="M10 0 L20 80" stroke="currentColor" strokeWidth=".8" fill="none" opacity=".18" />
              <path d="M70 0 L80 80" stroke="currentColor" strokeWidth=".8" fill="none" opacity=".18" />
              <path d="M0 60 L120 55" stroke="currentColor" strokeWidth=".8" fill="none" opacity=".18" />
              <circle cx="62" cy="38" r="3.5" fill="currentColor" />
              <circle cx="62" cy="38" r="9" fill="currentColor" opacity=".18" />
            </svg>
            <span className="ui-wi-pin"><MapPin size={14} strokeWidth={2.2} /></span>
          </div>
          <div className="ui-wi-cta ui-wi-cta-ghost">Բացել քարտեզով</div>
        </div>
      )}

      {screen === "rsvp" && (
        <div className="ui-webinvite-scroll">
          <span className="ui-wi-eyebrow ui-wi-eyebrow-top">RSVP</span>
          <h4 className="ui-wi-place">Կլինե՞ք մեզ հետ</h4>
          <div className="ui-wi-field"><span>Անուն</span><em>Անի Հակոբյան</em></div>
          <div className="ui-wi-field"><span>Հյուրեր</span><em>2 հոգի</em></div>
          <div className="ui-wi-choices">
            <span className="ui-wi-chip active"><Check size={11} strokeWidth={3} /> Այո</span>
            <span className="ui-wi-chip">Ոչ</span>
            <span className="ui-wi-chip">Միգուցե</span>
          </div>
          <div className="ui-wi-cta">Ուղարկել պատասխանը</div>
        </div>
      )}
    </div>
  );
}

function IndexInner() {
  const [active, setActive] = useState<string>("all");
  return (
    <div className="ui-root" style={{ ["--ui-silk-bg" as string]: `url(${silkBg})` }}>
      <style>{styles}</style>

      <section id="home" className="ui-hero">
        <div className="ui-container ui-hero-grid">
          <div className="ui-hero-content">
            <span className="ui-eyebrow">Էլեկտրոնային հրավիրատոմսեր</span>
            <h1 className="ui-h1">Ժամանակակից վեբ հրավիրատոմսեր Ձեր կարևոր <span className="ui-accent">օրվա</span> համար</h1>
            <p className="ui-lead">
              RSVP, քարտեզ, հետհաշվարկ, լուսանկարներ և շատ ավելին՝ մեկ հղումով։
            </p>
            <div className="ui-hero-cta">
              <Link to="/templates" className="ui-btn ui-btn-ghost"><Eye size={16} /> Դիտել տեսականին</Link>
              <a href="#pricing" className="ui-btn ui-btn-primary"><ShoppingBag size={16} /> Պատվիրել հիմա</a>
            </div>
            <div className="ui-hero-stats">
              <div><strong>500+</strong><span>գոհ հաճախորդ</span></div>
              <div><strong>50+</strong><span>ձևանմուշ</span></div>
              <div><strong>48ժ</strong><span>պատրաստման ժամկետ</span></div>
            </div>
          </div>
          <div className="ui-hero-visual">
            <div className="ui-phone ui-phone-1">
              <div className="ui-invite ui-invite-1 ui-invite-video">
                <span className="ui-play-pulse"><Play size={14} fill="currentColor" /></span>
                <Flower2 className="ui-invite-emoji" size={28} strokeWidth={1.4} />
                <div className="ui-invite-script">Save the date</div>
                <div className="ui-invite-name">Անի &amp; Արամ</div>
                <div className="ui-invite-divider" />
                <div className="ui-invite-date">12 · 09 · 2026</div>
              </div>
            </div>
            <div className="ui-phone ui-phone-2">
              <div className="ui-invite ui-invite-2 ui-invite-video">
                <span className="ui-play-pulse"><Play size={14} fill="currentColor" /></span>
                <Gem className="ui-invite-emoji" size={28} strokeWidth={1.4} />
                <div className="ui-invite-script">Wedding</div>
                <div className="ui-invite-name">Մարիամ &amp; Դավիթ</div>
                <div className="ui-invite-divider" />
                <div className="ui-invite-date">24 · 07 · 2026</div>
              </div>
            </div>
            <div className="ui-phone ui-phone-3">
              <div className="ui-invite ui-invite-3 ui-invite-video">
                <span className="ui-play-pulse"><Play size={14} fill="currentColor" /></span>
                <Cake className="ui-invite-emoji" size={28} strokeWidth={1.4} />
                <div className="ui-invite-script">Birthday</div>
                <div className="ui-invite-name">Նարեի 5-ամյակը</div>
                <div className="ui-invite-divider" />
                <div className="ui-invite-date">03 · 06 · 2026</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="ui-section">
        <div className="ui-container">
          <div className="ui-section-head">
            <h2 className="ui-h2">Տեսականի</h2>
            <p className="ui-muted">Ընտրեք Ձեր առիթին համապատասխան ձևանմուշը</p>
          </div>

          <CatalogTemplates />
        </div>
      </section>

      <section id="pricing" className="ui-section ui-section-soft">
        <div className="ui-container">
          <div className="ui-section-head">
            <h2 className="ui-h2">Մեր փաթեթները</h2>
            <p className="ui-muted">Ընտրեք ձեզ հարմարը՝ պարզ ու թափանցիկ գներով</p>
          </div>
          <div className="ui-pricing">
               {[
            {
                name: "Start",
                Icon: Zap,
                price: "4,900֏",
                old: "6,000֏",
                badge: null,
                tier: "start" as const,
                catalogTier: "start" as const,
               
              },
              {
                name: "Plus",
                Icon: Star,
                price:  "6,900֏",
                old: "10,000֏",
                badge: null,
                tier: "start" as const,
                catalogTier: "plus" as const,
               
              },
              {
                name: "Premium",
                Icon: Gem,
                price: "9,900֏",
                old: "18,000֏",
                badge: "Ամենապահանջված",
                featured: true,
                tier: "premium" as const,
                catalogTier: "premium" as const,
                
              },
              {
                name: "Vip",
                Icon: Crown,
                price: "11,900֏",
                old: "25,000֏",
                badge: null,
                tier: "vip" as const,
                catalogTier: "vip" as const,
              
              },
            ].map((p) => (
              <div key={p.name} className={`ui-price-card ${p.featured ? "featured" : ""} ui-price-card-${p.tier}`}>
                {p.badge && (
                  <span className="ui-price-badge">
                    <Star size={12} strokeWidth={2.4} fill="currentColor" /> {p.badge}
                  </span>
                )}
                <div className={`ui-price-icon ui-price-icon-${p.tier}`}>
                  <p.Icon size={26} strokeWidth={1.8} />
                </div>
                <h3 className="ui-price-name">{p.name}</h3>
                <div className="ui-price-row">
                  <span className="ui-price-old">{p.old}</span>
                  <span className="ui-price-now">{p.price}</span>
                </div>
              
                <div className="ui-price-actions">
                  <Link
                    to="/templates" hash={`#tier-${p.tier}`}
                    className="ui-btn ui-btn-ghost ui-price-view-btn"
                  >
                    <Eye size={14} /> Դիտել տեսականին
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="ui-custom-card">
            <div className="ui-bg-photo" aria-hidden style={{ backgroundImage: `url(${weddingBg})` }} />
            <div className="ui-custom-card-body">
              <h3><PenTool size={20} strokeWidth={1.6} /> Անհատական դիզայն</h3>
              <p>Ամբողջովին ձեր ոճով ստեղծված եզակի հրավիրատոմս՝ առանց ձևանմուշների։</p>
            </div>
            <div className="ui-custom-price">
              <span>Սկսած</span>
              <strong>15,000֏-ից</strong>
              <a href="#order" className="ui-btn ui-btn-primary">Քննարկել</a>
            </div>
          </div>
        </div>
      </section>

      <section id="why" className="ui-section ui-section-soft">
        <div className="ui-container">
          <div className="ui-section-head">
            <h2 className="ui-h2">Ինչու՞ ընտրել uInvite-ը</h2>
            <p className="ui-muted">Ժամանակակից վեբ հրավիրատոմս՝ ամեն ինչ մեկ հղումով</p>
          </div>
          <div className="ui-features">
            {[
              { I: Zap, t: "Արագ պատրաստում", d: "Պատրաստում ենք Ձեր վեբ հրավիրատոմսը ընդամենը 2 աշխատանքային օրվա ընթացքում։" },
              { I: Link2, t: "Ամեն ինչ մեկ հղումով", d: "Հրավեր, քարտեզ, RSVP, հետհաշվարկ և լուսանկարներ՝ մեկ հարմար հղման մեջ։" },
              { I: Globe2, t: "Հարմար բոլոր հյուրերի համար", d: "Հղումը հեշտությամբ ուղարկեք WhatsApp-ով, Messenger-ով, Instagram-ով կամ SMS-ով։" },
              { I: Palette, t: "Ժամանակակից դիզայն", d: "Նորաոճ, հարմարավետ և բջջային սարքերի համար օպտիմիզացված հրավիրատոմսեր։" },
            ].map((f) => (
              <div key={f.t} className="ui-feature">
                <div className="ui-feature-icon"><f.I size={26} strokeWidth={1.5} /></div>
                <h4>{f.t}</h4>
                <p>{f.d}</p>
              </div>
            ))}
          </div>

          <div className="ui-why-list">
            <div className="ui-why-head">
              <Sparkles size={18} className="ui-why-spark" />
              <h3>Ինչու՞ uInvite</h3>
            </div>
            <ul>
              {[
                { I: Wallet, t: "Խնայեք ժամանակ և գումար", d: "Այլևս թղթե հրավիրատոմսերի կարիք չկա։" },
                { I: Users, t: "Իմացեք հյուրերի պատասխանը նախապես", d: "RSVP համակարգի շնորհիվ վերահսկեք ներկայությունը։" },
                { I: MapPin, t: "Բոլոր մանրամասները մեկ տեղում", d: "Քարտեզ, ժամ, հասցե, լուսանկարներ և ավելին։" },
                { I: Sparkles, t: "Զարմացրեք Ձեր հյուրերին", d: "Գեղեցիկ և ժամանակակից վեբ հրավիրատոմսով։" },
              ].map((b) => (
                <li key={b.t}>
                  <span className="ui-why-check"><Check size={16} strokeWidth={2.6} /></span>
                  <div>
                    <strong>{b.t}</strong>
                    <p>{b.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="rsvp" className="ui-section ui-cta ui-rsvp-band">
        <div className="ui-bg-photo" aria-hidden style={{ backgroundImage: `url(${weddingBg})` }} />
        <div className="ui-container ui-rsvp-grid">
          <div className="ui-rsvp-copy">
            <span className="ui-eyebrow">RSVP</span>
            <h2 className="ui-h2" style={{ color: "#fff" }}>Հյուրերի մասնակցության հաստատում</h2>
            <p>Հյուրերը մեկ սեղմումով հաստատում կամ մերժում են մասնակցությունը, իսկ դուք տեսնում եք բոլոր պատասխանները մեկ տեղում։</p>
            <ul className="ui-rsvp-bullets">
              <li><Check size={16} strokeWidth={2.6} /> Մեկ սեղմումով պատասխան</li>
              <li><Check size={16} strokeWidth={2.6} /> Հյուրերի քանակը՝ իրական ժամանակում</li>
              <li><Check size={16} strokeWidth={2.6} /> Ավտոմատ ցուցակ՝ ձեզ համար</li>
            </ul>
          </div>
          <div className="ui-rsvp-card">
            <div className="ui-rsvp-card-head">
              <ClipboardList size={18} />
              <strong>RSVP հաշվարկ</strong>
              <span>Live</span>
            </div>
            <div className="ui-rsvp-stats">
              <div><strong>87</strong><span>Հաստատել են</span></div>
              <div><strong>9</strong><span>Մերժել են</span></div>
              <div><strong>14</strong><span>Միգուցե</span></div>
            </div>
            <div className="ui-rsvp-list">
              {[
                { n: "Անի Հակոբյան", g: "+1", s: "yes" },
                { n: "Գոռ Մարտիրոսյան", g: "+2", s: "yes" },
                { n: "Լիլիթ Սարգսյան", g: "—", s: "maybe" },
                { n: "Արամ Պետրոսյան", g: "+1", s: "no" },
              ].map((r) => (
                <div key={r.n} className="ui-rsvp-row">
                  <span className="ui-rsvp-name">{r.n}</span>
                  <span className="ui-rsvp-guests">{r.g}</span>
                  <span className={`ui-rsvp-pill ${r.s}`}>
                    {r.s === "yes" && <><Check size={11} strokeWidth={3} /> Այո</>}
                    {r.s === "no" && "Ոչ"}
                    {r.s === "maybe" && "Միգուցե"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="ui-section ui-section-soft">
        <div className="ui-container">
          <div className="ui-section-head">
            <h2 className="ui-h2">Հաճախ տրվող հարցեր</h2>
            <p className="ui-muted">Ամենից շատ տրվող հարցերի պատասխանները՝ մեկ տեղում</p>
          </div>
          <div className="ui-faq">
            {[
              { q: "Ինչ արժեքից են սկսվում հրավիրատոմսերը։", a: "Մեր մոտ աշնանային զեղչեր են՝ հրավիրատոմսերն արդեն սկսվում են 4,900֏-ից։" },
              { q: "Որքա՞ն ժամանակում է պատրաստվում հրավիրատոմսը։", a: "Հրավիրատոմսը պատրաստվում է 48 ժամվա ընթացքում՝ պատվերը հաստատելուց հետո։" },
              { q: "Արդյո՞ք կարող ենք փոխել երաժշտությունը կամ ավելացնել։", a: "Start և Plus փաթեթներում երաժշտություն ավելացնելը կամ փոփոխելը արժե 1000֏։ Premium և Vip փաթեթի դեպքում կարող եք փոփոխել անվճար։" },
              { q: "Արդյո՞ք կարող եմ տեքստերը փոփոխել։", a: "Այո, տեքստերը խմբագրում ենք անվճար՝ ձեր ցանկացած ձևով։" },
              { q: "Կարո՞ղ ենք ավելացնել dress code-ի հատված։", a: "Այո, կարող եք ավելացնել՝ 500֏։" },
                            { q: "Ցանկանում եմ վեբ հրավիրատոմս պատվիրել․ ինչպե՞ս պատվիրեմ։", a: "Մեր կայքում ընտրում եք Ձեզ դուր եկած հրավիրատոմսի օրինակը, այնուհետև ներքևում սեղմում եք «Պատվիրել» կոճակը և լրացնում պատվերի անհրաժեշտ տվյալները։ Կարող եք նաև ընտրել «Պատվիրել WhatsApp-ով» կոճակը և կապ հաստատել մեզ հետ WhatsApp-ի միջոցով։ " },

              { q: "Կարո՞ղ ենք փոփոխել գույները։", a: "Եթե արդեն ընտրված է պատրաստի ձևանմուշ, գունային փոփոխություն չենք կատարում։" },
              { q: "Կարո՞ղ ենք փոխել լուսանկարների քանակը։", a: "Այո, յուրաքանչյուր լրացուցիչ լուսանկար՝ +1000֏։" },
              { q: "Հյուրերի մասնակցության հատվածը հանելու դեպքում գինը փոխվու՞մ է։", a: "Ոչ, արժեքը չի փոխվում։" },
              { q: "Արժեքը մեկ հրավիրատոմսի՞ համար է։", a: "Այո, արժեքը մեկ հրավիրատոմսի համար է, սակայն այն ուղարկում եք ձեր բոլոր հյուրերին։" },
              { q: "Ինչպե՞ս է աշխատում RSVP համակարգը։", a: "Հյուրերը մեկ սեղմումով հաստատում կամ մերժում են մասնակցությունը, իսկ դուք ստանում եք բոլոր պատասխանները ձեր անձնական էջում՝ իրական ժամանակում։" },
              { q: "Ինչքա՞ն ժամանակ է ակտիվ հղումը։", a: "Հղումը ակտիվ է մինչև միջոցառման օրվանից 2 ամիս անց, որից հետո այն ապաակտիվանում է։" },
              { q: "Կարո՞ղ եմ փոփոխություններ կատարել պատվիրելուց հետո։", a: "Այո, մինչև վերջնական հաստատումը կարող եք ազատ կերպով խնդրել փոփոխություններ՝ տեքստերի և լուսանկարների սահմանափակ քանակությամբ։" },
              { q: "Ինչպե՞ս կարող եմ վճարել։", a: "Վճարումը կատարվում է բանկային փոխանցմամբ։ Աշխատանքը սկսում ենք վճարման հաստատումից անմիջապես հետո։" },
              { q: "Կարո՞ղ եմ ուղարկել հղումը WhatsApp-ով կամ Instagram-ով։", a: "Այո, հղումը հեշտությամբ կարող եք ուղարկել WhatsApp-ով, Messenger-ով, Instagram-ով, Telegram-ով կամ SMS-ով։" },
              { q: "Իսկ եթե միջոցառումը հետաձգվում է։", a: "Դա խնդիր չէ՝ մենք անվճար փոխում ենք ամսաթիվը հրավիրատոմսի վրա, և հղումը մնում է ակտիվ։" },

            ].map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      <section id="steps" className="ui-section ui-cta">
        <div className="ui-bg-photo" aria-hidden style={{ backgroundImage: `url(${weddingBg})` }} />
        <div className="ui-container">
          <div className="ui-section-head">
            <h2 className="ui-h2" style={{ color: "#fff" }}>📋 Աշխատանքի փուլերը</h2>
            <p style={{ color: "rgba(255,255,255,.7)" }}>Ընդամենը 6 պարզ քայլ՝ պատրաստի վեբ հրավիրատոմս ստանալու համար</p>
          </div>
          <div className="ui-steps">
            {[
              { I: Eye, t: "Ընտրեք դիզայնը", d: "Դիտեք մեր պատրաստի օրինակները և ընտրեք այն շաբլոնը, որը լավագույնս համապատասխանում է Ձեր միջոցառմանը։" },
              { I: Upload, t: "Ուղարկեք անհրաժեշտ տվյալները", d: "Մեզ տրամադրեք միջոցառման տվյալները, տեքստերը, լուսանկարները և այլ անհրաժեշտ տեղեկությունները հրավիրատոմսի պատրաստման համար։" },
              { I: CreditCard, t: "Հաստատեք պատվերը", d: "Պատվերը հաստատվում է վճարումից հետո, որից անմիջապես սկսում ենք աշխատանքը։" },
              { I: PenTool, t: "Պատրաստում ենք հրավիրատոմսը", d: "Մեր թիմը ձևավորում և պատրաստում է Ձեր վեբ հրավիրատոմսը՝ ընտրված փաթեթի պայմաններին համապատասխան։" },
              { I: Link2, t: "Ստացեք պատրաստի հղումը", d: "Աշխատանքի ավարտից հետո Ձեզ տրամադրում ենք պատրաստի հղումը, որը կարող եք հեշտությամբ տարածել WhatsApp, Messenger, Instagram, Telegram կամ SMS-ի միջոցով։" },
              { I: Users, t: "Հյուրերի պատասխանների կառավարում", d: "RSVP համակարգի միջոցով կարող եք հետևել հյուրերի մասնակցության հաստատումներին և ստանալ պատասխանները մեկ վայրում։" },
            ].map((s, i) => (
              <div key={s.t} className="ui-step">
                <span className="ui-step-num">{i + 1}</span>
                <div className="ui-step-icon"><s.I size={22} strokeWidth={1.6} /></div>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
          <div className="ui-info-note">
            <Info size={18} />
            <div>
              <strong>ℹ️ Կարևոր տեղեկություն</strong>
              <p>Վեբ հրավիրատոմսի հղումը մնում է ակտիվ մինչև միջոցառման օրվանից 2 ամիս անց, որից հետո հեռացվում է համակարգից։</p>
            </div>
          </div>
        </div>
      </section>

      <section id="order" className="ui-section ui-cta">
        <div className="ui-container ui-cta-box">
          <h2 className="ui-h2">Պատրա՞ստ եք ստեղծելու ձեր հրավիրատոմսը</h2>
          <p>Գրեք մեզ, և մենք կօգնենք ընտրել կատարյալ տարբերակը։</p>
          <a href="https://wa.me/37477198238" className="ui-btn ui-btn-primary ui-btn-lg"><Send size={18} /> Պատվիրել հրավեր</a>
          <div className="ui-privacy-note">
            <Lock size={14} />
            <span>Ձեր տվյալներն օգտագործվում են բացառապես հրավիրատոմսի պատրաստման նպատակով և չեն տրամադրվում երրորդ կողմերի</span>
          </div>
        </div>
      </section>

      <footer className="ui-footer">
        <div className="ui-container ui-footer-grid">
          <div>
            <div className="ui-logo">
              <img src={logoUrl} alt="uInvite" className="ui-logo-img ui-logo-img-lg" />
            </div>
            <p className="ui-muted">Էլեկտրոնային հրավիրատոմսեր ամեն առիթի համար։</p>
          </div>
          <div>
            <h5>Կատեգորիաներ</h5>
            {CATEGORIES.map((c) => (
              <a key={c.id} href="#catalog" onClick={() => setActive(c.id)}>{c.label}</a>
            ))}
          </div>
          <div>
            <h5>Կապ</h5>
            <a href="mailto:info@uinvite.am">info@uinvite.am</a>
            <a href="tel:+37477198238">+374 77 198 238</a>
          </div>
        </div>
        <div className="ui-footer-socials">
          <a href="https://www.facebook.com/profile.php?id=61588385732686" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://www.instagram.com/uinvite.am/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
          </a>
          <a href="https://t.me/+37477198238" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
          </a>
          <a href="https://wa.me/37477198238" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        </div>
        <div className="ui-footer-privacy">
          <Lock size={14} /> Ձեր տվյալներն օգտագործվում են բացառապես հրավիրատոմսի պատրաստման նպատակով և չեն տրամադրվում երրորդ կողմերի։
        </div>
        <div className="ui-copyright">
  <p>
    UInvite-ի բոլոր ձևանմուշները և դրանց ստեղծագործական լուծումները հեղինակային աշխատանք են։
    Առանց թույլտվության դրանց ամբողջական կամ մասնակի կրկնօրինակումը, վերարտադրումը կամ օգտագործումն արգելվում է։
  </p>
</div>
        <div className="ui-footer-bottom">© {new Date().getFullYear()} uInvite. Բոլոր իրավունքները պաշտպանված են։</div>
      </footer>

      <a href="https://wa.me/37477198238" className="ui-whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <span className="ui-whatsapp-phone">+374 77 198 238</span>
      </a>

    </div>
  );
}

const styles = `
:root {
  --ui-primary: #f6f7f8;
  --ui-primary-2: #eeeff1;
  --ui-accent: #3193e9;
  --ui-accent-soft: rgba(49,147,233,0.10);
  --ui-accent-soft-strong: rgba(49,147,233,0.18);
  --ui-black: #0f0f10;
  --ui-white: #ffffff;
  --ui-text: #1a1a1c;
  --ui-muted: #6b6f76;
  --ui-border: #e6e7ea;
}
.ui-root {
  font-family: 'Inter', -apple-system, system-ui, sans-serif;
  color: var(--ui-text);
  line-height: 1.5;
  background-color: var(--ui-white);
  background-image:
    linear-gradient(rgba(255,255,255,0.78), rgba(255,255,255,0.78)),
    var(--ui-silk-bg);
  background-size: auto, 1600px auto;
  background-position: center, top center;
  background-repeat: repeat, repeat-y;
  background-attachment: fixed, fixed;
}
.ui-root * { box-sizing: border-box; }
.ui-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

.ui-header { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,0.85); backdrop-filter: blur(10px); border-bottom: 1px solid var(--ui-border); }
.ui-nav { display: flex; align-items: center; justify-content: space-between; height: 72px; gap: 24px; }
.ui-logo { display: inline-flex; align-items: center; gap: 10px; font-size: 22px; font-weight: 800; color: var(--ui-black); text-decoration: none; letter-spacing: -0.02em; }
.ui-logo-img { height: 44px; width: auto; object-fit: contain; display: block; }
.ui-logo-img-lg { height: 60px; }
.ui-menu { display: flex; align-items: center; gap: 28px; }
.ui-menu a { color: var(--ui-black); text-decoration: none; font-size: 15px; font-weight: 500; }
.ui-menu a:hover { color: var(--ui-accent); }
.ui-burger { display: none; background: none; border: 0; flex-direction: column; gap: 5px; cursor: pointer; padding: 8px; }
.ui-burger span { width: 24px; height: 2px; background: var(--ui-black); }

.ui-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 22px; border-radius: 999px; font-weight: 600; font-size: 15px; text-decoration: none; cursor: pointer; border: 1px solid transparent; transition: all .2s; }
.ui-btn-primary { background: var(--ui-black); color: var(--ui-white); }
.ui-btn-primary:hover { background: var(--ui-accent); }
.ui-btn-ghost { background: var(--ui-white); color: var(--ui-black); border-color: var(--ui-border); }
.ui-btn-ghost:hover { background: var(--ui-primary); border-color: var(--ui-accent); }
.ui-btn-lg { padding: 16px 32px; font-size: 16px; }

.ui-hero { padding: 80px 0 100px; overflow: hidden; position: relative; }
.ui-hero-grid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 60px; align-items: center; }
.ui-eyebrow { display: inline-block; background: var(--ui-accent-soft); border: 1px solid transparent; color: var(--ui-accent); padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: 600; margin-bottom: 20px; }
.ui-h1 { font-size: clamp(36px, 5vw, 60px); line-height: 1.05; margin: 0 0 20px; letter-spacing: -0.03em; font-weight: 800; }
.ui-accent { color: var(--ui-accent); }
.ui-lead { font-size: 18px; color: var(--ui-muted); margin: 0 0 32px; max-width: 540px; }
.ui-hero-cta { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }
.ui-hero-stats { display: flex; gap: 40px; flex-wrap: wrap; }
.ui-hero-stats > div { display: flex; flex-direction: column; }
.ui-hero-stats strong { font-size: 28px; font-weight: 800; color: var(--ui-black); }
.ui-hero-stats span { font-size: 13px; color: var(--ui-muted); }

.ui-hero-visual { position: relative; height: 460px; }
.ui-phone { position: absolute; width: 210px; height: 410px; border-radius: 38px; background: var(--ui-white); border: 8px solid #0f0f10; padding: 14px; box-shadow: 0 40px 80px -25px rgba(15,15,16,.30); overflow: hidden; }
.ui-phone::after { content: ""; position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 60px; height: 5px; background: #0f0f10; border-radius: 999px; }
.ui-invite { width: 100%; height: 100%; border-radius: 22px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 30px 18px; text-align: center; gap: 10px; position: relative; overflow: hidden; }
.ui-invite::before { content: ""; position: absolute; inset: 8px; border: 1px solid currentColor; border-radius: 16px; opacity: .35; }
.ui-invite .ui-invite-mono { font-family: 'Cormorant Garamond', Georgia, serif; }
.ui-invite-script { font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-size: 14px; letter-spacing: .15em; text-transform: uppercase; opacity: .7; }
.ui-invite-name { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 26px; line-height: 1.1; font-weight: 500; }
.ui-invite-divider { width: 40px; height: 1px; background: currentColor; opacity: .5; margin: 6px 0; }
.ui-invite-date { font-size: 11px; letter-spacing: .3em; text-transform: uppercase; opacity: .75; }
.ui-invite-emoji { margin-bottom: 4px; opacity: .9; }
.ui-invite-1 { background: linear-gradient(160deg, #ffffff, #f1f2f4); color: #1a1a1c; }
.ui-invite-2 { background: linear-gradient(160deg, #0f0f10, #2a2b2e); color: #f6f7f8; }
.ui-invite-3 { background: linear-gradient(160deg, #fafbfc, #eef4fb); color: #1a1a1c; }
.ui-invite-ivory { background: linear-gradient(160deg, #fafaf6, #eee9dc); color: #2a2620; }
.ui-invite-dark  { background: linear-gradient(160deg, #0f0f10, #2a2b2e); color: #f6f7f8; }
.ui-invite-blush { background: linear-gradient(160deg, #fdf6f1, #f7e2d6); color: #5a3326; }
.ui-invite-rose  { background: linear-gradient(160deg, #fff5f7, #f3d6df); color: #5a2434; }
.ui-invite-mint  { background: linear-gradient(160deg, #f3faf6, #d8eee2); color: #214336; }
.ui-invite-video { position: relative; }
.ui-play-pulse { position: absolute; top: 14px; right: 14px; width: 26px; height: 26px; border-radius: 999px; background: rgba(255,255,255,.85); color: var(--ui-black); display: inline-flex; align-items: center; justify-content: center; backdrop-filter: blur(6px); animation: ui-pulse 2s ease-out infinite; }
@keyframes ui-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,.6); }
  50% { box-shadow: 0 0 0 10px rgba(255,255,255,0); }
}
.ui-phone-1 { left: 0; top: 50px; transform: rotate(-9deg); }
.ui-phone-2 { left: 50%; top: 0; transform: translateX(-50%) rotate(2deg); z-index: 2; }
.ui-phone-3 { right: 0; top: 60px; transform: rotate(9deg); }

.ui-section { padding: 90px 0; }
.ui-section-soft { background: var(--ui-primary); }
.ui-section-head { text-align: center; margin-bottom: 50px; }
.ui-h2 { font-size: clamp(28px, 4vw, 44px); margin: 0 0 12px; letter-spacing: -0.02em; font-weight: 800; }
.ui-muted { color: var(--ui-muted); margin: 0; }

.ui-tabs { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 40px; }
.ui-tab { padding: 10px 20px; border-radius: 999px; border: 1px solid var(--ui-border); background: var(--ui-white); color: var(--ui-black); font-weight: 500; cursor: pointer; font-size: 14px; transition: all .2s; }
.ui-tab:hover { border-color: var(--ui-accent); color: var(--ui-accent); }
.ui-tab.active { background: var(--ui-black); color: var(--ui-white); border-color: var(--ui-black); }

.ui-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
.ui-card { background: var(--ui-white); border: 1px solid var(--ui-border); border-radius: 20px; overflow: hidden; transition: all .25s; }
.ui-card:hover { transform: translateY(-4px); box-shadow: 0 24px 50px -20px rgba(15,15,16,.18); border-color: #d6d7da; }
.ui-card-media { position: relative; height: 240px; background: linear-gradient(135deg, #f4f5f7, #ffffff); display: flex; align-items: center; justify-content: center; }
.ui-card-stage { position: relative; height: 360px; background: linear-gradient(170deg, #f4f5f7 0%, #ffffff 60%, #f4f5f7 100%); display: flex; align-items: center; justify-content: center; overflow: hidden; }
.ui-card-stage::before { content: ""; position: absolute; inset: -20%; background: radial-gradient(circle at 50% 60%, var(--ui-accent-soft), transparent 60%); pointer-events: none; }
.ui-card-phone, .ui-card-phone-side { position: absolute; border-radius: 26px; background: #fff; border: 6px solid #0f0f10; box-shadow: 0 20px 40px -18px rgba(15,15,16,.45); overflow: hidden; }
.ui-card-phone { width: 150px; height: 290px; padding: 10px; z-index: 3; top: 50%; left: 50%; transform: translate(-50%, -50%); }
.ui-card-phone::after { content: ""; position: absolute; top: 8px; left: 50%; transform: translateX(-50%); width: 44px; height: 4px; background: #0f0f10; border-radius: 999px; z-index: 2; }
.ui-card-phone-side { width: 110px; height: 220px; padding: 8px; opacity: .55; filter: blur(.4px); z-index: 1; top: 50%; }
.ui-card-phone-left  { left: 10px;  transform: translateY(-50%) rotate(-10deg); }
.ui-card-phone-right { right: 10px; transform: translateY(-50%) rotate(10deg); }
.ui-card:hover .ui-card-phone { transform: translate(-50%, -52%) scale(1.03); }
.ui-card-phone, .ui-card-phone-side { transition: transform .3s ease; }
.ui-card-stage .ui-invite { padding: 18px 12px; gap: 6px; border-radius: 18px; }
.ui-card-stage .ui-invite-name { font-size: 18px; }
.ui-card-stage .ui-invite-script { font-size: 10px; }
.ui-card-stage .ui-invite-date { font-size: 9px; letter-spacing: .25em; }
.ui-card-stage .ui-invite::before { inset: 6px; border-radius: 14px; }

.ui-badge-pill { z-index: 5; }
.ui-hit-badge { position: absolute; top: 14px; right: 14px; z-index: 5; background: #e63946; color: #fff; font-size: 11px; font-weight: 800; padding: 6px 12px; border-radius: 999px; letter-spacing: .12em; box-shadow: 0 8px 16px -4px rgba(230,57,70,.45); }
.ui-tag-badge { position: absolute; top: 14px; right: 14px; z-index: 5; font-size: 10.5px; font-weight: 800; padding: 6px 11px; border-radius: 999px; letter-spacing: .14em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 5px; }
.ui-tag-top { background: #0f0f10; color: #fff; box-shadow: 0 8px 16px -4px rgba(15,15,16,.35); }
.ui-tag-top svg { color: #f7c948; }
.ui-tag-new { background: var(--ui-accent); color: #fff; box-shadow: 0 8px 16px -4px rgba(49,147,233,.45); }

.ui-media-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
.ui-media-card { background: var(--ui-white); border: 1px solid var(--ui-border); border-radius: 22px; overflow: hidden; display: flex; flex-direction: column; transition: all .25s; }
.ui-media-card:hover { transform: translateY(-4px); box-shadow: 0 24px 50px -20px rgba(15,15,16,.18); }
.ui-media-card.featured { border: 1px solid var(--ui-accent); box-shadow: 0 24px 60px -20px rgba(49,147,233,.30); }
.ui-media-preview { position: relative; aspect-ratio: 4 / 3; overflow: hidden; background: #f1f2f4; }
.ui-media-preview img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
.ui-media-card:hover .ui-media-preview img { transform: scale(1.04); }
.ui-media-kind { position: absolute; top: 12px; left: 12px; background: rgba(15,15,16,.78); color: #fff; backdrop-filter: blur(6px); font-size: 10.5px; font-weight: 700; padding: 5px 10px; border-radius: 999px; letter-spacing: .14em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 5px; }
.ui-media-play { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60px; height: 60px; border-radius: 999px; background: rgba(255,255,255,.92); color: var(--ui-black); display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 12px 30px -8px rgba(0,0,0,.4); animation: ui-pulse 2.4s ease-out infinite; }
.ui-media-body { padding: 24px; display: flex; flex-direction: column; flex: 1; }
.ui-media-head { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; margin-bottom: 10px; }
.ui-media-head h3 { margin: 0; font-size: 18px; font-weight: 800; }
.ui-media-price { font-size: 22px; font-weight: 800; color: var(--ui-accent); letter-spacing: -0.01em; }
.ui-media-body > p { margin: 0 0 16px; color: var(--ui-muted); font-size: 14px; line-height: 1.5; }
.ui-media-body .ui-price-list { margin-bottom: 22px; }
.ui-media-body .ui-btn { align-self: stretch; }
.ui-badge { position: absolute; top: 14px; left: 14px; background: var(--ui-black); color: var(--ui-white); font-size: 12px; padding: 6px 12px; border-radius: 999px; font-weight: 600; }
.ui-card-body { padding: 22px; }
.ui-card-meta { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 10px; }
.ui-card-code { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px; font-weight: 700; letter-spacing: .08em; color: var(--ui-muted); background: var(--ui-primary); padding: 4px 9px; border-radius: 6px; }
.ui-card-price { font-size: 17px; font-weight: 800; color: var(--ui-black); letter-spacing: -.01em; }
.ui-card-body h3 { margin: 0 0 8px; font-size: 19px; font-weight: 700; }
.ui-card-body p { margin: 0 0 18px; color: var(--ui-muted); font-size: 14px; min-height: 42px; }
.ui-card-actions { display: flex; gap: 8px; }
.ui-card-actions .ui-btn { flex: 1; padding: 10px 16px; font-size: 14px; }

.ui-features { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.ui-feature { background: var(--ui-white); border-radius: 18px; padding: 28px; border: 1px solid var(--ui-border); }
.ui-feature-icon { width: 48px; height: 48px; border-radius: 14px; background: var(--ui-accent-soft); color: var(--ui-accent); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.ui-feature h4 { margin: 0 0 8px; font-size: 17px; font-weight: 700; }
.ui-feature p { margin: 0; color: var(--ui-muted); font-size: 14px; }

.ui-why-list { margin-top: 48px; background: var(--ui-white); border: 1px solid var(--ui-border); border-radius: 22px; padding: 36px 40px; max-width: 880px; margin-left: auto; margin-right: auto; }
.ui-why-head { display: flex; align-items: center; gap: 10px; margin-bottom: 22px; }
.ui-why-head h3 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.01em; }
.ui-why-spark { color: var(--ui-accent); }
.ui-why-list ul { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 22px 32px; }
.ui-why-list li { display: flex; align-items: flex-start; gap: 14px; }
.ui-why-list li strong { display: block; font-size: 15.5px; font-weight: 700; margin-bottom: 4px; color: var(--ui-black); }
.ui-why-list li p { margin: 0; color: var(--ui-muted); font-size: 14px; line-height: 1.45; }
.ui-why-check { flex-shrink: 0; width: 28px; height: 28px; border-radius: 8px; background: var(--ui-accent-soft); color: var(--ui-accent); display: inline-flex; align-items: center; justify-content: center; margin-top: 2px; }

.ui-cta { background: var(--ui-black); color: var(--ui-white); }
.ui-cta { position: relative; overflow: hidden; }
.ui-cta > .ui-container { position: relative; z-index: 2; }
.ui-bg-photo { position: absolute; inset: 0; background-image: var(--ui-bg-photo); background-size: cover; background-position: center; z-index: 0; pointer-events: none; }
.ui-bg-photo::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(15,15,16,.82) 0%, rgba(15,15,16,.74) 50%, rgba(15,15,16,.88) 100%); }
.ui-cta-box { text-align: center; max-width: 700px; }
.ui-cta .ui-h2 { color: var(--ui-white); }
.ui-cta p { color: rgba(255,255,255,.7); margin: 0 0 28px; font-size: 17px; }
.ui-cta .ui-btn-primary { background: var(--ui-accent); }
.ui-cta .ui-btn-primary:hover { background: var(--ui-white); color: var(--ui-black); }

.ui-footer { background: var(--ui-white); border-top: 1px solid var(--ui-border); padding: 60px 0 24px; }
.ui-footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
.ui-footer-grid h5 { margin: 0 0 14px; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; }
.ui-footer-grid a { display: block; color: var(--ui-muted); text-decoration: none; font-size: 14px; padding: 4px 0; }
.ui-footer-grid a:hover { color: var(--ui-accent); }
.ui-footer-bottom { text-align: center; color: var(--ui-muted); font-size: 13px; padding-top: 24px; border-top: 1px solid var(--ui-border); }

.ui-pricing { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; align-items: stretch; }
.ui-price-card { position: relative; background: var(--ui-white); border: 1px solid var(--ui-border); border-radius: 22px; padding: 32px 26px; display: flex; flex-direction: column; transition: all .25s; }
.ui-price-card:hover { transform: translateY(-4px); box-shadow: 0 24px 50px -20px rgba(49,147,233,.25); }
.ui-price-card.featured { border: 1px solid var(--ui-accent); box-shadow: 0 24px 60px -20px rgba(49,147,233,.30); transform: scale(1.03); background: linear-gradient(180deg, #fff, var(--ui-accent-soft)); }
.ui-price-icon { width: 50px; height: 50px; border-radius: 14px; display:flex; align-items:center; justify-content:center; margin:0 auto 14px; background:#eaf4ff; color:#3193e9; }
.ui-price-icon-start { color:#3193e9; }
.ui-price-icon-plus { color:#3193e9; }
.ui-price-icon-premium { color:#3193e9; }
.ui-price-icon-vip { color:#3193e9; }
.ui-price-view-btn { width:100%; }
.ui-price-badge { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: var(--ui-black); color: var(--ui-white); font-size: 12px; font-weight: 700; padding: 7px 14px; border-radius: 999px; white-space: nowrap; display: inline-flex; align-items: center; gap: 6px; }
.ui-price-badge svg { color: var(--ui-accent); }
.ui-new-badge { position: absolute; top: 14px; right: 14px; background: #3193e9; color: #fff; font-size: 10.5px; font-weight: 700; padding: 5px 10px; border-radius: 999px; letter-spacing: .14em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 5px; box-shadow: 0 6px 14px -4px rgba(49,147,233,.45); }
.ui-price-check { color: var(--ui-accent); margin-top: 2px; flex-shrink: 0; }
.ui-custom-card h3 { display: inline-flex; align-items: center; gap: 10px; }
.ui-price-name { margin: 8px 0 14px; font-size: 22px; font-weight: 800; letter-spacing: -0.01em; }
.ui-price-row { display: flex; align-items: baseline; gap: 12px; margin-bottom: 22px; flex-wrap: wrap; }
.ui-price-old { color: var(--ui-muted); text-decoration: line-through; font-size: 17px; font-weight: 500; }
.ui-price-now { font-size: 34px; font-weight: 800; color: var(--ui-black); letter-spacing: -0.02em; }
.ui-price-list { list-style: none; padding: 0; margin: 0 0 26px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
.ui-price-list li { display: flex; align-items: flex-start; gap: 10px; font-size: 14.5px; color: var(--ui-text); line-height: 1.4; }
.ui-price-list li span { flex-shrink: 0; }

.ui-custom-card { margin-top: 36px; background: linear-gradient(135deg, #0f0f10, #2a2b2e); color: var(--ui-white); border-radius: 22px; padding: 32px 36px; display: flex; align-items: center; justify-content: space-between; gap: 30px; }
.ui-custom-card { position: relative; overflow: hidden; }
.ui-custom-card > .ui-bg-photo { border-radius: inherit; }
.ui-custom-card .ui-custom-card-body, .ui-custom-card .ui-custom-price { position: relative; z-index: 2; }
.ui-custom-card h3 { margin: 0 0 8px; font-size: 22px; font-weight: 800; }
.ui-custom-card p { margin: 0; color: rgba(255,255,255,.75); font-size: 15px; max-width: 520px; }
.ui-custom-price { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
.ui-custom-price span { font-size: 13px; color: rgba(255,255,255,.7); }
.ui-custom-price strong { font-size: 28px; font-weight: 800; }
.ui-custom-price .ui-btn { margin-top: 10px; background: var(--ui-accent); color: var(--ui-white); border-color: transparent; }
.ui-custom-price .ui-btn:hover { background: var(--ui-white); color: var(--ui-black); }

@media (max-width: 900px) {
  .ui-hero-grid { grid-template-columns: 1fr; }
  .ui-hero-visual { height: 360px; }
  .ui-grid { grid-template-columns: repeat(2, 1fr); }
  .ui-features { grid-template-columns: repeat(1, 1fr); }
  .ui-footer-grid { grid-template-columns: 1fr 1fr; }
  .ui-pricing { grid-template-columns: 1fr; max-width: 460px; margin: 0 auto; }
  .ui-price-card.featured { transform: none; }
  .ui-custom-card { flex-direction: column; align-items: flex-start; text-align: left; gap: 20px; }
  .ui-custom-price { align-items: flex-start; }
  .ui-why-list ul { grid-template-columns: 1fr; }
  .ui-why-list { padding: 28px 24px; }
  .ui-media-grid { grid-template-columns: 1fr; max-width: 460px; margin: 0 auto; }
}
@media (max-width: 720px) {
  .ui-burger { display: flex; }
  .ui-menu { display: none; position: absolute; top: 72px; left: 0; right: 0; background: var(--ui-white); flex-direction: column; padding: 20px; gap: 16px; border-bottom: 1px solid var(--ui-border); }
  .ui-menu.open { display: flex; }
  .ui-grid { grid-template-columns: 1fr; }
  .ui-section { padding: 60px 0; }
}

.ui-price-actions { display: flex; flex-direction: column; gap: 8px; }
.ui-price-actions .ui-btn { width: 100%; }

.ui-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; margin-bottom: 40px; }
.ui-step { position: relative; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12); border-radius: 20px; padding: 28px 22px 24px; color: var(--ui-white); transition: all .25s; }
.ui-step:hover { background: rgba(255,255,255,.10); border-color: var(--ui-accent); transform: translateY(-3px); }
.ui-step-num { position: absolute; top: -14px; left: 22px; width: 32px; height: 32px; border-radius: 999px; background: var(--ui-accent); color: #fff; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; box-shadow: 0 8px 18px -4px rgba(49,147,233,.55); }
.ui-step-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(49,147,233,.16); color: var(--ui-accent); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 14px; }
.ui-step h4 { margin: 0 0 8px; font-size: 16px; font-weight: 700; line-height: 1.3; color: #fff; }
.ui-step p { margin: 0; font-size: 13.5px; line-height: 1.55; color: rgba(255,255,255,.72); }

.ui-info-note { display: flex; align-items: flex-start; gap: 14px; max-width: 760px; margin: 0 auto 50px; background: rgba(49,147,233,.14); border: 1px solid rgba(49,147,233,.35); border-radius: 16px; padding: 18px 22px; color: #fff; }
.ui-info-note > svg { color: var(--ui-accent); flex-shrink: 0; margin-top: 2px; }
.ui-info-note strong { display: block; margin-bottom: 4px; font-size: 14.5px; font-weight: 700; }
.ui-info-note p { margin: 0; font-size: 13.5px; color: rgba(255,255,255,.78); line-height: 1.5; }

.ui-footer-privacy { display: inline-flex; align-items: center; gap: 8px; max-width: 1200px; margin: 0 auto 16px; padding: 12px 18px; background: var(--ui-primary); border-radius: 12px; color: var(--ui-muted); font-size: 13px; line-height: 1.5; }
.ui-footer-privacy svg { color: var(--ui-accent); flex-shrink: 0; }

.ui-privacy-note { display: inline-flex; align-items: center; gap: 8px; margin-top: 16px; padding: 10px 14px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12); border-radius: 10px; color: rgba(255,255,255,.6); font-size: 12px; line-height: 1.5; }
.ui-privacy-note svg { color: rgba(255,255,255,.5); flex-shrink: 0; }

@media (max-width: 900px) {
  .ui-steps { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .ui-steps { grid-template-columns: 1fr; }
}

.ui-modal { position: fixed; inset: 0; background: rgba(15,15,16,.72); backdrop-filter: blur(6px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 24px; animation: ui-fade .2s ease; overflow-y: auto; }
@keyframes ui-fade { from { opacity: 0; } to { opacity: 1; } }
.ui-modal-box { position: relative; background: var(--ui-white); border-radius: 24px; max-width: 1080px; width: 100%; max-height: calc(100vh - 48px); overflow-y: auto; padding: 40px 36px; box-shadow: 0 40px 80px -20px rgba(0,0,0,.45); }
.ui-modal-close { position: absolute; top: 16px; right: 16px; width: 38px; height: 38px; border-radius: 999px; border: 1px solid var(--ui-border); background: var(--ui-white); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; color: var(--ui-black); transition: all .2s; }
.ui-modal-close:hover { background: var(--ui-black); color: var(--ui-white); border-color: var(--ui-black); }
.ui-modal-head { text-align: center; margin-bottom: 28px; }
.ui-modal-head h3 { margin: 10px 0 8px; font-size: clamp(22px, 3vw, 30px); font-weight: 800; letter-spacing: -0.02em; }
.ui-modal-head p { max-width: 560px; margin: 0 auto; }
.ui-modal-actions { display: flex; justify-content: center; margin-top: 28px; }

.ui-preview-screens { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.ui-preview-caption { text-align: center; color: var(--ui-muted); max-width: 640px; margin: -10px auto 24px; font-size: 14px; }
.ui-preview-screen { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.ui-preview-label { font-size: 12.5px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--ui-muted); }
.ui-preview-phone { width: 170px; height: 330px; border-radius: 30px; background: #fff; border: 7px solid #0f0f10; padding: 10px; box-shadow: 0 20px 40px -16px rgba(15,15,16,.4); position: relative; overflow: hidden; }
.ui-preview-phone::after { content: ""; position: absolute; top: 8px; left: 50%; transform: translateX(-50%); width: 46px; height: 4px; background: #0f0f10; border-radius: 999px; z-index: 2; }
.ui-preview-phone .ui-invite { padding: 22px 14px; gap: 8px; border-radius: 18px; }
.ui-preview-phone .ui-invite-name { font-size: 20px; }
.ui-preview-phone .ui-invite-script { font-size: 11px; }
.ui-preview-phone .ui-invite-date { font-size: 10px; }

.ui-webinvite { width: 100%; height: 100%; border-radius: 18px; overflow: hidden; display: flex; flex-direction: column; position: relative; }
.ui-webinvite-bar { display: flex; align-items: center; gap: 4px; padding: 16px 10px 6px; background: rgba(255,255,255,.5); backdrop-filter: blur(6px); position: relative; }
.ui-invite-dark .ui-webinvite-bar, .ui-invite-1 .ui-webinvite-bar, .ui-invite-2 .ui-webinvite-bar { background: rgba(0,0,0,.25); }
.ui-webinvite-bar > span { width: 6px; height: 6px; border-radius: 999px; background: currentColor; opacity: .35; }
.ui-webinvite-bar > em { font-style: normal; margin-left: 6px; font-size: 8.5px; opacity: .55; letter-spacing: .02em; font-family: 'JetBrains Mono', ui-monospace, monospace; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ui-webinvite-scroll { flex: 1; overflow: hidden; padding: 14px 14px 16px; display: flex; flex-direction: column; gap: 14px; }
.ui-wi-hero { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px; padding: 6px 0 14px; border-bottom: 1px dashed currentColor; }
.ui-wi-hero h4 { margin: 2px 0 0; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 20px; font-weight: 500; line-height: 1.1; }
.ui-wi-script { font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-size: 10px; letter-spacing: .25em; text-transform: uppercase; opacity: .65; }
.ui-wi-divider { width: 28px; height: 1px; background: currentColor; opacity: .45; margin: 4px 0; }
.ui-wi-date { font-size: 9.5px; letter-spacing: .3em; text-transform: uppercase; opacity: .8; }
.ui-wi-section { display: flex; flex-direction: column; gap: 8px; }
.ui-wi-eyebrow { font-size: 8.5px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; opacity: .6; text-align: center; }
.ui-wi-eyebrow-top { margin-top: 4px; }
.ui-wi-countdown { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
.ui-wi-countdown > div { background: currentColor; color: inherit; border-radius: 8px; padding: 8px 2px; display: flex; flex-direction: column; align-items: center; gap: 2px; position: relative; }
.ui-wi-countdown > div::before { content: ""; position: absolute; inset: 0; background: var(--ui-white); opacity: .82; border-radius: inherit; }
.ui-invite-dark .ui-wi-countdown > div::before, .ui-invite-1 .ui-wi-countdown > div::before, .ui-invite-2 .ui-wi-countdown > div::before { background: #000; opacity: .55; }
.ui-wi-countdown strong { position: relative; font-size: 14px; font-weight: 800; letter-spacing: -.02em; }
.ui-wi-countdown span { position: relative; font-size: 7.5px; letter-spacing: .14em; text-transform: uppercase; opacity: .7; }
.ui-wi-cta { margin-top: auto; text-align: center; background: currentColor; border-radius: 999px; padding: 9px; font-size: 10.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; position: relative; }
.ui-wi-cta::before { content: ""; position: absolute; inset: 0; background: var(--ui-black); border-radius: inherit; opacity: 1; }
.ui-invite-dark .ui-wi-cta::before, .ui-invite-1 .ui-wi-cta::before, .ui-invite-2 .ui-wi-cta::before { background: var(--ui-white); }
.ui-wi-cta { color: var(--ui-white); }
.ui-invite-dark .ui-wi-cta, .ui-invite-1 .ui-wi-cta, .ui-invite-2 .ui-wi-cta { color: var(--ui-black); }
.ui-wi-cta-ghost::before { background: transparent !important; border: 1px solid currentColor; opacity: .55; }
.ui-wi-cta-ghost { color: inherit !important; }
.ui-wi-cta > * , .ui-wi-cta { position: relative; }

.ui-wi-timeline { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.ui-wi-timeline li { display: grid; grid-template-columns: 36px 10px 1fr; align-items: center; gap: 6px; font-size: 10.5px; }
.ui-wi-time { font-weight: 800; letter-spacing: -.01em; opacity: .9; }
.ui-wi-dot { width: 7px; height: 7px; border-radius: 999px; background: currentColor; opacity: .8; justify-self: center; }
.ui-wi-event { opacity: .85; }

.ui-wi-place { margin: 2px 0 0; text-align: center; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 18px; font-weight: 500; }
.ui-wi-addr { margin: 0; text-align: center; font-size: 10px; letter-spacing: .14em; text-transform: uppercase; opacity: .7; }
.ui-wi-map { position: relative; border-radius: 12px; overflow: hidden; aspect-ratio: 4 / 3; background: currentColor; }
.ui-wi-map svg { width: 100%; height: 100%; display: block; }
.ui-wi-pin { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -100%); background: var(--ui-accent); color: #fff; width: 24px; height: 24px; border-radius: 999px 999px 999px 2px; display: inline-flex; align-items: center; justify-content: center; rotate: -45deg; box-shadow: 0 6px 14px -4px rgba(0,0,0,.4); }
.ui-wi-pin svg { rotate: 45deg; }

.ui-wi-field { display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 8px 10px; border: 1px solid currentColor; border-radius: 10px; font-size: 10px; }
.ui-wi-field span { opacity: .55; letter-spacing: .14em; text-transform: uppercase; font-size: 8.5px; font-weight: 700; }
.ui-wi-field em { font-style: normal; font-weight: 600; }
.ui-wi-choices { display: flex; gap: 6px; }
.ui-wi-chip { flex: 1; text-align: center; padding: 7px 6px; border-radius: 999px; border: 1px solid currentColor; font-size: 10px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; gap: 4px; opacity: .65; }
.ui-wi-chip.active { background: var(--ui-accent); color: #fff; border-color: var(--ui-accent); opacity: 1; }

.ui-preview-phone-sm { width: 130px; height: 250px; border-width: 6px; border-radius: 24px; padding: 8px; }
.ui-preview-phone-sm .ui-invite { padding: 14px 10px; gap: 5px; border-radius: 14px; }
.ui-preview-phone-sm .ui-invite-script { font-size: 9px; }
.ui-preview-phone-sm .ui-invite-date { font-size: 8.5px; letter-spacing: .25em; }
.ui-preview-phone-sm .ui-invite::before { inset: 5px; border-radius: 12px; }

.ui-preview-collection { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px 20px; }
.ui-preview-mini { display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; }
.ui-preview-mini strong { font-size: 14px; font-weight: 700; margin-top: 6px; }
.ui-preview-mini span { font-size: 12px; }

@media (max-width: 900px) {
  .ui-preview-screens { grid-template-columns: repeat(2, 1fr); }
  .ui-preview-collection { grid-template-columns: repeat(3, 1fr); }
  .ui-modal-box { padding: 32px 20px; }
}
@media (max-width: 560px) {
  .ui-preview-collection { grid-template-columns: repeat(2, 1fr); }
}

.ui-rsvp-band { padding: 90px 0; }
.ui-rsvp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
.ui-rsvp-copy h2 { margin: 12px 0 18px; }
.ui-rsvp-copy p { color: rgba(255,255,255,.78); font-size: 16px; line-height: 1.6; margin: 0 0 22px; max-width: 480px; }
.ui-rsvp-bullets { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; color: #fff; }
.ui-rsvp-bullets li { display: flex; align-items: center; gap: 10px; font-size: 14.5px; font-weight: 500; }
.ui-rsvp-bullets svg { color: var(--ui-accent); flex-shrink: 0; }

.ui-rsvp-card { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.14); backdrop-filter: blur(8px); border-radius: 22px; padding: 22px; color: #fff; box-shadow: 0 30px 60px -20px rgba(0,0,0,.55); }
.ui-rsvp-card-head { display: flex; align-items: center; gap: 10px; padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,.12); margin-bottom: 16px; }
.ui-rsvp-card-head strong { font-size: 15px; font-weight: 700; flex: 1; }
.ui-rsvp-card-head > svg { color: var(--ui-accent); }
.ui-rsvp-card-head > span { font-size: 10px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #22c55e; padding: 4px 9px; border-radius: 999px; background: rgba(34,197,94,.16); display: inline-flex; align-items: center; gap: 5px; }
.ui-rsvp-card-head > span::before { content: ""; width: 6px; height: 6px; border-radius: 999px; background: #22c55e; box-shadow: 0 0 0 0 rgba(34,197,94,.6); animation: ui-pulse 2s infinite; }
.ui-rsvp-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 18px; }
.ui-rsvp-stats > div { background: rgba(255,255,255,.05); border-radius: 12px; padding: 12px 8px; text-align: center; display: flex; flex-direction: column; gap: 2px; }
.ui-rsvp-stats strong { font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -.02em; }
.ui-rsvp-stats span { font-size: 11px; color: rgba(255,255,255,.65); letter-spacing: .04em; }
.ui-rsvp-list { display: flex; flex-direction: column; gap: 8px; }
.ui-rsvp-row { display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 10px; padding: 10px 12px; background: rgba(255,255,255,.04); border-radius: 12px; font-size: 13.5px; }
.ui-rsvp-name { color: #fff; font-weight: 500; }
.ui-rsvp-guests { color: rgba(255,255,255,.55); font-size: 12px; font-weight: 600; min-width: 24px; text-align: right; }
.ui-rsvp-pill { font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; display: inline-flex; align-items: center; gap: 4px; letter-spacing: .04em; }
.ui-rsvp-pill.yes { background: rgba(34,197,94,.18); color: #4ade80; }
.ui-rsvp-pill.no { background: rgba(239,68,68,.16); color: #f87171; }
.ui-rsvp-pill.maybe { background: rgba(250,204,21,.16); color: #facc15; }

@media (max-width: 900px) {
  .ui-rsvp-grid { grid-template-columns: 1fr; gap: 36px; }
}

.ui-faq { max-width: 820px; margin: 0 auto; display: flex; flex-direction: column; gap: 12px; }
.ui-faq-item { background: var(--ui-white); border: 1px solid var(--ui-border); border-radius: 16px; overflow: hidden; transition: border-color .2s, box-shadow .2s; }
.ui-faq-item:hover { border-color: #d6d7da; }
.ui-faq-item.open { border-color: var(--ui-accent); box-shadow: 0 16px 36px -16px rgba(49,147,233,.25); }
.ui-faq-q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; background: none; border: 0; padding: 20px 24px; cursor: pointer; font-size: 16px; font-weight: 600; color: var(--ui-black); text-align: left; font-family: inherit; }
.ui-faq-q svg { flex-shrink: 0; transition: transform .25s ease; color: var(--ui-muted); }
.ui-faq-item.open .ui-faq-q svg { transform: rotate(180deg); color: var(--ui-accent); }
.ui-faq-a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .3s ease; }
.ui-faq-item.open .ui-faq-a { grid-template-rows: 1fr; }
.ui-faq-a > p { overflow: hidden; margin: 0; padding: 0 24px; color: var(--ui-muted); font-size: 15px; line-height: 1.6; }
.ui-faq-item.open .ui-faq-a > p { padding-bottom: 22px; }

.ui-footer-socials { display: flex; justify-content: center; gap: 14px; margin: 0 auto 18px; }
.ui-footer-socials a { width: 40px; height: 40px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; background: var(--ui-primary); border: 1px solid var(--ui-border); color: var(--ui-muted); transition: all .2s; }
.ui-footer-socials a:hover { background: var(--ui-accent); color: #fff; border-color: var(--ui-accent); transform: translateY(-2px); }
.ui-footer-socials svg { width: 18px; height: 18px; }

.ui-whatsapp-float { position: fixed; bottom: 22px; right: 22px; z-index: 90; display: inline-flex; align-items: center; gap: 10px; background: #25d366; color: #fff; border-radius: 999px; padding: 12px 18px; font-weight: 700; font-size: 14px; text-decoration: none; box-shadow: 0 8px 24px -6px rgba(37,211,102,.55); transition: all .2s; animation: ui-fade .4s ease .8s both; }
.ui-whatsapp-float:hover { transform: translateY(-2px); box-shadow: 0 12px 32px -8px rgba(37,211,102,.65); }
.ui-whatsapp-float svg { width: 22px; height: 22px; }
.ui-whatsapp-phone { white-space: nowrap; }

@media (max-width: 560px) {
  .ui-whatsapp-float { padding: 12px 14px; }
  .ui-whatsapp-phone { font-size: 13px; }
}
`;

function DiscountCountdown({ until }: { until: string }) {
  const getRemaining = () => {
    const end = new Date(`${until}T23:59:59`).getTime();
    return Math.max(0, end - Date.now());
  };

  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(getRemaining());
    }, 1000);

    return () => window.clearInterval(timer);
  }, [until]);

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (remaining <= 0) {
    return <div className="ct-countdown ct-countdown-ended">Զեղչն ավարտվել է</div>;
  }

  return (
    <div className="ct-countdown" aria-label="Զեղչի ավարտի հետհաշվարկ">
      <div className="ct-countdown-heading">
        <strong>Զեղչի ավարտը</strong>
        <span>Մնացել է</span>
      </div>
      <div className="ct-countdown-values">
        <strong>{days}</strong>
        <b>:</b>
        <strong>{String(hours).padStart(2, "0")}</strong>
        <b>:</b>
        <strong>{String(minutes).padStart(2, "0")}</strong>
        <b>:</b>
        <strong>{String(seconds).padStart(2, "0")}</strong>
      </div>
    </div>
  );
}

function CatalogTemplates() {
  const FILTERS: { id: "all" | TplCat; label: string }[] = [
    { id: "all", label: "Ամբողջը" },
    { id: "wedding", label: TPL_CAT_LABELS.wedding },
    { id: "engagement", label: TPL_CAT_LABELS.engagement },
    { id: "birthday", label: TPL_CAT_LABELS.birthday },
    { id: "childrens", label: TPL_CAT_LABELS.childrens },
    { id: "baptism", label: TPL_CAT_LABELS.baptism },
    { id: "commercial", label: TPL_CAT_LABELS.commercial },
    { id: "other", label: TPL_CAT_LABELS.other },
  ];

  const [cat, setCat] = useState<"all" | TplCat>("all");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setShowAll(false);
  }, [cat]);

  const list = (
    cat === "all"
      ? TPL_DATA
      : TPL_DATA.filter((t) => t.category === cat)
  );

  const badgeLabel = (badge: string) => {
    if (badge === "top") return "TOP";
    if (badge === "discount") return "Զեղչ";
    if (badge === "new") return "Նոր";
    if (badge === "gift-music") return "Նվեր Երաժշտություն";
    return badge;
  };

  const badgeIcon = (badge: string) => {
    if (badge === "top") return <Crown size={13} strokeWidth={2.4} />;
    if (badge === "discount") return <Tag size={13} strokeWidth={2.4} />;
    if (badge === "new") return <Sparkles size={13} strokeWidth={2.4} />;
    if (badge === "gift-music") return <Gift size={13} strokeWidth={2.4} />;
    return null;
  };

  return (
    <>
      <style>{ctStyles}</style>

      <div className="ct-tabs">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`ct-tab ${cat === f.id ? "active" : ""}`}
            onClick={() => setCat(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="ct-grid">
        {(showAll ? list : list.slice(0, 15)).map((t) => {
          const orderMsg = encodeURIComponent(
            `Բարև Ձեզ! Ուզում եմ պատվիրել թեմփլեյթ #${t.code} (${TPL_CAT_LABELS[t.category]}, ${TPL_TIER_LABELS[t.tier]} — ${t.price})։`,
          );

          return (
            <article key={t.code} className="ct-card">
              <Link
                to="/templates/$code"
                params={{ code: t.code }}
                className="ct-stage"
                aria-label={`Դիտել թեմփլեյթ #${t.code}`}
              >
                {t.badges?.length > 0 && (
                  <div className="ct-badges" aria-label="Թեմփլեյթի նշումներ">
                    {t.badges.map((badge) => (
                      <span
                        key={badge}
                        className={`ct-badge ct-badge-${badge}`}
                      >
                        {badgeIcon(badge)}
                        {badgeLabel(badge)}
                      </span>
                    ))}
                  </div>
                )}

                <div className="ct-phone ct-phone-left" aria-hidden>
                  <img src={t.image} alt="" loading="lazy" />
                </div>

                <div className="ct-phone ct-phone-right" aria-hidden>
                  <img src={t.image} alt="" loading="lazy" />
                </div>

                <div className="ct-phone ct-phone-main">
                  <img
                    src={t.image}
                    alt={`Թեմփլեյթ #${t.code}`}
                    loading="lazy"
                  />
                </div>

                <div className="ct-overlay">
                  <Eye size={18} />
                  <span>Դիտել</span>
                </div>
              </Link>

              <div className="ct-body">
                <div className="ct-meta">
                  <span className="ct-code">#{t.code}</span>
                  <div className="ct-price-wrap">
                    {t.discountUntil && (
                      <s className="ct-old-price">{TPL_TIER_PRICES[t.tier]}</s>
                    )}
                    <span className={`ct-price ${t.discountUntil ? "ct-sale-price" : ""}`}>
                      {t.price}
                    </span>
                    <span className={`ct-tier-badge ct-tier-${t.tier}`}>
                      {TPL_TIER_LABELS[t.tier]}
                    </span>
                  </div>
                </div>

                <h3 className="ct-title">
                  {TPL_CAT_LABELS[t.category]}
                </h3>

                {t.discountUntil && (
                  <DiscountCountdown until={t.discountUntil} />
                )}

                <div className="ct-actions">
                  <Link
                    to="/templates/$code"
                    params={{ code: t.code }}
                    className="ct-btn ct-btn-ghost"
                  >
                    <Eye size={14} /> Դիտել
                  </Link>

                  <a
                    href={`${TPL_WA}?text=${orderMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ct-btn ct-btn-primary"
                  >
                    <MessageCircle size={14} /> Պատվիրել
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {list.length > 15 && !showAll && (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button
            type="button"
            className="ui-btn ui-btn-primary"
            onClick={() => setShowAll(true)}
          >
            <ChevronDown size={16} /> Ավելին
          </button>
        </div>
      )}

      {showAll && list.length > 15 && (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link to="/templates" className="ui-btn ui-btn-primary">
            <Eye size={16} /> Տեսնել ամբողջ տեսականին
          </Link>
        </div>
      )}
    </>
  );
}

const ctStyles = `
.ct-tabs { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 40px; }
.ct-tab { background: #fff; border: 1px solid rgba(0,0,0,.08); padding: 10px 18px; border-radius: 999px; font-size: 14px; font-weight: 500; color: #5a5a5e; cursor: pointer; transition: all .2s; }
.ct-tab:hover { border-color: #0f0f10; color: #0f0f10; }
.ct-tab.active { background: #0f0f10; color: #fff; border-color: #0f0f10; }

.ct-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
.ct-card { background: #fff; border-radius: 18px; overflow: hidden; border: 1px solid rgba(0,0,0,.05); transition: all .25s; display: flex; flex-direction: column; }
.ct-card:hover { transform: translateY(-4px); box-shadow: 0 24px 60px -24px rgba(0,0,0,.18); border-color: rgba(0,0,0,.12); }

.ct-stage { position: relative; display: block; text-decoration: none; height: 380px; padding: 0 28px; background: linear-gradient(170deg, #f4f5f7 0%, #ffffff 60%, #f4f5f7 100%); overflow: hidden; }
.ct-stage::before { content: ""; position: absolute; inset: -20%; background: radial-gradient(circle at 50% 60%, rgba(184,134,45,.12), transparent 60%); pointer-events: none; }
.ct-phone { position: absolute; border-radius: 26px; background: #fff; border: 6px solid #0f0f10; box-shadow: 0 20px 40px -18px rgba(15,15,16,.45); overflow: hidden; top: 50%; transition: transform .35s ease; }
.ct-phone::after { content: ""; position: absolute; top: 8px; left: 50%; transform: translateX(-50%); width: 44px; height: 4px; background: #0f0f10; border-radius: 999px; z-index: 2; }
.ct-phone img { width: 100%; height: 100%; object-fit: cover; display: block; }
.ct-phone-main { width: 160px; height: 305px; left: 50%; transform: translate(-50%, -50%); z-index: 3; }
.ct-phone-left, .ct-phone-right { width: 118px; height: 230px; opacity: .55; filter: blur(.4px); z-index: 1; }
.ct-phone-left  { left: 28px;  transform: translateY(-50%) rotate(-10deg); }
.ct-phone-right { right: 28px; transform: translateY(-50%) rotate(10deg); }
.ct-card:hover .ct-phone-main { transform: translate(-50%, -52%) scale(1.03); }
.ct-card:hover .ct-phone-left  { transform: translateY(-50%) rotate(-13deg) translateX(-4px); }
.ct-card:hover .ct-phone-right { transform: translateY(-50%) rotate(13deg)  translateX(4px); }

.ct-overlay { position: absolute; inset: 0; background: rgba(15,15,16,.55); color: #fff; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 600; font-size: 14px; opacity: 0; transition: opacity .25s; z-index: 4; }
.ct-card:hover .ct-overlay { opacity: 1; }
.ct-badges {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 6;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}
.ui-copyright {
  max-width: 900px;
  margin: 28px auto 0;
  padding: 0 20px;
  text-align: center;
}

.ui-copyright p {
  margin: 0;
  color: rgba(90, 90, 94, 0.78);
  font-size: 12px;
  line-height: 1.7;
  font-weight: 400;
  letter-spacing: 0.01em;
}
.ct-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 11px;
  border-radius: 999px;
  font-size: 11px;
  line-height: 1;
  font-weight: 800;
  letter-spacing: .06em;
  backdrop-filter: blur(8px);
  box-shadow: 0 6px 18px rgba(0,0,0,.10);
}

.ct-badge-top {
  background: #b8862d;
  color: #fff;
}

.ct-badge-discount {
  background: #dc2626;
  color: #fff;
}

.ct-badge-new {
  background: #3193e9;
  color: #fff;
}

.ct-badge-gift-music {
  background: #fff;
  color: #0f0f10;
  border: 1px solid rgba(0,0,0,.10);
}

.ct-price-wrap {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.ct-tier-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 9px;
  border-radius: 999px;
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: .04em;
  text-transform: uppercase;
  white-space: nowrap;
}

.ct-tier-start   { background: #2a7f5f; }
.ct-tier-plus    { background: #3193e9; }
.ct-tier-premium { background: #b8862d; }
.ct-tier-vip     { background: #0f0f10; }

.ct-countdown {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  padding: 9px 11px;
  border-radius: 12px;
  background: rgba(220,38,38,.07);
  border: 1px solid rgba(220,38,38,.16);
  color: #b91c1c;
}

.ct-countdown-heading { display:flex; flex-direction:column; align-items:center; line-height:1.15; margin-bottom:4px; }
.ct-countdown-heading strong { font-size:11px; font-weight:800; }
.ct-countdown-heading span { font-size:10px; font-weight:600; opacity:.72; }

.ct-countdown-values {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.ct-countdown-values strong {
  font-size: 14px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  min-width: 18px;
  text-align: center;
}

.ct-countdown-values b {
  font-size: 13px;
  opacity: .55;
}

.ct-countdown-ended {
  color: #6b6f76;
  background: #f4f5f7;
  border-color: #e6e7ea;
}

.ct-body { padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 8px; }
.ct-meta { display: flex; justify-content: space-between; align-items: baseline; }
.ct-code { font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 13px; color: #5a5a5e; }
.ct-old-price { color: #8c8c91; font-size: 13px; font-weight: 700; text-decoration-thickness: 1.5px; }
.ct-price { font-size: 17px; font-weight: 800; letter-spacing: -0.01em; }
.ct-sale-price { color: #dc2626; }
.ct-title { margin: 0; font-size: 18px; font-weight: 700; letter-spacing: -0.01em; color: #0f0f10; }
.ct-actions { display: flex; gap: 8px; margin-top: 6px; }
.ct-btn { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 10px 14px; border-radius: 12px; font-weight: 600; font-size: 13px; text-decoration: none; transition: all .2s; cursor: pointer; border: 0; }
.ct-btn-ghost { background: transparent; color: #0f0f10; border: 1px solid rgba(0,0,0,.12); }
.ct-btn-ghost:hover { background: rgba(0,0,0,.04); border-color: rgba(0,0,0,.22); }
.ct-btn-primary { background: #0f0f10; color: #fff; }
.ct-btn-primary:hover { background: #25d366; }

@media (max-width: 560px) {
  .ct-grid { grid-template-columns: 1fr; gap: 18px; }
  .ct-body { padding: 12px 14px; gap: 6px; }
  .ct-title { font-size: 17px; }
  .ct-btn { padding: 10px 14px; font-size: 13px; }
  .ct-countdown { justify-content: center; }
  .ct-stage { height: 360px; padding: 0 56px; }
  .ct-phone-main { width: 150px; height: 285px; }
  .ct-phone-left, .ct-phone-right { width: 105px; height: 200px; }
  .ct-phone-left  { left: 36px;  }
  .ct-phone-right { right: 36px; }
}
`;
