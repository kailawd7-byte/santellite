"use client";

import React from "react";
import { Cpu, Radio, AlertTriangle, ShieldCheck, Globe, Wifi } from "lucide-react";

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
    {
      step: "04",
      title: "Transmission Longue Distance",
      desc: "Santellite ne nécessite aucune liaison radio dédiée : le logiciel centralise les données des 6 dispositifs connectés (Astroskin, EmbracePlus, actigraphie, dosimètre, échographe, biocapteur) puis les dépose sur le système de communication déjà existant du vaisseau, qui relaie ensuite vers le Deep Space Network de la NASA. Aucune infrastructure supplémentaire n'est requise pour une adoption institutionnelle.",
      icon: Globe,
      badge: "Centralisation & Relais via le Deep Space Network",
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
            Quatre étapes automatisées pour transformer les signaux physiologiques bruts en décisions cliniques rapides, sans dépendre du délai radio avec la Terre.
          </p>
        </div>

        {/* 4 Pipeline Cards (Linear-style) */}
        <div className="max-w-4xl mx-auto space-y-5">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const delayClass = idx === 0 ? "delay-100" : idx === 1 ? "delay-200" : idx === 2 ? "delay-300" : "delay-400";
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

        {/* Encart distinct : Pourquoi la distance, pas le débit, est la seule limite */}
        <div className="reveal-on-scroll mt-12 max-w-4xl mx-auto glass-panel p-6 sm:p-9 rounded-3xl border border-white/[0.1] backdrop-blur-2xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          {/* En-tête de l'encart */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 mb-2">
                <Wifi className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Deep Space Network • Télémétrie &amp; Latence</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight uppercase">
                Pourquoi la distance, pas le débit, est la seule limite
              </h3>
            </div>
          </div>

          {/* Tableau des Délais Terre-Mars */}
          <div className="relative z-10 my-6 overflow-x-auto">
            <table className="w-full text-left font-mono text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] text-slate-400 uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-4">Position Terre-Mars</th>
                  <th className="py-3 px-4 text-center">Délai aller simple</th>
                  <th className="py-3 px-4 text-right">Délai aller-retour</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-slate-200">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">Rapprochement maximal</td>
                  <td className="py-3 px-4 text-center text-cyan-300 font-bold">~3 min</td>
                  <td className="py-3 px-4 text-right text-cyan-400 font-bold">~6 min</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">Distance moyenne</td>
                  <td className="py-3 px-4 text-center text-indigo-300 font-bold">~12,5 min</td>
                  <td className="py-3 px-4 text-right text-indigo-400 font-bold">~25 min</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">Éloignement maximal</td>
                  <td className="py-3 px-4 text-center text-amber-300 font-bold">~22 min</td>
                  <td className="py-3 px-4 text-right text-amber-400 font-bold">~44 min</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Explication sous le tableau */}
          <p className="relative z-10 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-8">
            À chaque niveau de la chaîne (capteur → hub de bord → vaisseau → Terre), la capacité disponible dépasse largement les besoins d&apos;un paquet de données de santé. Le facteur limitant n&apos;est jamais le débit, mais la distance physique, à laquelle s&apos;ajoute une bande passante du vaisseau partagée et priorisée avec les données scientifiques et opérationnelles. Santellite transmet donc des résumés compacts et priorisés, jamais un flux brut continu.
          </p>

          {/* Bloc : Instruction d'intégration pour une adoption institutionnelle */}
          <div className="relative z-10 p-5 sm:p-6 rounded-2xl bg-[#070A14]/80 border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Instruction d&apos;intégration pour une adoption institutionnelle</span>
            </div>
            <p className="text-xs sm:text-sm text-cyan-300 font-mono font-semibold">
              Si la NASA adopte Santellite :
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-normal">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                <span>Le logiciel s&apos;installe sur l&apos;ordinateur de bord déjà existant du vaisseau ou de la station, sans nouveau matériel de communication.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                <span>Il centralise en un point unique les données des 6 équipements biomédicaux déjà homologués, au lieu de 6 flux séparés.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                <span>Il traite et décide localement (étapes 01 à 03), pour agir sans attendre une réponse de la Terre pendant les 3 à 44 minutes de délai incompressible.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                <span>Il transmet uniquement des résumés compacts et priorisés au système de communication du vaisseau, qui relaie ensuite vers le Deep Space Network selon les protocoles déjà en place (bandes S, X ou Ka).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                <span>Aucune dérogation technique, aucune nouvelle antenne, aucun nouveau protocole : Santellite s&apos;intègre à l&apos;infrastructure existante de la NASA plutôt que de la dupliquer.</span>
              </li>
            </ul>

            {/* Phrase supplémentaire d'ouverture */}
            <div className="pt-3 border-t border-white/[0.06] text-xs sm:text-sm text-slate-400 italic">
              Cette architecture reste volontairement ouverte à tout capteur médical supplémentaire que la NASA pourrait déjà utiliser en interne, documenté ou non dans les sources publiques consultées pour ce projet.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
