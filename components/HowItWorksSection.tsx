"use client";

import React from "react";
import { Cpu, Radio, AlertTriangle, ShieldCheck } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Captation Non-Invasive Continue",
      desc: "L'écosystème de 6 capteurs (textiles Astroskin, montres EmbracePlus et ActLumus, dosimètre cosmique, échographe osseux et biocapteurs) mesure 24/7 l'ensemble des constantes vitales sans gêne opérationnelle.",
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
    <section id="architecture" className="py-24 bg-[#070A12] relative overflow-hidden border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="reveal-on-scroll text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.05] text-slate-300 border border-white/[0.1] mb-4 backdrop-blur-md">
            <span>•</span> Architecture Médicale Embarquée
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-extrabold text-white tracking-tight uppercase leading-[1.12]">
            Du Capteur Corporel <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400/80">
              Au Diagnostic Vital.
            </span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            Trois étapes automatisées pour transformer les signaux physiologiques bruts en décisions cliniques rapides, sans dépendre du délai radio avec la Terre.
          </p>
        </div>

        {/* 3 Pipeline Cards (Linear-style) */}
        <div className="max-w-4xl mx-auto space-y-5">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const delayClass = idx === 0 ? "delay-100" : idx === 1 ? "delay-200" : "delay-300";
            return (
              <div
                key={s.step}
                className={`reveal-on-scroll ${delayClass} relative p-6 sm:p-8 rounded-2xl bg-[#0B0F1A]/80 border border-white/[0.08] hover:border-white/[0.22] hover:bg-[#101524]/90 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group shadow-[0_10px_30px_rgba(0,0,0,0.3)] overflow-hidden`}
              >
                {/* Top hairline highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-500 group-hover:text-white transition-colors shrink-0">
                    {s.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-200 group-hover:bg-white/[0.08] group-hover:text-white transition-all shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">
                      {s.badge}
                    </span>
                    <h3 className="text-lg sm:text-xl font-mono font-bold text-white uppercase group-hover:text-slate-100 transition-colors">
                      {s.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed md:max-w-md text-left font-normal">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Encart de synthèse & adoption institutionnelle */}
        <div className="reveal-on-scroll mt-8 max-w-4xl mx-auto p-6 sm:p-7 rounded-2xl bg-[#0B0F1A]/80 border border-white/[0.08] backdrop-blur-xl relative overflow-hidden shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 shrink-0">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="space-y-2 text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Instruction d&apos;intégration pour une adoption institutionnelle
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Cette architecture reste volontairement ouverte à tout capteur médical supplémentaire que la NASA pourrait déjà utiliser en interne, documenté ou non dans les sources publiques consultées pour ce projet.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
