import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { IntegrationsSection } from "@/components/landing/IntegrationsSection";
import { SecuritySection } from "@/components/landing/SecuritySection";
import { ROISection } from "@/components/landing/ROISection";
import { FAQSection } from "@/components/landing/FAQSection";
import { CTASection } from "@/components/landing/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <IntegrationsSection />
      <SecuritySection />
      <ROISection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
