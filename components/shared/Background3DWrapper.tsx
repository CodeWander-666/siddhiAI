'use client';

import dynamic from 'next/dynamic';

// Dynamically import Background3D (named export) with ssr: false
const Background3D = dynamic(
  () => import('@/components/shared/Background3D').then((mod) => mod.Background3D),
  { ssr: false }
);

export default function Background3DWrapper() {
  return <Background3D />;
}