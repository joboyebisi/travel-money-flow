
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Navbar transparent={true} />
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
      <Footer />
    </div>
  );
}

export default LandingPage;
