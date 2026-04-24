"use client";

import { useState, useEffect } from "react";

import en from "@/messages/en.json";
import fr from "@/messages/fr.json";

import type { Theme, Lang } from "./profile_type";
import BookmarksHeader from "@/public/component/bookmark/BookmarksHeader";

export default function Profile_page() {
  // ✅ initialize directly from localStorage (no flicker)
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("theme") as Theme) || "light";
  });

  const [language, setLanguage] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem("language") as Lang) || "en";
  });

  const messages: Record<Lang, typeof en> = {
    en,
    fr,
  };

  // persist theme + apply dark mode
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // persist language
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
      <BookmarksHeader item_header={t.Profile.title} item_description={t.Profile.description} />

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
