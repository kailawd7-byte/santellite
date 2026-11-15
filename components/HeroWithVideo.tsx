"use client";

import React from "react";
import { ArrowUpRight, Activity } from "lucide-react";

export default function HeroWithVideo() {
  const partners = [
    { label: "NASA Space Apps 2026", sub: "Challenge International" },
    { label: "Libreville, Gabon", sub: "Site Local Officiel" },
    { label: "Agence Spatiale Canadienne", sub: "Astroskin Flight Heritage" },
    { label: "Empatica EmbracePlus", sub: "Recherche Spatiale NASA / TRISH" },
    { label: "NASA Ames & Condor Inst.", sub: "Actigraphie ARCHeR Artemis II" },
    { label: "NASA Human Research", sub: "Dosimétrie & Ultrasons REMS" },
  ];

  return (
    <section id="accueil" className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Graphic : Crystal Clear 2.7K Space Earth Orbital Sunrise */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/hero-earth-sunrise-space.webp"
          alt="Vue orbitale haute définition de la Terre depuis l'espace au lever du soleil"
          className="w-full h-full object-cover object-[center_35%] scale-105 transition-transform duration-1000 ease-out brightness-105 contrast-110"
        />
        {/* Soft, cinematic dark gradients for effortless WCAG AAA text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#040710]/85 via-[#040710]/40 to-transparent"></div>
        {/* Subtle atmospheric glow */}
        <div 
          className="absolute inset-0 opacity-25 mix-blend-screen pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.25) 0%, rgba(30, 64, 175, 0.1) 40%, transparent 70%)`
          }}
        ></div>
        {/* Fine space grid */}
        <div className="absolute inset-0 space-grid-pattern opacity-20 pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 sm:pt-16 pb-12">
        {/* Minimalist badge */}
        <div className="reveal-on-scroll inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.05] border border-white/[0.1] text-slate-300 mb-6 backdrop-blur-xl">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>NASA Space Apps Challenge 2026 • Libreville</span>
        </div>

        {/* Large Centered Headline with Apple-style metallic gradient */}
        <h1 className="reveal-on-scroll delay-100 text-4xl sm:text-6xl lg:text-7xl font-mono font-extrabold tracking-tight text-white leading-[1.08] uppercase mb-6 drop-shadow-md">
          Surveillance Continue. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400/80">
            Santé Spatiale en Temps Réel.
          </span>
        </h1>

        {/* Centered Subtitle */}
        <p className="reveal-on-scroll delay-200 max-w-3xl mx-auto text-base sm:text-lg text-slate-300/90 font-normal leading-relaxed mb-10">
          Plateforme clinique autonome interconnectant <strong className="text-white font-semibold">6 dispositifs spatiaux de pointe</strong> (maillot biométrique <strong>Astroskin</strong>, montre médicale <strong>EmbracePlus</strong>, actigraphes spatiaux <strong>Actiwatch / ActLumus Artemis II</strong>, dosimètre <strong>HRP</strong>, échographe <strong>REMS</strong> et <strong>biocapteurs</strong>) pour surveiller la santé des astronautes 24/7 en microgravité et anticiper les urgences sans latence Terre.
        </p>

        {/* Apple-style Action Buttons */}
        <div className="reveal-on-scroll delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <a
            href="/dashboard.html"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-95 flex items-center justify-center gap-2"
          >
            Lancer le Tableau de Bord <ArrowUpRight className="w-4 h-4 text-slate-950" />
          </a>
          <a
            href="#equipements"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.12] hover:border-white/[0.25] font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2 backdrop-blur-md"
          >
            Voir les 6 Équipements
          </a>
        </div>
      </div>

      {/* PARTNERS / TRUSTED BY BAR */}
      <div className="reveal-on-scroll delay-400 relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="relative border-y border-white/[0.08] py-6 bg-black/40 backdrop-blur-xl rounded-2xl">
          {/* Subtle Corner Markers */}
          <span className="absolute -top-1.5 -left-1 text-white/30 font-mono text-xs">+</span>
          <span className="absolute -top-1.5 -right-1 text-white/30 font-mono text-xs">+</span>
          <span className="absolute -bottom-1.5 -left-1 text-white/30 font-mono text-xs">+</span>
          <span className="absolute -bottom-1.5 -right-1 text-white/30 font-mono text-xs">+</span>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-6">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400 shrink-0 font-semibold border-b md:border-b-0 md:border-r border-white/10 pb-2 md:pb-0 md:pr-6">
              Standards Spatiaux
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
