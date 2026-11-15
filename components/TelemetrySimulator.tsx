"use client";

import React, { useEffect, useRef } from "react";
import { Radio, ArrowUpRight, LayoutDashboard } from "lucide-react";

export default function TelemetrySimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;
    const points: number[] = [];
    const maxPoints = 200;

    const draw = () => {
      t += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Generate ECG-like waveform with P-Q-R-S-T peaks
      const cycle = t % 2.5;
      let val = 0;
      if (cycle > 0.4 && cycle < 0.6) {
        val = 0.2 * Math.sin((cycle - 0.4) * Math.PI * 5); // P wave
      } else if (cycle >= 0.7 && cycle < 0.75) {
        val = -0.2; // Q wave
      } else if (cycle >= 0.75 && cycle < 0.85) {
        val = 1.3 * Math.sin((cycle - 0.75) * Math.PI * 10); // R wave
      } else if (cycle >= 0.85 && cycle < 0.9) {
        val = -0.3; // S wave
      } else if (cycle >= 1.1 && cycle < 1.4) {
        val = 0.35 * Math.sin((cycle - 1.1) * Math.PI * 3.33); // T wave
      }

      points.push(val);
      if (points.length > maxPoints) {
        points.shift();
      }

      // Draw faint baseline grid
      ctx.strokeStyle = "rgba(56, 189, 248, 0.08)";
      ctx.lineWidth = 1;
      for (let y = 0; y < canvas.height; y += 12) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw live ECG trace
      ctx.strokeStyle = "#10B981";
      ctx.lineWidth = 1.8;
      ctx.shadowColor = "rgba(16, 185, 129, 0.5)";
      ctx.shadowBlur = 6;
      ctx.beginPath();

      const step = canvas.width / maxPoints;
      const midY = canvas.height / 2;

      for (let i = 0; i < points.length; i++) {
        const x = i * step;
        const y = midY - points[i] * (canvas.height * 0.38);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
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
            <span>Medical Cockpit • 6 Connected Devices</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-extrabold text-white tracking-tight uppercase leading-[1.12]">
            Telemetry Testbed. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400/80">
              Continuous Real-Time Surveillance.
            </span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            Live instant preview of astronaut clinical telemetry. To interact with the <strong>holographic human body</strong>, test <strong>4 deep-space mission environments</strong> (transit, orbital station, lunar gateway, planetary surface), and simulate all <strong>6 clinical emergency scenarios</strong>, launch the full medical cockpit.
          </p>
        </div>

        {/* Cockpit Preview Card */}
        <div className="reveal-scale max-w-5xl mx-auto bg-[#0B0F1A]/85 p-6 sm:p-8 rounded-3xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
          {/* Subtle top edge highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/[0.06] pb-5 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 font-bold uppercase">SCENARIO PREVIEW 01: NOMINAL</span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">• SOL 142 • LOW EARTH ORBIT (ISS)</span>
              </div>
              <div className="text-lg font-mono font-extrabold text-white">Cmdr. Thomas P. • Expedition 74</div>
            </div>
            <div className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Status: Optimal (Cardiovascular Homeostasis)</span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
            <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06]">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Arterial Pressure</div>
              <div className="text-xl font-mono font-bold text-white mt-1">118/76 <span className="text-xs text-slate-400">mmHg</span></div>
              <div className="text-[10px] font-mono text-emerald-400 mt-0.5">● Continuous PTT Normotension</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06]">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Heart Rate</div>
              <div className="text-xl font-mono font-bold text-white mt-1">68 <span className="text-xs text-slate-400">BPM</span></div>
              <div className="text-[10px] font-mono text-emerald-400 mt-0.5">● Regular Sinus Rhythm</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06]">
              <div className="text-[10px] font-mono text-slate-400 uppercase">REMS Bone Density</div>
              <div className="text-xl font-mono font-bold text-white mt-1">-0.2 <span className="text-xs text-slate-400">T-Score</span></div>
              <div className="text-[10px] font-mono text-emerald-400 mt-0.5">● Microarchitecture Stable</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06]">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Ambient Radiation</div>
              <div className="text-xl font-mono font-bold text-white mt-1">0.17 <span className="text-xs text-slate-400">µSv/h</span></div>
              <div className="text-[10px] font-mono text-emerald-400 mt-0.5">● Standard LEO Flux</div>
            </div>
          </div>

          {/* Live ECG Canvas */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-2 mb-8">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>LIVE ECG LEAD II STREAM (250 HZ)</span>
              </span>
              <span className="text-emerald-300 font-bold">68 BPM</span>
            </div>
            <div className="w-full h-16 bg-[#04060C] rounded-lg overflow-hidden border border-white/[0.08] relative">
              <canvas ref={canvasRef} width={600} height={64} className="w-full h-full block" />
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center pt-2">
            <a
              href="/dashboard.html"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-mono text-sm font-semibold uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-950" />
              <span>Launch Full Medical Cockpit</span>
              <ArrowUpRight className="w-4 h-4 text-slate-950" />
            </a>
            <div className="text-xs font-mono text-slate-500 mt-4 flex flex-wrap items-center justify-center gap-5">
              <span>✓ Holographic Anatomical Body Map</span>
              <span>✓ 4 Deep-Space Environments</span>
              <span>✓ 6 Clinical Emergency Scenarios</span>
              <span>✓ Optical Camera Scanner</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
