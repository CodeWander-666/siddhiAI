import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://siddhi.ai';
  const staticPages = ['', '/about', '/services', '/work', '/contact', '/blog'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
  const blogPosts = ['/blog/future-of-ai-marketing', '/blog/seo-changes-2026'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  const caseStudies = ['/work/tech-startup-growth', '/work/ecommerce-conversion-optimization', '/work/saas-lead-generation', '/work/local-business-seo'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  return [...staticPages, ...blogPosts, ...caseStudies];
}