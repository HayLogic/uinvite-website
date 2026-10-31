import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import logoUrl from "@/assets/logo-full.png";

const NAV = [
  { id: "home", label: "Գլխավոր" },
  { id: "templates", label: "Տեսականի", to: "/templates" as const },
  { id: "pricing", label: "Փաթեթներ" },
  { id: "why", label: "Ինչու մենք" },
  { id: "steps", label: "Աշխատանքի փուլեր" },
  { id: "faq", label: "ՀՏՀ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const isHome = pathname === "/";

  return (
    <>
      <style>{headerStyles}</style>
      <header className="shared-header">
        <div className="shared-container shared-nav">
          <Link to="/" className="shared-logo">
            <img src={logoUrl} alt="uInvite" className="shared-logo-img" />
          </Link>
          <nav className={`shared-menu ${open ? "open" : ""}`}>
            {NAV.map((item) => {
              if (item.to) {
                return (
                  <Link
                    key={item.id}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    activeProps={{ className: "active" }}
                    activeOptions={{ exact: false }}
                  >
                    {item.label}
                  </Link>
                );
              }
              const href = isHome ? `#${item.id}` : `/#${item.id}`;
              return (
                <a
                  key={item.id}
                  href={href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <button
            className="shared-burger"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
    </>
  );
}

const headerStyles = `
.shared-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(250,250,248,0.88);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border-bottom: 1px solid rgba(0,0,0,0.04);
}
.shared-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.shared-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}
.shared-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}
.shared-logo-img {
  height: 36px;
  width: auto;
  display: block;
}
.shared-menu {
  display: flex;
  align-items: center;
  gap: 6px;
}
.shared-menu a {
  text-decoration: none;
  color: #555;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 10px;
  transition: all .2s;
  white-space: nowrap;
}
.shared-menu a:hover,
.shared-menu a.active {
  color: #0f0f10;
  background: rgba(0,0,0,0.04);
}
.shared-burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  width: 28px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}
.shared-burger span {
  display: block;
  width: 100%;
  height: 2px;
  background: #0f0f10;
  border-radius: 2px;
  transition: all .25s;
}
@media (max-width: 900px) {
  .shared-menu {
    position: fixed;
    inset: 72px 0 auto 0;
    background: rgba(250,250,248,0.98);
    backdrop-filter: blur(14px);
    flex-direction: column;
    align-items: stretch;
    padding: 20px 24px 32px;
    gap: 4px;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    transform: translateY(-10px);
    opacity: 0;
    pointer-events: none;
    transition: all .25s;
  }
  .shared-menu.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
  .shared-menu a {
    padding: 12px 16px;
    font-size: 16px;
    border-radius: 10px;
  }
  .shared-burger {
    display: flex;
  }
}
`;
