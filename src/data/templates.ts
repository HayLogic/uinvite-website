import t001 from "@/assets/templateImages/001.webp";
import t002 from "@/assets/templateImages/002.webp";
import t003 from "@/assets/templateImages/003.webp";
import t004 from "@/assets/templateImages/004.webp";
import t005 from "@/assets/templateImages/005.webp";
import t006 from "@/assets/templateImages/006.webp";
import t007 from "@/assets/templateImages/007.webp";
import t008 from "@/assets/templateImages/008.webp";
import t009 from "@/assets/templateImages/009.webp";
import t010 from "@/assets/templateImages/010.webp";
import t011 from "@/assets/templateImages/011.webp";
import t012 from "@/assets/templateImages/012.webp";
import t013 from "@/assets/templateImages/013.webp";
import t014 from "@/assets/templateImages/014.webp";
import t015 from "@/assets/templateImages/015.webp";
import t016 from "@/assets/templateImages/016.webp";
import t017 from "@/assets/templateImages/017.webp";
import t018 from "@/assets/templateImages/018.webp";
import t019 from "@/assets/templateImages/019.webp";
import t020 from "@/assets/templateImages/020.webp";
import t021 from "@/assets/templateImages/021.webp";
import t022 from "@/assets/templateImages/022.webp";
import t023 from "@/assets/templateImages/023.webp";
import t024 from "@/assets/templateImages/024.webp";
import t025 from "@/assets/templateImages/025.webp";
import t026 from "@/assets/templateImages/026.webp";
import t027 from "@/assets/templateImages/027.webp";
import t028 from "@/assets/templateImages/028.webp";
import t029 from "@/assets/templateImages/029.webp";
import t030 from "@/assets/templateImages/030.webp";
import t031 from "@/assets/templateImages/031.webp";
import t032 from "@/assets/templateImages/032.webp";
import t033 from "@/assets/templateImages/033.webp";
import t034 from "@/assets/templateImages/034.webp";
import t035 from "@/assets/templateImages/035.webp";
import t036 from "@/assets/templateImages/036.webp";
import t037 from "@/assets/templateImages/037.webp";
import t038 from "@/assets/templateImages/038.webp";
import t039 from "@/assets/templateImages/039.webp";
import t040 from "@/assets/templateImages/040.webp";
import t041 from "@/assets/templateImages/041.webp";
import t042 from "@/assets/templateImages/042.webp";
import t043 from "@/assets/templateImages/043.webp";
import t044 from "@/assets/templateImages/044.webp";
import t045 from "@/assets/templateImages/045.webp";
import t046 from "@/assets/templateImages/046.webp";
import t047 from "@/assets/templateImages/047.webp";
import t048 from "@/assets/templateImages/048.webp";
import t049 from "@/assets/templateImages/049.webp";
import t050 from "@/assets/templateImages/050.webp";
import t051 from "@/assets/templateImages/051.webp";
import t052 from "@/assets/templateImages/052.webp";
import t053 from "@/assets/templateImages/053.webp";
import t054 from "@/assets/templateImages/054.webp";
import t055 from "@/assets/templateImages/055.webp";
import t056 from "@/assets/templateImages/056.webp";
import t057 from "@/assets/templateImages/057.webp";
import t058 from "@/assets/templateImages/058.webp";
import t059 from "@/assets/templateImages/059.webp";
import t060 from "@/assets/templateImages/060.webp";
import t061 from "@/assets/templateImages/061.webp";
import t062 from "@/assets/templateImages/062.webp";

export type TemplateCategory =
  | "wedding"
  | "engagement"
  | "birthday"
  | "childrens"
  | "baptism"
  | "new-year"
  | "commercial"
  | "other";

export type TemplateTier = "start" | "plus" | "premium" | "vip";

export type TemplateBadge =
  | "top"
  | "discount"
  | "new"
  | "gift-music";

export const tierPrices: Record<TemplateTier, string> = {
  start: "4,900 ֏",
  plus: "6,900 ֏",
  premium: "9,900 ֏",
  vip: "11,900 ֏",
};

