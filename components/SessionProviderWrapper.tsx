'use client';

// components/SessionProviderWrapper.tsx
// Wrap layout dengan ini agar session tersedia di seluruh app
import { SessionProvider } from 'next-auth/react';

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
