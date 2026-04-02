//app/user/fasilitas
import prisma from "@/lib/prisma";
import { Fasilitas as FasilitasType } from "@prisma/client";
import { Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Fasilitas() {

  const fasilitasData: FasilitasType[] = await prisma.fasilitas.findMany();

  return (
    <div className="bg-gradient-to-b from-white via-green-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
            <Building2 className="text-blue-700" size={20} />
            <span className="text-sm font-semibold text-blue-800">
              Fasilitas Desa
            </span>
          </div>

          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            Daftar Fasilitas Padukuhan Karangtengah
          </h1>

          <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto mb-6"></div>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          Fasilitas publik yang tersedia di Padukuhan Karangtengah untuk mendukung kehidupan berkualitas masyarakat.
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {fasilitasData.map((fasilitas) => (
            <div
              key={fasilitas.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300 group"
            >

              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <Image
                  src={fasilitas.image}
                  alt={fasilitas.namaFasilitas}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                  {fasilitas.kategori}
                </p>

                <p className="font-semibold text-gray-900 text-sm">
                  {fasilitas.namaFasilitas}
                </p>

                <div className="mt-3">
                  <Link
                    href={fasilitas.mapLink}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md"
                  >
                    Lihat di Peta
                  </Link>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}