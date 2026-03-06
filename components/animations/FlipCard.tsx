// components/animations/FlipCard.tsx
'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import { ReactNode } from 'react';

interface FlipCardProps {
  children: ReactNode;
  scrollProgress: MotionValue<number>;
  /** Range of progress over which flip happens (default [0,1]) */
  range?: [number, number];
  /** Flip axis: 'x' or 'y' */
  axis?: 'x' | 'y';
  /** Start angle (degrees) */
  startAngle?: number;
  /** End angle (degrees) */
  endAngle?: number;
  className?: string;
}

export function FlipCard({
  children,
  scrollProgress,
  range = [0, 1],
  axis = 'y',
  startAngle = 90,
  endAngle = 0,
  className = '',
}: FlipCardProps) {
  const rotate = useTransform(scrollProgress, range, [startAngle, endAngle]);
  const transform = axis === 'y' ? { rotateY: rotate } : { rotateX: rotate };

  return (
    <motion.div
      style={{
        ...transform,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      className={className}
    >
      <div style={{ backfaceVisibility: 'hidden' }}>{children}</div>
    </motion.div>
  );
}