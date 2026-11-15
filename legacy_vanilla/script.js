/**
 * SANTELLITE : VITAORBIT — NASA SPACE APPS CHALLENGE 2026
 * Script applicatif principal : navigation, simulateur clinique, animations.
 */

document.addEventListener("DOMContentLoaded", () => {
	// 1. Initialisation des icônes vectorielles Lucide
	if (window.lucide && typeof window.lucide.createIcons === "function") {
		window.lucide.createIcons();
	}

	// 2. Gestion du Menu Mobile Burger (Accessibilité & Événements)
	initMobileMenu();

	// 3. Navigation fluide & Lien actif au défilement (Scrollspy)
	initScrollspy();

	// 4. Bouton Retour en Haut
	initBackToTop();

	// 5. Apparition progressive au défilement (Scroll Reveal)
	initScrollReveal();

	// 6. Simulateur Clinique Interactif (Scénarios de vol)
	initTelemetrySimulator();

	// 7. Hotspots interactifs de la silhouette anatomique (Hero)
	initSilhouetteHotspots();
});

/* ==========================================================================
   1. MENU BURGER MOBILE
   ========================================================================== */
function initMobileMenu() {
	const navToggle = document.querySelector(".nav-toggle");
	const navLinks = document.querySelector(".nav-links");

	if (!navToggle || !navLinks) return;

	function toggleMenu(open) {
		const isOpen = open !== undefined ? open : navLinks.classList.contains("is-open");
		const targetState = !isOpen;

		navLinks.classList.toggle("is-open", targetState);
		navToggle.setAttribute("aria-expanded", String(targetState));

		if (targetState) {
			document.body.style.overflow = "hidden"; // Empêche le défilement de fond sur mobile
		} else {
			document.body.style.overflow = "";
		}
	}

	navToggle.addEventListener("click", (e) => {
		e.stopPropagation();
		toggleMenu();
	});

	// Ferme le menu lors d'un clic sur un lien
	navLinks.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", () => {
			if (navLinks.classList.contains("is-open")) {
				toggleMenu(false);
			}
		});
	});

	// Ferme si on clique en dehors
	document.addEventListener("click", (e) => {
		if (
			navLinks.classList.contains("is-open") &&
			!navLinks.contains(e.target) &&
			!navToggle.contains(e.target)
		) {
			toggleMenu(false);
		}
	});

	// Ferme si touche Échap
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && navLinks.classList.contains("is-open")) {
			toggleMenu(false);
			navToggle.focus();
		}
	});
}

/* ==========================================================================
   2. SCROLLSPY (Lien actif dans la barre de navigation)
   ========================================================================== */
function initScrollspy() {
	const menuLinks = document.querySelectorAll("#menu-principal a");
	if (!menuLinks.length) return;

	const sectionIds = Array.from(menuLinks)
		.map((link) => {
			const href = link.getAttribute("href");
			return href && href.startsWith("#") ? href.substring(1) : null;
		})
		.filter(Boolean);

	const sections = sectionIds
		.map((id) => document.getElementById(id))
		.filter(Boolean);

	function setActiveLink(activeId) {
		menuLinks.forEach((link) => {
			const href = link.getAttribute("href");
			if (href === `#${activeId}`) {
				link.setAttribute("aria-current", "true");
			} else {
				link.removeAttribute("aria-current");
			}
		});
	}

	if ("IntersectionObserver" in window && sections.length > 0) {
		const observerOptions = {
			rootMargin: "-25% 0px -65% 0px",
			threshold: 0,
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setActiveLink(entry.target.id);
				}
			});
		}, observerOptions);

		sections.forEach((sec) => observer.observe(sec));

		// Désactive si on remonte tout en haut dans le Hero
		const hero = document.getElementById("accueil");
		if (hero) {
			new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							setActiveLink("accueil");
						}
					});
				},
				{ rootMargin: "-20% 0px -70% 0px" }
			).observe(hero);
		}
	}
}

/* ==========================================================================
   3. BOUTON RETOUR EN HAUT
   ========================================================================== */
