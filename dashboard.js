/**
 * Santellite : VitaOrbit — Cockpit de Surveillance Médicale Spatiale (dashboard.js)
 * NASA Space Apps Challenge 2026 (Libreville, Gabon • Équipe 404 Introuvable)
 * 
 * Architecture modulaire vanilla JavaScript :
 * 1. Moteur de simulation télémétrique & 6 scénarios cliniques spatiaux
 * 2. Silhouette anatomique vectorielle interactive (6 zones physiologiques & 5 risques NASA)
 * 3. Sélecteur d'environnement de mission & pondération dynamique des risques
 * 4. Tracés de tendance Sparklines 24h & indices de confiance par capteur
 * 5. Module Nutrition & Hydratation déclarative (7e indicateur de santé)
 * 6. Routine quotidienne de contre-mesures & gamification sobre (localStorage)
 * 7. Capture caméra & lecture optique d'affichage numérique (OCR assisté avec validation humaine)
 * 8. Tracé électrocardiographique Lead II en temps réel (Canvas 250 Hz)
 */

document.addEventListener("DOMContentLoaded", function () {
	// Initialisation des icônes Lucide
	if (window.lucide && typeof window.lucide.createIcons === "function") {
		window.lucide.createIcons();
	}

	// Menu mobile
	var mobileBtn = document.getElementById("mobile-toggle-btn");
	var mobileDrawer = document.getElementById("mobile-menu-drawer");
	if (mobileBtn && mobileDrawer) {
		mobileBtn.addEventListener("click", function () {
			mobileDrawer.classList.toggle("hidden");
		});
		var mobileLinks = mobileDrawer.querySelectorAll("a");
		mobileLinks.forEach(function (link) {
			link.addEventListener("click", function () {
				mobileDrawer.classList.add("hidden");
			});
		});
	}

	// Initialisation ECG
	initECGWave();

	// Initialisation des modules
	initRoutine();
	initNutrition();
	initCameraScanner();
	initScrollReveal();

	// Environnement par défaut : Vaisseau en transit
	applyEnvironment("transit");

	// Scénario par défaut : Nominal
	applySimScenario("nominal");

	// Sélection initiale de la zone anatomique (Cœur)
	selectBodyZone("heart");
});

/* ==========================================================================
   1. BASE DE DONNÉES DES 6 SCÉNARIOS CLINIQUES & TÉLÉMÉTRIE
   ========================================================================== */

