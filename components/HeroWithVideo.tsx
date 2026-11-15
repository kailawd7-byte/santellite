"use client";

import React from "react";
import { ArrowUpRight, Activity } from "lucide-react";

export default function HeroWithVideo() {
  const partners = [
    { label: "NASA Space Apps 2026", sub: "Challenge International" },
    { label: "Libreville, Gabon", sub: "Site Local Officiel" },
    { label: "Agence Spatiale Canadienne (ASC)", sub: "Astroskin Flight Heritage" },
    { label: "Carré Technologies", sub: "Capteurs Biomédicaux" },
    { label: "Empatica EmbracePlus", sub: "Recherche Spatiale NASA / TRISH" },
  ];

  return (
    <section id="accueil" className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Graphic : HD Space Earth Orbital Sunrise with City Lights */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/hero-earth-sunrise-space.webp"
          alt="Vue orbitale de la Terre depuis l'espace au lever du soleil"
          className="w-full h-full object-cover object-[center_35%] scale-105 transition-transform duration-1000 ease-out brightness-105 contrast-110"
        />
        {/* Gradients to blend smoothly with header and provide WCAG AAA text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070D]/85 via-[#05070D]/45 to-[#05070D]"></div>
        {/* Subtle auroral/solar neon cyan glow centered on Earth limb */}
        <div 
          className="absolute inset-0 opacity-35 mix-blend-screen pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 32%, rgba(0, 229, 255, 0.35) 0%, rgba(14, 165, 233, 0.15) 38%, transparent 70%)`
          }}
        ></div>
        {/* Fine coordinate grid */}
        <div className="absolute inset-0 space-grid-pattern opacity-20 pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 sm:pt-16 pb-12">
        {/* Small subtle badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-blue-500/15 border border-blue-400/30 text-cyan-300 mb-6 backdrop-blur-md">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>NASA Space Apps Challenge 2026 • Libreville</span>
        </div>

        {/* Large Centered Headline (Kubeva Typography Style) */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-mono font-extrabold tracking-tight text-white leading-[1.08] uppercase mb-6 drop-shadow-md">
          Surveillance Continue. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white">
            Santé Spatiale en Temps Réel.
          </span>
        </h1>

        {/* Centered Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-200/90 font-normal leading-relaxed mb-10">
          Plateforme médicale autonome connectée au maillot biométrique <strong>Astroskin</strong> et à la montre spatiale <strong>EmbracePlus</strong> pour surveiller la santé des astronautes 24/7 en microgravité et anticiper les urgences sans latence Terre.
        </p>

        {/* Two Action Buttons (Mockup: Dark Button + White Button) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <a
            href="#simulateur"
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-slate-900/90 hover:bg-slate-950 text-white font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider border border-white/20 hover:border-cyan-400 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            Lancer le Simulateur <ArrowUpRight className="w-4 h-4 text-cyan-400" />
          </a>
          <a
            href="#equipements"
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-white hover:bg-slate-100 text-slate-950 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2"
          >
            Voir les Équipements
          </a>
        </div>
      </div>

      {/* PARTNERS / TRUSTED BY BAR (Matching Kubeva Mockup with Crosshairs and Borders) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="relative border-y border-white/10 py-6 bg-black/40 backdrop-blur-md">
          {/* Top-left, top-right, bottom-left, bottom-right crosshairs */}
          <span className="absolute -top-2 -left-2 text-white/30 font-mono text-xs">+</span>
          <span className="absolute -top-2 -right-2 text-white/30 font-mono text-xs">+</span>
          <span className="absolute -bottom-2 -left-2 text-white/30 font-mono text-xs">+</span>
          <span className="absolute -bottom-2 -right-2 text-white/30 font-mono text-xs">+</span>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400 shrink-0 font-semibold border-b md:border-b-0 md:border-r border-white/10 pb-2 md:pb-0 md:pr-6">
              Standards & Références
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex items-center justify-between gap-6 w-full text-center md:text-left">
              {partners.map((p) => (
                <div key={p.label} className="flex flex-col">
                  <span className="text-xs sm:text-sm font-mono font-bold text-slate-200 tracking-wide uppercase">
                    {p.label}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    {p.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
