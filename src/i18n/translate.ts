import messages from "./messages.json";
import type { Language } from "./languages";
const dictionary: Record<string, { ru: string; en: string }> = messages;

/** Translate site UI strings only. Invitation documents/iframes are never traversed. */
export function translate<T>(value: T, language: Language): T {
  if (typeof value !== "string" || language === "hy") return value;
  const key = value.replace(/\s+/g, " ").trim();
  let result = dictionary[key]?.[language];
  if (result === undefined) {
    const preview = key.match(/^(.+) հրավիրատոմսի նախադիտում՝ #(\d+)$/);
    const view = key.match(/^Դիտել թեմփլեյթ #(\d+)$/);
    const template = key.match(/^Թեմփլեյթ #(\d+)$/);
    const prices = key.match(/^Standart փաթեթները՝ (.+)։ Premium փաթեթները՝ (.+)։$/);
    if (preview)
      result =
        language === "ru"
          ? `Предпросмотр приглашения №${preview[2]} — ${translate(preview[1], language)}`
          : `${translate(preview[1], language)} invitation preview #${preview[2]}`;
    if (view)
      result = language === "ru" ? `Смотреть шаблон №${view[1]}` : `View template #${view[1]}`;
    if (template)
      result = language === "ru" ? `Шаблон №${template[1]}` : `Template #${template[1]}`;
    if (prices) {
      const and = language === "ru" ? " и " : " and ";
      result = `Standart: ${prices[1].replace(" և ", and)}. Premium: ${prices[2].replace(" և ", and)}.`;
    }
  }
  if (result === undefined) return value;
  return (value.match(/^\s*/)?.[0] + result + value.match(/\s*$/)?.[0]) as T;
}

export function orderMessage(
  language: Language,
  code: string,
  category: string,
  tier: string,
  price: string,
) {
  const details = `#${code} (${translate(category, language)}, ${tier} — ${price})`;
  if (language === "ru") return `Здравствуйте! Хочу заказать шаблон ${details}.`;
  if (language === "en") return `Hello! I would like to order template ${details}.`;
  return `Բարև Ձեզ! Ուզում եմ պատվիրել թեմփլեյթ ${details}։`;
}