var simData = {
	nominal: {
		name: "Cmdr. Thomas P. • Expédition 74",
		missionStatus: "• SOL 142 • ORBITE BASSE TERRESTRE",
		badgeDevice: "1. Maillot Astroskin (PTT & ECG)",
		statusText: "État : Optimal (Nominal)",
		statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
		dotColor: "bg-emerald-400",
		aiConfidence: "99.8%",
		aiDiagnosis: "Bio-IA : Stabilité cardiovasculaire et métabolique optimale. Aucun signal faible décelé.",

		recTitle: "Protocole Médical Nominal",
		recDesc: "Poursuite de la surveillance passive 24/7. Maintien des contre-mesures physiques standard (2h d'exercice quotidien sur tapis T2 et cycle ARED).",
		recDevice: "Maillot Astroskin & Montre EmbracePlus",
		recBoxClass: "bg-emerald-500/10 border-emerald-500/30",

		// Indicateurs fondamentaux
		bp: "118/76",
		bpBadge: "NORMAL",
		bpBadgeClass: "text-emerald-400",
		bpDiag: "Normotension PTT continue",
		bpTrust: "Élevée (99.8%) • Astroskin PTT",
		bpSpark: [116, 117, 118, 119, 118, 117, 118, 118, 119, 118, 117, 118],

		bpm: 68,
		bpmBadge: "NORMAL",
		bpmBadgeClass: "text-emerald-400",
		bpmDiag: "Rythme sinusal régulier (65-72)",
		bpmTrust: "Élevée (99.9%) • ECG 3-Lead",
		bpmSpark: [66, 67, 70, 72, 68, 67, 68, 69, 68, 67, 68, 68],

		glycemia: "94 mg/dL",
		glycemiaBadge: "NORMAL",
		glycemiaBadgeClass: "text-emerald-400",
		glycemiaDiag: "Normoglycémie basale stable",
		glycemiaTrust: "Élevée (98.5%) • Capteur interstitiel",
		glycemiaSpark: [92, 94, 98, 105, 99, 95, 93, 94, 97, 96, 94, 94],

		bodyTemp: "36.8 °C",
		bodyTempBadge: "NORMAL",
		bodyTempBadgeClass: "text-emerald-400",
		bodyTempDiag: "Thermorégulation optimale",
		bodyTempTrust: "Élevée (99.2%) • EmbracePlus IR",
		bodyTempSpark: [36.7, 36.7, 36.8, 36.9, 36.8, 36.8, 36.9, 36.8, 36.8, 36.8, 36.8, 36.8],

		sleepDuration: "7h 35m",
		sleepBadge: "OPTIMAL",
		sleepBadgeClass: "text-emerald-400",
		sleepDiag: "Efficacité 89% • 4 cycles REM",
		sleepTrust: "Élevée (98.9%) • Actiwatch / ActLumus (ARCHeR)",
		sleepSpark: [7.2, 7.5, 7.1, 7.4, 7.6, 7.3, 7.5, 7.8, 7.2, 7.4, 7.5, 7.6],

		mood: "Serein (8.8/10)",
		moodBadge: "STABLE",
		moodBadgeClass: "text-emerald-400",
		moodDiag: "Stabilité thymique & concentration",
		moodTrust: "Élevée (97.0%) • VFC & Analyse vocale",
		moodSpark: [8.5, 8.6, 8.8, 8.7, 8.9, 8.8, 8.7, 8.8, 8.9, 8.8, 8.8, 8.8],

		// Métriques spatiales
		tScore: "-0.2",
		boneLoss: "(-0.1%/mois)",
		boneBadge: "OPTIMAL",
		boneBadgeClass: "text-emerald-400",
		boneDiag: "Densité osseuse normale (REMS)",

		doseRate: "0.17 µSv/h",
		doseTotal: "(0.29 mSv)",
		radBadge: "NOMINAL",
		radBadgeClass: "text-emerald-400",
		radDiag: "Flux standard sous ceinture Van Allen",

		cortisol: "4.2 ng/mL",
		edaStress: "(1.8 µS)",
		stressBadge: "ÉQUILIBRE",
		stressBadgeClass: "text-emerald-400",
		cortisolDiag: "Équilibre circadien préservé",

		devices: {
			astroskin: { text: "Connecté (250 Hz)", color: "text-emerald-400", dot: "bg-emerald-400" },
			embrace: { text: "Connecté (100 Hz)", color: "text-emerald-400", dot: "bg-emerald-400" },
			echolight: { text: "Scan Hebdo Validé", color: "text-emerald-400", dot: "bg-emerald-400" },
			dosimeter: { text: "Télémétrie Live", color: "text-emerald-400", dot: "bg-emerald-400" },
			saliva: { text: "Cartouche 04 prête", color: "text-emerald-400", dot: "bg-emerald-400" },
			actigraphy: { text: "Actimétrie 3-Axes Live", color: "text-emerald-400", dot: "bg-emerald-400" }
		},

		// États des organes pour la silhouette
		organs: {
			heart: "emerald",
			lungs: "emerald",
			skeleton: "emerald",
			brain: "emerald",
			immune: "emerald",
			stomach: "emerald"
		},

		speed: 1.0,
		amplitude: 1.0
	},

	hypoxia: {
		name: "Astronaute EVA-1 • Sortie Extravéhiculaire",
		missionStatus: "• EVA 4 • TRAVAIL STRUCTURAL EXTERNE",
		badgeDevice: "2. Montre EmbracePlus (SpO2 & EDA)",
		statusText: "Alerte : Hypoxie Scaphandre",
		statusColor: "text-amber-400 bg-amber-500/15 border-amber-500/40",
		dotColor: "bg-amber-400",
		aiConfidence: "98.5%",
		aiDiagnosis: "Bio-IA : Chute critique de SpO2 et tachycardie réflexe détectées en cours d'effort extravéhiculaire.",

		recTitle: "Protocole d'Urgence Oxygénation",
		recDesc: "Augmentation immédiate du débit d'O2 dans le scaphandre (+35%). Arrêt des manœuvres physiques et vérification de l'étanchéité de la visière.",
		recDevice: "Sonde SpO2 Astroskin & Capteur PPG EmbracePlus",
		recBoxClass: "bg-amber-500/10 border-amber-500/40",

		bp: "138/92",
		bpBadge: "ÉLEVÉ",
		bpBadgeClass: "text-amber-400",
		bpDiag: "Élévation tensionnelle réflexe",
		bpTrust: "Élevée (98.9%) • Astroskin PTT",
		bpSpark: [120, 122, 124, 126, 128, 130, 134, 136, 137, 139, 138, 138],

		bpm: 116,
		bpmBadge: "TACHYCARDIE",
		bpmBadgeClass: "text-amber-400 font-extrabold animate-pulse",
		bpmDiag: "Tachycardie d'effort compensatoire",
		bpmTrust: "Élevée (99.7%) • ECG 3-Lead",
		bpmSpark: [72, 75, 82, 90, 98, 104, 110, 114, 118, 115, 116, 116],

		glycemia: "118 mg/dL",
		glycemiaBadge: "EFFORT",
		glycemiaBadgeClass: "text-amber-400",
		glycemiaDiag: "Mobilisation glucidique d'effort",
		glycemiaTrust: "Moyenne (96.2%) • Capteur interstitiel",
		glycemiaSpark: [98, 100, 104, 108, 112, 115, 118, 120, 119, 118, 118, 118],

		bodyTemp: "37.4 °C",
		bodyTempBadge: "ÉLÉVATION",
		bodyTempBadgeClass: "text-amber-400",
		bodyTempDiag: "Échauffement thermique sous scaphandre",
		bodyTempTrust: "Élevée (99.1%) • EmbracePlus IR",
		bodyTempSpark: [36.8, 36.9, 37.0, 37.1, 37.2, 37.3, 37.4, 37.4, 37.5, 37.4, 37.4, 37.4],

		sleepDuration: "6h 10m",
		sleepBadge: "ÉCOURTÉ",
		sleepBadgeClass: "text-amber-400",
		sleepDiag: "Sommeil écourté pré-mission EVA",
		sleepTrust: "Élevée (98.5%) • Actiwatch / ActLumus (ARCHeR)",
		sleepSpark: [7.2, 7.0, 6.8, 6.5, 6.4, 6.2, 6.1, 6.1, 6.1, 6.1, 6.1, 6.1],

		mood: "Stress Aigu (4.2/10)",
		moodBadge: "ANXIÉTÉ",
		moodBadgeClass: "text-amber-400 font-extrabold",
		moodDiag: "Anxiété hypoxique & charge mentale",
		moodTrust: "Moyenne (94.5%) • VFC & Conductance EDA",
		moodSpark: [7.8, 7.5, 7.0, 6.5, 5.8, 5.2, 4.8, 4.5, 4.3, 4.2, 4.2, 4.2],

		tScore: "-0.3",
		boneLoss: "(-0.2%/mois)",
		boneBadge: "NORMAL",
		boneBadgeClass: "text-emerald-400",
		boneDiag: "Microarchitecture stable",

		doseRate: "0.24 µSv/h",
		doseTotal: "(0.38 mSv)",
		radBadge: "SURVEILLANCE",
		radBadgeClass: "text-amber-400",
		radDiag: "Exposition EVA standard",

		cortisol: "8.6 ng/mL",
		edaStress: "(7.6 µS)",
		stressBadge: "STRESS AIGU",
		stressBadgeClass: "text-amber-400",
		cortisolDiag: "Élévation aiguë du stress d'effort",

		devices: {
			astroskin: { text: "ALERTE SpO2 86%", color: "text-amber-400", dot: "bg-amber-400 animate-ping" },
			embrace: { text: "Stress Élevé (7.6 µS)", color: "text-amber-400", dot: "bg-amber-400" },
			echolight: { text: "Standby", color: "text-slate-400", dot: "bg-slate-400" },
			dosimeter: { text: "Surveillance EVA", color: "text-emerald-400", dot: "bg-emerald-400" },
			saliva: { text: "Standby", color: "text-slate-400", dot: "bg-slate-400" },
			actigraphy: { text: "Actimétrie EVA", color: "text-emerald-400", dot: "bg-emerald-400" }
		},

		organs: {
			heart: "amber",
			lungs: "ruby",
			skeleton: "emerald",
			brain: "amber",
			immune: "emerald",
			stomach: "emerald"
		},

		speed: 1.5,
		amplitude: 1.25
	},

	boneLoss: {
		name: "Spécialiste de Mission • Sol 210",
		missionStatus: "• MISSION LONGUE DURÉE • HABITAT ORBITAL",
		badgeDevice: "3. Échographe EchoLight (Techno REMS)",
		statusText: "Alerte : Déminéralisation REMS",
		statusColor: "text-blue-400 bg-blue-500/15 border-blue-500/40",
		dotColor: "bg-blue-400",
		aiConfidence: "97.4%",
		aiDiagnosis: "Bio-IA : Déminéralisation accélérée au rachis lombaire et au fémur identifiée par scan ultrasonore REMS.",

		recTitle: "Protocole de Contre-Mesure Osseuse",
		recDesc: "Ajustement immédiat des charges mécaniques sur l'appareil ARED (+25% sur squats et soulevés de terre). Supplémentation en Bisphosphonates et Vitamine D3.",
		recDevice: "Échographe Osseux Portatif EchoLight (Scan Ultrasonore 10 min)",
		recBoxClass: "bg-blue-500/10 border-blue-500/40",

		bp: "120/78",
		bpBadge: "NORMAL",
		bpBadgeClass: "text-emerald-400",
		bpDiag: "Pression artérielle stable",
		bpTrust: "Élevée (99.5%) • Astroskin PTT",
		bpSpark: [118, 119, 120, 120, 121, 120, 120, 119, 120, 120, 120, 120],

		bpm: 70,
		bpmBadge: "NORMAL",
		bpmBadgeClass: "text-emerald-400",
		bpmDiag: "Rythme cardiaque régulier",
		bpmTrust: "Élevée (99.8%) • ECG 3-Lead",
		bpmSpark: [68, 69, 70, 71, 70, 69, 70, 71, 70, 70, 70, 70],

		glycemia: "96 mg/dL",
		glycemiaBadge: "NORMAL",
		glycemiaBadgeClass: "text-emerald-400",
		glycemiaDiag: "Métabolisme glucidique normal",
		glycemiaTrust: "Élevée (98.0%) • Capteur interstitiel",
		glycemiaSpark: [94, 95, 96, 97, 96, 95, 96, 96, 97, 96, 96, 96],

		bodyTemp: "36.7 °C",
		bodyTempBadge: "NORMAL",
		bodyTempBadgeClass: "text-emerald-400",
		bodyTempDiag: "Homéothermie stable",
		bodyTempTrust: "Élevée (99.0%) • EmbracePlus IR",
		bodyTempSpark: [36.7, 36.7, 36.7, 36.8, 36.7, 36.7, 36.7, 36.7, 36.7, 36.7, 36.7, 36.7],

		sleepDuration: "7h 15m",
		sleepBadge: "SATISFAISANT",
		sleepBadgeClass: "text-emerald-400",
		sleepDiag: "Récupération nocturne satisfaisante",
		sleepTrust: "Élevée (98.7%) • Actiwatch / ActLumus (ARCHeR)",
		sleepSpark: [7.0, 7.1, 7.2, 7.1, 7.3, 7.2, 7.1, 7.2, 7.1, 7.2, 7.1, 7.1],

		mood: "Stable (7.9/10)",
		moodBadge: "STABLE",
		moodBadgeClass: "text-emerald-400",
		moodDiag: "Vigilance et moral satisfaisants",
		moodTrust: "Élevée (96.5%) • VFC & Analyse vocale",
		moodSpark: [8.0, 7.9, 8.1, 7.8, 8.0, 7.9, 8.0, 7.9, 7.9, 7.9, 7.9, 7.9],

		tScore: "-1.8",
		boneLoss: "(-1.7%/mois)",
		boneBadge: "OSTÉOPÉNIE",
		boneBadgeClass: "text-blue-400 font-extrabold animate-pulse",
		boneDiag: "Ostéopénie avérée (perte trabéculaire)",

		doseRate: "0.19 µSv/h",
		doseTotal: "(0.45 mSv)",
		radBadge: "NOMINAL",
		radBadgeClass: "text-emerald-400",
		radDiag: "Niveau nominal de vol",

		cortisol: "5.1 ng/mL",
		edaStress: "(2.1 µS)",
		stressBadge: "ÉQUILIBRE",
		stressBadgeClass: "text-emerald-400",
		cortisolDiag: "Léger déséquilibre anabolique",

		devices: {
			astroskin: { text: "Nominal", color: "text-emerald-400", dot: "bg-emerald-400" },
			embrace: { text: "Nominal", color: "text-emerald-400", dot: "bg-emerald-400" },
			echolight: { text: "ALERTE T-SCORE -1.8", color: "text-blue-400", dot: "bg-blue-400 animate-ping" },
			dosimeter: { text: "Nominal", color: "text-emerald-400", dot: "bg-emerald-400" },
			saliva: { text: "Nominal", color: "text-emerald-400", dot: "bg-emerald-400" },
			actigraphy: { text: "Actimétrie Sommeil", color: "text-emerald-400", dot: "bg-emerald-400" }
		},

		organs: {
			heart: "emerald",
			lungs: "emerald",
			skeleton: "ruby",
			brain: "emerald",
			immune: "emerald",
			stomach: "emerald"
		},

		speed: 1.0,
		amplitude: 1.0
	},

	solarStorm: {
		name: "Équipage Artemis • Transit Cis-Lunaire",
		missionStatus: "• ESPACE PROFOND • HORS MAGNÉTOSPHÈRE",
		badgeDevice: "4. Dosimètre Personnel Tracerco (NASA HRP)",
		statusText: "Urgence : Tempête Solaire SPE",
		statusColor: "text-orange-400 bg-orange-500/20 border-orange-500/50",
		dotColor: "bg-orange-400",
		aiConfidence: "99.4%",
		aiDiagnosis: "Bio-IA : Événement à Particules Solaires (SPE) en cours. Le dosimètre enregistre un pic radiatif extrême.",

		recTitle: "Protocole de Confinement Anti-Radiations",
		recDesc: "Alerte générale à bord. Évacuation immédiate vers le compartiment blindé du vaisseau (entouré des réservoirs d'eau). Verrouillage des sas pendant 18 heures.",
		recDevice: "Dosimètre Personnel Tracerco PED2-IS+ (Liaison sans fil)",
		recBoxClass: "bg-orange-500/10 border-orange-500/40",

		bp: "128/82",
		bpBadge: "ALARME",
		bpBadgeClass: "text-amber-400",
		bpDiag: "Tension modérément élevée (stress)",
		bpTrust: "Élevée (99.2%) • Astroskin PTT",
		bpSpark: [118, 120, 122, 124, 126, 128, 130, 129, 128, 128, 128, 128],

		bpm: 88,
		bpmBadge: "VIGILANCE",
		bpmBadgeClass: "text-amber-400",
		bpmDiag: "Légère tachycardie d'alarme",
		bpmTrust: "Élevée (99.8%) • ECG 3-Lead",
		bpmSpark: [68, 70, 72, 75, 82, 86, 92, 90, 88, 88, 88, 88],

		glycemia: "112 mg/dL",
		glycemiaBadge: "STRESS",
		glycemiaBadgeClass: "text-amber-400",
		glycemiaDiag: "Glycogénolyse de stress opérationnel",
		glycemiaTrust: "Élevée (97.8%) • Capteur interstitiel",
		glycemiaSpark: [95, 96, 98, 102, 108, 114, 115, 113, 112, 112, 112, 112],

		bodyTemp: "37.0 °C",
		bodyTempBadge: "NORMAL",
		bodyTempBadgeClass: "text-emerald-400",
		bodyTempDiag: "Normothermie préservée",
		bodyTempTrust: "Élevée (99.2%) • EmbracePlus IR",
		bodyTempSpark: [36.8, 36.8, 36.9, 36.9, 37.0, 37.0, 37.0, 37.0, 37.0, 37.0, 37.0, 37.0],

		sleepDuration: "5h 40m",
		sleepBadge: "INTERROMPU",
		sleepBadgeClass: "text-amber-400",
		sleepDiag: "Sommeil interrompu par l'alarme SPE",
		sleepTrust: "Élevée (98.6%) • Actiwatch / ActLumus (ARCHeR)",
		sleepSpark: [7.0, 6.8, 6.5, 6.2, 5.9, 5.7, 5.5, 5.6, 5.7, 5.7, 5.6, 5.6],

		mood: "Tension (4.8/10)",
		moodBadge: "ALERTE",
		moodBadgeClass: "text-orange-400",
		moodDiag: "Stress de confinement d'urgence",
		moodTrust: "Moyenne (95.0%) • VFC & Cortisol salivaire",
		moodSpark: [7.5, 7.0, 6.5, 5.8, 5.2, 4.9, 4.6, 4.7, 4.8, 4.8, 4.8, 4.8],

		tScore: "-0.4",
		boneLoss: "(-0.2%/mois)",
		boneBadge: "NORMAL",
		boneBadgeClass: "text-emerald-400",
		boneDiag: "Densité osseuse sous contrôle",

		doseRate: "48.5 µSv/h",
		doseTotal: "(12.8 mSv)",
		radBadge: "DANGER SPE",
		radBadgeClass: "text-orange-400 font-extrabold animate-pulse",
		radDiag: "PIC CRITIQUE (Seuil d'alerte > 20 µSv/h)",

		cortisol: "9.2 ng/mL",
		edaStress: "(6.2 µS)",
		stressBadge: "STRESS AIGU",
		stressBadgeClass: "text-amber-400",
		cortisolDiag: "Sécrétion de stress aiguë",

		devices: {
			astroskin: { text: "Nominal", color: "text-emerald-400", dot: "bg-emerald-400" },
			embrace: { text: "Stress Élevé", color: "text-amber-400", dot: "bg-amber-400" },
			echolight: { text: "Standby", color: "text-slate-400", dot: "bg-slate-400" },
			dosimeter: { text: "DANGER 48.5 µSv/h", color: "text-orange-400", dot: "bg-orange-400 animate-ping" },
			saliva: { text: "Test Post-Radiation", color: "text-emerald-400", dot: "bg-emerald-400" },
			actigraphy: { text: "Veille Confinement", color: "text-emerald-400", dot: "bg-emerald-400" }
		},

		organs: {
			heart: "amber",
			lungs: "emerald",
			skeleton: "amber",
			brain: "amber",
			immune: "ruby",
			stomach: "amber"
		},

		speed: 1.15,
		amplitude: 1.1
	},

	salivaStress: {
		name: "Ingénieur de Bord • Mission Sol 185",
		missionStatus: "• STATION SPATIALE INTERNATIONALE (ISS)",
		badgeDevice: "5. Biocapteur Salivaire (ASI Bologne)",
		statusText: "Alerte : Immunodépression Salivaire",
		statusColor: "text-purple-400 bg-purple-500/20 border-purple-500/40",
		dotColor: "bg-purple-400",
		aiConfidence: "96.8%",
		aiDiagnosis: "Bio-IA : Épuisement surrénalien et déséquilibre immunitaire sévère détectés par le biocapteur de cortisol/DHEA-S.",

		recTitle: "Protocole de Restauration Immunitaire",
		recDesc: "Allègement de 40% du planning opérationnel de l'astronaute. Réalignement du cycle circadien par luminothérapie et administration de vitamines immunostimulantes.",
		recDevice: "Biocapteur Salivaire ASI (Cartouche à usage unique USB)",
		recBoxClass: "bg-purple-500/10 border-purple-500/40",

		bp: "132/86",
		bpBadge: "MODÉRÉ",
		bpBadgeClass: "text-amber-400",
		bpDiag: "Hypertension chronique modérée",
		bpTrust: "Élevée (99.0%) • Astroskin PTT",
		bpSpark: [124, 126, 128, 128, 130, 132, 134, 133, 132, 132, 132, 132],

		bpm: 78,
		bpmBadge: "INSTABLE",
		bpmBadgeClass: "text-amber-400",
		bpmDiag: "Instabilité du rythme au repos",
		bpmTrust: "Élevée (99.6%) • ECG 3-Lead",
		bpmSpark: [70, 72, 74, 76, 78, 80, 79, 77, 78, 78, 78, 78],

		glycemia: "126 mg/dL",
		glycemiaBadge: "ÉLEVÉ",
		glycemiaBadgeClass: "text-amber-400",
		glycemiaDiag: "Hyperglycémie sous excès de cortisol",
		glycemiaTrust: "Élevée (97.9%) • Capteur interstitiel",
		glycemiaSpark: [102, 106, 110, 115, 120, 124, 128, 127, 126, 126, 126, 126],

		bodyTemp: "37.2 °C",
		bodyTempBadge: "DÉRÉGULÉ",
		bodyTempBadgeClass: "text-amber-400",
		bodyTempDiag: "Dérégulation du cycle thermique",
		bodyTempTrust: "Élevée (99.1%) • EmbracePlus IR",
		bodyTempSpark: [36.9, 37.0, 37.1, 37.1, 37.2, 37.2, 37.3, 37.2, 37.2, 37.2, 37.2, 37.2],

		sleepDuration: "4h 50m",
		sleepBadge: "FRAGMENTÉ",
		sleepBadgeClass: "text-red-400 font-extrabold animate-pulse",
		sleepDiag: "Insomnie orbitale • Sommeil fragmenté",
		sleepTrust: "Élevée (98.8%) • Actiwatch / ActLumus (ARCHeR)",
		sleepSpark: [6.5, 6.2, 5.8, 5.4, 5.0, 4.8, 4.6, 4.7, 4.8, 4.9, 4.8, 4.8],

		mood: "Épuisement (3.1/10)",
		moodBadge: "BURNOUT",
		moodBadgeClass: "text-purple-400 font-extrabold animate-pulse",
		moodDiag: "Asthénie cognitive & irritabilité",
		moodTrust: "Élevée (96.0%) • Ratio Cortisol/DHEA",
		moodSpark: [6.5, 6.0, 5.4, 4.8, 4.2, 3.8, 3.3, 3.2, 3.1, 3.1, 3.1, 3.1],

		tScore: "-0.5",
		boneLoss: "(-0.3%/mois)",
		boneBadge: "NORMAL",
		boneBadgeClass: "text-emerald-400",
		boneDiag: "Densité osseuse normale",

		doseRate: "0.18 µSv/h",
		doseTotal: "(0.52 mSv)",
		radBadge: "NOMINAL",
		radBadgeClass: "text-emerald-400",
		radDiag: "Dose radiative standard",

		cortisol: "18.9 ng/mL",
		edaStress: "(6.8 µS)",
		stressBadge: "SURCHARGE",
		stressBadgeClass: "text-purple-300 font-extrabold animate-pulse",
		cortisolDiag: "EXPLOSION DU CORTISOL (Ratio C/DHEA > 4.5)",

		devices: {
			astroskin: { text: "Sommeil Altéré", color: "text-amber-400", dot: "bg-amber-400" },
			embrace: { text: "EDA Élevée (6.8 µS)", color: "text-amber-400", dot: "bg-amber-400" },
			echolight: { text: "Nominal", color: "text-emerald-400", dot: "bg-emerald-400" },
			dosimeter: { text: "Nominal", color: "text-emerald-400", dot: "bg-emerald-400" },
			saliva: { text: "CORTISOL 18.9 ng/mL", color: "text-purple-400", dot: "bg-purple-400 animate-ping" },
			actigraphy: { text: "Sommeil Fragmenté", color: "text-amber-400", dot: "bg-amber-400" }
		},

		organs: {
			heart: "amber",
			lungs: "emerald",
			skeleton: "emerald",
			brain: "ruby",
			immune: "ruby",
			stomach: "amber"
		},

		speed: 1.1,
		amplitude: 1.05
	},

	actigraphy: {
		name: "Équipage Artemis II • Mission Circumlunaire",
		missionStatus: "• SOL 08 • MISSION ARTEMIS II • ESPACE PROFOND",
		badgeDevice: "6. Actigraphie Spatiale ARCHeR (ActLumus / Orion)",
		statusText: "Alerte : Dérèglement Circadien",
		statusColor: "text-indigo-400 bg-indigo-500/15 border-indigo-500/40",
		dotColor: "bg-indigo-400",
		aiConfidence: "98.7%",
		aiDiagnosis: "Bio-IA : Désynchronisation circadienne détectée. L'actimètre ActLumus enregistre une baisse d'exposition lumineuse diurne et une accélérométrie poignet fragmentée (32 Hz) en phase de sommeil.",

		recTitle: "Protocole de Resynchronisation Circadienne (ARCHeR)",
		recDesc: "Activation de la luminothérapie bleue/blanche enrichie (10 000 Lux) dans le cockpit d'Orion pendant 45 minutes pour stimuler la mélanopsine rétinienne. Verrouillage du module de sommeil avec occultation totale.",
		recDevice: "Actigraphe Spatial ActLumus (Condor Inst. / NASA Ames)",
		recBoxClass: "bg-indigo-500/10 border-indigo-500/40",

		bp: "122/80",
		bpBadge: "NORMAL",
		bpBadgeClass: "text-emerald-400",
		bpDiag: "Normotension de repos stable",
		bpTrust: "Élevée (99.4%) • Astroskin PTT",
		bpSpark: [120, 121, 122, 122, 123, 122, 122, 121, 122, 122, 122, 122],

		bpm: 64,
		bpmBadge: "REPOS",
		bpmBadgeClass: "text-emerald-400",
		bpmDiag: "Rythme de repos circadien",
		bpmTrust: "Élevée (99.8%) • ECG 3-Lead",
		bpmSpark: [62, 63, 64, 65, 64, 63, 64, 65, 64, 64, 64, 64],

		glycemia: "98 mg/dL",
		glycemiaBadge: "NORMAL",
		glycemiaBadgeClass: "text-emerald-400",
		glycemiaDiag: "Normoglycémie basale",
		glycemiaTrust: "Élevée (98.1%) • Capteur interstitiel",
		glycemiaSpark: [96, 97, 98, 99, 98, 97, 98, 98, 99, 98, 98, 98],

		bodyTemp: "36.4 °C",
		bodyTempBadge: "CREUX NOCTURNE",
		bodyTempBadgeClass: "text-cyan-400",
		bodyTempDiag: "Creux thermique circadien nocturne",
		bodyTempTrust: "Élevée (99.3%) • EmbracePlus IR",
		bodyTempSpark: [36.8, 36.7, 36.6, 36.5, 36.4, 36.4, 36.3, 36.4, 36.4, 36.4, 36.4, 36.4],

		sleepDuration: "5h 15m",
		sleepBadge: "ÉCOURTÉ",
		sleepBadgeClass: "text-amber-400",
		sleepDiag: "Sommeil fragmenté • 5 micro-réveils",
		sleepTrust: "Élevée (99.5%) • Actiwatch Spectrum Plus (Actimétrie + Lux)",
		sleepSpark: [6.8, 6.4, 6.0, 5.6, 5.4, 5.2, 5.0, 5.1, 5.2, 5.1, 5.2, 5.2],

		mood: "Fatigue Circadienne (5.6/10)",
		moodBadge: "VIGILANCE BASSE",
		moodBadgeClass: "text-amber-400",
		moodDiag: "Baisse de vigilance en transit lointain",
		moodTrust: "Élevée (97.2%) • Actigraphie & VFC",
		moodSpark: [7.2, 6.8, 6.4, 6.0, 5.8, 5.6, 5.5, 5.6, 5.7, 5.6, 5.6, 5.6],

		tScore: "-0.2",
		boneLoss: "(-0.1%/mois)",
		boneBadge: "NORMAL",
		boneBadgeClass: "text-emerald-400",
		boneDiag: "Densité osseuse normale",

		doseRate: "0.28 µSv/h",
		doseTotal: "(1.42 mSv)",
		radBadge: "NOMINAL",
		radBadgeClass: "text-emerald-400",
		radDiag: "Flux translunaire modéré",

		cortisol: "11.2 ng/mL",
		edaStress: "(3.4 µS)",
		stressBadge: "DÉCALAGE",
		stressBadgeClass: "text-amber-400",
		cortisolDiag: "Désynchronisation du pic matinal",

		devices: {
			astroskin: { text: "Nominal", color: "text-emerald-400", dot: "bg-emerald-400" },
			embrace: { text: "Nominal", color: "text-emerald-400", dot: "bg-emerald-400" },
			echolight: { text: "Standby", color: "text-slate-400", dot: "bg-slate-400" },
			dosimeter: { text: "Nominal", color: "text-emerald-400", dot: "bg-emerald-400" },
			saliva: { text: "Nominal", color: "text-emerald-400", dot: "bg-emerald-400" },
			actigraphy: { text: "ALERTE SOMMEIL 5h15m (Lux: 120)", color: "text-indigo-400", dot: "bg-indigo-400 animate-ping" }
		},

		organs: {
			heart: "emerald",
			lungs: "emerald",
			skeleton: "emerald",
			brain: "amber",
			immune: "amber",
			stomach: "emerald"
		},

		speed: 0.95,
		amplitude: 0.95
	}
};

