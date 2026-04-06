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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center md:bottom-0 md:right-16">
      {/* Speech bubble */}
      <AnimatePresence mode="wait">
        {index !== null && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative mb-2 max-w-[220px] rounded-2xl px-4 py-2.5 text-center text-sm font-medium text-white md:max-w-[260px]"
            style={{
              background: "rgba(10, 16, 10, 0.88)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(74,222,128,0.18)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 16px rgba(74,222,128,0.06)",
            }}
          >
            {LINES[index]}
            {/* Arrow pointing down */}
            <span
              className="absolute -bottom-[9px] left-1/2 -translate-x-1/2"
              style={{
                width: 0,
                height: 0,
                borderLeft: "9px solid transparent",
                borderRight: "9px solid transparent",
                borderTop: "9px solid rgba(10,16,10,0.88)",
                display: "block",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zooey icon */}
      <button
        onClick={handleClick}
        className="w-20 cursor-pointer transition-transform hover:scale-105 active:scale-95 md:w-32"
        aria-label="Chat with Zooey"
      >
        <Image
          src="/zooey-icon.png"
          alt="Zooey"
          width={144}
          height={144}
          className="h-auto w-full animate-float object-contain drop-shadow-[0_0_22px_rgba(74,222,128,0.35)]"
        />
      </button>
    </div>
  );
}
