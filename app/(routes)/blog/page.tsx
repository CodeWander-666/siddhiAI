import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/animations/FadeIn';
import { Card } from '@/components/ui/Card';
import { Button3D } from '@/components/ui/Button3D';
import Image from 'next/image';
import Link from 'next/link';
import { logError } from '@/lib/error-handling';

export const metadata = {
  title: 'Blog',
  description: 'Insights and updates from the SiddhiAI team.',
};

// Fetch published blog posts from Supabase
async function getBlogPosts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/blog_posts?select=*&published=eq.true&order=created_at.desc`,
      {
        headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! },
        next: { tags: ['blog'] }, // for on‑demand revalidation
      }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch blog posts: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    if (process.env.NODE_ENV === 'production') {
      await logError({ message: 'Blog posts fetch failed', context: { error } });
    }
    return null; // indicates error
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  // Error state
  if (!posts) {
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
          <Container className="text-center">
            <p className="text-muted-foreground">Unable to load blog posts at this time.</p>
          </Container>
        </section>
      </>
    );
  }

  // Empty state
  if (posts.length === 0) {
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
          <Container className="text-center">
            <p className="text-muted-foreground">No blog posts yet.</p>
          </Container>
        </section>
      </>
    );
  }

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
            {posts.map((post: any, index: number) => (
              <FadeIn key={post.slug} delay={index * 0.1}>
                <Link href={`/blog/${post.slug}`}>
                  <Card className="overflow-hidden h-full gradient-border hover:scale-105 transition-transform">
                    <div className="relative h-48">
                      <Image
                        src={post.featured_image || '/images/blog/placeholder.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-muted-foreground mb-2">
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
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