/* ==========================================================================
   2. CONFIGURATION DES 4 ENVIRONNEMENTS DE MISSION & PONDÉRATION DES RISQUES
   ========================================================================== */

var missionEnvironments = {
	transit: {
		name: "Vaisseau en Transit Cis-Lunaire / Mars",
		badge: "🚀 Vaisseau en Transit (Espace Profond)",
		badgeClass: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
		gravity: "0.00 G (Microgravité stricte)",
		radiationEnv: "Élevé (Hors magnétosphère • GCR + SPE)",
		communicationDelay: "Délai Com : +4.2 à +22 min",
		lifeSupport: "ECLSS boucle fermée • Volume pressurisé compact",
		risks: [
			{ name: "Radiations Spatiales (GCR & SPE)", level: "CRITIQUE (5/5)", desc: "Exposition continue aux rayons cosmiques galactiques.", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/30" },
			{ name: "Éloignement de la Terre", level: "CRITIQUE (5/5)", desc: "Aucune évacuation d'urgence médicale possible en moins de 6 mois.", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/30" },
			{ name: "Champs Gravitationnels Altérés", level: "ÉLEVÉ (4/5)", desc: "Atrophie musculo-squelettique et redistribution liquidienne céphalique.", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
			{ name: "Isolement & Confinement", level: "ÉLEVÉ (4/5)", desc: "Stress psychosocial et perturbation du rythme circadien.", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
			{ name: "Environnement Clos / Hostile", level: "MODÉRÉ (3/5)", desc: "Gestion des contaminants, CO2 et microbiote du vaisseau.", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/30" }
		],
		highlightMetrics: ["rad", "bone", "stress"]
	},
	station: {
		name: "Station Orbitale en Orbite Basse (LEO)",
		badge: "🛰️ Station Orbitale (LEO / ISS)",
		badgeClass: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
		gravity: "0.00 G (Chute libre orbitale)",
		radiationEnv: "Modéré (Protégé par le bouclier géomagnétique terrestre)",
		communicationDelay: "Temps réel (< 1 seconde avec le MCC Houston)",
		lifeSupport: "Modules spatiaux modulaires • Ravitaillement régulier Cargo",
		risks: [
			{ name: "Champs Gravitationnels Altérés", level: "CRITIQUE (5/5)", desc: "Perte de densité minérale osseuse (-1% par mois sans contre-mesures).", color: "text-red-400", bg: "bg-red-500/10 border-red-500/30" },
			{ name: "Environnement Clos / Hostile", level: "ÉLEVÉ (4/5)", desc: "Atmosphère pressurisée artificielle, accumulation de poussières et flore bactérienne.", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
			{ name: "Isolement & Confinement", level: "MODÉRÉ (3/5)", desc: "Rythme de 16 levers/couchers de soleil par 24h.", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/30" },
			{ name: "Radiations Spatiales", level: "MODÉRÉ (3/5)", desc: "Pics ponctuels lors de la traversée de l'Anomalie de l'Atlantique Sud (SAA).", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/30" },
			{ name: "Éloignement de la Terre", level: "FAIBLE (1/5)", desc: "Rapatriement d'urgence en capsule possible en moins de 24 heures.", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30" }
		],
		highlightMetrics: ["bone", "stress", "rad"]
	},
	rover: {
		name: "Rover de Surface Pressurisé (Lune / Mars)",
		badge: "🚜 Rover d'Exploration de Surface",
		badgeClass: "bg-amber-500/15 text-amber-300 border-amber-500/30",
		gravity: "0.16 G (Lune) ou 0.38 G (Mars)",
		radiationEnv: "Élevé (Rayonnement solaire direct sans atmosphère)",
		communicationDelay: "Liaison directe antenne haute fréquence (délai 1.3s Lune)",
		lifeSupport: "Système mobile autonome • Sas de transition scaphandres",
		risks: [
			{ name: "Environnement Hostile / Régolithe", level: "CRITIQUE (5/5)", desc: "Poussière lunaire toxique et abrasive, micro-météorites et vide spatial.", color: "text-red-400", bg: "bg-red-500/10 border-red-500/30" },
			{ name: "Radiations de Surface", level: "ÉLEVÉ (4/5)", desc: "Aucun blindage lourd mobile, exposition directe aux tempêtes SPE.", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/30" },
			{ name: "Charge Cardiovasculaire & Effort EVA", level: "ÉLEVÉ (4/5)", desc: "Dépense énergétique intense sous scaphandre, contraintes articulaires.", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
			{ name: "Isolement Tactique", level: "MODÉRÉ (3/5)", desc: "Éloignement du camp de base principal en cas de panne de mobilité.", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/30" },
			{ name: "Éloignement de la Terre", level: "CRITIQUE (5/5)", desc: "Assistance médicale chirurgicale autonome obligatoire.", color: "text-red-400", bg: "bg-red-500/10 border-red-500/30" }
		],
		highlightMetrics: ["stress", "rad", "bone"]
	},
	base: {
		name: "Base Planétaire Semi-Enterrée (Habitat Artemis / Mars Base)",
		badge: "🌕 Base Planétaire Permanente",
		badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
		gravity: "Gravité partielle permanente (0.16 G / 0.38 G)",
		radiationEnv: "Modéré (Blindage passif par regolith lunaire superposé)",
		communicationDelay: "Station relais orbitale Gateway / Deep Space Network",
		lifeSupport: "Serres hydroponiques, recyclage hydrique 98%, sas de décontamination",
		risks: [
			{ name: "Isolement Chronique & Psychologie", level: "CRITIQUE (5/5)", desc: "Missions de longue durée (500+ jours), monotonie sensorielle.", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30" },
			{ name: "Gravité Partielle Prolongée", level: "ÉLEVÉ (4/5)", desc: "Inconnue biologique sur l'adaptation neuro-vestibulaire et osseuse long terme.", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
			{ name: "Environnement Clos ECLSS", level: "ÉLEVÉ (4/5)", desc: "Dépendance absolue au recyclage de l'oxygène et de l'eau.", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
			{ name: "Éloignement de la Terre", level: "CRITIQUE (5/5)", desc: "Ravitaillement espacé de 18 à 24 mois (fenêtres de lancement de Hohmann).", color: "text-red-400", bg: "bg-red-500/10 border-red-500/30" },
			{ name: "Radiations Résiduelles", level: "MODÉRÉ (3/5)", desc: "Protégé dans les quartiers de vie, surveillance lors des sorties extérieures.", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/30" }
		],
		highlightMetrics: ["stress", "bone", "rad"]
	}
};

/* ==========================================================================
   3. BASE DE DONNÉES DE LA SILHOUETTE ANATOMIQUE INTERACTIVE (6 ZONES)
   ========================================================================== */

var bodyZones = {
	heart: {
		name: "Cœur & Système Cardiovasculaire",
		icon: "heart-pulse",
		sensor: "Maillot Astroskin (ECG 3-Lead) & Montre EmbracePlus (PPG)",
		indicator: "Rythme Cardiaque (BPM) & Pression Artérielle PTT (mmHg)",
		nasaHazard: "Champs Gravitationnels Altérés (Gravity Fields)",
		plainText: "En apesanteur, les fluides corporels remontent vers le torse et la tête car la gravité ne les attire plus vers le bas. Le cœur n'a plus à pomper aussi fort pour alimenter le cerveau, ce qui entraîne une perte de tonus cardiovasculaire et un risque d'étourdissement ou de syncope lors des changements de posture ou du retour sur Terre.",
		recommendation: "Maintien de 45 minutes d'exercice cardiovasculaire quotidien (tapis roulant T2 avec harnais de maintien élastique ou ergomètre vélo CEVIS)."
	},
	lungs: {
		name: "Poumons & Échanges Respiratoires",
		icon: "wind",
		sensor: "Sangles d'Inductance Thoracique Astroskin & Sonde SpO2",
		indicator: "Fréquence Respiratoire & Saturation Pulsée en Oxygène (SpO2)",
		nasaHazard: "Environnements Clos & Hostiles (Hostile/Closed Environments)",
		plainText: "Dans un habitat spatial ou un scaphandre, l'air ne circule pas par convection thermique naturelle : sans ventilateur, une poche de dioxyde de carbone (CO2) expiré stagne autour de la tête de l'astronaute, provoquant maux de tête et essoufflement. Les capteurs surveillent en continu la régularité du souffle et l'oxygénation du sang.",
		recommendation: "Contrôle immédiat des débits de ventilation dans le module et vérification de la cartouche de captation de CO2 (hydroxyde de lithium ou amine)."
	},
	skeleton: {
		name: "Squelette, Colonne Vertébrale & Fémurs",
		icon: "bone",
		sensor: "Échographe Osseux Portatif EchoLight (Technologie REMS)",
		indicator: "T-Score Lombaire/Fémoral & Taux de Perte Osseuse (%/mois)",
		nasaHazard: "Champs Gravitationnels Altérés (Gravity Fields)",
		plainText: "Privés du poids du corps à supporter, les os de la colonne et des jambes se déminéralisent : l'astronaute perd 1 à 1,5% de masse osseuse par mois en microgravité, et le calcium libéré dans le sang augmente le risque de calculs rénaux. L'échographe sans radiation mesure périodiquement cette perte pour ajuster les exercices.",
		recommendation: "Augmentation des séances de musculation lourde avec l'ARED (Advanced Resistive Exercise Device) simulant des charges de 150 kg, et apport de Vitamine D3."
	},
	brain: {
		name: "Cerveau, Humeur & Vigilance Cognitive",
		icon: "brain",
		sensor: "Variabilité de la Fréquence Cardiaque (VFC) & Actigraphie ARCHeR (Actiwatch/ActLumus)",
		indicator: "Score d'Humeur & Vigilance (0 à 10) & Temps de Réaction",
		nasaHazard: "Isolement & Confinement (Isolation & Confinement)",
		plainText: "Le confinement prolongé dans un espace restreint, l'absence de lumière naturelle et la charge de travail intense perturbent le moral et la vigilance. L'algorithme détecte les signaux précoces de fatigue cognitive ou de stress aigu bien avant que l'astronaute ne commette une erreur opérationnelle.",
		recommendation: "Séance de relaxation guidée audio de 15 minutes, temps libre sans écran et contact programmé avec la famille via liaison privée."
	},
	immune: {
		name: "Système Immunitaire & Stress Biologique",
		icon: "shield-alert",
		sensor: "Biocapteur Salivaire ASI & Capteur de Conductance Cutanée EDA",
		indicator: "Taux de Cortisol (ng/mL) & Ratio DHEA-S Immunitaire",
		nasaHazard: "Radiations Spatiales & Confinement (Radiation & Confinement)",
		plainText: "Le stress chronique combiné aux radiations spatiales affaiblit les défenses immunitaires de l'organisme, ce qui peut réactiver d'anciens virus dormants (comme le virus du bouton de fièvre ou du zona). Le test salivaire rapide permet de quantifier ce déséquilibre sans avoir à réaliser de prise de sang.",
		recommendation: "Allègement temporaire du planning de travail, cure d'antioxydants et vérification de l'intégrité de la barrière cutanée."
	},
	stomach: {
		name: "Nutrition, Estomac & Hydratation",
		icon: "utensils",
		sensor: "Journal Nutritionnel Déclaratif & Capteur de Glycémie",
		indicator: "Apport Calorique Quotidien (kcal) & Consommation d'Eau (Litres)",
		nasaHazard: "Éloignement de la Terre & Logistique Vitale (Distance from Earth)",
		plainText: "En microgravité, la sensation de faim et de soif diminue fréquemment alors que les dépenses énergétiques restent très élevées à cause de l'exercice obligatoire. Une sous-alimentation entraîne une fonte musculaire rapide et la déshydratation fragilise les reins face au calcium osseux.",
		recommendation: "Consommation obligatoire de la ration énergétique restante et hydratation d'au moins 2,5 litres d'eau filtrée par 24 heures."
	}
};

var currentECGParams = { speed: 1.0, amplitude: 1.0 };
var isShockTesting = false;
var activeEnvironmentKey = "transit";
var activeScenarioKey = "nominal";

/* ==========================================================================
   4. APPLICATION DU SÉLECTEUR D'ENVIRONNEMENT DE MISSION
   ========================================================================== */

function applyEnvironment(envKey) {
	var env = missionEnvironments[envKey];
	if (!env) return;
	activeEnvironmentKey = envKey;

	// Mise à jour visuelle des 4 boutons d'environnement
	var envKeys = ["transit", "station", "rover", "base"];
	envKeys.forEach(function (k) {
		var btn = document.getElementById("env-btn-" + k);
		if (btn) {
			if (k === envKey) {
				btn.className = "px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all border bg-white text-slate-950 border-white shadow-lg shadow-black/30 flex items-center gap-2";
			} else {
				btn.className = "px-4 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all border bg-white/[0.03] text-slate-400 border-white/[0.08] hover:border-white/[0.18] hover:bg-white/[0.06] hover:text-white flex items-center gap-2";
			}
		}
	});

	// Badge d'environnement principal
	var badgeEl = document.getElementById("env-badge-title");
	if (badgeEl) {
		badgeEl.textContent = env.badge;
		badgeEl.className = "px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border inline-flex items-center gap-2 " + env.badgeClass;
	}

	var envTitleEl = document.getElementById("env-name-desc");
	if (envTitleEl) envTitleEl.textContent = env.name;

	var envGravityEl = document.getElementById("env-stat-gravity");
	if (envGravityEl) envGravityEl.textContent = env.gravity;

	var envRadEl = document.getElementById("env-stat-radiation");
	if (envRadEl) envRadEl.textContent = env.radiationEnv;

	var envComEl = document.getElementById("env-stat-com");
	if (envComEl) envComEl.textContent = env.communicationDelay;

	var envEclssEl = document.getElementById("env-stat-eclss");
	if (envEclssEl) envEclssEl.textContent = env.lifeSupport;

	// Rendu de la liste ordonnée des 5 Risques NASA
	var risksContainer = document.getElementById("env-risks-container");
	if (risksContainer) {
		risksContainer.innerHTML = "";
		env.risks.forEach(function (r, index) {
			var card = document.createElement("div");
			card.className = "p-3.5 rounded-xl border text-xs flex flex-col justify-between transition-all " + r.bg;
			card.innerHTML = `
				<div class="flex items-center justify-between gap-2 mb-1">
					<span class="font-mono font-bold text-slate-200">#0${index + 1} • ${r.name}</span>
					<span class="font-mono font-extrabold ${r.color} text-[10px] tracking-wider">${r.level}</span>
				</div>
				<p class="text-slate-300 text-[11px] leading-relaxed">${r.desc}</p>
			`;
			risksContainer.appendChild(card);
		});
	}

	// Mise en surbrillance dynamique des métriques spatiales selon l'environnement
	updateDeepSpaceHighlight(env.highlightMetrics);

	if (window.lucide && typeof window.lucide.createIcons === "function") {
		window.lucide.createIcons();
	}
}

function updateDeepSpaceHighlight(highlights) {
	var metricCards = {
		rad: document.getElementById("deep-metric-rad"),
		bone: document.getElementById("deep-metric-bone"),
		stress: document.getElementById("deep-metric-stress")
	};

	for (var key in metricCards) {
		var card = metricCards[key];
		if (!card) continue;
		if (highlights && highlights.indexOf(key) !== -1) {
			card.classList.add("ring-1", "ring-cyan-400/40", "bg-cyan-950/20");
		} else {
			card.classList.remove("ring-1", "ring-cyan-400/40", "bg-cyan-950/20");
		}
	}
}

/* ==========================================================================
   5. INTERACTION AVEC LA SILHOUETTE ANATOMIQUE VECTORIELLE
   ========================================================================== */

function selectBodyZone(zoneKey) {
	var zone = bodyZones[zoneKey];
	if (!zone) return;

	// Mise à jour de la surbrillance sur les zones SVG
	var allZones = ["heart", "lungs", "skeleton", "brain", "immune", "stomach"];
	allZones.forEach(function (k) {
		var svgElem = document.getElementById("svg-zone-" + k);
		var btnElem = document.getElementById("btn-zone-" + k);
		if (svgElem) {
			if (k === zoneKey) {
				svgElem.setAttribute("stroke-width", "3.5");
				svgElem.setAttribute("filter", "url(#glow-strong)");
			} else {
				svgElem.setAttribute("stroke-width", "1.5");
				svgElem.removeAttribute("filter");
			}
		}
		if (btnElem) {
			if (k === zoneKey) {
				btnElem.className = "w-full text-left p-2.5 rounded-xl border bg-white text-slate-950 border-white font-mono text-xs font-bold flex items-center justify-between shadow-sm";
			} else {
				btnElem.className = "w-full text-left p-2.5 rounded-xl border bg-white/[0.03] border-white/[0.06] hover:border-white/[0.15] text-slate-400 hover:text-white font-mono text-xs font-semibold flex items-center justify-between transition-colors";
			}
		}
	});

	// Récupération de l'état actuel de cet organe dans le scénario actif
	var currentStatus = "emerald";
	var data = simData[activeScenarioKey];
	if (data && data.organs && data.organs[zoneKey]) {
		currentStatus = data.organs[zoneKey];
	}

	var statusBadgeMap = {
		emerald: { text: "STATUT OPTIMAL • NOMINAL", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
		amber: { text: "VIGILANCE • ATTENTION PHYSIO", color: "text-amber-400 bg-amber-500/15 border-amber-500/40" },
		ruby: { text: "ALERTE VITALE • ANOMALIE", color: "text-red-400 bg-red-500/20 border-red-500/50" }
	};
	var st = statusBadgeMap[currentStatus] || statusBadgeMap.emerald;

	// Panneau d'informations de l'organe
	var organTitle = document.getElementById("organ-title");
	if (organTitle) organTitle.textContent = zone.name;

	var organBadge = document.getElementById("organ-status-badge");
	if (organBadge) {
		organBadge.textContent = st.text;
		organBadge.className = "px-3 py-1 rounded-full text-[10px] font-mono font-bold border inline-flex items-center gap-1.5 " + st.color;
	}

	var organHazard = document.getElementById("organ-hazard");
	if (organHazard) organHazard.textContent = zone.nasaHazard;

	var organSensor = document.getElementById("organ-sensor");
	if (organSensor) organSensor.textContent = zone.sensor;

	var organIndicator = document.getElementById("organ-indicator");
	if (organIndicator) organIndicator.textContent = zone.indicator;

	var organDesc = document.getElementById("organ-plain-desc");
	if (organDesc) organDesc.textContent = zone.plainText;

	var organRec = document.getElementById("organ-recommendation");
	if (organRec) organRec.textContent = zone.recommendation;

	if (window.lucide && typeof window.lucide.createIcons === "function") {
		window.lucide.createIcons();
	}
}

function updateSilhouetteColors(organs) {
	if (!organs) return;
	var colorPalette = {
		emerald: { fill: "rgba(16, 185, 129, 0.25)", stroke: "#10B981" },
		amber: { fill: "rgba(245, 158, 11, 0.35)", stroke: "#F59E0B" },
		ruby: { fill: "rgba(239, 68, 68, 0.45)", stroke: "#EF4444" }
	};

	for (var organKey in organs) {
		var state = organs[organKey] || "emerald";
		var pal = colorPalette[state] || colorPalette.emerald;
		var elem = document.getElementById("svg-zone-" + organKey);
		if (elem) {
			elem.setAttribute("fill", pal.fill);
			elem.setAttribute("stroke", pal.stroke);
		}
	}
}

/* ==========================================================================
   6. APPLICATION DES SCÉNARIOS SIMULATEUR TÉLÉMÉTRIQUE
   ========================================================================== */

function applySimScenario(key) {
	if (isShockTesting) return;

	var data = simData[key];
	if (!data) return;
	activeScenarioKey = key;

	// Mise à jour visuelle des 6 boutons de scénarios
	var scenarioKeys = ["nominal", "hypoxia", "boneLoss", "solarStorm", "salivaStress", "actigraphy"];
	scenarioKeys.forEach(function (k) {
		var btn = document.getElementById("sim-btn-" + k);
		if (btn) {
			if (k === key) {
				btn.className = "sim-pill px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all border bg-white text-slate-950 border-white shadow-lg shadow-black/30";
			} else {
				btn.className = "sim-pill px-3.5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all border bg-white/[0.03] text-slate-400 border-white/[0.08] hover:border-white/[0.18] hover:bg-white/[0.06] hover:text-white";
			}
		}
	});

	// Header du Cockpit
	var elSubject = document.getElementById("sim-subject-name");
	if (elSubject) elSubject.textContent = data.name;

	var elSubStatus = document.getElementById("sim-subject-status");
	if (elSubStatus) elSubStatus.textContent = data.missionStatus;

	var elBadgeDevice = document.getElementById("sim-badge-device");
	if (elBadgeDevice) elBadgeDevice.textContent = data.badgeDevice;

	// Badge d'état global
	var badge = document.getElementById("sim-status-badge");
	var dot = document.getElementById("sim-status-dot");
	var text = document.getElementById("sim-status-text");
	if (badge) badge.className = "px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border flex items-center gap-2 " + data.statusColor;
	if (dot) dot.className = "w-2 h-2 rounded-full " + data.dotColor + " animate-ping";
	if (text) text.textContent = data.statusText;

	// Diagnostic Box IA
	var elConf = document.getElementById("sim-ai-confidence");
	if (elConf) elConf.textContent = data.aiConfidence;

	var elDiag = document.getElementById("sim-diag-desc");
	if (elDiag) elDiag.textContent = data.aiDiagnosis;

	// Boîte Protocole
	var recBox = document.getElementById("sim-rec-box");
	if (recBox) recBox.className = "p-4 rounded-xl border text-xs space-y-1.5 " + data.recBoxClass;

	var recTitle = document.getElementById("sim-rec-title");
	if (recTitle) recTitle.textContent = data.recTitle;

	var recDesc = document.getElementById("sim-rec-desc");
	if (recDesc) recDesc.textContent = data.recDesc;

	var recDevice = document.getElementById("sim-rec-device");
	if (recDevice) recDevice.textContent = data.recDevice;

	// Statut des 6 capteurs
	var devKeys = ["astroskin", "embrace", "echolight", "dosimeter", "saliva", "actigraphy"];
	devKeys.forEach(function (k) {
		var dev = data.devices[k];
		var dotEl = document.getElementById("dot-" + k);
		var statusEl = document.getElementById("status-" + k);
		if (dotEl && dev) dotEl.className = "w-2 h-2 rounded-full " + dev.dot;
		if (statusEl && dev) {
			statusEl.textContent = dev.text;
			statusEl.className = "font-bold " + dev.color;
		}
	});

	// ==============================================================
	// LES 6 INDICATEURS FONDAMENTAUX DE SANTÉ + SPARKLINE + INDICE CONFIANCE
	// ==============================================================

	// 1. Pression artérielle
	setText("val-bp", data.bp);
	setBadge("badge-bp", data.bpBadge, data.bpBadgeClass);
	setText("diag-bp", data.bpDiag);
	setText("trust-bp", data.bpTrust);
	renderSparkline("spark-bp", data.bpSpark, "#10B981");

	// 2. Rythme cardiaque
	setText("val-bpm", data.bpm);
	setBadge("badge-bpm", data.bpmBadge, data.bpmBadgeClass);
	setText("diag-bpm", data.bpmDiag);
	setText("trust-bpm", data.bpmTrust);
	renderSparkline("spark-bpm", data.bpmSpark, data.bpmBadgeClass.indexOf("red") !== -1 || data.bpmBadgeClass.indexOf("amber") !== -1 ? "#F59E0B" : "#10B981");

	// 3. Glycémie
	setText("val-glycemia", data.glycemia);
	setBadge("badge-glycemia", data.glycemiaBadge, data.glycemiaBadgeClass);
	setText("diag-glycemia", data.glycemiaDiag);
	setText("trust-glycemia", data.glycemiaTrust);
	renderSparkline("spark-glycemia", data.glycemiaSpark, "#00E5FF");

	// 4. Température corporelle
	setText("val-bodytemp", data.bodyTemp);
	setBadge("badge-bodytemp", data.bodyTempBadge, data.bodyTempBadgeClass);
	setText("diag-bodytemp", data.bodyTempDiag);
	setText("trust-bodytemp", data.bodyTempTrust);
	renderSparkline("spark-bodytemp", data.bodyTempSpark, "#00E5FF");

	// 5. Durée du sommeil
	setText("val-sleep", data.sleepDuration);
	setBadge("badge-sleep", data.sleepBadge, data.sleepBadgeClass);
	setText("diag-sleep", data.sleepDiag);
	setText("trust-sleep", data.sleepTrust);
	renderSparkline("spark-sleep", data.sleepSpark, "#818CF8");

	// 6. Humeur
	setText("val-mood", data.mood);
	setBadge("badge-mood", data.moodBadge, data.moodBadgeClass);
	setText("diag-mood", data.moodDiag);
	setText("trust-mood", data.moodTrust);
	renderSparkline("spark-mood", data.moodSpark, "#A855F7");

	// Métriques spatiales
	setText("val-tscore", data.tScore);
	setText("val-boneloss", data.boneLoss);
	setBadge("badge-bone", data.boneBadge, data.boneBadgeClass);
	setText("diag-bone", data.boneDiag);

	setText("val-doserate", data.doseRate);
	setText("val-dosetotal", data.doseTotal);
	setBadge("badge-rad", data.radBadge, data.radBadgeClass);
	setText("diag-rad", data.radDiag);

	setText("val-cortisol", data.cortisol);
	setText("val-eda", data.edaStress);
	setBadge("badge-stress", data.stressBadge, data.stressBadgeClass);
	setText("diag-cortisol", data.cortisolDiag);

	// BPM Live
	var liveBpm = document.getElementById("sim-live-bpm");
	if (liveBpm) liveBpm.textContent = data.bpm + " BPM";

	// Paramètres ECG
	currentECGParams.speed = data.speed;
	currentECGParams.amplitude = data.amplitude;

	// Synchronisation des couleurs de la silhouette
	updateSilhouetteColors(data.organs);

	// Réactualiser le panneau de détail de l'organe actuellement sélectionné
	var activeZoneKey = "heart";
	var organTitle = document.getElementById("organ-title");
	if (organTitle && organTitle.textContent.indexOf("Poumons") !== -1) activeZoneKey = "lungs";
	else if (organTitle && organTitle.textContent.indexOf("Squelette") !== -1) activeZoneKey = "skeleton";
	else if (organTitle && organTitle.textContent.indexOf("Cerveau") !== -1) activeZoneKey = "brain";
	else if (organTitle && organTitle.textContent.indexOf("Immunitaire") !== -1) activeZoneKey = "immune";
	else if (organTitle && organTitle.textContent.indexOf("Nutrition") !== -1) activeZoneKey = "stomach";
	selectBodyZone(activeZoneKey);

	if (window.lucide && typeof window.lucide.createIcons === "function") {
		window.lucide.createIcons();
	}
}

function setText(id, text) {
	var el = document.getElementById(id);
	if (el) el.textContent = text;
}

function setBadge(id, text, className) {
	var el = document.getElementById(id);
	if (el) {
		el.textContent = text;
		el.className = "text-[10px] font-mono font-bold " + className;
	}
}

/* ==========================================================================
   7. TRACÉ DES GRAPHES MINIATURES DE TENDANCE (SPARKLINES SVG 24H)
   ========================================================================== */

function renderSparkline(containerId, points, color) {
	var container = document.getElementById(containerId);
	if (!container || !points || points.length === 0) return;

	var width = 120;
	var height = 28;
	var min = Math.min.apply(null, points);
	var max = Math.max.apply(null, points);
	if (min === max) {
		min -= 1;
		max += 1;
	}

	var d = "";
	var pointsStr = "";
	points.forEach(function (val, idx) {
		var x = (idx / (points.length - 1)) * width;
		var y = height - ((val - min) / (max - min)) * (height - 6) - 3;
		if (idx === 0) {
			d += "M " + x.toFixed(1) + " " + y.toFixed(1);
		} else {
			d += " L " + x.toFixed(1) + " " + y.toFixed(1);
		}
		pointsStr += x.toFixed(1) + "," + y.toFixed(1) + " ";
	});

	var lastX = width;
	var lastY = height - ((points[points.length - 1] - min) / (max - min)) * (height - 6) - 3;

	container.innerHTML = `
		<svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" class="overflow-visible">
			<path d="${d}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
			<circle cx="${lastX}" cy="${lastY}" r="2.5" fill="${color}" class="animate-ping" opacity="0.75" />
			<circle cx="${lastX}" cy="${lastY}" r="2" fill="${color}" />
		</svg>
	`;
}

/* ==========================================================================
   8. TEST DE SYNCOPE & RÉANIMATION D'URGENCE (150 JOULES)
   ========================================================================== */

function triggerShockTest() {
	if (isShockTesting) return;
	isShockTesting = true;

	var shockBtn = document.getElementById("sim-shock-btn");
	if (shockBtn) {
		shockBtn.textContent = "⚡ CHOC DÉLIVRÉ (150 JOULES)...";
		shockBtn.className = "px-4 py-2 rounded-xl text-xs font-mono font-bold border bg-red-600 text-white border-red-400 shadow-xl shadow-red-500/40 animate-pulse";
	}

	var elSubject = document.getElementById("sim-subject-name");
	if (elSubject) elSubject.textContent = "Astronaute EVA • Collapse Aigu Détecté";

	var badge = document.getElementById("sim-status-badge");
	var dot = document.getElementById("sim-status-dot");
	var text = document.getElementById("sim-status-text");
	if (badge) badge.className = "px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border flex items-center gap-2 text-red-300 bg-red-600/30 border-red-500/60 animate-pulse";
	if (dot) dot.className = "w-2 h-2 rounded-full bg-red-500 animate-ping";
	if (text) text.textContent = "URGENCE VITALE : SYNCOPE (150J)";

	setText("sim-ai-confidence", "99.9%");
	setText("sim-diag-desc", "Bio-IA : Arrêt baroréflexe aigu, collapsus de la tension artérielle PTT et immobilité totale détectés.");

	var recBox = document.getElementById("sim-rec-box");
	if (recBox) recBox.className = "p-4 rounded-xl border text-xs space-y-1.5 bg-red-950/50 border-red-500/60";
	setText("sim-rec-title", "⚡ Protocole de Réanimation d'Urgence 150J");
	setText("sim-rec-desc", "Décharge électrique automatisée délivrée avec succès par les électrodes médicales. Compression pneumatique des membres inférieurs pour retour veineux cérébral.");
	setText("sim-rec-device", "Maillot Astroskin & Système Automatisé de Choc");

	setText("val-bp", "68/42");
	setBadge("badge-bp", "COLLAPSUS", "text-red-400 font-extrabold animate-pulse");
	setText("diag-bp", "Chute critique (choc hypovolémique)");

	setText("val-bpm", "42");
	setBadge("badge-bpm", "BRADYCARDIE", "text-red-400 font-extrabold animate-pulse");

	setText("val-bodytemp", "35.9 °C");
	setBadge("badge-bodytemp", "HYPOTHERMIE", "text-red-400");

	setText("val-mood", "Coma (0.0/10)");
	setBadge("badge-mood", "INCONSCIENT", "text-red-400 font-extrabold animate-pulse");

	setText("sim-live-bpm", "42 BPM");

	currentECGParams.speed = 0.45;
	currentECGParams.amplitude = 0.5;

	// Silhouette : passage du cœur et du cerveau en alerte rouge
	updateSilhouetteColors({
		heart: "ruby",
		lungs: "amber",
		skeleton: "emerald",
		brain: "ruby",
		immune: "emerald",
		stomach: "emerald"
	});

	setTimeout(function () {
		isShockTesting = false;
		if (shockBtn) {
			shockBtn.textContent = "⚡ Simuler Syncope & Choc 150J";
			shockBtn.className = "px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold border bg-red-950/40 text-red-300 border-red-500/40 hover:bg-red-900/50 hover:text-white transition-all flex items-center gap-1.5";
		}
		applySimScenario("nominal");
	}, 3500);
}

/* ==========================================================================
   9. MODULE NUTRITION & HYDRATATION (7E INDICATEUR DE SANTÉ)
   ========================================================================== */

var nutritionState = {
	caloriesTarget: 2800,
	waterTarget: 2.5,
	caloriesLogged: 1950,
	waterLogged: 1.8
};

function initNutrition() {
	// Charger depuis localStorage si existant
	try {
		var saved = localStorage.getItem("santellite_nutrition_data");
		if (saved) {
			var parsed = JSON.parse(saved);
			nutritionState.caloriesLogged = parsed.caloriesLogged || 1950;
			nutritionState.waterLogged = parsed.waterLogged || 1.8;
		}
	} catch (e) {
		console.warn("Storage warning:", e);
	}
	renderNutrition();
}

function logRation(rationType) {
	var rations = {
		breakfast: { name: "Petit-Déjeuner Lyophilisé", kcal: 650, water: 0.6 },
		lunch: { name: "Déjeuner de Mission (Poulet curry & riz)", kcal: 950, water: 0.8 },
		dinner: { name: "Dîner Léger & Soupe Réhydratable", kcal: 850, water: 0.7 },
		snack: { name: "Barre Énergétique & Boisson Électrolytes", kcal: 350, water: 0.4 }
	};

	var r = rations[rationType];
	if (!r) return;

	nutritionState.caloriesLogged += r.kcal;
	nutritionState.waterLogged += r.water;
	nutritionState.waterLogged = parseFloat(nutritionState.waterLogged.toFixed(2));

	try {
		localStorage.setItem("santellite_nutrition_data", JSON.stringify(nutritionState));
	} catch (e) {}

	renderNutrition();

	// Feedback visuel rapide
	var feed = document.getElementById("nutrition-feedback");
	if (feed) {
		feed.textContent = `+${r.kcal} kcal et +${r.water} L enregistrés (${r.name})`;
		feed.classList.remove("opacity-0");
		setTimeout(function () {
			feed.classList.add("opacity-0");
		}, 3000);
	}
}

function resetNutrition() {
	nutritionState.caloriesLogged = 0;
	nutritionState.waterLogged = 0.0;
	try {
		localStorage.setItem("santellite_nutrition_data", JSON.stringify(nutritionState));
	} catch (e) {}
	renderNutrition();
}

function renderNutrition() {
	var kcalPercent = Math.min(100, Math.round((nutritionState.caloriesLogged / nutritionState.caloriesTarget) * 100));
	var waterPercent = Math.min(100, Math.round((nutritionState.waterLogged / nutritionState.waterTarget) * 100));

	setText("val-nutrition-kcal", nutritionState.caloriesLogged + " / " + nutritionState.caloriesTarget + " kcal");
	setText("val-nutrition-water", nutritionState.waterLogged.toFixed(1) + " / " + nutritionState.waterTarget + " L");

	var barKcal = document.getElementById("bar-nutrition-kcal");
	if (barKcal) barKcal.style.width = kcalPercent + "%";

	var barWater = document.getElementById("bar-nutrition-water");
	if (barWater) barWater.style.width = waterPercent + "%";

	var badge = document.getElementById("badge-nutrition");
	if (badge) {
		if (kcalPercent >= 85 && waterPercent >= 85) {
			badge.textContent = "OPTIMAL";
			badge.className = "text-[10px] font-mono font-bold text-emerald-400";
		} else if (kcalPercent >= 60 && waterPercent >= 60) {
			badge.textContent = "DÉFICIT LÉGER";
			badge.className = "text-[10px] font-mono font-bold text-amber-400";
		} else {
			badge.textContent = "ATTENTION HYDRATATION";
			badge.className = "text-[10px] font-mono font-bold text-red-400";
		}
	}

	setText("diag-nutrition", kcalPercent + "% de l'apport énergétique quotidien validé");
}

/* ==========================================================================
   10. MODULE ROUTINE QUOTIDIENNE DE SANTÉ (GAMIFICATION SOBRE)
   ========================================================================== */

var routineState = {
	streak: 14,
	tasks: {
		task1: true,
		task2: true,
		task3: false,
		task4: false
	}
};

function initRoutine() {
	try {
		var saved = localStorage.getItem("santellite_routine_state");
		if (saved) {
			var parsed = JSON.parse(saved);
			routineState.streak = parsed.streak || 14;
			routineState.tasks = parsed.tasks || routineState.tasks;
		}
	} catch (e) {
		console.warn("Storage warning:", e);
	}
	renderRoutine();
}

function toggleRoutineTask(taskId) {
	if (routineState.tasks[taskId] !== undefined) {
		routineState.tasks[taskId] = !routineState.tasks[taskId];
		try {
			localStorage.setItem("santellite_routine_state", JSON.stringify(routineState));
		} catch (e) {}
		renderRoutine();
	}
}

function renderRoutine() {
	var total = 0;
	var checkedCount = 0;

	for (var key in routineState.tasks) {
		var isDone = routineState.tasks[key];
		var checkbox = document.getElementById("chk-" + key);
		var label = document.getElementById("lbl-" + key);
		if (checkbox) checkbox.checked = isDone;
		if (label) {
			if (isDone) {
				label.classList.add("line-through", "text-slate-400");
			} else {
				label.classList.remove("line-through", "text-slate-400");
			}
		}
		if (isDone) {
			total += 25;
			checkedCount++;
		}
	}

	setText("routine-points", total + " / 100 PTS");
	setText("routine-streak", routineState.streak + " jours consécutifs");

	var bar = document.getElementById("routine-progress-bar");
	if (bar) bar.style.width = total + "%";

	// Renforcement positif sobre
	var cheer = document.getElementById("routine-cheer-message");
	if (cheer) {
		if (total === 100) {
			cheer.innerHTML = `<span class="text-emerald-400 font-bold">✨ Objectif du Sol atteint !</span> Toutes les contre-mesures médicales du jour sont validées avec succès.`;
		} else {
			cheer.innerHTML = `Progression quotidienne : <span class="text-cyan-400 font-mono font-bold">${checkedCount}/4 tâches complétées</span>. Constance et régularité protègent votre organisme.`;
		}
	}

	// Badges
	var badge7 = document.getElementById("badge-7-days");
	if (badge7) {
		if (routineState.streak >= 7) {
			badge7.className = "p-3 rounded-xl border bg-emerald-500/10 border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2";
		}
	}
	var badge30 = document.getElementById("badge-30-days");
	if (badge30) {
		if (routineState.streak >= 30) {
			badge30.className = "p-3 rounded-xl border bg-emerald-500/10 border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2";
		} else {
			badge30.className = "p-3 rounded-xl border bg-white/5 border-white/10 text-slate-400 text-xs flex items-center gap-2";
		}
	}
}

/* ==========================================================================
   11. MODULE CAPTURE CAMÉRA & LECTURE D'AFFICHAGE NUMÉRIQUE (OCR)
   ========================================================================== */

var cameraStream = null;

function initCameraScanner() {
	var modal = document.getElementById("camera-scanner-modal");
	var openBtn = document.getElementById("open-camera-scanner-btn");
	var closeBtn = document.getElementById("close-camera-scanner-btn");
	var captureBtn = document.getElementById("capture-photo-btn");
	var confirmBtn = document.getElementById("confirm-ocr-value-btn");

	if (openBtn && modal) {
		openBtn.addEventListener("click", function () {
			modal.classList.remove("hidden");
			startCameraFeed();
		});
	}

	if (closeBtn && modal) {
		closeBtn.addEventListener("click", function () {
			stopCameraFeed();
			modal.classList.add("hidden");
		});
	}

	if (captureBtn) {
		captureBtn.addEventListener("click", function () {
			captureAndProcessOCR();
		});
	}

	if (confirmBtn) {
		confirmBtn.addEventListener("click", function () {
			validateAndApplyManualMeasure();
		});
	}
}

function startCameraFeed() {
	var video = document.getElementById("camera-video-stream");
	var warning = document.getElementById("camera-status-text");

	if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
			.then(function (stream) {
				cameraStream = stream;
				if (video) {
					video.srcObject = stream;
					video.play();
				}
				if (warning) warning.textContent = "Alignez l'écran digital de l'appareil dans le réticule de visée.";
			})
			.catch(function (err) {
				console.warn("Camera access fallback:", err);
				if (warning) {
					warning.textContent = "Flux caméra indisponible ou refusé : mode d'émulation optique actif.";
				}
			});
	} else {
		if (warning) warning.textContent = "Mode d'émulation optique spatial actif (aucun périphérique vidéo).";
	}
}

function stopCameraFeed() {
	if (cameraStream) {
		cameraStream.getTracks().forEach(function (track) {
			track.stop();
		});
		cameraStream = null;
	}
}

/**
 * Capture une image et extrait la valeur numérique.
 * NOTE TECHNIQUE POUR DÉVELOPPEUR :
 * Pour connecter un service réel d'OCR (Reconnaissance Optique de Caractères) :
 * 1. Dessinez la trame vidéo sur un canvas offscreen : ctx.drawImage(video, 0, 0, w, h);
 * 2. Envoyez l'image à Tesseract.js (client) ou à une API de vision (ex. Gemini 1.5 Flash Vision / Google Cloud Vision)
 * 3. Exemple : const { data: { text } } = await Tesseract.recognize(canvas, 'eng');
 * 4. Pré-remplissez le champ input ci-dessous avec le résultat extrait.
 */
function captureAndProcessOCR() {
	var video = document.getElementById("camera-video-stream");
	var canvas = document.getElementById("camera-capture-canvas");
	if (video && canvas) {
		var ctx = canvas.getContext("2d");
		canvas.width = video.videoWidth || 320;
		canvas.height = video.videoHeight || 240;
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
	}

	// Simulation réaliste de reconnaissance OCR sur un appareil de secours
	var sampleOutputs = [
		{ device: "Tensiomètre de secours portable", val: "121/79", unit: "mmHg", targetId: "val-bp" },
		{ device: "Glucomètre capillaire déporté", val: "97", unit: "mg/dL", targetId: "val-glycemia" },
		{ device: "Thermomètre auriculaire infrarouge", val: "36.9", unit: "°C", targetId: "val-bodytemp" }
	];
	var selected = sampleOutputs[Math.floor(Math.random() * sampleOutputs.length)];

	var resultBox = document.getElementById("ocr-result-box");
	var inputVal = document.getElementById("ocr-recognized-input");
	var deviceLabel = document.getElementById("ocr-device-detected");

	if (resultBox && inputVal && deviceLabel) {
		deviceLabel.textContent = selected.device;
		inputVal.value = selected.val;
		inputVal.dataset.unit = selected.unit;
		inputVal.dataset.targetId = selected.targetId;
		resultBox.classList.remove("hidden");
	}
}

function validateAndApplyManualMeasure() {
	var inputVal = document.getElementById("ocr-recognized-input");
	var modal = document.getElementById("camera-scanner-modal");
	if (!inputVal) return;

	var finalVal = inputVal.value.trim();
	var unit = inputVal.dataset.unit || "";
	var targetId = inputVal.dataset.targetId || "val-bp";

	if (finalVal) {
		var targetEl = document.getElementById(targetId);
		if (targetEl) {
			targetEl.textContent = finalVal + (unit ? " " + unit : "");
			targetEl.classList.add("text-cyan-300");
			setTimeout(function () {
				targetEl.classList.remove("text-cyan-300");
			}, 3000);
		}

		// Notification de validation explicite
		alert("Mesure confirmée par l'astronaute (" + finalVal + " " + unit + ") et consignée dans le journal clinique.");
	}

	stopCameraFeed();
	if (modal) modal.classList.add("hidden");
}

/* ==========================================================================
   12. TRACÉ ECG EN DIRECT (CANVAS 250 HZ)
   ========================================================================== */

function initECGWave() {
	var canvas = document.getElementById("ecg-canvas");
	if (!canvas) return;
	var ctx = canvas.getContext("2d");
	if (!ctx) return;

	var points = [];

	function getECGHeight(t) {
		var phase = t % 1.0;
		if (phase < 0.1) return 0;
		if (phase < 0.18) return Math.sin((phase - 0.1) / 0.08 * Math.PI) * 0.15; // Onde P
		if (phase < 0.28) return 0;
		if (phase < 0.32) return -Math.sin((phase - 0.28) / 0.04 * Math.PI) * 0.2; // Onde Q
		if (phase < 0.38) return Math.sin((phase - 0.32) / 0.06 * Math.PI) * 0.95; // Pic R
		if (phase < 0.44) return -Math.sin((phase - 0.38) / 0.06 * Math.PI) * 0.3; // Onde S
		if (phase < 0.55) return 0;
		if (phase < 0.72) return Math.sin((phase - 0.55) / 0.17 * Math.PI) * 0.25; // Onde T
		return 0;
	}

	var time = 0;

	function draw() {
		time += 0.02 * currentECGParams.speed;
		var heightNorm = getECGHeight(time) * currentECGParams.amplitude;
		var centerY = canvas.height / 2;
		var y = centerY - heightNorm * (canvas.height * 0.42);

		points.push(y);
		if (points.length > canvas.width) {
			points.shift();
		}

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Lignes de quadrillage ECG fines
		ctx.strokeStyle = "rgba(0, 229, 255, 0.07)";
		ctx.lineWidth = 1;
		for (var gy = 0; gy < canvas.height; gy += 18) {
			ctx.beginPath();
			ctx.moveTo(0, gy);
			ctx.lineTo(canvas.width, gy);
			ctx.stroke();
		}
		for (var gx = 0; gx < canvas.width; gx += 18) {
			ctx.beginPath();
			ctx.moveTo(gx, 0);
			ctx.lineTo(gx, canvas.height);
			ctx.stroke();
		}

		// Tracé ECG Vert Médical Fluorescent
		ctx.strokeStyle = "#10B981";
		ctx.lineWidth = 2;
		ctx.shadowBlur = 8;
		ctx.shadowColor = "#10B981";

		ctx.beginPath();
		for (var i = 0; i < points.length; i++) {
			if (i === 0) {
				ctx.moveTo(i, points[i]);
			} else {
				ctx.lineTo(i, points[i]);
			}
		}
		ctx.stroke();
		ctx.shadowBlur = 0;

		requestAnimationFrame(draw);
	}

	draw();
}

/* ==========================================================================
   ANIMATIONS AU SCROLL BIDIRECTIONNELLES (DASHBOARD)
   ========================================================================== */
function initScrollReveal() {
	var elements = document.querySelectorAll(".reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale");
	if (!elements || elements.length === 0) return;

	if ("IntersectionObserver" in window) {
		var observer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
					} else {
						// Disparition dynamique pour re-déclencher l'animation au scroll bidirectionnel
						entry.target.classList.remove("is-visible");
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: "0px 0px -40px 0px"
			}
		);

		elements.forEach(function (el) {
			observer.observe(el);
		});
	} else {
		elements.forEach(function (el) {
			el.classList.add("is-visible");
		});
	}
}

// Exports globaux pour les attributs inline onclick
window.initScrollReveal = initScrollReveal;
window.applySimScenario = applySimScenario;
window.applyEnvironment = applyEnvironment;
window.selectBodyZone = selectBodyZone;
window.triggerShockTest = triggerShockTest;
window.logRation = logRation;
window.resetNutrition = resetNutrition;
window.toggleRoutineTask = toggleRoutineTask;
