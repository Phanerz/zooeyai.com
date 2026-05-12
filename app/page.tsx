import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { OrbitalFeatures } from "@/components/landing/orbital-features";
import { PricingSection } from "@/components/landing/pricing-section";
import { DownloadShowcase } from "@/components/ui/download-options-section";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <HowItWorks />
      <OrbitalFeatures />
      <DownloadShowcase />
      <PricingSection />
    </main>
  );
}
