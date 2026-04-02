'use client';

// app/(auth)/login/page.tsx
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaLock, FaUser, FaEye, FaEyeSlash, FaLayerGroup, FaShieldAlt, FaTimes, FaCheck } from 'react-icons/fa';

// ─── Forgot Password Modal ───────────────────────────────────────────────────
function ForgotPasswordModal({ onClose }: { onClose: () => void }) {
  const [username,    setUsername]    = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showNew,     setShowNew]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');
  const [success,     setSuccess]     = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPass) {
      setError('Konfirmasi password tidak cocok.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }

    setLoading(true);
    try {
      const res  = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, newPassword }),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? 'Gagal mereset password.');
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setError('Terjadi kesalahan koneksi.');
    } finally {
      setLoading(false);
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
        style={{ maxWidth: 440 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
              <FaLock className="text-indigo-600 text-sm" />
            </div>
            <div>
              <div className="font-extrabold text-gray-800 text-base">Reset Password</div>
              <div className="text-gray-400 text-xs">Masukkan username dan password baru</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>

        {/* Success state */}
        {success ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
              <FaCheck className="text-emerald-500 text-2xl" />
            </div>
            <div className="text-center">
              <div className="font-extrabold text-gray-800 text-base mb-1">Password Berhasil Direset!</div>
              <div className="text-gray-400 text-sm">Silakan login dengan password baru Anda.</div>
            </div>
            <button
              onClick={onClose}
              className="btn-primary px-6 py-2 rounded-xl text-sm font-bold mt-2"
            >
              Kembali ke Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Username</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                  <FaUser className="text-gray-400 text-sm" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
                  placeholder="Masukkan username lama..."
                />
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
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
                  placeholder="Minimal 6 karakter..."
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors"
                >
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
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  required
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
                  placeholder="Ulangi password baru..."
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors"
                >
                  {showConfirm ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
              {/* Indikator match */}
              {confirmPass && (
                <div className={`text-xs font-semibold flex items-center gap-1 ${newPassword === confirmPass ? 'text-emerald-500' : 'text-rose-400'}`}>
                  {newPassword === confirmPass ? <FaCheck /> : <FaTimes />}
                  {newPassword === confirmPass ? 'Password cocok' : 'Password tidak cocok'}
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-semibold px-4 py-3 rounded-xl">
                <FaTimes className="flex-shrink-0 text-xs" /> {error}
              </div>
            )}

            {/* Tombol */}
            <div className="flex gap-3 mt-1">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1 py-2.5 rounded-xl text-sm font-bold"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? <><span className="upload-spinner" /> Menyimpan...</> : 'Reset Password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Login Page ──────────────────────────────────────────────────────────────
export default function LoginPage() {
  const router = useRouter();
  const [username,      setUsername]      = useState('');
  const [password,      setPassword]      = useState('');
  const [showPass,      setShowPass]      = useState(false);
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState('');
  const [showForgot,    setShowForgot]    = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('Username atau password salah.');
      setLoading(false);
      return;
    }

    router.push('/admin/beranda');
    router.refresh();
  }

  return (
    <>
      <div className="min-h-screen flex bg-gray-50">

        {/* ── Kiri: Branding Panel ── */}
        <div className="hidden lg:flex lg:w-1/2 sidebar-bg flex-col items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white opacity-5 rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white opacity-5 rounded-full" />

          <div className="relative z-10 text-center">
            <div className="w-24 h-24 rounded-3xl bg-white bg-opacity-15 flex items-center justify-center mx-auto mb-8 shadow-2xl border border-white border-opacity-20">
              <FaLayerGroup className="text-white text-4xl" />
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3">AdminPanel</h1>
            <p className="text-indigo-200 text-lg font-medium mb-2">Padukuhan Karangtengah</p>
            <div className="w-16 h-1 bg-white bg-opacity-30 rounded-full mx-auto mb-10" />
            <div className="flex flex-col gap-4 text-left">
              {[
                { icon: '🏠', text: 'Kelola data beranda & sambutan' },
                { icon: '🏛️', text: 'Manajemen pemerintahan desa' },
                { icon: '🌱', text: 'Data potensi padukuhan' },
                { icon: '🏢', text: 'Fasilitas & infrastruktur' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 bg-white bg-opacity-10 px-4 py-3 rounded-xl border border-white border-opacity-10">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-indigo-100 text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-12 text-indigo-300 text-xs text-center">
            © 2024 Padukuhan Karangtengah · All rights reserved
          </div>
        </div>

        {/* ── Kanan: Login Form ── */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
              <div className="w-10 h-10 rounded-xl sidebar-bg flex items-center justify-center shadow">
                <FaLayerGroup className="text-white text-base" />
              </div>
              <div>
                <div className="font-extrabold text-gray-800 text-lg leading-tight">AdminPanel</div>
                <div className="text-indigo-500 text-xs font-medium">Padukuhan Karangtengah</div>
              </div>
            </div>

            {/* Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

              {/* Card header */}
              <div className="px-8 pt-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <FaShieldAlt className="text-indigo-600 text-sm" />
                  </div>
                  <h2 className="text-xl font-extrabold text-gray-800">Masuk ke Panel Admin</h2>
                </div>
                <p className="text-gray-400 text-sm ml-11">Masukkan kredensial Anda untuk melanjutkan</p>
              </div>

              {/* Form */}
              <div className="px-8 py-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                  {/* Username */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Username</label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                        <FaUser className="text-gray-400 text-sm" />
                      </div>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                        autoFocus
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
                        placeholder="Masukkan username..."
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
                      <button
                        type="button"
                        onClick={() => setShowForgot(true)}
                        className="text-xs text-indigo-500 hover:text-indigo-700 font-semibold transition-colors"
                      >
                        Lupa password?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                        <FaLock className="text-gray-400 text-sm" />
                      </div>
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
                        placeholder="Masukkan password..."
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors"
                      >
                        {showPass ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                      </button>
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="flex items-center gap-2.5 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-semibold px-4 py-3 rounded-xl">
                      <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                        <FaLock className="text-xs" />
                      </div>
                      {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <><span className="upload-spinner" /> Memproses...</>
                    ) : (
                      <><FaShieldAlt className="text-sm" /> Masuk</>
                    )}
                  </button>

                </form>
              </div>

              {/* Card footer */}
              <div className="px-8 pb-6 text-center">
                <p className="text-xs text-gray-400">
                  Hubungi administrator jika mengalami kendala login
                </p>
              </div>
            </div>

            <p className="text-center text-xs text-gray-400 mt-6 lg:hidden">
              © 2024 Padukuhan Karangtengah
            </p>
          </div>
        </div>
      </div>

      {/* Modal Forgot Password */}
      {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}
    </>
  );
}
