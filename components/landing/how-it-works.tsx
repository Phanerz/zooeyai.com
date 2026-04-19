"use client";

import { motion, useInView } from "framer-motion";
import { Keyboard, MousePointer2, Zap } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    icon: Keyboard,
    title: "Press any hotkey to wake Zooey up.",
    description:
      "One keypress and Zooey is there. No new tabs, no interruptions, no losing focus.",
    benefits: [
      "Works on top of any app or window",
      "6 modes for different kinds of work",
      "From thought to answer in seconds",
    ],
  },
  {
    icon: MousePointer2,
    title: "Direct Zooey at whatever you need help with.",
    description:
      "Zooey reads your screen and gets to work before you finish your sentence. No explaining. No repeating yourself.",
    benefits: [
      "No copy-pasting into another tool",
      "Ask about anything on your screen",
      "Works across writing, code, maths, emails, grammar, and research",
    ],
  },
  {
    icon: Zap,
    title: "Get your answer and get back to work.",
    description:
      "Bestie, teacher, problem solver all in one. Zooey makes hard work feel easy.",
    benefits: [
      "Answers shaped around your active mode",
      "Sits on top of every window, every time",
      "The more you use Zooey, the more Zooey delivers",
    ],
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: EASE },
  }),
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

function AnimatedBorderCard({
  children,
  index,
  isInView,
}: {
  children: React.ReactNode;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
      /* 1 px padding exposes the rotating gradient as the border */
      className="group relative rounded-2xl p-[1px] overflow-hidden"
    >
      {/* Rotating conic sweep — CSS animation keeps this off the Framer Motion JS thread */}
      <div
        className="pointer-events-none absolute animate-spin-slow"
        style={{
          top: "-100%",
          left: "-100%",
          width: "300%",
          height: "300%",
          background:
            "conic-gradient(from 0deg, transparent 82%, rgba(74,222,128,0.55) 89%, rgba(134,239,172,0.85) 92%, rgba(74,222,128,0.55) 95%, transparent 100%)",
        }}
      />

      {/* Always-on dim base border so the card has definition at rest */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/[0.08]" />

      {/* Card body */}
      <div
        className="glass-dark relative rounded-[15px] p-5 backdrop-blur-xl
                   transition-colors duration-300
                   bg-[rgba(7,11,7,0.52)] group-hover:bg-[rgba(7,11,7,0.44)]"
        style={{
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.055)",
        }}
      >
        {/* Subtle inner glow on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[15px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: "inset 0 0 40px rgba(74,222,128,0.055)" }}
        />

        {children}
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative w-full pt-40 pb-8 sm:pt-48 sm:pb-10"
    >
      <div className="shell">
        {/* Header */}
        <motion.div
          className="mx-auto mb-8 max-w-2xl text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <h2
            className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl"
            style={{
              textShadow:
                "0 0 40px rgba(74,222,128,0.22), 0 0 80px rgba(74,222,128,0.10), 0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            Three steps.<br />Zero friction.
          </h2>
          <p
            className="mt-3 text-base text-white/70"
            style={{
              textShadow: "0 0 24px rgba(74,222,128,0.18), 0 1px 12px rgba(0,0,0,0.4)",
            }}
          >
            From hotkey to answer without breaking your flow.
          </p>
        </motion.div>

        {/* Step indicators + connecting line */}
        <div className="relative mx-auto mb-4 max-w-4xl">
          <div
            aria-hidden="true"
            className="absolute left-[16.6667%] top-1/2 hidden h-px w-[66.6667%] -translate-y-1/2
                       bg-gradient-to-r from-green-400/15 via-green-400/45 to-green-400/15 md:block"
          />
          <div className="relative grid grid-cols-3">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                className="flex justify-self-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{
                  delay: i * 0.15 + 0.1,
                  duration: 0.45,
                  ease: EASE,
                }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-green-400/40 bg-green-400/10 text-sm font-bold text-green-300 ring-4 ring-[#050608]">
                  {i + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <AnimatedBorderCard key={i} index={i} isInView={isInView}>
                {/* Icon */}
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-green-400/25 bg-green-400/10 text-green-300 transition-colors duration-300 group-hover:border-green-400/45 group-hover:bg-green-400/16">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Title */}
                <h3 className="mb-2.5 text-[1.05rem] font-semibold leading-snug text-white">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mb-4 text-sm leading-relaxed text-white/72">
                  {step.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-2">
                  {step.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <div className="mt-[5px] flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full bg-green-400/15">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      </div>
                      <span className="text-sm leading-snug text-white/62">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </AnimatedBorderCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
