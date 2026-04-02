import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaLayerGroup, FaHome, FaUsers, FaCog } from "react-icons/fa";
import EditForm from "./EditForm";
import LogoutButton from '@/components/LogoutButton';
import ProfileModal from '@/components/ProfileModal';

export default async function EditPotensi({ params }: { params: { id: string } }) {

  const potensi = await prisma.potensi.findUnique({
    where: { id: Number(params.id) }
  });

  if (!potensi) notFound();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* Sidebar */}
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
          <div className="text-indigo-400 text-xs font-semibold uppercase tracking-widest px-3 mb-3">
            Menu Utama
          </div>
          {[
            { icon: FaHome,   label: "Dashboard", href: "/admin" },
            { icon: FaLayerGroup, label: "Potensi", href: "/admin/potensi" },
            { icon: FaUsers,  label: "Users",     href: "/admin/users" },
            { icon: FaCog,    label: "Settings",  href: "/admin/settings" },
          ].map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className={`sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-indigo-200 hover:text-white ${label === "Potensi" ? "active text-white" : ""}`}
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
      <div className="flex-1 flex flex-col min-w-0">
        <header className="glass-header z-20 flex-shrink-0 px-8 py-4 flex justify-between items-center">
          <div>
            <div className="text-xs text-indigo-400 font-semibold uppercase tracking-widest">
              Potensi
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              Edit Potensi
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
          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-6">
            <Link href="/admin/potensi" className="hover:text-indigo-500 transition-colors">Potensi</Link>
            <span>/</span>
            <span className="text-gray-600">Edit</span>
          </div>

          <EditForm potensi={potensi} />
        </main>
      </div>

    </div>
  );
}