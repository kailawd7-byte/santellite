/**
 * Santellite : VitaOrbit — Logique Client Unifiée
 * NASA Space Apps Challenge 2026 (Libreville, Gabon)
 */

document.addEventListener("DOMContentLoaded", function () {
	// 1. Initialisation immédiate des Icônes Lucide
	if (window.lucide && typeof window.lucide.createIcons === "function") {
		window.lucide.createIcons();
	}

	// 2. Gestion du Menu Mobile
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

	// 3. Initialisation du Tracé ECG Temps Réel
	initECGWave();

	// 4. Initialisation du Scénario Nominal par Défaut
	applySimScenario("nominal");

	// 5. Initialisation des Animations Fluides au Scroll (Apparition / Disparition)
	initScrollReveal();

	// 6. Gestion du Header Fixe au Défilement
	initHeaderScroll();
});

/* ==========================================================================
   GESTION DES PRODUITS CONNECTÉS (6 ÉQUIPEMENTS SPATIAUX)
   ========================================================================== */

function switchProductTab(prod) {
	var allPanes = {
		astroskin: document.getElementById("product-pane-astroskin"),
		embrace: document.getElementById("product-pane-embrace"),
		echolight: document.getElementById("product-pane-echolight"),
		dosimeter: document.getElementById("product-pane-dosimeter"),
		saliva: document.getElementById("product-pane-saliva"),
		actigraphy: document.getElementById("product-pane-actigraphy")
	};

	var allBtns = {
		astroskin: document.getElementById("tab-btn-astroskin"),
		embrace: document.getElementById("tab-btn-embrace"),
		echolight: document.getElementById("tab-btn-echolight"),
		dosimeter: document.getElementById("tab-btn-dosimeter"),
		saliva: document.getElementById("tab-btn-saliva"),
		actigraphy: document.getElementById("tab-btn-actigraphy")
	};

	// Masquer tous les panneaux et réinitialiser les boutons
	for (var key in allPanes) {
		if (allPanes[key]) {
			allPanes[key].classList.add("hidden");
			allPanes[key].classList.remove("grid");
		}
		if (allBtns[key]) {
			allBtns[key].className = "px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center gap-2 border bg-white/5 text-slate-300 border-white/10 hover:border-white/30 hover:bg-white/10";
		}
	}

	// Afficher le panneau sélectionné et activer le bouton
	if (allPanes[prod]) {
		allPanes[prod].classList.remove("hidden");
		allPanes[prod].classList.add("grid");
	}
	if (allBtns[prod]) {
		allBtns[prod].className = "px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center gap-2 border bg-white text-slate-950 border-white shadow-xl scale-105";
	}

	if (window.lucide && typeof window.lucide.createIcons === "function") {
		window.lucide.createIcons();
	}
}

function switchEmbracePlusImage(mode) {
	var img = document.getElementById("embrace-main-img");
	var badge = document.getElementById("embrace-badge");
	var btnFront = document.getElementById("embrace-btn-front");
	var btnSensors = document.getElementById("embrace-btn-sensors");

	if (!img || !badge || !btnFront || !btnSensors) return;

	if (mode === "front") {
		img.src = "./images/embraceplus-watch-front.jpg";
		badge.textContent = "● EmbracePlus — Vue de Face";
		btnFront.className = "px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all border bg-blue-600 text-white border-blue-500 shadow-md";
		btnSensors.className = "px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all border bg-white/5 text-slate-300 border-white/10 hover:bg-white/10";
	} else {
		img.src = "./images/embraceplus-sensors-diagram.jpg";
		badge.textContent = "● Architecture Dorsale des Capteurs";
		btnSensors.className = "px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all border bg-blue-600 text-white border-blue-500 shadow-md";
		btnFront.className = "px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all border bg-white/5 text-slate-300 border-white/10 hover:bg-white/10";
	}
}

