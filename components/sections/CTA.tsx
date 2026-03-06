'use client';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations/FadeIn';

export function CTA() {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <Container className="text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Ready to grow with intelligence?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">Let's discuss how AI can transform your marketing and drive real results.</p>
          <Button href="/contact" size="lg" variant="secondary">Start a Conversation</Button>
        </FadeIn>
      </Container>
    </section>
  );
}