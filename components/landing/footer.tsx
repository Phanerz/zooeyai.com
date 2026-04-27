"use client";

import { useState } from "react";
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
  const [email,   setEmail]   = useState("");
  const [status,  setStatus]  = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 700);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit(e as unknown as React.FormEvent);
  };

  return (
    <footer className="relative border-t border-white/[0.07] bg-[rgba(3,5,4,0.60)] backdrop-blur-2xl">

      {/* ── Keyframe styles for success animation ── */}
      <style>{`
        @keyframes ft-success-pop {
          0%   { transform: scale(0.82); opacity: 0; }
          55%  { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes ft-success-glow {
          0%, 100% { box-shadow: 0 0 22px rgba(74,222,128,0.4); }
          50%       { box-shadow: 0 0 60px rgba(74,222,128,0.75), 0 0 110px rgba(74,222,128,0.35); }
        }
        @keyframes ft-ring-burst {
          0%   { transform: translate(-50%,-50%) scale(0.85); opacity: 0.9; }
          100% { transform: translate(-50%,-50%) scale(2.1);  opacity: 0; }
        }
        @keyframes ft-draw-check {
          from { stroke-dashoffset: 24; }
          to   { stroke-dashoffset: 0; }
        }
        .ft-success-pop  { animation: ft-success-pop  0.55s cubic-bezier(0.175,0.885,0.32,1.275) forwards; }
        .ft-success-glow { animation: ft-success-glow 2.2s ease-in-out infinite; }
        .ft-ring-burst   { animation: ft-ring-burst   0.85s ease-out forwards; }
        .ft-draw-check   { stroke-dasharray: 24; stroke-dashoffset: 24; animation: ft-draw-check 0.38s ease-out 0.28s forwards; }
      `}</style>

      {/* ── Waitlist section ── */}
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
              Early Access
            </p>
            <h2
              className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl"
              style={{ textShadow: "0 0 40px rgba(74,222,128,0.22), 0 2px 20px rgba(0,0,0,0.5)" }}
            >
              Be the first to meet Zooey.
            </h2>
            <p className="max-w-md text-base text-white/58">
              Join the waitlist and get early access the moment Zooey goes public.
            </p>

            {/* Form / success — pill design matching /waitlist */}
            <div className="relative h-[60px] w-full max-w-[440px]">

              {/* SUCCESS pill */}
              <div
                className={`absolute inset-0 flex items-center justify-center overflow-hidden rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  status === "success"
                    ? "pointer-events-auto opacity-100 ft-success-pop ft-success-glow"
                    : "pointer-events-none opacity-0"
                }`}
                style={{ backgroundColor: "#16a34a" }}
              >
                {status === "success" && (
                  <>
                    <div className="absolute left-1/2 top-1/2 h-full w-full rounded-full border-2 border-green-400 ft-ring-burst" style={{ animationDelay: "0s" }} />
                    <div className="absolute left-1/2 top-1/2 h-full w-full rounded-full border-2 border-green-300 ft-ring-burst" style={{ animationDelay: "0.16s" }} />
                    <div className="absolute left-1/2 top-1/2 h-full w-full rounded-full border-2 border-green-200 ft-ring-burst" style={{ animationDelay: "0.30s" }} />
                  </>
                )}
                <div className="flex items-center gap-2 text-white">
                  <div className="rounded-full bg-white/20 p-1">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        className={status === "success" ? "ft-draw-check" : ""}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold">You&apos;re on the list!</span>
                </div>
              </div>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className={`relative h-full w-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  status === "success" ? "pointer-events-none opacity-0" : "opacity-100"
                }`}
              >
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  disabled={status === "loading"}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKey}
                  className="h-full w-full rounded-full border border-white/10 bg-[rgba(7,11,7,0.65)] pl-6 pr-[148px] text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-green-400/40 focus:bg-[rgba(12,20,12,0.7)] disabled:opacity-60"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)" }}
                />
                <div className="absolute bottom-[6px] right-[6px] top-[6px]">
                  <StarButton
                    type="submit"
                    variant="green"
                    disabled={status === "loading"}
                    className="h-full min-w-[124px] rounded-full px-5 text-[13px] font-bold tracking-wide disabled:cursor-wait"
                  >
                    {status === "loading" ? (
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      "Join Waitlist"
                    )}
                  </StarButton>
                </div>
              </form>
            </div>
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
                className="h-9 w-9 object-contain drop-shadow-[0_0_8px_rgba(74,222,128,0.5)] transition-transform duration-300 group-hover:scale-110"
              />
              <div>
                <Image
                  src="/zooey-text.png"
                  alt="Zooey"
                  width={120}
                  height={32}
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
            <Link href="#" className="text-xs text-white/30 transition hover:text-white/60">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-white/30 transition hover:text-white/60">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
