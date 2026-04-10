'use client';

import { CornerDownRight } from 'lucide-react';
import ScrollExpandMedia from '@/components/blocks/scroll-expansion-hero';


function DemoOverlay() {
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-green-300 md:text-xs">
          Zooey Demo
        </div>
        <div className="rounded-full border border-green-400/20 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white/70 md:text-xs">
          Instant Output
        </div>
      </div>

      <div className="max-w-[85%] rounded-[24px] border border-white/10 bg-black/55 p-4 backdrop-blur-md md:max-w-[62%] md:p-5">
        <div className="mb-4 flex items-center gap-2 text-white/50">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center justify-between rounded-2xl border border-green-400/20 bg-green-400/8 px-4 py-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/45 md:text-xs">
                Hotkey
              </p>
              <p className="mt-1 font-display text-lg tracking-tight text-white md:text-2xl">
                Ctrl + Space
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-right">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">
                Mode
              </p>
              <p className="mt-1 text-sm font-semibold text-green-300 md:text-base">
                Fix This
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/45 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/45">
              <CornerDownRight className="h-3.5 w-3.5 text-green-300" />
              Output near cursor
            </div>
            <p className="text-sm text-white/80 md:text-base">
              Rewrote the sentence, fixed the typo, and kept your cursor in place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative">
      {/* webmSrc="/ZOOEY_DEMO_AD_1.webm" — add this prop once a WebM version is generated */}
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/zooey-hero-demo.mp4"
        posterSrc="/zooey-backdrop.svg"
        bgImageSrc="/zooey-backdrop.svg"
        titleLines={['Your AI assistant,', 'always on screen.']}
        description="Press a key. Zooey helps you write, fix, and solve, without leaving the window you are in."
        scrollToExpand="Scroll to see Zooey in action"
        presenceSrc="/zooey-icon.png"
      >
      </ScrollExpandMedia>
    </section>
  );
}
