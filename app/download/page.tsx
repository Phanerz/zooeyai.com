"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── FAQ data ───────────────────────────────────────────────────────────────── */
const faqs = [
  {
    category: "ACCOUNT",
    question: "Do I need an API key?",
    answer:
      "No — Zooey works out of the box with your free account, no key required. That said, you can optionally add your own API key in Settings if you prefer to use a specific provider or higher quota. Your key is stored locally on your device only and never sent to our servers, so it stays completely private.",
  },
  {
    category: "PRICING",
    question: "Is it really free?",
    answer:
      "Yes, the base tier is genuinely free with no time limit. Premium tiers with higher usage limits and additional features are coming soon, but the free tier will always exist.",
  },
  {
    category: "WINDOWS",
    question: "Why does Windows show a security warning?",
    answer:
      "Zooey is a new application and does not yet have a paid code-signing certificate, so Windows SmartScreen flags it as unrecognized. It is completely safe to run. When the warning appears, click \"More info\" and then \"Run anyway\" to proceed.",
  },
  {
    category: "PRIVACY",
    question: "Is my data private?",
    answer:
      "Yes. Conversations and on-screen content are processed to generate responses but are not stored on our servers after the session ends. Your files and clipboard are never uploaded without an explicit action on your part.",
  },
];

/* ─── Glow helpers ───────────────────────────────────────────────────────────── */
const setGlow = (e: React.MouseEvent<HTMLLIElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--gx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--gy", `${e.clientY - r.top}px`);
};
const clearGlow = (e: React.MouseEvent<HTMLLIElement>) => {
  e.currentTarget.style.removeProperty("--gx");
  e.currentTarget.style.removeProperty("--gy");
};

/* ─── SVG logos ──────────────────────────────────────────────────────────────── */
function AppleLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 814 1000"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-167.2-118.3C20.7 782 0 637.1 0 503.6 0 281.2 144.9 163.3 287.5 163.3c74.9 0 137.2 49.1 184.6 49.1 45.5 0 117.7-52.4 201.9-52.4 32.3 0 108.2 2.6 168.3 62.9zm-41.1-178.9c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
  );
}

function WindowsLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 88 88"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349l-.011 41.34-47.318-6.678-.066-34.739z" />
    </svg>
  );
}

/* ─── Platform download buttons ──────────────────────────────────────────────── */
function PlatformButtons() {
  const [activeGlow, setActiveGlow] = useState<"mac" | "win">("mac");

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveGlow((prev) => (prev === "mac" ? "win" : "mac"));
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const macActive = activeGlow === "mac";
  const winActive = activeGlow === "win";

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
      {/* Mac button */}
      <a
        href="#mac-download"
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border-2 border-red-500 px-9 py-3.5 text-[15px] font-bold tracking-wide transition-all duration-500 hover:bg-transparent hover:text-red-400"
        style={{
          background: macActive ? "rgba(239,68,68,0.92)" : "rgba(239,68,68,0.10)",
          color: macActive ? "#0a0a0a" : "rgba(239,68,68,0.85)",
          boxShadow: macActive
            ? "0 0 28px rgba(239,68,68,0.60), 0 0 56px rgba(239,68,68,0.25), inset 0 1px 0 rgba(255,255,255,0.15)"
            : "0 0 0px rgba(239,68,68,0)",
          transition:
            "box-shadow 0.6s ease, background 0.6s ease, color 0.6s ease",
        }}
      >
        <AppleLogo className="h-[17px] w-[17px] shrink-0" />
        Download for Mac
      </a>

      {/* Windows button */}
      <a
        href="#win-download"
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border-2 border-blue-500 px-9 py-3.5 text-[15px] font-bold tracking-wide transition-all duration-500 hover:bg-transparent hover:text-blue-400"
        style={{
          background: winActive ? "rgba(59,130,246,0.92)" : "rgba(59,130,246,0.10)",
          color: winActive ? "#0a0a0a" : "rgba(99,160,255,0.85)",
          boxShadow: winActive
            ? "0 0 28px rgba(59,130,246,0.60), 0 0 56px rgba(59,130,246,0.25), inset 0 1px 0 rgba(255,255,255,0.15)"
            : "0 0 0px rgba(59,130,246,0)",
          transition:
            "box-shadow 0.6s ease, background 0.6s ease, color 0.6s ease",
        }}
      >
        <WindowsLogo className="h-[15px] w-[15px] shrink-0" />
        Download for Windows
      </a>
    </div>
  );
}

