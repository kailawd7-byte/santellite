/**
 * ==============================================================================
 * SANTELLITE : VITAORBIT — COMPOSANT RÉUTILISABLE D'EXPLICATION PÉDAGOGIQUE
 * ==============================================================================
 * Gestionnaire accessible de panneaux d'information contextuels (Popovers/Tooltips) :
 *  - Ouverture au clic sur icône "info"
 *  - Fermeture au clic en dehors, à la touche Échap, ou au reclic sur l'icône
 *  - Un seul panneau ouvert à la fois (exclusivité mutuelle)
 *  - Positionnement adaptatif avec maintien dans le viewport
 *  - Attributs ARIA complets (aria-expanded, aria-label)
 * ==============================================================================
 */

(function (global) {
	"use strict";

	var activePopover = null;
	var activeTrigger = null;

	function closeActivePopover() {
		if (!activePopover) return;
		activePopover.classList.add("hidden");
		activePopover.classList.remove("block");
		if (activeTrigger) {
			activeTrigger.setAttribute("aria-expanded", "false");
			activeTrigger.classList.remove("text-cyan-400");
			activeTrigger.classList.add("text-slate-400");
		}
		activePopover = null;
		activeTrigger = null;
	}

	function openPopover(triggerEl, popoverEl) {
		if (activePopover === popoverEl) {
			closeActivePopover();
			return;
		}
		closeActivePopover();

		popoverEl.classList.remove("hidden");
		popoverEl.classList.add("block");
		triggerEl.setAttribute("aria-expanded", "true");
		triggerEl.classList.remove("text-slate-400");
		triggerEl.classList.add("text-cyan-400");

		activePopover = popoverEl;
		activeTrigger = triggerEl;

		// Ajustement fin du positionnement pour éviter tout débordement d'écran
		requestAnimationFrame(function () {
			if (!popoverEl) return;
			var rect = popoverEl.getBoundingClientRect();
			if (rect.right > window.innerWidth - 12) {
				popoverEl.style.right = "0px";
				popoverEl.style.left = "auto";
			}
			if (rect.left < 12) {
				popoverEl.style.left = "0px";
				popoverEl.style.right = "auto";
			}
		});
	}

	function togglePopover(targetId, triggerBtn) {
		var popover = document.getElementById(targetId);
		if (!popover) return;
		if (activePopover === popover) {
			closeActivePopover();
		} else {
			openPopover(triggerBtn, popover);
		}
	}

	// Écouteur global : Fermeture au clic en dehors
	document.addEventListener("click", function (e) {
		if (!activePopover) return;
		if (activePopover.contains(e.target)) return;
		if (activeTrigger && activeTrigger.contains(e.target)) return;
		closeActivePopover();
	});

	// Écouteur global : Fermeture à la touche Échap
	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape" || e.key === "Esc") {
			if (activeTrigger) {
				try { activeTrigger.focus(); } catch (err) {}
			}
			closeActivePopover();
		}
	});

	// Initialisation des icônes Lucide à l'état prêt
	if (typeof document !== "undefined") {
		var initLucide = function () {
			if (global.lucide && typeof global.lucide.createIcons === "function") {
				global.lucide.createIcons();
			}
		};
		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", initLucide);
		} else {
			initLucide();
		}
	}

	global.toggleInfoPopover = togglePopover;
	global.closeActiveInfoPopover = closeActivePopover;
})(typeof window !== "undefined" ? window : this);
