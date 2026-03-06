'use client';

import { useSectionScroll } from '@/components/animations/ScrollSection';
import { ScrollCarousel } from '@/components/animations/ScrollCarousel';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button3D } from '@/components/ui/Button3D';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/constants/projects';

export function FeaturedWork() {
  const { ref, scrollYProgress } = useSectionScroll(['start end', 'end start']);

  return (
    <section ref={ref} className="relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-background">
        <div className="w-full">
          <div className="container mx-auto px-4 mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-accent">
              Featured Work
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              See how we've helped businesses like yours achieve remarkable growth.
            </p>
          </div>

          <ScrollCarousel scrollProgress={scrollYProgress} visible={1} className="w-full">
            {projects.map((project) => (
              <div key={project.slug} className="px-4">
                <Link href={`/work/${project.slug}`}>
                  <Card className="overflow-hidden p-0 group cursor-pointer">
                    <div className="relative h-[70vh] max-h-[600px] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <p className="text-sm opacity-80 mb-2">{project.client}</p>
                        <h3 className="text-3xl md:text-4xl font-bold mb-2 text-gradient-animated">
                          {project.title}
                        </h3>
                        <p className="text-lg opacity-90 max-w-xl">{project.description}</p>
                        <div className="flex gap-4 mt-4">
                          {project.metrics.map((metric, i) => (
                            <div key={i}>
                              <span className="text-2xl font-bold text-glow">{metric.value}</span>
                              <span className="text-sm ml-1">{metric.label}</span>
                            </div>
                          ))}
                        </div>
                        <Button3D variant="primary" size="sm" className="mt-4">
                          Read Case Study
                        </Button3D>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </ScrollCarousel>
        </div>
      </div>

      <div className="h-screen" />
    </section>
  );
}