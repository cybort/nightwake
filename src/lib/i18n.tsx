import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "zh";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; tx: (en: string, zh: string) => string };

const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("nw-lang");
    if (saved === "en" || saved === "zh") {
      setLangState(saved);
      return;
    }
    if (navigator.language.toLowerCase().startsWith("zh")) setLangState("zh");
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("nw-lang", l);
    document.documentElement.lang = l === "zh" ? "zh-CN" : "en";
  };

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      tx: (en, zh) => (lang === "zh" ? zh : en),
    }),
    [lang],
  );

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang outside provider");
  return ctx;
}
