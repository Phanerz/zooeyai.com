import React from "react";
import { cn } from "@/lib/utils";

type Variant = "green" | "cyan";

interface StarButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: Variant;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Star = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 784.11 815.53"
    className={cn("w-full h-auto", className)}
  >
    <path d="M392.05 0c-20.9,210.08-184.06,378.41-392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93-210.06 184.09-378.37 392.05-407.74-207.98-29.38-371.16-197.69-392.06-407.78z" />
  </svg>
);

// ── Stars ─────────────────────────────────────────────────────────────────────
const GreenStars = () => (
  <>
    <div className="absolute top-[20%] left-[20%] w-[20px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0.05,0.83,0.43,0.96)] drop-shadow-[0_0_0_rgba(74,222,128,0)] group-hover:top-[-80%] group-hover:left-[-30%] group-hover:drop-shadow-[0_0_10px_rgba(74,222,128,0.9)] group-hover:z-[2]"><Star className="fill-[#4ade80]" /></div>
    <div className="absolute top-[45%] left-[45%] w-[12px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(74,222,128,0)] group-hover:top-[-25%] group-hover:left-[10%] group-hover:drop-shadow-[0_0_10px_rgba(74,222,128,0.9)] group-hover:z-[2]"><Star className="fill-[#4ade80]" /></div>
    <div className="absolute top-[40%] left-[40%] w-[5px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(74,222,128,0)] group-hover:top-[55%] group-hover:left-[25%] group-hover:drop-shadow-[0_0_10px_rgba(74,222,128,0.9)] group-hover:z-[2]"><Star className="fill-[#4ade80]" /></div>
    <div className="absolute top-[20%] left-[40%] w-[8px] z-[-5] transition-all duration-[800ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(74,222,128,0)] group-hover:top-[30%] group-hover:left-[80%] group-hover:drop-shadow-[0_0_10px_rgba(74,222,128,0.9)] group-hover:z-[2]"><Star className="fill-[#4ade80]" /></div>
    <div className="absolute top-[25%] left-[45%] w-[12px] z-[-5] transition-all duration-[600ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(74,222,128,0)] group-hover:top-[25%] group-hover:left-[115%] group-hover:drop-shadow-[0_0_10px_rgba(74,222,128,0.9)] group-hover:z-[2]"><Star className="fill-[#4ade80]" /></div>
    <div className="absolute top-[5%] left-[50%] w-[5px] z-[-5] transition-all duration-[800ms] ease-in-out drop-shadow-[0_0_0_rgba(74,222,128,0)] group-hover:top-[5%] group-hover:left-[60%] group-hover:drop-shadow-[0_0_10px_rgba(74,222,128,0.9)] group-hover:z-[2]"><Star className="fill-[#4ade80]" /></div>
  </>
);

const CyanStars = () => (
  <>
    <div className="absolute top-[20%] left-[20%] w-[20px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0.05,0.83,0.43,0.96)] drop-shadow-[0_0_0_rgba(34,211,238,0)] group-hover:top-[-80%] group-hover:left-[-30%] group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.9)] group-hover:z-[2]"><Star className="fill-[#22d3ee]" /></div>
    <div className="absolute top-[45%] left-[45%] w-[12px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(34,211,238,0)] group-hover:top-[-25%] group-hover:left-[10%] group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.9)] group-hover:z-[2]"><Star className="fill-[#22d3ee]" /></div>
    <div className="absolute top-[40%] left-[40%] w-[5px] z-[-5] transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(34,211,238,0)] group-hover:top-[55%] group-hover:left-[25%] group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.9)] group-hover:z-[2]"><Star className="fill-[#22d3ee]" /></div>
    <div className="absolute top-[20%] left-[40%] w-[8px] z-[-5] transition-all duration-[800ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(34,211,238,0)] group-hover:top-[30%] group-hover:left-[80%] group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.9)] group-hover:z-[2]"><Star className="fill-[#22d3ee]" /></div>
    <div className="absolute top-[25%] left-[45%] w-[12px] z-[-5] transition-all duration-[600ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_0_rgba(34,211,238,0)] group-hover:top-[25%] group-hover:left-[115%] group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.9)] group-hover:z-[2]"><Star className="fill-[#22d3ee]" /></div>
    <div className="absolute top-[5%] left-[50%] w-[5px] z-[-5] transition-all duration-[800ms] ease-in-out drop-shadow-[0_0_0_rgba(34,211,238,0)] group-hover:top-[5%] group-hover:left-[60%] group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.9)] group-hover:z-[2]"><Star className="fill-[#22d3ee]" /></div>
  </>
);

// ── Variant classes ────────────────────────────────────────────────────────────
const variantClass: Record<Variant, string> = {
  green:
    "text-[#050608] bg-[#4ade80] border-[#4ade80] shadow-[0_0_0_rgba(74,222,128,0.55)] hover:bg-transparent hover:text-[#4ade80] hover:shadow-[0_0_25px_rgba(74,222,128,0.55)]",
  cyan:
    "text-[#050608] bg-[#22d3ee] border-[#22d3ee] shadow-[0_0_0_rgba(34,211,238,0.55)] hover:bg-transparent hover:text-[#22d3ee] hover:shadow-[0_0_25px_rgba(34,211,238,0.55)]",
};

const baseClass =
  "group relative px-[28px] py-[10px] text-[15px] font-semibold border-[2px] rounded-full transition-all duration-300 ease-in-out cursor-pointer overflow-visible active:scale-95";

export function StarButton({
  children,
  href,
  onClick,
  className,
  variant = "green",
  type = "button",
  disabled = false,
}: StarButtonProps) {
  const stars = variant === "cyan" ? <CyanStars /> : <GreenStars />;
  const cls = cn(baseClass, variantClass[variant], "inline-flex items-center justify-center no-underline", className);

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
        {stars}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cn(baseClass, variantClass[variant], "inline-flex items-center justify-center", disabled && "opacity-70 cursor-not-allowed active:scale-100", className)}>
      {children}
      {stars}
    </button>
  );
}

export default StarButton;
