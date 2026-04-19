'use client';

import { CornerDownRight } from 'lucide-react';
import ScrollExpandMedia from '@/components/blocks/scroll-expansion-hero';
import { StarButton } from '@/components/ui/star-button';

function WindowsLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.949" />
    </svg>
  );
}

function HeroDownloadCta() {
  return (
    <div className="flex flex-col items-center gap-3">
      <StarButton
        href="#download-coming-soon"
        variant="cyan"
        className="px-8 py-3 text-[15px] font-bold tracking-wide"
      >
        <WindowsLogo className="mr-2.5 h-4 w-4 shrink-0" />
        Download for Windows
      </StarButton>

      <p className="text-[11px] uppercase tracking-[0.32em] text-white/38">
        Windows 11 &middot; Free to start &middot; No setup required
      </p>

      <span className="rounded-full border border-cyan-400/20 bg-black/35 px-4 py-1.5 text-[10px] uppercase tracking-[0.35em] text-cyan-300/70 backdrop-blur-md">
        v1.0.0 &middot; Early Access
      </span>
    </div>
  );
}


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
        downloadCta={<HeroDownloadCta />}
        scrollToExpand="Scroll to see Zooey in action"
        presenceSrc="/zooey-icon.png"
      >
      </ScrollExpandMedia>
    </section>
  );
}
