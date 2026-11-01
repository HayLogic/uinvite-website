export const languages = [
  { code: "hy", label: "HY", name: "Հայերեն" },
  { code: "ru", label: "RU", name: "Русский" },
  { code: "en", label: "EN", name: "English" },
] as const;
export type Language = (typeof languages)[number]["code"];
export const defaultLanguage: Language = "hy";
export function isLanguage(value: unknown): value is Language {
  return languages.some((language) => language.code === value);
}
