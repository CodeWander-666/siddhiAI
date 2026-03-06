import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/animations/FadeIn';
import { Stagger } from '@/components/animations/Stagger';
import { ParallaxSection } from '@/components/animations/ParallaxSection';
import { Card } from '@/components/ui/Card';
import { Button3D } from '@/components/ui/Button3D';
import { services } from '@/lib/constants/services';

export const metadata = {
  title: 'Services',
  description: 'Explore our AI-powered digital marketing services designed to grow your business.',
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-primary/10 to-transparent">
        <Container className="text-center">
          <FadeIn>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-animated text-glow">
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We combine cutting-edge AI with marketing expertise to deliver measurable results.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Services grid */}
      <ParallaxSection speed={0.2} className="section-padding">
        <Container>
          <Stagger staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="p-8 h-full gradient-border hover:scale-105 transition-transform">
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
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  {service.badge && (
                    <span
                      className="inline-block px-3 py-1 text-xs font-medium rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${service.gradient.from}, ${service.gradient.to})`,
                        color: 'white',
                      }}
                    >
                      {service.badge}
                    </span>
                  )}
                </Card>
              );
            })}
          </Stagger>
        </Container>
      </ParallaxSection>

      {/* Process */}
      <section className="section-padding bg-secondary/50">
        <Container>
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-accent">How We Work</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-driven process ensures maximum efficiency and results.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Discovery', desc: 'We analyze your business, audience, and competitors.' },
              { step: 2, title: 'Strategy', desc: 'AI models generate a custom marketing plan.' },
              { step: 3, title: 'Execution', desc: 'Campaigns are launched and continuously optimized.' },
              { step: 4, title: 'Analysis', desc: 'We measure, learn, and refine for even better results.' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Card className="p-6 text-center h-full gradient-border">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gradient-primary">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <Container className="text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-animated">Ready to transform your marketing?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Let&apos;s discuss how AI can take your business to the next level.
            </p>
            <Button3D href="/contact" size="lg" variant="primary">
              Start a Conversation
            </Button3D>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}