function switchAstroskinImage(mode) {
	var img = document.getElementById("astroskin-main-img");
	var badge = document.getElementById("astroskin-badge");
	var btnIss = document.getElementById("astro-btn-iss");
	var btnDiag = document.getElementById("astro-btn-diagram");

	if (!img || !badge || !btnIss || !btnDiag) return;

	if (mode === "iss") {
		img.src = "./images/astroskin-astronaut-iss.jpg";
		badge.textContent = "● Test Réel à bord de l'ISS";
		btnIss.className = "px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all border bg-blue-600 text-white border-blue-500 shadow-md";
		btnDiag.className = "px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all border bg-white/5 text-slate-300 border-white/10 hover:bg-white/10";
	} else {
		img.src = "./images/astroskin-sensors-diagram.jpg";
		badge.textContent = "● Schéma des Capteurs Intégrés";
		btnDiag.className = "px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all border bg-blue-600 text-white border-blue-500 shadow-md";
		btnIss.className = "px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all border bg-white/5 text-slate-300 border-white/10 hover:bg-white/10";
	}
}

function switchActigraphyImage(mode) {
	var img = document.getElementById("actigraphy-main-img");
	var badge = document.getElementById("actigraphy-badge");
	var btnSol = document.getElementById("actigraphy-btn-sol");
	var btnVol = document.getElementById("actigraphy-btn-vol");

	if (!img || !badge || !btnSol || !btnVol) return;

	if (mode === "sol") {
		img.src = "./images/actiwatch-spectrum-pro.jpg";
		badge.innerHTML = '<i data-lucide="flask-conical" class="w-3.5 h-3.5 text-purple-400"></i><span>● Référence Sol • Actiwatch Spectrum Plus (NASA Ames)</span>';
		btnSol.className = "px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all border bg-indigo-600 text-white border-indigo-500 shadow-md";
		btnVol.className = "px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all border bg-white/5 text-slate-300 border-white/10 hover:bg-white/10";
	} else {
		img.src = "./images/somnowatch-artemis-actigraphy.jpg";
		badge.innerHTML = '<i data-lucide="rocket" class="w-3.5 h-3.5 text-cyan-400"></i><span>● En Vol Orion • ActLumus / Artemis II</span>';
		btnVol.className = "px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all border bg-indigo-600 text-white border-indigo-500 shadow-md";
		btnSol.className = "px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all border bg-white/5 text-slate-300 border-white/10 hover:bg-white/10";
	}
	if (window.lucide && typeof window.lucide.createIcons === "function") {
		window.lucide.createIcons();
	}
}

