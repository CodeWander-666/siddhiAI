'use client';

import { useSectionScroll } from '@/components/animations/ScrollSection';
import { motion, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { TiltCard } from '@/components/animations/TiltCard';
import { services } from '@/lib/constants/services';

export function Services() {
  const { ref, scrollYProgress } = useSectionScroll(['start end', 'end start']);

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
            const Icon = service.icon;

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
                key={index}
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
                        background: `linear-gradient(135deg, ${service.gradient.from}30, ${service.gradient.to}30)`,
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: service.gradient.from }} />
                    </div>

                    <h3 className="text-2xl font-semibold mb-2 text-gradient-primary">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">{service.description}</p>

                    {service.badge && (
                      <span
                        className="inline-block mt-4 px-3 py-1 text-xs font-medium rounded-full"
                        style={{
                          background: `linear-gradient(135deg, ${service.gradient.from}, ${service.gradient.to})`,
                          color: 'white',
                        }}
                      >
                        {service.badge}
                      </span>
                    )}
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