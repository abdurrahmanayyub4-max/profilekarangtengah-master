'use client';

// app/admin/pemerintahan/[id]/edit/EditForm.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa';

type Pemerintahan = {
  id: number;
  judul: string | null;
  deskripsi: string | null;
  judulDeskripsi: string | null;
  isiDeskripsi: string | null;
  judulVisiMisi: string | null;
  visi: string | null;
  deskripsiStruktur: string | null;
};

function SectionCard({ title, badge, children }: {
  title: string;
  badge: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-3 border-b border-gray-100 flex items-center gap-2">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${badge}`}>{title}</span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default function EditForm({ pemerintahan }: { pemerintahan: Pemerintahan }) {
  const router  = useRouter();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const inputCls    = 'form-input w-full';
  const textareaCls = 'form-input w-full resize-none';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form     = e.currentTarget;
    const formData = new FormData(form);
    const getValue = (name: string) => (formData.get(name) as string) ?? '';

    const body = {
      id:                pemerintahan.id,
      judul:             getValue('judul'),
      deskripsi:         getValue('deskripsi'),
      judulDeskripsi:    getValue('judulDeskripsi'),
      isiDeskripsi:      getValue('isiDeskripsi'),
      judulVisiMisi:     getValue('judulVisiMisi'),
      visi:              getValue('visi'),
      deskripsiStruktur: getValue('deskripsiStruktur'),
    };

    try {
      const res  = await fetch('/api/pemerintahan/edit', {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Info bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
          <span className="text-amber-600 text-xs">✏️</span>
        </div>
        <div>
          <div className="font-bold text-gray-800 text-sm">Edit Data Pemerintahan</div>
          <div className="text-gray-400 text-xs">ID #{pemerintahan.id}</div>
        </div>
      </div>

      {/* ── Informasi Umum ── */}
      <SectionCard title="Informasi Umum" badge="bg-indigo-100 text-indigo-700">
        <div className="flex flex-col gap-4">
          <div className="form-group flex flex-col gap-1">
            <label className="form-label">Judul</label>
            <input name="judul" defaultValue={pemerintahan.judul ?? ''} className={inputCls} placeholder="Judul halaman pemerintahan..." />
          </div>
          <div className="form-group flex flex-col gap-1">
            <label className="form-label">Deskripsi Singkat</label>
            <textarea name="deskripsi" defaultValue={pemerintahan.deskripsi ?? ''} rows={3} className={textareaCls} placeholder="Deskripsi singkat..." />
          </div>
        </div>
      </SectionCard>

      {/* ── Deskripsi Padukuhan ── */}
      <SectionCard title="Deskripsi Padukuhan" badge="bg-emerald-100 text-emerald-700">
        <div className="flex flex-col gap-4">
          <div className="form-group flex flex-col gap-1">
            <label className="form-label">Judul Deskripsi</label>
            <input name="judulDeskripsi" defaultValue={pemerintahan.judulDeskripsi ?? ''} className={inputCls} placeholder="Judul deskripsi..." />
          </div>
          <div className="form-group flex flex-col gap-1">
            <label className="form-label">Isi Deskripsi</label>
            <textarea name="isiDeskripsi" defaultValue={pemerintahan.isiDeskripsi ?? ''} rows={6} className={textareaCls} placeholder="Isi deskripsi padukuhan..." />
          </div>
        </div>
      </SectionCard>

      {/* ── Visi & Misi ── */}
      <SectionCard title="Visi & Misi" badge="bg-violet-100 text-violet-700">
        <div className="flex flex-col gap-4">
          <div className="form-group flex flex-col gap-1">
            <label className="form-label">Judul Visi Misi</label>
            <input name="judulVisiMisi" defaultValue={pemerintahan.judulVisiMisi ?? ''} className={inputCls} placeholder="Contoh: Visi & Misi" />
          </div>
          <div className="form-group flex flex-col gap-1">
            <label className="form-label">Visi</label>
            <textarea name="visi" defaultValue={pemerintahan.visi ?? ''} rows={3} className={textareaCls} placeholder="Isi visi..." />
          </div>
        </div>
      </SectionCard>

      {/* ── Struktur Organisasi ── */}
      <SectionCard title="Struktur Organisasi" badge="bg-blue-100 text-blue-700">
        <div className="form-group flex flex-col gap-1">
          <label className="form-label">Deskripsi Struktur</label>
          <textarea name="deskripsiStruktur" defaultValue={pemerintahan.deskripsiStruktur ?? ''} rows={4} className={textareaCls} placeholder="Deskripsi struktur organisasi..." />
        </div>
      </SectionCard>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-rose-500 text-sm font-semibold bg-rose-50 px-4 py-3 rounded-xl border border-rose-100">
          <FaTimes className="flex-shrink-0" /> {error}
        </div>
      )}

      {/* Tombol Aksi */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-3 justify-end sticky bottom-4">
        <Link href="/admin/pemerintahan" className="btn-secondary px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
          Batal
        </Link>
        <button type="submit" disabled={loading} className="btn-primary px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
          {loading ? <><span className="upload-spinner" /> Menyimpan...</> : 'Simpan Perubahan'}
        </button>
      </div>
    </form>
  );
}
