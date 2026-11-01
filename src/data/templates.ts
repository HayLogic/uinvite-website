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

import t063 from "@/assets/templateImages/063.webp";
import t064 from "@/assets/templateImages/064.webp";
import t065 from "@/assets/templateImages/065.webp";
import t066 from "@/assets/templateImages/066.webp";
import t067 from "@/assets/templateImages/067.webp";
import t068 from "@/assets/templateImages/068.webp";
import t069 from "@/assets/templateImages/069.webp";
import t070 from "@/assets/templateImages/070.webp";
import t071 from "@/assets/templateImages/071.webp";
import t072 from "@/assets/templateImages/072.webp";
import t073 from "@/assets/templateImages/073.webp";
import t074 from "@/assets/templateImages/074.webp";
import t075 from "@/assets/templateImages/075.webp";
import t076 from "@/assets/templateImages/076.webp";
import t077 from "@/assets/templateImages/077.webp";
import t078 from "@/assets/templateImages/078.webp";
import t079 from "@/assets/templateImages/079.webp";
import t080 from "@/assets/templateImages/080.webp";

export type TemplateCategory =
  | "wedding"
  | "engagement"
  | "birthday"
  | "childrens"
  | "baptism"
  | "new-year"
  | "commercial"
  | "other";

export type { TemplateTier } from "./pricing";
export { tierPrices, tierLabels } from "./pricing";
import { tierPrices, type TemplateTier } from "./pricing";
import { templateAssignments } from "./templateAssignments";

export type TemplateBadge =
  | "top"
  | "discount"
  | "new"
  | "gift-music";

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

// All 001–080 cards are now published at the owner’s request.
const catalogueImages: Record<string, string> = {
  "001": t001,
  "002": t002,
  "003": t003,
  "004": t004,
  "005": t005,
  "006": t006,
  "007": t007,
  "008": t008,
  "009": t009,
  "010": t010,
  "011": t011,
  "012": t012,
  "013": t013,
  "014": t014,
  "015": t015,
  "016": t016,
  "017": t017,
  "018": t018,
  "019": t019,
  "020": t020,
  "021": t021,
  "022": t022,
  "023": t023,
  "024": t024,
  "025": t025,
  "026": t026,
  "027": t027,
  "028": t028,
  "029": t029,
  "030": t030,
  "031": t031,
  "032": t032,
  "033": t033,
  "034": t034,
  "035": t035,
  "036": t036,
  "037": t037,
  "038": t038,
  "039": t039,
  "040": t040,
  "041": t041,
  "042": t042,
  "043": t043,
  "044": t044,
  "045": t045,
  "046": t046,
  "047": t047,
  "048": t048,
  "049": t049,
  "050": t050,
  "051": t051,
  "052": t052,
  "053": t053,
  "054": t054,
  "055": t055,
  "056": t056,
  "057": t057,
  "058": t058,
  "059": t059,
  "060": t060,
  "061": t061,
  "062": t062,
  "063": t063,
  "064": t064,
  "065": t065,
  "066": t066,
  "067": t067,
  "068": t068,
  "069": t069,
  "070": t070,
  "071": t071,
  "072": t072,
  "073": t073,
  "074": t074,
  "075": t075,
  "076": t076,
  "077": t077,
  "078": t078,
  "079": t079,
  "080": t080,
};

export function getDiscountDeadline(until: string): number {
  return new Date(`${until}T23:59:59.999+04:00`).getTime();
}

export function getTemplates(now = Date.now()): Template[] {
  return orderTemplates(Object.entries(catalogueImages).map(([code, image]) => {
    const assignment = templateAssignments[code];
    const activeSale = Boolean(assignment.discountTo && assignment.discountUntil && now <= getDiscountDeadline(assignment.discountUntil));
    return {
      code, image, category: (Number(code) >= 67 && Number(code) <= 76 ? "new-year" : assignment.category) as TemplateCategory, tier: assignment.tier,
      badges: assignment.badges.filter((badge) => badge !== "discount" || activeSale),
      price: tierPrices[activeSale ? assignment.discountTo! : assignment.tier],
      ...(activeSale ? { discountTo: assignment.discountTo, discountUntil: assignment.discountUntil } : {}),
    };
  }));
}

export const templates: Template[] = getTemplates();

export function orderTemplates(list: Template[]): Template[] {
  return [...list].sort((a, b) => {
    const rank = Number(b.badges.includes("top")) - Number(a.badges.includes("top"));
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
  return getTemplates().find((t) => t.code === code);
}
