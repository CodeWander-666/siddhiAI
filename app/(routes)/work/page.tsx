import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/animations/FadeIn';
import { Card } from '@/components/ui/Card';
import { Button3D } from '@/components/ui/Button3D';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/constants/projects';

export const metadata = {
  title: 'Our Work',
  description: 'See how we’ve helped businesses grow with AI-powered marketing.',
};

export default function WorkPage() {
  return (
    <>
      <section className="section-padding bg-gradient-to-b from-primary/10 to-transparent">
        <Container className="text-center">
          <FadeIn>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-animated text-glow">
              Our Work
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real results for real businesses. See how AI transforms marketing.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <FadeIn key={project.slug} delay={index * 0.1}>
                <Link href={`/work/${project.slug}`} className="block group">
                  <Card className="overflow-hidden p-0 gradient-border">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-primary mb-2">{project.client}</p>
                      <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors text-gradient-primary">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex gap-4 mb-4">
                        {project.metrics.map((metric, i) => (
                          <div key={i}>
                            <span className="text-xl font-bold text-glow">{metric.value}</span>
                            <span className="text-xs ml-1 text-muted-foreground">{metric.label}</span>
                          </div>
                        ))}
                      </div>
                      <Button3D variant="link" className="p-0">
                        Read case study →
                      </Button3D>
                    </div>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}