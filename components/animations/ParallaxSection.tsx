'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number; // 0 = no movement, 0.5 = half speed, 1 = same speed, 2 = double speed (negative values reverse direction)
  className?: string;
  offset?: ['start' | 'end' | string, 'start' | 'end' | string];
}

export const ParallaxSection = ({
  children,
  speed = 0.5,
  className = '',
  offset = ['start end', 'end start'],
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${-speed * 100}%`]);

  return (
    <section ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </section>
  );
};