// Imported from the owner-provided uinvite_templates_001_080.xlsx.
// Catalogue publication is controlled separately by catalogueImages in templates.ts.
import type { TemplateTier } from "./pricing";
import type { TemplateCategory, TemplateBadge } from "./templates";
export interface TemplateAssignment {
  category: TemplateCategory;
  tier: TemplateTier;
  badges: TemplateBadge[];
  discountTo?: TemplateTier;
  discountUntil?: string;
  notes?: string;
}
export const templateAssignments: Record<string, TemplateAssignment> = {
  "001": {
    category: "wedding",
    tier: "standart-plus",
    badges: [],
  },
  "002": {
    category: "childrens",
    tier: "standart-start",
    badges: ["gift-music"],
  },
  "003": {
    category: "commercial",
    tier: "premium-plus",
    badges: [],
  },
  "004": {
    category: "birthday",
    tier: "standart-start",
    badges: [],
  },
  "005": {
    category: "other",
    tier: "standart-start",
    badges: [],
  },
  "006": {
    category: "commercial",
    tier: "premium-plus",
    badges: [],
  },
  "007": {
    category: "wedding",
    tier: "standart-classic",
    badges: [],
  },
  "008": {
    category: "baptism",
    tier: "standart-start",
    badges: [],
  },
  "009": {
    category: "other",
    tier: "standart-start",
    badges: [],
  },
  "010": {
    category: "wedding",
    tier: "standart-plus",
    badges: [],
  },
  "011": {
    category: "birthday",
    tier: "standart-classic",
    badges: [],
  },
  "012": {
    category: "commercial",
    tier: "standart-plus",
    badges: [],
  },
  "013": {
    category: "baptism",
    tier: "standart-classic",
    badges: [],
  },
  "014": {
    category: "wedding",
    tier: "standart-start",
    badges: ["gift-music"],
  },
  "015": {
    category: "other",
    tier: "standart-classic",
    badges: [],
  },
  "016": {
    category: "birthday",
    tier: "standart-plus",
    badges: [],
  },
  "017": {
    category: "wedding",
    tier: "standart-plus",
    badges: [],
  },
  "018": {
    category: "baptism",
    tier: "standart-plus",
    badges: [],
  },
  "019": {
    category: "birthday",
    tier: "standart-plus",
    badges: [],
  },
  "020": {
    category: "commercial",
    tier: "standart-plus",
    badges: [],
  },
  "021": {
    category: "wedding",
    tier: "standart-plus",
    badges: [],
  },
  "022": {
    category: "wedding",
    tier: "standart-plus",
    badges: [],
  },
  "023": {
    category: "other",
    tier: "standart-plus",
    badges: [],
  },
  "024": {
    category: "baptism",
    tier: "standart-plus",
    badges: [],
  },
  "025": {
    category: "other",
    tier: "standart-plus",
    badges: [],
  },
  "026": {
    category: "other",
    tier: "standart-plus",
    badges: [],
  },
  "027": {
    category: "wedding",
    tier: "standart-plus",
    badges: [],
  },
  "028": {
    category: "wedding",
    tier: "standart-plus",
    badges: [],
  },
  "029": {
    category: "commercial",
    tier: "standart-plus",
    badges: [],
  },
  "030": {
    category: "baptism",
    tier: "standart-plus",
    badges: [],
  },
  "031": {
    category: "commercial",
    tier: "standart-plus",
    badges: [],
  },
  "032": {
    category: "wedding",
    tier: "standart-classic",
    badges: [],
  },
  "033": {
    category: "birthday",
    tier: "standart-start",
    badges: [],
  },
  "034": {
    category: "wedding",
    tier: "standart-start",
    badges: ["gift-music"],
  },
  "035": {
    category: "wedding",
    tier: "standart-plus",
    badges: ["top"],
  },
  "036": {
    category: "wedding",
    tier: "standart-plus",
    badges: ["discount"],
    discountTo: "standart-classic",
    discountUntil: "2026-12-31",
  },
  "037": {
    category: "baptism",
    tier: "standart-classic",
    badges: ["discount"],
    discountTo: "standart-start",
    discountUntil: "2026-12-31",
  },
  "038": {
    category: "wedding",
    tier: "standart-plus",
    badges: [],
  },
  "039": {
    category: "birthday",
    tier: "standart-classic",
    badges: [],
  },
  "040": {
    category: "other",
    tier: "standart-plus",
    badges: [],
  },
  "041": {
    category: "childrens",
    tier: "standart-start",
    badges: ["gift-music"],
  },
  "042": {
    category: "childrens",
    tier: "standart-start",
    badges: ["gift-music"],
  },
  "043": {
    category: "childrens",
    tier: "standart-start",
    badges: ["gift-music"],
  },
  "044": {
    category: "childrens",
    tier: "standart-start",
    badges: ["gift-music"],
  },
  "045": {
    category: "childrens",
    tier: "standart-start",
    badges: ["gift-music"],
  },
  "046": {
    category: "childrens",
    tier: "standart-start",
    badges: ["gift-music"],
  },
  "047": {
    category: "childrens",
    tier: "standart-start",
    badges: ["gift-music"],
  },
  "048": {
    category: "childrens",
    tier: "standart-start",
    badges: ["gift-music"],
  },
  "049": {
    category: "childrens",
    tier: "standart-start",
    badges: ["gift-music"],
  },
  "050": {
    category: "childrens",
    tier: "standart-start",
    badges: ["gift-music"],
  },
  "051": {
    category: "childrens",
    tier: "standart-start",
    badges: ["gift-music"],
  },
  "052": {
    category: "childrens",
    tier: "standart-start",
    badges: ["gift-music"],
  },
  "053": {
    category: "birthday",
    tier: "standart-classic",
    badges: ["discount"],
    notes: "from classic to start till 31.12.2026",
    discountTo: "standart-start",
    discountUntil: "2026-12-31",
  },
  "054": {
    category: "wedding",
    tier: "standart-plus",
    badges: ["new"],
  },
  "055": {
    category: "wedding",
    tier: "standart-start",
    badges: ["top"],
  },
  "056": {
    category: "wedding",
    tier: "standart-plus",
    badges: ["new"],
    notes: "from Plus to classic till 31.12.2026",
    discountTo: "standart-classic",
    discountUntil: "2026-12-31",
  },
  "057": {
    category: "wedding",
    tier: "standart-plus",
    badges: ["discount"],
    discountTo: "standart-classic",
    discountUntil: "2026-12-31",
  },
  "058": {
    category: "birthday",
    tier: "standart-start",
    badges: ["new"],
  },
  "059": {
    category: "engagement",
    tier: "standart-classic",
    badges: ["discount"],
    notes: "from classic to start till 31.12.2026",
    discountTo: "standart-start",
    discountUntil: "2026-12-31",
  },
  "060": {
    category: "engagement",
    tier: "standart-classic",
    badges: ["top"],
  },
  "061": {
    category: "baptism",
    tier: "standart-plus",
    badges: ["new"],
    notes: "from Plus to classic till 31.12.2026",
    discountTo: "standart-classic",
    discountUntil: "2026-12-31",
  },
  "062": {
    category: "baptism",
    tier: "standart-plus",
    badges: ["new"],
    notes: "from Plus to classic till 31.12.2026",
    discountTo: "standart-classic",
    discountUntil: "2026-12-31",
  },
  "063": {
    category: "baptism",
    tier: "standart-plus",
    badges: ["new"],
  },
  "064": {
    category: "birthday",
    tier: "premium-start",
    badges: ["new"],
  },
  "065": {
    category: "other",
    tier: "standart-classic",
    badges: ["new"],
  },
  "066": {
    category: "other",
    tier: "standart-classic",
    badges: ["top"],
  },
  "067": {
    category: "other",
    tier: "standart-plus",
    badges: [],
  },
  "068": {
    category: "other",
    tier: "premium-plus",
    badges: ["top"],
  },
  "069": {
    category: "other",
    tier: "premium-classic",
    badges: ["new"],
  },
  "070": {
    category: "other",
    tier: "premium-start",
    badges: ["new"],
  },
  "071": {
    category: "other",
    tier: "premium-plus",
    badges: [],
  },
  "072": {
    category: "other",
    tier: "premium-classic",
    badges: [],
  },
  "073": {
    category: "other",
    tier: "premium-plus",
    badges: [],
  },
  "074": {
    category: "other",
    tier: "standart-plus",
    badges: [],
  },
  "075": {
    category: "other",
    tier: "standart-classic",
    badges: ["top"],
  },
  "076": {
    category: "other",
    tier: "premium-start",
    badges: [],
  },
  "077": {
    category: "wedding",
    tier: "standart-classic",
    badges: [],
  },
  "078": {
    category: "wedding",
    tier: "standart-classic",
    badges: [],
  },
  "079": {
    category: "baptism",
    tier: "standart-start",
    badges: [],
  },
  "080": {
    category: "birthday",
    tier: "standart-start",
    badges: [],
  },
};
