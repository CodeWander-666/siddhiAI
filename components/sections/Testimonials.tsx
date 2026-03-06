'use client';

import { useSectionScroll } from '@/components/animations/ScrollSection';
import { motion, useTransform } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import Image from 'next/image';
import { testimonials } from '@/lib/constants/testimonials';

export function Testimonials() {
  const { ref, scrollYProgress } = useSectionScroll(['start end', 'end start']);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={ref} className="h-screen flex items-center justify-center bg-primary/5 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient-primary">
          Client Success Stories
        </h2>
        <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Don't just take our word for it – hear from our clients.
        </p>

        <div className="relative h-[500px] flex items-center justify-center perspective">
          <motion.div
            style={{ rotateY, transformStyle: 'preserve-3d' }}
            className="relative w-80 h-80"
          >
            {testimonials.map((t, i) => {
              const angle = (i / testimonials.length) * 360;
              return (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    rotateY: angle,
                    transform: `translateZ(${t.animation.radius}px)`,
                    backfaceVisibility: t.animation.backfaceVisible ? 'visible' : 'hidden',
                  }}
                >
                  <Card className="p-6 h-full bg-white dark:bg-gray-800 shadow-xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden">
                        <Image
                          src={t.image}
                          alt={t.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-sm text-muted-foreground">{t.title}</p>
                      </div>
                    </div>
                    <p className="italic text-glow">"{t.quote}"</p>
                    <div className="flex mt-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < t.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}