export const tierLabels: Record<TemplateTier, string> = {
  start: "Start",
  plus: "Plus",
  premium: "Premium",
  vip: "VIP",
};

export interface Template {
  code: string;
  price: string;
  image: string;
  category: TemplateCategory;
  tier: TemplateTier;
  badges: TemplateBadge[];
  discountTo?: TemplateTier;
  discountUntil?: string;
}

type BaseTemplate = Omit<Template, "price">;

const baseTemplates: BaseTemplate[] = [
  { code: "001", image: t001, category: "wedding", tier: "vip", badges: [] },
  { code: "002", image: t002, category: "childrens", tier: "start", badges: ["gift-music"] },
  { code: "003", image: t003, category: "commercial", tier: "vip", badges: [] },
  { code: "004", image: t004, category: "birthday", tier: "start", badges: [] },
  { code: "005", image: t005, category: "other", tier: "start", badges: [] },
  { code: "006", image: t006, category: "commercial", tier: "vip", badges: [] },
  { code: "007", image: t007, category: "wedding", tier: "premium", badges: ["discount"], discountUntil: "2026-10-10" },
  { code: "008", image: t008, category: "baptism", tier: "start", badges: [] },
  { code: "009", image: t009, category: "other", tier: "start", badges: [] },
  { code: "010", image: t010, category: "wedding", tier: "vip", badges: [] },
  { code: "011", image: t011, category: "birthday", tier: "plus", badges: [] },
  { code: "012", image: t012, category: "commercial", tier: "vip", badges: [] },
  { code: "013", image: t013, category: "baptism", tier: "plus", badges: [] },
  { code: "014", image: t014, category: "wedding", tier: "plus", badges: ["gift-music"] },
  { code: "015", image: t015, category: "other", tier: "plus", badges: [] },
  { code: "016", image: t016, category: "birthday", tier: "premium", badges: [] },
  { code: "017", image: t017, category: "wedding", tier: "premium", badges: [] },
  { code: "018", image: t018, category: "baptism", tier: "premium", badges: [] },
  { code: "019", image: t019, category: "birthday", tier: "vip", badges: [] },
  { code: "020", image: t020, category: "commercial", tier: "vip", badges: [] },
  { code: "021", image: t021, category: "wedding", tier: "vip", badges: [] },
  { code: "022", image: t022, category: "wedding", tier: "vip", badges: [] },
  { code: "023", image: t023, category: "other", tier: "plus", badges: [] },
  { code: "024", image: t024, category: "baptism", tier: "premium", badges: [] },
  { code: "025", image: t025, category: "other", tier: "vip", badges: [] },
  { code: "026", image: t026, category: "other", tier: "vip", badges: [] },
  { code: "027", image: t027, category: "wedding", tier: "premium", badges: [] },
  { code: "028", image: t028, category: "wedding", tier: "premium", badges: [] },
  { code: "029", image: t029, category: "commercial", tier: "vip", badges: [] },
  { code: "030", image: t030, category: "baptism", tier: "premium", badges: [] },
  { code: "031", image: t031, category: "commercial", tier: "vip", badges: [] },
  { code: "032", image: t032, category: "wedding", tier: "plus", badges: [] },
  { code: "033", image: t033, category: "birthday", tier: "start", badges: [] },
  { code: "034", image: t034, category: "wedding", tier: "start", badges: ["gift-music"] },
  { code: "035", image: t035, category: "wedding", tier: "vip", badges: ["top"] },
  { code: "036", image: t036, category: "wedding", tier: "vip", badges: ["discount"], discountUntil: "2026-10-10" },
  { code: "037", image: t037, category: "baptism", tier: "premium", badges: ["discount"], discountUntil: "2026-10-10" },
  { code: "038", image: t038, category: "wedding", tier: "vip", badges: [] },
  { code: "039", image: t039, category: "birthday", tier: "plus", badges: [] },
  { code: "040", image: t040, category: "other", tier: "vip", badges: [] },
  { code: "041", image: t041, category: "childrens", tier: "start", badges: ["gift-music"] },
  { code: "042", image: t042, category: "childrens", tier: "start", badges: ["gift-music"] },
  { code: "043", image: t043, category: "childrens", tier: "start", badges: ["gift-music"] },
  { code: "044", image: t044, category: "childrens", tier: "start", badges: ["gift-music"] },
  { code: "045", image: t045, category: "childrens", tier: "start", badges: ["gift-music"] },
  { code: "046", image: t046, category: "childrens", tier: "start", badges: ["gift-music"] },
  { code: "047", image: t047, category: "childrens", tier: "start", badges: ["gift-music"] },
  { code: "048", image: t048, category: "childrens", tier: "start", badges: ["gift-music"] },
  { code: "049", image: t049, category: "childrens", tier: "start", badges: ["gift-music"] },
  { code: "050", image: t050, category: "childrens", tier: "start", badges: ["gift-music"] },
  { code: "051", image: t051, category: "childrens", tier: "start", badges: ["gift-music"] },
  { code: "052", image: t052, category: "childrens", tier: "start", badges: ["gift-music"] },
  { code: "053", image: t053, category: "birthday", tier: "plus", badges: ["new"] },
  { code: "054", image: t054, category: "wedding", tier: "vip", badges: ["new"] },
  { code: "055", image: t055, category: "wedding", tier: "start", badges: ["top"] },
  { code: "056", image: t056, category: "wedding", tier: "premium", badges: ["new"] },
  { code: "057", image: t057, category: "wedding", tier: "vip", badges: ["discount"], discountUntil: "2026-10-10" },
  { code: "058", image: t058, category: "birthday", tier: "plus", badges: ["new"] },
  { code: "059", image: t059, category: "engagement", tier: "plus", badges: ["discount"], discountUntil: "2026-10-10" },
  { code: "060", image: t060, category: "engagement", tier: "premium", badges: ["discount"], discountUntil: "2026-10-10" },
  { code: "061", image: t061, category: "baptism", tier: "premium", badges: ["new"] },
  { code: "062", image: t062, category: "baptism", tier: "premium", badges: ["new"] },
];

