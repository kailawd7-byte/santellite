"use client";

import { useEffect } from "react";

/**
 * ScrollRevealProvider
 * Handles silky bidirectional scroll animations (scrolling down and scrolling up)
 * for elements marked with .reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale.
 */
export default function ScrollRevealProvider() {
  useEffect(() => {
    // Check if IntersectionObserver is supported
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      // Fallback: make everything visible immediately
      document
        .querySelectorAll(".reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale")
        .forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            // Disparition dynamique pour re-déclencher l'animation au scroll inverse (haut / bas)
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const elements = document.querySelectorAll(
      ".reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale"
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
