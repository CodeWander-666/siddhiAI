import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export default function NotFound() {
  return (
    <Container className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl md:text-4xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. Perhaps you&apos;d like to go back home?
      </p>
      <Button href="/" size="lg">Return Home</Button>
    </Container>
  );
}