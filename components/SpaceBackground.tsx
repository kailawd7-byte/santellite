"use client";

import React, { useEffect, useRef } from "react";

export default function SpaceBackground() {
  const gradientRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gradientEl = gradientRef.current;
    if (!canvas || !gradientEl) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (typeof window !== "undefined") {
      (window as unknown as { __SPACE_BG_INITIALIZED__: boolean }).__SPACE_BG_INITIALIZED__ = true;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isLowPower =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4));

    // Stars count
    const starsCount = {
      distant: isLowPower ? 65 : 130,
      medium: isLowPower ? 35 : 70,
      near: isLowPower ? 12 : 30,
    };

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const initDimensions = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    initDimensions();

    // Star data structures
    interface Star {
      x: number;
      y: number;
      radius: number;
      baseAlpha: number;
      speedFactor: number;
      twinkleSpeed: number;
      twinklePhase: number;
      color: string;
    }

    let stars: Star[] = [];

    const generateStars = () => {
      stars = [];
      // Distant layer
      for (let i = 0; i < starsCount.distant; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 0.5 + Math.random() * 0.5,
          baseAlpha: 0.25 + Math.random() * 0.35,
          speedFactor: 0.04,
          twinkleSpeed: 0.5 + Math.random() * 1.5,
          twinklePhase: Math.random() * Math.PI * 2,
          color: "255, 255, 255",
        });
      }
      // Medium layer
      for (let j = 0; j < starsCount.medium; j++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1.0 + Math.random() * 0.6,
          baseAlpha: 0.45 + Math.random() * 0.4,
          speedFactor: 0.11,
          twinkleSpeed: 1.0 + Math.random() * 2.0,
          twinklePhase: Math.random() * Math.PI * 2,
          color: Math.random() > 0.4 ? "255, 255, 255" : "165, 243, 252",
        });
      }
      // Near layer
      for (let k = 0; k < starsCount.near; k++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1.6 + Math.random() * 0.8,
          baseAlpha: 0.75 + Math.random() * 0.25,
          speedFactor: 0.24,
          twinkleSpeed: 1.5 + Math.random() * 2.5,
          twinklePhase: Math.random() * Math.PI * 2,
          color: Math.random() > 0.5 ? "255, 255, 255" : "199, 210, 254",
        });
      }
    };

    generateStars();

    // Shooting stars
    interface ShootingStar {
      x: number;
      y: number;
      dx: number;
      dy: number;
      length: number;
      speed: number;
      progress: number;
      totalLife: number;
    }

    let shootingStars: ShootingStar[] = [];
    let lastShootingStarTime = 0;
    let nextShootingStarDelay = 10 + Math.random() * 8;

    const spawnShootingStar = () => {
      if (isLowPower || prefersReducedMotion) return;
      if (shootingStars.length >= 1) return;

      const startX = Math.random() * (width * 0.7);
      const startY = Math.random() * (height * 0.4);
      const angle = (32 + Math.random() * 12) * (Math.PI / 180);
      const length = 80 + Math.random() * 70;
      const speed = 750 + Math.random() * 450;

      shootingStars.push({
        x: startX,
        y: startY,
        dx: Math.cos(angle),
        dy: Math.sin(angle),
        length,
        speed,
        progress: 0,
        totalLife: 0.85,
      });
    };

    // Dynamic gradient color stops
    const stops = {
      top: {
        c1: [4, 7, 16],
        c2: [7, 16, 34],
        c3: [5, 9, 20],
      },
      middle: {
        c1: [2, 4, 8],
        c2: [5, 7, 13],
        c3: [3, 4, 7],
      },
      bottom: {
        c1: [7, 10, 18],
        c2: [15, 23, 38],
        c3: [28, 38, 58],
      },
    };

    const lerpColor = (cA: number[], cB: number[], t: number) => [
      Math.round(cA[0] + (cB[0] - cA[0]) * t),
      Math.round(cA[1] + (cB[1] - cA[1]) * t),
      Math.round(cA[2] + (cB[2] - cA[2]) * t),
    ];

    let scrollY = 0;
    let scrollProgress = 0;

    const updateScrollMetrics = () => {
      scrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

      // Update gradient
      let c1: number[], c2: number[], c3: number[];
      if (scrollProgress <= 0.5) {
        const t = scrollProgress / 0.5;
        c1 = lerpColor(stops.top.c1, stops.middle.c1, t);
        c2 = lerpColor(stops.top.c2, stops.middle.c2, t);
        c3 = lerpColor(stops.top.c3, stops.middle.c3, t);
      } else {
        const t2 = (scrollProgress - 0.5) / 0.5;
        c1 = lerpColor(stops.middle.c1, stops.bottom.c1, t2);
        c2 = lerpColor(stops.middle.c2, stops.bottom.c2, t2);
        c3 = lerpColor(stops.middle.c3, stops.bottom.c3, t2);
      }

      gradientEl.style.background = `linear-gradient(180deg, rgb(${c1.join(",")}) 0%, rgb(${c2.join(",")}) 50%, rgb(${c3.join(",")}) 100%)`;
    };

    updateScrollMetrics();

    // Artemis Moon
    const drawMoon = (progressRatio: number) => {
      const threshold = 0.7;
      if (progressRatio < threshold) return;

      const progress = Math.min(1, Math.max(0, (progressRatio - threshold) / (1 - threshold)));
      if (progress <= 0) return;

      const radius = Math.min(width, height) * (width < 768 ? 0.24 : 0.28);
      const cx = width * 0.86;
      const cy = height * 0.74 + (1 - progress) * 80;

      ctx.save();

      // Atmospheric outer glow
      const haloGrad = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.6);
      haloGrad.addColorStop(0, `rgba(226, 232, 240, ${0.12 * progress})`);
      haloGrad.addColorStop(0.5, `rgba(186, 230, 253, ${0.05 * progress})`);
      haloGrad.addColorStop(1, "rgba(186, 230, 253, 0)");
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Moon disc clip
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      // Lunar surface lighting
      const moonGrad = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.35,
        radius * 0.08,
        cx,
        cy,
        radius
      );
      moonGrad.addColorStop(0, `rgba(255, 255, 255, ${0.95 * progress})`);
      moonGrad.addColorStop(0.35, `rgba(226, 232, 240, ${0.90 * progress})`);
      moonGrad.addColorStop(0.75, `rgba(148, 163, 184, ${0.85 * progress})`);
      moonGrad.addColorStop(1, `rgba(71, 85, 105, ${0.80 * progress})`);
      ctx.fillStyle = moonGrad;
      ctx.fill();

      // Craters & Lunar Maria
      const craters = [
        { dx: -0.25, dy: -0.22, r: 0.28, alpha: 0.12 },
        { dx: -0.05, dy: -0.42, r: 0.20, alpha: 0.10 },
        { dx: 0.22, dy: -0.15, r: 0.18, alpha: 0.09 },
        { dx: -0.32, dy: 0.18, r: 0.24, alpha: 0.11 },
        { dx: 0.08, dy: 0.25, r: 0.22, alpha: 0.13 },
        { dx: 0.35, dy: 0.32, r: 0.14, alpha: 0.08 },
      ];

      for (let c = 0; c < craters.length; c++) {
        const cr = craters[c];
        const crX = cx + cr.dx * radius;
        const crY = cy + cr.dy * radius;
        const crR = cr.r * radius;

        const crGrad = ctx.createRadialGradient(crX, crY, crR * 0.2, crX, crY, crR);
        crGrad.addColorStop(0, `rgba(51, 65, 85, ${cr.alpha * progress})`);
        crGrad.addColorStop(0.8, `rgba(71, 85, 105, ${cr.alpha * 0.6 * progress})`);
        crGrad.addColorStop(1, "rgba(148, 163, 184, 0)");

        ctx.fillStyle = crGrad;
        ctx.beginPath();
        ctx.arc(crX, crY, crR, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    // Animation loop
    let animId: number;
    let isRunning = true;
    let lastTime = performance.now();

    const loop = (timestamp: number) => {
      if (!isRunning) return;

      const dt = Math.min((timestamp - lastTime) * 0.001, 0.1);
      lastTime = timestamp;
      const timeSec = timestamp * 0.001;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw starfield with depth parallax
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const parallaxY = prefersReducedMotion ? star.y : star.y - scrollY * star.speedFactor;
        let renderY = parallaxY % height;
        if (renderY < 0) renderY += height;

        const twinkle = 0.85 + 0.15 * Math.sin(timeSec * star.twinkleSpeed + star.twinklePhase);
        const alpha = star.baseAlpha * twinkle;

        ctx.fillStyle = `rgba(${star.color}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(star.x, renderY, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Shooting stars
      if (timeSec - lastShootingStarTime > nextShootingStarDelay) {
        spawnShootingStar();
        lastShootingStarTime = timeSec;
        nextShootingStarDelay = 10 + Math.random() * 8;
      }

      for (let s = shootingStars.length - 1; s >= 0; s--) {
        const ss = shootingStars[s];
        ss.progress += dt / ss.totalLife;

        if (ss.progress >= 1) {
          shootingStars.splice(s, 1);
          continue;
        }

        const currentDist = ss.progress * ss.speed;
        const headX = ss.x + ss.dx * currentDist;
        const headY = ss.y + ss.dy * currentDist;
        const tailX = headX - ss.dx * ss.length;
        const tailY = headY - ss.dy * ss.length;

        const ssGrad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        ssGrad.addColorStop(0, "rgba(56, 189, 248, 0)");
        ssGrad.addColorStop(0.7, "rgba(0, 229, 255, 0.7)");
        ssGrad.addColorStop(1, "rgba(255, 255, 255, 1)");

        ctx.strokeStyle = ssGrad;
        ctx.lineWidth = 1.8;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();
      }

      // 3. Moon
      drawMoon(scrollProgress);

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(loop);
      }
    };

    animId = requestAnimationFrame(loop);

    // Event listeners
    const handleScroll = () => {
      updateScrollMetrics();
    };

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initDimensions();
        generateStars();
        updateScrollMetrics();
      }, 100);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        isRunning = false;
      } else {
        isRunning = true;
        lastTime = performance.now();
        animId = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div
      id="space-background"
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* 1. Dynamic CSS gradient */}
      <div
        id="space-gradient-layer"
        ref={gradientRef}
        className="absolute inset-0 w-full h-full transition-colors duration-200 pointer-events-none"
      />

      {/* 2. Vector SVG Orbits & Satellites with continuous rotation */}
      <svg
        id="space-orbits-layer"
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="sat-glow-react" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00E5FF" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Orbit 1: NASA Cyan (clockwise rotation) */}
        <g className="space-orbit-group-1">
          <ellipse
            cx="960"
            cy="540"
            rx="760"
            ry="360"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="1"
            strokeDasharray="4 12"
            opacity="0.16"
            transform="rotate(-16 960 540)"
          />
          {/* Satellite A */}
          <g transform="translate(1680, 540) rotate(-16)">
            <rect x="-18" y="-3.5" width="10" height="7" rx="1" fill="#00E5FF" opacity="0.85" filter="url(#sat-glow-react)" />
            <rect x="8" y="-3.5" width="10" height="7" rx="1" fill="#00E5FF" opacity="0.85" filter="url(#sat-glow-react)" />
            <rect x="-6" y="-5" width="12" height="10" rx="2" fill="#FFFFFF" />
            <circle cx="0" cy="0" r="2" fill="#00E5FF" />
            <line x1="0" y1="-5" x2="0" y2="-9" stroke="#E2E8F0" strokeWidth="1.2" />
            <circle cx="0" cy="-9" r="1.2" fill="#10B981" />
          </g>
        </g>

        {/* Orbit 2: NASA Sky Blue (counter-clockwise rotation) */}
        <g className="space-orbit-group-2">
          <ellipse
            cx="960"
            cy="540"
            rx="920"
            ry="430"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.2"
            strokeDasharray="6 16"
            opacity="0.14"
            transform="rotate(26 960 540)"
          />
          {/* Satellite B */}
          <g transform="translate(80, 540) rotate(26)">
            <rect x="-14" y="-3" width="8" height="6" rx="1" fill="#38BDF8" opacity="0.8" />
            <rect x="6" y="-3" width="8" height="6" rx="1" fill="#38BDF8" opacity="0.8" />
            <rect x="-5" y="-4" width="10" height="8" rx="1.5" fill="#F1F5F9" />
            <circle cx="0" cy="0" r="1.5" fill="#38BDF8" />
          </g>
        </g>

        {/* Orbit 3: Distant faint orbit */}
        <ellipse
          cx="960"
          cy="540"
          rx="1080"
          ry="500"
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="0.8"
          strokeDasharray="2 20"
          transform="rotate(-6 960 540)"
        />
      </svg>

      {/* 3. Interactive canvas */}
      <canvas
        id="space-stars-canvas"
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
