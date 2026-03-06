'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { motion, type MotionProps } from 'framer-motion';

type ButtonBaseProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  | 'onAnimationStart'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
>;

interface Button3DProps extends ButtonBaseProps {
  href?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'link';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  whileHover?: MotionProps['whileHover'];
  whileTap?: MotionProps['whileTap'];
  transition?: MotionProps['transition'];
}

export const Button3D = React.forwardRef<HTMLButtonElement, Button3DProps>(
  (
    {
      href,
      variant = 'primary',
      size = 'md',
      children,
      className,
      whileHover = { y: -4 },
      whileTap = { y: 0 },
      transition = { type: 'spring', stiffness: 400, damping: 17 },
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      'relative inline-block font-semibold rounded-full transition-all duration-200',
      'transform-gpu hover:translate-y-[-4px] hover:scale-105 active:translate-y-0 active:scale-100',
      variant !== 'link' && [
        'shadow-[0_8px_0_rgba(0,0,0,0.2),0_10px_20px_rgba(0,0,0,0.1)]',
        'hover:shadow-[0_4px_0_rgba(0,0,0,0.2),0_15px_25px_rgba(0,0,0,0.15)]',
        'active:shadow-[0_2px_0_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.1)]',
      ],
      {
        'bg-primary text-primary-foreground': variant === 'primary',
        'bg-secondary text-secondary-foreground': variant === 'secondary',
        'bg-accent text-accent-foreground': variant === 'accent',
        'text-primary underline-offset-4 hover:underline bg-transparent shadow-none hover:translate-y-0 hover:scale-100':
          variant === 'link',
        'px-4 py-2 text-sm': size === 'sm',
        'px-6 py-3 text-base': size === 'md',
        'px-8 py-4 text-lg': size === 'lg',
      },
      className
    );

    const content = (
      <>
        <span className="relative z-10">{children}</span>
        {variant !== 'link' && (
          <span className="absolute inset-0 rounded-full bg-black/10 opacity-0 hover:opacity-100 transition-opacity" />
        )}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={baseClasses}>
          {content}
        </Link>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={baseClasses}
        whileHover={whileHover}
        whileTap={whileTap}
        transition={transition}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button3D.displayName = 'Button3D';