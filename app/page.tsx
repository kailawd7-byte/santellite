import Navbar from "@/components/Navbar";
import HeroWithVideo from "@/components/HeroWithVideo";
import NasaChallengeSection from "@/components/NasaChallengeSection";
import ConnectedDevicesSection from "@/components/ConnectedDevicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TelemetrySimulator from "@/components/TelemetrySimulator";
import NasaDataSection from "@/components/NasaDataSection";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";
import SpaceBackground from "@/components/SpaceBackground";

export default function Home() {
  return (
    <>
      <SpaceBackground />
      <main className="min-h-screen bg-transparent text-slate-100 flex flex-col selection:bg-white/20 selection:text-white relative z-10">
        <ScrollRevealProvider />
        <Navbar />
        <HeroWithVideo />
        <NasaChallengeSection />
        <ConnectedDevicesSection />
        <HowItWorksSection />
        <TelemetrySimulator />
        <NasaDataSection />
        <TeamSection />
        <Footer />
      </main>
    </>
  );
}
