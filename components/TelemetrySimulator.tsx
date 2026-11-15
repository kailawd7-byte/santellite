"use client";

import React, { useEffect, useRef } from "react";
import { Radio, ArrowUpRight, LayoutDashboard } from "lucide-react";

export default function TelemetrySimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const points: number[] = [];

    const getECGHeight = (t: number) => {
      const phase = t % 1.0;
      if (phase < 0.1) return 0;
      if (phase < 0.18) return Math.sin(((phase - 0.1) / 0.08) * Math.PI) * 0.15; // Onde P
      if (phase < 0.28) return 0;
      if (phase < 0.32) return -Math.sin(((phase - 0.28) / 0.04) * Math.PI) * 0.2; // Onde Q
      if (phase < 0.38) return Math.sin(((phase - 0.32) / 0.06) * Math.PI) * 0.95; // Pic R
      if (phase < 0.44) return -Math.sin(((phase - 0.38) / 0.06) * Math.PI) * 0.3; // Onde S
      if (phase < 0.55) return 0;
      if (phase < 0.72) return Math.sin(((phase - 0.55) / 0.17) * Math.PI) * 0.25; // Onde T
      return 0;
    };

    const draw = () => {
      time += 0.02;
      const heightNorm = getECGHeight(time);
      const centerY = canvas.height / 2;
      const y = centerY - heightNorm * (canvas.height * 0.42);

      points.push(y);
      if (points.length > canvas.width) {
        points.shift();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grille médicale ECG
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let gy = 0; gy < canvas.height; gy += 16) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(canvas.width, gy);
        ctx.stroke();
      }
      for (let gx = 0; gx < canvas.width; gx += 16) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, canvas.height);
        ctx.stroke();
      }

      // Tracé clinique vert émeraude
      ctx.strokeStyle = "#34D399";
      ctx.lineWidth = 1.8;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgba(52, 211, 153, 0.4)";

      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        if (i === 0) {
          ctx.moveTo(i, points[i]);
        } else {
          ctx.lineTo(i, points[i]);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section id="simulateur" className="py-24 relative overflow-hidden bg-transparent border-b border-white/[0.06] space-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section Teaser */}
        <div className="reveal-on-scroll text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.05] border border-white/[0.1] text-slate-300 mb-4 backdrop-blur-md">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>Cockpit Médical • 6 Capteurs Connectés</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-extrabold text-white tracking-tight uppercase leading-[1.12]">
            Banc d&apos;Essai Télémétrique. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400/80">
              Surveillance Continue en Temps Réel.
            </span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            Aperçu instantané de la surveillance clinique des astronautes. Pour explorer la <strong>silhouette humaine interactive</strong>, les <strong>4 environnements de mission</strong> (transit, station, rover, base planétaire) et les <strong>6 scénarios cliniques complets</strong>, ouvrez le cockpit dédié.
          </p>
        </div>

        {/* Cockpit Preview Card (High-End MedTech) */}
        <div className="reveal-scale max-w-5xl mx-auto bg-[#0B0F1A]/85 p-6 sm:p-8 rounded-3xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
          {/* Subtle top edge highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/[0.06] pb-5 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 font-bold">APERÇU SCÉNARIO 1 : NOMINAL</span>
                <span className="text-[10px] font-mono text-slate-500">• SOL 142 • ORBITE BASSE (ISS)</span>
              </div>
              <div className="text-lg font-mono font-extrabold text-white">Cmdr. Thomas P. • Expédition 74</div>
            </div>
            <div className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>État : Optimal (Stabilité Cardiovasculaire)</span>
            </div>
          </div>

          {/* Grille des Métriques Clés en Aperçu */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
            <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06]">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Pression Artérielle</div>
              <div className="text-xl font-mono font-bold text-white mt-1">118/76 <span className="text-xs text-slate-400">mmHg</span></div>
              <div className="text-[10px] font-mono text-emerald-400 mt-0.5">● Normotension PTT continue</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06]">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Rythme Cardiaque</div>
              <div className="text-xl font-mono font-bold text-white mt-1">68 <span className="text-xs text-slate-400">BPM</span></div>
              <div className="text-[10px] font-mono text-emerald-400 mt-0.5">● Rythme sinusal régulier</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06]">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Densité Osseuse REMS</div>
              <div className="text-xl font-mono font-bold text-white mt-1">-0.2 <span className="text-xs text-slate-400">T-Score</span></div>
              <div className="text-[10px] font-mono text-emerald-400 mt-0.5">● Microarchitecture stable</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06]">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Rayonnement Spatial</div>
              <div className="text-xl font-mono font-bold text-white mt-1">0.17 <span className="text-xs text-slate-400">µSv/h</span></div>
              <div className="text-[10px] font-mono text-emerald-400 mt-0.5">● Flux standard LEO</div>
            </div>
          </div>

          {/* ECG Live Tracé Réduit */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-2 mb-8">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>ECG DÉRIVATION II EN DIRECT (250 HZ)</span>
              </span>
              <span className="text-emerald-300 font-bold">68 BPM</span>
            </div>
            <div className="w-full h-16 bg-[#04060C] rounded-lg overflow-hidden border border-white/[0.08] relative">
              <canvas ref={canvasRef} width={600} height={64} className="w-full h-full block" />
            </div>
          </div>

          {/* Apple-style White Action Button */}
          <div className="text-center pt-2">
            <a
              href="/dashboard.html"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-mono text-sm font-semibold uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-950" />
              <span>Ouvrir le Cockpit Médical Complet</span>
              <ArrowUpRight className="w-4 h-4 text-slate-950" />
            </a>
            <div className="text-xs font-mono text-slate-500 mt-4 flex flex-wrap items-center justify-center gap-5">
              <span>✓ Silhouette Humaine Interactive</span>
              <span>✓ 4 Environnements de Mission</span>
              <span>✓ 6 Scénarios Cliniques Complets</span>
              <span>✓ Scanner Optique Caméra</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
