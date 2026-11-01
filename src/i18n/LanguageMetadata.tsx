import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { useTranslation } from "./LanguageProvider";
import { SITE_TITLE, SITE_DESCRIPTION, SHARE_DESCRIPTION, faqSchema } from "@/lib/seo";
import { faqs } from "@/data/faq";

/** Existing public URLs and Armenian prerendered SEO remain intact. */
export function LanguageMetadata() {
  const { language, tr } = useTranslation();
  const pathname = useLocation({ select: (location) => location.pathname });
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const isCorporate = pathname === "/corporate" || pathname === "/corporate/";
      const isCatalogue = /^\/templates\/?$/.test(pathname);
      const code = pathname.match(/^\/templates\/(\d{3})\/?$/)?.[1];
      const title = code
        ? `${tr(`Թեմփլեյթ #${code}`)} — uInvite`
        : tr(
            isCorporate
              ? "Կորպորատիվ առաջարկ — uInvite"
              : isCatalogue
                ? "Տեսականի — 80 վեբ հրավիրատոմսերի ձևանմուշ | uInvite"
                : SITE_TITLE,
          );
      const description = tr(
        isCorporate
          ? "Համագործակցություն հարսանյաց սրահների, միջոցառումների կազմակերպիչների և այլ գործընկերների հետ՝ էլեկտրոնային հրավիրատոմսերի պատրաստման համար։"
          : isCatalogue
            ? "Դիտեք uInvite-ի ամբողջ տեսականին՝ հարսանիք, նշանադրություն, կնունք, ծնունդ, մանկական, ամանորյա և կորպորատիվ վեբ հրավիրատոմսեր՝ 4,900֏-ից։"
            : SITE_DESCRIPTION,
      );
      document.title = title;
      for (const [attribute, key, value] of [
        ["name", "description", description],
        ["property", "og:title", title],
        ["property", "og:description", isCorporate ? description : tr(SHARE_DESCRIPTION)],
        ["property", "og:locale", { hy: "hy_AM", ru: "ru_RU", en: "en_US" }[language]],
        ["name", "twitter:title", title],
        ["name", "twitter:description", isCorporate ? description : tr(SHARE_DESCRIPTION)],
      ])
        document.querySelector(`meta[${attribute}="${key}"]`)?.setAttribute("content", value);
      if (pathname === "/") {
        for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
          if (script.textContent?.includes('"FAQPage"'))
            script.textContent = JSON.stringify({
              ...faqSchema,
              inLanguage: language,
              mainEntity: faqs.map(({ q, a }) => ({
                "@type": "Question",
                name: tr(q),
                acceptedAnswer: { "@type": "Answer", text: tr(a) },
              })),
            });
        }
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [language, pathname, tr]);
  return null;
}
