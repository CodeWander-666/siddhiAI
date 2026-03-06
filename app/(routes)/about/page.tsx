import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/animations/FadeIn';
import { ParallaxSection } from '@/components/animations/ParallaxSection';
import { Button3D } from '@/components/ui/Button3D';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';

export const metadata = {
  title: 'About Us',
  description: 'Learn about SiddhiAI’s mission, values, and the team behind the AI revolution in marketing.',
};

const teamMembers = [
  { name: 'Arjun Mehta', role: 'CEO & Co-founder', image: '/images/team/arjun.jpg' },
  { name: 'Priya Sharma', role: 'CTO', image: '/images/team/priya.jpg' },
  { name: 'Rahul Verma', role: 'Head of AI', image: '/images/team/rahul.jpg' },
  { name: 'Ananya Singh', role: 'Creative Director', image: '/images/team/ananya.jpg' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/about-hero.jpg"
          alt="SiddhiAI team"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <Container className="relative z-10 text-center text-white">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-animated text-glow">
              About SiddhiAI
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-readable">
              We combine artificial intelligence with human creativity to deliver marketing that truly works.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Story */}
      <ParallaxSection speed={0.3} className="section-padding">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2025, SiddhiAI emerged from a simple observation: marketing was becoming too complex for traditional methods. Data overload, fragmented channels, and ever-changing algorithms demanded a smarter approach.
                </p>
                <p>
                  We assembled a team of AI researchers, data scientists, and marketing veterans to build a platform that learns, adapts, and optimizes continuously. The result is a marketing agency that doesn&apos;t just execute campaigns – it thinks.
                </p>
                <p>
                  Today, we help businesses worldwide achieve measurable growth through AI-powered strategies. Our name, Siddhi, means &quot;achievement&quot; or &quot;perfection&quot; in Sanskrit – it&apos;s what we strive for every day.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl gradient-border">
                <Image
                  src="/images/office.jpg"
                  alt="SiddhiAI office"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </Container>
      </ParallaxSection>

      {/* Values */}
      <section className="section-padding bg-secondary/50">
        <Container>
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-accent">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Innovation First', desc: 'We constantly explore new AI techniques to stay ahead.' },
              { title: 'Data-Driven', desc: 'Every decision is backed by rigorous analysis.' },
              { title: 'Client Success', desc: 'Your growth is our only metric of success.' },
              { title: 'Transparency', desc: 'No black boxes – you see exactly how we work.' },
              { title: 'Creativity', desc: 'AI enhances human creativity, it doesn’t replace it.' },
              { title: 'Global Mindset', desc: 'We think locally and act globally.' },
            ].map((value, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Card className="p-6 h-full gradient-border">
                  <h3 className="text-xl font-semibold mb-2 text-gradient-primary">{value.title}</h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <ParallaxSection speed={-0.2} className="section-padding">
        <Container>
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary">Meet the Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The brilliant minds behind SiddhiAI.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden gradient-border">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gradient-accent">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button3D href="/contact" variant="primary" size="lg">
              Join Our Team
            </Button3D>
          </div>
        </Container>
      </ParallaxSection>
    </>
  );
}