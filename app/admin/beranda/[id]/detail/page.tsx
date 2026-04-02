// app/admin/beranda/[id]/detail/page.tsx
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  FaArrowLeft, FaEdit, FaLayerGroup, FaHome, FaLandmark,
  FaSeedling, FaBuilding, FaUser, FaBriefcase, FaAlignLeft,
  FaMapMarkerAlt, FaLink, FaUsers, FaHashtag, FaBullseye, FaLeaf
} from 'react-icons/fa';
import HapusButton from '../../HapusButton';
import LogoutButton from '@/components/LogoutButton';
import ProfileModal from '@/components/ProfileModal';


export default async function DetailBeranda({ params }: { params: { id: string } }) {
  const beranda = await prisma.beranda.findUnique({
    where: { id: Number(params.id) },
  });

  if (!beranda) notFound();

  // ── Parse misiList dari JSON string ─────────────────────────────────────
  const misiList = (() => {
    try {
      const arr = JSON.parse(beranda.misiList ?? '[]');
      return Array.isArray(arr) ? arr.filter((m: string) => !!m && m.trim() !== '') : [];
    } catch {
      return [];
    }
  })();

  const sections = [
    {
      title: 'Kepala Dukuh',
      color: 'bg-indigo-50',
      iconColor: 'text-indigo-400',
      fields: [
        { icon: FaUser,      label: 'Nama Kepala',    value: beranda.namaKepala },
        { icon: FaBriefcase, label: 'Jabatan Kepala', value: beranda.jabatanKepala },
      ],
    },
    {
      title: 'Sambutan',
      color: 'bg-emerald-50',
      iconColor: 'text-emerald-400',
      fields: [
        { icon: FaAlignLeft, label: 'Judul Sambutan', value: beranda.judulSambutan },
        { icon: FaAlignLeft, label: 'Isi Sambutan',   value: beranda.isiSambutan, isHtml: true },
      ],
    },
    {
      title: 'Profil Padukuhan',
      color: 'bg-blue-50',
      iconColor: 'text-blue-400',
      fields: [
        { icon: FaAlignLeft, label: 'Judul Deskripsi', value: beranda.judulDeskripsi },
        { icon: FaAlignLeft, label: 'Deskripsi 1',     value: beranda.deskripsi1, isHtml: true },
        { icon: FaAlignLeft, label: 'Deskripsi 2',     value: beranda.deskripsi2, isHtml: true },
        { icon: FaAlignLeft, label: 'Deskripsi 3',     value: beranda.deskripsi3, isHtml: true },
        { icon: FaAlignLeft, label: 'Deskripsi 4',     value: beranda.deskripsi4, isHtml: true },
        { icon: FaAlignLeft, label: 'Deskripsi 5',     value: beranda.deskripsi5, isHtml: true },
      ],
    },
    {
      title: 'Statistik',
      color: 'bg-amber-50',
      iconColor: 'text-amber-400',
      fields: [
        { icon: FaUsers,     label: 'Jumlah Penduduk', value: beranda.jumlahPenduduk },
        { icon: FaAlignLeft, label: 'Satuan Penduduk', value: beranda.satuanPenduduk },
        { icon: FaHashtag,   label: 'Jumlah RT',       value: beranda.jumlahRT },
        { icon: FaAlignLeft, label: 'Label RT',         value: beranda.labelRT },
        { icon: FaHashtag,   label: 'Jumlah RW',       value: beranda.jumlahRW },
        { icon: FaAlignLeft, label: 'Label RW',         value: beranda.labelRW },
      ],
    },
    {
      title: 'Potensi',
      color: 'bg-lime-50',
      iconColor: 'text-lime-500',
      fields: [
        { icon: FaLeaf,      label: 'Judul Pertanian',  value: beranda.judulPertanian },
        { icon: FaAlignLeft, label: 'Isi Pertanian',    value: beranda.isiPertanian, isHtml: true },
        { icon: FaLeaf,      label: 'Judul Peternakan', value: beranda.judulPeternakan },
        { icon: FaAlignLeft, label: 'Isi Peternakan',   value: beranda.isiPeternakan, isHtml: true },
      ],
    },
    {
      title: 'Visi & Misi',
      color: 'bg-violet-50',
      iconColor: 'text-violet-400',
      fields: [
        { icon: FaBullseye,  label: 'Judul Visi Misi', value: beranda.judulVisiMisi },
        { icon: FaBullseye,  label: 'Judul Visi',      value: beranda.judulVisi },
        { icon: FaAlignLeft, label: 'Isi Visi',        value: beranda.isiVisi, isHtml: true },
        // Misi dinamis dari misiList — tidak terbatas 5
        ...misiList.map((misi: string, idx: number) => ({
          icon: FaAlignLeft,
          label: `Misi ${idx + 1}`,
          value: misi,
        })),
      ],
    },
    {
      title: 'Lokasi',
      color: 'bg-rose-50',
      iconColor: 'text-rose-400',
      fields: [
        { icon: FaMapMarkerAlt, label: 'Alamat',    value: beranda.alamat },
        { icon: FaLink,         label: 'Link Maps', value: beranda.mapLink },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ── Sidebar ─────────────────────────────────── */}
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
            <Link
              key={label}
              href={href}
              className={`sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-indigo-200 hover:text-white ${label === 'Dashboard' ? 'active text-white' : ''}`}
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

      {/* ── Main ────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="glass-header z-20 px-8 py-4 flex justify-between items-center flex-shrink-0">
          <div>
            <div className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mb-0.5">Beranda</div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Detail Beranda</h1>
          </div>
          <Link href="/admin/beranda" className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors">
            <FaArrowLeft className="text-xs" /> Kembali
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-4">
            <Link href="/admin" className="hover:text-indigo-500 transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-gray-600">Detail Beranda</span>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {/* ── Kolom Kiri ── */}
            <div className="col-span-1 flex flex-col gap-4">

              {/* Kepala Dukuh Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100">
                  <span className="font-bold text-gray-700 text-sm">Kepala Dukuh</span>
                </div>
                <div className="p-5 flex flex-col items-center gap-3 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center shadow-lg">
                    <FaUsers className="text-white text-3xl" />
                  </div>
                  <div>
                    <div className="font-extrabold text-gray-800 text-base">{beranda.namaKepala}</div>
                    <div className="text-sm text-green-600 font-semibold mt-0.5">{beranda.jabatanKepala}</div>
                  </div>
                </div>
              </div>

              {/* Statistik Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100">
                  <span className="font-bold text-gray-700 text-sm">Statistik Warga</span>
                </div>
                <div className="p-4 grid grid-cols-3 gap-3">
                  {[
                    { label: beranda.satuanPenduduk ?? 'Penduduk', value: beranda.jumlahPenduduk },
                    { label: beranda.labelRT ?? 'RT',              value: beranda.jumlahRT },
                    { label: beranda.labelRW ?? 'RW',              value: beranda.jumlahRW },
                  ].map((s) => (
                    <div key={s.label} className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
                      <div className="text-xl font-extrabold text-green-700">{s.value}</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-tight">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Misi Summary Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100">
                  <span className="font-bold text-gray-700 text-sm">Ringkasan Misi</span>
                </div>
                <div className="p-4">
                  {misiList.length > 0 ? (
                    <ul className="space-y-2">
                      {misiList.map((misi: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-violet-100 text-violet-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-xs text-gray-600 leading-relaxed">{misi}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-gray-300 italic text-center py-2">Belum ada misi</p>
                  )}
                </div>
              </div>

              {/* Aksi */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-2">
                <span className="font-bold text-gray-700 text-sm mb-1">Aksi</span>
                <Link
                  href={`/admin/beranda/${beranda.id}/edit`}
                  className="btn-action btn-primary w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold bg-indigo-500 text-white"
                >
                  <FaEdit className="text-xs" /> Edit Beranda
                </Link>
                <HapusButton id={beranda.id} nama="Data Beranda" redirectAfter="/admin" />
              </div>
            </div>

            {/* ── Kolom Kanan: Semua Section ── */}
            <div className="col-span-2 flex flex-col gap-4">
              {sections.map((section) => (
                <div key={section.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-3 border-b border-gray-100 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${section.color.replace('-50', '-400')}`} />
                    <span className="font-bold text-gray-700 text-sm">{section.title}</span>
                    {/* Badge jumlah misi */}
                    {section.title === 'Visi & Misi' && misiList.length > 0 && (
                      <span className="ml-auto text-xs bg-violet-100 text-violet-700 font-bold px-2 py-0.5 rounded-full">
                        {misiList.length} Misi
                      </span>
                    )}
                  </div>
                  <div className="divide-y divide-gray-50">
                    {section.fields.map(({ icon: Icon, label, value, isHtml }: any) => (
                      <div key={label} className="flex items-start gap-4 px-6 py-3">
                        <div className="flex items-center gap-2 min-w-44 flex-shrink-0 pt-0.5">
                          <div className={`w-6 h-6 rounded-md ${section.color} flex items-center justify-center`}>
                            <Icon className={`${section.iconColor} text-xs`} />
                          </div>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</span>
                        </div>
                        {isHtml ? (
                          <div
                            className="text-sm text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: value ?? '<span class="text-gray-300 italic">— kosong —</span>' }}
                          />
                        ) : (
                          <div className="text-sm font-semibold text-gray-800 break-all">
                            {value ?? <span className="text-gray-300 italic font-normal">— kosong —</span>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Peta */}
              {beranda.mapLink && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-3 border-b border-gray-100">
                    <span className="font-bold text-gray-700 text-sm">Peta Lokasi</span>
                  </div>
                  <div className="p-4">
                    <div className="relative pb-[50%] h-0 overflow-hidden rounded-xl shadow border border-gray-100">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={beranda.mapLink}
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm text-rose-600 font-semibold bg-rose-50 px-4 py-2 rounded-xl">
                      <FaMapMarkerAlt />
                      {beranda.alamat}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}