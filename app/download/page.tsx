"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { StarButton } from "@/components/ui/star-button";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Windows logo ───────────────────────────────────────────────────────────── */
function WindowsLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.949" />
    </svg>
  );
}

/* ─── FAQ data ───────────────────────────────────────────────────────────────── */
const faqs = [
  {
    category: "ACCOUNT",
    question: "Do I need an API key?",
    answer:
      "No. Create a free Zooey account and you can start using it right away. No external API keys, no configuration step — just sign in and go.",
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

/* ─── Download button — shared between hero and any future section ───────────── */
function DownloadButton({ size = "default" }: { size?: "default" | "large" }) {
  const isLarge = size === "large";
  return (
    <StarButton
      href="#download-coming-soon"
      variant="cyan"
      className={
        isLarge
          ? "px-10 py-4 text-[16px] font-bold tracking-wide"
          : "px-8 py-3 text-[15px] font-bold tracking-wide"
      }
    >
      <WindowsLogo className="mr-2.5 h-4 w-4 shrink-0" />
      Download for Windows
    </StarButton>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */
export default function DownloadPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* ── Hero ── */}
      <section className="relative w-full pt-40 pb-20">
        <div className="shell">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="flex flex-col items-center gap-8 text-center"
          >
            {/* Platform pill */}
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-[10px] uppercase tracking-[0.38em] text-cyan-300/80">
              <WindowsLogo className="h-3 w-3" />
              Windows 11
            </span>

            <div className="space-y-4">
              <h1
                className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
                style={{
                  textShadow:
                    "0 0 40px rgba(34,211,238,0.18), 0 0 80px rgba(34,211,238,0.08), 0 2px 20px rgba(0,0,0,0.6)",
                }}
              >
                Download Zooey
              </h1>
              <p className="mx-auto max-w-xl text-base text-white/55 sm:text-lg">
                Your AI desktop companion, installed in under a minute. No terminal commands,
                no config files — just run the installer and you are done.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <DownloadButton size="large" />
              <p className="text-[11px] uppercase tracking-[0.32em] text-white/35">
                Windows 11 &middot; Free to start &middot; No setup required
              </p>
              <span className="rounded-full border border-cyan-400/15 bg-black/30 px-4 py-1.5 text-[10px] uppercase tracking-[0.35em] text-cyan-300/60 backdrop-blur-md">
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
              className="panel-surface p-8"
              style={{
                boxShadow:
                  "0 24px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Top accent line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

              <p className="mb-6 text-[10px] uppercase tracking-[0.38em] text-cyan-300/70">
                System Requirements
              </p>

              <ul className="space-y-4">
                {[
                  { label: "Operating System", value: "Windows 11 (64-bit)" },
                  { label: "RAM", value: "8 GB minimum, 16 GB recommended" },
                  { label: "Storage", value: "200 MB free space" },
                  { label: "Internet", value: "Required for AI features" },
                ].map(({ label, value }) => (
                  <li
                    key={label}
                    className="flex items-start justify-between gap-6 border-b border-white/[0.06] pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-white/45">{label}</span>
                    <span className="text-right text-sm font-medium text-white/80">
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
              className="panel-surface p-8"
              style={{
                boxShadow:
                  "0 24px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Top accent line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-green-400/40 to-transparent" />

              <p className="mb-6 text-[10px] uppercase tracking-[0.38em] text-green-300/70">
                Install Guide
              </p>

              <ol className="space-y-5">
                {[
                  {
                    step: "01",
                    title: "Download the installer",
                    body: "Click the download button above. The installer is a standard Windows .exe file, around 150 MB.",
                  },
                  {
                    step: "02",
                    title: "Run it",
                    body: "Windows may show a SmartScreen warning because Zooey is a new app. Click \"More info\" then \"Run anyway\" — it is safe to proceed.",
                  },
                  {
                    step: "03",
                    title: "Sign in and start",
                    body: "Create a free account or sign in. Zooey launches to your desktop and is ready the moment setup finishes.",
                  },
                ].map(({ step, title, body }) => (
                  <li key={step} className="flex gap-5">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] font-display text-xs font-semibold text-white/40">
                      {step}
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white/90">{title}</p>
                      <p className="text-sm leading-relaxed text-white/45">{body}</p>
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
            <p className="text-[10px] uppercase tracking-[0.38em] text-green-300/70">
              Questions
            </p>
            <h2
              className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl"
              style={{
                textShadow:
                  "0 0 40px rgba(74,222,128,0.18), 0 0 80px rgba(74,222,128,0.08), 0 2px 20px rgba(0,0,0,0.5)",
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
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[rgba(7,11,7,0.48)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5"
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
                        "radial-gradient(260px circle at var(--gx, 50%) var(--gy, 50%), rgba(74,222,128,0.07), transparent 70%)",
                    }}
                  />

                  {/* Open accent */}
                  {isOpen && (
                    <motion.div
                      layoutId="dl-open-accent"
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-400/60 to-transparent"
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
                          ? "border-green-400/50 bg-green-400/12 text-green-300"
                          : "border-white/15 bg-white/[0.04] text-white/50 group-hover:border-white/25 group-hover:text-white/80"
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
                            isOpen ? "text-white" : "text-white/80 group-hover:text-white"
                          }`}
                        >
                          {faq.question}
                        </h3>
                        <span className="inline-flex w-fit items-center rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white/35 sm:ml-auto">
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
                            <p className="pb-1 pr-4 text-sm leading-relaxed text-white/60">
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
            <p className="text-sm text-white/35">Ready to give it a shot?</p>
            <DownloadButton />
          </motion.div>

        </div>
      </section>

    </main>
  );
}
