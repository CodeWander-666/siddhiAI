import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/animations/FadeIn';
import { Card } from '@/components/ui/Card';
import { Button3D } from '@/components/ui/Button3D';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Blog',
  description: 'Insights and updates from the SiddhiAI team.',
};

const posts = [
  {
    slug: 'future-of-ai-marketing',
    title: 'The Future of AI in Marketing: Trends for 2026',
    excerpt: 'Explore how AI is reshaping digital marketing and what to expect in the coming year.',
    image: '/images/blog/ai-future.jpg',
    date: '2026-03-01',
    author: 'Arjun Mehta',
  },
  {
    slug: 'seo-changes-2026',
    title: 'SEO in 2026: What’s Changed and How to Adapt',
    excerpt: 'Search engines are evolving. Learn the latest strategies to stay ahead.',
    image: '/images/blog/seo-2026.jpg',
    date: '2026-02-15',
    author: 'Priya Sharma',
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="section-padding bg-gradient-to-b from-primary/10 to-transparent">
        <Container className="text-center">
          <FadeIn>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-animated text-glow">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Thoughts, insights, and updates from the SiddhiAI team.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <FadeIn key={post.slug} delay={index * 0.1}>
                <Link href={`/blog/${post.slug}`}>
                  <Card className="overflow-hidden h-full gradient-border hover:scale-105 transition-transform">
                    <div className="relative h-48">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-gradient-primary">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                      <p className="text-sm text-gradient-accent">By {post.author}</p>
                    </div>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button3D href="#" variant="primary" size="lg">
              Load More
            </Button3D>
          </div>
        </Container>
      </section>
    </>
  );
}