/* ==========================================================================
   SIMULATEUR TÉLÉMÉTRIQUE NASA IA — 6 CAPTEURS SPATIAUX (6 SCÉNARIOS)
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

		// 1. Pression artérielle
		bp: "118/76",
		bpBadge: "NORMAL",
		bpBadgeClass: "text-emerald-400",
		bpDiag: "Normotension PTT continue",

		// 2. Rythme cardiaque
		bpm: 68,
		bpmBadge: "NORMAL",
		bpmBadgeClass: "text-emerald-400",
		bpmDiag: "Rythme sinusal régulier (65-72)",

		// 3. Glycémie
		glycemia: "94 mg/dL",
		glycemiaBadge: "NORMAL",
		glycemiaBadgeClass: "text-emerald-400",
		glycemiaDiag: "Normoglycémie basale stable",

		// 4. Température corporelle
		bodyTemp: "36.8 °C",
		bodyTempBadge: "NORMAL",
		bodyTempBadgeClass: "text-emerald-400",
		bodyTempDiag: "Thermorégulation optimale",

		// 5. Durée du sommeil
		sleepDuration: "7h 35m",
		sleepBadge: "OPTIMAL",
		sleepBadgeClass: "text-emerald-400",
		sleepDiag: "Efficacité 89% • 4 cycles REM",

		// 6. Humeur
		mood: "Serein (8.8/10)",
		moodBadge: "STABLE",
		moodBadgeClass: "text-emerald-400",
		moodDiag: "Stabilité thymique & concentration",

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

		// 1. Pression artérielle
		bp: "138/92",
		bpBadge: "ÉLEVÉ",
		bpBadgeClass: "text-amber-400",
		bpDiag: "Élévation tensionnelle réflexe",

		// 2. Rythme cardiaque
		bpm: 116,
		bpmBadge: "TACHYCARDIE",
		bpmBadgeClass: "text-amber-400 font-extrabold animate-pulse",
		bpmDiag: "Tachycardie d'effort compensatoire",

		// 3. Glycémie
		glycemia: "118 mg/dL",
		glycemiaBadge: "EFFORT",
		glycemiaBadgeClass: "text-amber-400",
		glycemiaDiag: "Mobilisation glucidique d'effort",

		// 4. Température corporelle
		bodyTemp: "37.4 °C",
		bodyTempBadge: "ÉLÉVATION",
		bodyTempBadgeClass: "text-amber-400",
		bodyTempDiag: "Échauffement thermique sous scaphandre",

		// 5. Durée du sommeil
		sleepDuration: "6h 10m",
		sleepBadge: "ÉCOURTÉ",
		sleepBadgeClass: "text-amber-400",
		sleepDiag: "Sommeil écourté pré-mission EVA",

		// 6. Humeur
		mood: "Stress Aigu (4.2/10)",
		moodBadge: "ANXIÉTÉ",
		moodBadgeClass: "text-red-400 font-extrabold",
		moodDiag: "Anxiété hypoxique & charge mentale",

		// Métriques spatiales
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

		// 1. Pression artérielle
		bp: "120/78",
		bpBadge: "NORMAL",
		bpBadgeClass: "text-emerald-400",
		bpDiag: "Pression artérielle stable",

		// 2. Rythme cardiaque
		bpm: 70,
		bpmBadge: "NORMAL",
		bpmBadgeClass: "text-emerald-400",
		bpmDiag: "Rythme cardiaque régulier",

		// 3. Glycémie
		glycemia: "96 mg/dL",
		glycemiaBadge: "NORMAL",
		glycemiaBadgeClass: "text-emerald-400",
		glycemiaDiag: "Métabolisme glucidique normal",

		// 4. Température corporelle
		bodyTemp: "36.7 °C",
		bodyTempBadge: "NORMAL",
		bodyTempBadgeClass: "text-emerald-400",
		bodyTempDiag: "Homéothermie stable",

		// 5. Durée du sommeil
		sleepDuration: "7h 15m",
		sleepBadge: "SATISFAISANT",
		sleepBadgeClass: "text-emerald-400",
		sleepDiag: "Récupération nocturne satisfaisante",

		// 6. Humeur
		mood: "Stable (7.9/10)",
		moodBadge: "STABLE",
		moodBadgeClass: "text-emerald-400",
		moodDiag: "Vigilance et moral satisfaisants",

		// Métriques spatiales
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

		// 1. Pression artérielle
		bp: "128/82",
		bpBadge: "ALARME",
		bpBadgeClass: "text-amber-400",
		bpDiag: "Tension modérément élevée (stress)",

		// 2. Rythme cardiaque
		bpm: 88,
		bpmBadge: "VIGILANCE",
		bpmBadgeClass: "text-amber-400",
		bpmDiag: "Légère tachycardie d'alarme",

		// 3. Glycémie
		glycemia: "112 mg/dL",
		glycemiaBadge: "STRESS",
		glycemiaBadgeClass: "text-amber-400",
		glycemiaDiag: "Glycogénolyse de stress opérationnel",

		// 4. Température corporelle
		bodyTemp: "37.0 °C",
		bodyTempBadge: "NORMAL",
		bodyTempBadgeClass: "text-emerald-400",
		bodyTempDiag: "Normothermie préservée",

		// 5. Durée du sommeil
		sleepDuration: "5h 40m",
		sleepBadge: "INTERROMPU",
		sleepBadgeClass: "text-amber-400",
		sleepDiag: "Sommeil interrompu par l'alarme SPE",

		// 6. Humeur
		mood: "Tension (4.8/10)",
		moodBadge: "ALERTE",
		moodBadgeClass: "text-orange-400",
		moodDiag: "Stress de confinement d'urgence",

		// Métriques spatiales
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

		// 1. Pression artérielle
		bp: "132/86",
		bpBadge: "MODÉRÉ",
		bpBadgeClass: "text-amber-400",
		bpDiag: "Hypertension chronique modérée",

		// 2. Rythme cardiaque
		bpm: 78,
		bpmBadge: "INSTABLE",
		bpmBadgeClass: "text-amber-400",
		bpmDiag: "Instabilité du rythme au repos",

		// 3. Glycémie
		glycemia: "126 mg/dL",
		glycemiaBadge: "ÉLEVÉ",
		glycemiaBadgeClass: "text-amber-400",
		glycemiaDiag: "Hyperglycémie sous excès de cortisol",

		// 4. Température corporelle
		bodyTemp: "37.2 °C",
		bodyTempBadge: "DÉRÉGULÉ",
		bodyTempBadgeClass: "text-amber-400",
		bodyTempDiag: "Dérégulation du cycle thermique",

		// 5. Durée du sommeil
		sleepDuration: "4h 50m",
		sleepBadge: "FRAGMENTÉ",
		sleepBadgeClass: "text-red-400 font-extrabold animate-pulse",
		sleepDiag: "Insomnie orbitale • Sommeil fragmenté",

		// 6. Humeur
		mood: "Épuisement (3.1/10)",
		moodBadge: "BURNOUT",
		moodBadgeClass: "text-purple-400 font-extrabold animate-pulse",
		moodDiag: "Asthénie cognitive & irritabilité",

		// Métriques spatiales
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

		speed: 1.1,
		amplitude: 1.05
	},

	actigraphy: {
		name: "Équipage Artemis II • Mission Circumlunaire",
		missionStatus: "• SOL 08 • MISSION ARTEMIS II • ESPACE PROFOND",
		badgeDevice: "6. Montre d'Actigraphie SOMNOwatch plus (Artemis II)",
		statusText: "Alerte : Dérèglement Circadien",
		statusColor: "text-indigo-400 bg-indigo-500/15 border-indigo-500/40",
		dotColor: "bg-indigo-400",
		aiConfidence: "98.7%",
		aiDiagnosis: "Bio-IA : Désynchronisation circadienne détectée. L'actimètre enregistre une baisse d'exposition lumineuse diurne et une fragmentation du sommeil paradoxal.",

		recTitle: "Protocole de Resynchronisation Circadienne (Artemis)",
		recDesc: "Activation de la luminothérapie bleue/blanche enrichie (10 000 Lux) dans le cockpit d'Orion pendant 45 minutes pour stimuler la mélanopsine rétinienne. Verrouillage du module de sommeil avec occultation totale.",
		recDevice: "Montre d'Actigraphie SOMNOwatch plus (NASA Artemis HRP)",
		recBoxClass: "bg-indigo-500/10 border-indigo-500/40",

		// 1. Pression artérielle
		bp: "122/80",
		bpBadge: "NORMAL",
		bpBadgeClass: "text-emerald-400",
		bpDiag: "Normotension de repos stable",

		// 2. Rythme cardiaque
		bpm: 64,
		bpmBadge: "REPOS",
		bpmBadgeClass: "text-emerald-400",
		bpmDiag: "Rythme de repos circadien",

		// 3. Glycémie
		glycemia: "98 mg/dL",
		glycemiaBadge: "NORMAL",
		glycemiaBadgeClass: "text-emerald-400",
		glycemiaDiag: "Normoglycémie basale",

		// 4. Température corporelle
		bodyTemp: "36.4 °C",
		bodyTempBadge: "CREUX NOCTURNE",
		bodyTempBadgeClass: "text-cyan-400",
		bodyTempDiag: "Creux thermique circadien nocturne",

		// 5. Durée du sommeil
		sleepDuration: "5h 15m",
		sleepBadge: "ÉCOURTÉ",
		sleepBadgeClass: "text-amber-400",
		sleepDiag: "Sommeil fragmenté • 5 micro-réveils",

		// 6. Humeur
		mood: "Fatigue Circadienne (5.6/10)",
		moodBadge: "VIGILANCE BASSE",
		moodBadgeClass: "text-amber-400",
		moodDiag: "Baisse de vigilance en transit lointain",

		// Métriques spatiales
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

		speed: 0.95,
		amplitude: 0.95
	}
};

var currentECGParams = { speed: 1.0, amplitude: 1.0 };
var isShockTesting = false;

function applySimScenario(key) {
	if (isShockTesting) return;

	var data = simData[key];
	if (!data) return;

	// Mise à jour visuelle des 6 boutons de scénarios
	var scenarioKeys = ["nominal", "hypoxia", "boneLoss", "solarStorm", "salivaStress", "actigraphy"];
	scenarioKeys.forEach(function (k) {
		var btn = document.getElementById("sim-btn-" + k);
		if (btn) {
			if (k === key) {
				btn.className = "sim-pill px-3.5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all border bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/25 scale-105";
			} else {
				btn.className = "sim-pill px-3.5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all border bg-slate-900/80 text-slate-300 border-white/10 hover:border-cyan-500/40";
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
	// LES 6 INDICATEURS FONDAMENTAUX DE SANTÉ (NASA CORE HEALTH)
	// ==============================================================

	// 1. Pression artérielle
	var elBp = document.getElementById("val-bp");
	if (elBp) elBp.textContent = data.bp;
	var badgeBp = document.getElementById("badge-bp");
	if (badgeBp) {
		badgeBp.textContent = data.bpBadge;
		badgeBp.className = "text-[10px] font-mono font-bold " + data.bpBadgeClass;
	}
	var diagBp = document.getElementById("diag-bp");
	if (diagBp) diagBp.textContent = data.bpDiag;

	// 2. Rythme cardiaque
	var elBpm = document.getElementById("val-bpm");
	if (elBpm) elBpm.textContent = data.bpm;
	var badgeBpm = document.getElementById("badge-bpm");
	if (badgeBpm) {
		badgeBpm.textContent = data.bpmBadge;
		badgeBpm.className = "text-[10px] font-mono font-bold " + data.bpmBadgeClass;
	}
	var diagBpm = document.getElementById("diag-bpm");
	if (diagBpm) diagBpm.textContent = data.bpmDiag;

	// 3. Glycémie
	var elGlycemia = document.getElementById("val-glycemia");
	if (elGlycemia) elGlycemia.textContent = data.glycemia;
	var badgeGlycemia = document.getElementById("badge-glycemia");
	if (badgeGlycemia) {
		badgeGlycemia.textContent = data.glycemiaBadge;
		badgeGlycemia.className = "text-[10px] font-mono font-bold " + data.glycemiaBadgeClass;
	}
	var diagGlycemia = document.getElementById("diag-glycemia");
	if (diagGlycemia) diagGlycemia.textContent = data.glycemiaDiag;

	// 4. Température corporelle
	var elBodyTemp = document.getElementById("val-bodytemp");
	if (elBodyTemp) elBodyTemp.textContent = data.bodyTemp;
	var badgeBodyTemp = document.getElementById("badge-bodytemp");
	if (badgeBodyTemp) {
		badgeBodyTemp.textContent = data.bodyTempBadge;
		badgeBodyTemp.className = "text-[10px] font-mono font-bold " + data.bodyTempBadgeClass;
	}
	var diagBodyTemp = document.getElementById("diag-bodytemp");
	if (diagBodyTemp) diagBodyTemp.textContent = data.bodyTempDiag;

	// 5. Durée du sommeil
	var elSleep = document.getElementById("val-sleep");
	if (elSleep) elSleep.textContent = data.sleepDuration;
	var badgeSleep = document.getElementById("badge-sleep");
	if (badgeSleep) {
		badgeSleep.textContent = data.sleepBadge;
		badgeSleep.className = "text-[10px] font-mono font-bold " + data.sleepBadgeClass;
	}
	var diagSleep = document.getElementById("diag-sleep");
	if (diagSleep) diagSleep.textContent = data.sleepDiag;

	// 6. Humeur
	var elMood = document.getElementById("val-mood");
	if (elMood) elMood.textContent = data.mood;
	var badgeMood = document.getElementById("badge-mood");
	if (badgeMood) {
		badgeMood.textContent = data.moodBadge;
		badgeMood.className = "text-[10px] font-mono font-bold " + data.moodBadgeClass;
	}
	var diagMood = document.getElementById("diag-mood");
	if (diagMood) diagMood.textContent = data.moodDiag;

	// ==============================================================
	// MÉTRIQUES SPÉCIFIQUES D'ESPACE PROFOND
	// ==============================================================

	// Densité osseuse REMS
	var elTscore = document.getElementById("val-tscore");
	if (elTscore) elTscore.textContent = data.tScore;
	var elBoneLoss = document.getElementById("val-boneloss");
	if (elBoneLoss) elBoneLoss.textContent = data.boneLoss;
	var badgeBone = document.getElementById("badge-bone");
	if (badgeBone) {
		badgeBone.textContent = data.boneBadge;
		badgeBone.className = "text-[10px] font-mono font-bold " + data.boneBadgeClass;
	}
	var diagBone = document.getElementById("diag-bone");
	if (diagBone) diagBone.textContent = data.boneDiag;

	// Radiations
	var elDoseRate = document.getElementById("val-doserate");
	if (elDoseRate) elDoseRate.textContent = data.doseRate;
	var elDoseTotal = document.getElementById("val-dosetotal");
	if (elDoseTotal) elDoseTotal.textContent = data.doseTotal;
	var badgeRad = document.getElementById("badge-rad");
	if (badgeRad) {
		badgeRad.textContent = data.radBadge;
		badgeRad.className = "text-[10px] font-mono font-bold " + data.radBadgeClass;
	}
	var diagRad = document.getElementById("diag-rad");
	if (diagRad) diagRad.textContent = data.radDiag;

	// Cortisol salivaire
	var elCortisol = document.getElementById("val-cortisol");
	if (elCortisol) elCortisol.textContent = data.cortisol;
	var elEda = document.getElementById("val-eda");
	if (elEda) elEda.textContent = data.edaStress;
	var badgeStress = document.getElementById("badge-stress");
	if (badgeStress) {
		badgeStress.textContent = data.stressBadge;
		badgeStress.className = "text-[10px] font-mono font-bold " + data.stressBadgeClass;
	}
	var diagCortisol = document.getElementById("diag-cortisol");
	if (diagCortisol) diagCortisol.textContent = data.cortisolDiag;

	// BPM Live
	var liveBpm = document.getElementById("sim-live-bpm");
	if (liveBpm) liveBpm.textContent = data.bpm + " BPM";

	// Paramètres ECG
	currentECGParams.speed = data.speed;
	currentECGParams.amplitude = data.amplitude;

	if (window.lucide && typeof window.lucide.createIcons === "function") {
		window.lucide.createIcons();
	}
}

/**
 * Test de Réanimation d'Urgence (Choc 150J sur Astroskin)
 */
