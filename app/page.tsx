import { ClosingCta } from "@/components/landing/closing-cta";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { OrbitalFeatures } from "@/components/landing/orbital-features";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-abyss">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.16),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(111,120,255,0.18),transparent_18%),linear-gradient(180deg,#050608_0%,#040507_100%)]" />
      <Header />
      <Hero />
      <OrbitalFeatures />
      <ClosingCta />
      <Footer />
    </main>
  );
}
