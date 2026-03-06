import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/animations/FadeIn';
import { ParallaxSection } from '@/components/animations/ParallaxSection';
import { Button3D } from '@/components/ui/Button3D';
import Image from 'next/image';

type Params = Promise<{ slug: string }>;

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  // In a real app, fetch post by slug
  const post = {
    title: 'The Future of AI in Marketing: Trends for 2026',
    content: '<p>This is a sample blog post. Replace with actual content from CMS or MDX.</p>',
    image: '/images/blog/ai-future.jpg',
    date: '2026-03-01',
    author: 'Arjun Mehta',
  };
  if (!post) notFound();

  return (
    <>
      <section className="section-padding bg-gradient-to-b from-primary/10 to-transparent">
        <Container className="max-w-4xl">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-animated text-glow">
              {post.title}
            </h1>
            <p className="text-muted-foreground">{post.date} · By <span className="text-gradient-accent">{post.author}</span></p>
          </FadeIn>
        </Container>
      </section>

      <ParallaxSection speed={0.2} className="section-padding pt-0">
        <Container className="max-w-4xl">
          <div className="relative h-96 mb-8 rounded-2xl overflow-hidden gradient-border">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
          <div className="mt-12 flex justify-center">
            <Button3D href="/blog" variant="primary">
              ← Back to Blog
            </Button3D>
          </div>
        </Container>
      </ParallaxSection>
    </>
  );
}

export async function generateStaticParams() {
  // Return list of slugs
  return [{ slug: 'future-of-ai-marketing' }, { slug: 'seo-changes-2026' }];
}