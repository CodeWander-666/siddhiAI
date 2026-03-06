'use client';

import { useSectionScroll } from '@/components/animations/ScrollSection';
import { ParallaxLayer } from '@/components/animations/ParallaxLayer';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { motion, useTransform } from 'framer-motion';
import { Button3D } from '@/components/ui/Button3D';

export function Hero() {
  const { ref, scrollYProgress } = useSectionScroll(['start start', 'end start']);

  const cardOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const cardY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  const line1 = "Grow with".split(' ');
  const line2 = "intelligence.".split(' ');

  const wordStart = 0.15;
  const wordEnd = 0.5;

  const getWordRange = (index: number, total: number, start = wordStart, end = wordEnd) => {
    const step = (end - start) / total;
    return [start + index * step, start + (index + 1) * step];
  };

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div
        style={{ opacity: cardOpacity, y: cardY }}
        className="absolute inset-0 flex items-center justify-center z-10 px-4"
      >
        <div className="glass max-w-4xl w-full p-8 md:p-12 lg:p-16 rounded-3xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center leading-tight">
            <div className="flex flex-wrap justify-center gap-x-4">
              {line1.map((word, i) => {
                const range = getWordRange(i, line1.length);
                const opacity = useTransform(scrollYProgress, range, [1, 0]);
                const y = useTransform(scrollYProgress, range, [0, -20]);
                return (
                  <motion.span
                    key={i}
                    style={{ opacity, y }}
                    className="inline-block text-gradient-primary text-3d"
                  >
                    {word}
                  </motion.span>
                );
              })}
            </div>
            <br />
            <span className="flex flex-wrap justify-center gap-x-4">
              {line2.map((word, i) => {
                const range = getWordRange(i, line2.length, 0.2, 0.6);
                const opacity = useTransform(scrollYProgress, range, [1, 0]);
                const y = useTransform(scrollYProgress, range, [0, -20]);
                return (
                  <motion.span
                    key={i}
                    style={{ opacity, y }}
                    className="inline-block text-gradient-animated text-glow text-3d"
                  >
                    {word}
                  </motion.span>
                );
              })}
            </span>
          </h1>

          <motion.p
            style={{
              y: useTransform(scrollYProgress, [0, 0.3], [0, 30]),
              opacity: useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.7, 0]),
            }}
            className="mt-6 text-xl md:text-2xl text-center text-white/80 max-w-2xl mx-auto"
          >
            SiddhiAI delivers AI-powered marketing strategies that achieve real, measurable results.
          </motion.p>

          <div className="mt-10 flex justify-center gap-4">
            <MagneticButton strength={0.2}>
              <Button3D href="/work" variant="primary" size="lg">
                View Our Work
              </Button3D>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Button3D href="/contact" variant="secondary" size="lg">
                Let's Talk
              </Button3D>
            </MagneticButton>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}