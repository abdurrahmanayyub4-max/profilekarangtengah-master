'use client';

// components/LogoutButton.tsx
// Ganti tombol "Keluar" di sidebar dengan komponen ini
import { signOut } from 'next-auth/react';
import { useState } from 'react';

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await signOut({ callbackUrl: '/login' });
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="w-full bg-white bg-opacity-10 hover:bg-opacity-20 border border-white border-opacity-20 text-white py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
    >
      {loading ? <><span className="upload-spinner" /> Keluar...</> : 'Keluar'}
    </button>
  );
}
