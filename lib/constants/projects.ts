export interface Project {
  slug: string;
  title: string;
  client: string;
  image: string;
  description: string;
  tags: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  challenge?: string;
  solution?: string;
  testimonial?: {
    quote: string;
    name: string;
    title: string;
  };
  animation: {
    speedFactor: number;
    activeZoom: number;
    theme: 'blue' | 'purple' | 'green' | 'orange' | 'pink';
  };
}

export const projects: Project[] = [
  {
    slug: 'tech-startup-growth',
    title: '300% Traffic Growth',
    client: 'InnovateTech',
    image: '/images/work/tech.jpg',
    description: 'AI-driven content strategy boosted organic traffic by 300% in 6 months.',
    tags: ['SEO', 'Content Marketing'],
    metrics: [
      { label: 'Organic Traffic', value: '+300%' },
      { label: 'Keyword Rankings', value: '+450%' },
      { label: 'Demo Signups', value: '+200%' },
    ],
    challenge: 'InnovateTech struggled with stagnant organic traffic and high ad costs.',
    solution: 'We implemented an AI content strategy that identified high‑value keywords and generated optimized posts.',
    testimonial: {
      quote: 'SiddhiAI didn’t just improve our numbers – they transformed how we think about marketing.',
      name: 'Rajiv Mehta',
      title: 'CEO, InnovateTech',
    },
    animation: {
      speedFactor: 1.2,
      activeZoom: 1.1,
      theme: 'blue',
    },
  },
  // ... other projects (ensure they all have at least challenge/solution if used)
];