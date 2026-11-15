"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  Heart,
  Shield,
  Zap,
  Radio,
  Clock,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Bone,
  Droplets,
  Radiation,
  Flame,
  Dna,
  Wifi,
  Moon,
  Smile,
  Thermometer,
  Droplet,
} from "lucide-react";

interface Scenario {
  id: string;
  buttonLabel: string;
  badgeDevice: string;
  name: string;
  missionStatus: string;
  aiDiagnosis: string;
  aiConfidence: string;
  statusText: string;
  statusColor: string;
  dotColor: string;
  
  // Les 6 Indicateurs Fondamentaux de Santé (NASA Core Health)
  bp: string;
  bpDiag: string;
  bpStatus: "normal" | "warning" | "danger";

  bpm: number;
  bpmDiag: string;
  bpmStatus: "normal" | "warning" | "danger";

  glycemia: string;
  glycemiaDiag: string;
  glycemiaStatus: "normal" | "warning" | "danger";

  bodyTemp: string;
  bodyTempDiag: string;
  bodyTempStatus: "normal" | "warning" | "danger";

  sleepDuration: string;
  sleepDiag: string;
  sleepStatus: "normal" | "warning" | "danger";

  mood: string;
  moodDiag: string;
  moodStatus: "normal" | "warning" | "danger";

  // Oxymétrie
  spo2: string;
  spo2Diag: string;
  spo2Status: "normal" | "warning" | "danger";

  // Métrique Osseuse (Échographe REMS EchoLight)
  tScore: string;
  tScoreDiag: string;
  boneLoss: string;
  boneStatus: "normal" | "warning" | "danger";

  // Métrique Radiations (Dosimètre Personnel NASA HRP)
  doseRate: string;
  doseRateDiag: string;
  doseTotal: string;
  radStatus: "normal" | "warning" | "danger";

  // Métrique Neuro-Immunitaire (Biocapteur Salivaire ASI & EmbracePlus)
  cortisol: string;
  cortisolDiag: string;
  edaStress: string;
  stressStatus: "normal" | "warning" | "danger";

  // Protocole Recommandé par l'IA
  recTitle: string;
  recText: string;
  recDeviceUsed: string;
  recBorder: string;
  recBg: string;

  isShockActive?: boolean;

  // Statut des 5 capteurs pour ce scénario
  deviceStatus: {
    astroskin: { text: string; state: "online" | "alert" | "critical" };
    embrace: { text: string; state: "online" | "alert" | "critical" };
    echolight: { text: string; state: "online" | "alert" | "critical" };
    dosimeter: { text: string; state: "online" | "alert" | "critical" };
    saliva: { text: string; state: "online" | "alert" | "critical" };
    actigraphy: { text: string; state: "online" | "alert" | "critical" };
  };
}

