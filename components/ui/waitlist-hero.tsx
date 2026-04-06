"use client"

import { useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Image from "next/image"
import { StarButton } from "@/components/ui/star-button"

/* ── Plan meta ───────────────────────────────────────────────────────────────── */
const PLAN_META: Record<string, { label: string; color: string; bg: string }> = {
  lite: { label: "Zooey Lite",  color: "text-slate-300",  bg: "bg-slate-500/15 border-slate-500/30" },
  plus: { label: "Zooey Plus",  color: "text-green-300",  bg: "bg-green-400/12 border-green-400/30" },
  maxx: { label: "Zooey Maxx",  color: "text-violet-300", bg: "bg-violet-500/15 border-violet-400/30" },
}

/* ── Orbital ring SVG layers ──────────────────────────────────────────────── */
function RingLayer({
  size,
  opacity,
  clockwise,
  rings,
  nodes,
}: {
  size: number
  opacity: number
  clockwise: boolean
  rings: { r: number; dash?: string; strokeOpacity?: number; strokeWidth?: number }[]
  nodes?: { angle: number; r: number }[]
}) {
  const cx = size / 2
  const cy = size / 2
  const animClass = clockwise ? "ring-spin-cw" : "ring-spin-ccw"

  return (
    <div
      className={animClass}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
      }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        style={{ opacity }}
        aria-hidden
      >
        {rings.map((ring, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={ring.r}
            fill="none"
            stroke={`rgba(74,222,128,${ring.strokeOpacity ?? 0.18})`}
            strokeWidth={ring.strokeWidth ?? 1}
            strokeDasharray={ring.dash ?? "none"}
          />
        ))}
        {nodes?.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180
          /* Round to avoid SSR/client floating-point hydration mismatch */
          const nx = Math.round((cx + node.r * Math.cos(rad)) * 1000) / 1000
          const ny = Math.round((cy + node.r * Math.sin(rad)) * 1000) / 1000
          return (
            <g key={i}>
              <circle cx={nx} cy={ny} r={4} fill="rgba(74,222,128,0.55)" />
              <circle cx={nx} cy={ny} r={7} fill="none" stroke="rgba(74,222,128,0.25)" strokeWidth="1" />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/* ── Confetti ─────────────────────────────────────────────────────────────── */
function useConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const fire = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    type P = { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number }
    const colors = ["#4ade80", "#86efac", "#bbf7d0", "#ffffff", "#a3e635", "#6ee7b7"]
    const particles: P[] = []

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 2.2) * 10,
        life: 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 4 + 2,
      })
    }

    const animate = () => {
      if (!particles.length) { ctx.clearRect(0, 0, canvas.width, canvas.height); return }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy; p.vy += 0.42; p.life -= 2
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0, p.life / 100)
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill()
        if (p.life <= 0) particles.splice(i, 1)
      }
      requestAnimationFrame(animate)
    }
    animate()
  }

  return { canvasRef, fire }
}