/* ─── Scroll to top button ───────────────────────────────────────────────────── */
function ScrollToTopButton() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <a
      href="#top"
      onClick={handleClick}
      className="group inline-flex items-center gap-2.5 rounded-full border-2 border-cyan-400/70 bg-cyan-400/10 px-8 py-3 text-[15px] font-bold tracking-wide text-cyan-300 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/20 hover:shadow-[0_0_24px_rgba(34,211,238,0.45)]"
    >
      <svg
        className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
      Back to Top
    </a>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */
export default function DownloadPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <main id="top" className="relative min-h-screen overflow-hidden">

      {/* ── Hero ── */}
      <section className="relative w-full pt-40 pb-20">
        <div className="shell">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="flex flex-col items-center gap-10 text-center"
          >
            {/* Early access pill */}
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/[0.08] px-5 py-2 text-[10px] uppercase tracking-[0.38em] text-cyan-300/90">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)]" />
              Early Access
            </span>

            <div className="space-y-5">
              <h1
                className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
                style={{
                  textShadow:
                    "0 0 40px rgba(34,211,238,0.22), 0 0 80px rgba(34,211,238,0.10), 0 2px 20px rgba(0,0,0,0.6)",
                }}
              >
                Download Zooey
              </h1>
              <p className="mx-auto max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                Your AI desktop companion, installed in under a minute.
                No terminal commands, no config files — just run the installer and you are ready.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <PlatformButtons />
              <p className="text-[11px] uppercase tracking-[0.32em] text-white/45">
                Windows 10 / 11 &middot; macOS 11+ &middot; Free to start &middot; ~100 MB
              </p>
              <span className="rounded-full border border-cyan-400/20 bg-black/30 px-5 py-1.5 text-[10px] uppercase tracking-[0.35em] text-cyan-300/65 backdrop-blur-md">
                v1.0.0 &middot; Early Access
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── System requirements + Install guide ── */}
      <section className="w-full pb-16">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-2">

            {/* System requirements */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6, ease: EASE }}
              className="panel-surface relative p-8"
              style={{
                boxShadow:
                  "0 24px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Top accent line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

              <p className="mb-6 text-[10px] uppercase tracking-[0.38em] text-cyan-300/80">
                System Requirements
              </p>

              <ul className="space-y-4">
                {[
                  {
                    label: "Operating System",
                    value: "Windows 10 / 11 (64-bit) or macOS 11 Big Sur and later",
                  },
                  { label: "RAM", value: "8 GB minimum · 16 GB recommended" },
                  { label: "Storage", value: "200 MB free space" },
                  { label: "Download Size", value: "~100 MB" },
                  { label: "Internet", value: "Required for AI features" },
                ].map(({ label, value }) => (
                  <li
                    key={label}
                    className="flex flex-col gap-1 border-b border-white/[0.07] pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                  >
                    <span className="shrink-0 text-sm text-white/50">{label}</span>
                    <span className="text-sm font-medium leading-snug text-white/85 sm:text-right">
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Install guide */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
              className="panel-surface relative p-8"
              style={{
                boxShadow:
                  "0 24px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Top accent line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-green-400/50 to-transparent" />

              <p className="mb-6 text-[10px] uppercase tracking-[0.38em] text-green-300/80">
                Install Guide
              </p>

              <ol className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Download for your platform",
                    body: "Choose the Mac or Windows button above. The installer is around 100 MB — a standard .exe on Windows or a .dmg on Mac.",
                  },
                  {
                    step: "02",
                    title: "Run the installer",
                    body: "On Windows, open the .exe file. SmartScreen may warn you — click \"More info\" then \"Run anyway\" to proceed. On Mac, open the .dmg, drag Zooey to Applications, then right-click and choose Open if macOS prompts you.",
                  },
                  {
                    step: "03",
                    title: "Sign in and summon Zooey",
                    body: "Create a free account or sign in. Zooey will launch on your desktop ready to go. Press Alt+P on Windows or ⌥P on Mac to summon or dismiss Zooey instantly from anywhere on your screen.",
                  },
                ].map(({ step, title, body }) => (
                  <li key={step} className="flex gap-5">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] font-display text-xs font-semibold text-white/50">
                      {step}
                    </span>
                    <div className="space-y-1.5">
                      <p className="text-sm font-semibold text-white/95">{title}</p>
                      <p className="text-sm leading-relaxed text-white/60">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="w-full pb-28">
        <div className="shell">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.6, ease: EASE }}
            className="mb-12 space-y-3"
          >
            <p className="text-[10px] uppercase tracking-[0.38em] text-green-300/75">
              Questions
            </p>
            <h2
              className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
              style={{
                textShadow:
                  "0 0 40px rgba(74,222,128,0.20), 0 0 80px rgba(74,222,128,0.10), 0 2px 20px rgba(0,0,0,0.5)",
              }}
            >
              Before you install
            </h2>
          </motion.div>

          {/* Accordion */}
          <ul className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              const btnId = `dl-faq-btn-${i}`;
              const pnlId = `dl-faq-pnl-${i}`;

              return (
                <motion.li
                  key={faq.question}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32 + i * 0.07, duration: 0.52, ease: EASE }}
                  onMouseMove={setGlow}
                  onMouseLeave={clearGlow}
                  className="glass-dark group relative overflow-hidden rounded-2xl border border-white/10 bg-[rgba(7,11,7,0.52)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5"
                  style={{
                    boxShadow:
                      "0 20px 60px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Glow follow */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(260px circle at var(--gx, 50%) var(--gy, 50%), rgba(74,222,128,0.08), transparent 70%)",
                    }}
                  />

                  {/* Open accent */}
                  {isOpen && (
                    <motion.div
                      layoutId="dl-open-accent"
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-400/70 to-transparent"
                    />
                  )}

                  <button
                    id={btnId}
                    aria-controls={pnlId}
                    aria-expanded={isOpen}
                    onClick={() => toggle(i)}
                    className="relative flex w-full items-start gap-5 px-7 py-6 text-left"
                  >
                    <span
                      className={`relative mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "border-green-400/55 bg-green-400/14 text-green-300 shadow-[0_0_14px_rgba(74,222,128,0.25)]"
                          : "border-white/15 bg-white/[0.04] text-white/55 group-hover:border-white/28 group-hover:text-white/85"
                      }`}
                    >
                      {isOpen && (
                        <span className="absolute inset-0 animate-ping rounded-full border border-green-400/30 opacity-60" />
                      )}
                      <Plus
                        className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      />
                    </span>

                    <div className="flex flex-1 flex-col gap-3">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                        <h3
                          className={`text-lg font-semibold leading-snug transition-colors duration-300 sm:text-xl ${
                            isOpen ? "text-white" : "text-white/85 group-hover:text-white"
                          }`}
                        >
                          {faq.question}
                        </h3>
                        <span className="inline-flex w-fit items-center rounded-full border border-white/12 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white/40 sm:ml-auto">
                          {faq.category}
                        </span>
                      </div>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={pnlId}
                            role="region"
                            aria-labelledby={btnId}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.36, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <p className="pb-1 pr-4 text-sm leading-relaxed text-white/68">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                </motion.li>
              );
            })}
          </ul>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-16 flex flex-col items-center gap-4"
          >
            <p className="text-sm text-white/50">Ready to give it a shot?</p>
            <ScrollToTopButton />
          </motion.div>

        </div>
      </section>

    </main>
  );
}
