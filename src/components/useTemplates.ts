import { useEffect, useState } from "react";
import { getTemplates, getDiscountDeadline } from "@/data/templates";

/** Refresh prices at the Armenian discount deadline, even on an open tab. */
export function useTemplates() {
  const [items, setItems] = useState(() => getTemplates());
  useEffect(() => {
    const now = Date.now();
    const deadlines = items
      .flatMap((item) => (item.discountUntil ? [getDiscountDeadline(item.discountUntil)] : []))
      .filter((time) => time >= now);
    if (!deadlines.length) return;
    const timer = window.setTimeout(
      () => setItems(getTemplates()),
      Math.min(Math.min(...deadlines) - now + 20, 2_147_483_647),
    );
    return () => window.clearTimeout(timer);
  }, [items]);
  return items;
}
