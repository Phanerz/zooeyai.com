"use client";

import Link from "next/link";
import Image from "next/image";
import { StarButton } from "@/components/ui/star-button";

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Features",  href: "/#how-it-works" },
      { label: "Pricing",   href: "/pricing" },
      { label: "Download",  href: "/download" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "FAQs",      href: "/faqs" },
      { label: "Changelog", href: "/updates" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",     href: "/about" },
      { label: "Contact",   href: "https://wa.me/6281125001888" },
      { label: "Instagram", href: "https://instagram.com/zooey.ai" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-[rgba(3,5,4,0.60)] backdrop-blur-2xl">

      {/* ── Download CTA section ── */}
      <div className="shell py-20 md:py-24">
        <div
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[rgba(7,11,7,0.55)] p-8 backdrop-blur-xl md:p-12"
          style={{
            boxShadow:
              "0 0 0 1px rgba(74,222,128,0.08), 0 32px 80px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Ambient top glow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-[480px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(74,222,128,0.09),transparent_70%)]" />

          <div className="relative z-10 flex flex-col items-center gap-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-green-300/80">
              Free Beta — v1.0.0
            </p>
            <h2
              className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl"
              style={{ textShadow: "0 0 40px rgba(74,222,128,0.22), 0 2px 20px rgba(0,0,0,0.5)" }}
            >
              Download Zooey. Free.
            </h2>
            <p className="max-w-md text-base text-white/58">
              Your AI desktop companion is ready. Windows and Mac, installed in under a minute.
            </p>
            <StarButton href="/download" variant="green" className="px-10 py-3 text-[15px]">
              Download Now
            </StarButton>
            <p className="text-[11px] text-white/30">
              Windows 10 / 11 &middot; macOS 11+ &middot; ~100 MB
            </p>
          </div>
        </div>
      </div>

      {/* ── Columns ── */}
      <div className="shell pb-12">
        <div className="grid gap-10 sm:grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_1fr_1fr]">

          {/* Brand blurb */}
          <div className="sm:col-span-1 md:col-span-1 md:pr-8">
            <Link href="/" className="group inline-flex items-center gap-3">
              <Image
                src="/zooey-icon.png"
                alt="Zooey"
                width={36}
                height={36}
                quality={85}
                loading="lazy"
                className="h-9 w-9 object-contain drop-shadow-[0_0_8px_rgba(74,222,128,0.5)] transition-transform duration-300 group-hover:scale-110"
              />
              <div>
                <Image
                  src="/zooey-text.png"
                  alt="Zooey"
                  width={120}
                  height={32}
                  quality={85}
                  loading="lazy"
                  className="h-[18px] w-auto object-contain drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] transition-all duration-300 group-hover:drop-shadow-[0_0_16px_rgba(74,222,128,0.85)] group-hover:scale-[1.04] group-hover:brightness-110"
                />
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/40">
                  AI Desktop Pet
                </p>
              </div>
            </Link>
            <p className="mt-4 max-w-[200px] text-sm leading-6 text-white/45">
              Your AI assistant, always on screen.
            </p>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/35">
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    {href.startsWith("http") ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/55 transition-colors duration-200 hover:text-white"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="text-sm text-white/55 transition-colors duration-200 hover:text-white"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.06]">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-xs text-white/30">
            © 2026 Zooey. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-xs text-white/30 transition hover:text-white/60">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-xs text-white/30 transition hover:text-white/60">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
