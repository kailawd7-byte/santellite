import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Santellite : VitaOrbit — Autonomous Space Medical Telemetry & Real-Time IoT | NASA Space Apps 2026",
  description: "Autonomous clinical telemetry and continuous health monitoring platform interconnecting 6 space medical devices (Astroskin, EmbracePlus, Actiwatch / ActLumus Artemis II, dosimeter, bone ultrasound scanner, biosensors) for deep-space astronauts.",
  keywords: ["NASA Space Apps", "Santellite", "VitaOrbit", "Astronaut Health", "Medical IoT", "Space Telemetry", "Astroskin", "EmbracePlus", "Actiwatch", "ActLumus", "Artemis II"],
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
    description: "Autonomous medical hub for deep-space astronauts: Real-time clinical IoT, continuous blood pressure, and instant emergency alerts without Earth lag.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        <script src="/space-background.js" defer></script>
      </body>
    </html>
  );
}
