import HeroSection from "@/components/HeroSection";
import PolicyGeneratorTool from "@/components/PolicyGeneratorTool";
import HowToUseSection from "@/components/HowToUseSection";
import WhyUseSection from "@/components/WhyUseSection";
import MetricsSection from "@/components/MetricsSection";
import FAQSection from "@/components/FAQSection";
import FooterSection from "@/components/FooterSection";

const Index = () => (
  <div className="min-h-screen bg-background">
    <HeroSection />
    <PolicyGeneratorTool />
    <HowToUseSection />
    <WhyUseSection />
    <MetricsSection />
    <FAQSection />
    <FooterSection />
  </div>
);

export default Index;
