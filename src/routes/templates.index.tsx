import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Eye, MessageCircle, Crown, Tag, Sparkles, Gift } from "lucide-react";

import {
  templates,
  orderTemplates,
  categoryLabels,
  WHATSAPP_URL,
  tierLabels,
  tierPrices,
  type TemplateCategory,
  type TemplateTier,
  badgeLabels,
} from "@/data/templates";

const SITE_URL = "https://uinvite-invites-forever.lovable.app";

export const Route = createFileRoute("/templates/")({
  head: () => ({
    meta: [
      { title: "Տեսականի — 50+ վեբ հրավիրատոմսերի ձևանմուշ | uInvite" },
      {
        name: "description",
        content:
          "Դիտեք uInvite-ի ամբողջ տեսականին՝ հարսանիք, նշանադրություն, կնունք, ծնունդ, մանկական և կորպորատիվ վեբ հրավիրատոմսեր՝ 4,900֏-ից։",
      },
      { property: "og:title", content: "Տեսականի — 50+ վեբ հրավիրատոմսերի ձևանմուշ | uInvite" },
      {
        property: "og:description",
        content: "Ընտրեք Ձեր միջոցառմանը համապատասխան վեբ հրավիրատոմս՝ Start, Plus, Premium և Vip փաթեթներով։",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/templates` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Տեսականի — uInvite վեբ հրավիրատոմսեր" },
      { name: "twitter:description", content: "50+ պատրաստի վեբ հրավիրատոմսեր ցանկացած առիթի համար։" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/templates` }],
  }),
  component: TemplatesPage,
});

type Filter = "all" | TemplateCategory;
type TierFilter = "all" | TemplateTier;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Ամբողջը" },
  { id: "wedding", label: categoryLabels.wedding },
  { id: "engagement", label: categoryLabels.engagement },
  { id: "birthday", label: categoryLabels.birthday },
  { id: "childrens", label: categoryLabels.childrens },
  { id: "baptism", label: categoryLabels.baptism },
  { id: "commercial", label: categoryLabels.commercial },
  { id: "other", label: categoryLabels.other },
];

const TIER_FILTERS: { id: TierFilter; label: string }[] = [
  { id: "all", label: "Բոլոր փաթեթները" },
  { id: "start", label: tierLabels.start },
  { id: "plus", label: tierLabels.plus },
  { id: "premium", label: tierLabels.premium },
  { id: "vip", label: tierLabels.vip },
];


