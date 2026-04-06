"use client";

import { useState } from "react";
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

export function ZooeyChatbot() {
  const [index, setIndex] = useState<number | null>(null);

  function handleClick() {
    setIndex((prev) => (prev === null ? 0 : (prev + 1) % LINES.length));
  }

  return (
    /*
      This fixed div shrinks to the button width (w-20 / w-32) because the
      bubble + chevron are both absolute — they don't affect layout sizing.
      That means left:50% on any absolute child = exactly the icon centre.
    */
    <div className="fixed bottom-6 right-6 z-50 md:bottom-2 md:right-16">

      {/* Bubble — absolutely above the icon, right-edge-aligned */}
      <AnimatePresence mode="wait">
        {index !== null && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            className="absolute right-0 w-[220px] rounded-xl px-5 py-3 text-center md:w-[250px]"
            style={{
              bottom: "calc(100% + 20px)",
              background: "rgba(14, 17, 26, 0.97)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.65), 0 2px 8px rgba(0,0,0,0.4)",
              backdropFilter: "blur(20px)",
            }}
          >
            <p className="text-sm font-medium leading-snug text-white">
              {LINES[index]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/*
        Chevron — separate from the bubble so its position is independent.
        left-1/2 + -translate-x-1/2 centres it over the icon because this
        container is exactly as wide as the button (bubble is absolute, so
        it doesn't contribute to the container's width).
      */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            key="chevron"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ bottom: "calc(100% + 4px)" }}
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <polyline
                points="2,2 10,12 18,2"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="2.5"
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
