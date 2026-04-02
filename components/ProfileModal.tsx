'use client';

// components/ProfileModal.tsx
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSession, signOut } from 'next-auth/react';
import {
  FaUser, FaLock, FaEye, FaEyeSlash,
  FaTimes, FaCheck, FaExclamationTriangle
} from 'react-icons/fa';
import AvatarInitial from '@/components/AvatarInitial';
type Tab = 'username' | 'password';

function ModalContent({ onClose }: { onClose: () => void }) {
  const { data: session } = useSession();
  const [tab, setTab] = useState<Tab>('username');

  // Username state
  const [newUsername,     setNewUsername]     = useState('');
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameError,   setUsernameError]   = useState('');
  const [usernameSuccess, setUsernameSuccess] = useState(false);

  // Password state
  const [oldPassword,     setOldPassword]     = useState('');
  const [newPassword,     setNewPassword]     = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld,         setShowOld]         = useState(false);
  const [showNew,         setShowNew]         = useState(false);
  const [showConfirm,     setShowConfirm]     = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError,   setPasswordError]   = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const currentUsername = (session?.user as any)?.username ?? 'admin';
  const currentName     = session?.user?.name ?? 'Admin';

  // Submit ubah username
  async function handleUsernameSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUsernameError('');
    setUsernameSuccess(false);

    if (!newUsername.trim()) {
      setUsernameError('Username baru tidak boleh kosong.');
      return;
    }
    if (newUsername.trim() === currentUsername) {
      setUsernameError('Username baru sama dengan username lama.');
      return;
    }

    setUsernameLoading(true);
    try {
      const res  = await fetch('/api/auth/update-profile', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          type:        'username',
          oldUsername: currentUsername,
          newUsername: newUsername.trim(),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setUsernameError(json.error ?? 'Gagal mengubah username.');
        return;
      }
      setUsernameSuccess(true);
      // Auto logout setelah 1.5 detik agar re-login dengan username baru
      setTimeout(() => signOut({ callbackUrl: '/login' }), 1500);
    } catch {
      setUsernameError('Terjadi kesalahan koneksi.');
    } finally {
      setUsernameLoading(false);
    }
  }

  // Submit ubah password
  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (newPassword !== confirmPassword) {
      setPasswordError('Konfirmasi password tidak cocok.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Password baru minimal 6 karakter.');
      return;
    }

    setPasswordLoading(true);
    try {
      const res  = await fetch('/api/auth/update-profile', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          type:        'password',
          username:    currentUsername,
          oldPassword,
          newPassword,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setPasswordError(json.error ?? 'Gagal mengubah password.');
        return;
      }
      setPasswordSuccess(true);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      // Auto logout setelah 1.5 detik agar re-login dengan password baru
      setTimeout(() => signOut({ callbackUrl: '/login' }), 1500);
    } catch {
      setPasswordError('Terjadi kesalahan koneksi.');
    } finally {
      setPasswordLoading(false);
    }
  }

  return (
    <div
      className="modal-overlay"
      style={{ position: 'fixed', inset: 0, zIndex: 99999 }}
      onClick={onClose}
    >
      <div
        className="modal-box"
        style={{ maxWidth: 460, width: '100%' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
          <AvatarInitial name={currentUsername} size="md" />
            <div>
              <div className="font-extrabold text-gray-800 text-base">{currentName}</div>
              <div className="text-gray-400 text-xs">@{currentUsername}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-5">
          {(['username', 'password'] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                tab === t
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t === 'username' ? '👤 Ubah Username' : '🔒 Ubah Password'}
            </button>
          ))}
        </div>

        {/* ── Tab Username ── */}
        {tab === 'username' && (
          <form onSubmit={handleUsernameSubmit} className="flex flex-col gap-4">
            <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700 font-medium flex items-center gap-2">
              <FaExclamationTriangle className="flex-shrink-0" />
              Setelah mengubah username, Anda akan otomatis logout dan perlu login ulang.
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Username Baru</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                  <FaUser className="text-gray-400 text-sm" />
                </div>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  required
                  disabled={usernameSuccess}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all disabled:opacity-50"
                  placeholder={`Username saat ini: ${currentUsername}`}
                />
              </div>
            </div>

            {usernameError && (
              <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-semibold px-4 py-3 rounded-xl">
                <FaTimes className="flex-shrink-0 text-xs" /> {usernameError}
              </div>
            )}

            {usernameSuccess && (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-semibold px-4 py-3 rounded-xl">
                <FaCheck className="flex-shrink-0 text-xs" /> Username berhasil diubah! Mengalihkan ke halaman login...
              </div>
            )}

            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="btn-secondary flex-1 py-2.5 rounded-xl text-sm font-bold">
                Batal
              </button>
              <button
                type="submit"
                disabled={usernameLoading || usernameSuccess}
                className="btn-primary flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {usernameLoading ? <><span className="upload-spinner" /> Menyimpan...</> : 'Simpan Username'}
              </button>
            </div>
          </form>
        )}

        {/* ── Tab Password ── */}
        {tab === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
            <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700 font-medium flex items-center gap-2">
              <FaExclamationTriangle className="flex-shrink-0" />
              Setelah mengubah password, Anda akan otomatis logout dan perlu login ulang.
            </div>

            {/* Password Lama */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password Lama</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                  <FaLock className="text-gray-400 text-sm" />
                </div>
                <input
                  type={showOld ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  disabled={passwordSuccess}
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all disabled:opacity-50"
                  placeholder="Masukkan password lama..."
                />
                <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500">
                  {showOld ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
            </div>

            {/* Password Baru */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password Baru</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                  <FaLock className="text-gray-400 text-sm" />
                </div>
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={passwordSuccess}
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all disabled:opacity-50"
                  placeholder="Minimal 6 karakter..."
                />
                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500">
                  {showNew ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
            </div>

            {/* Konfirmasi Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Konfirmasi Password Baru</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                  <FaLock className="text-gray-400 text-sm" />
                </div>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={passwordSuccess}
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all disabled:opacity-50"
                  placeholder="Ulangi password baru..."
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500">
                  {showConfirm ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
              {confirmPassword && (
                <div className={`text-xs font-semibold flex items-center gap-1 ${newPassword === confirmPassword ? 'text-emerald-500' : 'text-rose-400'}`}>
                  {newPassword === confirmPassword ? <FaCheck /> : <FaTimes />}
                  {newPassword === confirmPassword ? 'Password cocok' : 'Password tidak cocok'}
                </div>
              )}
            </div>

            {passwordError && (
              <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-semibold px-4 py-3 rounded-xl">
                <FaTimes className="flex-shrink-0 text-xs" /> {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-semibold px-4 py-3 rounded-xl">
                <FaCheck className="flex-shrink-0 text-xs" /> Password berhasil diubah! Mengalihkan ke halaman login...
              </div>
            )}

            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="btn-secondary flex-1 py-2.5 rounded-xl text-sm font-bold">
                Batal
              </button>
              <button
                type="submit"
                disabled={passwordLoading || passwordSuccess}
                className="btn-primary flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {passwordLoading ? <><span className="upload-spinner" /> Menyimpan...</> : 'Simpan Password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function ProfileModal() {
  const { data: session } = useSession();
  const [open,    setOpen]    = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const currentUsername = (session?.user as any)?.username ?? 'admin';
  const currentName     = session?.user?.name ?? 'Admin';

  return (
    <>
      {/* Avatar button — ganti bagian bawah sidebar dengan ini */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 px-3 mb-3 w-full hover:opacity-80 transition-opacity cursor-pointer"
      >
        <div className="avatar-ring">
        <AvatarInitial name={currentUsername} size="sm" />
        </div>
        <div className="text-left min-w-0">
          <div className="text-white text-sm font-semibold truncate">{currentName}</div>
          <div className="text-indigo-300 text-xs truncate">@{currentUsername}</div>
        </div>
      </button>

      {mounted && open && createPortal(
        <ModalContent onClose={() => setOpen(false)} />,
        document.body
      )}
    </>
  );
}
