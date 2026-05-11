'use client';

import React, { useState, useEffect } from 'react';

/* ── Download URLs ──────────────────────────────────────────────────────────── */
const WIN_URL =
  'https://github.com/Phanerz/zooey-download/releases/download/Zooey-1.0.0-beta/Zooey-1.0.0-beta-setup-x64.exe';
const MAC_ARM_URL =
  'https://github.com/Phanerz/zooey-download/releases/download/Zooey-1.0.0-beta/Zooey-1.0.0-beta-arm64-mac.zip';
const MAC_INTEL_URL =
  'https://github.com/Phanerz/zooey-download/releases/download/Zooey-1.0.0-beta/Zooey-1.0.0-beta-mac.zip';

/* ── Real platform SVG logos ────────────────────────────────────────────────── */
function AppleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function WindowsLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 88 88" fill="currentColor" className={className} aria-hidden="true">
      <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349l-.011 41.34-47.318-6.678-.066-34.739z" />
    </svg>
  );
}

/* ── Star shape ─────────────────────────────────────────────────────────────── */
const StarShape = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 784.11 815.53"
    className={className ?? 'w-full h-auto'}
    aria-hidden="true"
  >
    <path d="M392.05 0c-20.9,210.08-184.06,378.41-392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93-210.06 184.09-378.37 392.05-407.74-207.98-29.38-371.16-197.69-392.06-407.78z" />
  </svg>
);

/* ── Red star particles (Mac) ───────────────────────────────────────────────── */
const RedStars = () => (
  <>
    <div className="absolute top-[20%] left-[20%] w-[20px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0.05,0.83,0.43,0.96)] drop-shadow-[0_0_0_rgba(239,68,68,0)] group-hover:top-[-80%] group-hover:left-[-30%] group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.9)] group-hover:z-[2]"><StarShape className="fill-[#ef4444]" /></div>
    <div className="absolute top-[45%] left-[45%] w-[12px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(239,68,68,0)] group-hover:top-[-25%] group-hover:left-[10%] group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.9)] group-hover:z-[2]"><StarShape className="fill-[#ef4444]" /></div>
    <div className="absolute top-[40%] left-[40%] w-[5px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(239,68,68,0)] group-hover:top-[55%] group-hover:left-[25%] group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.9)] group-hover:z-[2]"><StarShape className="fill-[#ef4444]" /></div>
    <div className="absolute top-[20%] left-[40%] w-[8px] z-[-5] transition-all duration-[800ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(239,68,68,0)] group-hover:top-[30%] group-hover:left-[80%] group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.9)] group-hover:z-[2]"><StarShape className="fill-[#ef4444]" /></div>
    <div className="absolute top-[25%] left-[45%] w-[12px] z-[-5] transition-all duration-[600ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(239,68,68,0)] group-hover:top-[25%] group-hover:left-[115%] group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.9)] group-hover:z-[2]"><StarShape className="fill-[#ef4444]" /></div>
    <div className="absolute top-[5%] left-[50%] w-[5px] z-[-5] transition-all duration-[800ms] ease-in-out drop-shadow-[0_0_0_rgba(239,68,68,0)] group-hover:top-[5%] group-hover:left-[60%] group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.9)] group-hover:z-[2]"><StarShape className="fill-[#ef4444]" /></div>
  </>
);

