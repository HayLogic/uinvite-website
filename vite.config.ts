import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Keep standalone invitation index.html files separate from their React viewers.
const codes = Array.from({ length: 80 }, (_, i) => String(i + 1).padStart(3, "0"));
export default defineConfig({
  tanstackStart: {
    spa: { enabled: false },
    prerender: {
      enabled: true,
      crawlLinks: false,
      autoStaticPathsDiscovery: false,
      concurrency: 2,
      failOnError: true,
      retryCount: 0,
    },
    sitemap: { enabled: false },
    pages: [
      { path: "/", prerender: { outputPath: "/index.html", autoSubfolderIndex: false } },
      {
        path: "/templates",
        prerender: { outputPath: "/templates/index.html", autoSubfolderIndex: false },
      },
      {
        path: "/corporate",
        prerender: { outputPath: "/corporate/index.html", autoSubfolderIndex: false },
      },
      ...codes.map((code) => ({
        path: `/templates/${code}`,
        prerender: { outputPath: `/templates/${code}.html`, autoSubfolderIndex: false },
      })),
    ],
    server: { entry: "server" },
  },
});
