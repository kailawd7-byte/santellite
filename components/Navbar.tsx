"use client";

import React, { useState, useEffect } from "react";
import { Orbit, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Le Défi NASA", href: "#defi" },
    { label: "6 Équipements", href: "#equipements" },
    { label: "Architecture", href: "#architecture" },
    { label: "Tableau de bord", href: "/dashboard.html", highlight: true },
    { label: "Aperçu IA", href: "#simulateur" },
    { label: "Données NASA", href: "#donnees" },
    { label: "Équipe 404", href: "#equipe" },
  ];

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#06080F]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)] py-3"
          : "bg-transparent border-b border-white/[0.04] py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#accueil" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-white to-slate-300 flex items-center justify-center text-slate-950 shadow-md group-hover:scale-105 transition-transform">
            <Orbit className="w-4 h-4 text-slate-950" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-white flex items-center gap-1 font-mono">
              Santellite<span className="text-sky-400">.</span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase -mt-0.5">
              NASA Space Apps 2026
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                link.highlight
                  ? "text-white font-semibold hover:text-sky-300"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {link.highlight && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              )}
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button right (Apple-style luminous white pill) */}
        <div className="hidden lg:flex items-center">
          <a
            href="/dashboard.html"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-mono text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95"
          >
            <span>Tableau de bord</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#06080F]/95 border-b border-white/10 px-4 pt-3 pb-6 space-y-3 backdrop-blur-2xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block py-2 text-sm font-mono uppercase tracking-wider transition-colors ${
                link.highlight
                  ? "text-white font-bold flex items-center gap-2"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {link.highlight && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              )}
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="/dashboard.html"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white text-slate-950 font-mono text-xs font-semibold uppercase tracking-wider shadow-md"
            >
              <span>Ouvrir Tableau de bord</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