/* ── Blue star particles (Windows) ─────────────────────────────────────────── */
const BlueStars = () => (
  <>
    <div className="absolute top-[20%] left-[20%] w-[20px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0.05,0.83,0.43,0.96)] drop-shadow-[0_0_0_rgba(59,130,246,0)] group-hover:top-[-80%] group-hover:left-[-30%] group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.9)] group-hover:z-[2]"><StarShape className="fill-[#3b82f6]" /></div>
    <div className="absolute top-[45%] left-[45%] w-[12px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(59,130,246,0)] group-hover:top-[-25%] group-hover:left-[10%] group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.9)] group-hover:z-[2]"><StarShape className="fill-[#3b82f6]" /></div>
    <div className="absolute top-[40%] left-[40%] w-[5px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(59,130,246,0)] group-hover:top-[55%] group-hover:left-[25%] group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.9)] group-hover:z-[2]"><StarShape className="fill-[#3b82f6]" /></div>
    <div className="absolute top-[20%] left-[40%] w-[8px] z-[-5] transition-all duration-[800ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(59,130,246,0)] group-hover:top-[30%] group-hover:left-[80%] group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.9)] group-hover:z-[2]"><StarShape className="fill-[#3b82f6]" /></div>
    <div className="absolute top-[25%] left-[45%] w-[12px] z-[-5] transition-all duration-[600ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(59,130,246,0)] group-hover:top-[25%] group-hover:left-[115%] group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.9)] group-hover:z-[2]"><StarShape className="fill-[#3b82f6]" /></div>
    <div className="absolute top-[5%] left-[50%] w-[5px] z-[-5] transition-all duration-[800ms] ease-in-out drop-shadow-[0_0_0_rgba(59,130,246,0)] group-hover:top-[5%] group-hover:left-[60%] group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.9)] group-hover:z-[2]"><StarShape className="fill-[#3b82f6]" /></div>
  </>
);

