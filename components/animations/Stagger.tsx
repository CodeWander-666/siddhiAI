'use client';
import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/lib/utils/useReducedMotion';

interface StaggerProps {
  children: React.ReactNode;
  delay?: number;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  once?: boolean;
}

export function Stagger({
  children,
  delay = 0,
  staggerDelay = 0.1,
  direction = 'up',
  className,
  once = true,
}: StaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();

  const directionOffset = {
    up: 20,
    down: -20,
    left: 20,
    right: -20,
    none: 0,
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: directionOffset[direction] },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}