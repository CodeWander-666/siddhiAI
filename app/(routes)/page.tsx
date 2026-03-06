import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { FeaturedWork } from '@/components/sections/FeaturedWork';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTA } from '@/components/sections/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedWork />
      <Testimonials />
      <CTA />
    </>
  );
}
