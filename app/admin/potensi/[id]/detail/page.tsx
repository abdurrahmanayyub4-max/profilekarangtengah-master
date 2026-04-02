import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  FaArrowLeft,
  FaEdit,
  FaLayerGroup,
  FaHome,
  FaUsers,
  FaCog,
  FaTag,
  FaImage,
  FaIdBadge
} from 'react-icons/fa'
import HapusButton from '../../HapusButton'
import LogoutButton from '@/components/LogoutButton';
import ProfileModal from '@/components/ProfileModal';

export default async function DetailPotensi({ params }: { params: { id: string } }) {
  const potensi = await prisma.potensi.findUnique({
    where: { id: Number(params.id) }
  })

  if (!potensi) notFound()

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
              <div className="text-white font-bold text-base tracking-wide leading-tight">
                AdminPanel
              </div>
              <div className="text-indigo-300 text-xs font-medium">v2.0</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <div className="text-indigo-400 text-xs font-semibold uppercase tracking-widest px-3 mb-3">
            Menu Utama
          </div>

          {[
            { icon: FaHome, label: 'Dashboard', href: '/admin' },
            { icon: FaUsers, label: 'Potensi Padukuhan', href: '/admin/potensi' },
            { icon: FaLayerGroup, label: 'Fasilitas', href: '/admin/fasilitas' },
            { icon: FaCog, label: 'Settings', href: '/admin/settings' }
          ].map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className={`sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-indigo-200 hover:text-white ${
                label === 'Potensi Padukuhan' ? 'active text-white' : ''
              }`}
            >
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
            <div className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mb-0.5">
              Potensi
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Detail Potensi
            </h1>
          </div>

          <Link
            href="/admin/potensi"
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600"
          >
            <FaArrowLeft className="text-xs" /> Kembali
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-6">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-4">
            <Link href="/admin/potensi" className="hover:text-indigo-500">
              Potensi
            </Link>
            <span>/</span>
            <span className="text-gray-600">Detail</span>
          </div>

          <div className="grid grid-cols-3 gap-5">

            {/* Kolom kiri */}
            <div className="flex flex-col gap-4">

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100">
                  <span className="font-bold text-gray-700 text-sm">
                    Foto Potensi
                  </span>
                </div>

                <div className="p-4 flex flex-col items-center gap-3">
                  <img
                    src={potensi.image}
                    alt={potensi.judulGambar}
                    className="w-full aspect-square object-cover rounded-xl shadow-md"
                  />

                  <span className="kategori-badge">
                    {potensi.sektor}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-2">
                <span className="font-bold text-gray-700 text-sm mb-1">
                  Aksi
                </span>

                <Link
                  href={`/admin/potensi/${potensi.id}/edit`}
                  className="btn-action btn-primary w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold"
                >
                  <FaEdit className="text-xs" /> Edit Potensi
                </Link>

                <HapusButton
                  id={potensi.id}
                  nama={potensi.judulGambar}
                  redirectAfter="/admin/potensi"
                />
              </div>
            </div>

            {/* Kolom kanan */}
            <div className="col-span-2 flex flex-col gap-4">

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-3 border-b border-gray-100">
                  <span className="font-bold text-gray-700 text-sm">
                    Informasi Potensi
                  </span>
                </div>

                <div className="divide-y divide-gray-50">

                  {[
                    { icon: FaIdBadge, label: 'ID', value: potensi.id },
                    { icon: FaTag, label: 'Judul Potensi', value: potensi.judulGambar },
                    { icon: FaTag, label: 'Sektor', value: potensi.sektor },
                    { icon: FaTag, label: 'Komoditas', value: potensi.komoditas },
                    { icon: FaImage, label: 'URL Gambar', value: potensi.image }
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-4 px-6 py-3">
                      <div className="flex items-center gap-2 min-w-40">
                        <div className="w-6 h-6 rounded-md bg-indigo-50 flex items-center justify-center">
                          <Icon className="text-indigo-400 text-xs" />
                        </div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          {label}
                        </span>
                      </div>

                      <div className="text-sm font-semibold text-gray-800 break-all">
                        {String(value)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-3 border-b border-gray-100">
                  <span className="font-bold text-gray-700 text-sm">
                    Deskripsi
                  </span>
                </div>

                <div className="p-6 space-y-4 text-sm text-gray-600 leading-relaxed">
                  <p>
                    <span className="font-semibold text-gray-700">Deskripsi Gambar:</span><br/>
                    {potensi.deskripsiGambar}
                  </p>

                  <p>
                    <span className="font-semibold text-gray-700">Deskripsi Sektor:</span><br/>
                    {potensi.deskripsiSektor}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}