export default function TelemetrySimulator() {
  const scenarios: Record<string, Scenario> = {
    nominal: {
      id: "nominal",
      buttonLabel: "1. Maillot Astroskin (Nominal & PTT)",
      badgeDevice: "1. Maillot Astroskin (PTT & ECG)",
      name: "Cmdr. Thomas P. • Expédition 74",
      missionStatus: "SOL 142 • ORBITE BASSE TERRESTRE",
      aiDiagnosis: "Bio-IA : Stabilité cardiovasculaire et métabolique optimale. Aucun signal faible décelé.",
      aiConfidence: "99.8%",
      statusText: "État : Optimal (Nominal)",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      dotColor: "bg-emerald-400",

      // Les 6 Indicateurs Fondamentaux
      bp: "118/76",
      bpDiag: "Normotension PTT continue",
      bpStatus: "normal",

      bpm: 68,
      bpmDiag: "Rythme sinusal régulier (65-72 BPM)",
      bpmStatus: "normal",

      glycemia: "94 mg/dL",
      glycemiaDiag: "Normoglycémie basale stable",
      glycemiaStatus: "normal",

      bodyTemp: "36.8 °C",
      bodyTempDiag: "Thermorégulation optimale",
      bodyTempStatus: "normal",

      sleepDuration: "7h 35m",
      sleepDiag: "Efficacité 89% • 4 cycles REM",
      sleepStatus: "normal",

      mood: "Serein (8.8/10)",
      moodDiag: "Stabilité thymique & concentration",
      moodStatus: "normal",

      spo2: "98%",
      spo2Diag: "Saturation oxygénique optimale",
      spo2Status: "normal",

      tScore: "-0.2",
      tScoreDiag: "Densité osseuse normale (colonne & fémur)",
      boneLoss: "-0.1%/mois",
      boneStatus: "normal",

      doseRate: "0.17 µSv/h",
      doseRateDiag: "Flux standard sous ceinture de Van Allen",
      doseTotal: "0.29 mSv",
      radStatus: "normal",

      cortisol: "4.2 ng/mL",
      cortisolDiag: "Équilibre circadien préservé",
      edaStress: "1.8 µS",
      stressStatus: "normal",

      recTitle: "Protocole Médical Nominal",
      recText: "Poursuite de la surveillance passive 24/7. Maintien des contre-mesures physiques standard (2h d'exercice quotidien sur tapis T2 et cycle ARED).",
      recDeviceUsed: "Maillot Astroskin & Montre EmbracePlus",
      recBorder: "border-emerald-500/30",
      recBg: "bg-emerald-500/10",

      deviceStatus: {
        astroskin: { text: "Connecté (250 Hz)", state: "online" },
        embrace: { text: "Connecté (100 Hz)", state: "online" },
        echolight: { text: "Scan Hebdo Validé", state: "online" },
        dosimeter: { text: "Télémétrie Live", state: "online" },
        saliva: { text: "Cartouche 04 prête", state: "online" },
        actigraphy: { text: "Actimétrie 3-Axes Live", state: "online" },
      },
    },

    hypoxia: {
      id: "hypoxia",
      buttonLabel: "2. Montre EmbracePlus (Hypoxie EVA)",
      badgeDevice: "2. Montre EmbracePlus (SpO2 & EDA)",
      name: "Astronaute EVA-1 • Sortie Extravéhiculaire",
      missionStatus: "EVA 4 • TRAVAIL STRUCTURAL EXTERNE",
      aiDiagnosis: "Bio-IA : Chute critique de SpO2 et tachycardie réflexe détectées en cours d'effort extravéhiculaire.",
      aiConfidence: "98.5%",
      statusText: "Alerte : Hypoxie Scaphandre",
      statusColor: "text-amber-400 bg-amber-500/15 border-amber-500/40",
      dotColor: "bg-amber-400",

      // Les 6 Indicateurs Fondamentaux
      bp: "138/92",
      bpDiag: "Élévation tensionnelle réflexe",
      bpStatus: "warning",

      bpm: 116,
      bpmDiag: "Tachycardie d'effort compensatoire",
      bpmStatus: "warning",

      glycemia: "118 mg/dL",
      glycemiaDiag: "Mobilisation glucidique d'effort",
      glycemiaStatus: "warning",

      bodyTemp: "37.4 °C",
      bodyTempDiag: "Échauffement thermique sous scaphandre",
      bodyTempStatus: "warning",

      sleepDuration: "6h 10m",
      sleepDiag: "Sommeil écourté pré-mission EVA",
      sleepStatus: "warning",

      mood: "Stress Aigu (4.2/10)",
      moodDiag: "Anxiété hypoxique & charge mentale",
      moodStatus: "danger",

      spo2: "86%",
      spo2Diag: "Désaturation critique en scaphandre",
      spo2Status: "danger",

      tScore: "-0.3",
      tScoreDiag: "Microarchitecture stable",
      boneLoss: "-0.2%/mois",
      boneStatus: "normal",

      doseRate: "0.24 µSv/h",
      doseRateDiag: "Exposition EVA standard",
      doseTotal: "0.38 mSv",
      radStatus: "normal",

      cortisol: "8.6 ng/mL",
      cortisolDiag: "Élévation aiguë du stress d'effort",
      edaStress: "7.6 µS",
      stressStatus: "warning",

      recTitle: "Protocole d'Urgence Oxygénation",
      recText: "Augmentation immédiate du débit d'O2 dans le scaphandre (+35%). Arrêt des manœuvres physiques et vérification de l'étanchéité de la visière.",
      recDeviceUsed: "Sonde SpO2 Astroskin & Capteur PPG EmbracePlus",
      recBorder: "border-amber-500/40",
      recBg: "bg-amber-500/10",

      deviceStatus: {
        astroskin: { text: "ALERTE SpO2 86%", state: "alert" },
        embrace: { text: "Stress Élevé (7.6 µS)", state: "alert" },
        echolight: { text: "Standby", state: "online" },
        dosimeter: { text: "Surveillance EVA", state: "online" },
        saliva: { text: "Standby", state: "online" },
        actigraphy: { text: "Actimétrie EVA", state: "online" },
      },
    },

    boneLoss: {
      id: "boneLoss",
      buttonLabel: "3. Échographe REMS (Perte Osseuse)",
      badgeDevice: "3. Échographe EchoLight (Techno REMS)",
      name: "Spécialiste de Mission • Sol 210",
      missionStatus: "MISSION LONGUE DURÉE • HABITAT ORBITAL",
      aiDiagnosis: "Bio-IA : Déminéralisation accélérée au rachis lombaire et au fémur identifiée par scan ultrasonore REMS.",
      aiConfidence: "97.4%",
      statusText: "Alerte : Déminéralisation REMS",
      statusColor: "text-blue-400 bg-blue-500/15 border-blue-500/40",
      dotColor: "bg-blue-400",

      // Les 6 Indicateurs Fondamentaux
      bp: "120/78",
      bpDiag: "Pression artérielle stable",
      bpStatus: "normal",

      bpm: 70,
      bpmDiag: "Rythme cardiaque régulier",
      bpmStatus: "normal",

      glycemia: "96 mg/dL",
      glycemiaDiag: "Métabolisme glucidique normal",
      glycemiaStatus: "normal",

      bodyTemp: "36.7 °C",
      bodyTempDiag: "Homéothermie stable",
      bodyTempStatus: "normal",

      sleepDuration: "7h 15m",
      sleepDiag: "Récupération nocturne satisfaisante",
      sleepStatus: "normal",

      mood: "Stable (7.9/10)",
      moodDiag: "Vigilance et moral satisfaisants",
      moodStatus: "normal",

      spo2: "98%",
      spo2Diag: "Oxygénation optimale",
      spo2Status: "normal",

      tScore: "-1.8",
      tScoreDiag: "Ostéopénie avérée (perte trabéculaire)",
      boneLoss: "-1.7%/mois",
      boneStatus: "danger",

      doseRate: "0.19 µSv/h",
      doseRateDiag: "Niveau nominal",
      doseTotal: "0.45 mSv",
      radStatus: "normal",

      cortisol: "5.1 ng/mL",
      cortisolDiag: "Léger déséquilibre anabolique",
      edaStress: "2.1 µS",
      stressStatus: "normal",

      recTitle: "Protocole de Contre-Mesure Osseuse",
      recText: "Ajustement immédiat des charges mécaniques sur l'appareil ARED (+25% sur squats et soulevés de terre). Supplémentation en Bisphosphonates et Vitamine D3.",
      recDeviceUsed: "Échographe Osseux Portatif EchoLight (Scan Ultrasonore 10 min)",
      recBorder: "border-blue-500/40",
      recBg: "bg-blue-500/10",

      deviceStatus: {
        astroskin: { text: "Nominal", state: "online" },
        embrace: { text: "Nominal", state: "online" },
        echolight: { text: "ALERTE T-SCORE -1.8", state: "alert" },
        dosimeter: { text: "Nominal", state: "online" },
        saliva: { text: "Nominal", state: "online" },
        actigraphy: { text: "Actimétrie Sommeil", state: "online" },
      },
    },

    solarStorm: {
      id: "solarStorm",
      buttonLabel: "4. Dosimètre HRP (Alerte Solaire)",
      badgeDevice: "4. Dosimètre Personnel Tracerco (NASA HRP)",
      name: "Équipage Artemis • Transit Cis-Lunaire",
      missionStatus: "ESPACE PROFOND • HORS MAGNÉTOSPHÈRE",
      aiDiagnosis: "Bio-IA : Événement à Particules Solaires (SPE) en cours. Le dosimètre enregistre un pic radiatif extrême.",
      aiConfidence: "99.4%",
      statusText: "Urgence : Tempête Solaire SPE",
      statusColor: "text-orange-400 bg-orange-500/20 border-orange-500/50",
      dotColor: "bg-orange-400",

      // Les 6 Indicateurs Fondamentaux
      bp: "128/82",
      bpDiag: "Tension modérément élevée (alarme)",
      bpStatus: "warning",

      bpm: 88,
      bpmDiag: "Légère tachycardie de vigilance",
      bpmStatus: "warning",

      glycemia: "112 mg/dL",
      glycemiaDiag: "Glycogénolyse de stress opérationnel",
      glycemiaStatus: "warning",

      bodyTemp: "37.0 °C",
      bodyTempDiag: "Normothermie préservée",
      bodyTempStatus: "normal",

      sleepDuration: "5h 40m",
      sleepDiag: "Sommeil interrompu par l'alarme SPE",
      sleepStatus: "warning",

      mood: "Tension (4.8/10)",
      moodDiag: "Stress de confinement d'urgence",
      moodStatus: "warning",

      spo2: "97%",
      spo2Diag: "Oxygénation satisfaisante",
      spo2Status: "normal",

      tScore: "-0.4",
      tScoreDiag: "Densité osseuse sous contrôle",
      boneLoss: "-0.2%/mois",
      boneStatus: "normal",

      doseRate: "48.5 µSv/h",
      doseRateDiag: "PIC CRITIQUE (Seuil d'alerte > 20 µSv/h)",
      doseTotal: "12.8 mSv",
      radStatus: "danger",

      cortisol: "9.2 ng/mL",
      cortisolDiag: "Sécrétion de stress aiguë",
      edaStress: "6.2 µS",
      stressStatus: "warning",

      recTitle: "Protocole de Confinement Anti-Radiations",
      recText: "Alerte générale à bord. Évacuation immédiate vers le compartiment blindé du vaisseau (entouré des réservoirs d'eau). Verrouillage des sas pendant 18 heures.",
      recDeviceUsed: "Dosimètre Personnel Tracerco PED2-IS+ (Liaison sans fil)",
      recBorder: "border-orange-500/40",
      recBg: "bg-orange-500/10",

      deviceStatus: {
        astroskin: { text: "Nominal", state: "online" },
        embrace: { text: "Stress Élevé", state: "alert" },
        echolight: { text: "Standby", state: "online" },
        dosimeter: { text: "DANGER 48.5 µSv/h", state: "critical" },
        saliva: { text: "Test Post-Radiation", state: "online" },
        actigraphy: { text: "Veille Confinement", state: "online" },
      },
    },

    salivaStress: {
      id: "salivaStress",
      buttonLabel: "5. Biocapteur Salivaire (Stress & Immunité)",
      badgeDevice: "5. Biocapteur Salivaire (ASI Bologne)",
      name: "Ingénieur de Bord • Mission Sol 185",
      missionStatus: "STATION SPATIALE INTERNATIONALE (ISS)",
      aiDiagnosis: "Bio-IA : Épuisement surrénalien et déséquilibre immunitaire sévère détectés par le biocapteur de cortisol/DHEA-S.",
      aiConfidence: "96.8%",
      statusText: "Alerte : Immunodépression Salivaire",
      statusColor: "text-purple-400 bg-purple-500/20 border-purple-500/40",
      dotColor: "bg-purple-400",

      // Les 6 Indicateurs Fondamentaux
      bp: "132/86",
      bpDiag: "Hypertension chronique modérée",
      bpStatus: "warning",

      bpm: 78,
      bpmDiag: "Instabilité du rythme au repos",
      bpmStatus: "warning",

      glycemia: "126 mg/dL",
      glycemiaDiag: "Hyperglycémie sous excès de cortisol",
      glycemiaStatus: "warning",

      bodyTemp: "37.2 °C",
      bodyTempDiag: "Dérégulation du cycle thermique",
      bodyTempStatus: "warning",

      sleepDuration: "4h 50m",
      sleepDiag: "Insomnie orbitale • Sommeil fragmenté",
      sleepStatus: "danger",

      mood: "Épuisement (3.1/10)",
      moodDiag: "Asthénie cognitive & irritabilité",
      moodStatus: "danger",

      spo2: "97%",
      spo2Diag: "Oxygénation normale",
      spo2Status: "normal",

      tScore: "-0.5",
      tScoreDiag: "Densité osseuse normale",
      boneLoss: "-0.3%/mois",
      boneStatus: "normal",

      doseRate: "0.18 µSv/h",
      doseRateDiag: "Dose radiative standard",
      doseTotal: "0.52 mSv",
      radStatus: "normal",

      cortisol: "18.9 ng/mL",
      cortisolDiag: "EXPLOSION DU CORTISOL (Ratio C/DHEA > 4.5)",
      edaStress: "6.8 µS",
      stressStatus: "danger",

      recTitle: "Protocole de Restauration Immunitaire",
      recText: "Allègement de 40% du planning opérationnel de l'astronaute. Réalignement du cycle circadien par luminothérapie et administration de vitamines immunostimulantes.",
      recDeviceUsed: "Biocapteur Salivaire ASI (Cartouche à usage unique USB)",
      recBorder: "border-purple-500/40",
      recBg: "bg-purple-500/10",

      deviceStatus: {
        astroskin: { text: "Sommeil Altéré", state: "alert" },
        embrace: { text: "EDA Élevée (6.8 µS)", state: "alert" },
        echolight: { text: "Nominal", state: "online" },
        dosimeter: { text: "Nominal", state: "online" },
        saliva: { text: "CORTISOL 18.9 ng/mL", state: "critical" },
        actigraphy: { text: "Sommeil Fragmenté", state: "alert" },
      },
    },

    actigraphy: {
      id: "actigraphy",
      buttonLabel: "6. Montre Actigraphie (Artemis II)",
      badgeDevice: "6. Montre d'Actigraphie SOMNOwatch plus (Artemis II)",
      name: "Équipage Artemis II • Mission Circumlunaire",
      missionStatus: "SOL 08 • MISSION ARTEMIS II • ESPACE PROFOND",
      aiDiagnosis: "Bio-IA : Désynchronisation circadienne détectée. L'actimètre enregistre une baisse d'exposition lumineuse diurne et une fragmentation du sommeil paradoxal.",
      aiConfidence: "98.7%",
      statusText: "Alerte : Dérèglement Circadien",
      statusColor: "text-indigo-400 bg-indigo-500/15 border-indigo-500/40",
      dotColor: "bg-indigo-400",

      // Les 6 Indicateurs Fondamentaux
      bp: "122/80",
      bpDiag: "Normotension de repos stable",
      bpStatus: "normal",

      bpm: 64,
      bpmDiag: "Rythme de repos circadien (sommeil)",
      bpmStatus: "normal",

      glycemia: "98 mg/dL",
      glycemiaDiag: "Normoglycémie basale",
      glycemiaStatus: "normal",

      bodyTemp: "36.4 °C",
      bodyTempDiag: "Creux thermique circadien nocturne",
      bodyTempStatus: "normal",

      sleepDuration: "5h 15m",
      sleepDiag: "Sommeil fragmenté • 5 micro-réveils",
      sleepStatus: "warning",

      mood: "Fatigue Circadienne (5.6/10)",
      moodDiag: "Baisse de vigilance en transit lointain",
      moodStatus: "warning",

      spo2: "98%",
      spo2Diag: "Oxygénation satisfaisante",
      spo2Status: "normal",

      tScore: "-0.2",
      tScoreDiag: "Densité osseuse normale",
      boneLoss: "-0.1%/mois",
      boneStatus: "normal",

      doseRate: "0.28 µSv/h",
      doseRateDiag: "Flux translunaire modéré",
      doseTotal: "1.42 mSv",
      radStatus: "normal",

      cortisol: "11.2 ng/mL",
      cortisolDiag: "Désynchronisation du pic matinal",
      edaStress: "3.4 µS",
      stressStatus: "warning",

      recTitle: "Protocole de Resynchronisation Circadienne (Artemis)",
      recText: "Activation de la luminothérapie bleue/blanche enrichie (10 000 Lux) dans le cockpit d'Orion pendant 45 minutes pour stimuler la mélanopsine rétinienne. Verrouillage du module de sommeil avec occultation totale.",
      recDeviceUsed: "Montre d'Actigraphie SOMNOwatch plus (NASA Artemis HRP)",
      recBorder: "border-indigo-500/40",
      recBg: "bg-indigo-500/10",

      deviceStatus: {
        astroskin: { text: "Nominal", state: "online" },
        embrace: { text: "Nominal", state: "online" },
        echolight: { text: "Standby", state: "online" },
        dosimeter: { text: "Nominal", state: "online" },
        saliva: { text: "Nominal", state: "online" },
        actigraphy: { text: "ALERTE SOMMEIL 5h15m (Lux: 120)", state: "alert" },
      },
    },

    syncope: {
      id: "syncope",
      buttonLabel: "⚡ Syncope & Réanimation",
      badgeDevice: "Astroskin + Défibrillation",
      name: "Astronaute EVA-2 • Perte de Conscience",
      missionStatus: "EVA MOON BASE • COLLAPSE CARDIOVASCULAIRE",
      aiDiagnosis: "Bio-IA : Arrêt baroréflexe aigu, collapsus de la tension artérielle PTT et immobilité totale de l'astronaute.",
      aiConfidence: "99.9%",
      statusText: "URGENCE VITALE : SYNCOPE",
      statusColor: "text-red-400 bg-red-600/30 border-red-500/60 animate-pulse",
      dotColor: "bg-red-500",

      // Les 6 Indicateurs Fondamentaux
      bp: "68/42",
      bpDiag: "Chute tensionnelle critique (collapsus)",
      bpStatus: "danger",

      bpm: 42,
      bpmDiag: "Bradycardie extrême / Pause sinusale",
      bpmStatus: "danger",

      glycemia: "86 mg/dL",
      glycemiaDiag: "Hypoglycémie relative de choc",
      glycemiaStatus: "warning",

      bodyTemp: "35.9 °C",
      bodyTempDiag: "Hypothermie périphérique de collapsus",
      bodyTempStatus: "danger",

      sleepDuration: "N/A",
      sleepDiag: "Perte de conscience aiguë",
      sleepStatus: "danger",

      mood: "Coma (0.0/10)",
      moodDiag: "Perte des fonctions cognitives",
      moodStatus: "danger",

      spo2: "88%",
      spo2Diag: "Sous-oxygénation cérébrale aiguë",
      spo2Status: "danger",

      tScore: "-0.4",
      tScoreDiag: "Inchangé",
      boneLoss: "-0.1%/mois",
      boneStatus: "normal",

      doseRate: "0.22 µSv/h",
      doseRateDiag: "Nominal",
      doseTotal: "0.62 mSv",
      radStatus: "normal",

      cortisol: "12.4 ng/mL",
      cortisolDiag: "Pic d'urgence végétative",
      edaStress: "8.4 µS",
      stressStatus: "danger",

      recTitle: "Protocole de Réanimation d'Urgence 150J",
      recText: "Décharge électrique automatisée délivrée avec succès par les électrodes médicales. Compression pneumatique des membres inférieurs pour restaurer le retour veineux.",
      recDeviceUsed: "Maillot Astroskin & Système Automatisé de Choc",
      recBorder: "border-red-500/50",
      recBg: "bg-red-950/40",
      isShockActive: true,

      deviceStatus: {
        astroskin: { text: "CHOC DÉLIVRÉ 150J", state: "critical" },
        embrace: { text: "Chute Détectée", state: "critical" },
        echolight: { text: "Standby", state: "online" },
        dosimeter: { text: "Nominal", state: "online" },
        saliva: { text: "Standby", state: "online" },
        actigraphy: { text: "Actimétrie EVA", state: "online" },
      },
    },
  };

  const [activeKey, setActiveKey] = useState<string>("nominal");
  const current = scenarios[activeKey] || scenarios.nominal;

  // Écoute des événements de sélection de scénario depuis les fiches d'équipements
  useEffect(() => {
    const handleSelectScenario = (e: any) => {
      if (e.detail && scenarios[e.detail]) {
        setActiveKey(e.detail);
      }
    };
    window.addEventListener("select-scenario", handleSelectScenario);
    return () => window.removeEventListener("select-scenario", handleSelectScenario);
  }, []);

  // Tracé ECG Canvas en direct
  useEffect(() => {
    const canvas = document.getElementById("simulator-ecg-canvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let points: number[] = [];
    let animationFrameId: number;
    let t = 0;

    const speed = current.bpm > 100 ? 1.5 : current.bpm < 50 ? 0.6 : 1.0;
    const amplitude = current.bpm < 50 ? 0.5 : 1.0;

    function getECG(time: number) {
      const phase = time % 1.0;
      if (phase < 0.1) return 0;
      if (phase < 0.18) return Math.sin(((phase - 0.1) / 0.08) * Math.PI) * 0.15; // P
      if (phase < 0.28) return 0;
      if (phase < 0.32) return -Math.sin(((phase - 0.28) / 0.04) * Math.PI) * 0.2; // Q
      if (phase < 0.38) return Math.sin(((phase - 0.32) / 0.06) * Math.PI) * 0.95; // R
      if (phase < 0.44) return -Math.sin(((phase - 0.38) / 0.06) * Math.PI) * 0.3; // S
      if (phase < 0.55) return 0;
      if (phase < 0.72) return Math.sin(((phase - 0.55) / 0.17) * Math.PI) * 0.25; // T
      return 0;
    }

    function render() {
      t += 0.02 * speed;
      const heightNorm = getECG(t) * amplitude;
      const centerY = canvas!.height / 2;
      const y = centerY - heightNorm * (canvas!.height * 0.42);

      points.push(y);
      if (points.length > canvas!.width) {
        points.shift();
      }

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Grille radar ECG
      ctx!.strokeStyle = "rgba(0, 229, 255, 0.06)";
      ctx!.lineWidth = 1;
      for (let gy = 0; gy < canvas!.height; gy += 16) {
        ctx!.beginPath();
        ctx!.moveTo(0, gy);
        ctx!.lineTo(canvas!.width, gy);
        ctx!.stroke();
      }
      for (let gx = 0; gx < canvas!.width; gx += 16) {
        ctx!.beginPath();
        ctx!.moveTo(gx, 0);
        ctx!.lineTo(gx, canvas!.height);
        ctx!.stroke();
      }

      // Couleur de l'onde selon la gravité
      const waveColor = current.bpmStatus === "danger" ? "#EF4444" : current.bpmStatus === "warning" ? "#F59E0B" : "#10B981";

      ctx!.strokeStyle = waveColor;
      ctx!.lineWidth = 2;
      ctx!.shadowBlur = 8;
      ctx!.shadowColor = waveColor;

      ctx!.beginPath();
      for (let i = 0; i < points.length; i++) {
        if (i === 0) ctx!.moveTo(i, points[i]);
        else ctx!.lineTo(i, points[i]);
      }
      ctx!.stroke();
      ctx!.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [current]);

  return (
    <section id="simulateur" className="py-24 relative overflow-hidden bg-[#070b14] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>Simulateur Clinique Spatiale • 5 Capteurs Connectés</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-extrabold text-white tracking-tight uppercase leading-[1.12]">
            Banc d&apos;Essai Télémétrique IA. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-500">
              Évaluation &amp; Protocoles d&apos;Urgence.
            </span>
          </h2>
          <p className="text-slate-300 mt-4 text-sm sm:text-base leading-relaxed">
            Sélectionnez un scénario opérationnel pour observer les calculs précis de chaque capteur (tensiométrie PTT, SpO2, T-Score osseux REMS, radiations et cortisol salivaire) et le protocole d&apos;action guidé par l&apos;IA.
          </p>

          {/* Scenario Selector Pills (Exactement 5 Scénarios pour les 5 Équipements) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {["nominal", "hypoxia", "boneLoss", "solarStorm", "salivaStress", "actigraphy"].map((key) => {
              const sc = scenarios[key];
              const isSelected = activeKey === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => setActiveKey(sc.id)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all border ${
                    isSelected
                      ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/25 scale-105"
                      : "bg-slate-900/80 text-slate-300 border-white/10 hover:border-cyan-500/40 hover:bg-white/5"
                  }`}
                >
                  {sc.buttonLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Central Simulation Cockpit */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          
          {/* Header of Cockpit */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Sujet : {current.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400">• {current.missionStatus}</span>
              </div>
              <div className="text-xs font-mono text-slate-400">
                Capteur prioritaire sollicité : <strong className="text-white">{current.badgeDevice}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Bouton de test choc électrique 150J */}
              <button
                onClick={() => {
                  setActiveKey("syncope");
                  setTimeout(() => {
                    setActiveKey("nominal");
                  }, 3500);
                }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold border bg-red-950/40 text-red-300 border-red-500/40 hover:bg-red-900/50 hover:text-white transition-all flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>⚡ Simuler Syncope &amp; Choc 150J</span>
              </button>

              <div className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border flex items-center gap-2 ${current.statusColor}`}>
                <span className={`w-2 h-2 rounded-full ${current.dotColor} animate-ping`}></span>
                <span>{current.statusText}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
            
            {/* Colonne Gauche : Diagnostic IA & Protocoles d'Urgence */}
            <div className="lg:col-span-5 space-y-6 text-left">
              
              {/* IA Diagnosis Card */}
              <div className="p-5 rounded-2xl bg-[#090e1a] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" /> Diagnostic Télémétrique IA
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Confiance : <strong className="text-cyan-300">{current.aiConfidence}</strong>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  {current.aiDiagnosis}
                </p>

                {/* Recommended Medical Protocol */}
                <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${current.recBg} ${current.recBorder}`}>
                  <div className="font-bold font-mono uppercase text-[11px] flex items-center gap-1.5 text-white">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{current.recTitle}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {current.recText}
                  </p>
                  <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-white/10">
                    Dispositif mobilisé : <span className="text-cyan-300">{current.recDeviceUsed}</span>
                  </div>
                </div>
              </div>

              {/* État des 5 Capteurs en Temps Réel */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2.5 text-xs font-mono">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-bold mb-1 flex items-center justify-between">
                  <span>Flux des 6 Capteurs Spatiaux</span>
                  <span className="text-[10px] text-emerald-400">6/6 Connectés</span>
                </div>

                {/* 1. Astroskin */}
                <div className="flex items-center justify-between text-slate-300 py-1 border-b border-white/5">
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${current.deviceStatus.astroskin.state === "critical" ? "bg-red-500 animate-ping" : current.deviceStatus.astroskin.state === "alert" ? "bg-amber-400" : "bg-emerald-400"}`}></span>
                    1. Maillot Astroskin (ECG &amp; PTT)
                  </span>
                  <span className={`font-bold ${current.deviceStatus.astroskin.state === "critical" ? "text-red-400" : current.deviceStatus.astroskin.state === "alert" ? "text-amber-400" : "text-emerald-400"}`}>
                    {current.deviceStatus.astroskin.text}
                  </span>
                </div>

                {/* 2. EmbracePlus */}
                <div className="flex items-center justify-between text-slate-300 py-1 border-b border-white/5">
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${current.deviceStatus.embrace.state === "critical" ? "bg-red-500 animate-ping" : current.deviceStatus.embrace.state === "alert" ? "bg-amber-400" : "bg-emerald-400"}`}></span>
                    2. Montre EmbracePlus (EDA &amp; PPG)
                  </span>
                  <span className={`font-bold ${current.deviceStatus.embrace.state === "critical" ? "text-red-400" : current.deviceStatus.embrace.state === "alert" ? "text-amber-400" : "text-emerald-400"}`}>
                    {current.deviceStatus.embrace.text}
                  </span>
                </div>

                {/* 3. EchoLight REMS */}
                <div className="flex items-center justify-between text-slate-300 py-1 border-b border-white/5">
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${current.deviceStatus.echolight.state === "alert" ? "bg-blue-400 animate-pulse" : "bg-emerald-400"}`}></span>
                    3. Échographe REMS (Os)
                  </span>
                  <span className={`font-bold ${current.deviceStatus.echolight.state === "alert" ? "text-blue-400" : "text-emerald-400"}`}>
                    {current.deviceStatus.echolight.text}
                  </span>
                </div>

                {/* 4. Dosimètre Tracerco */}
                <div className="flex items-center justify-between text-slate-300 py-1 border-b border-white/5">
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${current.deviceStatus.dosimeter.state === "critical" ? "bg-orange-400 animate-ping" : "bg-emerald-400"}`}></span>
                    4. Dosimètre HRP (Radiations)
                  </span>
                  <span className={`font-bold ${current.deviceStatus.dosimeter.state === "critical" ? "text-orange-400" : "text-emerald-400"}`}>
                    {current.deviceStatus.dosimeter.text}
                  </span>
                </div>

                {/* 5. Biocapteur Salivaire ASI */}
                <div className="flex items-center justify-between text-slate-300 py-1 border-b border-white/5">
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${current.deviceStatus.saliva.state === "critical" ? "bg-purple-400 animate-ping" : "bg-emerald-400"}`}></span>
                    5. Biocapteur Salivaire (Cortisol)
                  </span>
                  <span className={`font-bold ${current.deviceStatus.saliva.state === "critical" ? "text-purple-400" : "text-emerald-400"}`}>
                    {current.deviceStatus.saliva.text}
                  </span>
                </div>

                {/* 6. Montre d'Actigraphie Artemis (SOMNOwatch plus) */}
                <div className="flex items-center justify-between text-slate-300 py-1">
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${current.deviceStatus.actigraphy?.state === "alert" ? "bg-indigo-400 animate-ping" : current.deviceStatus.actigraphy?.state === "critical" ? "bg-red-500 animate-ping" : "bg-emerald-400"}`}></span>
                    6. Montre Actigraphie (SOMNOwatch)
                  </span>
                  <span className={`font-bold ${current.deviceStatus.actigraphy?.state === "alert" ? "text-indigo-400" : current.deviceStatus.actigraphy?.state === "critical" ? "text-red-400" : "text-emerald-400"}`}>
                    {current.deviceStatus.actigraphy?.text || "Enregistrement Live"}
                  </span>
                </div>
              </div>

            </div>

            {/* Colonne Droite : Visualisation ECG & Métriques Précises des 5 Capteurs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* ECG Canvas Wave */}
              <div className="p-4 rounded-2xl bg-black/70 border border-white/10 relative overflow-hidden shadow-inner">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${current.bpmStatus === "danger" ? "bg-red-500 animate-ping" : "bg-emerald-400 animate-pulse"}`}></span>
                    <span className="text-xs font-mono text-slate-300 font-bold uppercase">
                      ECG Dérivation II en Direct (Astroskin 250 Hz)
                    </span>
                  </div>
                  <span className={`font-mono text-sm font-bold ${current.bpmStatus === "danger" ? "text-red-400" : "text-cyan-400"}`}>
                    {current.bpm} BPM
                  </span>
                </div>
                <canvas id="simulator-ecg-canvas" width="600" height="100" className="w-full h-24 bg-[#050912] rounded-lg"></canvas>
              </div>

              {/* ============================================================== */}
              {/* LES 6 INDICATEURS FONDAMENTAUX DE SANTÉ (NASA CORE HEALTH)    */}
              {/* Pression artérielle, Rythme cardiaque, Glycémie,               */}
              {/* Température corporelle, Durée du sommeil, Humeur               */}
              {/* ============================================================== */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      6 Indicateurs Fondamentaux de Santé (NASA Core Health)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300">Constantes Vitales 24/7</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  
                  {/* 1. PRESSION ARTÉRIELLE */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-rose-400" /> Pression Artérielle
                      </span>
                      <span className={`text-[10px] font-mono font-bold ${current.bpStatus === "danger" ? "text-red-400 animate-pulse font-extrabold" : current.bpStatus === "warning" ? "text-amber-400" : "text-emerald-400"}`}>
                        {current.bpStatus.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-lg sm:text-xl font-mono font-bold text-white">
                      {current.bp} <span className="text-xs font-normal text-slate-400">mmHg</span>
                    </div>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5 leading-snug break-words">{current.bpDiag}</p>
                  </div>

                  {/* 2. RYTHME CARDIAQUE */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-cyan-400" /> Rythme Cardiaque
                      </span>
                      <span className={`text-[10px] font-mono font-bold ${current.bpmStatus === "danger" ? "text-red-400 animate-pulse font-extrabold" : current.bpmStatus === "warning" ? "text-amber-400" : "text-emerald-400"}`}>
                        {current.bpmStatus.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-lg sm:text-xl font-mono font-bold text-white">
                      {current.bpm} <span className="text-xs font-normal text-slate-400">BPM</span>
                    </div>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5 leading-snug break-words">{current.bpmDiag}</p>
                  </div>

                  {/* 3. GLYCÉMIE */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                        <Droplet className="w-3.5 h-3.5 text-amber-400" /> Glycémie (CGM)
                      </span>
                      <span className={`text-[10px] font-mono font-bold ${current.glycemiaStatus === "danger" ? "text-red-400 font-extrabold" : current.glycemiaStatus === "warning" ? "text-amber-400" : "text-emerald-400"}`}>
                        {current.glycemiaStatus.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-lg sm:text-xl font-mono font-bold text-white">
                      {current.glycemia}
                    </div>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5 leading-snug break-words">{current.glycemiaDiag}</p>
                  </div>

                  {/* 4. TEMPÉRATURE CORPORELLE */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                        <Thermometer className="w-3.5 h-3.5 text-orange-400" /> Température Corporelle
                      </span>
                      <span className={`text-[10px] font-mono font-bold ${current.bodyTempStatus === "danger" ? "text-red-400 font-extrabold" : current.bodyTempStatus === "warning" ? "text-amber-400" : "text-emerald-400"}`}>
                        {current.bodyTempStatus.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-lg sm:text-xl font-mono font-bold text-white">
                      {current.bodyTemp}
                    </div>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5 leading-snug break-words">{current.bodyTempDiag}</p>
                  </div>

                  {/* 5. DURÉE DU SOMMEIL */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                        <Moon className="w-3.5 h-3.5 text-indigo-400" /> Durée du Sommeil
                      </span>
                      <span className={`text-[10px] font-mono font-bold ${current.sleepStatus === "danger" ? "text-red-400 font-extrabold" : current.sleepStatus === "warning" ? "text-amber-400" : "text-emerald-400"}`}>
                        {current.sleepStatus.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-lg sm:text-xl font-mono font-bold text-white">
                      {current.sleepDuration}
                    </div>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5 leading-snug break-words">{current.sleepDiag}</p>
                  </div>

                  {/* 6. HUMEUR & BIEN-ÊTRE MENTAL */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                        <Smile className="w-3.5 h-3.5 text-emerald-400" /> Humeur &amp; Mental
                      </span>
                      <span className={`text-[10px] font-mono font-bold ${current.moodStatus === "danger" ? "text-red-400 font-extrabold" : current.moodStatus === "warning" ? "text-amber-400" : "text-emerald-400"}`}>
                        {current.moodStatus.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-base sm:text-lg font-mono font-bold text-white leading-tight break-words">
                      {current.mood}
                    </div>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5 leading-snug break-words">{current.moodDiag}</p>
                  </div>

                </div>
              </div>

              {/* ============================================================== */}
              {/* MÉTRIQUES SPÉCIFIQUES D'ESPACE PROFOND (OS, RADIATIONS, STRESS) */}
              {/* ============================================================== */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Métriques Spécifiques d&apos;Espace Profond
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-blue-300">Contre-Mesures Mission</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Densité Osseuse REMS (EchoLight) */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                        <Bone className="w-3.5 h-3.5 text-emerald-400" /> T-Score (REMS)
                      </span>
                      <span className={`text-[10px] font-mono font-bold ${current.boneStatus === "danger" ? "text-blue-400 font-extrabold" : "text-emerald-400"}`}>
                        {current.boneStatus === "danger" ? "OSTÉOPÉNIE" : "OPTIMAL"}
                      </span>
                    </div>
                    <div className="text-base sm:text-lg font-mono font-bold text-white">
                      {current.tScore} <span className="text-xs font-normal text-slate-400">({current.boneLoss})</span>
                    </div>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5 leading-snug break-words">{current.tScoreDiag}</p>
                  </div>

                  {/* Radiations Spatiales (Dosimètre HRP) */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-amber-500/30 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                        <Radiation className="w-3.5 h-3.5 text-amber-400" /> Radiations
                      </span>
                      <span className={`text-[10px] font-mono font-bold ${current.radStatus === "danger" ? "text-orange-400 font-extrabold" : "text-emerald-400"}`}>
                        {current.radStatus === "danger" ? "ALERTE SPE" : "NOMINAL"}
                      </span>
                    </div>
                    <div className="text-base sm:text-lg font-mono font-bold text-white">
                      {current.doseRate} <span className="text-[11px] font-normal text-slate-400">({current.doseTotal})</span>
                    </div>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5 leading-snug break-words">{current.doseRateDiag}</p>
                  </div>

                  {/* Cortisol & Biomarqueurs Salivaires (ASI) */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                        <Droplets className="w-3.5 h-3.5 text-purple-400" /> Cortisol Salivaire
                      </span>
                      <span className={`text-[10px] font-mono font-bold ${current.stressStatus === "danger" ? "text-purple-300 font-extrabold" : current.stressStatus === "warning" ? "text-amber-300" : "text-emerald-400"}`}>
                        {current.stressStatus === "danger" ? "SURCHARGE" : "ÉQUILIBRE"}
                      </span>
                    </div>
                    <div className="text-base sm:text-lg font-mono font-bold text-white">
                      {current.cortisol} <span className="text-[11px] font-normal text-slate-400">({current.edaStress})</span>
                    </div>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5 leading-snug break-words">{current.cortisolDiag}</p>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