/* ── Inner hero (reads search params) ───────────────────────────────────── */
function WaitlistHeroInner() {
  const searchParams = useSearchParams()
  const planId  = searchParams.get("plan") ?? ""
  const planMeta = PLAN_META[planId] ?? null

  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const { canvasRef, fire } = useConfetti()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !trimmed.includes("@")) return
    setStatus("loading")
    setErrorMsg("")
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, plan: planId || null }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Try again.")
        setStatus("error")
        return
      }
      setStatus("success")
      setEmail("")
      fire()
    } catch {
      setErrorMsg("Network error. Please try again.")
      setStatus("error")
    }
  }

  return (
    <div className="relative w-full min-h-[100dvh] bg-[#050608] flex flex-col items-center overflow-hidden">

      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes ring-cw  { from { transform: translate(-50%,-50%) rotate(0deg); }   to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes ring-ccw { from { transform: translate(-50%,-50%) rotate(0deg); }   to { transform: translate(-50%,-50%) rotate(-360deg); } }
        .ring-spin-cw  { animation: ring-cw  80s linear infinite; }
        .ring-spin-ccw { animation: ring-ccw 65s linear infinite; }

        @keyframes wl-success-pop {
          0%   { transform: scale(0.82); opacity: 0; }
          55%  { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes wl-success-glow {
          0%, 100% { box-shadow: 0 0 22px rgba(74,222,128,0.4); }
          50%       { box-shadow: 0 0 60px rgba(74,222,128,0.75), 0 0 110px rgba(74,222,128,0.35); }
        }
        @keyframes wl-ring-burst {
          0%   { transform: translate(-50%,-50%) scale(0.85); opacity: 0.9; }
          100% { transform: translate(-50%,-50%) scale(2.1);  opacity: 0; }
        }
        @keyframes wl-draw-check {
          from { stroke-dashoffset: 24; }
          to   { stroke-dashoffset: 0; }
        }
        .wl-success-pop  { animation: wl-success-pop  0.55s cubic-bezier(0.175,0.885,0.32,1.275) forwards; }
        .wl-success-glow { animation: wl-success-glow 2.2s ease-in-out infinite; }
        .wl-ring-burst   { animation: wl-ring-burst   0.85s ease-out forwards; }
        .wl-draw-check   { stroke-dasharray: 24; stroke-dashoffset: 24; animation: wl-draw-check 0.38s ease-out 0.28s forwards; }
      `}</style>

      {/* ── Background rings (perspective-tilted) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          perspective: "1200px",
          transform: "perspective(1200px) rotateX(14deg)",
          transformOrigin: "center 65%",
        }}
      >
        <RingLayer
          size={2000}
          opacity={0.55}
          clockwise
          rings={[
            { r: 970, dash: "3 14", strokeOpacity: 0.12 },
            { r: 860, strokeOpacity: 0.07 },
            { r: 750, dash: "2 20", strokeOpacity: 0.09 },
          ]}
          nodes={[
            { angle: 30,  r: 970 },
            { angle: 130, r: 970 },
            { angle: 240, r: 970 },
            { angle: 330, r: 860 },
          ]}
        />
        <RingLayer
          size={1200}
          opacity={0.7}
          clockwise={false}
          rings={[
            { r: 570, dash: "4 10", strokeOpacity: 0.18, strokeWidth: 1 },
            { r: 490, strokeOpacity: 0.10 },
            { r: 410, dash: "2 12", strokeOpacity: 0.14 },
          ]}
          nodes={[
            { angle: 60,  r: 570 },
            { angle: 175, r: 570 },
            { angle: 300, r: 490 },
          ]}
        />
        <RingLayer
          size={680}
          opacity={0.85}
          clockwise
          rings={[
            { r: 320, dash: "5 8", strokeOpacity: 0.28, strokeWidth: 1.2 },
            { r: 260, strokeOpacity: 0.15 },
          ]}
          nodes={[
            { angle: 45,  r: 320 },
            { angle: 200, r: 320 },
          ]}
        />
      </div>

      {/* ── Gradient overlays — blend rings into bg from all edges ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: [
            /* top fade */
            "linear-gradient(to bottom, #050608 0%, rgba(5,6,8,0) 22%)",
            /* bottom fade */
            "linear-gradient(to top, #050608 0%, rgba(5,6,8,0) 38%)",
            /* left/right edge fade */
            "linear-gradient(to right, #050608 0%, rgba(5,6,8,0) 12%, rgba(5,6,8,0) 88%, #050608 100%)",
            /* centre green glow */
            "radial-gradient(ellipse 65% 50% at 50% 55%, rgba(74,222,128,0.06) 0%, transparent 70%)",
          ].join(", "),
        }}
      />

      {/* ── Content — centred vertically, offset for fixed header ── */}
      <div className="relative z-10 flex min-h-[100dvh] w-full flex-col items-center justify-center gap-5 px-4 pb-8 pt-24 text-center">

        {/* Zooey icon — borderless, larger */}
        <Image
          src="/zooey-icon.png"
          alt="Zooey"
          width={104}
          height={104}
          className="mb-1 object-contain"
          style={{ filter: "drop-shadow(0 0 22px rgba(74,222,128,0.55)) drop-shadow(0 0 6px rgba(74,222,128,0.3))" }}
        />

        {/* Selected plan badge */}
        {planMeta && (
          <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[12px] font-semibold ${planMeta.bg} ${planMeta.color}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
            Selected plan: {planMeta.label}
          </span>
        )}

        {/* Headline */}
        <h1
          className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl"
          style={{
            textShadow:
              "0 0 40px rgba(74,222,128,0.22), 0 0 80px rgba(74,222,128,0.10), 0 4px 24px rgba(0,0,0,0.7)",
          }}
        >
          Get early access to Zooey.
        </h1>

        {/* Subheadline */}
        <p className="max-w-sm text-base font-medium text-white/55 sm:text-lg">
          Zooey is almost here. Drop your email and be the first one in.
        </p>

        {/* Form / success */}
        <div className="relative mt-3 h-[60px] w-full max-w-[440px]">

          {/* Confetti canvas */}
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
            style={{ width: 560, height: 560 }}
          />

          {/* SUCCESS pill */}
          <div
            className={`absolute inset-0 flex items-center justify-center overflow-hidden rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              status === "success"
                ? "pointer-events-auto opacity-100 wl-success-pop wl-success-glow"
                : "pointer-events-none opacity-0"
            }`}
            style={{ backgroundColor: "#16a34a" }}
          >
            {status === "success" && (
              <>
                <div className="absolute left-1/2 top-1/2 h-full w-full rounded-full border-2 border-green-400 wl-ring-burst" style={{ animationDelay: "0s" }} />
                <div className="absolute left-1/2 top-1/2 h-full w-full rounded-full border-2 border-green-300 wl-ring-burst" style={{ animationDelay: "0.16s" }} />
                <div className="absolute left-1/2 top-1/2 h-full w-full rounded-full border-2 border-green-200 wl-ring-burst" style={{ animationDelay: "0.30s" }} />
              </>
            )}
            <div className="flex items-center gap-2 text-white">
              <div className="rounded-full bg-white/20 p-1">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    className={status === "success" ? "wl-draw-check" : ""}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold">You&apos;re on the list!</span>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className={`relative h-full w-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              status === "success" ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <input
              type="email"
              required
              placeholder="name@email.com"
              value={email}
              disabled={status === "loading"}
              onChange={(e) => setEmail(e.target.value)}
              className="h-full w-full rounded-full border border-white/10 bg-[#131a14] pl-6 pr-[152px] text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-green-400/40 focus:bg-[#182018] disabled:opacity-60"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)" }}
            />
            <div className="absolute bottom-[6px] right-[6px] top-[6px]">
              <StarButton
                type="submit"
                variant="green"
                disabled={status === "loading"}
                className="h-full min-w-[128px] rounded-full px-5 text-[13px] font-bold tracking-wide disabled:cursor-wait"
              >
                {status === "loading" ? (
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  "Join Waitlist"
                )}
              </StarButton>
            </div>
          </form>
        </div>

        {status === "error" && errorMsg && (
          <p className="text-sm font-medium text-red-400/90">{errorMsg}</p>
        )}

        <p className="text-xs text-white/25">No spam. Just one email when Zooey is ready.</p>
      </div>
    </div>
  )
}

/* ── Public export — wraps with Suspense for useSearchParams ─────────────── */
export function WaitlistHero() {
  return (
    <Suspense fallback={null}>
      <WaitlistHeroInner />
    </Suspense>
  )
}
