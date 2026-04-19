"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
import { Menu, X } from "lucide-react";
import { StarButton } from "@/components/ui/star-button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home",      href: "/",         hash: null },
  { label: "Pricing",   href: "/pricing",  hash: null },
  { label: "FAQs",      href: "/faqs",     hash: null },
  { label: "Download",  href: "/download", hash: null },
  { label: "About",     href: "/about",    hash: null },
  { label: "Changelog", href: "/updates",  hash: null },
];

export function Header() {
  const pathname  = usePathname();
  const router    = useRouter();
  const isHome    = pathname === "/";

  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Handles hash-anchor clicks: scrolls if already on home, navigates + scrolls if not
  const handleHashClick = (
    e: React.MouseEvent,
    targetHash: string,
  ) => {
    e.preventDefault();
    setMobileOpen(false);

    const scroll = () => {
      const el = document.getElementById(targetHash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    if (isHome) {
      scroll();
    } else {
      router.push("/");
      // Give Next.js a moment to render the home page before scrolling
      setTimeout(scroll, 350);
    }
  };

  const navItemClass = (active: boolean) =>
    cn(
      "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer",
      active
        ? "bg-green-400/10 text-green-300"
        : "text-white/60 hover:bg-white/5 hover:text-white",
    );

  const mobileItemClass = (active: boolean) =>
    cn(
      "rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer",
      active
        ? "bg-green-400/10 text-green-300"
        : "text-white/60 hover:bg-white/5 hover:text-white",
    );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[300]",
        "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isHome
          ? "opacity-0 pointer-events-none -translate-y-4"
          : "opacity-100 pointer-events-auto translate-y-0",
      )}
    >
      <div className="shell pt-4">
        {/* ── Main bar ── */}
        <div
          className={cn(
            "flex items-center justify-between px-4 py-3 md:px-6",
            "rounded-[28px] border transition-all duration-300",
            scrolled
              ? "border-white/[0.07] bg-[rgba(5,6,8,0.38)] backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.28)]"
              : "border-white/[0.05] bg-white/[0.01] backdrop-blur-md",
          )}
        >
          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-3">
            <Image
              src="/zooey-icon.png"
              alt="Zooey"
              width={44}
              height={44}
              className="h-11 w-11 object-contain drop-shadow-[0_0_10px_rgba(74,222,128,0.55)] transition-transform duration-300 group-hover:scale-110"
            />
            <div>
              <Image
                src="/zooey-text.png"
                alt="Zooey"
                width={120}
                height={32}
                className="h-[22px] w-auto object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.55)] transition-all duration-300 group-hover:drop-shadow-[0_0_18px_rgba(74,222,128,0.9)] group-hover:scale-[1.04] group-hover:brightness-110"
              />
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">
                AI Desktop Pet
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ label, href, hash }) => {
              const active = !hash && pathname === href;

              if (hash) {
                return (
                  <a
                    key={label}
                    href={`/#${hash}`}
                    onClick={(e) => handleHashClick(e, hash)}
                    className={navItemClass(false)}
                  >
                    {label}
                  </a>
                );
              }

              return (
                <Link
                  key={label}
                  href={href}
                  className={navItemClass(active)}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <StarButton
              href="/download"
              variant="green"
              className="hidden text-[13px] font-bold tracking-wide px-5 py-[9px] sm:inline-flex"
            >
              ADOPT ZOOEY
            </StarButton>

            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((p) => !p)}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:text-white md:hidden"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="mt-2 overflow-hidden rounded-[24px] border border-white/[0.07] bg-[rgba(5,6,8,0.72)] p-4 backdrop-blur-2xl"
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map(({ label, href, hash }) => {
                  const active = !hash && pathname === href;

                  if (hash) {
                    return (
                      <a
                        key={label}
                        href={`/#${hash}`}
                        onClick={(e) => handleHashClick(e, hash)}
                        className={mobileItemClass(false)}
                      >
                        {label}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={mobileItemClass(active)}
                    >
                      {label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-3 border-t border-white/10 pt-3">
                <StarButton
                  href="/download"
                  variant="green"
                  className="w-full justify-center text-[13px] font-bold tracking-wide"
                >
                  ADOPT ZOOEY
                </StarButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
