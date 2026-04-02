'use client';

// components/SessionTimeout.tsx
import { useEffect, useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';

const TIMEOUT_MS = 10 * 60 * 1000; // 10 menit

export default function SessionTimeout() {
  const { data: session } = useSession();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  function resetTimer() {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      signOut({ callbackUrl: '/login' });
    }, TIMEOUT_MS);
  }

  useEffect(() => {
    if (!session) return;

    // Event yang dianggap sebagai aktivitas
    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer(); // mulai timer saat pertama mount

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [session]);

  return null; // tidak render apapun
}