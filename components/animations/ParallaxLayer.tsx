// components/animations/ParallaxLayer.tsx
'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import { ReactNode } from 'react';

interface ParallaxLayerProps {
  children: ReactNode;
  scrollProgress: MotionValue<number>;
  /** Speed factor: 0 = no movement, 0.5 = half speed, 1 = same speed, 2 = double speed (negative values reverse direction) */
  speed?: number;
  className?: string;
}

export function ParallaxLayer({
  children,
  scrollProgress,
  speed = 0.5,
  className = '',
}: ParallaxLayerProps) {
  const y = useTransform(scrollProgress, [0, 1], ['0%', `-${speed * 100}%`]);
  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}