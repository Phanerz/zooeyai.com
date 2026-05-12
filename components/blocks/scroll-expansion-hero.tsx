'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useIsIOS } from '@/lib/use-is-ios';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  /** WebM source (VP9) — smaller file, served first if browser supports it */
  webmSrc?: string;
  posterSrc?: string;
  bgImageSrc: string;
  titleLines?: [string, string?];
  description?: string;
  scrollToExpand?: string;
  mediaOverlay?: ReactNode;
  presenceSrc?: string;
  /** Primary download button — slides right (alternates with description) */
  downloadButton?: ReactNode;
  /** Small platform / requirements line — slides left */
  downloadSubtext?: ReactNode;
  /** Version badge — slides right */
  downloadBadge?: ReactNode;
  children?: ReactNode;
}

const smoothEase = [0.22, 1, 0.36, 1] as const;
const maxVirtualProgress = 1.7;
const headerRevealThreshold = 1.08;
const contentRevealThreshold = 1.52;
const wheelSensitivity = 0.0031;
const reverseWheelSensitivity = 0.0031;
const touchForwardSensitivity = 0.015;
const touchBackSensitivity = 0.0125;
const touchPullbackSensitivity = 0.0135;
const titleExitDesktop = 92;
const titleExitMobile = 128;

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  webmSrc,
  posterSrc,
  bgImageSrc,
  titleLines,
  description,
  scrollToExpand,
  downloadButton,
  downloadSubtext,
  downloadBadge,
  children
}: ScrollExpandMediaProps) => {
  // ─── iOS detection (synchronous, correct from first render) ───────────────
  const ios = useIsIOS();

  // ─── Mount gate (prevents hydration mismatch) ─────────────────────────────
  const [mounted, setMounted] = useState(false);

  // ─── Desktop-only state ───────────────────────────────────────────────────
  const [showContent, setShowContent] = useState(false);
  const [isMobileState, setIsMobileState] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(true);

  // ─── Low-end device state ─────────────────────────────────────────────────
  const [isLowEnd, setIsLowEnd] = useState(false);

  // ─── Desktop DOM refs ─────────────────────────────────────────────────────
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaContainerRef = useRef<HTMLDivElement | null>(null);
  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const h2Ref = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const downloadButtonRef  = useRef<HTMLDivElement | null>(null);
  const downloadSubtextRef = useRef<HTMLDivElement | null>(null);
  const downloadBadgeRef   = useRef<HTMLDivElement | null>(null);
  const scrollHintRef = useRef<HTMLParagraphElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  // Animation state kept in refs only — no React state for 60fps values
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const touchStartYRef = useRef(0);
  const isMobileRef = useRef(false);
  const showContentRef = useRef(false);

  const clampProgress = (value: number) =>
    Math.min(Math.max(value, 0), maxVirtualProgress);

  // All per-frame DOM updates live here — no setState, no React reconciliation
  const applyProgressToDOM = (progress: number) => {
    const isMobile = isMobileRef.current;
    const expansionProgress = Math.min(progress, 1);

    const startWidth = isMobile ? 210 : 360;
    const endWidth = isMobile ? 352 : 1380;
    const startHeight = startWidth * 1.5;
    const endHeight = endWidth * (9 / 16);
    const mediaWidth = startWidth + expansionProgress * (endWidth - startWidth);
    const mediaHeight = startHeight + expansionProgress * (endHeight - startHeight);

    if (mediaContainerRef.current) {
      mediaContainerRef.current.style.width = `${mediaWidth}px`;
      mediaContainerRef.current.style.height = `${mediaHeight}px`;
    }

    const delayedTextProgress = Math.max(expansionProgress - 0.015, 0);
    const textProgress = Math.min(
      delayedTextProgress * 0.18 + Math.pow(delayedTextProgress, 3) * 0.72,
      1
    );
    const titleOffset = textProgress * (isMobile ? titleExitMobile : titleExitDesktop);

    if (h1Ref.current) {
      h1Ref.current.style.transform = `translate3d(-${titleOffset * 1.35}vw, 0, 0)`;
    }
    if (h2Ref.current) {
      h2Ref.current.style.transform = `translate3d(${titleOffset}vw, 0, 0)`;
    }
    if (descRef.current) {
      descRef.current.style.transform = `translate3d(-${titleOffset}vw, 0, 0)`;
    }
    // Download CTA — each line alternates direction so they peel apart on scroll
    if (downloadButtonRef.current) {
      downloadButtonRef.current.style.transform = `translate3d(${titleOffset}vw, 0, 0)`;
    }
    if (downloadSubtextRef.current) {
      downloadSubtextRef.current.style.transform = `translate3d(-${titleOffset}vw, 0, 0)`;
    }
    if (downloadBadgeRef.current) {
      downloadBadgeRef.current.style.transform = `translate3d(${titleOffset}vw, 0, 0)`;
    }
    if (scrollHintRef.current) {
      scrollHintRef.current.style.transform = `translate3d(-${titleOffset}vw, 0, 0)`;
    }

    // Header — use cached ref, never querySelector in the hot path
    const header = headerRef.current;
    if (header) {
      const visible = progress >= headerRevealThreshold;
      header.style.opacity = visible ? '1' : '0';
      header.style.transform = visible
        ? 'translate3d(0, 0, 0)'
        : 'translate3d(0, -18px, 0)';
      header.style.pointerEvents = visible ? 'auto' : 'none';
    }

    // showContent — only setState when value actually changes (rare)
    const nextShowContent = progress >= contentRevealThreshold;
    if (nextShowContent !== showContentRef.current) {
      showContentRef.current = nextShowContent;
      setShowContent(nextShowContent);
    }
  };

  const animateProgress = () => {
    const delta = targetProgressRef.current - progressRef.current;
    const nextProgress =
      Math.abs(delta) < 0.0004
        ? targetProgressRef.current
        : progressRef.current + delta * 0.06;

    progressRef.current = nextProgress;
    applyProgressToDOM(nextProgress);

    if (Math.abs(targetProgressRef.current - nextProgress) < 0.0004) {
      animationFrameRef.current = null;
      return;
    }

    animationFrameRef.current = window.requestAnimationFrame(animateProgress);
  };

  const setTargetProgress = (value: number) => {
    targetProgressRef.current = clampProgress(value);
    if (!animationFrameRef.current) {
      animationFrameRef.current = window.requestAnimationFrame(animateProgress);
    }
  };

  // ─── Mount effect — always runs, used as hydration gate ──────────────────
  useEffect(() => {
    setMounted(true);
  }, []);

  // ─── Low-end Android detection ───────────────────────────────────────────
  useEffect(() => {
    if (navigator.hardwareConcurrency < 8 && /Android/.test(navigator.userAgent)) {
      setIsLowEnd(true);
    }
  }, []);

  // ─── Desktop: reset progress when mediaType changes ──────────────────────
  useEffect(() => {
    if (ios) return;
    progressRef.current = 0;
    targetProgressRef.current = 0;
    applyProgressToDOM(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaType]);

  // ─── Desktop: wheel / touch / scroll event listeners ─────────────────────
  //
  // WARNING: passive:false + e.preventDefault() on touch/wheel events is the
  // primary iOS WebKit crash cause. This entire block is skipped on iOS.
  useEffect(() => {
    if (ios) return;

    const contentUnlocked = () =>
      targetProgressRef.current >= contentRevealThreshold;

    const handleWheel = (e: WheelEvent) => {
      const pixelDelta =
        e.deltaMode === 1
          ? e.deltaY * 16
          : e.deltaMode === 2
          ? e.deltaY * 400
          : e.deltaY;
      const clampedDelta = Math.sign(pixelDelta) * Math.min(Math.abs(pixelDelta), 40);

      if (!contentUnlocked()) {
        e.preventDefault();
        setTargetProgress(targetProgressRef.current + clampedDelta * wheelSensitivity);
        return;
      }

      if (clampedDelta < 0 && window.scrollY <= 5) {
        e.preventDefault();
        setTargetProgress(
          targetProgressRef.current + clampedDelta * reverseWheelSensitivity
        );
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartYRef.current) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchY;

      if (!contentUnlocked()) {
        e.preventDefault();
        const scrollFactor =
          deltaY < 0 ? touchForwardSensitivity : touchBackSensitivity;
        setTargetProgress(targetProgressRef.current + deltaY * scrollFactor);
        touchStartYRef.current = touchY;
      } else if (deltaY < -20 && window.scrollY <= 5) {
        e.preventDefault();
        setTargetProgress(
          targetProgressRef.current + deltaY * touchPullbackSensitivity
        );
      }
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = 0;
    };

    const handleScroll = () => {
      if (targetProgressRef.current < contentRevealThreshold && window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    };

    window.addEventListener('wheel', handleWheel as unknown as EventListener, {
      passive: false
    });
    window.addEventListener('scroll', handleScroll as EventListener);
    window.addEventListener(
      'touchstart',
      handleTouchStart as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener(
      'touchmove',
      handleTouchMove as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener('touchend', handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener('wheel', handleWheel as unknown as EventListener);
      window.removeEventListener('scroll', handleScroll as EventListener);
      window.removeEventListener(
        'touchstart',
        handleTouchStart as unknown as EventListener
      );
      window.removeEventListener(
        'touchmove',
        handleTouchMove as unknown as EventListener
      );
      window.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Desktop: mobile breakpoint detection ────────────────────────────────
  useEffect(() => {
    if (ios) return;
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      isMobileRef.current = mobile;
      setIsMobileState(mobile);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Desktop: cache header ref ────────────────────────────────────────────
  useEffect(() => {
    if (ios) return;
    headerRef.current = document.querySelector('header');
    return () => {
      if (headerRef.current) {
        headerRef.current.style.opacity = '';
        headerRef.current.style.transform = '';
        headerRef.current.style.pointerEvents = '';
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Desktop: RAF cleanup on unmount ─────────────────────────────────────
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // ─── Desktop: volume / mute sync ──────────────────────────────────────────
  useEffect(() => {
    if (ios) return;
    const vid = videoRef.current;
    if (!vid) return;
    vid.volume = volume;
    vid.muted = isMuted;
    if (!isMuted && vid.paused) vid.play().catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume, isMuted]);

  // Initial container size (progress = 0) — desktop only
  const initStartWidth = isMobileState ? 210 : 360;
  const initStartHeight = initStartWidth * 1.5;

  // ─── Hydration placeholder — server + first client render ─────────────────
  if (!mounted) {
    return <div style={{ minHeight: '100dvh', background: '#050608' }} />;
  }

  // ─── iOS: completely static path ──────────────────────────────────────────
  //
  // No framer-motion, no RAF, no passive:false event listeners, no willChange.
  // Passive:false touch/wheel listeners calling e.preventDefault() are the
  // primary cause of WebKit's kill→reload→kill crash loop on older iPhones.
  if (ios) {
    return (
      <div>
        <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden">
          {/* Static background — plain CSS, no motion.div */}
          <div className="absolute inset-0 z-0">
            <Image
              src={bgImageSrc}
              alt="Zooey background"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.18),transparent_22%),radial-gradient(circle_at_80%_20%,rgba(111,120,255,0.18),transparent_18%)]" />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center px-5 py-24 text-center gap-6">
            {/* Video disabled on iOS for performance — showing poster frame instead */}
            {mediaType === 'video' && posterSrc && (
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{
                  width: '210px',
                  height: '315px',
                  maxWidth: '88vw',
                  border: '1px solid rgba(74,222,128,0.2)',
                  boxShadow: '0 0 40px rgba(74,222,128,0.15)',
                }}
              >
                <Image
                  src={posterSrc}
                  alt={titleLines?.join(' ') || 'Zooey'}
                  fill
                  className="object-cover"
                  quality={85}
                />
              </div>
            )}

            {titleLines?.[0] && (
              <h1
                className="font-display text-5xl font-semibold tracking-tight leading-[1.1] text-green-300 drop-shadow-[0_10px_34px_rgba(0,0,0,0.9)] sm:text-6xl"
                style={{ textShadow: '0 8px 28px rgba(2,8,12,0.95), 0 0 24px rgba(74,222,128,0.18)' }}
              >
                {titleLines[0]}
              </h1>
            )}
            {titleLines?.[1] && (
              <h2
                className="font-display text-5xl font-semibold tracking-tight leading-[1.1] text-green-300 drop-shadow-[0_10px_34px_rgba(0,0,0,0.9)] sm:text-6xl"
                style={{ textShadow: '0 8px 28px rgba(2,8,12,0.95), 0 0 24px rgba(74,222,128,0.18)' }}
              >
                {titleLines[1]}
              </h2>
            )}
            {description && (
              <p className="rounded-full border border-white/10 bg-black/30 px-6 py-2.5 text-sm text-white/85 sm:text-base">
                {description}
              </p>
            )}
          </div>
        </section>

        {/* Children — always visible on iOS (no showContent gate) */}
        {children && (
          <div className="flex w-full flex-col px-5 py-14 md:px-10 lg:px-16 lg:py-20">
            {children}
          </div>
        )}
      </div>
    );
  }

  // ─── Low-end Android: static poster path ─────────────────────────────────
  if (isLowEnd) {
    return (
      <div>
        <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={bgImageSrc}
              alt="Zooey background"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.18),transparent_22%),radial-gradient(circle_at_80%_20%,rgba(111,120,255,0.18),transparent_18%)]" />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center px-5 py-24 text-center gap-6">
            {posterSrc && (
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{
                  width: '210px',
                  height: '315px',
                  maxWidth: '88vw',
                  border: '1px solid rgba(74,222,128,0.2)',
                  boxShadow: '0 0 40px rgba(74,222,128,0.15)',
                }}
              >
                <Image
                  src={posterSrc}
                  alt={titleLines?.join(' ') || 'Zooey'}
                  fill
                  className="object-cover"
                  quality={85}
                />
              </div>
            )}
            {titleLines?.[0] && (
              <h1
                className="font-display text-5xl font-semibold tracking-tight leading-[1.1] text-green-300 drop-shadow-[0_10px_34px_rgba(0,0,0,0.9)] sm:text-6xl"
                style={{ textShadow: '0 8px 28px rgba(2,8,12,0.95), 0 0 24px rgba(74,222,128,0.18)' }}
              >
                {titleLines[0]}
              </h1>
            )}
            {titleLines?.[1] && (
              <h2
                className="font-display text-5xl font-semibold tracking-tight leading-[1.1] text-green-300 drop-shadow-[0_10px_34px_rgba(0,0,0,0.9)] sm:text-6xl"
                style={{ textShadow: '0 8px 28px rgba(2,8,12,0.95), 0 0 24px rgba(74,222,128,0.18)' }}
              >
                {titleLines[1]}
              </h2>
            )}
            {description && (
              <p className="rounded-full border border-white/10 bg-black/30 px-6 py-2.5 text-sm text-white/85 sm:text-base">
                {description}
              </p>
            )}
            {downloadButton && downloadButton}
            {downloadSubtext && downloadSubtext}
            {downloadBadge && downloadBadge}
          </div>
        </section>

        {children && (
          <div className="flex w-full flex-col px-5 py-14 md:px-10 lg:px-16 lg:py-20">
            {children}
          </div>
        )}
      </div>
    );
  }

  // ─── Desktop: full scroll-expansion animated path (unchanged) ─────────────
  return (
    <div className="overflow-hidden" style={{ contain: 'paint' }}>
      <section
        className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden"
        style={{ contain: 'paint' }}
      >
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.85, ease: smoothEase }}
          >
            <Image
              src={bgImageSrc}
              alt="Zooey background"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.18),transparent_22%),radial-gradient(circle_at_80%_20%,rgba(111,120,255,0.18),transparent_18%)]" />
          </motion.div>

          <div className="container relative z-10 mx-auto flex flex-col items-center justify-center overflow-hidden">
            <div className="relative flex h-[100dvh] w-full items-center justify-center overflow-hidden">

              {/* Media container — size updated via ref, no React re-renders */}
              <div
                ref={mediaContainerRef}
                className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl"
                style={{
                  width: `${initStartWidth}px`,
                  height: `${initStartHeight}px`,
                  maxWidth: '94vw',
                  maxHeight: '82vh',
                  boxShadow: '0 0 40px rgba(74, 222, 128, 0.15)',
                  border: '1px solid rgba(74, 222, 128, 0.2)',
                  willChange: 'width, height',
                }}
              >
                {mediaType === 'video' ? (
                  <div className="relative h-full w-full">
                    <video
                      ref={videoRef}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="h-full w-full rounded-md object-cover"
                      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                      controls={false}
                      disablePictureInPicture
                      disableRemotePlayback
                    >
                      {webmSrc && <source src={webmSrc} type="video/webm" />}
                      <source src={mediaSrc} type="video/mp4" />
                    </video>
                    {/* Volume control */}
                    <div className="group absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 backdrop-blur-sm transition-all duration-200 hover:border-green-400/30">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="flex items-center gap-1.5 text-white/70 transition-colors hover:text-white"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? (
                          <>
                            <VolumeX className="h-4 w-4" />
                            <span className="text-[10px] uppercase tracking-wider text-white/50 group-hover:text-white/80 transition-colors">Unmute</span>
                          </>
                        ) : (
                          <Volume2 className="h-4 w-4 text-green-300" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          setVolume(val);
                          setIsMuted(val === 0);
                        }}
                        className="w-16 accent-green-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        aria-label="Volume"
                      />
                    </div>
                  </div>
                ) : (
                  <Image
                    src={mediaSrc}
                    alt={titleLines?.join(' ') || 'Zooey media'}
                    fill
                    className="pixel-border rounded-md border border-green-400/20 object-cover"
                  />
                )}
              </div>

              {/* Text — transforms applied via refs, no React re-renders */}
              <div className="relative z-10 flex w-full overflow-hidden px-4">
                <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-5 text-center mix-blend-normal">
                  <h1
                    ref={h1Ref}
                    className="font-display text-5xl font-semibold tracking-tight leading-[1.1] text-green-300 drop-shadow-[0_10px_34px_rgba(0,0,0,0.9)] sm:text-6xl lg:text-7xl"
                    style={{
                      willChange: 'transform',
                      textShadow:
                        '0 8px 28px rgba(2, 8, 12, 0.95), 0 0 24px rgba(74, 222, 128, 0.18)'
                    }}
                  >
                    {titleLines?.[0]}
                  </h1>
                  {titleLines?.[1] ? (
                    <h2
                      ref={h2Ref}
                      className="font-display text-5xl font-semibold tracking-tight leading-[1.1] text-green-300 drop-shadow-[0_10px_34px_rgba(0,0,0,0.9)] sm:text-6xl lg:text-7xl"
                      style={{
                        willChange: 'transform',
                        textShadow:
                          '0 8px 28px rgba(2, 8, 12, 0.95), 0 0 24px rgba(74, 222, 128, 0.18)'
                      }}
                    >
                      {titleLines[1]}
                    </h2>
                  ) : null}
                  {description ? (
                    <p
                      ref={descRef}
                      className="w-fit cursor-default rounded-full border border-white/10 bg-black/30 px-6 py-2.5 text-sm text-white/85 backdrop-blur-[4px] shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-colors duration-200 hover:border-green-400/25 hover:bg-black/45 sm:text-base"
                      style={{
                        willChange: 'transform',
                        textShadow: '0 3px 18px rgba(0, 0, 0, 0.8)'
                      }}
                    >
                      {description}
                    </p>
                  ) : null}
                  {downloadButton ? (
                    <div ref={downloadButtonRef} style={{ willChange: 'transform' }}>
                      {downloadButton}
                    </div>
                  ) : null}
                  {downloadSubtext ? (
                    <div ref={downloadSubtextRef} style={{ willChange: 'transform' }}>
                      {downloadSubtext}
                    </div>
                  ) : null}
                  {downloadBadge ? (
                    <div ref={downloadBadgeRef} style={{ willChange: 'transform' }}>
                      {downloadBadge}
                    </div>
                  ) : null}
                  {scrollToExpand ? (
                    <p
                      ref={scrollHintRef}
                      className="rounded-full border border-green-400/20 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-green-300 backdrop-blur-md shadow-[0_12px_28px_rgba(0,0,0,0.42)] md:text-sm"
                      style={{
                        willChange: 'transform',
                        textShadow:
                          '0 3px 18px rgba(0, 0, 0, 0.9), 0 0 16px rgba(74, 222, 128, 0.14)'
                      }}
                    >
                      {scrollToExpand}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <motion.section
              className="flex w-full flex-col px-5 py-14 md:px-10 lg:px-16 lg:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.9, ease: smoothEase }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
