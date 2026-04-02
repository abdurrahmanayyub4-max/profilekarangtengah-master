//app/admin/fasilitas/detail
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaEdit, FaLayerGroup, FaHome, FaUsers, FaCog, FaTag, FaImage, FaIdBadge } from 'react-icons/fa';
import HapusButton from '../../HapusButton';
import LogoutButton from '@/components/LogoutButton';
import ProfileModal from '@/components/ProfileModal';

export default async function DetailFasilitas({ params }: { params: { id: string } }) {
  const fasilitas = await prisma.fasilitas.findUnique({
    where: { id: Number(params.id) },
  });

  if (!fasilitas) notFound();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="sidebar-bg w-64 flex flex-col shadow-2xl flex-shrink-0">
        <div className="p-6 border-b border-white border-opacity-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white bg-opacity-20 flex items-center justify-center shadow">
              <FaLayerGroup className="text-white text-sm" />
            </div>
            <div>
              <div className="text-white font-bold text-base tracking-wide leading-tight">AdminPanel</div>
              <div className="text-indigo-300 text-xs font-medium">v2.0</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <div className="text-indigo-400 text-xs font-semibold uppercase tracking-widest px-3 mb-3">Menu Utama</div>
          {[
            { icon: FaHome, label: 'Dashboard', href: '/admin' },
            { icon: FaLayerGroup, label: 'Fasilitas', href: '/admin/fasilitas' },
            { icon: FaUsers, label: 'Users', href: '/admin/users' },
            { icon: FaCog, label: 'Settings', href: '/admin/settings' },
          ].map(({ icon: Icon, label, href }) => (
            <Link key={label} href={href} className={`sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-indigo-200 hover:text-white ${label === 'Fasilitas' ? 'active text-white' : ''}`}>
              <Icon className="text-base flex-shrink-0" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white border-opacity-10">
        <ProfileModal />
        <LogoutButton />
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="glass-header z-20 px-8 py-4 flex justify-between items-center flex-shrink-0">
          <div>
            <div className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mb-0.5">Fasilitas</div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Detail Fasilitas</h1>
          </div>
          <Link href="/admin/fasilitas" className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors">
            <FaArrowLeft className="text-xs" /> Kembali
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-4">
            <Link href="/admin/fasilitas" className="hover:text-indigo-500 transition-colors">
              Fasilitas
            </Link>
            <span>/</span>
            <span className="text-gray-600">Detail</span>
          </div>

          <div className="grid grid-cols-3 gap-5 h-full">
            {/* Kolom Kiri */}
            <div className="col-span-1 flex flex-col gap-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100">
                  <span className="font-bold text-gray-700 text-sm">Foto Fasilitas</span>
                </div>
                <div className="p-4 flex flex-col items-center gap-3">
                  <img src={fasilitas.image} alt={fasilitas.namaFasilitas} className="w-full aspect-square object-cover rounded-xl shadow-md" />
                  <span className="kategori-badge">{fasilitas.kategori}</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-2">
                <span className="font-bold text-gray-700 text-sm mb-1">Aksi</span>
                <Link href={`/admin/fasilitas/${fasilitas.id}/edit`} className="btn-action btn-primary w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold">
                  <FaEdit className="text-xs" /> Edit Fasilitas
                </Link>
                <HapusButton id={fasilitas.id} nama={fasilitas.namaFasilitas} redirectAfter="/admin/fasilitas" />
              </div>
            </div>

            {/* Kolom Kanan */}
            <div className="col-span-2 flex flex-col gap-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-3 border-b border-gray-100">
                  <span className="font-bold text-gray-700 text-sm">Informasi Fasilitas</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {[
                    { icon: FaIdBadge, label: 'ID', value: fasilitas.id },
                    { icon: FaTag, label: 'Nama Fasilitas', value: fasilitas.namaFasilitas },
                    { icon: FaTag, label: 'Kategori', value: fasilitas.kategori },
                    { icon: FaImage, label: 'URL Gambar', value: fasilitas.image },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-4 px-6 py-3">
                      <div className="flex items-center gap-2 min-w-40 flex-shrink-0">
                        <div className="w-6 h-6 rounded-md bg-indigo-50 flex items-center justify-center">
                          <Icon className="text-indigo-400 text-xs" />
                        </div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-800 break-all">{String(value)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1">
                <div className="px-6 py-3 border-b border-gray-100">
                  <span className="font-bold text-gray-700 text-sm">Preview Gambar</span>
                </div>
                <div className="p-4">
                  <img src={fasilitas.image} alt={fasilitas.namaFasilitas} className="w-full max-h-52 object-cover rounded-xl shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
