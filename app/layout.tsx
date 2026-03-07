import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/sections/Footer';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { Toaster } from 'sonner';
import Background3DWrapper from '@/components/shared/Background3DWrapper';
import { SiteProvider } from '@/lib/context/SiteContext';
import { createClient } from '@/lib/supabase/server';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  // ... your existing metadata ...
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

async function getInitialSettings() {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
  if (!tenantId) {
    console.warn('NEXT_PUBLIC_TENANT_ID not set, using default settings');
    return null;
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('tenant_id', tenantId)
    .single();
  if (error || !data) {
    console.error('Failed to fetch initial site settings:', error);
    return null;
  }
  return {
    site_title: data.site_title,
    site_description: data.site_description,
    logo_url: data.logo_url,
    favicon_url: data.favicon_url,
    social_links: data.social_links || {},
    contact_email: data.contact_email,
    seo_defaults: data.seo_defaults || { meta_title: '', meta_description: '' },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialSettings = await getInitialSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteProvider initialSettings={initialSettings}>
            <Background3DWrapper />
            <div className="relative z-10 flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster richColors position="bottom-right" />
          </SiteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}