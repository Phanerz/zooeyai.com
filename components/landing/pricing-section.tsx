"use client";

import { useState } from "react";
import { Send, Rocket, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Inline UFO icon ─────────────────────────────────────────────────────── */
const UfoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
    strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="13" rx="9" ry="3.5" />
    <path d="M12 9.5C12 9.5 16 7 19.5 9" />
    <path d="M12 9.5C12 9.5 8 7 4.5 9" />
    <ellipse cx="12" cy="9" rx="4" ry="2.5" />
    <line x1="8" y1="16" x2="6" y2="19" />
    <line x1="12" y1="16.5" x2="12" y2="20" />
    <line x1="16" y1="16" x2="18" y2="19" />
  </svg>
);

/* ── All modes in display order ─────────────────────────────────────────── */
const ALL_MODES = ["Question", "Scholar", "Grammar", "Maths", "Coder", "Freaky"] as const;
type Mode = typeof ALL_MODES[number];

/* ── Types ──────────────────────────────────────────────────────────────── */
interface Feature { label: string; included: boolean }
interface Plan {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  priceMonthly: string;
  priceYearly: string | null;
  periodMonthly: string;
  periodYearly: string | null;
  modes: Mode[];           // modes this plan includes
  features: Feature[];
  recommended?: boolean;
  accent: {
    glow: string;
    border: string;
    iconBg: string;
    check: string;
    modeActive: string;    // pill bg for active modes
    modeText: string;      // text for active mode pills
    btnBg: string;
    btnText: string;
    btnHover: string;
  };
}

/* ── Plan data ──────────────────────────────────────────────────────────── */
const plans: Plan[] = [
  {
    id: "lite",
    name: "Zooey Lite",
    description: "Try Zooey for free.",
    icon: <Send className="h-7 w-7" />,
    priceMonthly: "$0",
    priceYearly: null,
    periodMonthly: "forever",
    periodYearly: null,
    modes: ["Question"],
    features: [
      { label: "Hotkey activation",          included: true  },
      { label: "Screen awareness",           included: true  },
      { label: "Default Zooey character",    included: true  },
      { label: "All AI modes",               included: false },
      { label: "Special edition characters", included: false },
      { label: "Priority updates",           included: false },
    ],
    accent: {
      glow:       "rgba(148,163,184,0.18)",
      border:     "border-slate-500/25",
      iconBg:     "bg-slate-500/10",
      check:      "text-slate-300",
      modeActive: "bg-slate-500/25 border-slate-400/30",
      modeText:   "text-slate-200",
      btnBg:      "bg-slate-700/60 hover:bg-slate-600/70",
      btnText:    "text-white",
      btnHover:   "ring-slate-500/40",
    },
  },
  {
    id: "plus",
    name: "Zooey Plus",
    description: "For those who use Zooey daily.",
    icon: <Rocket className="h-7 w-7" />,
    priceMonthly: "$9.99",
    priceYearly:  "$82.99",
    periodMonthly: "/ month",
    periodYearly:  "/ year",
    recommended: true,
    modes: ["Question", "Scholar", "Grammar", "Maths"],
    features: [
      { label: "Hotkey activation",                  included: true  },
      { label: "Screen awareness",                   included: true  },
      { label: "Multiple AI models",                 included: true  },
      { label: "Limited special edition characters", included: true  },
      { label: "Priority updates",                   included: true  },
      { label: "Pixel art character creator",        included: false },
      { label: "Full character library",             included: false },
    ],
    accent: {
      glow:       "rgba(74,222,128,0.28)",
      border:     "border-green-400/45",
      iconBg:     "bg-green-400/10",
      check:      "text-green-400",
      modeActive: "bg-green-400/15 border-green-400/35",
      modeText:   "text-green-300",
      btnBg:      "bg-green-400 hover:bg-green-300",
      btnText:    "text-[#050608]",
      btnHover:   "ring-green-400/50",
    },
  },
  {
    id: "maxx",
    name: "Zooey Maxx",
    description: "Everything, for keeps.",
    icon: <UfoIcon className="h-7 w-7" />,
    priceMonthly: "$14.99",
    priceYearly:  "$124.99",
    periodMonthly: "/ month",
    periodYearly:  "/ year",
    modes: ["Question", "Scholar", "Grammar", "Maths", "Coder", "Freaky"],
    features: [
      { label: "Hotkey activation",          included: true },
      { label: "Screen awareness",           included: true },
      { label: "Screenshot parsing",         included: true },
      { label: "Multiple AI models",         included: true },
      { label: "Full character library",     included: true },
      { label: "Pixel art character creator",included: true },
      { label: "Founding Member Status (100 left)", included: true },
    ],
    accent: {
      glow:       "rgba(167,139,250,0.22)",
      border:     "border-violet-400/35",
      iconBg:     "bg-violet-400/10",
      check:      "text-violet-400",
      modeActive: "bg-violet-500/20 border-violet-400/35",
      modeText:   "text-violet-300",
      btnBg:      "bg-violet-500/80 hover:bg-violet-400/90",
      btnText:    "text-white",
      btnHover:   "ring-violet-400/50",
    },
  },
];

