"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen pt-24">

      {/* Soft green radial behind content */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 38%, rgba(74,222,128,0.07) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto flex min-h-[calc(100dvh-6rem)] max-w-2xl flex-col items-center justify-center px-6 pb-16 pt-12 text-center"
        variants={stagger}
        initial="hidden"
        animate="show"
      >

        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-semibold uppercase tracking-[0.35em] text-green-300/60"
        >
          About
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.55 }}
          className="mt-5 font-display text-5xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl"
          style={{
            textShadow:
              "0 0 40px rgba(74,222,128,0.2), 0 0 80px rgba(74,222,128,0.08), 0 4px 24px rgba(0,0,0,0.6)",
          }}
        >
          One person.<br />One obsession.
        </motion.h1>

        {/* Body paragraphs */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.55 }}
          className="mx-auto mt-8 max-w-lg space-y-4 text-base leading-7 text-white/50"
        >
          <p>
            Zooey was built out of frustration with context switching. Every tool pulled you away from
            what you were doing, a browser tab, a separate window, a different app entirely. The thread
            breaks every time.
          </p>
          <p>
            Zooey lives on your desktop. It does not ask you to go anywhere. You stay in flow, and it
            answers from right where you are.
          </p>
        </motion.div>

        {/* Origin card */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.55 }}
          className="relative mx-auto mt-12 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-left backdrop-blur-xl"
          style={{
            boxShadow:
              "0 0 0 1px rgba(74,222,128,0.06), 0 4px 32px rgba(0,0,0,0.5), 0 0 40px rgba(74,222,128,0.04)",
          }}
        >
          {/* top shimmer line */}
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(74,222,128,0.3) 50%, transparent)",
            }}
          />
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-green-300/60">
            Origin
          </p>
          <p className="text-sm leading-7 text-white/55">
            Zooey was built out of frustration with context switching. Every tool required leaving what
            you were doing. This one does not.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <Link
            href="/waitlist"
            className="group inline-flex items-center gap-2 rounded-full border border-green-400/25 bg-green-400/10 px-7 py-3 text-sm font-semibold text-green-300 transition-all duration-200 hover:border-green-400/50 hover:bg-green-400/18 hover:text-green-200 hover:shadow-[0_0_24px_rgba(74,222,128,0.18)]"
          >
            Get early access
            <svg
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="mt-16 flex items-center gap-5"
        >
          {/* Twitter / X */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="rounded-full border border-white/10 bg-white/[0.04] p-2.5 text-white/40 transition-all duration-200 hover:border-white/20 hover:text-white/80 hover:shadow-[0_0_16px_rgba(255,255,255,0.08)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.262 5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* TikTok */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="rounded-full border border-white/10 bg-white/[0.04] p-2.5 text-white/40 transition-all duration-200 hover:border-white/20 hover:text-white/80 hover:shadow-[0_0_16px_rgba(255,255,255,0.08)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-full border border-white/10 bg-white/[0.04] p-2.5 text-white/40 transition-all duration-200 hover:border-white/20 hover:text-white/80 hover:shadow-[0_0_16px_rgba(255,255,255,0.08)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-full border border-white/10 bg-white/[0.04] p-2.5 text-white/40 transition-all duration-200 hover:border-white/20 hover:text-white/80 hover:shadow-[0_0_16px_rgba(255,255,255,0.08)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </motion.div>

      </motion.div>
    </main>
  );
}
