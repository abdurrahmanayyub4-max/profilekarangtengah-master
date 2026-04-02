//app/user/pemerintahan/page/tsx
import prisma from "@/lib/prisma";
import { Users, Target, History } from "lucide-react";

export default async function Pemerintahan() {

  const pemerintahan = await prisma.pemerintahan.findFirst();

  const perangkat = await prisma.perangkatDesa.findMany({
    orderBy: { id: 'asc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Judul */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          {pemerintahan?.judul}
        </h2>
        <p className="text-gray-600 text-lg">
          {pemerintahan?.deskripsi}
        </p>
      </div>

      {/* Deskripsi & Visi Misi */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">

        {/* Deskripsi */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <History className="text-green-700 mr-3" size={28} />
            <h3 className="text-xl font-semibold text-green-700">
              {pemerintahan?.judulDeskripsi}
            </h3>
          </div>

          <p className="text-gray-700 text-justify">
            {pemerintahan?.isiDeskripsi}
          </p>
        </div>

        {/* Visi Misi */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Target className="text-green-700 mr-3" size={28} />
            <h3 className="text-xl font-semibold text-green-700">
              {pemerintahan?.judulVisiMisi}
            </h3>
          </div>

          <div className="mb-4">
            <p className="font-semibold text-gray-800 mb-1">Visi:</p>
            <p className="text-gray-700 text-sm">
              {pemerintahan?.visi}
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-800 mb-2">Misi:</p>
            <ul className="text-gray-700 text-sm space-y-1">
              <li>• Pemerintah yang bersih transparan bertanggungjawab</li>
              <li>• Mewujudkan kehidupan yang demokratis dengan musyawarah mufakat</li>
              <li>• Terpenuhinya akses layanan dasar pendidikan dan kesehatan</li>
              <li>• Pengembangan ekonomi kerakyatan</li>
              <li>• Optimalisasi peran BUMDesa</li>
            </ul>
          </div>
        </div>

      </div>

      {/* Struktur Organisasi */}
      <div className="mb-12">

        <h3 className="text-2xl font-semibold mb-6 text-green-700">
          Struktur Organisasi Pemerintahan
        </h3>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg shadow-md mb-6">
          <p className="text-gray-700">
            {pemerintahan?.deskripsiStruktur}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {perangkat.map((person) => (
            <div
              key={person.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 border-green-600"
            >
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-green-700" size={40} />
              </div>

              <h4 className="text-lg font-semibold text-center mb-2 text-gray-800">
                {person.nama}
              </h4>

              <p className="text-center text-gray-600 text-sm font-medium">
                {person.jabatan}
              </p>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}