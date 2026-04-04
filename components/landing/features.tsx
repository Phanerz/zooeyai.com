'use client';

import { useMemo, useState } from 'react';
import {
  AppWindow,
  Command,
  LockKeyhole,
  Orbit,
  Sparkles,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const smoothEase = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    id: 'instant',
    title: 'Instant Actions',
    eyebrow: 'Press a key. It is done.',
    blurb: 'No prompt choreography. No setup ritual. Zooey executes the moment you call it.',
    detail:
      'The win is speed you can feel. One hotkey, one mode, one result, and you are already back in what you were doing.',
    icon: Zap,
    orbitClass: 'left-1/2 top-0 -translate-x-1/2'
  },
  {
    id: 'tabs',
    title: 'No Tabs Needed',
    eyebrow: 'Stay in your flow.',
    blurb: 'You do not get pulled into another window just to finish a tiny task.',
    detail:
      'Zooey works where you already are, so the task ends without the usual detour through tabs, sidebars, or context switching.',
    icon: AppWindow,
    orbitClass: 'right-[6%] top-1/2 -translate-y-1/2'
  },
  {
    id: 'always',
    title: 'Always There',
    eyebrow: 'Ready the moment you need it.',
    blurb: 'Zooey lives on your screen like a companion, not a destination.',
    detail:
      'It stays close, quiet, and available. You do not go looking for it. You just use it when the next thought shows up.',
    icon: Orbit,
    orbitClass: 'left-1/2 bottom-0 -translate-x-1/2'
  },
  {
    id: 'private',
    title: 'Fast. Private. Yours.',
    eyebrow: 'Runs locally, responds instantly.',
    blurb: 'Your data stays with you, and the whole thing feels personal from the first shortcut.',
    detail:
      'This is the difference between borrowing someone else’s tool and having your own. Faster response, less friction, more trust.',
    icon: LockKeyhole,
    orbitClass: 'left-[6%] top-1/2 -translate-y-1/2'
  },
  {
    id: 'modes',
    title: 'Clear Modes',
    eyebrow: 'No guessing, no messy prompts.',
    blurb: 'Each mode has a job, so you know what will happen before you press enter.',
    detail:
      'Write means write. Fix means fix. Solve means solve. The product stays predictable, which makes it far easier to rely on all day.',
    icon: Command,
    orbitClass: 'left-[18%] top-[12%]'
  }
];

const trustPoints = [
  'Feels instant instead of “thinking…”',
  'Keeps you in the same working context',
  'Gives each action a clear, reliable shape'
];

export function Features() {
  const [activeId, setActiveId] = useState(features[0].id);

  const activeFeature = useMemo(
    () => features.find((feature) => feature.id === activeId) ?? features[0],
    [activeId]
  );

  return (
    <section id="features" className="relative py-24 sm:py-28">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-green-300/70">
            Core features
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Five reasons Zooey feels better in practice than it sounds on paper
          </h2>
          <p className="mt-5 text-balance text-lg leading-8 text-white/66">
            The magic is not a giant interface. It is how little Zooey asks from you before it gets useful.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="panel-surface relative min-h-[35rem] overflow-hidden p-6 md:p-8">
            <div className="absolute inset-0 opacity-80">
              <div className="bg-grid-fade absolute inset-0" />
              <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
              <div className="absolute left-1/2 top-1/2 h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-400/12" />
            </div>

            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <div className="relative grid h-36 w-36 place-items-center rounded-full border border-green-400/20 bg-[radial-gradient(circle,rgba(74,222,128,0.24),rgba(7,10,12,0.88))] shadow-glow">
                <div className="absolute h-40 w-40 rounded-full border border-green-400/15 animate-ring" />
                <div className="text-center">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-green-300/70">
                    Companion
                  </p>
                  <span className="mt-1 block font-display text-3xl font-semibold tracking-tight text-white">
                    Zooey
                  </span>
                </div>
              </div>
            </div>

            <div className="relative hidden h-[35rem] md:block">
              {features.map((feature) => {
                const Icon = feature.icon;
                const isActive = feature.id === activeId;

                return (
                  <button
                    key={feature.id}
                    type="button"
                    onMouseEnter={() => setActiveId(feature.id)}
                    onFocus={() => setActiveId(feature.id)}
                    onClick={() => setActiveId(feature.id)}
                    className={`absolute ${feature.orbitClass} z-20 rounded-full`}
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1.08 : 1,
                        borderColor: isActive
                          ? 'rgba(74, 222, 128, 0.5)'
                          : 'rgba(255,255,255,0.18)',
                        backgroundColor: isActive
                          ? 'rgba(10, 19, 16, 0.94)'
                          : 'rgba(0, 0, 0, 0.7)'
                      }}
                      transition={{ duration: 0.45, ease: smoothEase }}
                      className="grid h-16 w-16 place-items-center rounded-full border text-white/80 shadow-[0_0_30px_rgba(0,0,0,0.3)] backdrop-blur-md"
                    >
                      <Icon className={`h-5 w-5 ${isActive ? 'text-green-300' : ''}`} />
                    </motion.div>
                    <p className="mt-3 whitespace-nowrap text-xs uppercase tracking-[0.28em] text-white/55">
                      {feature.title}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="relative z-20 mt-44 grid gap-3 md:hidden">
              {features.map((feature) => {
                const Icon = feature.icon;
                const isActive = feature.id === activeId;

                return (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => setActiveId(feature.id)}
                    className={`flex items-start gap-3 rounded-2xl border px-4 py-4 text-left transition ${
                      isActive
                        ? 'border-green-400/35 bg-green-400/10'
                        : 'border-white/10 bg-white/[0.03]'
                    }`}
                  >
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-black/40">
                      <Icon className={`h-5 w-5 ${isActive ? 'text-green-300' : 'text-white/65'}`} />
                    </div>
                    <div>
                      <p className="font-display text-lg font-semibold tracking-tight text-white">
                        {feature.title}
                      </p>
                      <p className="mt-1 text-sm text-white/55">{feature.eyebrow}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div
            key={activeFeature.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: smoothEase }}
            className="panel-surface flex flex-col justify-between p-6 md:p-8"
          >
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-green-300/70">
                <Sparkles className="h-4 w-4" />
                Why people keep using it
              </div>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {activeFeature.title}
              </h3>
              <p className="mt-4 text-xl leading-8 text-white/78">
                {activeFeature.eyebrow}
              </p>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/62">
                {activeFeature.blurb}
              </p>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/58">
                {activeFeature.detail}
              </p>
            </div>

            <div className="mt-10 grid gap-4">
              <div className="rounded-[24px] border border-white/10 bg-black/40 p-5">
                <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/45">
                  <span>What this changes</span>
                  <span className="text-green-300">Real-world benefit</span>
                </div>
                <div className="grid gap-3">
                  {trustPoints.map((point) => (
                    <div
                      key={`${activeFeature.id}-${point}`}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white/76"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-green-400/20 bg-green-400/8 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-green-300/70">
                  In one sentence
                </p>
                <p className="mt-3 font-display text-2xl font-semibold tracking-tight text-white">
                  {activeFeature.eyebrow}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  {activeFeature.blurb}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
