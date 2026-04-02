'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Home, MapPin, Users, Briefcase, Mail, Menu, X, Building2 } from 'lucide-react'
import type { MenuItem } from '@/types'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const menuItems: MenuItem[] = [
    { href: '/user', label: 'Profil Padukuhan', icon: Home },
    { href: '/user/pemerintahan', label: 'Pemerintahan', icon: Users },
    { href: '/user/potensi', label: 'Potensi Padukuhan', icon: Briefcase },
    { href: '/user/fasilitas', label: 'Fasilitas', icon: Building2 },
  ]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/logo.png"
                alt="Logo Padukuhan KarangTengah"
                width={40}
                height={40}
                className="mr-3"
              />
              <h1 className="text-xl font-bold text-green-700">
                {" "}
                Padukuhan Karangtengah
              </h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-green-700 text-white"
                      : "text-gray-700 hover:bg-green-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-green-100"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-green-700 text-white"
                      : "text-gray-700 hover:bg-green-100"
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}