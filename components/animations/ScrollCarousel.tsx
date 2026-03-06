// components/animations/ScrollCarousel.tsx
'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollCarouselProps {
  children: ReactNode[];
  scrollProgress: MotionValue<number>;
  className?: string;
  /** Number of items visible at once (default 1) */
  visible?: number;
}

export function ScrollCarousel({
  children,
  scrollProgress,
  className = '',
  visible = 1,
}: ScrollCarouselProps) {
  const itemWidth = 100 / visible;
  const totalWidth = children.length * itemWidth;
  const x = useTransform(scrollProgress, [0, 1], ['0%', `-${totalWidth - itemWidth}%`]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div style={{ x }} className="flex">
        {children.map((child, i) => (
          <div key={i} style={{ minWidth: `${itemWidth}%` }} className="flex-shrink-0">
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
}