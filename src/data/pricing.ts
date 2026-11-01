export type PackageGroup = "standart" | "premium";
export type PackageLevel = "start" | "classic" | "plus";
export type TemplateTier = `${PackageGroup}-${PackageLevel}`;

export const packageGroupLabels: Record<PackageGroup, string> = {
  standart: "Standart",
  premium: "Premium",
};

export const packageLevelLabels: Record<PackageLevel, string> = {
  start: "Start",
  classic: "Classic",
  plus: "Plus",
};

export const packageGroups: PackageGroup[] = ["standart", "premium"];
export const packageLevels: PackageLevel[] = ["start", "classic", "plus"];

export const tierPrices: Record<TemplateTier, string> = {
  "standart-start": "4,900 ֏",
  "standart-classic": "6,900 ֏",
  "standart-plus": "10,900 ֏",
  "premium-start": "15,900 ֏",
  "premium-classic": "21,900 ֏",
  "premium-plus": "28,900 ֏",
};

export const tierLabels: Record<TemplateTier, string> = {
  "standart-start": "Standart · Start",
  "standart-classic": "Standart · Classic",
  "standart-plus": "Standart · Plus",
  "premium-start": "Premium · Start",
  "premium-classic": "Premium · Classic",
  "premium-plus": "Premium · Plus",
};