function TemplatesPage() {
  const getInitialTier = (): TierFilter => {
    if (typeof window === "undefined") return "all";
    const hash = window.location.hash;
    if (hash === "#tier-start") return "start";
    if (hash === "#tier-plus") return "plus";
    if (hash === "#tier-premium") return "premium";
    if (hash === "#tier-vip") return "vip";
    return "all";
  };

  const [filter, setFilter] = useState<Filter>("all");
  const [tierFilter, setTierFilter] = useState<TierFilter>(getInitialTier);

  useEffect(() => {
    const applyHashFilter = () => {
      const hash = window.location.hash;
      if (hash === "#tier-start") setTierFilter("start");
      else if (hash === "#tier-plus") setTierFilter("plus");
      else if (hash === "#tier-premium") setTierFilter("premium");
      else if (hash === "#tier-vip") setTierFilter("vip");
    };
    applyHashFilter();
    window.addEventListener("hashchange", applyHashFilter);
    return () => window.removeEventListener("hashchange", applyHashFilter);
  }, []);

  const list = useMemo(
    () =>
      orderTemplates(
        templates.filter(
          (t) =>
            (filter === "all" || t.category === filter) &&
            (tierFilter === "all" || t.tier === tierFilter),
        ),
      ),
    [filter, tierFilter],
  );

  return (
    <div className="tpl-page">
      <style>{styles}</style>

      <section className="tpl-hero">
        <div className="tpl-container">
          <h1>Տեսականի</h1>
          <p>
            {templates.length} պատրաստի դիզայններ՝ ընտրեք Ձեր միջոցառմանը
            համապատասխանը։
          </p>
        </div>
      </section>

      <section className="tpl-list">
        <div className="tpl-container">
          <div className="tpl-tabs">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={`tpl-tab ${filter === f.id ? "active" : ""}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="tpl-tiers">
            {TIER_FILTERS.map((f) => (
              <button
                key={f.id}
                className={`tpl-tier-tab tpl-tier-${f.id} ${tierFilter === f.id ? "active" : ""}`}
                onClick={() => setTierFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="tpl-grid">
            {list.map((t) => (
              <TemplateCard key={t.code} t={t} />
            ))}
          </div>

          {list.length === 0 && (
            <p className="tpl-empty">Այս ֆիլտրով թեմփլեյթներ չկան։</p>
          )}
        </div>
      </section>
    </div>
  );
}

function BadgeIcon({ kind }: { kind: string }) {
  if (kind === "top") return <Crown size={13} strokeWidth={2.4} />;
  if (kind === "discount") return <Tag size={13} strokeWidth={2.4} />;
  if (kind === "new") return <Sparkles size={13} strokeWidth={2.4} />;
  if (kind === "gift-music") return <Gift size={13} strokeWidth={2.4} />;
  return null;
}

function Countdown({ until }: { until: string }) {
  const getRemaining = () => {
    const end = new Date(`${until}T23:59:59`).getTime();
    return Math.max(0, end - Date.now());
  };

  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, [until]);

  if (remaining <= 0) {
    return <div className="tpl-sale-ended">Զեղչն ավարտվել է</div>;
  }

  const total = Math.floor(remaining / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  return (
    <div className="tpl-countdown">
      <span className="tpl-countdown-title">Զեղչի ավարտը՝</span>{" "}
      <span className="tpl-countdown-time">
        <strong>{days}</strong><b>:</b>
        <strong>{String(hours).padStart(2, "0")}</strong><b>:</b>
        <strong>{String(minutes).padStart(2, "0")}</strong><b>:</b>
        <strong>{String(seconds).padStart(2, "0")}</strong>
      </span>
    </div>
  );
}

function TemplateCard({ t }: { t: (typeof templates)[number] }) {
  const orderMsg = encodeURIComponent(
    `Բարև Ձեզ! Ուզում եմ պատվիրել թեմփլեյթ #${t.code} (${categoryLabels[t.category]}, ${tierLabels[t.tier]} — ${t.price})։`,
  );

  const sale = Boolean(t.discountTo && t.discountUntil);
  const oldPrice = sale ? tierPrices[t.tier] : undefined;

  return (
    <article className="tpl-card">
      <Link
        to="/templates/$code"
        params={{ code: t.code }}
        className="tpl-card-stage"
        aria-label={`Դիտել թեմփլեյթ #${t.code}`}
      >
        <div className="tpl-badges">
          {t.badges.map((badge) => (
            <span key={badge} className={`tpl-badge tpl-badge-${badge}`}>
              <BadgeIcon kind={badge} />
              {badgeLabels[badge]}
            </span>
          ))}
        </div>

        <div className="tpl-phone tpl-phone-left" aria-hidden>
          <img src={t.image} alt="" loading="lazy" />
        </div>
        <div className="tpl-phone tpl-phone-right" aria-hidden>
          <img src={t.image} alt="" loading="lazy" />
        </div>
        <div className="tpl-phone tpl-phone-main">
          <img src={t.image} alt={`Թեմփլեյթ #${t.code}`} loading="lazy" />
        </div>

        <div className="tpl-card-overlay">
          <Eye size={18} />
          <span>Դիտել</span>
        </div>
      </Link>

      <div className="tpl-card-body">
        <div className="tpl-card-meta">
          <span className="tpl-card-code">#{t.code}</span>

          <div className="tpl-price-area">
            {sale ? (
              <>
                <span className="tpl-old-price">
                  <s>{oldPrice}</s>
                </span>
                <span className="tpl-card-price tpl-sale-price">
                  {t.price}
                </span>
              </>
            ) : (
              <span className="tpl-card-price">
                {t.price}
              </span>
            )}

            <span className={`tpl-tier-chip tpl-tier-${t.tier}`}>
              {tierLabels[t.tier]}
            </span>
          </div>
        </div>

        <h3 className="tpl-card-title">{categoryLabels[t.category]}</h3>

        <div className="tpl-card-actions">
          <Link
            to="/templates/$code"
            params={{ code: t.code }}
            className="tpl-btn tpl-btn-ghost"
          >
            <Eye size={14} /> Դիտել
          </Link>
          <a
            href={`${WHATSAPP_URL}?text=${orderMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tpl-btn tpl-btn-primary"
          >
            <MessageCircle size={14} /> Պատվիրել
          </a>
        </div>
              {t.discountUntil && <Countdown until={t.discountUntil} />}
      </div>
    </article>
  );
}

const styles = `
.tpl-page { min-height:100vh; color:#0f0f10; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; }
.tpl-container { max-width:1280px; margin:0 auto; padding:0 24px; }
.tpl-hero { padding:64px 0 32px; text-align:center; }
.tpl-hero h1 { font-size:clamp(36px,5vw,56px); font-weight:800; letter-spacing:-.02em; margin:0 0 12px; }
.tpl-hero p { color:#5a5a5e; font-size:17px; margin:0 auto; max-width:560px; }
.tpl-list { padding:24px 0 96px; }
.tpl-tabs,.tpl-tiers { display:flex; flex-wrap:wrap; gap:8px; justify-content:center; }
.tpl-tabs { margin-bottom:16px; }
.tpl-tiers { margin-bottom:40px; }
.tpl-tab,.tpl-tier-tab { background:#fff; border:1px solid rgba(0,0,0,.08); cursor:pointer; transition:.2s; }
.tpl-tab { padding:10px 18px; border-radius:999px; font-size:14px; color:#5a5a5e; }
.tpl-tab.active { background:#0f0f10; color:#fff; border-color:#0f0f10; }
.tpl-tier-tab { padding:8px 16px; border-radius:999px; font-size:13px; font-weight:800; color:#fff; border-color:transparent; }
.tpl-tier-tab.active { color:#fff; box-shadow:0 6px 16px rgba(0,0,0,.12); }
.tpl-tier-tab.tpl-tier-all { background:#0f0f10; }
.tpl-tier-tab.tpl-tier-start { background:#2a7f5f; }
.tpl-tier-tab.tpl-tier-plus { background:#3193e9; }
.tpl-tier-tab.tpl-tier-premium { background:#b8862d; }
.tpl-tier-tab.tpl-tier-vip { background:#0f0f10; }
.tpl-tier-tab:not(.active) { opacity:.82; }
.tpl-tier-tab:hover { opacity:1; transform:translateY(-1px); }

.tpl-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:24px; }
.tpl-card { background:#fff; border-radius:18px; overflow:hidden; border:1px solid rgba(0,0,0,.05); transition:.25s; display:flex; flex-direction:column; }
.tpl-card:hover { transform:translateY(-4px); box-shadow:0 24px 60px -24px rgba(0,0,0,.18); }
.tpl-card-stage { position:relative; display:block; height:380px; padding:0 28px; background:linear-gradient(170deg,#f4f5f7 0%,#fff 60%,#f4f5f7 100%); overflow:hidden; text-decoration:none; }
.tpl-card-stage::before { content:""; position:absolute; inset:-20%; background:radial-gradient(circle at 50% 60%,rgba(184,134,45,.12),transparent 60%); pointer-events:none; }
.tpl-phone { position:absolute; border-radius:26px; background:#fff; border:6px solid #0f0f10; box-shadow:0 20px 40px -18px rgba(15,15,16,.45); overflow:hidden; top:50%; transition:transform .35s ease; }
.tpl-phone::after { content:""; position:absolute; top:8px; left:50%; transform:translateX(-50%); width:44px; height:4px; background:#0f0f10; border-radius:999px; z-index:2; }
.tpl-phone img { width:100%; height:100%; object-fit:cover; display:block; }
.tpl-phone-main { width:160px; height:305px; left:50%; transform:translate(-50%,-50%); z-index:3; }
.tpl-phone-left,.tpl-phone-right { width:118px; height:230px; opacity:.55; filter:blur(.4px); z-index:1; }
.tpl-phone-left { left:28px; transform:translateY(-50%) rotate(-10deg); }
.tpl-phone-right { right:28px; transform:translateY(-50%) rotate(10deg); }
.tpl-card:hover .tpl-phone-main { transform:translate(-50%,-52%) scale(1.03); }
.tpl-card:hover .tpl-phone-left { transform:translateY(-50%) rotate(-13deg) translateX(-4px); }
.tpl-card:hover .tpl-phone-right { transform:translateY(-50%) rotate(13deg) translateX(4px); }

.tpl-card-overlay { position:absolute; inset:0; background:rgba(15,15,16,.55); color:#fff; display:flex; align-items:center; justify-content:center; gap:8px; font-weight:600; opacity:0; transition:.25s; z-index:4; }
.tpl-card:hover .tpl-card-overlay { opacity:1; }

.tpl-badges { position:absolute; top:12px; left:12px; z-index:6; display:flex; flex-direction:column; align-items:flex-start; gap:6px; }
.tpl-badge { display:inline-flex; align-items:center; gap:6px; padding:7px 11px; border-radius:999px; font-size:11px; line-height:1; font-weight:800; box-shadow:0 6px 18px rgba(0,0,0,.10); backdrop-filter:blur(8px); }
.tpl-badge-top { background:#b8862d; color:#fff; }
.tpl-badge-discount { background:#dc2626; color:#fff; }
.tpl-badge-new { background:#3193e9; color:#fff; }
.tpl-badge-gift-music { background:#fff; color:#0f0f10; border:1px solid rgba(0,0,0,.10); }

.tpl-card-body { padding:18px 20px 20px; display:flex; flex-direction:column; gap:10px; }
.tpl-card-meta { display:flex; justify-content:space-between; align-items:center; gap:12px; }
.tpl-card-code { font-family:"JetBrains Mono",ui-monospace,monospace; font-size:13px; color:#5a5a5e; }
.tpl-price-area { display:flex; align-items:center; justify-content:flex-end; gap:7px; flex-wrap:wrap; }
.tpl-old-price { color:#8c8c91; font-size:13px; font-weight:700; }
.tpl-card-price { font-size:17px; font-weight:800; }
.tpl-sale-price { color:#dc2626; }
.tpl-tier-chip { display:inline-flex; padding:5px 9px; border-radius:999px; color:#fff; font-size:10px; font-weight:800; line-height:1; letter-spacing:.04em; text-transform:uppercase; }
.tpl-tier-start { background:#2a7f5f; }
.tpl-tier-plus { background:#3193e9; }
.tpl-tier-premium { background:#b8862d; }
.tpl-tier-vip { background:#0f0f10; }

.tpl-countdown {
  margin-top: 12px;
  text-align: center;
  color: #dc2626;
  font-size: 14px;
  font-weight: 500;
}

.tpl-countdown-title {
  font-size: 14px;
  font-weight: 500;
}

.tpl-countdown-time {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.tpl-countdown-time strong {
  font-weight: 700;
}

.tpl-countdown-time b {
  margin: 0 3px;
  font-weight: 700;
}
.tpl-sale-ended { text-align:center; padding:9px 11px; border-radius:12px; background:#f4f5f7; border:1px solid #e6e7ea; color:#6b6f76; font-size:12px; font-weight:700; }

.tpl-card-actions { display:flex; gap:8px; margin-top:2px; }
.tpl-btn { flex:1; display:inline-flex; align-items:center; justify-content:center; gap:6px; padding:10px 14px; border-radius:12px; font-weight:600; font-size:13px; text-decoration:none; transition:.2s; }
.tpl-btn-ghost { color:#0f0f10; border:1px solid rgba(0,0,0,.12); }
.tpl-btn-primary { background:#0f0f10; color:#fff; }
.tpl-btn-primary:hover { background:#25d366; }
.tpl-empty { text-align:center; color:#5a5a5e; padding:48px 0; }

@media (max-width:560px) {
  .tpl-grid { grid-template-columns:1fr; gap:18px; }
  .tpl-card-stage { height:360px; padding:0 56px; }
  .tpl-phone-main { width:150px; height:285px; }
  .tpl-phone-left,.tpl-phone-right { width:105px; height:200px; }
  .tpl-phone-left { left:36px; }
  .tpl-phone-right { right:36px; }
  .tpl-card-body { padding:14px; }
  .tpl-hero { padding:40px 0 16px; }
  .tpl-card-meta { align-items:flex-start; }
}
`;
