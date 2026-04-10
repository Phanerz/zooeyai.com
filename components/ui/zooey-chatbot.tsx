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
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 md:bottom-2 md:right-16">

      <AnimatePresence mode="wait">
        {index !== null && (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 4 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            /*
              right-0  → bubble right-edge = container right-edge (no overflow)
              bottom   → slightly overlaps the icon top so there's minimal gap to Zooey's head
            */
            className="absolute right-0 w-[210px] rounded-2xl px-5 py-3.5 text-center md:w-[240px]"
            style={{
              bottom: "calc(100% - 4px)",
              background: "linear-gradient(135deg, rgba(16,20,32,0.98) 0%, rgba(12,18,24,0.98) 100%)",
              border: "1px solid rgba(74,222,128,0.18)",
              boxShadow: [
                "0 4px 24px rgba(0,0,0,0.7)",
                "0 1px 0 rgba(255,255,255,0.06) inset",
                "0 0 0 1px rgba(74,222,128,0.06)",
                "0 0 32px rgba(74,222,128,0.08)",
              ].join(", "),
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* Top shimmer */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.3) 50%, transparent)",
              }}
            />

            <p className="text-[13px] font-medium leading-snug text-white/90">
              <TypingText text={LINES[index]} />
            </p>

            {/*
              Chevron lives INSIDE the bubble so `right` is measured from the bubble's
              right edge, which equals the container's right edge.

              Icon centre from the right  = icon_width / 2
                mobile  (w-20 = 80px)  → 40px → right-10
                desktop (w-32 = 128px) → 64px → right-16

              Subtract half the chevron width (9px) so the chevron itself is centred:
                mobile  → right: 40 - 9 = 31px  ≈ right-8  (32px, close enough)
                desktop → right: 64 - 9 = 55px  ≈ right-14 (56px)
            */}
            <svg
              className="absolute -bottom-[10px] right-8 md:right-14"
              width="18" height="10" viewBox="0 0 18 10" fill="none"
            >
              <polyline
                points="2,1 9,8 16,1"
                stroke="rgba(74,222,128,0.4)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

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
