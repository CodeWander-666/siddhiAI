import {
  Search,
  TrendingUp,
  PenTool,
  BarChart3,
  Globe,
  Mail,
  Sparkles,
  Zap,
  Target,
  type LucideIcon,
} from 'lucide-react';

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Gradient colors for background or accent */
  gradient: {
    from: string;
    to: string;
  };
  /** Animation presets */
  animation: {
    /** How the card flips on scroll: 'x' or 'y' */
    flipAxis: 'x' | 'y';
    /** Intensity of tilt on hover (degrees) */
    tiltIntensity: number;
    /** Stagger delay factor (relative to index) */
    staggerFactor: number;
    /** Custom scroll range for this service [start, end] */
    scrollRange?: [number, number];
  };
  /** Unique visual flair */
  badge?: string;
}

export const services: Service[] = [
  {
    icon: Search,
    title: 'AI SEO Optimization',
    description:
      'Data-driven keyword research, content optimization, and link building that adapts to search engine updates in real time.',
    gradient: { from: '#3b82f6', to: '#8b5cf6' },
    animation: {
      flipAxis: 'y',
      tiltIntensity: 15,
      staggerFactor: 0.1,
      scrollRange: [0, 0.4],
    },
    badge: 'Top Rank',
  },
  {
    icon: TrendingUp,
    title: 'Programmatic Advertising',
    description:
      'AI-managed ad campaigns across Google, Meta, and LinkedIn that optimize bids and targeting automatically.',
    gradient: { from: '#10b981', to: '#3b82f6' },
    animation: {
      flipAxis: 'x',
      tiltIntensity: 12,
      staggerFactor: 0.12,
      scrollRange: [0.1, 0.5],
    },
    badge: 'High ROI',
  },
  {
    icon: PenTool,
    title: 'Content Generation',
    description:
      'High-quality, SEO-optimized content created by AI and refined by human experts.',
    gradient: { from: '#f59e0b', to: '#ef4444' },
    animation: {
      flipAxis: 'y',
      tiltIntensity: 18,
      staggerFactor: 0.08,
      scrollRange: [0.2, 0.6],
    },
    badge: 'Fast',
  },
  {
    icon: BarChart3,
    title: 'Predictive Analytics',
    description:
      'Forecast trends, customer behavior, and campaign performance with machine learning models.',
    gradient: { from: '#8b5cf6', to: '#ec4899' },
    animation: {
      flipAxis: 'x',
      tiltIntensity: 10,
      staggerFactor: 0.15,
      scrollRange: [0.3, 0.7],
    },
    badge: 'Accurate',
  },
  {
    icon: Globe,
    title: 'Social Media AI',
    description:
      'Automated posting, sentiment analysis, and engagement optimization across all major platforms.',
    gradient: { from: '#06b6d4', to: '#3b82f6' },
    animation: {
      flipAxis: 'y',
      tiltIntensity: 14,
      staggerFactor: 0.09,
      scrollRange: [0.4, 0.8],
    },
    badge: '24/7',
  },
  {
    icon: Mail,
    title: 'Email Marketing AI',
    description:
      'Personalized email sequences with optimal send times and content tailored to each subscriber.',
    gradient: { from: '#ec4899', to: '#f43f5e' },
    animation: {
      flipAxis: 'x',
      tiltIntensity: 16,
      staggerFactor: 0.11,
      scrollRange: [0.5, 0.9],
    },
    badge: 'High Open Rate',
  },
  // Bonus services with extra flair
  {
    icon: Sparkles,
    title: 'AI Creative Suite',
    description:
      'Generate ad copy, visuals, and video scripts using state-of-the-art generative AI.',
    gradient: { from: '#a855f7', to: '#d946ef' },
    animation: {
      flipAxis: 'y',
      tiltIntensity: 20,
      staggerFactor: 0.13,
      scrollRange: [0.6, 1.0],
    },
    badge: 'New',
  },
  {
    icon: Zap,
    title: 'Real‑Time Personalization',
    description:
      'Dynamically tailor website and email experiences to each visitor based on behavior.',
    gradient: { from: '#eab308', to: '#f97316' },
    animation: {
      flipAxis: 'x',
      tiltIntensity: 11,
      staggerFactor: 0.14,
      scrollRange: [0.7, 1.1], // can extend beyond 1 for overshoot effect
    },
    badge: 'Beta',
  },
  {
    icon: Target,
    title: 'Conversion Rate Optimization',
    description:
      'AI-driven A/B testing and user journey analysis to maximize conversions.',
    gradient: { from: '#14b8a6', to: '#06b6d4' },
    animation: {
      flipAxis: 'y',
      tiltIntensity: 13,
      staggerFactor: 0.1,
      scrollRange: [0.8, 1.2],
    },
    badge: 'Proven',
  },
];