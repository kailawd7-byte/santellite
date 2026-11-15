"use client";

import React, { useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, Video, CheckCircle2, Film, Clock, Sparkles } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  category: string;
  poster: string;
  src: string;
  description: string;
  keyPoints: string[];
}

export default function VideoSection() {
  const videos: VideoItem[] = [
    {
      id: "demo-vitaorbit",
      title: "Démonstration Complète : Le Cockpit VitaOrbit en Condition de Vol",
      subtitle: "Surveillance autonome de l'équipage Artemis III et détection d'anomalie",
      duration: "03:45",
      category: "Prototype Logiciel",
      poster: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200&auto=format&fit=crop",
      src: "https://assets.mixkit.co/videos/preview/mixkit-star-field-in-deep-space-32960-large.mp4",
      description: "Ce reportage illustre le fonctionnement en direct du logiciel VitaOrbit à bord du module habité. Vous observerez la capture continue de la pression artérielle et l'algorithme qui déclenche l'alarme en moins de 0.8 seconde.",
      keyPoints: [
        "Visualisation de la silhouette anatomique en direct",
        "Ingestion des signaux sans latence Terre",
        "Protocole d'évacuation guidé pas-à-pas",
      ],
    },
    {
      id: "iot-astroskin",
      title: "L'Écosystème IoT : Maillot Astroskin & Montre Biomédicale",
      subtitle: "Comment mesurer la pression artérielle continue sans gonfler de brassard",
      duration: "04:12",
      category: "Dispositifs Portés",
      poster: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop",
      src: "https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-starfield-in-space-32961-large.mp4",
      description: "Focus technique sur l'instrumentation biomédicale embarquée : fonctionnement du temps de transit d'onde de pouls (PTT) pour la tension artérielle, connectivité Bluetooth 5.3 Low Energy et capteurs cutanés de stress (GSR).",
      keyPoints: [
        "Électrocardiogramme 3 dérivations capacitif",
        "Suppression des artéfacts de mouvement",
        "Retours haptiques au poignet de l'astronaute",
      ],
    },
    {
      id: "pitch-404",
      title: "Pitch Officiel : Équipe 404 Introuvable — Libreville 2026",
      subtitle: "Présentation de la solution pour le NASA Space Apps Challenge",
      duration: "02:30",
      category: "Pitch Hackathon",
      poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop",
      src: "https://assets.mixkit.co/videos/preview/mixkit-traveling-through-star-fields-in-deep-space-32964-large.mp4",
      description: "L'équipe 404 Introuvable, réunie à Libreville (Gabon), expose la genèse du projet Santellite, l'exploitation des données ouvertes NASA OSDR / GeneLab / LSDA et l'impact direct pour les futures missions martiennes.",
      keyPoints: [
        "Résolution du défi d'autonomie médicale lointaine",
        "Architecture 100% numérique et sobre en ressources",
        "Vision panafricaine des technologies aérospatiales",
      ],
    },
  ];

  const [activeVideo, setActiveVideo] = useState<VideoItem>(videos[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const togglePlay = () => {
    const videoEl = document.getElementById("main-featured-video") as HTMLVideoElement | null;
    if (!videoEl) return;
    if (videoEl.paused) {
      videoEl.play();
      setIsPlaying(true);
    } else {
      videoEl.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const videoEl = document.getElementById("main-featured-video") as HTMLVideoElement | null;
    if (!videoEl) return;
    videoEl.muted = !videoEl.muted;
    setIsMuted(videoEl.muted);
  };

  const handleSelectVideo = (video: VideoItem) => {
    setActiveVideo(video);
    setIsPlaying(false);
    const videoEl = document.getElementById("main-featured-video") as HTMLVideoElement | null;
    if (videoEl) {
      videoEl.load();
    }
  };

  return (
    <section id="video-hub" className="py-24 relative overflow-hidden bg-[#090d16]/70 border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 mb-3">
            <Film className="w-3.5 h-3.5" />
            Espace Vidéos & Démonstrations en Vol
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Le logiciel et ses capteurs en immersion vidéo
          </h2>
          <p className="text-slate-300 mt-4 text-base sm:text-lg">
            Découvrez comment VitaOrbit transforme les signaux bruts des capteurs corporels en décisions cliniques immédiates à travers nos capsules de démonstration et notre pitch de projet.
          </p>
        </div>

        {/* Video Theatre Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Screen (Col 8) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl shadow-cyan-950/30 group">
              {/* Cockpit HUD Overlay Banner */}
              <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-mono font-semibold tracking-wider uppercase text-white/90">
                    LECTEUR VIDÉO • TÉLÉMÉTRIE VITAORBIT
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-mono">
                  {activeVideo.category}
                </span>
              </div>

              {/* Video Player Element */}
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <video
                  id="main-featured-video"
                  poster={activeVideo.poster}
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src={activeVideo.src} type="video/mp4" />
                  Votre navigateur ne supporte pas la balise vidéo HTML5.
                </video>

                {/* Big Center Play Button Overlay */}
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white flex items-center justify-center shadow-2xl shadow-cyan-500/50 hover:scale-110 active:scale-95 transition-all"
                    aria-label="Lire la vidéo"
                  >
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
                  </button>
                )}
              </div>

              {/* Custom Bottom Controls Bar */}
              <div className="p-4 bg-slate-900/95 border-t border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
                    aria-label={isPlaying ? "Mettre en pause" : "Lire"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
                    aria-label={isMuted ? "Activer le son" : "Couper le son"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                  </button>

                  <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Durée : {activeVideo.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                    Résolution : <strong>1080p Spatiale</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Video Meta Info */}
            <div className="p-6 rounded-2xl glass-panel text-left">
              <h3 className="text-xl font-bold text-white">{activeVideo.title}</h3>
              <p className="text-sm font-medium text-cyan-300 mt-1">{activeVideo.subtitle}</p>
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">{activeVideo.description}</p>

              <div className="mt-4 pt-4 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Points clés abordés :</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeVideo.keyPoints.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Playlist Column (Col 4) */}
          <div className="lg:col-span-4 space-y-3 text-left">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Video className="w-4 h-4 text-cyan-400" />
              Sélectionnez une Vidéo ({videos.length})
            </h3>

            {videos.map((vid) => {
              const isActive = vid.id === activeVideo.id;
              return (
                <div
                  key={vid.id}
                  onClick={() => handleSelectVideo(vid)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex gap-3.5 ${
                    isActive
                      ? "bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                      : "glass-panel hover:bg-white/5 border-white/5 hover:border-white/15"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                    <img src={vid.poster} alt={vid.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isActive ? "bg-cyan-400 text-black" : "bg-white/80 text-black"}`}>
                        <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-1 right-1 px-1 rounded bg-black/80 font-mono text-[9px] text-white">
                      {vid.duration}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono font-semibold uppercase text-cyan-400 block mb-0.5">
                      {vid.category}
                    </span>
                    <h4 className="text-xs font-bold text-white line-clamp-2 leading-tight">
                      {vid.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                      {vid.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Quick Callout */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 to-blue-950/40 border border-cyan-500/20 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 font-bold text-white mb-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Format Prêt pour le Jury NASA</span>
              </div>
              Ces vidéos synthétisent l&apos;intégralité de la proposition scientifique pour les évaluateurs du NASA Space Apps Challenge 2026.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
