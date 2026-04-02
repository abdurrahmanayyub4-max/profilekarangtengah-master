"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Mail,
  Phone,
  Leaf,
  Heart,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 text-white relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.png"
                alt="Logo Padukuhan"
                width={50}
                height={50}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-2"
              />
              <div>
                <h3 className="text-2xl font-bold">Padukuhan Karangtengah</h3>
                <p className="text-green-200 text-sm flex items-center gap-1">
                  <Leaf size={12} />
                  Dadapayu, Semanu, Gunungkidul
                </p>
              </div>
            </div>
            <p className="text-green-100 leading-relaxed mb-6">
              Desa yang harmonis dengan alam, kaya akan tradisi dan budaya,
              serta penuh potensi untuk masa depan yang berkelanjutan. Mari
              bersama membangun padukuhan yang lebih maju dan sejahtera.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <div className="h-1 w-8 bg-green-400 rounded-full"></div>
              Menu
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Profil Padukuhan", href: "/" },
                { label: "Pemerintahan", href: "/pemerintahan" },
                { label: "Potensi", href: "/potensi" },
                { label: "Fasilitas", href: "/fasilitas" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-green-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-green-400 rounded-full group-hover:w-2 transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <div className="h-1 w-8 bg-green-400 rounded-full"></div>
              Kontak
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-white/10 p-2 rounded-lg flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="text-sm text-green-100">
                  <p className="font-semibold text-white mb-1">Alamat</p>
                  WPQ4+RP2, Karang Tengah, RT.1/RW.5
                  <br />
                  Dadapayu, Semanu, Gunungkidul, Yogyakarta 55123
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-green-100 text-sm text-center md:text-left">
              © {currentYear} Padukuhan Karangtengah. All rights reserved.
            </p>
            <p className="text-green-100 text-sm flex items-center gap-2">
              Dibuat dengan{" "}
              <Heart size={16} className="text-red-400" fill="currentColor" />
              untuk masyarakat Karangtengah
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
