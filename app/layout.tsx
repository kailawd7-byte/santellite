import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Santellite : VitaOrbit — Surveillance Médicale Spatiale & IoT Temps Réel | NASA Space Apps 2026",
  description: "Plateforme clinique de télémétrie autonome et surveillance continue connectée aux dispositifs médicaux (Astroskin, montres biomédicales, patchs) pour astronautes en mission lunaire et martienne.",
  keywords: ["NASA Space Apps", "Santellite", "VitaOrbit", "Astronaut Health", "IoT Médical", "Télémétrie Spatiale", "Astroskin"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Santellite : VitaOrbit — NASA Space Apps Challenge 2026",
    description: "Hub médical autonome pour astronautes en espace profond : IoT temps réel, tension artérielle continue et alertes instantanées.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="bg-[#060911] text-slate-100 antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
        {children}
      </body>
    </html>
  );
}