function triggerShockTest() {
	if (isShockTesting) return;
	isShockTesting = true;

	var shockBtn = document.getElementById("sim-shock-btn");
	if (shockBtn) {
		shockBtn.textContent = "⚡ CHOC DÉLIVRÉ (150 JOULES)...";
		shockBtn.className = "px-4 py-2 rounded-xl text-xs font-mono font-bold border bg-red-600 text-white border-red-400 shadow-xl shadow-red-500/40 animate-pulse";
	}

	// Étape 1 : Perte de connaissance / Collapsus
	var elSubject = document.getElementById("sim-subject-name");
	if (elSubject) elSubject.textContent = "Astronaute EVA • Collapse Aigu Détecté";

	var badge = document.getElementById("sim-status-badge");
	var dot = document.getElementById("sim-status-dot");
	var text = document.getElementById("sim-status-text");
	if (badge) badge.className = "px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border flex items-center gap-2 text-red-300 bg-red-600/30 border-red-500/60 animate-pulse";
	if (dot) dot.className = "w-2 h-2 rounded-full bg-red-500 animate-ping";
	if (text) text.textContent = "URGENCE VITALE : SYNCOPE (150J)";

	var elConf = document.getElementById("sim-ai-confidence");
	if (elConf) elConf.textContent = "99.9%";

	var elDiag = document.getElementById("sim-diag-desc");
	if (elDiag) elDiag.textContent = "Bio-IA : Arrêt baroréflexe aigu, collapsus de la tension artérielle PTT et immobilité totale détectés.";

	var recBox = document.getElementById("sim-rec-box");
	if (recBox) recBox.className = "p-4 rounded-xl border text-xs space-y-1.5 bg-red-950/50 border-red-500/60";

	var recTitle = document.getElementById("sim-rec-title");
	if (recTitle) recTitle.textContent = "⚡ Protocole de Réanimation d'Urgence 150J";

	var recDesc = document.getElementById("sim-rec-desc");
	if (recDesc) recDesc.textContent = "Décharge électrique automatisée délivrée avec succès par les électrodes médicales. Compression pneumatique des membres inférieurs pour retour veineux cérébral.";

	var recDevice = document.getElementById("sim-rec-device");
	if (recDevice) recDevice.textContent = "Maillot Astroskin & Système Automatisé de Choc";

	// Métriques de collapsus pour les 6 indicateurs
	var elBp = document.getElementById("val-bp");
	if (elBp) elBp.textContent = "68/42";
	var badgeBp = document.getElementById("badge-bp");
	if (badgeBp) {
		badgeBp.textContent = "COLLAPSUS";
		badgeBp.className = "text-[10px] font-mono font-bold text-red-400 font-extrabold animate-pulse";
	}
	var diagBp = document.getElementById("diag-bp");
	if (diagBp) diagBp.textContent = "Chute critique (choc hypovolémique)";

	var elBpm = document.getElementById("val-bpm");
	if (elBpm) elBpm.textContent = "42";
	var badgeBpm = document.getElementById("badge-bpm");
	if (badgeBpm) {
		badgeBpm.textContent = "BRADYCARDIE";
		badgeBpm.className = "text-[10px] font-mono font-bold text-red-400 font-extrabold animate-pulse";
	}

	var elBodyTemp = document.getElementById("val-bodytemp");
	if (elBodyTemp) elBodyTemp.textContent = "35.9 °C";
	var badgeBodyTemp = document.getElementById("badge-bodytemp");
	if (badgeBodyTemp) {
		badgeBodyTemp.textContent = "HYPOTHERMIE";
		badgeBodyTemp.className = "text-[10px] font-mono font-bold text-red-400";
	}

	var elMood = document.getElementById("val-mood");
	if (elMood) elMood.textContent = "Coma (0.0/10)";
	var badgeMood = document.getElementById("badge-mood");
	if (badgeMood) {
		badgeMood.textContent = "INCONSCIENT";
		badgeMood.className = "text-[10px] font-mono font-bold text-red-400 font-extrabold animate-pulse";
	}

	var liveBpm = document.getElementById("sim-live-bpm");
	if (liveBpm) liveBpm.textContent = "42 BPM";

	currentECGParams.speed = 0.45;
	currentECGParams.amplitude = 0.5;

	// Étape 2 : Réanimation et retour du rythme sinusal après 3.5 secondes
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
   CANVAS D'ONDE ECG TEMPS RÉEL (250 Hz)
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

// Export global pour interaction HTML onclick
window.switchProductTab = switchProductTab;
window.switchAstroskinImage = switchAstroskinImage;
window.switchEmbracePlusImage = switchEmbracePlusImage;
window.switchActigraphyImage = switchActigraphyImage;
window.applySimScenario = applySimScenario;
window.triggerShockTest = triggerShockTest;


/* ==========================================================================
   SYSTÈME D'ANIMATION AU SCROLL DYNAMIQUE (INTERSECTION OBSERVER)
   Apparition et disparition fluide des panels au défilement haut / bas
   ========================================================================== */

function initScrollReveal() {
	var elements = document.querySelectorAll(".reveal-on-scroll, .reveal-left, .reveal-right");
	if (!elements || elements.length === 0) return;

	if ("IntersectionObserver" in window) {
		var observer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
					} else {
						// Disparition dynamique lorsque le panel quitte le champ de vision
						entry.target.classList.remove("is-visible");
					}
				});
			},
			{
				threshold: 0.12,
				rootMargin: "0px 0px -50px 0px"
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

function initHeaderScroll() {
	var header = document.getElementById("site-header");
	if (!header) return;

	function checkScroll() {
		if (window.scrollY > 40) {
			header.classList.add("header-scrolled");
			header.classList.remove("header-top");
		} else {
			header.classList.remove("header-scrolled");
			header.classList.add("header-top");
		}
	}

	window.addEventListener("scroll", checkScroll, { passive: true });
	checkScroll();
}

// Export global
window.initScrollReveal = initScrollReveal;
window.initHeaderScroll = initHeaderScroll;
