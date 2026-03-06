// components/animations/SplitText.tsx
'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import { ReactNode } from 'react';

interface SplitTextProps {
  children: string;
  scrollProgress: MotionValue<number>;
  /** Start and end progress for the animation (e.g., [0, 0.5]) */
  range?: [number, number];
  /** Stagger delay between words (as a fraction of the range) */
  stagger?: number;
  /** Reveal direction: 'up' or 'down' */
  direction?: 'up' | 'down';
}

export function SplitText({
  children,
  scrollProgress,
  range = [0, 1],
  stagger = 0.05,
  direction = 'up',
}: SplitTextProps) {
  const words = children.split(' ');
  const startY = direction === 'up' ? '100%' : '-100%';
  const endY = '0%';

  return (
    <span style={{ display: 'inline-block', whiteSpace: 'pre-wrap' }}>
      {words.map((word, i) => {
        // Each word animates over a sub‑range: [start + i*stagger, start + (i+1)*stagger]
        const wordStart = range[0] + i * stagger;
        const wordEnd = range[0] + (i + 1) * stagger;
        // Clamp to [0,1]
        const clampedStart = Math.min(1, Math.max(0, wordStart));
        const clampedEnd = Math.min(1, Math.max(0, wordEnd));

        const y = useTransform(scrollProgress, [clampedStart, clampedEnd], [startY, endY]);
        const opacity = useTransform(scrollProgress, [clampedStart, clampedEnd], [0, 1]);

        return (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
            <motion.span style={{ y, opacity, display: 'inline-block' }}>
              {word}&nbsp;
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}