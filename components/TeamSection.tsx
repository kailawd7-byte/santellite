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
    <section id="equipe" className="py-20 bg-[#05070D] relative border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Simple Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-white/10 text-slate-300 border border-white/10 mb-4">
          <Users className="w-3.5 h-3.5 text-cyan-400" />
          <span>Équipe Projet</span>
        </div>

        {/* Clean Title */}
        <h2 className="text-3xl sm:text-4xl font-mono font-extrabold text-white tracking-tight uppercase mb-4">
          Équipe 404 Introuvable
        </h2>
        
        <p className="text-slate-400 text-sm sm:text-base font-mono max-w-2xl mx-auto mb-12">
          Participants au NASA Space Apps Challenge 2026 • Événement de Libreville (Gabon)
        </p>

        {/* Clean, Simple 3-Column Card Grid with ONLY the names as requested */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {members.map((m) => (
            <div
              key={m.name}
              className="p-6 rounded-2xl bg-[#090e1a] border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col items-center text-center shadow-lg group"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-mono font-bold text-xl shadow-md group-hover:scale-105 transition-transform mb-4">
                {m.initials}
              </div>
              
              <h3 className="font-mono text-base font-bold text-white tracking-tight leading-snug">
                {m.name}
              </h3>
              
              <span className="text-[11px] font-mono text-slate-400 mt-2 uppercase tracking-wider">
                Participant
              </span>
            </div>
          ))}
        </div>

        {/* Simple footer note */}
        <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400">
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          <span>Projet conçu avec passion pour le bien-être des explorateurs spatiaux</span>
        </div>

      </div>
    </section>
  );
}
