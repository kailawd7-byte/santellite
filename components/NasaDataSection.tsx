import React from "react";
import { Database, ExternalLink, FileText, Dna, ActivitySquare } from "lucide-react";

export default function NasaDataSection() {
  const sources = [
    {
      badge: "Base de données 01",
      title: "NASA OSDR / GeneLab",
      icon: Dna,
      desc: "L'Open Science Data Repository regroupe les données omiques et biomoléculaires des organismes vivants exposés aux radiations spatiales et à la microgravité.",
      source: "NASA Ames Research Center",
      type: "Biomarqueurs géniques & stress oxydatif",
      link: "https://osdr.nasa.gov",
    },
    {
      badge: "Base de données 02",
      title: "NASA LSDA (Life Sciences)",
      icon: ActivitySquare,
      desc: "L'archive des sciences de la vie de la NASA collige les mesures physiologiques standard des équipages : électrocardiogrammes, tests DXA et bilans sanguins.",
      source: "NASA Johnson Space Center",
      type: "Séries chronologiques en vol réel",
      link: "https://lsda.jsc.nasa.gov",
    },
    {
      badge: "Référentiel 03",
      title: "NASA HRP Evidence Books",
      icon: FileText,
      desc: "Les livres de preuves du Human Research Program synthétisent l'état de l'art médical mondial sur chaque risque pour l'organisme humain en exploration spatiale.",
      source: "NASA Human Research Program",
      type: "Directives cliniques & contre-mesures",
      link: "https://humanresearchroadmap.nasa.gov",
    },
  ];

  return (
    <section id="donnees" className="py-24 relative overflow-hidden bg-[#070A12] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal-on-scroll text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.05] border border-white/[0.1] text-slate-300 mb-4 backdrop-blur-md">
            <Database className="w-3.5 h-3.5 text-sky-400" />
            <span>Données Officielles NASA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-mono font-extrabold text-white tracking-tight uppercase leading-[1.15]">
            Référentiels Scientifiques. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400/80">
              Au Cœur du Modèle Clinique.
            </span>
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg leading-relaxed">
            VitaOrbit s&apos;appuie sur les archives ouvertes de la NASA, intégrant les résultats 
            de décennies de recherche biomédicale menée à bord de l&apos;ISS et lors des missions lunaires.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {sources.map((src, idx) => {
            const SrcIcon = src.icon;
            const delayClass = idx === 0 ? "delay-100" : idx === 1 ? "delay-200" : "delay-300";
            return (
              <div
                key={src.title}
                className={`reveal-on-scroll ${delayClass} relative p-7 rounded-2xl bg-[#0B0F1A]/80 border border-white/[0.08] hover:border-white/[0.22] hover:bg-[#101524]/90 flex flex-col justify-between transition-all duration-300 group shadow-[0_10px_30px_rgba(0,0,0,0.3)] overflow-hidden`}
              >
                {/* Top hairline highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>

                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 group-hover:text-sky-300 block mb-3 transition-colors">
                    {src.badge}
                  </span>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-200 flex items-center justify-center group-hover:scale-105 group-hover:text-white transition-all">
                      <SrcIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-mono font-bold text-white uppercase">{src.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-normal">{src.desc}</p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] space-y-2 text-xs font-mono">
                  <div>
                    <span className="text-slate-500">Origine : </span>
                    <span className="font-semibold text-slate-300">{src.source}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Application : </span>
                    <span className="font-semibold text-slate-300">{src.type}</span>
                  </div>
                  <a
                    href={src.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-semibold pt-2 transition-colors uppercase tracking-wider text-[11px]"
                  >
                    <span>Consulter les données</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
