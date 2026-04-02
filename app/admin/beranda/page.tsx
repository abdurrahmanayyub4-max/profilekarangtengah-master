// app/admin/beranda/page.tsx
import { Beranda } from "@prisma/client";
import prisma from '@/lib/prisma';
import {
  FaLayerGroup, FaHome, FaLandmark, FaSeedling,
  FaBuilding, FaBell, FaEye, FaEdit
} from 'react-icons/fa';
import Link from 'next/link';
import HapusButton from './HapusButton';
import LogoutButton from '@/components/LogoutButton';
import ProfileModal from '@/components/ProfileModal';

export default async function AdminDashboard() {
  const berandaList: Beranda[] = await prisma.beranda.findMany();

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
              { label: 'Total Data',     value: berandaList.length,                                                            color: 'from-indigo-500 to-violet-500', textC: 'text-indigo-600' },
              { label: 'Total Penduduk', value: berandaList[0]?.jumlahPenduduk ?? '-',                                        color: 'from-emerald-500 to-teal-500',  textC: 'text-emerald-600' },
              { label: 'RT / RW',        value: `${berandaList[0]?.jumlahRT ?? '-'} / ${berandaList[0]?.jumlahRW ?? '-'}`,    color: 'from-amber-500 to-orange-400',  textC: 'text-amber-600' },
            ].map((stat) => (
              <div key={stat.label} className="stat-card rounded-2xl bg-white p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-sm text-center leading-tight px-1">{stat.value}</span>
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
              <span className="font-bold text-gray-700 text-base">Daftar Beranda</span>
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full font-semibold">{berandaList.length} data</span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-indigo-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">No</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Kepala Dukuh</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Jabatan</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Jumlah Penduduk</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Alamat</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {berandaList.map((b, idx) => (
                    <tr key={b.id} className="table-row animate-row" style={{ animationDelay: `${idx * 50}ms` }}>
                      <td className="px-6 py-4">
                        <span className="row-number">{String(idx + 1).padStart(2, '0')}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-800 text-sm">{b.namaKepala ?? '-'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="kategori-badge">{b.jabatanKepala ?? '-'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700 font-semibold">
                          {b.jumlahPenduduk ?? '-'}{' '}
                          <span className="text-gray-400 font-normal text-xs">{b.satuanPenduduk}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className="text-sm text-gray-600 line-clamp-1">{b.alamat ?? '-'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/beranda/${b.id}/detail`}
                            className="btn-action bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
                          >
                            <FaEye className="text-xs" /> Detail
                          </Link>
                          <Link
                            href={`/admin/beranda/${b.id}/edit`}
                            className="btn-action bg-amber-400 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
                          >
                            <FaEdit className="text-xs" /> Edit
                          </Link>
                          <HapusButton id={b.id} nama={b.namaKepala ?? 'Data Beranda'} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {berandaList.length === 0 && (
                <div className="py-16 text-center text-gray-300 font-semibold">Belum ada data beranda.</div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}