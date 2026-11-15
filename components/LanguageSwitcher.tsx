"use client";

import React, { useEffect, useState } from "react";
import { Globe } from "lucide-react";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<"en" | "fr">("en");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Detect existing language from googtrans cookie
    const match = document.cookie.match(/googtrans=\/en\/(fr|en)/);
    if (match && match[1] === "fr") {
      setCurrentLang("fr");
    } else {
      setCurrentLang("en");
    }

    // Set up Google Translate init callback
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,fr",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
        setIsLoaded(true);
      }
    };

    // Load Google Translate script if not already added
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }
  }, []);

  const changeLanguage = (lang: "en" | "fr") => {
    setCurrentLang(lang);

    // Set Google Translate cookie on domain and path
    const hostname = window.location.hostname;
    const cookieVal = `/en/${lang}`;

    document.cookie = `googtrans=${cookieVal}; path=/; domain=${hostname}`;
    document.cookie = `googtrans=${cookieVal}; path=/`;

    // Try finding Google's combo select to trigger translation without full reload
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    } else {
      // Reload so Google Translate applies cookie on load
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Sleek NASA-styled language toggle */}
      <div className="inline-flex items-center p-0.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-xs font-mono backdrop-blur-md">
        <button
          type="button"
          onClick={() => changeLanguage("en")}
          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
            currentLang === "en"
              ? "bg-white text-slate-950 shadow-[0_0_12px_rgba(255,255,255,0.25)]"
              : "text-slate-400 hover:text-white"
          }`}
          title="Official Language: English (Default)"
        >
          <span className="text-xs">🇺🇸</span>
          <span>EN</span>
        </button>

        <button
          type="button"
          onClick={() => changeLanguage("fr")}
          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
            currentLang === "fr"
              ? "bg-sky-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(56,189,248,0.4)]"
              : "text-slate-400 hover:text-white"
          }`}
          title="Translate to French via Google Translate"
        >
          <span className="text-xs">🇫🇷</span>
          <span>FR</span>
        </button>
      </div>

      {/* Google Translate container */}
      <div id="google_translate_element" className="opacity-0 pointer-events-none absolute w-0 h-0 overflow-hidden" />
    </div>
  );
}
