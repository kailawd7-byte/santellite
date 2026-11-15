"use client";

import React from "react";
import { Users, Heart } from "lucide-react";

export default function TeamSection() {
  const members = [
    {
      name: "Guy-Charles Junior KOUMBA M.",
      initials: "GK",
    },
    {
      name: "Wyls's Ferryl BALONDZI M.",
      initials: "WB",
    },
    {
      name: "Wences W. Matthieu MOUNGUENGUI K.",
      initials: "WM",
    },
  ];

  return (
    <section id="equipe" className="py-24 bg-[#06080F] relative border-b border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Simple Badge */}
        <div className="reveal-on-scroll inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.05] text-slate-300 border border-white/[0.1] mb-4 backdrop-blur-md">
          <Users className="w-3.5 h-3.5 text-slate-300" />
          <span>Équipe Projet</span>
        </div>

        {/* Clean Title */}
        <h2 className="reveal-on-scroll delay-100 text-3xl sm:text-4xl font-mono font-extrabold text-white tracking-tight uppercase mb-4 leading-[1.15]">
          Équipe 404 Introuvable
        </h2>
        
        <p className="reveal-on-scroll delay-200 text-slate-400 text-sm sm:text-base font-mono max-w-2xl mx-auto mb-12">
          Participants au NASA Space Apps Challenge 2026 • Événement de Libreville (Gabon)
        </p>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {members.map((m, idx) => {
            const delayClass = idx === 0 ? "delay-100" : idx === 1 ? "delay-200" : "delay-300";
            return (
              <div
                key={m.name}
                className={`reveal-on-scroll ${delayClass} relative p-7 rounded-2xl bg-[#0B0F1A]/80 border border-white/[0.08] hover:border-white/[0.22] hover:bg-[#101524]/90 transition-all duration-300 flex flex-col items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] group overflow-hidden`}
              >
                {/* Top hairline highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-white to-slate-300 flex items-center justify-center text-slate-950 font-mono font-bold text-lg shadow-md group-hover:scale-105 transition-transform mb-4">
                  {m.initials}
                </div>
                
                <h3 className="font-mono text-base font-bold text-white tracking-tight leading-snug">
                  {m.name}
                </h3>
                
                <span className="text-[11px] font-mono text-slate-400 mt-2 uppercase tracking-wider">
                  Participant
                </span>
              </div>
            );
          })}
        </div>

        {/* Simple footer note */}
        <div className="reveal-on-scroll delay-300 inline-flex items-center gap-2 text-xs font-mono text-slate-400">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>Projet conçu avec passion pour le bien-être des explorateurs spatiaux</span>
        </div>

      </div>
    </section>
  );
}
