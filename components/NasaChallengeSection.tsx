"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function NasaChallengeSection() {
  const cards = [
    {
      id: "01",
      title: "Tension Artérielle Sans Brassard",
      desc: "Calcul continu de la pression artérielle par temps de transit de l'onde de pouls (PTT), sans réveiller l'astronaute avec un brassard pneumatique.",
    },
    {
      id: "02",
      title: "Électrocardiogramme Continu",
      desc: "Analyse 3 dérivations en temps réel pour détecter les arythmies, la variabilité de la fréquence cardiaque (VFC) et le stress opérationnel.",
    },
    {
      id: "03",
      title: "Oxygénation & Thermorégulation",
      desc: "Capteurs SpO2 et température cutanée en continu pour anticiper l'hypoxie lors des sorties extravéhiculaires (EVA) et les coups de chaleur.",
    },
    {
      id: "04",
      title: "Diagnostic Clinique Embarqué",
      desc: "Algorithmes locaux capables de poser une alerte vitale immédiate, indépendamment du délai radio de communication avec la Terre.",
    },
  ];

  return (
    <section id="defi" className="py-20 bg-[#070b14] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (Matching Mockup 'About / Complex Infrastructure') */}
          <div className="lg:col-span-5 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/10 text-cyan-300 border border-white/10 mb-4">
              <span>✦</span> Le Défi NASA Space Apps
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-extrabold text-white tracking-tight uppercase leading-[1.12] mb-6">
              Microgravité Complexe. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Surveillance Continue.
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              Dans l&apos;espace, l&apos;absence de gravité bouleverse la biologie humaine : perte de volume sanguin, redistribution des liquides céphaliques, atrophie cardiaque et perte du tonus baroréflexe.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
              Lors d&apos;une mission vers Mars ou la Lune, l&apos;équipage ne peut pas attendre une réponse des médecins sur Terre en cas d&apos;urgence. Santellite connecte les équipements biomédicaux à une intelligence clinique autonome.
            </p>

            <a
              href="#equipements"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-black hover:bg-slate-900 border border-white/20 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:border-cyan-400"
            >
              Découvrir les Équipements <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          </div>

          {/* Right Column : 2x2 Grid of Clean Light/White Cards (Matching Kubeva Mockup) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl p-6 sm:p-7 text-slate-900 flex flex-col justify-between shadow-xl border border-slate-100 hover:shadow-cyan-500/10 transition-all group"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-slate-400 block mb-3">
                    {c.id}
                  </span>
                  <h3 className="font-mono text-sm sm:text-base font-bold text-blue-700 uppercase tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
