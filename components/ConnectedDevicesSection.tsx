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
  Footprints,
  Moon,
} from "lucide-react";

export default function ConnectedDevicesSection() {
  const [activeProduct, setActiveProduct] = useState<
    "astroskin" | "embraceplus" | "echolight" | "dosimeter" | "saliva" | "actigraphy"
  >("astroskin");

  const [astroskinImgMode, setAstroskinImgMode] = useState<"iss" | "diagram">("iss");
  const [embraceImgMode, setEmbraceImgMode] = useState<"front" | "sensors">("front");

  const products = [
    { id: "astroskin", label: "1. Maillot Astroskin", icon: Shield, color: "text-blue-500" },
    { id: "embraceplus", label: "2. Montre EmbracePlus", icon: Heart, color: "text-cyan-400" },
    { id: "echolight", label: "3. Échographe REMS", icon: Bone, color: "text-emerald-400" },
    { id: "dosimeter", label: "4. Dosimètre Radiations", icon: AlertTriangle, color: "text-amber-400" },
    { id: "saliva", label: "5. Biocapteur Salivaire", icon: Droplets, color: "text-purple-400" },
    { id: "actigraphy", label: "6. Montre d'Actigraphie", icon: Moon, color: "text-indigo-400" },
  ];

  return (
    <section id="equipements" className="py-24 bg-[#05070D] relative overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            Équipements Éprouvés & Connectés
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-extrabold text-white tracking-tight uppercase leading-[1.12]">
            Capteurs Portables Spatiaux. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-500">
              Télémétrie Médicale Continue.
            </span>
          </h2>
          <p className="text-slate-300 mt-4 text-sm sm:text-base leading-relaxed">
            Pour assurer la santé de l&apos;équipage en mission de longue durée, Santellite centralise la télémétrie de <strong>6 dispositifs médicaux spatiaux réels</strong> : suivi cardiovasculaire continu, densité osseuse, dosimétrie et biomarqueurs salivaires.
          </p>

          {/* Product Switcher Pills (5 products) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {products.map((p) => {
              const Icon = p.icon;
              const isActive = activeProduct === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveProduct(p.id as any)}
                  className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                    isActive
                      ? "bg-white text-slate-950 border-white shadow-xl scale-105"
                      : "bg-white/5 text-slate-300 border-white/10 hover:border-white/30 hover:bg-white/10"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-slate-900" : p.color}`} />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= 1. ASTROSKIN BIO-VEST ================= */}
        {activeProduct === "astroskin" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#070d1a] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
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
                <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase mt-1">
                  Maillot Biométrique Spatial Astroskin
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                  Conçu pour surveiller les astronautes 24h/24 sans entraver le sommeil ni les activités physiques. Il intègre des capteurs textiles brevetés pour mesurer en continu les fonctions vitales critiques.
                </p>
              </div>

              {/* Sensor Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    Pression Artérielle Continue
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Tension mesurée battement par battement (PTT) sans brassard gonflable.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <Heart className="w-4 h-4 text-red-400" />
                    Électrocardiogramme 3 Dérivations
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Fréquence cardiaque et détection d&apos;arythmies en continu.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Pléthysmographie Respiratoire
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Volume et fréquence respiratoire par double bande thoracique et abdominale.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#070d1a] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
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
                <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase mt-1">
                  Montre Médicale Spatiale EmbracePlus
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                  Dispositif médical au poignet retenu pour les missions spatiales humaines (TRISH / NASA / Polaris Dawn). Conçue pour une surveillance physiologique continue de grade clinique en microgravité sans perturber les tâches de vol.
                </p>
              </div>

              {/* Sensor Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Capteur EDA Ventral (Activité Électrodermale)
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Mesure en continu de la réponse galvanique cutanée (GSR) pour évaluer le stress neurologique.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <Heart className="w-4 h-4 text-red-400" />
                    Capteur PPG Optique Haute Fréquence
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Fréquence cardiaque, variabilité (HRV) et estimation de la pression continue.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                    <Thermometer className="w-4 h-4 text-cyan-400" />
                    Sonde de Température Cutanée Continue
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Suivi précis de la thermorégulation périphérique pour anticiper les chocs hypothermiques.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#070d1a] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
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
                <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase mt-1">
                  Échographe Osseux Portable
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                  Appareil de la taille d&apos;une petite valise, utilisé par la NASA pour suivre la perte osseuse en microgravité. Mesure la densité et la microarchitecture osseuses par ultrasons, sans aucune radiation, avec un scan de moins de 10 minutes sur la colonne et le fémur.
                </p>
              </div>

              {/* Sensor Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-bold uppercase mb-1">
                    <Bone className="w-4 h-4 text-emerald-400" />
                    Densité Osseuse Sans Radiation
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Technologie à ultrasons (REMS), sans exposition aux rayons X.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-bold uppercase mb-1">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Scan Rapide
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Examen complet en moins de 10 minutes, répétable fréquemment.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-bold uppercase mb-1">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    Mesure Périodique
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Contrôle hebdomadaire plutôt qu&apos;en continu, à la différence d&apos;une montre.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#070d1a] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
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
                <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase mt-1">
                  Dosimètre Personnel de Radiations
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                  Appareil porté en continu pour mesurer la dose de radiations spatiales reçue par l&apos;astronaute. Essentiel pour un risque qu&apos;aucun autre capteur corporel ne peut détecter directement, puisque les radiations n&apos;affectent les constantes vitales que lentement et indirectement.
                </p>
              </div>

              {/* Sensor Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold uppercase mb-1">
                    <Shield className="w-4 h-4 text-amber-400" />
                    Dose Cumulée en Temps Réel
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Suivi continu de l&apos;exposition totale depuis le début de la mission.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold uppercase mb-1">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    Seuils d&apos;Alerte Personnalisés
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Notification si la dose approche une limite définie pour la mission.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold uppercase mb-1">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Historique par Période
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Répartition de la dose reçue par jour, semaine ou sortie extravéhiculaire.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#070d1a] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
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
                <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase mt-1">
                  Biocapteur Salivaire de Stress et d&apos;Immunité
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                  Laboratoire miniaturisé permettant d&apos;analyser en temps réel des biomarqueurs salivaires directement à bord. Déjà testé sur la Station spatiale internationale pour mesurer le cortisol, un marqueur du stress chronique, et la DHEA-S, liée à l&apos;équilibre du système immunitaire.
                </p>
              </div>

              {/* Sensor Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-purple-300 font-mono text-xs font-bold uppercase mb-1">
                    <Droplets className="w-4 h-4 text-purple-400" />
                    Analyse Salivaire Non Invasive
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Test rapide sur un simple prélèvement de salive, sans prise de sang.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-purple-300 font-mono text-xs font-bold uppercase mb-1">
                    <Dna className="w-4 h-4 text-cyan-400" />
                    Cortisol et DHEA-S
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Biomarqueurs du stress chronique et de l&apos;équilibre immunitaire.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-purple-300 font-mono text-xs font-bold uppercase mb-1">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    Cartouches à Usage Unique
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Système prêt à l&apos;emploi, sans entretien complexe.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
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

        {/* ================= 6. MONTRE D'ACTIGRAPHIE ARTEMIS (SOMNOWATCH PLUS) ================= */}
        {activeProduct === "actigraphy" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#070d1a] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {/* Left: Image */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/10 group shadow-xl">
                <Image
                  src="/images/somnowatch-artemis-actigraphy.jpg"
                  alt="Montre d'actigraphie spatiale SOMNOwatch plus utilisée par la NASA pour Artemis II"
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-indigo-300 flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>● Port Réel Artemis II • SOMNOwatch plus</span>
                </div>
              </div>
            </div>

            {/* Right: Technical Specifications */}
            <div className="lg:col-span-6 text-left space-y-6">
              <div>
                <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-widest">
                  NASA • PROGRAMME ARTEMIS
                </span>
                <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white uppercase mt-1">
                  Montre d&apos;Actigraphie (SOMNOwatch plus)
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                  Appareil porté au poignet, déjà utilisé par la NASA pour certains astronautes de la mission Artemis II. Il mesure en continu les mouvements, les habitudes de sommeil et l&apos;exposition à la lumière, afin de comprendre comment le corps s&apos;adapte au cycle jour-nuit perturbé des missions spatiales.
                </p>
              </div>

              {/* 4 Feature Points as given by user */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-indigo-300 font-mono text-xs font-bold uppercase mb-1">
                    <Moon className="w-4 h-4 text-indigo-400" />
                    Suivi du Sommeil
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Détection des phases de sommeil et des réveils à partir des mouvements du poignet.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-indigo-300 font-mono text-xs font-bold uppercase mb-1">
                    <Sun className="w-4 h-4 text-amber-400" />
                    Exposition à la Lumière
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Mesure de la lumière reçue, un facteur clé du dérèglement du rythme biologique.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-indigo-300 font-mono text-xs font-bold uppercase mb-1">
                    <Footprints className="w-4 h-4 text-emerald-400" />
                    Activité et Mouvement
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Accéléromètre longue durée pour suivre le niveau d&apos;activité au fil de la mission.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-indigo-300 font-mono text-xs font-bold uppercase mb-1">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Port Continu Léger
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    Boîtier compact, conçu pour ne pas gêner le sommeil ni les tâches quotidiennes.
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

      </div>
    </section>
  );
}
