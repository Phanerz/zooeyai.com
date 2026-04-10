import type { Metadata, Viewport } from "next";
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
  viewportFit: "cover",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  /*
   * Server-side iOS detection — the most reliable approach.
   * We read the User-Agent from the incoming request header and stamp
   * class="ios" directly onto <html> in the server-rendered HTML.
   *
   * This means:
   *   • The CSS in globals.css targeting html.ios fires from byte 1
   *     (before any JavaScript, before any React hydration)
   *   • useIsIOS() can read document.documentElement.classList synchronously
   *     in its useState lazy initializer, getting the correct value on the
   *     very first client render — not after an async useEffect
   *
   * Every browser on iOS (Safari, Chrome, Opera, Firefox) uses WebKit and
   * reports one of these UA strings.
   */
  const headersList = await headers();
  const ua = headersList.get("user-agent") ?? "";
  const isAppleMobile =
    /iPad|iPhone|iPod/.test(ua) ||
    // iPad in desktop mode reports Mac-like tokens while still sending Mobile/
    (/Macintosh|Mac OS X/.test(ua) && /Mobile\//.test(ua));
  const isMacDesktop = /Macintosh|Mac OS X/.test(ua);
  const isAppleRequest = isAppleMobile || isMacDesktop;

  return (
    <html lang="en" className={isAppleRequest ? "ios" : undefined}>
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

        <Header />
        {children}
        <ConditionalFooter />
        <ZooeyChatbot />
      </body>
    </html>
  );
}
