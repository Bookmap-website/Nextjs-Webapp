"use client";

import { useEffect, useState } from "react";

import en from "@/messages/en.json";
import fr from "@/messages/fr.json";

import type { Theme, Lang } from "./profile_type";

export default function Profile_page() {
  const [theme, setTheme] = useState<Theme>("light");
  const [language, setLanguage] = useState<Lang>("en");

  const messages: Record<Lang, typeof en> = {
    en,
    fr,
  };

  // Load saved settings (NO JSON.parse needed)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const savedLang = localStorage.getItem("language") as Lang | null;

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }

    if (savedLang === "en" || savedLang === "fr") {
      setLanguage(savedLang);
    }
  }, []);

  // Apply + persist theme
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Persist language
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = messages[language];

  return (
    <div
      className={`min-h-screen p-6 transition-colors ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6">{t.Profile.title}</h1>

      <h2 className="font-semibold mb-2">{t.Profile.theme}</h2>

      <div className="space-x-2 mb-6">
        <button onClick={() => setTheme("light")}>{t.Profile.light}</button>
        <button onClick={() => setTheme("dark")}>{t.Profile.dark}</button>
      </div>

      <h2 className="font-semibold mb-2">{t.Profile.language}</h2>

      <div className="space-x-2">
        <button onClick={() => setLanguage("en")}>EN</button>
        <button onClick={() => setLanguage("fr")}>FR</button>
      </div>
    </div>
  );
}
