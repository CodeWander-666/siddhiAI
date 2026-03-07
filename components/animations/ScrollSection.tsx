'use client';

import { useScroll, MotionValue } from 'framer-motion';
import { useCallback, useState, useLayoutEffect, useEffect, useRef } from 'react';

interface UseSectionScrollResult {
  ref: (node: HTMLElement | null) => void;
  scrollYProgress: MotionValue<number>;
}

/**
 * A hook that returns a ref to attach to a section and a scroll progress MotionValue.
 * Guarantees that `useScroll` is only activated after the element is actually in the DOM,
 * preventing the "Target ref is defined but not hydrated" error.
 *
 * @param offset - scroll offset (default: ['start end', 'end start'])
 */
export const useSectionScroll = (
  offset: ['start'|'end'|string, 'start'|'end'|string] = ['start end', 'end start']
): UseSectionScrollResult => {
  // Track whether the element is mounted on the client
  const [isMounted, setIsMounted] = useState(false);

  // Store the DOM node in a ref (for useScroll)
  const elementRef = useRef<HTMLElement | null>(null);

  // Callback ref that updates elementRef and signals readiness
  const ref = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
    if (node) {
      // Element is now attached – safe to enable scroll tracking
      setIsMounted(true);
    } else {
      // Element unmounted – disable
      setIsMounted(false);
    }
  }, []);

  // On the client, after the first render, we might already have the ref.
  // This ensures `isMounted` is set even if the ref was attached before the effect runs.
  useLayoutEffect(() => {
    if (elementRef.current) {
      setIsMounted(true);
    }
    return () => {
      // Cleanup if needed
      setIsMounted(false);
    };
  }, []);

  // Conditionally enable useScroll only when the element is mounted
  const { scrollYProgress } = useScroll({
    target: isMounted ? elementRef : undefined,
    offset: offset as any,
  });

  return { ref, scrollYProgress };
};