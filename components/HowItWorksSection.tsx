"use client";

import React from "react";
import { Cpu, Radio, AlertTriangle, ShieldCheck, Globe, Wifi } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Continuous Non-Invasive Sensing",
      desc: "The 6-sensor hardware ecosystem (Astroskin smart textiles, EmbracePlus and ActLumus watches, cosmic dosimeter, bone ultrasound scanner, and biosensors) monitors 24/7 all critical vital parameters with zero operational discomfort.",
      icon: Radio,
      badge: "Telemetry Ingestion",
    },
    {
      step: "02",
      title: "Embedded AI Processing & Sensor Fusion",
      desc: "The onboard medical hub processor evaluates raw streams in real time, filters microgravity motion artifacts, and continuously correlates biomarkers against baseline astronaut physiological profiles.",
      icon: Cpu,
      badge: "Autonomous Local Analysis",
    },
    {
      step: "03",
      title: "Automated Triage & Instant Alerting",
      desc: "As soon as vital parameters diverge from safe thresholds (hypovolemic syncope, severe arrhythmia, SpO2 desaturation), tactile vibration and visual HUD alerts immediately direct the crew to life-saving protocols.",
      icon: AlertTriangle,
      badge: "Clinical Decision & Immediate Response",
    },
    {
      step: "04",
      title: "Long-Distance Telemetry Transmission",
      desc: "Santellite requires zero dedicated radio hardware: the software centralizes streams from all 6 connected devices (Astroskin, EmbracePlus, actigraphy, dosimeter, ultrasound, biosensors) and passes packaged telemetry to the existing spacecraft comms system, which relays to NASA's Deep Space Network. Zero additional ground or flight infrastructure required for institutional adoption.",
      icon: Globe,
      badge: "Centralization & Deep Space Network Relay",
    },
  ];

  return (
    <section id="architecture" className="py-24 bg-transparent relative overflow-hidden border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="reveal-on-scroll text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.05] text-slate-300 border border-white/[0.1] mb-4 backdrop-blur-md">
            <span>•</span> Embedded Medical Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-extrabold text-white tracking-tight uppercase leading-[1.12]">
            From Body Sensors <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400/80">
              To Critical Clinical Decisions.
            </span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            Four automated stages transforming raw physiological telemetry into immediate clinical interventions, independent of communication delay with Earth.
          </p>
        </div>

        {/* 4 Pipeline Cards */}
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

        {/* Deep Space Latency Callout */}
        <div className="reveal-on-scroll mt-12 max-w-4xl mx-auto glass-panel p-6 sm:p-9 rounded-3xl border border-white/[0.1] backdrop-blur-2xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          {/* Header */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 mb-2">
                <Wifi className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Deep Space Network • Telemetry &amp; Latency</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight uppercase">
                Why Distance, Not Bandwidth, Is the Only Physical Barrier
              </h3>
            </div>
          </div>

          {/* Table */}
          <div className="relative z-10 my-6 overflow-x-auto">
            <table className="w-full text-left font-mono text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] text-slate-400 uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-4">Earth-Mars Orbital Geometry</th>
                  <th className="py-3 px-4 text-center">One-Way Light Time</th>
                  <th className="py-3 px-4 text-right">Round-Trip Delay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-slate-200">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">Closest Approach (54.6M km)</td>
                  <td className="py-3 px-4 text-center text-cyan-300 font-bold">~3 min</td>
                  <td className="py-3 px-4 text-right text-cyan-400 font-bold">~6 min</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">Mean Orbital Distance (225M km)</td>
                  <td className="py-3 px-4 text-center text-indigo-300 font-bold">~12.5 min</td>
                  <td className="py-3 px-4 text-right text-indigo-400 font-bold">~25 min</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">Maximum Separation (401M km)</td>
                  <td className="py-3 px-4 text-center text-amber-300 font-bold">~22 min</td>
                  <td className="py-3 px-4 text-right text-amber-400 font-bold">~44 min</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Explanation under table */}
          <p className="relative z-10 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-8">
            Across each layer of the telemetry stack (sensor → onboard hub → spacecraft bus → Earth DSN), available bandwidth far exceeds the footprint of clinical data packets. The physical constraint is never throughput, but the immutable speed of light, combined with shared spacecraft RF bandwidth prioritized for guidance and science. Santellite therefore transmits compressed, prioritized clinical summaries, never unparsed raw streams.
          </p>

          {/* Institutional Integration Block */}
          <div className="relative z-10 p-5 sm:p-6 rounded-2xl bg-[#070A14]/80 border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Integration Instructions for NASA Institutional Adoption</span>
            </div>
            <p className="text-xs sm:text-sm text-cyan-300 font-mono font-semibold">
              If NASA Deploys Santellite:
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-normal">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                <span>The software deploys directly onto existing flight avionics (Orion, Gateway, or Mars Transit Vehicle), requiring zero new transceivers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                <span>It centralizes 6 flight-qualified biomedical hardware feeds into a unified encrypted pipeline rather than 6 disjointed proprietary siloes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                <span>It processes, triages, and decides locally (Stages 01–03) to deliver immediate clinical care during the 3 to 44-minute incompressible speed-of-light delay.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                <span>It transmits compact, prioritized health summaries to the spacecraft comms processor for Deep Space Network relay across existing S, X, or Ka-band links.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                <span>Zero technical waivers, zero new antennas, zero redundant protocols: Santellite integrates directly into existing NASA telemetry architecture rather than duplicating it.</span>
              </li>
            </ul>

            {/* Open Architecture Note */}
            <div className="pt-3 border-t border-white/[0.06] text-xs sm:text-sm text-slate-400 italic">
              This architecture remains voluntarily open to any additional medical sensors NASA may already utilize internally, whether documented or absent in the public sources consulted for this project.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
