import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import Image from "next/image";
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
    <html lang="en" className="bg-abyss">
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} bg-abyss font-sans text-white antialiased`}
      >
        {children}
        <div className="pointer-events-none fixed bottom-6 right-6 z-50 w-20 md:bottom-0 md:right-16 md:w-32">
          <Image
            src="/zooey-icon.png"
            alt="Zooey"
            width={144}
            height={144}
            className="h-auto w-full animate-float object-contain drop-shadow-[0_0_22px_rgba(74,222,128,0.35)]"
          />
        </div>
      </body>
    </html>
  );
}