function initBackToTop() {
	const backToTopBtn = document.querySelector(".back-to-top");
	if (!backToTopBtn) return;

	let isTicking = false;
	const threshold = 400; // pixels de défilement

	function checkScroll() {
		if (window.scrollY > threshold) {
			backToTopBtn.classList.add("is-visible");
		} else {
			backToTopBtn.classList.remove("is-visible");
		}
		isTicking = false;
	}

	window.addEventListener(
		"scroll",
		() => {
			if (!isTicking) {
				window.requestAnimationFrame(checkScroll);
				isTicking = true;
			}
		},
		{ passive: true }
	);

	backToTopBtn.addEventListener("click", (e) => {
		e.preventDefault();
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});

	checkScroll();
}

/* ==========================================================================
   4. APPARITION PROGRESSIVE AU DÉFILEMENT (REVEAL)
   ========================================================================== */
function initScrollReveal() {
	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (prefersReducedMotion) return;

	const elements = document.querySelectorAll(
		".section-header, .card, .stat-card, .step-card, .impact-box, .simulator-wrapper, .demo-actions-card, .team-quote-card, .pipeline-card, .matrix-card"
	);

	if (!elements.length) return;

	document.documentElement.classList.add("js");

	elements.forEach((el, index) => {
		el.classList.add("reveal");
	});

	if ("IntersectionObserver" in window) {
		const revealObserver = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						observer.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: "0px 0px -40px 0px",
			}
		);

		elements.forEach((el) => revealObserver.observe(el));
	} else {
		// Fallback si IntersectionObserver n'est pas supporté
		elements.forEach((el) => el.classList.add("is-visible"));
	}
}

/* ==========================================================================
   5. SIMULATEUR CLINIQUEMENT INTERACTIF (DÉMO)
   ========================================================================== */
