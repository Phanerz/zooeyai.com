import type { Metadata } from "next";
import { PricingSection } from "@/components/landing/pricing-section";

export const metadata: Metadata = {
  title: "Pricing | Zooey",
  description: "Adopt your Zooey. Start free, upgrade when you are ready.",
};

export default function PricingPage() {
  return (
    <main className="relative min-h-screen pt-[72px]">
      <div className="[&>section]:pt-6">
        <PricingSection />
      </div>
    </main>
  );
}
