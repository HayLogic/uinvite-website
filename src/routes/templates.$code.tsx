import { createPortal } from "react-dom";
import { templateShareImage } from "@/lib/share-image";
import { orderMessage } from "@/i18n/translate";
import { useTranslation } from "@/i18n/LanguageProvider";
import { useTemplates } from "@/components/useTemplates";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import {
  getTemplate,
  categoryLabels,
  tierLabels,
  WHATSAPP_URL,
  type TemplateCategory,
} from "@/data/templates";

export const Route = createFileRoute("/templates/$code")({
  loader: ({ params }) => {
    const t = getTemplate(params.code);
    if (!t) throw notFound();
    return { template: t };
  },

  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title: `Թեմփլեյթ #${loaderData.template.code} — UInvite`,
          },
          {
            name: "description",
            content: `Վեբ հրավիրատոմս #${loaderData.template.code}՝ ${
              categoryLabels[loaderData.template.category as TemplateCategory]
            }, ${loaderData.template.price}։`,
          },
          {
            property: "og:title",
            content: `Թեմփլեյթ #${loaderData.template.code} — UInvite`,
          },
          {
            property: "og:image",
            content: templateShareImage(loaderData.template.category, loaderData.template.image),
          },
          {
            name: "twitter:image",
            content: templateShareImage(loaderData.template.category, loaderData.template.image),
          },
        ]
      : [],
  }),

  notFoundComponent: () => (
    <div style={{ padding: 48, textAlign: "center" }}>
      <h1>
        <SiteText text="Թեմփլեյթը չի գտնվել" />
      </h1>
      <Link to="/templates">
        <SiteText text="Վերադառնալ տեսականի" />
      </Link>
    </div>
  ),

  errorComponent: ({ error }) => (
    <div style={{ padding: 48, textAlign: "center" }}>
      <h1>
        <SiteText text="Սխալ" />
      </h1>
      <p>{(error as Error).message}</p>
      <Link to="/templates">
        <SiteText text="Վերադառնալ տեսականի" />
      </Link>
    </div>
  ),

  component: TemplateViewer,
});

function TemplateViewer() {
  const { tr, language } = useTranslation();
  const { template: initialTemplate } = Route.useLoaderData();
  const template =
    useTemplates([initialTemplate]).find((item) => item.code === initialTemplate.code) ??
    initialTemplate;
  const [loadedCode, setLoadedCode] = useState<string | null>(null);
  const loaded = loadedCode === template.code;
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [footerHost, setFooterHost] = useState<HTMLElement | null>(null);
  useEffect(() => () => footerHost?.remove(), [footerHost]);

  useEffect(() => {
    document.body.classList.add("template-preview-mode");
    return () => {
      document.body.classList.remove("template-preview-mode");
    };
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const attachFooter = () => {
      const doc = frame.contentDocument;
      if (!doc?.body || doc.URL === "about:blank") return;
      let host = doc.querySelector<HTMLElement>("[data-uinvite-footer]");
      if (!host) {
        host = doc.createElement("div");
        host.dataset.uinviteFooter = "true";
        host.style.cssText =
          "display:block;position:relative;width:100%;clear:both;flex-shrink:0;grid-column:1/-1;z-index:10";
        doc.body.append(host);
      }
      setFooterHost(host);
      setLoadedCode(template.code);
    };
    frame.addEventListener("load", attachFooter);
    // Cached invitation documents can finish loading before React hydrates.
    if (frame.contentDocument?.readyState === "complete") attachFooter();
    return () => frame.removeEventListener("load", attachFooter);
  }, [template.code]);

  const previewUrl = `/templates/${template.code}/index.html`;

  const orderMsg = encodeURIComponent(
    orderMessage(
      language,
      template.code,
      categoryLabels[template.category],
      tierLabels[template.tier],
      template.price,
    ),
  );

  return (
    <div className="tv-page">
      <style>{styles}</style>

      <h1 className="sr-only">
        {tr("Հրավիրատոմս #")}
        {template.code}
      </h1>
      <main className="tv-preview">
        {!loaded && (
          <div className="tv-loader">
            <div className="tv-spinner" />
            <span>{tr("Բեռնվում է...")}</span>
          </div>
        )}

        <iframe
          ref={frameRef}
          key={template.code}
          src={previewUrl}
          title={tr(`Թեմփլեյթ #${template.code}`)}
          className="tv-frame"

          style={{ opacity: loaded ? 1 : 0 }}
        />
      </main>

      {footerHost &&
        createPortal(
          <>
            <style>{footerStyles}</style>
            <div className="tv-bottom-bar" role="navigation" aria-label={tr("Պատվիրել")}>
              <a
                className="tv-action tv-order"
                href={`${WHATSAPP_URL}?text=${orderMsg}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={19} />
                <span>{tr("Պատվիրել")}</span>
              </a>

              <a className="tv-action tv-call" href="tel:+37477198238">
                <Phone size={19} />
                <span>{tr("Զանգել")}</span>
              </a>

              <Link className="tv-action tv-back" to="/templates">
                <ArrowLeft size={19} />
                <span>{tr("Հետ գնալ")}</span>
              </Link>
            </div>
          </>,
          footerHost,
        )}
    </div>
  );
}

const styles = `
.tv-page {
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  background: #0f0f10;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.tv-preview {
  position: absolute;
  inset: 0;
  background: #0f0f10;
  overflow: hidden;
}

.tv-frame {
  width: 100%;
  height: 100%;
  display: block;
  border: 0;
  transition: opacity .3s ease;
}

.tv-loader {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 14px;
  color: rgba(255,255,255,.72);
  font-size: 14px;
  pointer-events: none;
}

.tv-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid rgba(255,255,255,.15);
  border-top-color: rgba(255,255,255,.85);
  border-radius: 50%;
  animation: tv-spin .8s linear infinite;
}

@keyframes tv-spin {
  to {
    transform: rotate(360deg);
  }
}

`;

const footerStyles = `

.tv-bottom-bar {
  position: relative;
  z-index: 20;
  margin: 24px auto;
  box-sizing: border-box;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  letter-spacing: normal;
  width: min(620px, calc(100% - 32px));
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
  background: rgba(255,255,255,.96);
  border: 1px solid rgba(0,0,0,.08);
  border-radius: 18px;
  box-shadow: 0 18px 50px rgba(0,0,0,.25);
  backdrop-filter: blur(14px);
}

.tv-action {
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px 14px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 750;
  text-decoration: none;
  cursor: pointer;
  transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
}

.tv-action:hover {
  transform: translateY(-2px);
}

.tv-order {
  background: #25d366;
  color: #fff;
}

.tv-order:hover {
  background: #1ebe5a;
  box-shadow: 0 8px 20px rgba(37,211,102,.25);
}

.tv-call {
  background: #0f0f10;
  color: #fff;
}

.tv-call:hover {
  background: #242426;
  box-shadow: 0 8px 20px rgba(15,15,16,.22);
}

.tv-back {
  background: #f3f4f6;
  color: #0f0f10;
}

.tv-back:hover {
  background: #e7e8eb;
}

@media (max-width: 640px) {
  .tv-bottom-bar {
    margin: 18px auto;
    width: calc(100% - 20px);
    gap: 7px;
    padding: 7px;
    border-radius: 15px;
  }

  .tv-action {
    min-height: 44px;
    padding: 10px 8px;
    gap: 5px;
    font-size: 12px;
    border-radius: 10px;
  }

  .tv-action svg {
    width: 17px;
    height: 17px;
  }
}

`;

function SiteText({ text }: { text: string }) {
  const { tr } = useTranslation();
  return <>{tr(text)}</>;
}
