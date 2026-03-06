'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface ParallaxImageProps { src: string; alt: string; speed?: number; className?: string; containerClassName?: string; fill?: boolean; width?: number; height?: number; priority?: boolean; }

export function ParallaxImage({ src, alt, speed = 0.5, className, containerClassName, fill, width, height, priority }: ParallaxImageProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
  return (
    <div ref={ref} className={cn('overflow-hidden', containerClassName)}>
      <motion.div style={{ y }} className="relative w-full h-full">
        <Image src={src} alt={alt} fill={fill} width={!fill ? width : undefined} height={!fill ? height : undefined} className={cn('object-cover', className)} priority={priority} />
      </motion.div>
    </div>
  );
}