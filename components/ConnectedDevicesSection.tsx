"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Activity,
  Heart,
  Shield,
  Radio,
  CheckCircle2,
  ChevronRight,
  Zap,
  Thermometer,
  Bone,
  Clock,
  Calendar,
  TrendingDown,
  AlertTriangle,
  Wifi,
  Droplets,
  Dna,
  Layers,
  Usb,
  Sun,
  Moon,
  FlaskConical,
  Rocket,
  Info,
} from "lucide-react";

export default function ConnectedDevicesSection() {
  const [activeProduct, setActiveProduct] = useState<
    "astroskin" | "embraceplus" | "echolight" | "dosimeter" | "saliva" | "actigraphy"
  >("astroskin");

  const [astroskinImgMode, setAstroskinImgMode] = useState<"iss" | "diagram">("iss");
  const [embraceImgMode, setEmbraceImgMode] = useState<"front" | "sensors">("front");

  const products = [
    { id: "astroskin", label: "1. Astroskin Smart Shirt", icon: Shield, color: "text-blue-500" },
    { id: "embraceplus", label: "2. EmbracePlus Watch", icon: Heart, color: "text-cyan-400" },
    { id: "echolight", label: "3. REMS Bone Scanner", icon: Bone, color: "text-emerald-400" },
    { id: "dosimeter", label: "4. Radiation Dosimeter", icon: AlertTriangle, color: "text-amber-400" },
    { id: "saliva", label: "5. Saliva Biosensor", icon: Droplets, color: "text-purple-400" },
    { id: "actigraphy", label: "6. Artemis II Actigraphy", icon: Moon, color: "text-indigo-400" },
  ];

  return (
    <section id="equipements" className="py-24 bg-transparent relative overflow-hidden border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="reveal-on-scroll text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.05] text-slate-300 border border-white/[0.1] mb-4 backdrop-blur-md">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            Flight-Proven & Connected Space Hardware
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-extrabold text-white tracking-tight uppercase leading-[1.12]">
            Space Wearable Sensors. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400/80">
              Continuous Medical Telemetry.
            </span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            To ensure crew health during long-duration deep space exploration, Santellite centralizes real-time telemetry from <strong>6 flight-proven biomedical devices</strong>: continuous cardiovascular monitoring, bone density scanning, active dosimetry, and salivary biomarkers.
          </p>

          {/* Product Switcher Segmented Control */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl mt-8">
            {products.map((p) => {
              const Icon = p.icon;
              const isActive = activeProduct === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveProduct(p.id as any)}
                  className={`px-3.5 py-2 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                    isActive
                      ? "bg-white text-slate-950 shadow-md shadow-black/20"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-slate-950" : "text-slate-400"}`} />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= 1. ASTROSKIN BIO-VEST ================= */}
        {activeProduct === "astroskin" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0B0F1A]/85 border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
            {/* Left: Images with toggle */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/10 group shadow-xl">
                <Image
                  src={
                    astroskinImgMode === "iss"
                      ? "/images/astroskin-astronaut-iss.jpg"
                      : "/images/astroskin-sensors-diagram.jpg"
                  }
                  alt={
                    astroskinImgMode === "iss"
                      ? "Astronaut David Saint-Jacques wearing the Astroskin smart shirt aboard the ISS"
                      : "Astroskin smart shirt sensor topology diagram"
                  }
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-cyan-300">
                  {astroskinImgMode === "iss" ? "● Real In-Flight ISS Test" : "● Sensor Architecture Topology"}
                </div>
              </div>

              {/* Image Toggle Buttons */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setAstroskinImgMode("iss")}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all border ${
                    astroskinImgMode === "iss"
                      ? "bg-blue-600 text-white border-blue-500 shadow-md"
                      : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                  }`}
                >
                  View 1: Astronaut in Flight (ISS)
                </button>
                <button
                  onClick={() => setAstroskinImgMode("diagram")}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all border ${
                    astroskinImgMode === "diagram"
                      ? "bg-blue-600 text-white border-blue-500 shadow-md"
                      : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                  }`}
                >
                  View 2: Sensor Diagram
                </button>
              </div>
            </div>

            {/* Right: Technical Specifications */}
            <div className="lg:col-span-6 text-left space-y-6">
              <div>
                <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-widest">
                  Canadian Space Agency (CSA) • Carré Technologies
                </span>
                <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase mt-1">
                  Astroskin Space Biometric Smart Shirt
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                  Engineered to monitor astronauts 24/7 without impeding sleep, workouts, or flight duties. Integrates patented smart textile sensors to continuously record critical vital signs in microgravity.
                </p>
              </div>

              {/* Sensor Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    Cuffless Blood Pressure
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Continuous beat-by-beat arterial pressure (PTT) without waking astronauts with a pneumatic cuff.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <Heart className="w-4 h-4 text-red-400" />
                    Continuous 3-Lead ECG
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Clinical-grade heart rate, beat intervals, and real-time arrhythmia detection.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Respiratory Inductance Plethysmography
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Tidal volume and respiratory rate via dual thoracic and abdominal textile bands.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    SpO2 & Skin Temperature
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Continuous peripheral oxygen saturation and dual-site thermoregulation tracking.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#simulateur"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("select-scenario", { detail: "nominal" }));
                    }
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider group"
                >
                  View Smart Shirt Telemetry in Simulator 
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. EMBRACEPLUS BY EMPATICA ================= */}
        {activeProduct === "embraceplus" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0B0F1A]/85 border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
            {/* Left: Images with toggle */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/10 group shadow-xl">
                <Image
                  src={
                    embraceImgMode === "front"
                      ? "/images/embraceplus-watch-front.jpg"
                      : "/images/embraceplus-sensors-diagram.jpg"
                  }
                  alt={
                    embraceImgMode === "front"
                      ? "EmbracePlus clinical space smartwatch front view"
                      : "EmbracePlus rear clinical sensor array by Empatica"
                  }
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-cyan-300">
                  {embraceImgMode === "front" ? "● EmbracePlus — Front View" : "● Rear Sensor Architecture"}
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setEmbraceImgMode("front")}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all border ${
                    embraceImgMode === "front"
                      ? "bg-blue-600 text-white border-blue-500 shadow-md"
                      : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                  }`}
                >
                  View 1: EmbracePlus Watch
                </button>
                <button
                  onClick={() => setEmbraceImgMode("sensors")}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all border ${
                    embraceImgMode === "sensors"
                      ? "bg-blue-600 text-white border-blue-500 shadow-md"
                      : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                  }`}
                >
                  View 2: Rear Clinical Sensors
                </button>
              </div>
            </div>

            {/* Right: Technical Specifications */}
            <div className="lg:col-span-6 text-left space-y-6">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                  Empatica • Certified for NASA / TRISH Space Research
                </span>
                <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase mt-1">
                  EmbracePlus Space Medical Smartwatch
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                  Clinical-grade wrist device selected for human spaceflight missions (TRISH / NASA / Polaris Dawn). Designed for continuous microgravity physiological surveillance without hindering flight operational duties.
                </p>
              </div>

              {/* Sensor Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Ventral EDA Sensor (Electrodermal Activity)
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Continuous Galvanic Skin Response (GSR) monitoring to evaluate sympathetic nervous stress.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <Heart className="w-4 h-4 text-red-400" />
                    High-Frequency Optical PPG
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Continuous pulse rate, heart rate variability (HRV), and pulse wave velocity estimation.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <Thermometer className="w-4 h-4 text-cyan-400" />
                    Continuous Skin Temperature Probe
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    High-precision peripheral thermoregulation tracking to anticipate hypothermia or inflammatory spikes.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    3D Accelerometer & Gyroscope (IP67)
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Actigraphy kinematics, circadian rest-activity rhythm tracking, and instant impact detection.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#simulateur"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("select-scenario", { detail: "hypoxia" }));
                    }
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider group"
                >
                  Test EmbracePlus Telemetry in Simulator 
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. ECHOLIGHT (REMS TECHNOLOGY) ================= */}
        {activeProduct === "echolight" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0B0F1A]/85 border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
            {/* Left: Image */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/10 group shadow-xl">
                <Image
                  src="/images/echolight-bone-scanner.jpg"
                  alt="EchoLight REMS portable bone ultrasound scanner"
                  fill
                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-emerald-400">
                  ● REMS Portable Bone Scanner
                </div>
              </div>
              <div className="text-center font-mono text-xs text-slate-400">
                Ultrasound scan of spine and femur in &lt; 10 minutes
              </div>
            </div>

            {/* Right: Technical Specifications */}
            <div className="lg:col-span-6 text-left space-y-6">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
                  NASA · Echolight (REMS Technology)
                </span>
                <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase mt-1">
                  Portable Ultrasound Bone Scanner
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                  Briefcase-sized device utilized by NASA to track microgravity-induced bone demineralization. Accurately measures bone mineral density (BMD) and bone microarchitecture via ultrasound without ionizing X-ray radiation in under 10 minutes on spine and femur.
                </p>
              </div>

              {/* Sensor Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-bold uppercase mb-1">
                    <Bone className="w-4 h-4 text-emerald-400" />
                    Radiation-Free Bone Density
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Radiofrequency Echographic Multi Spectrometry (REMS), zero X-ray exposure.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-bold uppercase mb-1">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Rapid In-Flight Scan
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Complete anatomical examination in under 10 minutes, frequently repeatable.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-bold uppercase mb-1">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    Periodic Diagnostic Sync
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Weekly diagnostic checks rather than continuous wear, complementary to wearables.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-bold uppercase mb-1">
                    <TrendingDown className="w-4 h-4 text-amber-400" />
                    Bone Loss Countermeasure Feedback
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Enables real-time adjustments to resistive exercise (ARED) and clinical nutrition.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#simulateur"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("select-scenario", { detail: "boneLoss" }));
                    }
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-wider group"
                >
                  View Bone Scan Results in Simulator 
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. PERSONAL RADIATION DOSIMETER ================= */}
        {activeProduct === "dosimeter" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0B0F1A]/85 border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
            {/* Left: Image */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/10 group shadow-xl">
                <Image
                  src="/images/dosimeter-tracerco-hrp.png"
                  alt="Personal active space radiation dosimeter"
                  fill
                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-amber-400">
                  ● Active Personal Dosimeter
                </div>
              </div>
              <div className="text-center font-mono text-xs text-slate-400">
                Live radiation telemetry (Dose Rate &amp; Cumulative Dose in µSv)
              </div>
            </div>

            {/* Right: Technical Specifications */}
            <div className="lg:col-span-6 text-left space-y-6">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
                  NASA Human Research Program (HRP)
                </span>
                <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase mt-1">
                  Active Crew Radiation Dosimeter
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                  Continuously worn device measuring ionizing galactic cosmic rays (GCR) and solar particle events (SPE). Vital for deep space where radiation silently alters human cells without immediate vital sign shifts.
                </p>
              </div>

              {/* Sensor Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold uppercase mb-1">
                    <Shield className="w-4 h-4 text-amber-400" />
                    Real-Time Cumulative Dose
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Continuous monitoring of total absorbed radiation dose since mission liftoff.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold uppercase mb-1">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    Custom Alert Thresholds
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Instant automated alarms when ambient flux approaches safety limits (SPE storms).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold uppercase mb-1">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Period Breakdown History
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Granular radiation dose distribution broken down by day, week, or EVA sortie.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold uppercase mb-1">
                    <Wifi className="w-4 h-4 text-emerald-400" />
                    Automated Telemetry Sync
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Continuous streaming to onboard hub via encrypted wireless or flight bus.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#simulateur"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("select-scenario", { detail: "solarStorm" }));
                    }
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider group"
                >
                  View Radiation Dosimeter Telemetry in Simulator 
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ================= 5. SALIVARY STRESS AND IMMUNITY BIOSENSOR ================= */}
        {activeProduct === "saliva" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0B0F1A]/85 border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
            {/* Left: Image */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/10 group shadow-xl">
                <Image
                  src="/images/saliva-biosensor-iss.jpg"
                  alt="Astronaut testing the salivary biosensor aboard the ISS"
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-purple-400">
                  ● Real Flight Test aboard ISS
                </div>
              </div>
              <div className="text-center font-mono text-xs text-slate-400">
                Orbital biochemical assay of cortisol and DHEA-S directly aboard spacecraft
              </div>
            </div>

            {/* Right: Technical Specifications */}
            <div className="lg:col-span-6 text-left space-y-6">
              <div>
                <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-widest">
                  Italian Space Agency (ASI) · University of Bologna
                </span>
                <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase mt-1">
                  Salivary Stress & Immune Biosensor
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                  Miniaturized lab-on-a-chip for real-time biochemical saliva analysis directly on orbit. Flight-tested on the International Space Station to quantify salivary cortisol (chronic stress) and DHEA-S (immune resilience).
                </p>
              </div>

              {/* Sensor Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-purple-300 font-mono text-xs font-bold uppercase mb-1">
                    <Droplets className="w-4 h-4 text-purple-400" />
                    Non-Invasive Salivary Assay
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Rapid in-flight assay from a simple saliva swab, requiring zero invasive blood draws.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-purple-300 font-mono text-xs font-bold uppercase mb-1">
                    <Dna className="w-4 h-4 text-cyan-400" />
                    Cortisol & DHEA-S Biomarkers
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Direct biomarkers of hypothalamic-pituitary-adrenal axis stress and immune status.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-purple-300 font-mono text-xs font-bold uppercase mb-1">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    Single-Use Microfluidic Chips
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Disposable cartridge system ready for immediate use without fluidic recalibration.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-purple-300 font-mono text-xs font-bold uppercase mb-1">
                    <Usb className="w-4 h-4 text-blue-400" />
                    Flight Bus Connectivity
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Direct connection to onboard medical computer for instant data ingestion and analysis.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#simulateur"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("select-scenario", { detail: "salivaStress" }));
                    }
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-purple-400 hover:text-purple-300 uppercase tracking-wider group"
                >
                  View Biosensor Telemetry in Simulator 
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ================= 6. SPACE ACTIGRAPHY : FROM LAB TO ARTEMIS II FLIGHT ================= */}
        {activeProduct === "actigraphy" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0B0F1A]/85 border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
            {/* Left: Actiwatch Image (Ground Reference) */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/10 group shadow-xl">
                <Image
                  src="/images/actiwatch-spectrum-pro.jpg"
                  alt="Actiwatch Spectrum PRO by Philips Respironics - NASA Ames Ground Reference"
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-indigo-300 flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>● Ground Reference • Actiwatch Spectrum Plus (NASA Ames)</span>
                </div>
              </div>
            </div>

            {/* Right: Technical Specifications */}
            <div className="lg:col-span-6 text-left space-y-6">
              <div>
                <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-widest">
                  NASA AMES RESEARCH CENTER · CONDOR INSTRUMENTS (BRAZIL)
                </span>
                <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase mt-1">
                  Space Actigraphy: From Laboratory to Artemis II Flight
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                  These digital wrist instruments often do not display the time, preventing astronauts from biasing mission time-perception research. Two generations of actigraphs succeed one another in the ARCHeR protocol (Artemis Research for Crew Health and Readiness): the legacy Philips Actiwatch Spectrum Plus for pre-flight baseline data at ground facilities, and the ActLumus by Brazilian startup Condor Instruments, deployed aboard Orion for in-flight crew monitoring following the discontinuation of the Philips product line.
                </p>
              </div>

              {/* 4 Feature Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-indigo-300 font-mono text-xs font-bold uppercase mb-1">
                    <FlaskConical className="w-4 h-4 text-purple-400" />
                    Ground Baseline: Actiwatch Spectrum Plus
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Utilized at NASA Ames Research Center Fatigue Countermeasures Laboratory to establish pre-flight reference baselines (Artemis Sleep Countermeasures study).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-indigo-300 font-mono text-xs font-bold uppercase mb-1">
                    <Rocket className="w-4 h-4 text-cyan-400" />
                    In-Flight: ActLumus (Condor Instruments)
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Following Philips&apos; retirement of the Actiwatch line, NASA adopted this Brazilian actigraph for continuous crew sleep-wake tracking aboard Orion during Artemis II.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-indigo-300 font-mono text-xs font-bold uppercase mb-1">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    High-Precision Accelerometry
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Wrist micro-movements sampled at approximately 32 Hz to differentiate wakefulness, restlessness, and deep sleep phases.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-indigo-300 font-mono text-xs font-bold uppercase mb-1">
                    <Sun className="w-4 h-4 text-amber-400" />
                    Ambient Photodetectors
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Measures ambient light intensity and spectrum (blue, red, green) to evaluate its impact on circadian rhythm in the absence of natural solar cycles.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#simulateur"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("select-scenario", { detail: "actigraphy" }));
                    }
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-300 hover:text-white transition-colors group cursor-pointer"
                >
                  <span>View Actigraphy Telemetry in Simulator</span>
                  <ChevronRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Caution Box: A Non-Exhaustive List */}
        <div className="reveal-on-scroll mt-12 p-6 sm:p-7 rounded-2xl bg-[#0B0F1A]/80 border border-white/[0.08] backdrop-blur-xl relative overflow-hidden shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 shrink-0">
              <Info className="w-5 h-5 text-sky-400" />
            </div>
            <div className="space-y-2 text-left">
              <h3 className="font-mono text-sm sm:text-base font-bold text-white uppercase tracking-tight">
                A Non-Exhaustive List
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                The 6 devices presented here are those we were able to identify and document with reliable sources (space agencies, manufacturers, published peer-reviewed studies) during our research. They do not necessarily represent the entirety of the sensors NASA actually deploys to monitor astronaut health continuously: other instruments, particularly classified systems, hardware under active development, or sensors absent from the public sources we consulted, likely exist. Santellite is engineered as an open architecture: any newly documented sensor can be integrated following the same centralization principle, without modifying the core software structure.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
