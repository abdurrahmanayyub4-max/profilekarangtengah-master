// app/admin/pemerintahan/[id]/detail/page.tsx
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  FaArrowLeft, FaEdit, FaLayerGroup, FaHome, FaLandmark,
  FaSeedling, FaBuilding, FaAlignLeft, FaBullseye, FaUsers
} from 'react-icons/fa';
import HapusButton from '../../HapusButton';
import LogoutButton from '@/components/LogoutButton';
import ProfileModal from '@/components/ProfileModal';


export default async function DetailPemerintahan({ params }: { params: { id: string } }) {
  const pemerintahan = await prisma.pemerintahan.findUnique({
    where: { id: Number(params.id) },
  });
  const perangkat = await prisma.perangkatDesa.findMany();

  if (!pemerintahan) notFound();

  const sections = [
    {
      title: 'Informasi Umum',
      color: 'bg-indigo-50',
      iconColor: 'text-indigo-400',
      fields: [
        { icon: FaAlignLeft, label: 'Judul',     value: pemerintahan.judul },
        { icon: FaAlignLeft, label: 'Deskripsi', value: pemerintahan.deskripsi },
      ],
    },
    {
      title: 'Deskripsi Padukuhan',
      color: 'bg-emerald-50',
      iconColor: 'text-emerald-400',
      fields: [
        { icon: FaAlignLeft, label: 'Judul Deskripsi', value: pemerintahan.judulDeskripsi },
        { icon: FaAlignLeft, label: 'Isi Deskripsi',   value: pemerintahan.isiDeskripsi },
      ],
    },
    {
      title: 'Visi & Misi',
      color: 'bg-violet-50',
      iconColor: 'text-violet-400',
      fields: [
        { icon: FaBullseye,  label: 'Judul Visi Misi', value: pemerintahan.judulVisiMisi },
        { icon: FaBullseye,  label: 'Visi',            value: pemerintahan.visi },
      ],
    },
    {
      title: 'Struktur Organisasi',
      color: 'bg-blue-50',
      iconColor: 'text-blue-400',
      fields: [
        { icon: FaAlignLeft, label: 'Deskripsi Struktur', value: pemerintahan.deskripsiStruktur },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ── Sidebar ── */}
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
            { icon: FaHome,     label: 'Dashboard',           href: '/admin' },
            { icon: FaLandmark, label: 'Pemerintahan',        href: '/admin/pemerintahan' },
            { icon: FaSeedling, label: 'Potensi Padukuhan',   href: '/admin/potensi' },
            { icon: FaBuilding, label: 'Fasilitas Padukuhan', href: '/admin/fasilitas' },
          ].map(({ icon: Icon, label, href }) => (
            <Link key={label} href={href} className={`sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-indigo-200 hover:text-white ${label === 'Pemerintahan' ? 'active text-white' : ''}`}>
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

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="glass-header z-20 px-8 py-4 flex justify-between items-center flex-shrink-0">
          <div>
            <div className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mb-0.5">Pemerintahan</div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Detail Pemerintahan</h1>
          </div>
          <Link href="/admin/pemerintahan" className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors">
            <FaArrowLeft className="text-xs" /> Kembali
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-4">
            <Link href="/admin/pemerintahan" className="hover:text-indigo-500 transition-colors">Pemerintahan</Link>
            <span>/</span>
            <span className="text-gray-600">Detail</span>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {/* ── Kolom Kiri ── */}
            <div className="col-span-1 flex flex-col gap-4">

              {/* Summary Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100">
                  <span className="font-bold text-gray-700 text-sm">Ringkasan</span>
                </div>
                <div className="p-5 flex flex-col items-center gap-3 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-400 flex items-center justify-center shadow-lg">
                    <FaLandmark className="text-white text-3xl" />
                  </div>
                  <div>
                    <div className="font-extrabold text-gray-800 text-base">{pemerintahan.judul ?? '-'}</div>
                    <div className="text-sm text-indigo-600 font-semibold mt-0.5">{perangkat.length} Perangkat Desa</div>
                  </div>
                </div>
              </div>

              {/* Perangkat Desa Summary */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                  <span className="font-bold text-gray-700 text-sm">Perangkat Desa</span>
                  <span className="text-xs bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full">{perangkat.length}</span>
                </div>
                <div className="p-4 flex flex-col gap-2 max-h-64 overflow-y-auto">
                  {perangkat.length > 0 ? perangkat.map((p) => (
                    <div key={p.id} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <FaUsers className="text-indigo-500 text-xs" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-gray-700 truncate">{p.nama}</div>
                        <div className="text-xs text-gray-400 truncate">{p.jabatan}</div>
                      </div>
                    </div>
                  )) : (
                    <p className="text-xs text-gray-300 italic text-center py-2">Belum ada perangkat</p>
                  )}
                </div>
              </div>

              {/* Aksi */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-2">
                <span className="font-bold text-gray-700 text-sm mb-1">Aksi</span>
                <Link
                  href={`/admin/pemerintahan/${pemerintahan.id}/edit`}
                  className="btn-action btn-primary w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold bg-indigo-500 text-white"
                >
                  <FaEdit className="text-xs" /> Edit Pemerintahan
                </Link>
                <HapusButton id={pemerintahan.id} nama={pemerintahan.judul ?? 'Data Pemerintahan'} redirectAfter="/admin/pemerintahan" />
              </div>
            </div>

            {/* ── Kolom Kanan ── */}
            <div className="col-span-2 flex flex-col gap-4">
              {sections.map((section) => (
                <div key={section.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-3 border-b border-gray-100 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${section.color.replace('-50', '-400')}`} />
                    <span className="font-bold text-gray-700 text-sm">{section.title}</span>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {section.fields.map(({ icon: Icon, label, value }: any) => (
                      <div key={label} className="flex items-start gap-4 px-6 py-3">
                        <div className="flex items-center gap-2 min-w-44 flex-shrink-0 pt-0.5">
                          <div className={`w-6 h-6 rounded-md ${section.color} flex items-center justify-center`}>
                            <Icon className={`${section.iconColor} text-xs`} />
                          </div>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-800 whitespace-pre-line break-words">
                          {value ?? <span className="text-gray-300 italic font-normal">— kosong —</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
