"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

// w-16 = 64px. HALF used to translate so the node's center sits on the orbit point.
const NODE_SIZE = 64;
const HALF = NODE_SIZE / 2; // 32
const ORBIT_RADIUS = 260;

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [mounted, setMounted] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const rafRef = useRef<number>(0);
  const lastTsRef = useRef<number>(0);
  const angleRef = useRef<number>(0);
  // 'auto' = orbit rotates | 'seeking' = easing to target | 'stopped' = still
  const modeRef = useRef<"auto" | "seeking" | "stopped">("auto");
  const seekTargetRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);

    // Single rAF loop — mode-switched via refs, never torn down
    const tick = (ts: number) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = ts - lastTsRef.current;
      lastTsRef.current = ts;

      if (modeRef.current === "auto") {
        // 0.006 deg/ms → 6 deg/s → full orbit in 60 s
        angleRef.current = (angleRef.current + dt * 0.006) % 360;

      } else if (modeRef.current === "seeking") {
        const diff = (() => {
          let d = ((seekTargetRef.current - angleRef.current) % 360 + 360) % 360;
          if (d > 180) d -= 360; // take the shorter arc
          return d;
        })();

        if (Math.abs(diff) < 0.25) {
          // Arrived — snap and freeze
          angleRef.current = ((seekTargetRef.current % 360) + 360) % 360;
          modeRef.current = "stopped";
        } else {
          // Ease-out: 8 % of remaining distance per frame, min 0.4 °/frame
          const step = Math.sign(diff) * Math.max(Math.abs(diff) * 0.08, 0.4);
          angleRef.current = ((angleRef.current + step) % 360 + 360) % 360;
        }
      }
      // "stopped" → angle unchanged

      setRotationAngle(Number(angleRef.current.toFixed(3)));
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []); // runs once — mode is controlled via modeRef

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      modeRef.current = "auto";
    }
  };

  const getRelatedItems = (itemId: number): number[] => {
    const item = timelineData.find((i) => i.id === itemId);
    return item ? item.relatedIds : [];
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      // collapse everything else
      const next: Record<number, boolean> = {};
      Object.keys(prev).forEach((k) => { next[parseInt(k)] = false; });
      next[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        const pulse: Record<number, boolean> = {};
        getRelatedItems(id).forEach((r) => { pulse[r] = true; });
        setPulseEffect(pulse);
        // Smoothly ease the clicked node up to the 12-o'clock position
        const idx = timelineData.findIndex((item) => item.id === id);
        seekTargetRef.current = ((270 - (idx / timelineData.length) * 360) % 360 + 360) % 360;
        modeRef.current = "seeking";
      } else {
        setActiveNodeId(null);
        modeRef.current = "auto";
        setPulseEffect({});
      }
      return next;
    });
  };

  const calcPosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const rad = (angle * Math.PI) / 180;
    const x = ORBIT_RADIUS * Math.cos(rad);
    const y = ORBIT_RADIUS * Math.sin(rad);
    const zIndex = Math.round(100 + 50 * Math.cos(rad));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(rad)) / 2)));
    return { x, y, zIndex, opacity };
  };

  const isRelatedToActive = (itemId: number) => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const statusStyle = (s: TimelineItem["status"]) => {
    if (s === "completed") return "text-white bg-black border-white";
    if (s === "in-progress") return "text-black bg-white border-black";
    return "text-white bg-black/40 border-white/50";
  };

  if (!mounted) return <div className="w-full h-screen" />;

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
        >
          {/* ── Center orb ───────────────────────────────────────── */}
          <div className="absolute w-28 h-28 rounded-full bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-36 h-36 rounded-full border border-green-400/30 animate-ping opacity-70" />
            <div
              className="absolute w-44 h-44 rounded-full border border-green-400/15 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            />
            <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md" />
          </div>

          {/* ── Orbit ring ───────────────────────────────────────── */}
          <div
            className="absolute rounded-full border border-green-400/20"
            style={{ width: ORBIT_RADIUS * 2, height: ORBIT_RADIUS * 2 }}
          />

          {/* ── Nodes ────────────────────────────────────────────── */}
          {timelineData.map((item, index) => {
            const { x, y, zIndex, opacity } = calcPosition(index, timelineData.length);
            const isExpanded = !!expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = !!pulseEffect[item.id];
            const isHovered = hoveredId === item.id;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute cursor-pointer"
                style={{
                  /*
                   * The flex container (items-center justify-center) already
                   * places this absolute element at (center - 32, center - 32),
                   * so its center is at the container center before transform.
                   * translate(x, y) simply moves that center to the orbit point.
                   * No extra HALF subtraction needed — that was double-counting.
                   * No CSS transition on transform — rAF drives it at 60 fps.
                   */
                  transform: `translate(${x}px, ${y}px)`,
                  zIndex: isExpanded ? 200 : zIndex,
                  opacity: isExpanded ? 1 : opacity,
                  transition: "opacity 0.7s",
                }}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
                // Hover: only track which node — orbit keeps rotating
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* ── Glow halo (absolute, centered on the 64 px node) ── */}
                <div
                  className="absolute rounded-full pointer-events-none transition-all duration-300"
                  style={{
                    width: NODE_SIZE + 48,
                    height: NODE_SIZE + 48,
                    top: -24,
                    left: -24,
                    background: isHovered
                      ? "radial-gradient(circle, rgba(74,222,128,0.45) 0%, rgba(74,222,128,0) 65%)"
                      : isPulsing
                      ? "radial-gradient(circle, rgba(74,222,128,0.22) 0%, rgba(74,222,128,0) 65%)"
                      : "radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 65%)",
                    boxShadow: isHovered ? "0 0 40px 16px rgba(74,222,128,0.16)" : "none",
                  }}
                />

                {/*
                 * ── Float wrapper ──────────────────────────────────────
                 * The node circle is in normal flow here, so this wrapper
                 * is exactly NODE_SIZE × NODE_SIZE and becomes the size
                 * reference for the outer absolute div.
                 * The wrapper gets the float animation on hover; its own
                 * transform (translateY) does not conflict with the node
                 * circle's scale transform.
                 */}
                <div
                  style={{
                    animation:
                      isHovered && !isExpanded
                        ? "node-hover-float 2s ease-in-out infinite"
                        : undefined,
                  }}
                >
                  {/* ── Node circle ── */}
                  <div
                    className={`
                      w-16 h-16 rounded-full flex items-center justify-center
                      border-2 transition-all duration-300
                      ${isExpanded
                        ? "bg-green-400 text-black border-green-300 scale-150"
                        : isHovered
                        ? "bg-green-400/25 text-green-200 border-green-400 scale-110"
                        : isRelated
                        ? "bg-green-400/15 text-green-300 border-green-400/60 animate-pulse"
                        : "bg-black/60 text-green-300/70 border-green-400/25"}
                    `}
                    style={{
                      boxShadow: isExpanded
                        ? "0 0 28px rgba(74,222,128,0.65)"
                        : isHovered
                        ? "0 0 22px rgba(74,222,128,0.75)"
                        : "none",
                    }}
                  >
                    <Icon size={22} />
                  </div>
                </div>

                {/*
                 * ── Label ──────────────────────────────────────────────
                 * absolute relative to the outer div (position:absolute),
                 * NOT relative to the float wrapper, so it stays put while
                 * the circle floats above it.
                 * top = NODE_SIZE + 10 px gap below node circle bottom.
                 * left / translateX(-50%) centres it on the orbit point.
                 */}
                <div
                  className={`
                    absolute whitespace-nowrap text-sm font-bold tracking-wider
                    transition-colors duration-300
                    ${isExpanded || isHovered ? "text-green-300" : "text-white/75"}
                  `}
                  style={{
                    top: NODE_SIZE + 10,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  {item.title}
                </div>

                {/* ── Expanded card ── */}
                {isExpanded && (
                  <Card
                    className="absolute w-64 bg-black/90 backdrop-blur-lg border-green-400/30 shadow-xl shadow-green-400/10 overflow-visible"
                    style={{
                      // NODE_SIZE(64) + label(~20) + gap(16) = ~100 px
                      top: NODE_SIZE + 40,
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-green-400/50" />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className={`px-2 text-xs ${statusStyle(item.status)}`}>
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                            ? "IN PROGRESS"
                            : "PENDING"}
                        </Badge>
                        <span className="text-xs font-mono text-white/50">{item.date}</span>
                      </div>
                      <CardTitle className="text-sm mt-2 text-white font-bold">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-white/90">
                      <p>{item.content}</p>
                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-white/70 mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-white/70">
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const rel = timelineData.find((i) => i.id === relatedId);
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-white/20 bg-transparent hover:bg-white/10 text-white/80 hover:text-white transition-all"
                                  onClick={(e) => { e.stopPropagation(); toggleItem(relatedId); }}
                                >
                                  {rel?.title}
                                  <ArrowRight size={8} className="ml-1 text-white/60" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
