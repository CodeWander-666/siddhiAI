'use client';

import { useSectionScroll } from '@/components/animations/ScrollSection';
import { motion, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button3D } from '@/components/ui/Button3D';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { useSite } from '@/lib/context/SiteContext';

// Icon mapping for social links
const iconMap: Record<string, any> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
};

export function Footer() {
  const { ref, scrollYProgress } = useSectionScroll(['start end', 'end end']);
  const y = useTransform(scrollYProgress, [0, 1], ['100%', '0%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  // Get site settings with fallback
  let siteSettings;
  try {
    siteSettings = useSite();
  } catch {
    siteSettings = {
      settings: {
        site_title: 'SiddhiAI',
        site_description: 'AI-powered digital marketing agency helping businesses grow with intelligence.',
        social_links: {},
      },
      isLoading: false,
      error: null,
    };
  }

  const { settings, isLoading } = siteSettings;
  const companyName = settings?.site_title || 'SiddhiAI';
  const description = settings?.site_description || 'AI-powered digital marketing agency helping businesses grow with intelligence.';
  const socialLinks = settings?.social_links || {};

  // Build social icons array from settings, falling back to defaults if empty
  let socialIcons: { Icon: any; href: string }[] = [];

  if (Object.keys(socialLinks).length > 0) {
    // Use configured social links
    socialIcons = Object.entries(socialLinks)
      .map(([key, href]) => {
        const Icon = iconMap[key.toLowerCase()];
        return Icon && href ? { Icon, href } : null;
      })
      .filter(Boolean) as any[];
  }

  // If no configured links, use default ones
  if (socialIcons.length === 0) {
    socialIcons = [
      { Icon: Facebook, href: 'https://facebook.com' },
      { Icon: Twitter, href: 'https://twitter.com' },
      { Icon: Instagram, href: 'https://instagram.com' },
      { Icon: Linkedin, href: 'https://linkedin.com' },
      { Icon: Github, href: 'https://github.com' },
    ];
  }

  return (
    <>
      <div className="h-32" />

      <motion.footer
        ref={ref}
        style={{ y, opacity }}
        className="bg-secondary/50 border-t py-16"
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company info */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gradient-primary">{companyName}</h3>
              <p className="text-muted-foreground">{description}</p>
              <div className="flex space-x-4">
                {socialIcons.map(({ Icon, href }) => (
                  <Link key={href} href={href} target="_blank" aria-label={href.split('.')[1]}>
                    <Icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links (unchanged) */}
            <div>
              <h4 className="font-semibold mb-4 text-gradient-accent">Quick Links</h4>
              <ul className="space-y-2">
                {['/', '/about', '/services', '/work', '/contact', '/blog'].map((path) => (
                  <li key={path}>
                    <Link
                      href={path}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services (unchanged) */}
            <div>
              <h4 className="font-semibold mb-4 text-gradient-accent">Services</h4>
              <ul className="space-y-2">
                {['AI SEO', 'Programmatic Ads', 'Content AI', 'Predictive Analytics', 'Social AI', 'Email AI'].map((s) => (
                  <li key={s}>
                    <Link
                      href={`/services#${s.toLowerCase().replace(' ', '-')}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter (unchanged) */}
            <div>
              <h4 className="font-semibold mb-4 text-gradient-accent">Stay Updated</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest insights on AI marketing delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border rounded-md bg-background"
                  required
                />
                <Button3D type="submit" variant="primary" size="sm">
                  Subscribe
                </Button3D>
              </form>
              <p className="text-xs text-muted-foreground mt-4">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>

          <div className="border-t mt-12 pt-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
          </div>
        </Container>
      </motion.footer>
    </>
  );
}