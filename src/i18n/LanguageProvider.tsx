import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { defaultLanguage, isLanguage, type Language } from "./languages";
import { translate } from "./translate";
const STORAGE_KEY = "uinvite-language";
const LanguageContext = createContext({
  language: defaultLanguage,
  setLanguage: (_language: Language) => {},
  tr: <T,>(value: T): T => value,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // SSR and the first client render both use Armenian to preserve prerender hydration.
  const [language, updateLanguage] = useState<Language>(defaultLanguage);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isLanguage(saved)) updateLanguage(saved);
    } catch {
      /* Site remains usable if browser storage is unavailable. */
    }
    const sync = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && isLanguage(event.newValue)) updateLanguage(event.newValue);
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const setLanguage = useCallback((next: Language) => {
    updateLanguage(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Optional persistence. */
    }
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  const value = useMemo(
    () => ({ language, setLanguage, tr: <T,>(text: T) => translate(text, language) }),
    [language, setLanguage],
  );
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
// eslint-disable-next-line react-refresh/only-export-components -- Shared context hook; no module-level side effects.
export function useTranslation() {
  return useContext(LanguageContext);
}
