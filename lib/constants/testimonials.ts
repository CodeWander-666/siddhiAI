export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  image: string;
  /** Rating out of 5 */
  rating: number;
  /** For animated background or accent */
  color: string;
  /** Animation: how this card moves in the 3D ring */
  animation: {
    /** Radius of the ring (px) */
    radius: number;
    /** Additional rotation offset (degrees) */
    rotateOffset: number;
    /** Whether to flip backface */
    backfaceVisible: boolean;
  };
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "SiddhiAI transformed our digital presence. Their AI-driven approach delivered results we couldn't have achieved with traditional methods.",
    name: 'Rajiv Mehta',
    title: 'CEO, InnovateTech',
    image: '/images/testimonials/rajiv.jpg',
    rating: 5,
    color: '#3b82f6',
    animation: {
      radius: 200,
      rotateOffset: 0,
      backfaceVisible: false,
    },
  },
  {
    quote:
      "The team's expertise in AI marketing helped us cut ad spend by 30% while doubling conversions. Highly recommended!",
    name: 'Priya Kaur',
    title: 'Marketing Head, ShopDirect',
    image: '/images/testimonials/priya.jpg',
    rating: 5,
    color: '#8b5cf6',
    animation: {
      radius: 220,
      rotateOffset: 15,
      backfaceVisible: true,
    },
  },
  {
    quote:
      "We've seen a 200% increase in organic traffic since partnering with SiddhiAI. Their insights are game-changing.",
    name: 'Amit Sharma',
    title: 'Founder, CloudScale',
    image: '/images/testimonials/amit.jpg',
    rating: 5,
    color: '#10b981',
    animation: {
      radius: 180,
      rotateOffset: -10,
      backfaceVisible: false,
    },
  },
  {
    quote:
      'The predictive analytics they provided helped us anticipate market shifts and stay ahead of competitors.',
    name: 'Neha Gupta',
    title: 'CMO, FinEdge',
    image: '/images/testimonials/neha.jpg',
    rating: 5,
    color: '#f59e0b',
    animation: {
      radius: 210,
      rotateOffset: 5,
      backfaceVisible: true,
    },
  },
  {
    quote:
      'Their AI-powered email campaigns achieved open rates we never thought possible. Truly remarkable.',
    name: 'Vikram Singh',
    title: 'Director, EduRise',
    image: '/images/testimonials/vikram.jpg',
    rating: 5,
    color: '#ef4444',
    animation: {
      radius: 190,
      rotateOffset: -5,
      backfaceVisible: false,
    },
  },
];