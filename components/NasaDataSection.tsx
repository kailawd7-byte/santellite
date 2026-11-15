import React from "react";
import { Database, ExternalLink, FileText, Dna, ActivitySquare } from "lucide-react";

export default function NasaDataSection() {
  const sources = [
    {
      badge: "Database 01",
      title: "NASA OSDR / GeneLab",
      icon: Dna,
      desc: "The Open Science Data Repository aggregates omics, transcriptomic, and biomolecular datasets from living organisms exposed to deep-space radiation and microgravity.",
      source: "NASA Ames Research Center",
      type: "Genetic Biomarkers & Oxidative Stress",
      link: "https://osdr.nasa.gov",
    },
    {
      badge: "Database 02",
      title: "NASA LSDA (Life Sciences)",
      icon: ActivitySquare,
      desc: "NASA's Life Sciences Data Archive collates standardized astronaut physiological telemetry: continuous ECGs, DXA bone scans, and spaceflight blood chemistry panels.",
      source: "NASA Johnson Space Center",
      type: "In-Flight Longitudinal Time Series",
      link: "https://lsda.jsc.nasa.gov",
    },
    {
      badge: "Repository 03",
      title: "NASA HRP Evidence Books",
      icon: FileText,
      desc: "The Human Research Program evidence books summarize global medical consensus and clinical countermeasures for every documented human space exploration risk.",
      source: "NASA Human Research Program",
      type: "Clinical Guidelines & Countermeasures",
      link: "https://humanresearchroadmap.nasa.gov",
    },
  ];

  return (
    <section id="donnees" className="py-24 relative overflow-hidden bg-transparent border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal-on-scroll text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.05] border border-white/[0.1] text-slate-300 mb-4 backdrop-blur-md">
            <Database className="w-3.5 h-3.5 text-sky-400" />
            <span>Official NASA Data Repositories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-mono font-extrabold text-white tracking-tight uppercase leading-[1.15]">
            Scientific Repositories. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400/80">
              At the Core of the Clinical Model.
            </span>
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg leading-relaxed">
            VitaOrbit is grounded in NASA&apos;s open-access databases, synthesizing decades of biomedical research conducted aboard the ISS and Apollo/Skylab lunar missions.
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
                    <span className="text-slate-500">Source: </span>
                    <span className="font-semibold text-slate-300">{src.source}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Application: </span>
                    <span className="font-semibold text-slate-300">{src.type}</span>
                  </div>
                  <a
                    href={src.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-semibold pt-2 transition-colors uppercase tracking-wider text-[11px]"
                  >
                    <span>Access Open Datasets</span>
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
