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
    <section id="donnees" className="py-24 relative overflow-hidden bg-[#090d16]/50 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 mb-3">
            <Database className="w-3.5 h-3.5" />
            Données Officielles NASA
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Des référentiels scientifiques solides au cœur du modèle
          </h2>
          <p className="text-slate-300 mt-4 text-base sm:text-lg">
            VitaOrbit s&apos;appuie sur les archives ouvertes de la NASA, intégrant les résultats 
            de décennies de recherche biomédicale menée à bord de l&apos;ISS et lors des missions lunaires.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {sources.map((src) => {
            const SrcIcon = src.icon;
            return (
              <div
                key={src.title}
                className="p-8 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between hover:border-cyan-500/40 transition-all group"
              >
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-3">
                    {src.badge}
                  </span>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <SrcIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{src.title}</h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">{src.desc}</p>
                </div>

              <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                <div>
                  <span className="text-slate-400">Origine : </span>
                  <span className="font-semibold text-slate-200">{src.source}</span>
                </div>
                <div>
                  <span className="text-slate-400">Application : </span>
                  <span className="font-semibold text-cyan-300">{src.type}</span>
                </div>
                <a
                  href={src.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold pt-2"
                >
                  <span>Accéder à la base</span>
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
