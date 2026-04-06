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
    <div className="fixed bottom-6 right-6 z-50 md:bottom-2 md:right-16">
      <AnimatePresence mode="wait">
        {index !== null && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            /* Stack: bubble then chevron row, all right-aligned above the icon */
            className="absolute bottom-full right-0 flex flex-col items-end pb-1"
          >
            {/* Bubble */}
            <div
              className="mb-1 w-[220px] rounded-xl px-5 py-3 text-center md:w-[250px]"
              style={{
                background: "rgba(14, 17, 26, 0.97)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.65), 0 2px 8px rgba(0,0,0,0.4)",
                backdropFilter: "blur(20px)",
              }}
            >
              <p className="text-sm font-medium leading-snug text-white">
                {LINES[index]}
              </p>
            </div>

            {/*
              Chevron row — same width as the icon button (w-20 / w-32).
              justify-center always places the chevron over the exact centre of Zooey's head.
            */}
            <div className="flex w-20 justify-center md:w-32">
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                <polyline
                  points="2,2 10,10 18,2"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zooey icon — never moves */}
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
