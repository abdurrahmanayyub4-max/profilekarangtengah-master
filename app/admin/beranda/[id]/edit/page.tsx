// app/admin/beranda/[id]/edit/page.tsx
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  FaArrowLeft, FaLayerGroup, FaHome,
  FaLandmark, FaSeedling, FaBuilding
} from 'react-icons/fa';
import EditForm from './EditForm';
import LogoutButton from '@/components/LogoutButton';
import ProfileModal from '@/components/ProfileModal';

export default async function EditBeranda({ params }: { params: { id: string } }) {
  const beranda = await prisma.beranda.findUnique({
    where: { id: Number(params.id) },
  });

  if (!beranda) notFound();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
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
      <div className="flex-1 flex flex-col min-w-0">
        <header className="glass-header z-20 flex-shrink-0 px-8 py-4 flex justify-between items-center">
          <div>
            <div className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mb-0.5">Beranda</div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Edit Beranda</h1>
          </div>
          <Link
            href="/admin/beranda"
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <FaArrowLeft className="text-xs" /> Kembali
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-6">
            <Link href="/admin/beranda" className="hover:text-indigo-500 transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-gray-600">Edit</span>
          </div>

          <EditForm beranda={beranda} />
        </main>
      </div>
    </div>
  );
}