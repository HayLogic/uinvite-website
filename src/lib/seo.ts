import { faqs } from "@/data/faq";
export const SITE_URL = "https://uinvite.am";
export const SITE_TITLE = "uInvite — Էլեկտրոնային հրավիրատոմսեր";
export const SITE_DESCRIPTION =
  "Ստեղծեք գեղեցիկ էլեկտրոնային հրավիրատոմսեր հարսանիքի, նշանադրության, կնունքի, ծննդյան և այլ առիթների համար։";
export const SHARE_DESCRIPTION = "Գեղեցիկ էլեկտրոնային հրավիրատոմսեր ցանկացած առիթի համար։";
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "uInvite",
  url: SITE_URL + "/",
  logo: SITE_URL + "/apple-touch-icon.png",
  telephone: "+37477198238",
  email: "info@uinvite.am",
};
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};
export function siteMeta(pathname: string) {
  const canonical = new URL(pathname === "/" ? "/" : pathname.replace(/\/$/, ""), SITE_URL).href;
  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "author", content: "uInvite" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "uInvite" },
      { property: "og:locale", content: "hy_AM" },
      { property: "og:url", content: canonical },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SHARE_DESCRIPTION },
      { property: "og:image", content: SITE_URL + "/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "uInvite — էլեկտրոնային հրավիրատոմսեր" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SHARE_DESCRIPTION },
      { name: "twitter:image", content: SITE_URL + "/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: canonical },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    ],
  };
}
