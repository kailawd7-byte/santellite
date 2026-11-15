import Navbar from "@/components/Navbar";
import HeroWithVideo from "@/components/HeroWithVideo";
import NasaChallengeSection from "@/components/NasaChallengeSection";
import ConnectedDevicesSection from "@/components/ConnectedDevicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TelemetrySimulator from "@/components/TelemetrySimulator";
import NasaDataSection from "@/components/NasaDataSection";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070D] text-slate-100 flex flex-col selection:bg-blue-600/30 selection:text-cyan-300">
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
  );
}
