"use client";

import { useEffect, useState } from "react";

export default function Profile_page() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState<"en" | "fr">("en");

  // Load from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const savedLang = localStorage.getItem("language") as "en" | "fr" | null;

    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLanguage(savedLang);
  }, []);

  // Apply theme + persist
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Persist language
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <div>
      <h1>Profile</h1>

      <h2>Theme</h2>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>

      <h2>Language</h2>
      <button onClick={() => setLanguage("en")}>EN</button>
      <button onClick={() => setLanguage("fr")}>FR</button>
    </div>
  );
}