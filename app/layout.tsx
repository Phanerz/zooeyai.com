import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/next";
import { PlasmaWeb } from "@/components/ui/cosmic-plasma-web";
import { Header } from "@/components/landing/header";
import { ConditionalFooter } from "@/components/landing/conditional-footer";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"]
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Zooey",
  description: "Zooey lives on your screen and executes desktop tasks instantly."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} font-sans text-white antialiased`}
        style={{ background: "#050608" }}
      >
        {/* Plasma background — fixed, behind everything */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <PlasmaWeb
            hueShift={130}
            density={1.2}
            glowIntensity={1.0}
            saturation={0.8}
            brightness={0.55}
            energyFlow={1.2}
            pulseIntensity={0.3}
            attractionStrength={2.0}
            mouseAttraction={true}
            transparent={false}
            mouseInteraction={true}
          />
        </div>

        {/* Global header — visible immediately on all non-home pages */}
        <Header />

        {/* Page content */}
        {children}

        {/* Global footer — hidden on /waitlist */}
        <ConditionalFooter />

        {/* Persistent Zooey corner icon */}
        <div className="pointer-events-none fixed bottom-6 right-6 z-50 w-20 md:bottom-0 md:right-16 md:w-32">
          <Image
            src="/zooey-icon.png"
            alt="Zooey"
            width={144}
            height={144}
            className="h-auto w-full animate-float object-contain drop-shadow-[0_0_22px_rgba(74,222,128,0.35)]"
          />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
