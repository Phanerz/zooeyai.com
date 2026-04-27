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

/* ─── Star particle (same shape as StarButton) ───────────────────────────────── */
const StarShape = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 784.11 815.53"
    className={className ?? "w-full h-auto"}
    aria-hidden="true"
  >
    <path d="M392.05 0c-20.9,210.08-184.06,378.41-392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93-210.06 184.09-378.37 392.05-407.74-207.98-29.38-371.16-197.69-392.06-407.78z" />
  </svg>
);

/* ─── SVG logos ──────────────────────────────────────────────────────────────── */
function AppleLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
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

/* ─── Star particles per platform ────────────────────────────────────────────── */
const RedStars = () => (
  <>
    <div className="absolute top-[20%] left-[20%] w-[20px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0.05,0.83,0.43,0.96)] drop-shadow-[0_0_0_rgba(239,68,68,0)] group-hover:top-[-80%] group-hover:left-[-30%] group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.9)] group-hover:z-[2]"><StarShape className="fill-[#ef4444]" /></div>
    <div className="absolute top-[45%] left-[45%] w-[12px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(239,68,68,0)] group-hover:top-[-25%] group-hover:left-[10%] group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.9)] group-hover:z-[2]"><StarShape className="fill-[#ef4444]" /></div>
    <div className="absolute top-[40%] left-[40%] w-[5px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(239,68,68,0)] group-hover:top-[55%] group-hover:left-[25%] group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.9)] group-hover:z-[2]"><StarShape className="fill-[#ef4444]" /></div>
    <div className="absolute top-[20%] left-[40%] w-[8px] z-[-5] transition-all duration-[800ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(239,68,68,0)] group-hover:top-[30%] group-hover:left-[80%] group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.9)] group-hover:z-[2]"><StarShape className="fill-[#ef4444]" /></div>
    <div className="absolute top-[25%] left-[45%] w-[12px] z-[-5] transition-all duration-[600ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(239,68,68,0)] group-hover:top-[25%] group-hover:left-[115%] group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.9)] group-hover:z-[2]"><StarShape className="fill-[#ef4444]" /></div>
    <div className="absolute top-[5%] left-[50%] w-[5px] z-[-5] transition-all duration-[800ms] ease-in-out drop-shadow-[0_0_0_rgba(239,68,68,0)] group-hover:top-[5%] group-hover:left-[60%] group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.9)] group-hover:z-[2]"><StarShape className="fill-[#ef4444]" /></div>
  </>
);

const BlueStars = () => (
  <>
    <div className="absolute top-[20%] left-[20%] w-[20px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0.05,0.83,0.43,0.96)] drop-shadow-[0_0_0_rgba(59,130,246,0)] group-hover:top-[-80%] group-hover:left-[-30%] group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.9)] group-hover:z-[2]"><StarShape className="fill-[#3b82f6]" /></div>
    <div className="absolute top-[45%] left-[45%] w-[12px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(59,130,246,0)] group-hover:top-[-25%] group-hover:left-[10%] group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.9)] group-hover:z-[2]"><StarShape className="fill-[#3b82f6]" /></div>
    <div className="absolute top-[40%] left-[40%] w-[5px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(59,130,246,0)] group-hover:top-[55%] group-hover:left-[25%] group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.9)] group-hover:z-[2]"><StarShape className="fill-[#3b82f6]" /></div>
    <div className="absolute top-[20%] left-[40%] w-[8px] z-[-5] transition-all duration-[800ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(59,130,246,0)] group-hover:top-[30%] group-hover:left-[80%] group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.9)] group-hover:z-[2]"><StarShape className="fill-[#3b82f6]" /></div>
    <div className="absolute top-[25%] left-[45%] w-[12px] z-[-5] transition-all duration-[600ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(59,130,246,0)] group-hover:top-[25%] group-hover:left-[115%] group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.9)] group-hover:z-[2]"><StarShape className="fill-[#3b82f6]" /></div>
    <div className="absolute top-[5%] left-[50%] w-[5px] z-[-5] transition-all duration-[800ms] ease-in-out drop-shadow-[0_0_0_rgba(59,130,246,0)] group-hover:top-[5%] group-hover:left-[60%] group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.9)] group-hover:z-[2]"><StarShape className="fill-[#3b82f6]" /></div>
  </>
);

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
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
      {/* Mac button */}
      <div className="relative">
        {/* Ambient halo — brightens when sequentially active */}
        <div
          className="pointer-events-none absolute -inset-3 -z-10 rounded-full blur-2xl transition-opacity duration-700"
          style={{
            background: "rgba(239,68,68,0.55)",
            opacity: macActive ? 1 : 0.18,
          }}
        />
        <a
          href="#mac-download"
          className="group relative inline-flex items-center gap-3 overflow-visible rounded-full border-2 border-red-500 px-9 py-3.5 text-[15px] font-bold tracking-wide active:scale-95"
          style={{
            background: macActive ? "rgba(239,68,68,0.92)" : "rgba(239,68,68,0.08)",
            color: macActive ? "#0a0a0a" : "rgba(255,120,120,0.90)",
            boxShadow: macActive
              ? "0 0 36px rgba(239,68,68,0.80), 0 0 72px rgba(239,68,68,0.40), 0 0 120px rgba(239,68,68,0.18), inset 0 1px 0 rgba(255,255,255,0.18)"
              : "0 0 8px rgba(239,68,68,0.20)",
            transition: "box-shadow 0.65s ease, background 0.65s ease, color 0.65s ease",
          }}
        >
          <AppleLogo className="h-[18px] w-[18px] shrink-0" />
          Download for Mac
          <RedStars />
        </a>
      </div>

      {/* Windows button */}
      <div className="relative">
        {/* Ambient halo */}
        <div
          className="pointer-events-none absolute -inset-3 -z-10 rounded-full blur-2xl transition-opacity duration-700"
          style={{
            background: "rgba(59,130,246,0.55)",
            opacity: winActive ? 1 : 0.18,
          }}
        />
        <a
          href="#win-download"
          className="group relative inline-flex items-center gap-3 overflow-visible rounded-full border-2 border-blue-500 px-9 py-3.5 text-[15px] font-bold tracking-wide active:scale-95"
          style={{
            background: winActive ? "rgba(59,130,246,0.92)" : "rgba(59,130,246,0.08)",
            color: winActive ? "#0a0a0a" : "rgba(120,160,255,0.90)",
            boxShadow: winActive
              ? "0 0 36px rgba(59,130,246,0.80), 0 0 72px rgba(59,130,246,0.40), 0 0 120px rgba(59,130,246,0.18), inset 0 1px 0 rgba(255,255,255,0.18)"
              : "0 0 8px rgba(59,130,246,0.20)",
            transition: "box-shadow 0.65s ease, background 0.65s ease, color 0.65s ease",
          }}
        >
          <WindowsLogo className="h-[15px] w-[15px] shrink-0" />
          Download for Windows
          <BlueStars />
        </a>
      </div>
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
