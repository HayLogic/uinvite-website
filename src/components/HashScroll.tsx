import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

export function HashScroll() {
  const location = useLocation();
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".shared-header");
    const measure = () =>
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${header?.getBoundingClientRect().height ?? 72}px`,
      );
    measure();
    const observer = new ResizeObserver(measure);
    if (header) observer.observe(header);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (location.pathname !== "/") return;
    const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    const id = location.hash.replace(/^#/, "");
    let frame = 0,
      attempts = 0;
    const scroll = () => {
      if (!id) {
        window.scrollTo({ top: 0, behavior });
        return;
      }
      const target = document.getElementById(id);
      if (!target) {
        if (attempts++ < 60) frame = requestAnimationFrame(scroll);
        return;
      }
      const offset = document.querySelector(".shared-header")?.getBoundingClientRect().height ?? 72;
      window.scrollTo({
        top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset - 16),
        behavior,
      });
    };
    frame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frame);
  }, [location]);
  return null;
}
