import { useTemplates } from "@/components/useTemplates";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
              categoryLabels[
                loaderData.template.category as TemplateCategory
              ]
            }, ${loaderData.template.price}։`,
          },
          {
            property: "og:title",
            content: `Թեմփլեյթ #${loaderData.template.code} — UInvite`,
          },
          {
            property: "og:image",
            content: new URL(loaderData.template.image, "https://uinvite.am").href,
          },
        ]
      : [],
  }),

  notFoundComponent: () => (
    <div style={{ padding: 48, textAlign: "center" }}>
      <h1>Թեմփլեյթը չի գտնվել</h1>
      <Link to="/templates">Վերադառնալ տեսականի</Link>
    </div>
  ),

  errorComponent: ({ error }) => (
    <div style={{ padding: 48, textAlign: "center" }}>
      <h1>Սխալ</h1>
      <p>{(error as Error).message}</p>
      <Link to="/templates">Վերադառնալ տեսականի</Link>
    </div>
  ),

  component: TemplateViewer,
});

function TemplateViewer() {
  const { template: initialTemplate } = Route.useLoaderData();
  const template = useTemplates([initialTemplate]).find(item => item.code === initialTemplate.code) ?? initialTemplate;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.body.classList.add("template-preview-mode");
    return () => {
      document.body.classList.remove("template-preview-mode");
    };
  }, []);

  const previewUrl = `/templates/${template.code}/index.html`;

  const orderMsg = encodeURIComponent(
    `Բարև Ձեզ! Ուզում եմ պատվիրել թեմփլեյթ #${template.code} (${categoryLabels[
      template.category as TemplateCategory
    ]}, ${tierLabels[template.tier]} — ${template.price})։`,
  );

  return (
    <div className="tv-page">
      <style>{styles}</style>

      <h1 className="sr-only">Հրավիրատոմս #{template.code}</h1>
      <main className="tv-preview">
        {!loaded && (
          <div className="tv-loader">
            <div className="tv-spinner" />
            <span>Բեռնվում է...</span>
          </div>
        )}

        <iframe
          src={previewUrl}
          title={`Թեմփլեյթ #${template.code}`}
          className="tv-frame"
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0 }}
        />
      </main>

      <div className="tv-bottom-bar">
        <a
          className="tv-action tv-order"
          href={`${WHATSAPP_URL}?text=${orderMsg}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={19} />
          <span>Պատվիրել</span>
        </a>

        <a className="tv-action tv-call" href="tel:+37477198238">
          <Phone size={19} />
          <span>Զանգել</span>
        </a>

        <Link className="tv-action tv-back" to="/templates">
          <ArrowLeft size={19} />
          <span>Հետ գնալ</span>
        </Link>
      </div>
    </div>
  );
}

const styles = `
.tv-page {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 520px;
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

.tv-bottom-bar {
  position: fixed;
  z-index: 20;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%);
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
  .tv-page {
    height: 100vh;
    min-height: 500px;
  }

  .tv-bottom-bar {
    bottom: 10px;
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

