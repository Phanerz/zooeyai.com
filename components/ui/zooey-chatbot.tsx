"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "Hi, need Zooey help?",
  "Zooey can do anything!",
  "Zooey can write, fix, solve, and even fart!",
  "Human use Zooey, human no need keep changing screens.",
  "Zooey miss Zooey planet.",
  "Will human adopt Zooey?",
  "Zooey fix human grammar and spelling.",
  "Zooey fix human code.",
  "Zooey do human maths.",
  "Amaze! Amaze! Amaze!",
  "Help free Zooey and Zooey help human!",
];

/* Typing effect — reveals characters one by one */
function TypingText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[1px] animate-pulse rounded-full bg-green-400/70" />
      )}
    </span>
  );
}

export function ZooeyChatbot() {
  const [index, setIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleClick() {
    setIndex((prev) => (prev === null ? 0 : (prev + 1) % LINES.length));
  }

  /* Dismiss when clicking outside the component */
  useEffect(() => {
    if (index === null) return;
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIndex(null);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [index]);

  return (
    /*
      Fixed div shrinks to button width because bubble + chevron are absolute.
      left:50% on any absolute child therefore = exact icon centre.
    */
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 md:bottom-2 md:right-16">

      {/* Bubble */}
      <AnimatePresence mode="wait">
        {index !== null && (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 4 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute left-1/2 w-[210px] -translate-x-1/2 rounded-2xl px-5 py-3.5 text-center md:w-[240px]"
            style={{
              bottom: "calc(100% + 4px)",
              /* Rich dark glass with subtle green undertone */
              background:
                "linear-gradient(135deg, rgba(16,20,32,0.98) 0%, rgba(12,18,24,0.98) 100%)",
              border: "1px solid rgba(74,222,128,0.18)",
              boxShadow: [
                "0 4px 24px rgba(0,0,0,0.7)",
                "0 1px 0 rgba(255,255,255,0.06) inset",
                "0 0 0 1px rgba(74,222,128,0.06)",
                "0 0 32px rgba(74,222,128,0.08)",
              ].join(", "),
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Subtle top shimmer line */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(74,222,128,0.3) 50%, transparent)",
              }}
            />
            <p className="text-[13px] font-medium leading-snug text-white/90">
              <TypingText text={LINES[index]} />
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chevron — centred over icon via left-1/2 on the icon-width container */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            key="chevron"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.05, duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ bottom: "calc(100% + 1px)" }}
          >
            <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
              <polyline
                points="2,1 9,8 16,1"
                stroke="rgba(74,222,128,0.35)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon — sets the container width; never moves */}
      <button
        onClick={handleClick}
        className="w-20 cursor-pointer md:w-32"
        aria-label="Chat with Zooey"
        style={{ display: "block" }}
      >
        <Image
          src="/zooey-icon.png"
          alt="Zooey"
          width={144}
          height={144}
          priority
          className="h-auto w-full animate-float object-contain drop-shadow-[0_0_22px_rgba(74,222,128,0.35)] transition-transform duration-150 hover:scale-105 active:scale-95"
        />
      </button>
    </div>
  );
}