const discountPrices: Record<string, string> = {
  "007": tierPrices.plus,
  "036": tierPrices.premium,
  "037": tierPrices.plus,
  "057": tierPrices.premium,
  "059": tierPrices.start,
  "060": tierPrices.plus,
};

const raw: Template[] = baseTemplates.map((t) => ({
  ...t,
  price: discountPrices[t.code] ?? tierPrices[t.tier],
}));

const badgePriority: Record<TemplateBadge, number> = {
  top: 1,
  discount: 2,
  new: 3,
  "gift-music": 4,
};

function badgeRank(t: Template): number {
  if (!t.badges.length) return 99;
  return Math.min(...t.badges.map((b) => badgePriority[b]));
}

export const templates: Template[] = [...raw].sort((a, b) => {
  const rank = badgeRank(a) - badgeRank(b);
  if (rank !== 0) return rank;
  return Number(b.code) - Number(a.code);
});

export function orderTemplates(list: Template[]): Template[] {
  return [...list].sort((a, b) => {
    const rank = badgeRank(a) - badgeRank(b);
    if (rank !== 0) return rank;
    return Number(b.code) - Number(a.code);
  });
}

export const categoryLabels: Record<TemplateCategory, string> = {
  wedding: "Հարսանիք",
  engagement: "Նշանադրություն",
  birthday: "Ծնունդ",
  childrens: "Մանկական",
  baptism: "Կնունք",
  "new-year": "Նոր տարի",
  commercial: "Կոմերցիոն",
  other: "Այլ",
};

export const badgeLabels: Record<TemplateBadge, string> = {
  top: "TOP",
  discount: "Զեղչ",
  new: "Նոր",
  "gift-music": "Նվեր Երաժշտություն",
};

export const WHATSAPP_URL = "https://wa.me/37477198238";

export function getTemplate(code: string): Template | undefined {
  return raw.find((t) => t.code === code);
}
