'use client';

import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';

export const Background3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ['3deg', '-3deg']);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ['-3deg', '3deg']);

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const z = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* 3D rotating elements */}
      <motion.div
        className="absolute inset-0"
        style={{
          rotateX,
          rotateY,
          scale,
          z,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Your existing floating shapes and rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="absolute w-96 h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl"
            style={{
              transform: 'translateZ(-200px) rotateX(20deg) rotateY(10deg)',
              boxShadow: '0 0 80px rgba(124,58,237,0.15)',
              backdropFilter: 'blur(40px)',
            }}
            animate={{ y: [0, -20, 0], rotateY: [0, 45, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* ... particles and rings ... */}
        </div>
      </motion.div>

      {/* Premium animated gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(0,180,255,0.2) 0%, rgba(180,0,255,0.15) 40%, rgba(10,10,20,0.9) 80%)',
          backgroundSize: '200% 200%',
          animation: 'shiftGradient 25s ease infinite',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Matte finishing layer (optional) */}
      <div className="absolute inset-0 pointer-events-none bg-black/10" />
    </div>
  );
};