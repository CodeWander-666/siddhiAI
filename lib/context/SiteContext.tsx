'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { logError } from '@/lib/error-handling';

export interface SiteSettings {
  site_title: string;
  site_description: string;
  logo_url: string | null;
  favicon_url: string | null;
  social_links: Record<string, string>;
  contact_email: string;
  seo_defaults: {
    meta_title: string;
    meta_description: string;
  };
}

const defaultSettings: SiteSettings = {
  site_title: 'SiddhiAI',
  site_description: 'AI-powered digital marketing agency',
  logo_url: null,
  favicon_url: null,
  social_links: {},
  contact_email: 'hello@siddhi.ai',
  seo_defaults: {
    meta_title: 'SiddhiAI – AI Marketing',
    meta_description: 'Grow with intelligence.',
  },
};

interface SiteContextType {
  settings: SiteSettings;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children, initialSettings }: { children: React.ReactNode; initialSettings?: SiteSettings }) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings || defaultSettings);
  const [isLoading, setIsLoading] = useState(!initialSettings);
  const [error, setError] = useState<Error | null>(null);

  const fetchSettings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
      if (!tenantId) {
        console.warn('NEXT_PUBLIC_TENANT_ID not set, using defaults');
        setSettings(defaultSettings);
        return;
      }
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('tenant_id', tenantId)
        .single();
      if (error) throw error;
      if (data) {
        setSettings({
          site_title: data.site_title || defaultSettings.site_title,
          site_description: data.site_description || defaultSettings.site_description,
          logo_url: data.logo_url,
          favicon_url: data.favicon_url,
          social_links: data.social_links || {},
          contact_email: data.contact_email || defaultSettings.contact_email,
          seo_defaults: data.seo_defaults || defaultSettings.seo_defaults,
        });
      } else {
        setSettings(defaultSettings);
      }
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      console.error('Failed to fetch site settings:', errorObj);
      logError({ message: 'Site settings fetch failed', context: { error: errorObj } });
      setError(errorObj);
      if (!initialSettings) setSettings(defaultSettings);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initialSettings) {
      fetchSettings();
    }
  }, [initialSettings]);

  const refresh = async () => {
    await fetchSettings();
  };

  return (
    <SiteContext.Provider value={{ settings, isLoading, error, refresh }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
}