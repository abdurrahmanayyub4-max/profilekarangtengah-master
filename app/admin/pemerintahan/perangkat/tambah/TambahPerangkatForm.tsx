'use client';

// app/admin/pemerintahan/perangkat/tambah/TambahPerangkatForm.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaTimes, FaUsers } from 'react-icons/fa';

export default function TambahPerangkatForm() {
  const router  = useRouter();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form     = e.currentTarget;
    const formData = new FormData(form);
    const body = {
      nama:    (formData.get('nama')    as string) ?? '',
      jabatan: (formData.get('jabatan') as string) ?? '',
    };

    try {
      const res  = await fetch('/api/pemerintahan/perangkat/tambah', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'Gagal menyimpan. Coba lagi.');
        setLoading(false);
        return;
      }
      router.push('/admin/pemerintahan');
      router.refresh();
    } catch {
      setError('Terjadi kesalahan koneksi. Coba lagi.');
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-3 border-b border-gray-100 flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center">
              <FaUsers className="text-indigo-600 text-xs" />
            </div>
            <div className="font-bold text-gray-800 text-sm">Data Perangkat Baru</div>
          </div>
          <div className="p-6 flex flex-col gap-4">
            <div className="form-group flex flex-col gap-1">
              <label className="form-label">Nama</label>
              <input
                name="nama"
                required
                className="form-input w-full"
                placeholder="Nama lengkap perangkat..."
              />
            </div>
            <div className="form-group flex flex-col gap-1">
              <label className="form-label">Jabatan</label>
              <input
                name="jabatan"
                required
                className="form-input w-full"
                placeholder="Contoh: KEPALA PADUKUHAN, KETUA RT 1..."
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-rose-500 text-sm font-semibold bg-rose-50 px-4 py-3 rounded-xl border border-rose-100">
            <FaTimes className="flex-shrink-0" /> {error}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-3 justify-end">
          <Link href="/admin/pemerintahan" className="btn-secondary px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
            Batal
          </Link>
          <button type="submit" disabled={loading} className="btn-primary px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
            {loading ? <><span className="upload-spinner" /> Menyimpan...</> : 'Simpan Perangkat'}
          </button>
        </div>
      </form>
    </div>
  );
}
