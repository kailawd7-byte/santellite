"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Shield,
  Zap,
  Cpu,
  Layers,
  Activity,
  Heart,
  Thermometer,
  Rotate3d,
  Sparkles,
  CheckCircle2,
  AlertOctagon,
  Eye,
  Radio,
} from "lucide-react";

interface EquipmentItem {
  id: string;
  name: string;
  codename: string;
  category: string;
  conceptOrigin: string;
  imagePoster: string;
  badge: string;
  badgeColor: string;
  description: string;
  emergencyCapability: string;
  specifications: { label: string; value: string }[];
  hologramColor: string;
}

export default function BioCarapace3DViewer() {
  const equipments: EquipmentItem[] = [
    {
      id: "bio-carapace",
      name: "La Bio-Carapace Noire Spatiale (Mark IV)",
      codename: "AERO-CARAPACE • PROTOCOLE SYMBIOSE",
      category: "Combinaison Tout-en-Un Seconde Peau",
      conceptOrigin: "Inspirée du concept de la Carapace Noire (Warhammer 40k) & de la BioSuit MIT/NASA",
      imagePoster: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200&auto=format&fit=crop",
      badge: "Zéro Clic • Autonomie 100%",
      badgeColor: "bg-cyan-500/15 border-cyan-500/30 text-cyan-300",
      description:
        "Fini la dispersion de 5 montres ou patchs à recharger. Cette combinaison intégrale fusionne textile au graphène, nanofibres piézoélectriques et micro-canaux thermorégulés. Dès l'enfilage, elle épouse la peau et transmet 24/7 un bilan clinique complet au cockpit sans que l'astronaute n'ait jamais à toucher une interface.",
      emergencyCapability:
        "Électrodes de Défibrillation Automatique intégrées au torse : en cas de syncope, évanouissement ou arrêt cardiaque en EVA, la combinaison délivre une décharge électrique biphasique calibrée (150J) pour réanimer instantanément le patient.",
      specifications: [
        { label: "Matériau conducteur :", value: "Tricot au graphène & élastomère piézoélectrique" },
        { label: "Capteurs tissés :", value: "10 000 micro-nœuds bio-impédance & thermiques" },
        { label: "Pression artérielle :", value: "Continue PTT sans brassard gonflable" },
        { label: "Choc de réanimation :", value: "Décharge automatique 150J biphasique (AID/BES)" },
      ],
      hologramColor: "#00E5FF",
    },
    {
      id: "neuro-visor",
      name: "Le Neuro-Casque HUD Holographique",
      codename: "NEURO-VISOR IA • SYSTÈME RETINA-SYNC",
      category: "Visière Tactique & Télémétrie Cérébrale",
      conceptOrigin: "Interface Neurale Directe & Suivi Rétinien NASA HRP",
      imagePoster: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop",
      badge: "EEG 16 Canaux • Rétine",
      badgeColor: "bg-purple-500/15 border-purple-500/30 text-purple-300",
      description:
        "Intégré au col de la Bio-Carapace, ce casque scanne la dilatation pupillaire et les ondes cérébrales par électroencéphalographie (EEG) frontale. Il projette les constantes vitales et les alertes directement sur la visière en réalité augmentée en cas de danger critique.",
      emergencyCapability:
        "Détection de la perte de conscience en moins de 150 ms par analyse de l'activité cérébrale et déclenchement du protocole de maintien de l'oxygénation cabine.",
      specifications: [
        { label: "Capteurs cérébraux :", value: "16 électrodes EEG passives sèches" },
        { label: "Suivi oculaire :", value: "Oculométrie infrarouge (Eye-tracking 120 Hz)" },
        { label: "Affichage rétinien :", value: "HUD holographique transparent 4K" },
        { label: "Alerte sensorielle :", value: "Impulsion sonore binaurale + flash visuel" },
      ],
      hologramColor: "#A855F7",
    },
    {
      id: "plss-core",
      name: "Le Module Dorsal de Réanimation (PLSS Bio-Core)",
      codename: "PLSS BIO-CORE • GÉNÉRATEUR & IA EMBARQUÉE",
      category: "Unité Autonome de Support Vital & Décharge",
      conceptOrigin: "Générateur Biphasique Aérospatial & IA Edge Computing",
      imagePoster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
      badge: "Générateur 150J • IA Locale",
      badgeColor: "bg-red-500/15 border-red-500/30 text-red-300",
      description:
        "Vissé le long de la colonne vertébrale sous la forme d'un exosquelette ultra-plat, ce module abrite le processeur IA médical de VitaOrbit et la pile à supercondensateur chargée d'alimenter les décharges de réanimation cardiaque et les pompes à insuline/atropine.",
      emergencyCapability:
        "Gestion autonome des situations de détresse extrême : décision de défibrillation, injection micro-fluidique de solutés d'urgence et émission d'un signal balise prioritaire vers Houston.",
      specifications: [
        { label: "Accumulateur choc :", value: "Supercondensateur graphène 200J instantané" },
        { label: "Processeur embarqué :", value: "Edge AI Neural NPU (50 TOPS hors-ligne)" },
        { label: "Autonomie électrique :", value: "72 heures en mode surveillance permanente" },
        { label: "Résistance thermique :", value: "-150°C à +120°C en milieu lunaire" },
      ],
      hologramColor: "#EF4444",
    },
    {
      id: "anti-syncope-boots",
      name: "Bottes & Manches de Contre-Pression Active",
      codename: "PNEUMO-VEINS • SYSTÈME ANTI-G & ANTI-SYNCOPE",
      category: "Vascularisation Artificielle Dynamique",
      conceptOrigin: "Combinaisons Anti-G des pilotes de chasse & Médecine d'apesanteur",
      imagePoster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop",
      badge: "Compression Active • Flux Sanguin",
      badgeColor: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
      description:
        "En microgravité, les fluides corporels migrent vers la tête (syndrome SANS) puis s'effondrent brutalement lors du retour au sol ou d'un effort EVA, provoquant des évanouissements. Ces bandes textiles gonflables exercent une compression séquentielle millimétrée.",
      emergencyCapability:
        "Compression péristaltique automatique dès que la pression systolique chute sous 85 mmHg, forçant le sang vers le cœur et le cerveau pour empêcher l'évanouissement.",
      specifications: [
        { label: "Actuateurs :", value: "Micro-vessies pneumatiques à gaz inerte" },
        { label: "Pression dynamique :", value: "20 à 75 mmHg adaptatifs séquentiels" },
        { label: "Temps de réaction :", value: "< 0.3s dès détection d'hypotension" },
        { label: "Protection :", value: "Prévient les syncopes posturales et le choc" },
      ],
      hologramColor: "#10B981",
    },
  ];

  const [activeItem, setActiveItem] = useState<EquipmentItem>(equipments[0]);
  const [viewAngle, setViewAngle] = useState<"face" | "profile" | "shock" | "thermal">("face");

  // 3D Card mouse physics
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-12deg to +12deg)
    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Scroll effect on 3D tilt
  useEffect(() => {
    const handleScroll = () => {
      if (!isHovered) {
        const scrollOffset = window.scrollY * 0.02;
        setRotateY(Math.sin(scrollOffset) * 4);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHovered]);

  return (
    <section id="bio-carapace-showcase" className="py-24 relative overflow-hidden bg-[#05070d] border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cyan-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            L&apos;Équipement du Futur : La Bio-Carapace Noire
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Une tenue tout-en-un connectée : Zéro accessoire, surveillance totale
          </h2>
          <p className="text-slate-300 mt-4 text-base sm:text-lg">
            Inspirée de la mythique <strong>Carapace Noire de Warhammer 40k</strong> et des prototypes <strong>BioSuit de la NASA/MIT</strong>, 
            cette seconde peau autonome mesure l&apos;intégralité des paramètres physiologiques dès qu&apos;elle est portée, et réanime le patient par <strong>décharge électrique automatique</strong> en cas de syncope.
          </p>
        </div>

        {/* 4 Interactive Equipment Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {equipments.map((eq) => {
            const isSelected = eq.id === activeItem.id;
            return (
              <button
                key={eq.id}
                onClick={() => setActiveItem(eq)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border flex items-center gap-2 ${
                  isSelected
                    ? "bg-white text-slate-950 border-white shadow-xl shadow-cyan-500/20 scale-105"
                    : "glass-panel text-slate-300 border-white/10 hover:border-cyan-500/40 hover:text-white"
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-cyan-500" />
                <span>{eq.name.split("(")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Interactive Product Sheet Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: 3D Holographic Interactive Viewer (Col 7) */}
          <div className="lg:col-span-7 perspective-1000">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transition: isHovered ? "transform 0.08s ease-out" : "transform 0.5s ease-out",
              }}
              className="relative rounded-3xl glass-hud border border-cyan-500/30 p-6 sm:p-10 shadow-2xl cursor-grab active:cursor-grabbing preserve-3d overflow-hidden"
            >
              {/* Dynamic mouse glare overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 320px at ${glarePosition.x}% ${glarePosition.y}%, rgba(0, 229, 255, 0.25), transparent 70%)`,
                }}
              />

              {/* HUD Header Bar */}
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                  <span className="font-mono text-xs font-bold tracking-widest text-cyan-300 uppercase">
                    FICHE PRODUIT 3D INTERACTIVE • NASA SPEC-2026
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <Rotate3d className="w-4 h-4 text-cyan-400" />
                  <span>Survolez avec la souris pour pivoter en 3D</span>
                </div>
              </div>

              {/* Holographic 3D View Screen */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-[#070d1a]/80 rounded-2xl border border-cyan-500/20 flex items-center justify-center overflow-hidden hud-grid-pattern">
                {/* 3D Floating Vector Model Representation */}
                <div className="relative w-64 h-80 flex items-center justify-center transition-transform duration-300">
                  {/* Rotating Holographic Grid Rings */}
                  <div className="absolute w-72 h-72 rounded-full border border-cyan-500/20 animate-spin-slow opacity-30" />
                  <div className="absolute w-56 h-56 rounded-full border border-dashed border-cyan-400/30 animate-radar-sweep opacity-40" />

                  {/* High-Tech Vector Holographic Suit Model */}
                  <svg
                    viewBox="0 0 240 360"
                    className="w-full h-full drop-shadow-[0_0_25px_rgba(0,229,255,0.4)]"
                  >
                    {/* Suit Contour Outline */}
                    <path
                      d="M120 20 C134 20 144 30 144 48 C144 62 134 72 120 72 C106 72 96 62 96 48 C96 30 106 20 120 20 Z 
                      M114 73 L126 73 L134 86 L174 105 C179 108 182 114 180 119 L162 195 C160 200 155 204 150 202 L138 198 L139 240 L154 330 C155 337 149 344 142 344 L134 344 C129 344 126 341 125 336 L115 255 L115 255 L105 336 C104 341 101 344 96 344 L88 344 C81 344 75 337 76 330 L91 240 L92 198 L80 202 C75 204 70 200 68 195 L50 119 C48 114 51 108 56 105 L96 86 L104 73 Z"
                      fill="none"
                      stroke={activeItem.hologramColor}
                      strokeWidth="2.5"
                      className="opacity-90"
                    />

                    {/* Nanofiber Mesh Texture Layer */}
                    <path
                      d="M110 85 L130 85 M100 110 L140 110 M95 135 L145 135 M90 160 L150 160 M95 185 L145 185 M100 210 L140 210 M105 240 L135 240 M110 270 L130 270 M115 300 L125 300"
                      stroke={activeItem.hologramColor}
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      className="opacity-40"
                    />

                    {/* Defibrillation Shock Electrodes (Torso / Heart) */}
                    <g className="animate-pulse">
                      <rect x="100" y="115" width="40" height="25" rx="6" fill="rgba(239, 68, 68, 0.25)" stroke="#EF4444" strokeWidth="2" />
                      <circle cx="120" cy="127" r="4" fill="#EF4444" />
                      <path d="M118 120 L124 126 L116 128 L122 134" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                    </g>
                    <text x="148" y="125" fill="#EF4444" fontSize="9" fontFamily="monospace" fontWeight="bold">
                      ÉLECTRODE CHOC 150J
                    </text>
                    <line x1="140" y1="127" x2="146" y2="127" stroke="#EF4444" strokeWidth="1.5" />

                    {/* Neural & Vitals Telemetry Node */}
                    <circle cx="120" cy="46" r="6" fill="rgba(0, 229, 255, 0.3)" stroke="#00E5FF" strokeWidth="2" />
                    <text x="135" y="49" fill="#00E5FF" fontSize="8" fontFamily="monospace">
                      HUD RETINA-SYNC
                    </text>
                    <line x1="126" y1="46" x2="132" y2="46" stroke="#00E5FF" strokeWidth="1.5" />

                    {/* Anti-Syncope Pneumatic Veins */}
                    <g>
                      <circle cx="103" cy="275" r="4" fill="#10B981" />
                      <circle cx="127" cy="275" r="4" fill="#10B981" />
                      <line x1="103" y1="275" x2="60" y2="275" stroke="#10B981" strokeWidth="1.5" />
                      <text x="2" y="278" fill="#10B981" fontSize="8" fontFamily="monospace">
                        VEINES ANTI-G
                      </text>
                    </g>
                  </svg>

                  {/* Corner Target Markers */}
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-500/70">
                    + SYS_STATUS: OPERATIONAL
                  </div>
                  <div className="absolute bottom-2 right-2 text-[10px] font-mono text-cyan-500/70">
                    + ROTATION_3D: ACTIVE
                  </div>
                </div>

                {/* Perspective View Angle Switcher */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10 text-xs">
                  <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">Mode d&apos;inspection 3D :</span>
                  <div className="flex gap-1.5 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => setViewAngle("face")}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                        viewAngle === "face" ? "bg-cyan-500 text-black font-bold" : "text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      Vue Face 3D
                    </button>
                    <button
                      onClick={() => setViewAngle("profile")}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                        viewAngle === "profile" ? "bg-cyan-500 text-black font-bold" : "text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      Coupe 5 Couches
                    </button>
                    <button
                      onClick={() => setViewAngle("shock")}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                        viewAngle === "shock" ? "bg-red-500 text-white font-bold" : "text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      Électrodes Choc
                    </button>
                    <button
                      onClick={() => setViewAngle("thermal")}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                        viewAngle === "thermal" ? "bg-amber-500 text-black font-bold" : "text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      Thermique
                    </button>
                  </div>
                </div>
              </div>

              {/* Real-time Bio-Connection Notice */}
              <div className="mt-4 pt-4 border-t border-cyan-500/20 flex flex-wrap items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Synchronisation Passive Immédiate : <strong>0 Clic Requis</strong></span>
                </div>
                <div className="font-mono text-cyan-300">
                  Protocole Avionique : <strong className="text-white">NASA SpaceMesh 100% Edge</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Technical Product Sheet Specs (Col 5) */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div>
              <span className="text-[11px] font-mono tracking-wider text-cyan-400 font-bold uppercase block mb-1">
                {activeItem.codename}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {activeItem.name}
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-1 italic">
                {activeItem.conceptOrigin}
              </p>
            </div>

            {/* Badge */}
            <div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${activeItem.badgeColor}`}>
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                {activeItem.badge}
              </span>
            </div>

            {/* Main Description */}
            <p className="text-sm text-slate-300 leading-relaxed">
              {activeItem.description}
            </p>

            {/* Emergency & Defibrillation Box */}
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                <Zap className="w-4 h-4 fill-current" />
                <span>Capacité de Réanimation & Décharge Automatique :</span>
              </div>
              <p className="leading-relaxed text-slate-300">
                {activeItem.emergencyCapability}
              </p>
            </div>

            {/* Specifications Table */}
            <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2.5 text-xs">
              <h4 className="font-mono uppercase font-bold text-slate-400 tracking-wider text-[11px] mb-2">
                Fiche Technique & Matériaux :
              </h4>
              {activeItem.specifications.map((spec, i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-1.5 last:border-b-0">
                  <span className="text-slate-400">{spec.label}</span>
                  <span className="font-mono text-white font-semibold text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
