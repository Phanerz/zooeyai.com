"use client";

import { Zap, Layout, Eye, Lock, Sliders } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const zooeyFeatures = [
  {
    id: 1,
    title: "Instant Actions",
    date: "Feature 01",
    content: "One hotkey and Zooey handles it. No prompts, no setup — Zooey just executes.",
    category: "Speed",
    icon: Zap,
    relatedIds: [2, 5],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "No Switching Tabs",
    date: "Feature 02",
    content: "Call Zooey from any app and get the answer right there. No windows, no detours, no losing your place.",
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
    content: "Zooey sits on top of every window, all the time. No launching, no searching — Zooey is already there when you need a hand.",
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
    content: "Zooey responds in a flash and never shares your conversations. What happens on your screen stays on your screen.",
    category: "Privacy",
    icon: Lock,
    relatedIds: [3, 5],
    status: "completed" as const,
    energy: 80,
  },
  {
    id: 5,
    title: "Switchable Modes",
    date: "Feature 05",
    content: "Write, Research, Code, Maths, Freaky, Grammar. Pick a mode and Zooey already knows the shape of the task.",
    category: "Clarity",
    icon: Sliders,
    relatedIds: [4, 1],
    status: "completed" as const,
    energy: 75,
  },
];

export function OrbitalFeatures() {
  return (
    <section id="features" className="relative w-full -mt-10">
      <RadialOrbitalTimeline timelineData={zooeyFeatures} />
    </section>
  );
}
