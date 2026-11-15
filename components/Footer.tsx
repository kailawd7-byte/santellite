import React from "react";
import { Orbit, ChevronRight, Globe, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#05070D]/80 backdrop-blur-xl border-t border-white/[0.06] pt-16 pb-12 text-slate-400 text-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand */}
          <div className="md:col-span-6 space-y-4 text-left">
            <a href="#accueil" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-white to-slate-300 flex items-center justify-center text-slate-950">
                <Orbit className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white font-mono">
                Santellite<span className="text-sky-400">.</span>
              </span>
            </a>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md font-mono">
              Projet présenté au NASA Space Apps Challenge 2026 par l&apos;Équipe 404 Introuvable (Libreville, Gabon). 
              Plateforme clinique de surveillance continue interconnectant 6 dispositifs médicaux spatiaux (Astroskin, EmbracePlus, bracelet ARCHeR, dosimètre HRP, échographe REMS, biocapteurs) pour la santé des équipages spatiaux.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">Navigation</h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="/dashboard.html" className="text-white font-semibold hover:text-sky-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" /> Tableau de bord ↗
                </a>
              </li>
              <li>
                <a href="#defi" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" /> Le Défi NASA
                </a>
              </li>
              <li>
                <a href="#equipements" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" /> 6 Équipements Spatiaux
                </a>
              </li>
              <li>
                <a href="#architecture" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" /> Architecture Embarquée
                </a>
              </li>
              <li>
                <a href="#simulateur" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" /> Simulateur Clinique
                </a>
              </li>
              <li>
                <a href="#donnees" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" /> Données Ouvertes NASA
                </a>
              </li>
              <li>
                <a href="#equipe" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" /> Équipe 404
                </a>
              </li>
            </ul>
          </div>

          {/* References */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">Événement</h4>
            <div className="space-y-3 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-300 shrink-0" />
                <span>Libreville, Gabon (2026)</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-slate-300 shrink-0" />
                <span>NASA Space Apps Challenge</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[11px] text-slate-400">
                Basé sur les standards de vol spatiaux réels : CSA (Astroskin ISS), TRISH / NASA (EmbracePlus), et NASA ARCHeR (Bracelet spatial actigraphique).
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 Santellite • Équipe 404 Introuvable. Tous droits réservés.
          </div>
          <div>
            Développé pour la santé et la sécurité des équipages spatiaux.
          </div>
        </div>
      </div>
    </footer>
  );
}
