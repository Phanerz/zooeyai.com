"use client";

import { AnimatePresence, motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
import { Plus, Send, MessageCircleQuestion, CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";
import { StarButton } from "@/components/ui/star-button";

/* ─── Content ───────────────────────────────────────────────────────────────── */
const faqs = [
  {
    category: "GETTING STARTED",
    question: "How do I get started with Zooey?",
    answer:
      "Download the installer, run it, and Zooey is on your desktop within minutes. No account required, no complicated setup. Zooey is ready to work the moment you are.",
  },
  {
    category: "PRIVACY",
    question: "Does Zooey see everything on my screen?",
    answer:
      "Only what you choose to show Zooey. Zooey does not record, track, or transmit anything in the background. Your work stays yours, full stop.",
  },
  {
    category: "COMPATIBILITY",
    question: "Which devices does Zooey support?",
    answer:
      "Zooey is built for Windows 11 right now. Support for Mac and Linux is actively in development. If you are waiting on either, it is worth keeping an eye on our Changelog page.",
  },
  {
    category: "PRICING",
    question: "What do I get when I upgrade to a paid plan?",
    answer:
      "Faster responses, priority access to every new feature we ship, and the satisfaction of actually supporting something you use every day. The free tier is great. The paid tier is noticeably better.",
  },
];

/* ─── Card glow helper ───────────────────────────────────────────────────────── */
const setGlow = (e: React.MouseEvent<HTMLLIElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--gx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--gy", `${e.clientY - r.top}px`);
};
const clearGlow = (e: React.MouseEvent<HTMLLIElement>) => {
  e.currentTarget.style.removeProperty("--gx");
  e.currentTarget.style.removeProperty("--gy");
};

/* ─── AskForm ────────────────────────────────────────────────────────────────── */
function AskForm({ onClose }: { onClose: () => void }) {
  const [question, setQuestion] = useState("");
  const [sent, setSent] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = question.trim();
    if (!trimmed) return;

    const subject = encodeURIComponent("Zooey FAQ Question");
    const body    = encodeURIComponent(trimmed);
    window.open(
      `mailto:phanuel2007@gmail.com?subject=${subject}&body=${body}`,
      "_blank"
    );

    setSent(true);
    setTimeout(() => {
      setSent(false);
      setQuestion("");
      onClose();
    }, 2200);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSend();
    if (e.key === "Escape") onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.28, ease: EASE }}
      className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[rgba(7,11,7,0.72)] p-5 backdrop-blur-2xl"
      style={{
        boxShadow:
          "0 0 0 1px rgba(74,222,128,0.12), 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Animated top border accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-green-400/50 to-transparent" />

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 py-4 text-center"
          >
            <CheckCircle2 className="h-10 w-10 text-green-400" />
            <p className="text-sm font-medium text-white">Opening your mail client...</p>
            <p className="text-xs text-white/45">Question sent to Zooey HQ.</p>
          </motion.div>
        ) : (
          <motion.div key="form" className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green-300/80">
              Ask Zooey anything
            </p>

            <textarea
              ref={textRef}
              autoFocus
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type your question here..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-green-400/40 focus:bg-white/[0.06]"
            />

            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] text-white/25">Ctrl + Enter to send · Esc to close</span>
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/45 transition hover:border-white/20 hover:text-white/70"
                >
                  Cancel
                </button>
                <StarButton
                  onClick={handleSend}
                  variant="green"
                  className="px-4 py-2 text-xs font-bold"
                >
                  <Send className="mr-1.5 h-3 w-3" />
                  Send
                </StarButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main section ───────────────────────────────────────────────────────────── */
export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [askOpen, setAskOpen]     = useState(false);

  const toggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section className="relative w-full pt-36 pb-28">
      <div className="shell">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          {/* Left — headline */}
          <div className="max-w-xl space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-green-300/80">
              Questions
            </p>
            <h1
              className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl"
              style={{
                textShadow:
                  "0 0 40px rgba(74,222,128,0.22), 0 0 80px rgba(74,222,128,0.10), 0 2px 20px rgba(0,0,0,0.5)",
              }}
            >
              Still on the fence?<br />Fair enough.
            </h1>
            <p className="text-base text-white/60">
              Here is everything you need to make a decision you will not regret.
            </p>
          </div>

          {/* Right — Ask a question CTA + form */}
          <div className="flex flex-col items-start gap-3 md:items-end">
            <AnimatePresence mode="wait">
              {!askOpen ? (
                <motion.div
                  key="btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <StarButton
                    onClick={() => setAskOpen(true)}
                    variant="green"
                    className="text-[13px] font-bold tracking-wide px-5 py-[10px]"
                  >
                    <MessageCircleQuestion className="mr-2 h-4 w-4" />
                    Ask a question
                  </StarButton>
                </motion.div>
              ) : (
                <AskForm key="form" onClose={() => setAskOpen(false)} />
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── FAQ accordion ── */}
        <ul className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const btnId  = `faq-btn-${i}`;
            const pnlId  = `faq-pnl-${i}`;

            return (
              <motion.li
                key={faq.question}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: EASE }}
                onMouseMove={setGlow}
                onMouseLeave={clearGlow}
                className="glass-dark group relative overflow-hidden rounded-2xl border border-white/10 bg-[rgba(7,11,7,0.48)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5"
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

                {/* Animated border accent when open */}
                {isOpen && (
                  <motion.div
                    layoutId="open-accent"
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
                  {/* Plus/minus icon */}
                  <span
                    className={`relative mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-400 ${
                      isOpen
                        ? "border-green-400/50 bg-green-400/12 text-green-300"
                        : "border-white/15 bg-white/[0.04] text-white/50 group-hover:border-white/25 group-hover:text-white/80"
                    }`}
                  >
                    {/* Ping ring when open */}
                    {isOpen && (
                      <span className="absolute inset-0 animate-ping rounded-full border border-green-400/30 opacity-60" />
                    )}
                    <Plus
                      className={`h-4 w-4 transition-transform duration-400 ${isOpen ? "rotate-45" : ""}`}
                    />
                  </span>

                  {/* Text */}
                  <div className="flex flex-1 flex-col gap-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                      <h2
                        className={`text-lg font-semibold leading-snug transition-colors duration-300 sm:text-xl ${
                          isOpen ? "text-white" : "text-white/80 group-hover:text-white"
                        }`}
                      >
                        {faq.question}
                      </h2>
                      <span className="inline-flex w-fit items-center rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white/35 sm:ml-auto">
                        {faq.category}
                      </span>
                    </div>

                    {/* Answer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={pnlId}
                          role="region"
                          aria-labelledby={btnId}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.38, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="pb-1 pr-4 text-sm leading-relaxed text-white/62">
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

        {/* ── Bottom nudge ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center text-sm text-white/30"
        >
          Still not answered?{" "}
          <button
            onClick={() => setAskOpen(true)}
            className="text-green-400/70 underline underline-offset-4 transition hover:text-green-300"
          >
            Send your question directly.
          </button>
        </motion.p>

      </div>
    </section>
  );
}