/* ── Card ───────────────────────────────────────────────────────────────── */
function PlanCard({ plan, isYearly }: { plan: Plan; isYearly: boolean }) {
  const price  = isYearly && plan.priceYearly  ? plan.priceYearly  : plan.priceMonthly;
  const period = isYearly && plan.periodYearly ? plan.periodYearly : plan.periodMonthly;

  const iconColor = plan.id === "plus" ? "#4ade80"
    : plan.id === "maxx" ? "#a78bfa"
    : "#94a3b8";

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-[24px] border bg-[rgba(7,11,7,0.55)] p-6 backdrop-blur-xl",
        "transition-all duration-300 hover:-translate-y-1",
        plan.accent.border,
      )}
      style={{
        boxShadow: plan.recommended
          ? `0 0 0 1px rgba(74,222,128,0.22), 0 8px 48px ${plan.accent.glow}, 0 2px 8px rgba(0,0,0,0.4)`
          : `0 4px 24px rgba(0,0,0,0.3)`,
        transform: plan.recommended ? "scale(1.04)" : undefined,
      }}
    >
      {/* Recommended pill */}
      {plan.recommended && (
        <div className="absolute -top-[13px] left-0 right-0 mx-auto w-fit">
          <span className="rounded-full bg-green-400 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-[#050608]">
            Recommended
          </span>
        </div>
      )}

      {/* Hover inner glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse 80% 55% at 50% 0%, ${plan.accent.glow.replace(/[\d.]+\)$/, "0.09)")}, transparent 70%)`,
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px rounded-t-[24px]"
        style={{ background: `linear-gradient(to right, transparent, ${plan.accent.glow}, transparent)` }}
      />

      {/* Icon */}
      <div className={cn("mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[13px]", plan.accent.iconBg)}
        style={{ color: iconColor }}>
        {plan.icon}
      </div>

      {/* Name + desc */}
      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
      <p className="mt-1 text-[13px] text-white/45">{plan.description}</p>

      {/* Price */}
      <div className="mt-4 flex items-end gap-1">
        <span
          className="font-display text-[2.15rem] font-bold text-white transition-all duration-300"
          style={{ textShadow: plan.recommended ? "0 0 24px rgba(74,222,128,0.3)" : "none" }}
        >
          {price}
        </span>
        <span className="mb-1 text-sm text-white/40">{period}</span>
      </div>

      {/* CTA */}
      <a
        href="/download"
        className={cn(
          "relative mt-4 flex w-full items-center justify-center rounded-full py-[9px]",
          "text-[13px] font-bold tracking-wide transition-all duration-200 ring-0 hover:ring-2",
          plan.accent.btnBg, plan.accent.btnText, plan.accent.btnHover,
        )}
      >
        Join Waitlist
      </a>

      {/* Divider */}
      <div className="my-4 h-px bg-white/[0.07]" />

      {/* ── AI Modes ── */}
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/30">
        AI Modes
      </p>
      <div className="mb-4 flex flex-wrap gap-[6px]">
        {ALL_MODES.map((mode) => {
          const active = plan.modes.includes(mode);
          return (
            <span
              key={mode}
              className={cn(
                "rounded-full border px-2.5 py-[3px] text-[12px] font-semibold transition-all duration-200",
                active
                  ? cn(plan.accent.modeActive, plan.accent.modeText)
                  : "border-white/8 bg-white/[0.03] text-white/18 line-through",
              )}
            >
              {mode}
            </span>
          );
        })}
      </div>

      {/* Divider */}
      <div className="mb-4 h-px bg-white/[0.07]" />

      {/* Features */}
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/30">
        Includes
      </p>
      <ul className="space-y-[8px]">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            {f.included ? (
              <Check className={cn("mt-[1px] h-4 w-4 shrink-0", plan.accent.check)} />
            ) : (
              <X className="mt-[1px] h-4 w-4 shrink-0 text-white/18" />
            )}
            <span className={cn(
              "text-[13.5px] leading-snug",
              f.included ? "text-white/65" : "text-white/20 line-through",
            )}>
              {f.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Section ────────────────────────────────────────────────────────────── */
export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="relative px-4 py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(74,222,128,0.25), transparent)" }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(ellipse, rgba(74,222,128,0.04) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.38em] text-green-300/70">
            Pricing
          </p>
          <h2
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ textShadow: "0 0 40px rgba(74,222,128,0.15), 0 4px 20px rgba(0,0,0,0.6)" }}
          >
            Adopt your Zooey.
          </h2>

          {/* Toggle */}
          <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 backdrop-blur-sm">
            <span className={cn("text-sm transition-colors", !isYearly ? "text-white" : "text-white/40")}>
              Monthly
            </span>
            <button
              role="switch"
              aria-checked={isYearly}
              onClick={() => setIsYearly(!isYearly)}
              className={cn(
                "relative h-6 w-11 rounded-full border transition-colors duration-300",
                isYearly ? "border-green-400/60 bg-green-400/20" : "border-white/20 bg-white/[0.06]",
              )}
            >
              <span className={cn(
                "absolute top-[3px] block h-[18px] w-[18px] rounded-full transition-all duration-300",
                isYearly ? "left-[22px] bg-green-400" : "left-[3px] bg-white/60",
              )} />
            </button>
            <span className={cn("text-sm transition-colors", isYearly ? "text-white" : "text-white/40")}>
              Yearly
            </span>
            {isYearly && (
              <span className="rounded-full bg-green-400/15 px-2 py-0.5 text-[11px] font-semibold text-green-300">
                Save 17%
              </span>
            )}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-start">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} isYearly={isYearly} />
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-white/25">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
