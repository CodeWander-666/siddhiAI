'use client';

import dynamic from 'next/dynamic';

const Services = dynamic(
  () => import('@/components/sections/Services').then((mod) => mod.Services),
  {
    ssr: false,
    loading: () => <div className="min-h-screen bg-secondary/50 animate-pulse" />,
  }
);

const FeaturedWork = dynamic(
  () => import('@/components/sections/FeaturedWork').then((mod) => mod.FeaturedWork),
  {
    ssr: false,
    loading: () => <div className="h-screen bg-background animate-pulse" />,
  }
);

const Testimonials = dynamic(
  () => import('@/components/sections/Testimonials').then((mod) => mod.Testimonials),
  {
    ssr: false,
    loading: () => <div className="h-screen bg-primary/5 animate-pulse" />,
  }
);

export function ClientSectionsWrapper() {
  return (
    <>
      <Services />
      <FeaturedWork />
      <Testimonials />
    </>
  );
}