function initTelemetrySimulator() {
	const scenarioButtons = document.querySelectorAll(".scenario-btn");
	if (!scenarioButtons.length) return;

	// Données des 4 scénarios spatiaux avec intégration des appareils connectés
	const scenarios = {
		nominal: {
			name: "Cmdr. Thomas P. — Artemis III (Sol 142)",
			statusText: "État Physiologique : Nominal",
			statusClass: "pill-good",
			statusColor: "var(--status-good)",
			statusBg: "var(--status-good-bg)",
			badgeBorder: "rgba(16, 185, 129, 0.25)",
			dotClass: "dot-green",
			heart: "68",
			heartDiag: "Rythme sinusal régulier",
			heartWidth: "55%",
			heartColor: "fill-green",
			bp: "118/76",
			bpDiag: "Normotension parfaite",
			bpWidth: "60%",
			bpColor: "fill-green",
			sleep: "7h 45m",
			sleepDiag: "Indice de repos : 94%",
			sleepWidth: "85%",
			sleepColor: "fill-green",
			rad: "0.38",
			radDiag: "Sous le seuil d'alarme (1.0 mSv)",
			radWidth: "25%",
			radColor: "fill-green",
			recIcon: "check-circle-2",
			recIconColor: "var(--status-good)",
			recBg: "#ecfdf5",
			recBorder: "rgba(16, 185, 129, 0.3)",
			recTitle: "Protocole VitaOrbit : Maintien de vol standard",
			recText:
				"Tous les biomarqueurs sont dans la plage optimale NASA HRP. Maintenir le programme standard : séance de 45 minutes de cyclo-ergomètre ARED et hydratation à 2.5L.",
			alertToast: {
				show: false,
			},
			devices: {
				shirt: { text: "Tension Continue (118/76) • 250 Hz", dot: "dot-pulse-green" },
				watch: { text: "Pouls Régulier (68 BPM) • BLE 5.3", dot: "dot-pulse-green" },
				patch: { text: "Stress & Temp Basaux • 20 Hz", dot: "dot-pulse-green" },
				dosimeter: { text: "Rayonnement Nominal (0.38 mSv/j)", dot: "dot-pulse-green" },
			},
		},
		fatigue: {
			name: "Dr. Sarah K. — Chef Médicale (Sol 143)",
			statusText: "Alerte : Dette de Sommeil & Stress Circadien",
			statusClass: "pill-warn",
			statusColor: "var(--status-warn)",
			statusBg: "var(--status-warn-bg)",
			badgeBorder: "rgba(245, 158, 11, 0.3)",
			dotClass: "dot-amber",
			heart: "84",
			heartDiag: "Tachycardie modérée au repos",
			heartWidth: "75%",
			heartColor: "fill-amber",
			bp: "108/65",
			bpDiag: "Légère hypotension orthostatique",
			bpWidth: "48%",
			bpColor: "fill-amber",
			sleep: "4h 20m",
			sleepDiag: "Déficit aigu (-3h40)",
			sleepWidth: "35%",
			sleepColor: "fill-amber",
			rad: "0.45",
			radDiag: "Exposition cosmique normale",
			radWidth: "32%",
			radColor: "fill-green",
			recIcon: "alert-triangle",
			recIconColor: "var(--status-warn)",
			recBg: "#fffbeb",
			recBorder: "rgba(245, 158, 11, 0.35)",
			recTitle: "Protocole VitaOrbit : Recalage Circadien Immédiat",
			recText:
				"Prescription de 90 minutes de sieste régénérative dans le sas insonorisé. Séance de luminothérapie bleue (460 nm) de 30 minutes avant le prochain cycle de travail. Réduction temporaire des tâches de pilotage.",
			alertToast: {
				show: true,
				title: "VIGILANCE DÉTECTÉE : DÉSYNCHRONISATION & FATIGUE (< 1.4s)",
				text: "Le patch cutané GSR et la montre relèvent une dette de sommeil aiguë (-3h40) combinée à une élévation du cortisol et un pouls de repos instable. Recommandation préventive engagée.",
				time: "Il y a 12s",
				level: "amber",
			},
			devices: {
				shirt: { text: "Légère Hypotension : 108/65 mmHg", dot: "dot-pulse-amber" },
				watch: { text: "Pouls Élevé au repos (84 BPM)", dot: "dot-pulse-amber" },
				patch: { text: "Stress Cutané Élevé (Surmenage)", dot: "dot-pulse-amber" },
				dosimeter: { text: "Rayonnement Nominal (0.45 mSv/j)", dot: "dot-pulse-green" },
			},
		},
		radiation: {
			name: "Spéc. Alex M. — Géologue Lunaire (Sol 144)",
			statusText: "ALERTE CRITIQUE : Événement Particulaire Solaire (SPE)",
			statusClass: "pill-alert",
			statusColor: "var(--status-alert)",
			statusBg: "var(--status-alert-bg)",
			badgeBorder: "rgba(239, 68, 68, 0.4)",
			dotClass: "dot-red",
			heart: "98",
			heartDiag: "Pouls élevé (réaction de stress)",
			heartWidth: "90%",
			heartColor: "fill-red",
			bp: "138/88",
			bpDiag: "Hypertension réactionnelle",
			bpWidth: "82%",
			bpColor: "fill-red",
			sleep: "6h 10m",
			sleepDiag: "Perturbation du sommeil",
			sleepWidth: "65%",
			sleepColor: "fill-amber",
			rad: "2.85",
			radDiag: "DÉPASSEMENT SEUIL (Seuil : 1.0 mSv/j)",
			radWidth: "95%",
			radColor: "fill-red",
			recIcon: "shield-alert",
			recIconColor: "var(--status-alert)",
			recBg: "#fef2f2",
			recBorder: "rgba(239, 68, 68, 0.4)",
			recTitle: "Protocole VitaOrbit : ÉVACUATION VERS SAS BLINDÉ (STORM SHELTER)",
			recText:
				"ALERTE ROUGE : Arrêt immédiat de toute sortie extra-véhiculaire (EVA). Repli immédiat de l'astronaute vers le module central renforcé en eau et polyéthylène. Prise du kit antioxydant/radioprotecteur de vol. Télémétrie d'urgence transmise au centre de contrôle de Houston.",
			alertToast: {
				show: true,
				title: "ALERTE CRITIQUE SPE : ÉRUPTION DE PARTICULES SOLAIRES (< 0.5s)",
				text: "Le dosimètre communicant mesure 2.85 mSv/j (seuil NASA franchi). Corrélation directe avec la hausse du stress cardiaque. Évacuation immédiate de l'astronaute vers le sas anti-radiations !",
				time: "À l'instant",
				level: "red",
			},
			devices: {
				shirt: { text: "Tension Réactionnelle : 138/88 mmHg", dot: "dot-pulse-amber" },
				watch: { text: "Tachycardie de Stress (98 BPM)", dot: "dot-pulse-red" },
				patch: { text: "Décharge d'Adrénaline Aiguë", dot: "dot-pulse-red" },
				dosimeter: { text: "DÉPASSEMENT CRITIQUE : 2.85 mSv/j", dot: "dot-pulse-red" },
			},
		},
		hypertension: {
			name: "Spéc. K. Moumba — Sortie EVA Lunaire (Sol 145)",
			statusText: "ALERTE IMMÉDIATE : Pic Tensionnel Aigu & Arythmie",
			statusClass: "pill-alert",
			statusColor: "var(--status-alert)",
			statusBg: "var(--status-alert-bg)",
			badgeBorder: "rgba(239, 68, 68, 0.45)",
			dotClass: "dot-red",
			heart: "126",
			heartDiag: "Tachycardie sinusale critique (> 120 BPM)",
			heartWidth: "96%",
			heartColor: "fill-red",
			bp: "168/104",
			bpDiag: "Crise d'hypertension aiguë (PTT dévié)",
			bpWidth: "95%",
			bpColor: "fill-red",
			sleep: "5h 15m",
			sleepDiag: "Déficit modéré",
			sleepWidth: "45%",
			sleepColor: "fill-amber",
			rad: "0.42",
			radDiag: "Dose cosmique nominale",
			radWidth: "28%",
			radColor: "fill-green",
			recIcon: "bell-ring",
			recIconColor: "var(--status-alert)",
			recBg: "#fef2f2",
			recBorder: "rgba(239, 68, 68, 0.45)",
			recTitle: "Protocole VitaOrbit : ARRÊT D'EFFORT IMMÉDIAT & REPOS ASSISTÉ",
			recText:
				"ALERTE ROUGE CARDIOVASCULAIRE : Le maillot Astroskin et la montre biométrique confirment un pic à 168/104 mmHg couplé à une tachycardie à 126 BPM. Interruption immédiate des opérations en cours. Mise en position demi-assise, oxygénation cabine à 28 kPa, transmission prioritaire de l'ECG au médecin de vol.",
			alertToast: {
				show: true,
				title: "ALERTE EN TEMPS RÉEL : PIC CARDIOVASCULAIRE CRITIQUE (< 0.8s)",
				text: "Le maillot biométrique Astroskin et la montre connectée détectent un emballement tensionnel (168/104 mmHg) et tachycardie. Notification haptique d'arrêt immédiat transmise au poignet de l'astronaute !",
				time: "À l'instant",
				level: "red",
			},
			devices: {
				shirt: { text: "Tension Critique : 168/104 mmHg", dot: "dot-pulse-red" },
				watch: { text: "Pouls Critique : 126 BPM • Vibreur Actif", dot: "dot-pulse-red" },
				patch: { text: "Pic de Stress Cutané Détecté", dot: "dot-pulse-amber" },
				dosimeter: { text: "Rayonnement : 0.42 mSv/j (Normal)", dot: "dot-pulse-green" },
			},
		},
	};

	// Éléments DOM à mettre à jour
	const nameEl = document.getElementById("sim-astronaut-name");
	const statusBadge = document.getElementById("sim-status-badge");
	const statusText = document.getElementById("sim-status-text");

	const heartEl = document.getElementById("sim-heart");
	const heartBar = document.getElementById("bar-heart");
	const heartDiag = document.getElementById("diag-heart");

	const bpEl = document.getElementById("sim-bp");
	const bpBar = document.getElementById("bar-bp");
	const bpDiag = document.getElementById("diag-bp");

	const sleepEl = document.getElementById("sim-sleep");
	const sleepBar = document.getElementById("bar-sleep");
	const sleepDiag = document.getElementById("diag-sleep");

	const radEl = document.getElementById("sim-rad");
	const radBar = document.getElementById("bar-rad");
	const radDiag = document.getElementById("diag-rad");

	const recBox = document.getElementById("sim-rec-box");
	const recIcon = document.getElementById("sim-rec-icon");
	const recTitle = document.getElementById("sim-rec-title");
	const recText = document.getElementById("sim-rec-text");

	// Éléments des dispositifs connectés en direct
	const chipShirtState = document.getElementById("chip-shirt-state");
	const chipShirtDot = document.querySelector("#chip-shirt .live-pulse-dot");

	const chipWatchState = document.getElementById("chip-watch-state");
	const chipWatchDot = document.querySelector("#chip-watch .live-pulse-dot");

	const chipPatchState = document.getElementById("chip-patch-state");
	const chipPatchDot = document.querySelector("#chip-patch .live-pulse-dot");

	const chipDosimeterState = document.getElementById("chip-dosimeter-state");
	const chipDosimeterDot = document.querySelector("#chip-dosimeter .live-pulse-dot");

	// Toast d'alerte en temps réel
	const alertToastEl = document.getElementById("sim-live-alert");
	const alertTitleEl = document.getElementById("sim-alert-title");
	const alertTextEl = document.getElementById("sim-alert-text");
	const alertTimeEl = document.getElementById("sim-alert-time");

	let currentScenarioKey = "nominal";

	function applyScenario(key) {
		const data = scenarios[key];
		if (!data) return;

		currentScenarioKey = key;

		// Mise à jour de l'identité & statut
		if (nameEl) nameEl.textContent = data.name;
		if (statusText) statusText.textContent = data.statusText;

		if (statusBadge) {
			statusBadge.style.color = data.statusColor;
			statusBadge.style.background = data.statusBg;
			statusBadge.style.borderColor = data.badgeBorder;

			const dot = statusBadge.querySelector(".status-indicator-dot");
			if (dot) {
				dot.className = `status-indicator-dot ${data.dotClass}`;
			}
		}

		// Constantes vitales
		if (heartEl) heartEl.innerHTML = `${data.heart} <span class="val-unit">BPM</span>`;
		if (heartDiag) heartDiag.textContent = data.heartDiag;
		if (heartBar) {
			heartBar.style.width = data.heartWidth;
			heartBar.className = `bar-fill ${data.heartColor}`;
		}

		if (bpEl) bpEl.innerHTML = `${data.bp} <span class="val-unit">mmHg</span>`;
		if (bpDiag) bpDiag.textContent = data.bpDiag;
		if (bpBar) {
			bpBar.style.width = data.bpWidth;
			bpBar.className = `bar-fill ${data.bpColor}`;
		}

		if (sleepEl) sleepEl.innerHTML = `${data.sleep} <span class="val-unit">Sommeil</span>`;
		if (sleepDiag) sleepDiag.textContent = data.sleepDiag;
		if (sleepBar) {
			sleepBar.style.width = data.sleepWidth;
			sleepBar.className = `bar-fill ${data.sleepColor}`;
		}

		if (radEl) radEl.innerHTML = `${data.rad} <span class="val-unit">mSv/24h</span>`;
		if (radDiag) radDiag.textContent = data.radDiag;
		if (radBar) {
			radBar.style.width = data.radWidth;
			radBar.className = `bar-fill ${data.radColor}`;
		}

		// Prescription & Recommandation
		if (recBox) {
			recBox.style.background = data.recBg;
			recBox.style.borderColor = data.recBorder;
		}
		if (recIcon) {
			recIcon.style.color = data.recIconColor;
			recIcon.innerHTML = `<i data-lucide="${data.recIcon}"></i>`;
		}
		if (recTitle) recTitle.textContent = data.recTitle;
		if (recText) recText.textContent = data.recText;

		// Mise à jour de l'état des appareils connectés en direct
		if (data.devices) {
			if (chipShirtState && data.devices.shirt) chipShirtState.textContent = data.devices.shirt.text;
			if (chipShirtDot && data.devices.shirt) chipShirtDot.className = `live-pulse-dot ${data.devices.shirt.dot}`;

			if (chipWatchState && data.devices.watch) chipWatchState.textContent = data.devices.watch.text;
			if (chipWatchDot && data.devices.watch) chipWatchDot.className = `live-pulse-dot ${data.devices.watch.dot}`;

			if (chipPatchState && data.devices.patch) chipPatchState.textContent = data.devices.patch.text;
			if (chipPatchDot && data.devices.patch) chipPatchDot.className = `live-pulse-dot ${data.devices.patch.dot}`;

			if (chipDosimeterState && data.devices.dosimeter) chipDosimeterState.textContent = data.devices.dosimeter.text;
			if (chipDosimeterDot && data.devices.dosimeter) chipDosimeterDot.className = `live-pulse-dot ${data.devices.dosimeter.dot}`;
		}

		// Mise à jour de la bannière d'alerte instantanée
		if (alertToastEl) {
			if (data.alertToast && data.alertToast.show) {
				alertToastEl.style.display = "flex";
				if (alertTitleEl) alertTitleEl.textContent = data.alertToast.title;
				if (alertTextEl) alertTextEl.textContent = data.alertToast.text;
				if (alertTimeEl) alertTimeEl.textContent = data.alertToast.time;

				const toastIcon = alertToastEl.querySelector(".alert-toast-icon");
				if (data.alertToast.level === "amber") {
					alertToastEl.style.borderColor = "var(--status-warn)";
					alertToastEl.style.background = "#fffbeb";
					if (toastIcon) toastIcon.style.background = "var(--status-warn)";
				} else {
					alertToastEl.style.borderColor = "#ef4444";
					alertToastEl.style.background = "#fef2f2";
					if (toastIcon) toastIcon.style.background = "#ef4444";
				}
			} else {
				alertToastEl.style.display = "none";
			}
		}

		// Réactualisation des icônes Lucide dans la carte modifiée
		if (window.lucide && typeof window.lucide.createIcons === "function") {
			window.lucide.createIcons();
		}
	}

	// Simulation subtile de micro-flux télémétrique continu en mode nominal (battements en direct)
	setInterval(() => {
		if (currentScenarioKey === "nominal" && heartEl) {
			const jitter = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
			const liveBPM = 68 + jitter;
			heartEl.innerHTML = `${liveBPM} <span class="val-unit">BPM</span>`;
		}
	}, 3500);

	scenarioButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			scenarioButtons.forEach((b) => {
				b.classList.remove("active");
				b.setAttribute("aria-selected", "false");
			});

			btn.classList.add("active");
			btn.setAttribute("aria-selected", "true");

			const scenarioKey = btn.getAttribute("data-scenario");
			applyScenario(scenarioKey);
		});
	});
}

/* ==========================================================================
   6. HOTSPOTS INTERACTIFS SUR LA SILHOUETTE DU HERO
   ========================================================================== */
function initSilhouetteHotspots() {
	const hotspots = document.querySelectorAll(".scan-hotspot");
	const metricBoxes = document.querySelectorAll(".metric-box");

	if (!hotspots.length) return;

	hotspots.forEach((spot) => {
		spot.addEventListener("click", () => {
			const target = spot.getAttribute("data-target");

			// Effet de mise en valeur subtile
			metricBoxes.forEach((box) => {
				box.style.borderColor = "";
				box.style.transform = "";
			});

			// Cible correspondante
			let matchedIndex = 0;
			if (target === "neuro") matchedIndex = 2; // SpO2 / Cerveau
			if (target === "cardio") matchedIndex = 0; // Pouls
			if (target === "radiation") matchedIndex = 3; // Rayonnement
			if (target === "muscles") matchedIndex = 1; // Pression

			if (metricBoxes[matchedIndex]) {
				const box = metricBoxes[matchedIndex];
				box.style.borderColor = "var(--primary)";
				box.style.transform = "scale(1.03)";
				setTimeout(() => {
					box.style.transform = "";
				}, 600);
			}
		});
	});
}
