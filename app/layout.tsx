import type { Metadata, Viewport } from "next";
import { Analytics } from '@vercel/analytics/react';
import { headers } from "next/headers";
import { Manrope, Space_Grotesk } from "next/font/google";
import { PlasmaWeb } from "@/components/ui/cosmic-plasma-web";
import { Header } from "@/components/landing/header";
import { ConditionalFooter } from "@/components/landing/conditional-footer";
import { ZooeyChatbot } from "@/components/ui/zooey-chatbot";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Allow content to extend under the notch/home indicator on iPhone X+
  viewportFit: "cover",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const ua = headersList.get("user-agent") ?? "";
  // iPhone / iPod / iPad (standard UA) + iPadOS 13+ desktop mode (sends Macintosh UA with Mobile/)
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (/Macintosh|Mac OS X/.test(ua) && /Mobile\//.test(ua));

  return (
    <html lang="en" className={isIOS ? "ios" : undefined}>
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
            mouseAttraction={false}
            transparent={false}
            mouseInteraction={false}
          />
        </div>

        {/* Global header — visible immediately on all non-home pages */}
        <Header />

        {/* Page content */}
        {children}

        {/* Global footer — hidden on /waitlist */}
        <ConditionalFooter />

        {/* Persistent Zooey chatbot */}
        <ZooeyChatbot />
        <Analytics />
      </body>
    </html>
  );
}
