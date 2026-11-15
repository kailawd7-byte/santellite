/**
 * ==============================================================================
 * SANTELLITE : VITAORBIT — FOND SPATIAL IMMERSIF SYNCHRONISÉ AU DÉFILEMENT
 * ==============================================================================
 * Voyage visuel continu du haut vers le bas de la page :
 *  1. Terre orbitale & lever de soleil (Hero)
 *  2. Espace profond, étoiles en parallaxe 3D, orbites et satellites (Sections intermédiaires)
 *  3. Approche lunaire stylisée Artemis (Section Équipe / Fin de page)
 *
 * Performance & Accessibilité :
 *  - Animation 60 FPS via Canvas natif et transform CSS (zéro reflow).
 *  - Pause automatique lors du changement d'onglet (visibilitychange).
 *  - Prise en charge stricte de prefers-reduced-motion.
 *  - Optimisation dynamique pour mobiles et processeurs basse consommation.
 * ==============================================================================
 */

(function () {
	"use strict";

	/* ==========================================================================
	   1. RÉGLAGES FACILEMENT MODIFIABLES (POINTS D'AJUSTEMENT)
	   ========================================================================== */
	var SPACE_CONFIG = {
		// 1. Nombre d'étoiles par couche (Desktop : lointaine, moyenne, proche)
		starsCount: { distant: 130, medium: 70, near: 30 },

		// 2. Vitesses de rotation continue des orbites (en secondes par tour complet)
		orbitDurations: { ring1: 85, ring2: 130 },

		// 3. Seuil de défilement pour l'apparition progressive de la Lune (0.75 = 75% du scroll)
		moonScrollThreshold: 0.72,

		// 4. Fréquence des étoiles filantes (intervalle moyen en secondes)
		shootingStarIntervalSec: 12,

		// 5. Palette de couleurs du dégradé selon le scroll (Haut [Terre] -> Milieu [Abysse] -> Bas [Lune])
		gradientStops: {
			top: {
				c1: [4, 7, 16], // #040710 (Bleu nuit orbital)
				c2: [7, 16, 34], // #071022 (Teinte atmosphérique)
				c3: [5, 9, 20] // #050914 (Transition horizon)
			},
			middle: {
				c1: [2, 4, 8], // #020408 (Noir spatial profond)
				c2: [5, 7, 13], // #05070D (Abysse cosmique)
				c3: [3, 4, 7] // #030407 (Vide interstellaire)
			},
			bottom: {
				c1: [7, 10, 18], // #070A12 (Espace circumlunaire)
				c2: [15, 23, 38], // #0F1726 (Halo gris-bleuté lointain)
				c3: [28, 38, 58] // #1C263A (Lueur argentée lunaire)
			}
		}
	};

	/* ==========================================================================
	   2. DÉTECTION MATÉRIELLE & ACCESSIBILITÉ
	   ========================================================================== */
	var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	var isLowPowerDevice = (window.innerWidth < 768) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

	if (isLowPowerDevice) {
		SPACE_CONFIG.starsCount.distant = Math.round(SPACE_CONFIG.starsCount.distant * 0.5);
		SPACE_CONFIG.starsCount.medium = Math.round(SPACE_CONFIG.starsCount.medium * 0.45);
		SPACE_CONFIG.starsCount.near = Math.round(SPACE_CONFIG.starsCount.near * 0.35);
	}

	/* ==========================================================================
	   3. INJECTION AUTOMATIQUE DE LA STRUCTURE DU FOND (SI ABSENTE)
	   ========================================================================== */
	function ensureBackgroundStructure() {
		var existing = document.getElementById("space-background");
		if (existing) return existing;

		var container = document.createElement("div");
		container.id = "space-background";
		container.className = "fixed inset-0 w-full h-full pointer-events-none overflow-hidden";
		container.setAttribute("aria-hidden", "true");
		container.style.zIndex = "0";

		// Couche 1 : Dégradé CSS dynamique
		var gradientLayer = document.createElement("div");
		gradientLayer.id = "space-gradient-layer";
		gradientLayer.className = "absolute inset-0 w-full h-full transition-colors duration-200 pointer-events-none";
		container.appendChild(gradientLayer);

		// Couche 2 : Orbites et satellites vectoriels SVG
		var orbitsSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		orbitsSvg.id = "space-orbits-layer";
		orbitsSvg.setAttribute("class", "absolute inset-0 w-full h-full pointer-events-none");
		orbitsSvg.setAttribute("viewBox", "0 0 1920 1080");
		orbitsSvg.setAttribute("preserveAspectRatio", "xMidYMid slice");

		orbitsSvg.innerHTML =
			'<defs>' +
				'<filter id="sat-glow" x="-50%" y="-50%" width="200%" height="200%">' +
					'<feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#00E5FF" flood-opacity="0.8"/>' +
				'</filter>' +
			'</defs>' +
			'<!-- Orbite 1 : Cyan NASA (Rotation sens horaire) -->' +
			'<g class="space-orbit-group-1">' +
				'<ellipse cx="960" cy="540" rx="760" ry="360" fill="none" stroke="#00E5FF" stroke-width="1" stroke-dasharray="4 12" opacity="0.16" transform="rotate(-16 960 540)"/>' +
				'<!-- Satellite A -->' +
				'<g transform="translate(1680, 540) rotate(-16)">' +
					'<rect x="-18" y="-3.5" width="10" height="7" rx="1" fill="#00E5FF" opacity="0.85" filter="url(#sat-glow)"/>' +
					'<rect x="8" y="-3.5" width="10" height="7" rx="1" fill="#00E5FF" opacity="0.85" filter="url(#sat-glow)"/>' +
					'<rect x="-6" y="-5" width="12" height="10" rx="2" fill="#FFFFFF"/>' +
					'<circle cx="0" cy="0" r="2" fill="#00E5FF"/>' +
					'<line x1="0" y1="-5" x2="0" y2="-9" stroke="#E2E8F0" stroke-width="1.2"/>' +
					'<circle cx="0" cy="-9" r="1.2" fill="#10B981"/>' +
				'</g>' +
			'</g>' +
			'<!-- Orbite 2 : Bleu NASA (Rotation sens anti-horaire) -->' +
			'<g class="space-orbit-group-2">' +
				'<ellipse cx="960" cy="540" rx="920" ry="430" fill="none" stroke="#38BDF8" stroke-width="1.2" stroke-dasharray="6 16" opacity="0.14" transform="rotate(26 960 540)"/>' +
				'<!-- Satellite B -->' +
				'<g transform="translate(80, 540) rotate(26)">' +
					'<rect x="-14" y="-3" width="8" height="6" rx="1" fill="#38BDF8" opacity="0.8"/>' +
					'<rect x="6" y="-3" width="8" height="6" rx="1" fill="#38BDF8" opacity="0.8"/>' +
					'<rect x="-5" y="-4" width="10" height="8" rx="1.5" fill="#F1F5F9"/>' +
					'<circle cx="0" cy="0" r="1.5" fill="#38BDF8"/>' +
				'</g>' +
			'</g>' +
			'<!-- Anneau 3 : Trace orbitale lointaine discrète -->' +
			'<ellipse cx="960" cy="540" rx="1080" ry="500" fill="none" stroke="rgba(255, 255, 255, 0.05)" stroke-width="0.8" stroke-dasharray="2 20" transform="rotate(-6 960 540)"/>';

		container.appendChild(orbitsSvg);

		// Couche 3 : Canvas interactif pour étoiles en parallaxe & Lune
		var canvas = document.createElement("canvas");
		canvas.id = "space-stars-canvas";
		canvas.className = "absolute inset-0 w-full h-full pointer-events-none";
		container.appendChild(canvas);

		// Insertion tout au début du <body> pour rester en arrière-plan
		document.body.insertBefore(container, document.body.firstChild);
		return container;
	}

	/* ==========================================================================
	   4. INJECTION DES RÈGLES CSS ASSOCIÉES
	   ========================================================================== */
	function injectSpaceStyles() {
		if (document.getElementById("space-bg-styles")) return;

		var style = document.createElement("style");
		style.id = "space-bg-styles";
		style.textContent =
			"#space-background { pointer-events: none; z-index: 0; }" +
			"@keyframes spaceOrbitCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }" +
			"@keyframes spaceOrbitCCW { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }" +
			".space-orbit-group-1 { transform-origin: 960px 540px; animation: spaceOrbitCW " + SPACE_CONFIG.orbitDurations.ring1 + "s linear infinite; }" +
			".space-orbit-group-2 { transform-origin: 960px 540px; animation: spaceOrbitCCW " + SPACE_CONFIG.orbitDurations.ring2 + "s linear infinite; }" +
			"@media (prefers-reduced-motion: reduce) {" +
				".space-orbit-group-1, .space-orbit-group-2 { animation: none !important; }" +
			"}" +
			"body > main { position: relative; z-index: 10; background-color: transparent !important; }" +
			"main { background-color: transparent !important; }" +
			"main > section:not(#accueil) { background-color: transparent !important; }" +
			"body > main > section:not(#accueil) { background-color: transparent !important; }" +
			"body > main > section#simulateur { background-color: transparent !important; }" +
			"footer { position: relative; z-index: 10; background-color: rgba(5, 7, 13, 0.65) !important; backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }" +
			"body > footer { position: relative; z-index: 10; background-color: rgba(5, 7, 13, 0.65) !important; backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }";

		document.head.appendChild(style);
	}

	/* ==========================================================================
	   5. GESTION DU DÉGRADÉ DYNAMIQUE SYNCHRONISÉ AU SCROLL
	   ========================================================================== */
	function lerpColor(cA, cB, t) {
		return [
			Math.round(cA[0] + (cB[0] - cA[0]) * t),
			Math.round(cA[1] + (cB[1] - cA[1]) * t),
			Math.round(cA[2] + (cB[2] - cA[2]) * t)
		];
	}

	function updateGradient(gradientEl, progress) {
		var stops = SPACE_CONFIG.gradientStops;
		var c1, c2, c3;

		if (progress <= 0.5) {
			var t = progress / 0.5;
			c1 = lerpColor(stops.top.c1, stops.middle.c1, t);
			c2 = lerpColor(stops.top.c2, stops.middle.c2, t);
			c3 = lerpColor(stops.top.c3, stops.middle.c3, t);
		} else {
			var t2 = (progress - 0.5) / 0.5;
			c1 = lerpColor(stops.middle.c1, stops.bottom.c1, t2);
			c2 = lerpColor(stops.middle.c2, stops.bottom.c2, t2);
			c3 = lerpColor(stops.middle.c3, stops.bottom.c3, t2);
		}

		gradientEl.style.background =
			"linear-gradient(180deg, rgb(" + c1.join(",") + ") 0%, rgb(" + c2.join(",") + ") 50%, rgb(" + c3.join(",") + ") 100%)";
	}

	/* ==========================================================================
	   6. MOTEUR CANVAS : PARALLAXE D'ÉTOILES, ÉTOILES FILANTES & LUNE
	   ========================================================================== */
	function SpaceCanvasEngine(canvasEl) {
		this.canvas = canvasEl;
		this.ctx = canvasEl.getContext("2d");
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.dpr = Math.min(window.devicePixelRatio || 1, 2);

		this.stars = [];
		this.shootingStars = [];
		this.lastShootingStarTime = 0;
		this.nextShootingStarDelay = (SPACE_CONFIG.shootingStarIntervalSec * 0.8) + (Math.random() * SPACE_CONFIG.shootingStarIntervalSec * 0.4);

		this.scrollProgress = 0;
		this.scrollY = 0;
		this.isRunning = true;

		this.initDimensions();
		this.generateStars();
	}

	SpaceCanvasEngine.prototype.initDimensions = function () {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.canvas.width = Math.round(this.width * this.dpr);
		this.canvas.height = Math.round(this.height * this.dpr);
		this.ctx.setTransform(1, 0, 0, 1, 0, 0);
		this.ctx.scale(this.dpr, this.dpr);
	};

	SpaceCanvasEngine.prototype.generateStars = function () {
		this.stars = [];
		var cfg = SPACE_CONFIG.starsCount;

		// Couche 1 : Lointaine (Très petites, lentes, denses)
		for (var i = 0; i < cfg.distant; i++) {
			this.stars.push({
				x: Math.random() * this.width,
				y: Math.random() * this.height,
				radius: 0.5 + Math.random() * 0.5,
				baseAlpha: 0.25 + Math.random() * 0.35,
				speedFactor: 0.04,
				twinkleSpeed: 0.5 + Math.random() * 1.5,
				twinklePhase: Math.random() * Math.PI * 2,
				color: "255, 255, 255"
			});
		}

		// Couche 2 : Moyenne (Taille moyenne, vitesse modérée)
		for (var j = 0; j < cfg.medium; j++) {
			this.stars.push({
				x: Math.random() * this.width,
				y: Math.random() * this.height,
				radius: 1.0 + Math.random() * 0.6,
				baseAlpha: 0.45 + Math.random() * 0.4,
				speedFactor: 0.11,
				twinkleSpeed: 1.0 + Math.random() * 2.0,
				twinklePhase: Math.random() * Math.PI * 2,
				color: Math.random() > 0.4 ? "255, 255, 255" : "165, 243, 252" // Blanc ou cyan très pâle
			});
		}

		// Couche 3 : Proche (Grandes étoiles brillantes, parallaxe rapide)
		for (var k = 0; k < cfg.near; k++) {
			this.stars.push({
				x: Math.random() * this.width,
				y: Math.random() * this.height,
				radius: 1.6 + Math.random() * 0.8,
				baseAlpha: 0.75 + Math.random() * 0.25,
				speedFactor: 0.24,
				twinkleSpeed: 1.5 + Math.random() * 2.5,
				twinklePhase: Math.random() * Math.PI * 2,
				color: Math.random() > 0.5 ? "255, 255, 255" : "199, 210, 254" // Blanc ou indigo très doux
			});
		}
	};

	SpaceCanvasEngine.prototype.spawnShootingStar = function () {
		if (isLowPowerDevice || prefersReducedMotion) return;
		if (this.shootingStars.length >= 1) return; // Une seule à la fois pour rester discret

		var startX = Math.random() * (this.width * 0.7);
		var startY = Math.random() * (this.height * 0.4);
		var angle = (32 + Math.random() * 12) * (Math.PI / 180); // Trajectoire oblique 32-44 deg
		var length = 80 + Math.random() * 70;
		var speed = 750 + Math.random() * 450; // pixels par seconde

		this.shootingStars.push({
			x: startX,
			y: startY,
			dx: Math.cos(angle),
			dy: Math.sin(angle),
			length: length,
			speed: speed,
			progress: 0,
			totalLife: 0.85
		});
	};

	SpaceCanvasEngine.prototype.drawMoon = function (now) {
		var threshold = SPACE_CONFIG.moonScrollThreshold;
		if (this.scrollProgress < threshold) return;

		// Opacité d'apparition progressive (de 0 à 1 entre threshold et la fin de page)
		var progress = Math.min(1, Math.max(0, (this.scrollProgress - threshold) / (1 - threshold)));
		if (progress <= 0) return;

		var ctx = this.ctx;
		var radius = Math.min(this.width, this.height) * (this.width < 768 ? 0.24 : 0.28);
		// Positionnement vers le coin inférieur droit, partiellement dans le champ
		var cx = this.width * 0.86;
		var cy = this.height * 0.74 + (1 - progress) * 80;

		ctx.save();

		// 1. Lueur atmosphérique externe diffuse
		var haloGrad = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.6);
		haloGrad.addColorStop(0, "rgba(226, 232, 240, " + (0.12 * progress) + ")");
		haloGrad.addColorStop(0.5, "rgba(186, 230, 253, " + (0.05 * progress) + ")");
		haloGrad.addColorStop(1, "rgba(186, 230, 253, 0)");
		ctx.fillStyle = haloGrad;
		ctx.beginPath();
		ctx.arc(cx, cy, radius * 1.6, 0, Math.PI * 2);
		ctx.fill();

		// 2. Découpe du disque lunaire
		ctx.beginPath();
		ctx.arc(cx, cy, radius, 0, Math.PI * 2);
		ctx.clip();

		// 3. Texture de base de la Lune (dégradé d'illumination solaire rasante)
		var moonGrad = ctx.createRadialGradient(
			cx - radius * 0.35,
			cy - radius * 0.35,
			radius * 0.08,
			cx,
			cy,
			radius
		);
		moonGrad.addColorStop(0, "rgba(255, 255, 255, " + (0.95 * progress) + ")");
		moonGrad.addColorStop(0.35, "rgba(226, 232, 240, " + (0.90 * progress) + ")");
		moonGrad.addColorStop(0.75, "rgba(148, 163, 184, " + (0.85 * progress) + ")");
		moonGrad.addColorStop(1, "rgba(71, 85, 105, " + (0.80 * progress) + ")");
		ctx.fillStyle = moonGrad;
		ctx.fill();

		// 4. Cratères stylisés (Mers lunaires douces)
		var craters = [
			{ dx: -0.25, dy: -0.22, r: 0.28, alpha: 0.12 },
			{ dx: -0.05, dy: -0.42, r: 0.20, alpha: 0.10 },
			{ dx: 0.22, dy: -0.15, r: 0.18, alpha: 0.09 },
			{ dx: -0.32, dy: 0.18, r: 0.24, alpha: 0.11 },
			{ dx: 0.08, dy: 0.25, r: 0.22, alpha: 0.13 },
			{ dx: 0.35, dy: 0.32, r: 0.14, alpha: 0.08 }
		];

		for (var c = 0; c < craters.length; c++) {
			var cr = craters[c];
			var crX = cx + cr.dx * radius;
			var crY = cy + cr.dy * radius;
			var crR = cr.r * radius;

			var crGrad = ctx.createRadialGradient(crX, crY, crR * 0.2, crX, crY, crR);
			crGrad.addColorStop(0, "rgba(51, 65, 85, " + (cr.alpha * progress) + ")");
			crGrad.addColorStop(0.8, "rgba(71, 85, 105, " + (cr.alpha * 0.6 * progress) + ")");
			crGrad.addColorStop(1, "rgba(148, 163, 184, 0)");

			ctx.fillStyle = crGrad;
			ctx.beginPath();
			ctx.arc(crX, crY, crR, 0, Math.PI * 2);
			ctx.fill();
		}

		ctx.restore();
	};

	SpaceCanvasEngine.prototype.render = function (timestamp) {
		var ctx = this.ctx;
		var w = this.width;
		var h = this.height;

		ctx.clearRect(0, 0, w, h);

		var timeSec = timestamp * 0.001;

		// 1. Rendu du champ d'étoiles avec parallaxe de profondeur
		for (var i = 0; i < this.stars.length; i++) {
			var star = this.stars[i];

			// Calcul de l'ordonnée avec décalage de parallaxe vertical
			var parallaxY = prefersReducedMotion ? star.y : (star.y - this.scrollY * star.speedFactor);
			var renderY = parallaxY % h;
			if (renderY < 0) renderY += h;

			// Scintillement subtil et organique
			var twinkle = 0.85 + 0.15 * Math.sin(timeSec * star.twinkleSpeed + star.twinklePhase);
			var alpha = star.baseAlpha * twinkle;

			ctx.fillStyle = "rgba(" + star.color + ", " + alpha.toFixed(3) + ")";
			ctx.beginPath();
			ctx.arc(star.x, renderY, star.radius, 0, Math.PI * 2);
			ctx.fill();
		}

		// 2. Gestion et tracé des étoiles filantes discrètes
		if (!isLowPowerDevice && !prefersReducedMotion) {
			if (timeSec - this.lastShootingStarTime > this.nextShootingStarDelay) {
				this.spawnShootingStar();
				this.lastShootingStarTime = timeSec;
				this.nextShootingStarDelay = (SPACE_CONFIG.shootingStarIntervalSec * 0.8) + (Math.random() * SPACE_CONFIG.shootingStarIntervalSec * 0.4);
			}

			for (var s = this.shootingStars.length - 1; s >= 0; s--) {
				var ss = this.shootingStars[s];
				ss.progress += 0.016 / ss.totalLife;

				if (ss.progress >= 1) {
					this.shootingStars.splice(s, 1);
					continue;
				}

				var headX = ss.x + ss.dx * ss.speed * ss.progress;
				var headY = ss.y + ss.dy * ss.speed * ss.progress;
				var tailX = headX - ss.dx * ss.length;
				var tailY = headY - ss.dy * ss.length;

				var ssAlpha = Math.sin(ss.progress * Math.PI) * 0.85;

				var grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
				grad.addColorStop(0, "rgba(0, 229, 255, 0)");
				grad.addColorStop(0.7, "rgba(0, 229, 255, " + (ssAlpha * 0.5) + ")");
				grad.addColorStop(1, "rgba(255, 255, 255, " + ssAlpha + ")");

				ctx.strokeStyle = grad;
				ctx.lineWidth = 1.4;
				ctx.beginPath();
				ctx.moveTo(tailX, tailY);
				ctx.lineTo(headX, headY);
				ctx.stroke();
			}
		}

		// 3. Disque lunaire stylisé (Artemis) en fin de page
		this.drawMoon(timeSec);
	};

	/* ==========================================================================
	   7. POINT D'ENTRÉE & BOUCLE PRINCIPALE
	   ========================================================================== */
	function initSpaceBackground() {
		if (window.__SPACE_BG_INITIALIZED__) return;
		window.__SPACE_BG_INITIALIZED__ = true;
		injectSpaceStyles();
		var container = ensureBackgroundStructure();
		var gradientLayer = document.getElementById("space-gradient-layer");
		var canvasEl = document.getElementById("space-stars-canvas");

		if (!canvasEl || !gradientLayer) return;

		var engine = new SpaceCanvasEngine(canvasEl);

		// Synchronisation scroll (requestAnimationFrame avec drapeau ticking)
		var ticking = false;

		function onScroll() {
			var currentScrollY = window.scrollY || window.pageYOffset || 0;
			var maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
			var progress = Math.min(1, Math.max(0, currentScrollY / maxScroll));

			engine.scrollY = currentScrollY;
			engine.scrollProgress = progress;

			if (!ticking) {
				window.requestAnimationFrame(function () {
					updateGradient(gradientLayer, progress);
					ticking = false;
				});
				ticking = true;
			}
		}

		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll(); // Évaluation initiale

		// Synchronisation redimensionnement (resize)
		var resizeTimeout = null;
		window.addEventListener("resize", function () {
			if (resizeTimeout) clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(function () {
				engine.initDimensions();
				engine.generateStars();
				onScroll();
			}, 120);
		}, { passive: true });

		// Gestion de la visibilité de l'onglet (Économie de batterie)
		document.addEventListener("visibilitychange", function () {
			if (document.hidden) {
				engine.isRunning = false;
			} else {
				engine.isRunning = true;
				window.requestAnimationFrame(loop);
			}
		});

		// Boucle d'animation principale 60 FPS
		function loop(timestamp) {
			if (!engine.isRunning) return;

			engine.render(timestamp);

			if (!prefersReducedMotion) {
				window.requestAnimationFrame(loop);
			}
		}

		// Premier rendu
		window.requestAnimationFrame(loop);
	}

	// Lancement après chargement du DOM
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initSpaceBackground);
	} else {
		initSpaceBackground();
	}
})();
