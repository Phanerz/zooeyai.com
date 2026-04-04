"use client";

import { Zap, Layout, Eye, Lock, Sliders } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const zooeyFeatures = [
  {
    id: 1,
    title: "Instant Actions",
    date: "Feature 01",
    content: "Press a key. It's done. No prompts, no setup—just execution.",
    category: "Speed",
    icon: Zap,
    relatedIds: [2, 5],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "No Tabs Needed",
    date: "Feature 02",
    content: "Stay in your flow. Everything happens right where you are.",
    category: "Flow",
    icon: Layout,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Always There",
    date: "Feature 03",
    content: "Zooey lives on your screen. Ready the moment you need it.",
    category: "Presence",
    icon: Eye,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 4,
    title: "Fast & Private",
    date: "Feature 04",
    content: "Runs locally, responds instantly. Your data stays with you.",
    category: "Privacy",
    icon: Lock,
    relatedIds: [3, 5],
    status: "completed" as const,
    energy: 80,
  },
  {
    id: 5,
    title: "Clear Modes",
    date: "Feature 05",
    content: "No guessing, no messy prompts. Each mode does exactly what you expect.",
    category: "Clarity",
    icon: Sliders,
    relatedIds: [4, 1],
    status: "completed" as const,
    energy: 75,
  },
];

export function OrbitalFeatures() {
  return (
    <section id="features" className="relative w-full">
      <div className="text-center pt-16 pb-4">
        <p className="text-xs uppercase tracking-[0.35em] text-green-300/70">Core Features</p>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Five reasons Zooey feels better<br />in practice than it sounds on paper
        </h2>
        <p className="mt-4 text-white/50 text-sm">Click any node to explore</p>
      </div>
      <RadialOrbitalTimeline timelineData={zooeyFeatures} />
    </section>
  );
}
