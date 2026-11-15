"use client";

import React, { useState, useEffect } from "react";
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
  Footprints,
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
  const [openInfoId, setOpenInfoId] = useState<string | null>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenInfoId(null);
    }
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (target && !target.closest(".edu-info-container")) {
        setOpenInfoId(null);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const deviceEducationalInfo: Record<string, string> = {
    astroskin: "Pression artérielle (PTT), ECG 3 dérivations, respiration (pléthysmographie), SpO2, température cutanée et niveau d'activité, en continu.",
    embraceplus: "Fréquence cardiaque et variabilité cardiaque (PPG), activité électrodermale, température cutanée, SpO2 et mouvement (accéléromètre/gyroscope).",
    echolight: "Densité et microarchitecture osseuses de la colonne et du fémur, par ultrasons, sans radiation.",
    dosimeter: "Dose de radiations cumulée, mesurée en continu.",
    saliva: "Cortisol et DHEA-S salivaires, biomarqueurs du stress et de l'équilibre immunitaire.",
    actigraphy: "Ce bracelet, conçu pour le projet ARCHeR, permet d'analyser des données telles que le sommeil, la fréquence cardiaque, le niveau de stress et les mouvements, grâce à des capteurs intégrés.",
  };

  const products = [
    { id: "astroskin", label: "1. Maillot Astroskin", icon: Shield, color: "text-blue-500" },
    { id: "embraceplus", label: "2. Montre EmbracePlus", icon: Heart, color: "text-cyan-400" },
    { id: "echolight", label: "3. Échographe REMS", icon: Bone, color: "text-emerald-400" },
    { id: "dosimeter", label: "4. Dosimètre Radiations", icon: AlertTriangle, color: "text-amber-400" },
    { id: "saliva", label: "5. Biocapteur Salivaire", icon: Droplets, color: "text-purple-400" },
    { id: "actigraphy", label: "6. Bracelet ARCHeR", icon: Moon, color: "text-indigo-400" },
  ];

  return (
    <section id="equipements" className="py-24 bg-transparent relative overflow-hidden border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="reveal-on-scroll text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.05] text-slate-300 border border-white/[0.1] mb-4 backdrop-blur-md">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            Équipements Éprouvés & Connectés
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-extrabold text-white tracking-tight uppercase leading-[1.12]">
            Capteurs Portables Spatiaux. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400/80">
              Télémétrie Médicale Continue.
            </span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            Pour assurer la santé de l&apos;équipage en mission de longue durée, Santellite centralise la télémétrie de <strong>6 dispositifs médicaux spatiaux réels</strong> : suivi cardiovasculaire continu, densité osseuse, dosimétrie et biomarqueurs salivaires.
          </p>

          {/* Product Switcher Segmented Control (Apple / Linear style) */}
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
                      ? "Astronaute David Saint-Jacques portant le maillot Astroskin sur l'ISS"
                      : "Diagramme des capteurs du maillot Astroskin"
                  }
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-cyan-300">
                  {astroskinImgMode === "iss" ? "● Test Réel à bord de l'ISS" : "● Architecture des Capteurs"}
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
                  Vue 1 : Astronaute en Vol (ISS)
                </button>
                <button
                  onClick={() => setAstroskinImgMode("diagram")}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all border ${
                    astroskinImgMode === "diagram"
                      ? "bg-blue-600 text-white border-blue-500 shadow-md"
                      : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                  }`}
                >
                  Vue 2 : Schéma des Capteurs
                </button>
              </div>
            </div>

            {/* Right: Technical Specifications */}
            <div className="lg:col-span-6 text-left space-y-6">
              <div>
                <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-widest">
                  Agence Spatiale Canadienne (ASC) • Carré Technologies
                </span>
                <div className="flex items-center justify-between gap-3 mt-1 relative">
                  <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase">
                    Maillot Biométrique Spatial Astroskin
                  </h3>
                  <div className="relative edu-info-container">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenInfoId(openInfoId === "astroskin" ? null : "astroskin");
                      }}
                      aria-expanded={openInfoId === "astroskin"}
                      aria-label="Informations sur cet équipement"
                      className={`p-1.5 rounded-lg transition-colors ${
                        openInfoId === "astroskin" ? "text-cyan-400" : "text-slate-400 hover:text-cyan-400"
                      }`}
                    >
                      <Info className="w-5 h-5" />
                    </button>
                    {openInfoId === "astroskin" && (
                      <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 p-3.5 rounded-2xl bg-[#0B0F1A]/95 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.7)] z-50 text-left text-xs font-mono">
                        <span className="text-cyan-400 font-bold uppercase block text-[10px] tracking-wider mb-1">Ce qui est analysé</span>
                        <span className="text-slate-200 leading-relaxed block">{deviceEducationalInfo.astroskin}</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                  Conçu pour surveiller les astronautes 24h/24 sans entraver le sommeil ni les activités physiques. Il intègre des capteurs textiles brevetés pour mesurer en continu les fonctions vitales critiques.
                </p>
              </div>

              {/* Sensor Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    Pression Artérielle Continue
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Tension mesurée battement par battement (PTT) sans brassard gonflable.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <Heart className="w-4 h-4 text-red-400" />
                    Électrocardiogramme 3 Dérivations
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Fréquence cardiaque et détection d&apos;arythmies en continu.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Pléthysmographie Respiratoire
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Volume et fréquence respiratoire par double bande thoracique et abdominale.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    SpO2 & Température Cutanée
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Saturation en oxygène et sonde de thermorégulation intégrée.
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
                  Visualiser la télémétrie du maillot dans le simulateur 
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
                      ? "Montre connectée médicale EmbracePlus"
                      : "Capteurs dorsaux EmbracePlus par Empatica"
                  }
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-cyan-300">
                  {embraceImgMode === "front" ? "● EmbracePlus — Vue de Face" : "● Architecture Dorsale des Capteurs"}
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
                  Vue 1 : Montre EmbracePlus
                </button>
                <button
                  onClick={() => setEmbraceImgMode("sensors")}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all border ${
                    embraceImgMode === "sensors"
                      ? "bg-blue-600 text-white border-blue-500 shadow-md"
                      : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                  }`}
                >
                  Vue 2 : Capteurs Cliniques Dorsaux
                </button>
              </div>
            </div>

            {/* Right: Technical Specifications */}
            <div className="lg:col-span-6 text-left space-y-6">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                  Empatica • Certifié Recherche Spatiale NASA / TRISH
                </span>
                <div className="flex items-center justify-between gap-3 mt-1 relative">
                  <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase">
                    Montre Médicale Spatiale EmbracePlus
                  </h3>
                  <div className="relative edu-info-container">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenInfoId(openInfoId === "embraceplus" ? null : "embraceplus");
                      }}
                      aria-expanded={openInfoId === "embraceplus"}
                      aria-label="Informations sur cet équipement"
                      className={`p-1.5 rounded-lg transition-colors ${
                        openInfoId === "embraceplus" ? "text-cyan-400" : "text-slate-400 hover:text-cyan-400"
                      }`}
                    >
                      <Info className="w-5 h-5" />
                    </button>
                    {openInfoId === "embraceplus" && (
                      <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 p-3.5 rounded-2xl bg-[#0B0F1A]/95 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.7)] z-50 text-left text-xs font-mono">
                        <span className="text-cyan-400 font-bold uppercase block text-[10px] tracking-wider mb-1">Ce qui est analysé</span>
                        <span className="text-slate-200 leading-relaxed block">{deviceEducationalInfo.embraceplus}</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                  Dispositif médical au poignet retenu pour les missions spatiales humaines (TRISH / NASA / Polaris Dawn). Conçue pour une surveillance physiologique continue de grade clinique en microgravité sans perturber les tâches de vol.
                </p>
              </div>

              {/* Sensor Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Capteur EDA Ventral (Activité Électrodermale)
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Mesure en continu de la réponse galvanique cutanée (GSR) pour évaluer le stress neurologique.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <Heart className="w-4 h-4 text-red-400" />
                    Capteur PPG Optique Haute Fréquence
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Fréquence cardiaque, variabilité (HRV) et estimation de la pression continue.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <Thermometer className="w-4 h-4 text-cyan-400" />
                    Sonde de Température Cutanée Continue
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Suivi précis de la thermorégulation périphérique pour anticiper les chocs hypothermiques.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    Accéléromètre & Gyroscope 3D (IP67)
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Analyse des mouvements, des phases de sommeil circadien et détection instantanée de chute.
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
                  Tester la télémétrie EmbracePlus dans le simulateur 
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. ECHOLIGHT (TECHNOLOGIE REMS) ================= */}
        {activeProduct === "echolight" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0B0F1A]/85 border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
            {/* Left: Image */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/10 group shadow-xl">
                <Image
                  src="/images/echolight-bone-scanner.jpg"
                  alt="Échographe osseux portable EchoLight REMS"
                  fill
                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-emerald-400">
                  ● Échographe Osseux Portatif REMS
                </div>
              </div>
              <div className="text-center font-mono text-xs text-slate-400">
                Scan ultrasonore de la colonne vertébrale et du fémur en &lt; 10 min
              </div>
            </div>

            {/* Right: Technical Specifications */}
            <div className="lg:col-span-6 text-left space-y-6">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
                  NASA · Echolight (Technologie REMS)
                </span>
                <div className="flex items-center justify-between gap-3 mt-1 relative">
                  <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase">
                    Échographe Osseux Portable
                  </h3>
                  <div className="relative edu-info-container">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenInfoId(openInfoId === "echolight" ? null : "echolight");
                      }}
                      aria-expanded={openInfoId === "echolight"}
                      aria-label="Informations sur cet équipement"
                      className={`p-1.5 rounded-lg transition-colors ${
                        openInfoId === "echolight" ? "text-cyan-400" : "text-slate-400 hover:text-cyan-400"
                      }`}
                    >
                      <Info className="w-5 h-5" />
                    </button>
                    {openInfoId === "echolight" && (
                      <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 p-3.5 rounded-2xl bg-[#0B0F1A]/95 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.7)] z-50 text-left text-xs font-mono">
                        <span className="text-cyan-400 font-bold uppercase block text-[10px] tracking-wider mb-1">Ce qui est analysé</span>
                        <span className="text-slate-200 leading-relaxed block">{deviceEducationalInfo.echolight}</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                  Appareil de la taille d&apos;une petite valise, utilisé par la NASA pour suivre la perte osseuse en microgravité. Mesure la densité et la microarchitecture osseuses par ultrasons, sans aucune radiation, avec un scan de moins de 10 minutes sur la colonne et le fémur.
                </p>
              </div>

              {/* Sensor Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-bold uppercase mb-1">
                    <Bone className="w-4 h-4 text-emerald-400" />
                    Densité Osseuse Sans Radiation
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Technologie à ultrasons (REMS), sans exposition aux rayons X.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-bold uppercase mb-1">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Scan Rapide
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Examen complet en moins de 10 minutes, répétable fréquemment.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-bold uppercase mb-1">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    Mesure Périodique
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Contrôle hebdomadaire plutôt qu&apos;en continu, à la différence d&apos;une montre.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-bold uppercase mb-1">
                    <TrendingDown className="w-4 h-4 text-amber-400" />
                    Suivi de la Perte Osseuse
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Permet d&apos;ajuster les contre-mesures (exercice, alimentation) en cours de mission.
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
                  Visualiser les résultats du scan osseux dans le simulateur 
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. DOSIMÈTRE PERSONNEL DE RADIATIONS ================= */}
        {activeProduct === "dosimeter" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0B0F1A]/85 border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
            {/* Left: Image */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/10 group shadow-xl">
                <Image
                  src="/images/dosimeter-tracerco-hrp.png"
                  alt="Dosimètre personnel de radiations spatiales"
                  fill
                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-amber-400">
                  ● Dosimètre Personnel Actif
                </div>
              </div>
              <div className="text-center font-mono text-xs text-slate-400">
                Télémétrie radiative en direct (Dose Rate &amp; Dose cumulée en micro Sv)
              </div>
            </div>

            {/* Right: Technical Specifications */}
            <div className="lg:col-span-6 text-left space-y-6">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
                  Programme de Recherche Humaine de la NASA (HRP)
                </span>
                <div className="flex items-center justify-between gap-3 mt-1 relative">
                  <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase">
                    Dosimètre Personnel de Radiations
                  </h3>
                  <div className="relative edu-info-container">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenInfoId(openInfoId === "dosimeter" ? null : "dosimeter");
                      }}
                      aria-expanded={openInfoId === "dosimeter"}
                      aria-label="Informations sur cet équipement"
                      className={`p-1.5 rounded-lg transition-colors ${
                        openInfoId === "dosimeter" ? "text-cyan-400" : "text-slate-400 hover:text-cyan-400"
                      }`}
                    >
                      <Info className="w-5 h-5" />
                    </button>
                    {openInfoId === "dosimeter" && (
                      <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 p-3.5 rounded-2xl bg-[#0B0F1A]/95 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.7)] z-50 text-left text-xs font-mono">
                        <span className="text-cyan-400 font-bold uppercase block text-[10px] tracking-wider mb-1">Ce qui est analysé</span>
                        <span className="text-slate-200 leading-relaxed block">{deviceEducationalInfo.dosimeter}</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                  Appareil porté en continu pour mesurer la dose de radiations spatiales reçue par l&apos;astronaute. Essentiel pour un risque qu&apos;aucun autre capteur corporel ne peut détecter directement, puisque les radiations n&apos;affectent les constantes vitales que lentement et indirectement.
                </p>
              </div>

              {/* Sensor Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold uppercase mb-1">
                    <Shield className="w-4 h-4 text-amber-400" />
                    Dose Cumulée en Temps Réel
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Suivi continu de l&apos;exposition totale depuis le début de la mission.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold uppercase mb-1">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    Seuils d&apos;Alerte Personnalisés
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Notification si la dose approche une limite définie pour la mission.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold uppercase mb-1">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Historique par Période
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Répartition de la dose reçue par jour, semaine ou sortie extravéhiculaire.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold uppercase mb-1">
                    <Wifi className="w-4 h-4 text-emerald-400" />
                    Export des Données
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Transmission au logiciel par liaison sans fil ou fichier d&apos;export, selon le modèle.
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
                  Visualiser la télémétrie du dosimètre dans le simulateur 
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ================= 5. BIOCAPTEUR SALIVAIRE DE STRESS ET D'IMMUNITÉ ================= */}
        {activeProduct === "saliva" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0B0F1A]/85 border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
            {/* Left: Image */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/10 group shadow-xl">
                <Image
                  src="/images/saliva-biosensor-iss.jpg"
                  alt="Astronaute testant le biocapteur salivaire sur l'ISS"
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-purple-400">
                  ● Test en Vol Réel sur l&apos;ISS
                </div>
              </div>
              <div className="text-center font-mono text-xs text-slate-400">
                Analyse biochimique du cortisol et de la DHEA-S directement à bord
              </div>
            </div>

            {/* Right: Technical Specifications */}
            <div className="lg:col-span-6 text-left space-y-6">
              <div>
                <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-widest">
                  Agence Spatiale Italienne (ASI) · Université de Bologne
                </span>
                <div className="flex items-center justify-between gap-3 mt-1 relative">
                  <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase">
                    Biocapteur Salivaire de Stress et d&apos;Immunité
                  </h3>
                  <div className="relative edu-info-container">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenInfoId(openInfoId === "saliva" ? null : "saliva");
                      }}
                      aria-expanded={openInfoId === "saliva"}
                      aria-label="Informations sur cet équipement"
                      className={`p-1.5 rounded-lg transition-colors ${
                        openInfoId === "saliva" ? "text-cyan-400" : "text-slate-400 hover:text-cyan-400"
                      }`}
                    >
                      <Info className="w-5 h-5" />
                    </button>
                    {openInfoId === "saliva" && (
                      <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 p-3.5 rounded-2xl bg-[#0B0F1A]/95 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.7)] z-50 text-left text-xs font-mono">
                        <span className="text-cyan-400 font-bold uppercase block text-[10px] tracking-wider mb-1">Ce qui est analysé</span>
                        <span className="text-slate-200 leading-relaxed block">{deviceEducationalInfo.saliva}</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                  Laboratoire miniaturisé permettant d&apos;analyser en temps réel des biomarqueurs salivaires directement à bord. Déjà testé sur la Station spatiale internationale pour mesurer le cortisol, un marqueur du stress chronique, et la DHEA-S, liée à l&apos;équilibre du système immunitaire.
                </p>
              </div>

              {/* Sensor Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-purple-300 font-mono text-xs font-bold uppercase mb-1">
                    <Droplets className="w-4 h-4 text-purple-400" />
                    Analyse Salivaire Non Invasive
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Test rapide sur un simple prélèvement de salive, sans prise de sang.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-purple-300 font-mono text-xs font-bold uppercase mb-1">
                    <Dna className="w-4 h-4 text-cyan-400" />
                    Cortisol et DHEA-S
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Biomarqueurs du stress chronique et de l&apos;équilibre immunitaire.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-purple-300 font-mono text-xs font-bold uppercase mb-1">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    Cartouches à Usage Unique
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Système prêt à l&apos;emploi, sans entretien complexe.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-purple-300 font-mono text-xs font-bold uppercase mb-1">
                    <Usb className="w-4 h-4 text-blue-400" />
                    Connexion Filaire au Logiciel
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Branchement par port USB à l&apos;ordinateur de bord pour l&apos;analyse.
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
                  Visualiser les résultats du biocapteur dans le simulateur 
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ================= 6. BRACELET ACTIGRAPHIQUE SPATIAL ARCHER ================= */}
        {activeProduct === "actigraphy" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0B0F1A]/85 border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
            {/* Left: Bracelet ARCHeR Image */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/10 group shadow-xl">
                <Image
                  src="/images/archer-actigraphy-bracelet.webp"
                  alt="Bracelet actigraphique spatial conçu pour le projet ARCHeR - Sommeil, fréquence cardiaque, stress et mouvements"
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-indigo-300 flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>● Capteur Portable • Bracelet ARCHeR (Artemis Research)</span>
                </div>
              </div>
            </div>

            {/* Right: Technical Specifications */}
            <div className="lg:col-span-6 text-left space-y-6">
              <div>
                <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-widest">
                  NASA AMES RESEARCH CENTER · PROTOCOLE ARCHER
                </span>
                <div className="flex items-center justify-between gap-3 mt-1 relative">
                  <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase">
                    Bracelet Actigraphique Spatial ARCHeR
                  </h3>
                  <div className="relative edu-info-container">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenInfoId(openInfoId === "actigraphy" ? null : "actigraphy");
                      }}
                      aria-expanded={openInfoId === "actigraphy"}
                      aria-label="Informations sur cet équipement"
                      className={`p-1.5 rounded-lg transition-colors ${
                        openInfoId === "actigraphy" ? "text-cyan-400" : "text-slate-400 hover:text-cyan-400"
                      }`}
                    >
                      <Info className="w-5 h-5" />
                    </button>
                    {openInfoId === "actigraphy" && (
                      <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 p-3.5 rounded-2xl bg-[#0B0F1A]/95 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.7)] z-50 text-left text-xs font-mono">
                        <span className="text-cyan-400 font-bold uppercase block text-[10px] tracking-wider mb-1">Ce qui est analysé</span>
                        <span className="text-slate-200 leading-relaxed block">{deviceEducationalInfo.actigraphy}</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                  Ce bracelet, conçu pour le projet ARCHeR, permet d&apos;analyser des données telles que le sommeil, la fréquence cardiaque, le niveau de stress et les mouvements, grâce à des capteurs intégrés.
                </p>
              </div>

              {/* 4 Feature Points as given by user */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-indigo-300 font-mono text-xs font-bold uppercase mb-1">
                    <Moon className="w-4 h-4 text-indigo-400" />
                    Sommeil &amp; Cycles Circadiens
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Suivi continu de l&apos;efficacité du sommeil, de l&apos;endormissement et des phases REM en microgravité.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-indigo-300 font-mono text-xs font-bold uppercase mb-1">
                    <Heart className="w-4 h-4 text-red-400" />
                    Fréquence Cardiaque &amp; VFC
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Capteurs optiques mesurant le pouls en continu et la variabilité de la fréquence cardiaque au repos.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-indigo-300 font-mono text-xs font-bold uppercase mb-1">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Niveau de Stress &amp; Réponse EDA
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Évaluation de la charge émotionnelle et du stress neurologique pendant les phases critiques de mission.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-2 text-indigo-300 font-mono text-xs font-bold uppercase mb-1">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    Mouvements &amp; Accélérométrie
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Capteurs inertiels triaxiaux enregistrant l&apos;agitation motrice et la dépense énergétique journalière.
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
                  <span>Visualiser la télémétrie de l&apos;actigraphie dans le simulateur</span>
                  <ChevronRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Encart de prudence : Une liste non exhaustive */}
        <div className="reveal-on-scroll mt-12 p-6 sm:p-7 rounded-2xl bg-[#0B0F1A]/80 border border-white/[0.08] backdrop-blur-xl relative overflow-hidden shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 shrink-0">
              <Info className="w-5 h-5 text-sky-400" />
            </div>
            <div className="space-y-2 text-left">
              <h3 className="font-mono text-sm sm:text-base font-bold text-white uppercase tracking-tight">
                Une liste non exhaustive
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                Les 6 dispositifs présentés ici sont ceux que nous avons pu identifier et documenter avec des sources fiables (agences spatiales, fabricants, études publiées) au cours de nos recherches. Ils ne représentent pas nécessairement l&apos;ensemble des capteurs que la NASA utilise réellement pour surveiller la santé de ses astronautes en continu : d&apos;autres instruments, notamment ceux encore classifiés, en développement, ou simplement absents des sources publiques que nous avons consultées, existent probablement. Santellite est conçu comme une architecture ouverte : chaque nouveau capteur documenté peut être intégré selon le même principe de centralisation, sans modifier la structure du logiciel.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
