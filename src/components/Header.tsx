import { useTranslation } from "@/i18n/LanguageProvider";
import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import logoUrl from "@/assets/logo-full.png";
import { languages } from "@/i18n/languages";

const NAV = [
  { id: "home", label: "Գլխավոր", to: "/" },
  { id: "templates", label: "Տեսականի", to: "/templates" },
  { id: "new-year", label: "Նոր տարի", to: "/templates", hash: "category-new-year" },
  { id: "pricing", label: "Փաթեթներ", to: "/", hash: "pricing" },
  { id: "why", label: "Ինչու մենք", to: "/", hash: "why" },
  { id: "steps", label: "Աշխատանքի փուլեր", to: "/", hash: "steps" },
  { id: "corporate", label: "Կորպորատիվ առաջարկ", to: "/corporate" },
  { id: "faq", label: "ՀՏՀ", to: "/", hash: "faq" },
] as const;

export function Header() {
  const { tr, language: activeLanguage, setLanguage } = useTranslation();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("home");
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);
  useEffect(() => {
    if (location.pathname !== "/") return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const offset =
        (document.querySelector(".shared-header")?.getBoundingClientRect().height ?? 72) + 125;
      const ids = ["home", "catalog", "pricing", "why", "steps", "faq", "order"];
      let current = "home";
      // Use the last section in document order above the header boundary.
      const passed = ids
        .map((id) => ({ id, top: document.getElementById(id)?.getBoundingClientRect().top }))
        .filter((item) => item.top !== undefined && item.top <= offset)
        .sort((a, b) => (b.top ?? 0) - (a.top ?? 0));
      if (passed.length) current = passed[0].id;
      setSection(current === "catalog" ? "templates" : current);
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.querySelector<HTMLButtonElement>(".shared-burger")?.focus();
      }
    };
    const outside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".shared-header")) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("click", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("click", outside);
    };
  }, [open]);
  const active = location.pathname.startsWith("/templates")
    ? location.hash.replace(/^#/, "").startsWith("category-new-year")
      ? "new-year"
      : "templates"
    : location.pathname === "/corporate"
      ? "corporate"
      : location.pathname === "/"
        ? section
        : "";
  const top = () => {
    setOpen(false);
    if (location.pathname === "/")
      window.scrollTo({
        top: 0,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
  };
  return (
    <>
      <style>{headerStyles}</style>
      <header className="shared-header">
        <div className="shared-container shared-nav">
          <Link to="/" className="shared-logo" onClick={top}>
            <img
              src={logoUrl}
              alt={tr("uInvite՝ էլեկտրոնային հրավիրատոմսեր")}
              className="shared-logo-img"
            />
          </Link>
          <nav
            id="main-navigation"
            className={`shared-menu ${open ? "open" : ""}`}
            aria-label={tr("Հիմնական ցանկ")}
          >
            {NAV.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                hash={"hash" in item ? item.hash : ""}
                className={`${active === item.id ? "is-current" : ""} ${item.id === "new-year" ? "new-year-nav-link" : ""}`}
                aria-current={active === item.id ? "location" : undefined}
                onClick={item.id === "home" ? top : () => setOpen(false)}
              >
                {tr(item.label)}
              </Link>
            ))}
            <Link
              to="/"
              hash="pricing"
              className="header-order header-menu-order"
              onClick={() => setOpen(false)}
            >
              {tr("Պատվիրել հիմա")}
            </Link>
          </nav>
          <div className="shared-controls">
            <Link
              to="/"
              hash="pricing"
              className="header-order header-compact-order"
              onClick={() => setOpen(false)}
            >
              {tr("Պատվիրել հիմա")}
            </Link>
            <div className="header-languages" role="group" aria-label={tr("Կայքի լեզուն")}>
              {languages.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => setLanguage(language.code)}
                  aria-pressed={activeLanguage === language.code}
                  aria-label={language.name}
                  title={language.name}
                >
                  {language.label}
                </button>
              ))}
            </div>
            <button
              className="shared-burger"
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={tr(open ? "Փակել ցանկը" : "Բացել ցանկը")}
              aria-expanded={open}
              aria-controls="main-navigation"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

const headerStyles = `
:root{--site-header-height:72px}html{scroll-padding-top:calc(var(--site-header-height) + 16px);scroll-behavior:smooth}
.shared-header{position:sticky;top:0;z-index:100;background:rgba(250,250,248,.94);backdrop-filter:blur(14px) saturate(140%);-webkit-backdrop-filter:blur(14px) saturate(140%);border-bottom:1px solid rgba(0,0,0,.04)}
.shared-container{max-width:1280px;margin:0 auto;padding:0 24px}.shared-nav{display:flex;align-items:center;justify-content:space-between;height:72px;gap:16px}.shared-logo{display:flex;align-items:center;text-decoration:none;flex-shrink:0}.shared-logo-img{height:36px;width:auto;display:block}.shared-menu{display:flex;align-items:center;gap:2px}.shared-menu a{text-decoration:none;color:#555;font-size:12px;font-weight:500;padding:8px 9px;border-radius:10px;white-space:nowrap}.shared-menu a:hover,.shared-menu a.is-current{color:#0f0f10;background:rgba(0,0,0,.04)}.shared-controls{display:flex;align-items:center;gap:12px}.shared-menu .header-order,.header-order{display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:10px 15px;border-radius:10px;background:#0f0f10;color:#fff;text-decoration:none;font-size:12px;white-space:nowrap}.shared-menu .header-order:hover,.header-order:hover{background:#29292c;color:#fff}.shared-controls .header-compact-order{display:none}.header-languages{display:flex;align-items:center;gap:3px}.header-languages button{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4px;min-width:27px;min-height:38px;border:0;background:none;color:#181818;font:600 10px/1.5 system-ui}.header-languages button[aria-pressed=true]{border-bottom:1px solid #79715e}.header-languages button:disabled{color:#98958c;cursor:default}.header-languages small{font-size:6px;font-weight:400}.shared-burger{display:none;flex-direction:column;justify-content:center;gap:5px;width:40px;height:42px;background:transparent;border:none;cursor:pointer;padding:8px}.shared-burger span{display:block;width:100%;height:2px;background:#0f0f10;border-radius:2px}.shared-header :focus-visible{outline:2px solid #977541;outline-offset:3px}
@media(max-width:1200px){.shared-container{padding:0 18px}.shared-nav{gap:10px}.shared-menu{display:none;position:fixed;inset:72px 0 auto 0;background:rgba(250,250,248,.99);backdrop-filter:blur(14px);flex-direction:column;align-items:stretch;padding:18px 24px 28px;gap:4px;border-bottom:1px solid #0001;max-height:calc(100dvh - 72px);overflow-y:auto}.shared-menu.open{display:flex}.shared-menu a{padding:12px 16px;font-size:15px}.shared-menu .header-order{margin-top:8px}.shared-controls .header-compact-order{display:inline-flex;font-size:10px;min-height:36px;padding:8px 10px}.shared-burger{display:flex}.shared-controls{gap:7px}.header-languages{gap:1px}.header-languages button{min-width:24px}.shared-logo-img{height:34px}}
@media(max-width:375px){.shared-container{padding:0 12px}.shared-controls{gap:3px}.header-languages button{min-width:22px;font-size:9px}.shared-controls .header-compact-order{font-size:9px;padding-inline:8px}.shared-burger{width:35px}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
`;
