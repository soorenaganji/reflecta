"use client";

import { createContext, useContext, useState } from "react";
import { translations } from "@/utils/translations";

const LanguageContext = createContext({
  lang: "en",
  setLang: () => {},
  t: (key) => translations.en[key] || key,
});

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  const t = (key) => translations[lang]?.[key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

