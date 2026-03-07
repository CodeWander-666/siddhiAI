import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/animations/FadeIn';
import { ParallaxSection } from '@/components/animations/ParallaxSection';
import { Button3D } from '@/components/ui/Button3D';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { logError } from '@/lib/error-handling';

type Params = Promise<{ slug: string }>;

// Fetch project data on the server
async function getProjectBySlug(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/projects?slug=eq.${slug}&select=*`,
      {
        headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! },
        next: { tags: [`project-${slug}`] }, // for on-demand revalidation
      }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch project: ${res.status}`);
    }
    const data = await res.json();
    // The query returns an array; we expect exactly one
    return data[0] || null;
  } catch (error) {
    console.error('Error fetching project:', error);
    if (process.env.NODE_ENV === 'production') {
      await logError({ message: 'Project fetch failed', context: { slug, error } });
    }
    return null;
  }
}

export default async function WorkDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[600px] flex items-end pb-16">
        <Image
          src={project.image || '/images/placeholder.jpg'}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <Container className="relative z-10 text-white">
          <FadeIn>
            <p className="text-sm uppercase tracking-wider mb-2 text-gradient-accent">{project.client}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl text-gradient-animated text-glow">
              {project.title}
            </h1>
            <p className="text-xl max-w-3xl text-readable">{project.description}</p>
          </FadeIn>
        </Container>
      </section>

      {/* Challenge & Solution (only if present) */}
      {(project.challenge || project.solution) && (
        <ParallaxSection speed={0.2} className="section-padding">
          <Container>
            <div className="grid md:grid-cols-2 gap-12">
              {project.challenge && (
                <FadeIn>
                  <h2 className="text-2xl font-semibold mb-4 text-gradient-primary">The Challenge</h2>
                  <p className="text-muted-foreground text-lg">{project.challenge}</p>
                </FadeIn>
              )}
              {project.solution && (
                <FadeIn delay={0.2}>
                  <h2 className="text-2xl font-semibold mb-4 text-gradient-accent">Our Solution</h2>
                  <p className="text-muted-foreground text-lg">{project.solution}</p>
                </FadeIn>
              )}
            </div>
          </Container>
        </ParallaxSection>
      )}

      {/* Results (if metrics exist) */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="section-padding bg-secondary/50">
          <Container>
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary">Key Results</h2>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-8">
              {project.metrics.map((result: any, i: number) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <Card className="p-8 text-center gradient-border">
                    <p className="text-4xl font-bold text-glow mb-2">{result.value}</p>
                    <p className="text-lg text-muted-foreground">{result.label}</p>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Testimonial (if available) */}
      {project.testimonial && (
        <section className="section-padding">
          <Container className="max-w-4xl">
            <FadeIn>
              <Card className="p-8 md:p-12 text-center bg-primary/5 border-primary/20 gradient-border">
                <p className="text-2xl md:text-3xl italic mb-6 text-glow">"{project.testimonial.quote}"</p>
                <p className="font-semibold text-gradient-accent">{project.testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{project.testimonial.title}</p>
              </Card>
            </FadeIn>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <Container className="text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to achieve similar results?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Let’s discuss how we can help your business grow.
            </p>
            <Button3D href="/contact" size="lg" variant="secondary">
              Start a Conversation
            </Button3D>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}

// Generate static paths at build time
export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/projects?select=slug`,
      {
        headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! },
      }
    );
    if (!res.ok) {
      console.error('Failed to fetch slugs for static generation');
      return [];
    }
    const projects = await res.json();
    return projects.map((p: any) => ({ slug: p.slug }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return []; // Fallback to no pre‑rendered pages
  }
}