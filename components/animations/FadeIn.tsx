'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/lib/utils/useReducedMotion';

interface FadeInProps { children: React.ReactNode; delay?: number; direction?: 'up'|'down'|'left'|'right'|'none'; className?: string; duration?: number; once?: boolean; }

export function FadeIn({ children, delay = 0, direction = 'up', className, duration = 0.6, once = true }: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();

  const directionOffset = { up: 20, down: -20, left: 20, right: -20, none: 0 };
  const initial = { opacity: 0, y: directionOffset[direction] };

  if (prefersReducedMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div ref={ref} initial={initial} animate={isInView ? { opacity: 1, y: 0 } : initial} transition={{ duration, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
}