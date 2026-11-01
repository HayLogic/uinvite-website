import categoryImages from "@/data/shareImages.json";
import type { TemplateCategory } from "@/data/templates";
import { SITE_URL } from "./seo";

export function templateShareImage(category: TemplateCategory, fallback: string) {
  const path = categoryImages[category as keyof typeof categoryImages] ?? fallback;
  return new URL(path, SITE_URL).href;
}
