import { cn } from '@/lib/utils/cn';
import * as React from 'react';
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('container-custom', className)} {...props}>{children}</div>
));
Container.displayName = 'Container';