"use client";

import React from "react";
import { Cpu, Radio, AlertTriangle } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Captation Non-Invasive Continue",
      desc: "Les capteurs textiles du maillot Astroskin et les capteurs optiques et électrodermaux (EDA) de la montre EmbracePlus mesurent 24/7 la tension artérielle, l'ECG, le stress et la SpO2 sans gêne opérationnelle.",
      icon: Radio,
      badge: "Entrée Télémétrique",
    },
    {
      step: "02",
      title: "Fusion & Traitement IA Embarqué",
      desc: "Le processeur local du hub médical analyse les signaux bruts en temps réel, filtre les artefacts de mouvement en microgravité et compare les constantes aux profils de référence de l'astronaute.",
      icon: Cpu,
      badge: "Analyse Locale Autonome",
    },
    {
      step: "03",
      title: "Alerte Clinique & Action Immédiate",
      desc: "Dès qu'un biomarqueur s'écarte des seuils de sécurité (syncope, arythmie sévère, chute de SpO2), une alerte visuelle et vibratoire guide immédiatement l'équipage dans le protocole de réanimation.",
      icon: AlertTriangle,
      badge: "Décision & Réaction",
    },
  ];

  return (
    <section id="architecture" className="py-24 bg-[#060911] relative overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Matching Mockup 'From Code to Cloud') */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/10 text-slate-300 border border-white/10 mb-3">
            <span>•</span> Architecture Médicale Embarquée
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-extrabold text-white tracking-tight uppercase leading-[1.12]">
            Du Capteur Corporel <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white">
              Au Diagnostic Vital.
            </span>
          </h2>
          <p className="text-slate-300 mt-4 text-sm sm:text-base leading-relaxed">
            Trois étapes automatisées pour transformer les signaux physiologiques bruts en décisions cliniques rapides, sans dépendre du délai radio avec la Terre.
          </p>
        </div>

        {/* 3 Stacked Cards (Matching the 3 isometric layers from mockup) */}
        <div className="max-w-4xl mx-auto space-y-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="p-6 sm:p-8 rounded-2xl bg-[#090e1a] border border-white/10 hover:border-blue-500/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-blue-500 group-hover:text-cyan-400 transition-colors shrink-0">
                    {s.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                      {s.badge}
                    </span>
                    <h3 className="text-lg sm:text-xl font-mono font-bold text-white uppercase group-hover:text-cyan-300 transition-colors">
                      {s.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed md:max-w-md text-left">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
