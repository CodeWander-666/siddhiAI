import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/animations/FadeIn';
import { ParallaxSection } from '@/components/animations/ParallaxSection';
import { Button3D } from '@/components/ui/Button3D';
import Image from 'next/image';
import { logError } from '@/lib/error-handling';

type Params = Promise<{ slug: string }>;

// Fetch a single blog post by slug
async function getPost(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/blog_posts?select=*&slug=eq.${slug}&published=eq.true`,
      {
        headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! },
        next: { tags: [`blog-${slug}`] }, // for on-demand revalidation
      }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch blog post: ${res.status}`);
    }
    const data = await res.json();
    // The query returns an array; we expect exactly one
    return data[0] || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    if (process.env.NODE_ENV === 'production') {
      await logError({ message: 'Blog post fetch failed', context: { slug, error } });
    }
    return null;
  }
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  // Format date
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Content can be JSON from TipTap or HTML string. We'll assume it's HTML string.
  // If it's JSON, you'd need a rich text renderer. Adjust based on your actual data.
  const content = post.content || '';

  return (
    <>
      <section className="section-padding bg-gradient-to-b from-primary/10 to-transparent">
        <Container className="max-w-4xl">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-animated text-glow">
              {post.title}
            </h1>
            <p className="text-muted-foreground">
              {formattedDate} · By <span className="text-gradient-accent">{post.author || 'SiddhiAI'}</span>
            </p>
          </FadeIn>
        </Container>
      </section>

      <ParallaxSection speed={0.2} className="section-padding pt-0">
        <Container className="max-w-4xl">
          {post.featured_image && (
            <div className="relative h-96 mb-8 rounded-2xl overflow-hidden gradient-border">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
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
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/blog_posts?select=slug&published=eq.true`,
      {
        headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! },
      }
    );
    if (!res.ok) {
      console.error('Failed to fetch slugs for static generation');
      return [];
    }
    const posts = await res.json();
    return posts.map((p: any) => ({ slug: p.slug }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}