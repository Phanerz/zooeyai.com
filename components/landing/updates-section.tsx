"use client";

import { AnimatePresence, motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
import { Copy, ExternalLink, Maximize2, X, CheckCheck, GitMerge, Rss } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { StarButton } from "@/components/ui/star-button";

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const releases = [
  {
    id: "v0-1-0-beta",
    date: "April 2026",
    version: "v0.1.0-beta",
    title: "Zooey Arrives.",
    subtitle: "The beta is almost here.",
    body: "Six modes, hotkey activation, and a desktop AI that stays out of your way until you need it. Download now and be among the first to use it.",
    tags: ["Beta", "Launch"],
  },
];

/* ─── Tiny tooltip ──────────────────────────────────────────────────────────── */
function Tip({ label, children }: { label: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute bottom-full left-1/2 z-[500] mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[rgba(7,11,7,0.92)] px-3 py-1.5 text-[11px] text-white/70 backdrop-blur-xl"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Icon button ───────────────────────────────────────────────────────────── */
function IconBtn({
  onClick,
  children,
  className = "",
}: {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/45 transition-all duration-200 hover:border-green-400/30 hover:bg-green-400/8 hover:text-green-300 ${className}`}
    >
      {children}
    </button>
  );
}

/* ─── Release card visual (replaces image) ──────────────────────────────────── */
function ReleaseVisual({ version }: { version: string }) {
  return (
    <div className="relative flex h-52 w-full items-center justify-center overflow-hidden rounded-2xl border border-green-400/15 bg-[rgba(7,11,7,0.6)]">
      {/* Static ambient glow — no rotation, no cut-off */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 90% at 72% 50%, rgba(74,222,128,0.18) 0%, rgba(74,222,128,0.06) 50%, transparent 75%)",
        }}
      />
      {/* Pulsing right-side orb */}
      <motion.div
        className="pointer-events-none absolute right-[12%] h-36 w-36 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(74,222,128,0.22) 0%, rgba(74,222,128,0.06) 55%, transparent 75%)",
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Grid lines — fade from right */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,222,128,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.18) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
          maskImage:
            "radial-gradient(ellipse 80% 90% at 70% 50%, black 20%, transparent 80%)",
        }}
      />
      {/* Top accent line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent" />
      {/* Content */}
      <div className="relative flex flex-col items-center gap-2 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-400/30 bg-green-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em] text-green-300">
          <GitMerge className="h-3 w-3" />
          {version}
        </span>
        <p className="mt-1 font-display text-2xl font-semibold text-white/90">
          Zooey Arrives.
        </p>
        <p className="text-sm text-white/40">April 2026</p>
      </div>
    </div>
  );
}

/* ─── Dialog modal ──────────────────────────────────────────────────────────── */
function ReleaseDialog({
  release,
  onClose,
}: {
  release: (typeof releases)[0];
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[400] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[rgba(7,11,7,0.92)] backdrop-blur-2xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{
          boxShadow:
            "0 0 0 1px rgba(74,222,128,0.15), 0 40px 120px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Top accent */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-400/60 to-transparent" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition hover:border-white/20 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.3em] text-green-300">
                <GitMerge className="h-3 w-3" />
                {release.version}
              </span>
              <span className="text-xs text-white/35">{release.date}</span>
            </div>
            <h2 className="font-display text-3xl font-semibold text-white">
              {release.title}
            </h2>
            <p className="text-base font-medium text-white/65">{release.subtitle}</p>
          </div>

          {/* Visual */}
          <ReleaseVisual version={release.version} />

          {/* Body */}
          <div className="mt-6 space-y-4">
            <p className="text-sm leading-relaxed text-white/70">{release.body}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {release.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-white/35"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 flex items-center gap-3">
            <StarButton href="/download" variant="green" className="text-[13px] font-bold px-5 py-[9px]">
              Download Zooey
            </StarButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main section ──────────────────────────────────────────────────────────── */
export function UpdatesSection() {
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [copied, setCopied]             = useState<string | null>(null);

  const openRelease = (id: string) => setActiveDialog(id);
  const closeDialog = useCallback(() => setActiveDialog(null), []);

  const copyLink = (id: string) => {
    const url = `${window.location.origin}/updates#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const activeRelease = releases.find((r) => r.id === activeDialog) ?? null;

  return (
    <section className="relative w-full pt-36 pb-28">
      <div className="shell">

        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mb-20 flex flex-col gap-4"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-green-300/80">
            <Rss className="h-3.5 w-3.5" />
            Changelog
          </div>
          <h1
            className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl"
            style={{
              textShadow:
                "0 0 40px rgba(74,222,128,0.22), 0 0 80px rgba(74,222,128,0.10), 0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            What is new<br />with Zooey.
          </h1>
          <p className="mt-1 max-w-lg text-base leading-relaxed text-white/68">
            Every update, version bump, and shipped feature. All in one place.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-green-400/30 via-green-400/15 to-transparent md:block" />

          <div className="space-y-0">
            {releases.map((release, idx) => (
              <motion.div
                key={release.id}
                id={release.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: EASE }}
                className="relative flex flex-col gap-6 py-12 md:flex-row md:gap-12 md:pl-14"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-[3.75rem] hidden -translate-x-[4.5px] md:block">
                  <motion.div
                    className="h-2.5 w-2.5 rounded-full border border-green-400/60 bg-green-400/20"
                    animate={{ boxShadow: ["0 0 0 0 rgba(74,222,128,0.4)", "0 0 0 6px rgba(74,222,128,0)"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                  />
                </div>

                {/* Sticky date column */}
                <div className="md:w-36 md:shrink-0">
                  <time className="text-sm font-medium text-white/40">{release.date}</time>
                </div>

                {/* Card */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="group relative rounded-2xl border border-white/10 bg-[rgba(7,11,7,0.52)] backdrop-blur-xl"
                    style={{
                      boxShadow:
                        "0 20px 60px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                  >
                    {/* Hover glow */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: "radial-gradient(400px circle at 50% 0%, rgba(74,222,128,0.06), transparent 70%)" }}
                    />
                    {/* Top accent line */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-400/40 to-transparent" />

                    <div className="p-6 md:p-8">
                      {/* Version + tags */}
                      <div className="mb-5 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.3em] text-green-300">
                          <GitMerge className="h-3 w-3" />
                          {release.version}
                        </span>
                        {release.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Headline */}
                      <h2 className="mb-1 font-display text-2xl font-semibold text-white md:text-3xl">
                        {release.title}
                      </h2>
                      <p className="mb-4 text-base font-medium text-white/70">
                        {release.subtitle}
                      </p>

                      {/* Visual */}
                      <div className="mb-6 cursor-pointer" onClick={() => openRelease(release.id)}>
                        <ReleaseVisual version={release.version} />
                      </div>

                      {/* Body */}
                      <p className="mb-6 text-sm leading-relaxed text-white/62">
                        {release.body}
                      </p>

                      {/* Actions row */}
                      <div className="flex items-center justify-between">
                        {/* CTA */}
                        <StarButton href="/download" variant="green" className="text-[13px] font-bold px-5 py-[9px]">
                          Download Zooey
                        </StarButton>

                        {/* Icon actions */}
                        <div className="flex items-center gap-1.5">
                          <Tip label={copied === release.id ? "Copied!" : "Copy link"}>
                            <IconBtn onClick={() => copyLink(release.id)}>
                              {copied === release.id
                                ? <CheckCheck className="h-4 w-4 text-green-400" />
                                : <Copy className="h-4 w-4" />}
                            </IconBtn>
                          </Tip>
                          <Tip label="Expand release">
                            <IconBtn onClick={() => openRelease(release.id)}>
                              <Maximize2 className="h-4 w-4" />
                            </IconBtn>
                          </Tip>
                          <Tip label="Open in new tab">
                            <IconBtn onClick={() => window.open(`/updates#${release.id}`, "_blank")}>
                              <ExternalLink className="h-4 w-4" />
                            </IconBtn>
                          </Tip>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Divider (not after last) */}
                  {idx < releases.length - 1 && (
                    <div className="my-12 h-px w-full bg-gradient-to-r from-white/5 via-white/10 to-transparent" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── More coming soon ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 flex flex-col items-center gap-2 text-center"
        >
          <div className="h-12 w-px bg-gradient-to-b from-green-400/20 to-transparent" />
          <p className="text-sm text-white/30">More updates on the way.</p>
        </motion.div>

      </div>

      {/* ── Dialog ── */}
      <AnimatePresence>
        {activeRelease && (
          <ReleaseDialog release={activeRelease} onClose={closeDialog} />
        )}
      </AnimatePresence>
    </section>
  );
}
