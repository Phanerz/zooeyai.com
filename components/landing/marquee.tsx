'use client';

import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  reverse?: boolean;
}

export function Marquee({ children, reverse = false, className = '', ...props }: MarqueeProps) {
  return (
    <div
      {...props}
      className={`group flex overflow-hidden [--gap:1rem] [gap:var(--gap)] ${className}`}
    >
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className={`flex shrink-0 justify-around gap-[var(--gap)] ${
            reverse ? 'animate-marquee-reverse' : 'animate-marquee'
          }`}
          style={{ willChange: 'transform' }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
