import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105 active:scale-95',
        outline: 'border border-input bg-background hover:bg-accent/10 hover:text-accent-foreground',
        ghost: 'hover:bg-accent/10 hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: { sm: 'h-9 px-4 text-sm', md: 'h-11 px-6', lg: 'h-14 px-8 text-lg', icon: 'h-10 w-10' },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  href?: string; // string is acceptable with typedRoutes because we cast elsewhere
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    if (href) {
      return (
        <Link href={href as any} className={cn(buttonVariants({ variant, size, className }))}>
          {children}
        </Link>
      );
    }
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
export { Button, buttonVariants };