/* ── Main section ───────────────────────────────────────────────────────────── */
export function DownloadShowcase() {
  const [activeGlow, setActiveGlow] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveGlow((p) => (p + 1) % 3), 2400);
    return () => clearInterval(t);
  }, []);

  const macNote =
    'Download as ZIP. Unzip and drag Zooey to Applications. If Mac blocks it, go to System Preferences, Security and Privacy, then Open Anyway.';

  return (
    <section id="download" className="relative py-24 sm:py-28">
      <div className="shell">
        <div className="flex flex-col items-center gap-14">

          {/* ── Heading ── */}
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-green-300/70">
              Free Beta — v1.0.0
            </p>
            <h2 className="max-w-lg font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Download Zooey
            </h2>
            <p className="max-w-md text-base text-white/50">
              Your AI desktop companion. Installed in under a minute — no terminal, no config.
            </p>
          </div>

          {/* ── Three download buttons ── */}
          <div className="flex w-full max-w-md flex-col items-stretch gap-5">

            {/* Windows */}
            <div className="flex flex-col items-center gap-2.5">
              <div className="relative w-full">
                <div
                  className="pointer-events-none absolute -inset-4 -z-10 rounded-full blur-2xl transition-opacity duration-700"
                  style={{ background: 'rgba(59,130,246,0.55)', opacity: activeGlow === 0 ? 1 : 0.15 }}
                />
                <a
                  href={WIN_URL}
                  download
                  className="group relative flex w-full items-center justify-center gap-3 overflow-visible rounded-full border-2 border-blue-500 px-9 py-4 text-[15px] font-bold tracking-wide active:scale-95"
                  style={{
                    background: activeGlow === 0 ? 'rgba(59,130,246,0.92)' : 'rgba(59,130,246,0.08)',
                    color: activeGlow === 0 ? '#0a0a0a' : 'rgba(120,160,255,0.90)',
                    boxShadow:
                      activeGlow === 0
                        ? '0 0 36px rgba(59,130,246,0.80), 0 0 72px rgba(59,130,246,0.40), 0 0 120px rgba(59,130,246,0.18), inset 0 1px 0 rgba(255,255,255,0.18)'
                        : '0 0 8px rgba(59,130,246,0.20)',
                    transition: 'box-shadow 0.65s ease, background 0.65s ease, color 0.65s ease',
                  }}
                >
                  <WindowsLogo className="h-[15px] w-[15px] shrink-0" />
                  Download for Windows
                  <BlueStars />
                </a>
              </div>
              <p className="text-center text-[11px] leading-relaxed text-white/38">
                If Windows shows a security warning, click{' '}
                <span className="text-white/58">More info</span> then{' '}
                <span className="text-white/58">Run anyway</span>. This warning disappears once we have
                code signing in place.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-white/[0.07]" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">macOS</span>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            {/* Mac M1 / M2 / M3 */}
            <div className="flex flex-col items-center gap-2.5">
              <div className="relative w-full">
                <div
                  className="pointer-events-none absolute -inset-4 -z-10 rounded-full blur-2xl transition-opacity duration-700"
                  style={{ background: 'rgba(239,68,68,0.55)', opacity: activeGlow === 1 ? 1 : 0.15 }}
                />
                <a
                  href={MAC_ARM_URL}
                  download
                  className="group relative flex w-full items-center justify-center gap-3 overflow-visible rounded-full border-2 border-red-500 px-9 py-4 text-[15px] font-bold tracking-wide active:scale-95"
                  style={{
                    background: activeGlow === 1 ? 'rgba(239,68,68,0.92)' : 'rgba(239,68,68,0.08)',
                    color: activeGlow === 1 ? '#0a0a0a' : 'rgba(255,120,120,0.90)',
                    boxShadow:
                      activeGlow === 1
                        ? '0 0 36px rgba(239,68,68,0.80), 0 0 72px rgba(239,68,68,0.40), 0 0 120px rgba(239,68,68,0.18), inset 0 1px 0 rgba(255,255,255,0.18)'
                        : '0 0 8px rgba(239,68,68,0.20)',
                    transition: 'box-shadow 0.65s ease, background 0.65s ease, color 0.65s ease',
                  }}
                >
                  <AppleLogo className="h-[18px] w-[18px] shrink-0" />
                  Download for Mac (M1 / M2 / M3)
                  <RedStars />
                </a>
              </div>
              <p className="text-center text-[11px] leading-relaxed text-white/38">{macNote}</p>
            </div>

            {/* Mac Intel */}
            <div className="flex flex-col items-center gap-2.5">
              <div className="relative w-full">
                <div
                  className="pointer-events-none absolute -inset-4 -z-10 rounded-full blur-2xl transition-opacity duration-700"
                  style={{ background: 'rgba(239,68,68,0.55)', opacity: activeGlow === 2 ? 1 : 0.15 }}
                />
                <a
                  href={MAC_INTEL_URL}
                  download
                  className="group relative flex w-full items-center justify-center gap-3 overflow-visible rounded-full border-2 border-red-500 px-9 py-4 text-[15px] font-bold tracking-wide active:scale-95"
                  style={{
                    background: activeGlow === 2 ? 'rgba(239,68,68,0.92)' : 'rgba(239,68,68,0.08)',
                    color: activeGlow === 2 ? '#0a0a0a' : 'rgba(255,120,120,0.90)',
                    boxShadow:
                      activeGlow === 2
                        ? '0 0 36px rgba(239,68,68,0.80), 0 0 72px rgba(239,68,68,0.40), 0 0 120px rgba(239,68,68,0.18), inset 0 1px 0 rgba(255,255,255,0.18)'
                        : '0 0 8px rgba(239,68,68,0.20)',
                    transition: 'box-shadow 0.65s ease, background 0.65s ease, color 0.65s ease',
                  }}
                >
                  <AppleLogo className="h-[18px] w-[18px] shrink-0" />
                  Download for Mac (Intel)
                  <RedStars />
                </a>
              </div>
              <p className="text-center text-[11px] leading-relaxed text-white/38">{macNote}</p>
            </div>

          </div>

          {/* ── Version + platform pill ── */}
          <span className="rounded-full border border-white/10 bg-black/30 px-5 py-1.5 text-[10px] uppercase tracking-[0.35em] text-white/35 backdrop-blur-md">
            v1.0.0-beta &middot; Windows 10 / 11 &middot; macOS 11+ &middot; Free
          </span>

        </div>
      </div>
    </section>
  );
}
