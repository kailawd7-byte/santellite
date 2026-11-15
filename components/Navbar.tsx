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
    { label: "Équipements", href: "#equipements" },
    { label: "Architecture", href: "#architecture" },
    { label: "Tableau de bord", href: "/dashboard.html", highlight: true },
    { label: "Aperçu IA", href: "#simulateur" },
    { label: "Données NASA", href: "#donnees" },
    { label: "Équipe 404", href: "#equipe" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#05070D]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/50 py-3"
          : "bg-transparent border-b border-white/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo Kubeva-style */}
        <a href="#accueil" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Orbit className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1 font-mono">
              Santellite<span className="text-cyan-400">.</span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase -mt-1">
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
                  ? "text-cyan-400 font-bold hover:text-cyan-300"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {link.highlight && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              )}
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button right (matching GET STARTED ↗ from mockup) */}
        <div className="hidden lg:flex items-center">
          <a
            href="/dashboard.html"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all shadow-md shadow-blue-600/30 hover:shadow-blue-500/50"
          >
            Tableau de bord <ArrowUpRight className="w-3.5 h-3.5" />
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
        <div className="lg:hidden bg-[#05070D]/95 border-b border-white/10 px-4 pt-3 pb-6 space-y-3 backdrop-blur-xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block py-2 text-sm font-mono uppercase tracking-wider transition-colors ${
                link.highlight ? "text-cyan-400 font-bold" : "text-slate-300 hover:text-cyan-400"
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="/dashboard.html"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Tableau de bord <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
