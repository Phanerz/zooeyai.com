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
    /* Anchor point — icon always stays here, bubble grows upward absolutely */
    <div className="fixed bottom-6 right-6 z-50 md:bottom-2 md:right-16">
      {/* Speech bubble — absolutely above the icon, never shifts layout */}
      <AnimatePresence mode="wait">
        {index !== null && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            className="absolute bottom-[calc(100%-4px)] right-0 w-[230px] md:w-[260px]"
          >
            {/* Chat bubble body */}
            <div
              className="relative rounded-2xl rounded-br-sm px-4 py-3"
              style={{
                background: "rgba(12, 20, 12, 0.95)",
                border: "1px solid rgba(74,222,128,0.25)",
                boxShadow:
                  "0 12px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(74,222,128,0.08), 0 0 24px rgba(74,222,128,0.07)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Sender label */}
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-green-400/60">
                Zooey
              </p>
              {/* Message text */}
              <p className="text-sm font-medium leading-snug text-white">
                {LINES[index]}
              </p>

              {/* Tail — bottom-right corner pointing at Zooey */}
              <svg
                className="absolute -bottom-[10px] right-10 md:right-16"
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
              >
                <path
                  d="M0 0 L16 0 L8 10 Z"
                  fill="rgba(12,20,12,0.95)"
                />
                <path
                  d="M0.5 0.5 L15.5 0.5 L8 9.2 Z"
                  stroke="rgba(74,222,128,0.25)"
                  strokeWidth="0.8"
                  fill="none"
                />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zooey icon — position never changes */}
      <button
        onClick={handleClick}
        className="relative w-20 cursor-pointer md:w-32"
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
