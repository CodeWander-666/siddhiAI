import { Hero } from '@/components/sections/Hero';
import { CTA } from '@/components/sections/CTA';
import { ClientSectionsWrapper } from '@/components/sections/ClientSectionsWrapper';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientSectionsWrapper />
      <CTA />
    </>
  );
}