"use client";

import { useState } from "react";

/**
 * Returns true on Apple devices we want to protect with the lighter WebKit path
 * (iPhone / iPad / iPod / Mac).
 *
 * Uses a lazy useState initializer so the value is synchronously correct
 * on the very first client render — no async useEffect, no brief false→true
 * flip, no window where heavy effects run on iOS before detection fires.
 *
 * How it works:
 *   • layout.tsx reads the request User-Agent on the server and stamps
 *     class="ios" on <html> in the server-rendered HTML.
 *   • The lazy initializer reads that class from the DOM the moment React
 *     starts rendering on the client — before any paint, before any effect.
 *   • On the server (document undefined) it returns false so SSR produces
 *     neutral output. Components that need to avoid a hydration mismatch
 *     should use a `mounted` gate to show a placeholder until after mount.
 */
export function useIsIOS(): boolean {
  const [isIOS] = useState<boolean>(() => {
    if (typeof document === "undefined") return false; // SSR — safe default
    // Read the class stamped by the server. Correct from the first render.
    if (document.documentElement.classList.contains("ios")) return true;
    // Fallback for dev / environments where layout.tsx UA check may not run
    const ua = navigator.userAgent;
    return (
      /iPad|iPhone|iPod/.test(ua) ||
      /Macintosh|Mac OS X/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    );
  });

  return isIOS;
}
