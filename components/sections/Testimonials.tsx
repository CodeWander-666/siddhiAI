'use client';

import { useState, useEffect } from 'react';
import { useSectionScroll } from '@/components/animations/ScrollSection';
import { motion, useTransform } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';
import { logError } from '@/lib/error-handling';
import { cn } from '@/lib/utils/cn';

// Loading placeholder – a simple spinner
function LoadingRing() {
  return (
    <div className="relative h-[500px] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

export function Testimonials() {
  const { ref, scrollYProgress } = useSectionScroll(['start end', 'end start']);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Using fetch with tags (optional, for revalidation)
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/testimonials?select=*`,
          {
            headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! },
            next: { tags: ['testimonials'] },
          }
        );
        if (!res.ok) throw new Error('Failed to fetch testimonials');
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        logError({ message: 'Testimonials fetch failed', context: { error: err } });
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section ref={ref} className="h-screen flex items-center justify-center bg-primary/5 overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient-primary">
            Client Success Stories
          </h2>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-16">
            Don't just take our word for it – hear from our clients.
          </p>
          <LoadingRing />
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section ref={ref} className="h-screen flex items-center justify-center bg-primary/5 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">Failed to load testimonials.</p>
        </div>
      </section>
    );
  }

  // No testimonials – optional empty state
  if (testimonials.length === 0) {
    return (
      <section ref={ref} className="h-screen flex items-center justify-center bg-primary/5 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">No testimonials yet.</p>
        </div>
      </section>
    );
  }

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
              // Dynamic animation values (can be stored in DB if needed)
              const radius = 200 + (i % 3) * 20; // vary radius slightly
              const backfaceVisible = false; // keep hidden by default

              return (
                <motion.div
                  key={t.id}
                  className="absolute inset-0"
                  style={{
                    rotateY: angle,
                    transform: `translateZ(${radius}px)`,
                    backfaceVisibility: backfaceVisible ? 'visible' : 'hidden',
                  }}
                >
                  <Card className="p-6 h-full bg-white dark:bg-gray-800 shadow-xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden">
                        {t.image ? (
                          <Image
                            src={t.image}
                            alt={t.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted rounded-full" />
                        )}
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
                          className={cn(
                            'w-5 h-5',
                            i < (t.rating || 5) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          )}
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