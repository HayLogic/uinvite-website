import { LanguageMetadata } from "@/i18n/LanguageMetadata";
import { LanguageProvider, useTranslation } from "@/i18n/LanguageProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { siteMeta, organizationSchema } from "@/lib/seo";
import { HashScroll } from "@/components/HashScroll";

function NotFoundComponent() {
  const { tr } = useTranslation();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{tr("Էջը չի գտնվել")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {tr("Ձեր փնտրած էջը գոյություն չունի կամ տեղափոխվել է։")}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {tr("Գլխավոր էջ")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  const { tr } = useTranslation();
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {tr("Էջը չի բեռնվել")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {tr("Տեղի է ունեցել սխալ։ Փորձեք կրկին կամ վերադարձեք գլխավոր էջ։")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {tr("Փորձել կրկին")}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {tr("Գլխավոր էջ")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: ({ matches }) => ({
    ...siteMeta(matches.at(-1)?.pathname ?? "/"),
    links: [
      ...siteMeta(matches.at(-1)?.pathname ?? "/").links,
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(organizationSchema) },
      {
        type: "text/javascript",
        children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1618523712545113');fbq('track','PageView');`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hy">
      <head>
        <HeadContent />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
        <Scripts />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1618523712545113&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}

import { Header } from "@/components/Header";

function MetaPixelTracker() {
  const location = useLocation();
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "PageView");
    }
  }, [location.pathname]);
  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useLocation({ select: (location) => location.pathname });
  const invitationOpen = /^\/templates\/\d{3}\/?$/.test(pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <MetaPixelTracker />
      <LanguageMetadata />
      {!invitationOpen && <Header />}
      <HashScroll />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
