import { FaqSection } from "@/components/landing/faq-section";

export const metadata = {
  title: "FAQs | Zooey",
  description: "Everything you need to make a decision you will not regret.",
};

export default function FaqsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <FaqSection />
    </main>
  );
}
