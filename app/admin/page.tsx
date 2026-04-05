// app/admin/page.tsx
import prisma from '@/lib/prisma';
import {
  FaLayerGroup, FaHome, FaLandmark, FaSeedling,
  FaBuilding, FaBell, FaEye, FaEdit, FaTrash
} from 'react-icons/fa';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';
import ProfileModal from '@/components/ProfileModal';

// Force dynamic rendering to avoid build-time database calls
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let beranda = null;

  try {
    beranda = await prisma.beranda.findFirst();
  } catch (error) {
    console.error('Failed to fetch beranda data:', error);
  }

  const misiList = (() => {
    try {
      const arr = JSON.parse(beranda?.misiList ?? '[]');
      return Array.isArray(arr) ? arr.filter((m: string) => !!m && m.trim() !== '') : [];
    } catch {
      return [];
    }
  })();

  const rows = [
    { section: 'Kepala Dukuh', label: 'Nama Kepala',     value: beranda?.namaKepala },
    { section: 'Kepala Dukuh', label: 'Jabatan Kepala',  value: beranda?.jabatanKepala },
    { section: 'Sambutan',     label: 'Judul Sambutan',  value: beranda?.judulSambutan },
    { section: 'Sambutan',     label: 'Isi Sambutan',    value: beranda?.isiSambutan, isHtml: true },
    { section: 'Profil',       label: 'Judul Deskripsi', value: beranda?.judulDeskripsi },
    { section: 'Profil',       label: 'Deskripsi 1',     value: beranda?.deskripsi1 },
    { section: 'Profil',       label: 'Deskripsi 2',     value: beranda?.deskripsi2 },
    { section: 'Profil',       label: 'Deskripsi 3',     value: beranda?.deskripsi3 },
    { section: 'Profil',       label: 'Deskripsi 4',     value: beranda?.deskripsi4 },
    { section: 'Profil',       label: 'Deskripsi 5',     value: beranda?.deskripsi5 },
    { section: 'Statistik',    label: 'Jumlah Penduduk', value: beranda?.jumlahPenduduk },
    { section: 'Statistik',    label: 'Satuan Penduduk', value: beranda?.satuanPenduduk },
    { section: 'Statistik',    label: 'Jumlah RT',       value: beranda?.jumlahRT },
    { section: 'Statistik',    label: 'Label RT',        value: beranda?.labelRT },
    { section: 'Statistik',    label: 'Jumlah RW',       value: beranda?.jumlahRW },
    { section: 'Statistik',    label: 'Label RW',        value: beranda?.labelRW },
    { section: 'Potensi',      label: 'Judul Pertanian', value: beranda?.judulPertanian },
    { section: 'Potensi',      label: 'Isi Pertanian',   value: beranda?.isiPertanian },
    { section: 'Potensi',      label: 'Judul Peternakan',value: beranda?.judulPeternakan },
    { section: 'Potensi',      label: 'Isi Peternakan',  value: beranda?.isiPeternakan },
    { section: 'Visi Misi',    label: 'Judul Visi Misi', value: beranda?.judulVisiMisi },
    { section: 'Visi Misi',    label: 'Judul Visi',      value: beranda?.judulVisi },
    { section: 'Visi Misi',    label: 'Isi Visi',        value: beranda?.isiVisi },
    ...misiList.map((misi: string, idx: number) => ({
    section: 'Visi Misi',
    label:   `Misi ${idx + 1}`,
    value:   misi,
  })),
    { section: 'Lokasi',       label: 'Alamat',          value: beranda?.alamat },
    { section: 'Lokasi',       label: 'Link Maps',       value: beranda?.mapLink },
  ];

  const sectionColors: Record<string, string> = {
    'Kepala Dukuh': 'bg-indigo-100 text-indigo-700',
    'Sambutan':     'bg-emerald-100 text-emerald-700',
    'Profil':       'bg-blue-100 text-blue-700',
    'Statistik':    'bg-amber-100 text-amber-700',
    'Potensi':      'bg-lime-100 text-lime-700',
    'Visi Misi':    'bg-violet-100 text-violet-700',
    'Lokasi':       'bg-rose-100 text-rose-700',
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ── Sidebar ─────────────────────────────────── */}
      <aside className="sidebar-bg w-64 flex flex-col shadow-2xl">
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
      <div className="flex-1 flex flex-col min-w-0">
        <header className="glass-header sticky top-0 z-20 px-8 py-4 flex justify-between items-center">
          <div>
            <div className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mb-0.5">Manajemen</div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Kelola Beranda</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="w-10 h-10 bg-gray-100 hover:bg-indigo-50 rounded-xl flex items-center justify-center transition-colors">
                <FaBell className="text-gray-500 text-sm" />
              </button>
              <span className="notif-dot absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </div>
          </div>
        </header>

        <main className="p-8 flex-1">
          {/* Stat Cards */}
          <div className="grid grid-cols-3 gap-5 mb-8">
            {[
              { label: 'Total Field',    value: rows.length,                color: 'from-indigo-500 to-violet-500', textC: 'text-indigo-600' },
              { label: 'Total Penduduk', value: beranda?.jumlahPenduduk ?? '-', color: 'from-emerald-500 to-teal-500',  textC: 'text-emerald-600' },
              { label: 'Total Seksi',    value: Object.keys(sectionColors).length, color: 'from-amber-500 to-orange-400', textC: 'text-amber-600' },
            ].map((stat) => (
              <div key={stat.label} className="stat-card rounded-2xl bg-white p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-xl">{stat.value}</span>
                </div>
                <div>
                  <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</div>
                  <div className={`text-2xl font-extrabold ${stat.textC}`}>{stat.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <span className="font-bold text-gray-700 text-base">Data Beranda</span>
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full font-semibold">{rows.length} field</span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">No</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Seksi</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Nama Field</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Nilai</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {rows.map((row, idx) => (
                    <tr key={`${row.section}-${idx}`} className="table-row animate-row" style={{ animationDelay: `${idx * 30}ms` }}>
                      <td className="px-6 py-4">
                        <span className="row-number">{String(idx + 1).padStart(2, '0')}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`kategori-badge ${sectionColors[row.section] ?? ''}`}>
                          {row.section}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-800 text-sm">{row.label}</div>
                      </td>
                      <td className="px-6 py-4 max-w-sm">
                        {row.isHtml ? (
                          <div
                            className="text-sm text-gray-600 line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: row.value ?? '' }}
                          />
                        ) : (
                          <div className="text-sm text-gray-600 line-clamp-2 break-all">
                            {row.value ?? <span className="text-gray-300 italic">— kosong —</span>}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link href={`/admin/beranda/detail/${idx}`} className="btn-action bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
                            <FaEye className="text-xs" /> Detail
                          </Link>
                          <Link href={`/admin/beranda/${beranda?.id}/edit`} className="btn-action bg-amber-400 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
                            <FaEdit className="text-xs" /> Edit
                          </Link>
                          <button className="btn-action bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
                            <FaTrash className="text-xs" /> Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}