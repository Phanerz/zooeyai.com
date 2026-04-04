import { Github, Sparkles, Twitter } from 'lucide-react';

const footerLinks = ['Modes', 'Desktop', 'Privacy', 'Updates'];

export function Footer() {
  return (
    <footer className="relative border-t border-white/8 py-12">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-green-400/25 bg-green-400/10 text-green-300 shadow-glow">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-2xl font-semibold tracking-tight text-white">
                  Zooey
                </p>
                <p className="text-sm text-white/50">
                  A desktop companion for instant execution.
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/55">
              Less switching. Less waiting. More staying in motion. Zooey is designed to feel like part of your desktop, not another place to visit.
            </p>
          </div>

          <div className="panel-surface overflow-hidden rounded-[30px] p-5">
            <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/45">
              <span>Screen presence</span>
              <span className="text-green-300">Ready</span>
            </div>

            <div className="grid gap-4 md:grid-cols-[0.88fr_1.12fr]">
              <div className="rounded-[24px] border border-white/10 bg-black/35 p-4">
                <div className="grid gap-2">
                  {['Write', 'Fix', 'Solve', 'Custom'].map((mode) => (
                    <div
                      key={mode}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/70"
                    >
                      <span>{mode}</span>
                      <span className="text-green-300">armed</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-green-400/18 bg-[linear-gradient(180deg,rgba(74,222,128,0.06),rgba(255,255,255,0.02))] p-4">
                <div className="grid gap-3">
                  <div className="flex flex-wrap gap-2">
                    {footerLinks.map((link) => (
                      <span
                        key={link}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/55"
                      >
                        {link}
                      </span>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/35 px-4 py-5">
                    <p className="font-display text-2xl font-semibold tracking-tight text-white">
                      Stay in the same window.
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/58">
                      That one line explains the whole product better than a hundred screenshots.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-white/55">
                    <a
                      href="#"
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] transition hover:text-white"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] transition hover:text-white"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                    <p className="text-xs uppercase tracking-[0.28em] text-white/38">
                      © 2026 Zooey
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
