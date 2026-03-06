'use client';

import { useScroll } from 'framer-motion';
import { useRef } from 'react';

export const useSectionScroll = (
  offset: ['start' | 'end' | string, 'start' | 'end' | string] = ['start end', 'end start']
) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any, // safe, we control the input
  });
  return { ref, scrollYProgress };
};