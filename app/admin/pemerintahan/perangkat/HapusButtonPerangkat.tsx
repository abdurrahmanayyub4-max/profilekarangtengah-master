'use client';

// app/admin/pemerintahan/perangkat/HapusButtonPerangkat.tsx
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { hapusPerangkat } from '../actions';
import { FaTrash, FaExclamationTriangle } from 'react-icons/fa';

export default function HapusButtonPerangkat({
  id,
  nama,
  redirectAfter = '/admin/pemerintahan',
}: {
  id: number;
  nama: string;
  redirectAfter?: string;
}) {
  const [open,    setOpen]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  async function handleHapus() {
    setLoading(true);
    await hapusPerangkat(id, redirectAfter);
  }

  const modal = (
    <div
      className="modal-overlay"
      onClick={() => !loading && setOpen(false)}
      style={{ position: 'fixed', inset: 0, zIndex: 99999 }}
    >
      <div className="modal-box modal-box-sm" onClick={(e) => e.stopPropagation()}>
        <div className="hapus-icon-wrap">
          <FaExclamationTriangle className="text-rose-500 text-3xl" />
        </div>
        <h2 className="text-lg font-extrabold text-gray-800 text-center mt-3">Hapus Perangkat?</h2>
        <p className="text-sm text-gray-500 text-center mt-1 mb-6">
          Data <span className="font-bold text-gray-700">{nama}</span> akan dihapus permanen.
        </p>
        <div className="modal-footer justify-center">
          <button onClick={() => setOpen(false)} disabled={loading} className="btn-secondary">Batal</button>
          <button onClick={handleHapus} disabled={loading} className="btn-danger flex items-center gap-2">
            {loading ? <><span className="upload-spinner" /> Menghapus…</> : 'Ya, Hapus'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-action bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
      >
        <FaTrash className="text-xs" /> Hapus
      </button>
      {mounted && open && createPortal(modal, document.body)}
    </>
  );
}
