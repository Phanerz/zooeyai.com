'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  titleLines?: [string, string?];
  description?: string;
  scrollToExpand?: string;
  mediaOverlay?: ReactNode;
  presenceSrc?: string;
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
const bodyExitDesktop = 82;
const bodyExitMobile = 110;
const helperExitDesktop = 88;
const helperExitMobile = 118;

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  titleLines,
  description,
  scrollToExpand,
  presenceSrc,
  children
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const clampProgress = (value: number) =>
    Math.min(Math.max(value, 0), maxVirtualProgress);

  const syncVisibility = (value: number) => {
    setMediaFullyExpanded(value >= 1);
    setShowContent(value >= contentRevealThreshold);
  };

  const animateProgress = () => {
    const delta = targetProgressRef.current - progressRef.current;
    const nextProgress =
      Math.abs(delta) < 0.0004
        ? targetProgressRef.current
        : progressRef.current + delta * 0.06;

    progressRef.current = nextProgress;
    setScrollProgress(nextProgress);
    syncVisibility(nextProgress);

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

  useEffect(() => {
    progressRef.current = 0;
    targetProgressRef.current = 0;
    setScrollProgress(0);
    syncVisibility(0);
  }, [mediaType]);

  useEffect(() => {
    const contentUnlocked = () =>
      targetProgressRef.current >= contentRevealThreshold;

    const handleWheel = (e: WheelEvent) => {
      const pixelDelta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * 400 : e.deltaY;
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
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (!contentUnlocked()) {
        e.preventDefault();
        const scrollFactor =
          deltaY < 0 ? touchForwardSensitivity : touchBackSensitivity;
        setTargetProgress(targetProgressRef.current + deltaY * scrollFactor);
        setTouchStartY(touchY);
      } else if (deltaY < -20 && window.scrollY <= 5) {
        e.preventDefault();
        setTargetProgress(
          targetProgressRef.current + deltaY * touchPullbackSensitivity
        );
      }
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
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
      window.removeEventListener(
        'wheel',
        handleWheel as unknown as EventListener
      );
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
  }, [touchStartY]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const header = document.querySelector('header') as HTMLElement | null;
    if (!header) return;

    const visible = scrollProgress >= headerRevealThreshold;

    header.style.opacity = visible ? '1' : '0';
    header.style.transform = visible
      ? 'translate3d(0, 0, 0)'
      : 'translate3d(0, -18px, 0)';
    header.style.pointerEvents = visible ? 'auto' : 'none';

    return () => {
      header.style.opacity = '';
      header.style.transform = '';
      header.style.pointerEvents = '';
    };
  }, [scrollProgress]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const expansionProgress = Math.min(scrollProgress, 1);
  const startWidth = isMobileState ? 210 : 360;
  const endWidth = isMobileState ? 352 : 1380;
  const startHeight = startWidth * 1.5;
  const endHeight = endWidth * (9 / 16);
  const mediaWidth = startWidth + expansionProgress * (endWidth - startWidth);
  const mediaHeight =
    startHeight + expansionProgress * (endHeight - startHeight);
  const delayedTextProgress = Math.max(expansionProgress - 0.015, 0);
  const textProgress = Math.min(
    delayedTextProgress * 0.18 + Math.pow(delayedTextProgress, 3) * 0.72,
    1
  );
  const titleOffset = textProgress * (isMobileState ? titleExitMobile : titleExitDesktop);
  const subtextOffset = textProgress * (isMobileState ? bodyExitMobile : bodyExitDesktop);
  const helperOffset = textProgress * (isMobileState ? helperExitMobile : helperExitDesktop);

  const imageEntryRaw = Math.min(scrollProgress / 1.0, 1);
  const imageEntryProgress = imageEntryRaw < 0.5
    ? 2 * imageEntryRaw * imageEntryRaw
    : 1 - Math.pow(-2 * imageEntryRaw + 2, 2) / 2;

  return (
    <div ref={sectionRef} className="overflow-hidden" style={{ contain: 'paint' }}>
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden" style={{ contain: 'paint' }}>
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
              <motion.div
                className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '94vw',
                  maxHeight: '82vh',
                  boxShadow: '0 0 40px rgba(74, 222, 128, 0.15)',
                  border: '1px solid rgba(74, 222, 128, 0.2)',
                  willChange: 'width, height, transform'
                }}
              >
                {mediaType === 'video' ? (
                  <video
                    src={mediaSrc}
                    poster={posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="pixel-border h-full w-full rounded-md border border-green-400/20 object-cover"
                    controls={false}
                    disablePictureInPicture
                    disableRemotePlayback
                  />
                ) : (
                  <Image
                    src={mediaSrc}
                    alt={titleLines?.join(' ') || 'Zooey media'}
                    fill
                    className="pixel-border rounded-md border border-green-400/20 object-cover"
                  />
                )}
              </motion.div>

              <div className="relative z-10 flex w-full overflow-hidden px-4">
                <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-5 text-center mix-blend-normal">
                <motion.h1
                  className="font-display text-5xl font-semibold tracking-tight leading-[1.1] text-green-300 drop-shadow-[0_10px_34px_rgba(0,0,0,0.9)] sm:text-6xl lg:text-7xl"
                  style={{
                    transform: `translate3d(-${titleOffset * 1.35}vw, 0, 0)`,
                    willChange: 'transform',
                    textShadow:
                      '0 8px 28px rgba(2, 8, 12, 0.95), 0 0 24px rgba(74, 222, 128, 0.18)'
                  }}
                >
                  {titleLines?.[0]}
                </motion.h1>
                {titleLines?.[1] ? (
                  <motion.h2
                    className="font-display text-5xl font-semibold tracking-tight leading-[1.1] text-green-300 drop-shadow-[0_10px_34px_rgba(0,0,0,0.9)] sm:text-6xl lg:text-7xl"
                    style={{
                      transform: `translate3d(${titleOffset}vw, 0, 0)`,
                      willChange: 'transform',
                      textShadow:
                        '0 8px 28px rgba(2, 8, 12, 0.95), 0 0 24px rgba(74, 222, 128, 0.18)'
                    }}
                  >
                    {titleLines[1]}
                  </motion.h2>
                ) : null}
                {description ? (
                  <motion.p
                    className="max-w-2xl rounded-full border border-white/10 bg-black/35 px-5 py-2 text-balance text-base text-white/90 backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.45)] sm:text-lg"
                    style={{
                      transform: `translate3d(-${titleOffset}vw, 0, 0)`,
                      willChange: 'transform',
                      textShadow: '0 3px 18px rgba(0, 0, 0, 0.8)'
                    }}
                  >
                    {description}
                  </motion.p>
                ) : null}
                {scrollToExpand ? (
                  <motion.p
                    className="rounded-full border border-green-400/20 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-green-300 backdrop-blur-md shadow-[0_12px_28px_rgba(0,0,0,0.42)] md:text-sm"
                    style={{
                      transform: `translate3d(${titleOffset}vw, 0, 0)`,
                      willChange: 'transform',
                      textShadow:
                        '0 3px 18px rgba(0, 0, 0, 0.9), 0 0 16px rgba(74, 222, 128, 0.14)'
                    }}
                  >
                    {scrollToExpand}
                  </motion.p>
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
