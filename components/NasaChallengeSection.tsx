"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function NasaChallengeSection() {
  const cards = [
    {
      id: "01",
      title: "Cuffless Blood Pressure",
      desc: "Continuous arterial pressure computation via Pulse Transit Time (PTT), eliminating the need to awaken astronauts with uncomfortable pneumatic cuffs.",
    },
    {
      id: "02",
      title: "Continuous 3-Lead ECG",
      desc: "Real-time 3-lead electrocardiography to detect arrhythmias, heart rate variability (HRV), and operational stress during critical mission phases.",
    },
    {
      id: "03",
      title: "Oxygenation & Thermoregulation",
      desc: "Continuous SpO2 and skin temperature monitoring to anticipate hypoxia during extravehicular activity (EVA) and core heat exhaustion.",
    },
    {
      id: "04",
      title: "Embedded Clinical Diagnosis",
      desc: "Onboard algorithms capable of triggering immediate life-critical alerts independently of ground radio communication blackout with Earth.",
    },
  ];

  return (
    <section id="defi" className="py-24 bg-transparent relative border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="reveal-left lg:col-span-5 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.05] text-slate-300 border border-white/[0.1] mb-5 backdrop-blur-md">
              <span className="text-sky-400">✦</span> The NASA Space Apps Challenge
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-extrabold text-white tracking-tight uppercase leading-[1.12] mb-6">
              Complex Microgravity. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400/80">
                Continuous Monitoring.
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              In space, the absence of gravity fundamentally disrupts human biology: cephalic fluid shift, cardiovascular deconditioning, bone mineral loss, and circadian rhythm desynchronization.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
              During deep-space voyages to the Moon or Mars, astronauts cannot wait up to 44 minutes for a medical decision from Earth ground control. Santellite connects flight-proven biometric devices to autonomous onboard clinical intelligence.
            </p>

            <a
              href="#equipements"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.15] hover:border-white/[0.3] text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 shadow-md"
            >
              Explore the 6 Devices <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
            </a>
          </div>

          {/* Right Column : 4 Sculpted Dark Glass Cards */}
          <div className="reveal-right lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((c) => (
              <div
                key={c.id}
                className="relative bg-[#0C101B]/80 hover:bg-[#111726]/90 border border-white/[0.08] hover:border-white/[0.22] rounded-2xl p-6 sm:p-7 text-white flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 group hover:-translate-y-1 overflow-hidden"
              >
                {/* Subtle top edge highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>

                <div>
                  <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-sky-300 transition-colors block mb-3">
                    {c.id}
                  </span>
                  <h3 className="font-mono text-sm sm:text-base font-bold text-white uppercase tracking-tight mb-2 group-hover:text-slate-100 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
