'use client';

import { useState, useEffect } from 'react';
import { useSectionScroll } from '@/components/animations/ScrollSection';
import { motion, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { TiltCard } from '@/components/animations/TiltCard';
import { supabase } from '@/lib/supabase/client';
import { logError } from '@/lib/error-handling';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils/cn';

// Default icon mapping (fallback)
const defaultIcon = Icons.Star;

// Predefined gradients for visual variety (based on original constants)
const gradients = [
  { from: '#3b82f6', to: '#8b5cf6' }, // blue to purple
  { from: '#10b981', to: '#3b82f6' }, // green to blue
  { from: '#f59e0b', to: '#ef4444' }, // orange to red
  { from: '#8b5cf6', to: '#ec4899' }, // purple to pink
  { from: '#06b6d4', to: '#3b82f6' }, // cyan to blue
  { from: '#ec4899', to: '#f43f5e' }, // pink to rose
];

export function Services() {
  const { ref, scrollYProgress } = useSectionScroll(['start end', 'end start']);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Use fetch with tags for revalidation (optional)
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/services?select=*&order=order_index`,
          {
            headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! },
            next: { tags: ['services'] }, // for server components, but here we are client-side; still works for cache?
          }
        );
        if (!res.ok) throw new Error('Failed to fetch services');
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error('Error fetching services:', err);
        logError({ message: 'Services fetch failed', context: { error: err } });
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen py-24 md:py-32 bg-secondary/50">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground">
              We combine cutting-edge AI with marketing expertise to deliver measurable results.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-8 h-full animate-pulse">
                <div className="w-14 h-14 rounded-xl bg-gray-200 mb-4" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-full mb-1" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </Card>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen py-24 md:py-32 bg-secondary/50">
        <Container className="text-center">
          <p className="text-red-500">Failed to load services. Please try again later.</p>
        </Container>
      </section>
    );
  }

  return (
    <section ref={ref} className="min-h-screen py-24 md:py-32 bg-secondary/50">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground">
            We combine cutting-edge AI with marketing expertise to deliver measurable results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            // Determine icon component
            let IconComponent;
            if (service.icon_name && Icons[service.icon_name as keyof typeof Icons]) {
              IconComponent = Icons[service.icon_name as keyof typeof Icons];
            } else {
              IconComponent = defaultIcon;
            }

            // Pick gradient from list (cycle through)
            const gradient = gradients[index % gradients.length];

            // Animation calculations (unchanged)
            const enterStart = 0;
            const enterEnd = 0.3;
            const delayFactor = 0.03;
            const cardProgress = useTransform(
              scrollYProgress,
              [enterStart + index * delayFactor, enterEnd + index * delayFactor],
              [0, 1]
            );
            const rotateX = useTransform(cardProgress, [0, 1], [15, 0]);
            const y = useTransform(cardProgress, [0, 1], [30, 0]);
            const opacity = useTransform(cardProgress, [0, 1], [0, 1]);

            return (
              <motion.div
                key={service.id}
                style={{
                  rotateX,
                  y,
                  opacity,
                  transformPerspective: 1000,
                  transformStyle: 'preserve-3d',
                }}
              >
                <TiltCard intensity={8} className="h-full">
                  <Card
                    className="relative p-8 h-full overflow-hidden gradient-border"
                    style={{
                      background: 'rgba(var(--card) / 0.6)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br"
                      style={{
                        background: `linear-gradient(135deg, ${gradient.from}30, ${gradient.to}30)`,
                      }}
                    >
                      <IconComponent
                        className="w-7 h-7"
                        style={{ color: gradient.from }}
                      />
                    </div>

                    <h3 className="text-2xl font-semibold mb-2 text-gradient-primary">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">{service.description}</p>

                    {/* Badge can be added later if you add a `badge` column */}
                    {/* {service.badge && (...)} */}
                  </Card>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}