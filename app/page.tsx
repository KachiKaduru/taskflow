import FooterSection from "./_components/landing-page/FooterSection";
import HeaderSection from "./_components/landing-page/HeaderSection";
import HeroSection from "./_components/landing-page/HeroSection";
import SponsorsSection from "./_components/landing-page/SponsorsSection";
import DemoSection from "./_components/landing-page/DemoSection";
import StatsSection from "./_components/landing-page/StatsSection";
import FeaturesSection from "./_components/landing-page/FeaturesSection";
import TestimonialSection from "./_components/landing-page/TestimonialSection";
import PricingSection from "./_components/landing-page/PricingSection";
import IntegrationSection from "./_components/landing-page/IntegrationSection";
import CTASection from "./_components/landing-page/CTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <HeaderSection />

      <HeroSection />

      <SponsorsSection />

      <DemoSection />

      <StatsSection />

      <FeaturesSection />

      <TestimonialSection />

      <PricingSection />

      <IntegrationSection />

      <CTASection />

      <FooterSection />
    </div>
  );
}
