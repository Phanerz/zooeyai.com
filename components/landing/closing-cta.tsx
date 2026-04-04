import { ArrowUpRight, Download, Sparkles } from 'lucide-react';
import { StarButton } from '@/components/ui/star-button';

export function ClosingCta() {
  return (
    <section id="download" className="relative py-24 sm:py-28">
      <div className="shell">
        <div className="panel-surface relative overflow-hidden rounded-[36px] p-8 sm:p-10 lg:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(74,222,128,0.18),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(111,120,255,0.18),transparent_20%)]" />
          <div className="absolute right-6 top-6 hidden h-28 w-28 rounded-full border border-green-400/15 bg-green-400/8 blur-2xl md:block" />

          <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-green-300/70">
                Closing CTA
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Bring Zooey onto your screen and keep your flow intact.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/66">
                For writers, builders, operators, and anyone who wants instant help without opening another place to work.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="flex justify-start">
                <StarButton href="#top" className="text-base px-8 py-4">
                  <span className="flex items-center gap-3">
                    <Download className="h-5 w-5" />
                    Join the first release
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </StarButton>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-green-300/70">
                  <Sparkles className="h-4 w-4" />
                  What ships with Zooey
                </div>
                <div className="grid gap-3 text-sm text-white/68 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    Desktop-first launcher
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    Fast mode switching
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    Near-cursor output
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    Personal workflow setup
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
