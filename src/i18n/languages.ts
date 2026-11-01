/** Armenian is the only published locale. Marketing translations are not generated. */
export const languages = [
  { code: "hy", label: "HY", name: "Հայերեն", available: true },
  { code: "ru", label: "RU", name: "Русский", available: false },
  { code: "en", label: "EN", name: "English", available: false },
] as const;
export const defaultLanguage = "hy";
