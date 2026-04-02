//app/user/potensi
import Image from "next/image";
import prisma from "@/lib/prisma";
import { TrendingUp } from "lucide-react";
import { Potensi } from "@prisma/client";
export default async function PotensiDesa() {

  const data = await prisma.potensi.findMany({
    orderBy: {
      sektor: "asc",
    },
  });

  return (
    <div className="bg-gradient-to-b from-white via-amber-50 to-green-50">

<div className="relative bg-gradient-to-br from-green-700 via-emerald-600 to-green-800 py-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
          <span className="text-sm font-semibold text-white">
            Potensi Unggulan
          </span>
        </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white">
            Potensi Padukuhan Karangtengah
          </h1>
          <div className="h-1.5 w-32 bg-white/80 rounded-full mx-auto mb-6"></div>
          <p className="text-white/90 text-lg max-w-3xl mx-auto leading-relaxed">
            Kekayaan alam, ekonomi, dan budaya yang menjadi fondasi pembangunan
            berkelanjutan
          </p>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 py-20">

        {data.map((item: Potensi) => {

          const komoditasList = item.komoditas
            ? item.komoditas.split(",")
            : [];

          return (
            <div key={item.id} className="mb-20">

              {/* JUDUL SEKTOR */}
              <div className="text-center mb-12">

                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                   {item.sektor}
                </h2>

                <div className="h-1.5 w-24 bg-green-600 rounded-full mx-auto"></div>

              </div>

              <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">

                {/* IMAGE */}
                <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">

                  <Image
                    src={item.image}
                    alt={item.judulGambar}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                  <div className="absolute bottom-6 left-6 right-6">

                    <h3 className="text-2xl font-bold text-white mb-2">
                      {item.judulGambar}
                    </h3>

                    <p className="text-white/90">
                      {item.deskripsiGambar}
                    </p>

                  </div>

                </div>

                {/* CONTENT */}
                <div className="space-y-6">

                  <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-600">

                    <p className="text-gray-700 leading-relaxed">
                      {item.deskripsiSektor}
                    </p>

                  </div>

                  {/* KOMODITAS */}
                  <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-200">

                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      Komoditas / Potensi
                    </h4>

                    <div className="grid grid-cols-2 gap-3">

                      {komoditasList.map((k: string, i: number) => (

                        <div
                          key={i}
                          className="bg-white p-4 rounded-xl shadow-sm"
                        >

                          <span className="font-semibold text-gray-800">
                            {k.trim()}
                          </span>

                        </div>

                      ))}

                    </div>

                  </div>

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}