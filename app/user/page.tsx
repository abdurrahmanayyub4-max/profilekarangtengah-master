//app/user/page.tsx
import HeroSection from '@/app/user/components/HeroSection';
import VideoSection from '@/app/user/components/VideoSection';
import prisma from '@/lib/prisma';
import { MapPin, CheckCircle, Leaf, Target, Heart, Users } from 'lucide-react';

// ── Ekstrak embed URL dari string yang mungkin berisi <iframe> HTML ──────────
function getEmbedUrl(raw: string | null | undefined): string {
  if (!raw) return '';
  // Kalau user simpan kode <iframe src="...">, ambil src-nya
  const srcMatch = raw.match(/src=["']([^"']+)["']/);
  if (srcMatch) return srcMatch[1];
  // Kalau sudah berupa URL embed langsung, kembalikan apa adanya
  return raw;
}

// ── Ambil semua misi yang tidak kosong secara dinamis ────────────────────────
function getMisiList(beranda: {
  misiList?: string | null;
}): string[] {
  try {
    const arr = JSON.parse(beranda.misiList ?? '[]');
    return Array.isArray(arr) ? arr.filter((m: string) => !!m && m.trim() !== '') : [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const beranda = await prisma.beranda.findFirst();
  const misiList = getMisiList(beranda ?? {});
  const embedUrl = getEmbedUrl(beranda?.mapLink);

  return (
    <>
      <HeroSection />
      <VideoSection />

      {/* ── Sambutan Kepala Dukuh ── */}
      <div className="relative bg-gradient-to-br from-green-700 via-emerald-600 to-green-800 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-3 gap-0">

              {/* Profile */}
              <div className="lg:col-span-1 bg-gradient-to-br from-green-100 to-emerald-50 p-8 flex flex-col items-center justify-center">
                <div className="w-40 h-40 bg-gradient-to-br from-green-600 to-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-xl">
                  <Users className="text-white" size={80} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  {beranda?.namaKepala}
                </h3>
                <p className="text-green-700 font-semibold text-center mb-2">
                  {beranda?.jabatanKepala}
                </p>
                <div className="w-20 h-1 bg-green-600 rounded-full"></div>
              </div>

              {/* Sambutan */}
              <div className="lg:col-span-2 p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 w-12 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full"></div>
                  <h4 className="text-xl font-bold text-gray-800">
                    {beranda?.judulSambutan}
                  </h4>
                </div>

                {/* ✅ Rich text — render HTML dari editor */}
                <div
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: beranda?.isiSambutan ?? '' }}
                />

                <div className="mt-6 flex justify-end">
                  <div className="text-6xl text-green-200 font-serif leading-none">"</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Profil Desa ── */}
      <div className="bg-gradient-to-b from-white to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-4">
              <Leaf className="text-green-700" size={20} />
              <span className="text-sm font-semibold text-green-800">Tentang Kami</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Profil Padukuhan Karangtengah
            </h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full mx-auto"></div>
          </div>

          <div className="space-y-8">

            {/* Deskripsi */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-green-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 rounded-xl">
                  <MapPin className="text-green-700" size={28} />
                </div>
                <h3 className="text-3xl font-bold text-green-800">
                  {beranda?.judulDeskripsi}
                </h3>
              </div>

              <div className="prose prose-lg max-w-none">

                {/* ✅ Deskripsi 1 - rich text */}
                <div
                  className="text-gray-700 leading-relaxed mb-4"
                  dangerouslySetInnerHTML={{ __html: beranda?.deskripsi1 ?? '' }}
                />

                {/* Statistik */}
                <div className="grid md:grid-cols-3 gap-4 my-6">
                  <div className="bg-green-50 p-4 rounded-xl text-center border border-green-200">
                    <p className="text-3xl font-bold text-green-700">{beranda?.jumlahPenduduk}</p>
                    <p className="text-sm text-gray-600">{beranda?.satuanPenduduk}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl text-center border border-green-200">
                    <p className="text-3xl font-bold text-green-700">{beranda?.jumlahRT}</p>
                    <p className="text-sm text-gray-600">{beranda?.labelRT}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl text-center border border-green-200">
                    <p className="text-3xl font-bold text-green-700">{beranda?.jumlahRW}</p>
                    <p className="text-sm text-gray-600">{beranda?.labelRW}</p>
                  </div>
                </div>

                {/* ✅ Deskripsi 2 - rich text */}
                <div
                  className="text-gray-700 leading-relaxed mb-4"
                  dangerouslySetInnerHTML={{ __html: beranda?.deskripsi2 ?? '' }}
                />

                {/* Potensi */}
                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Leaf className="text-amber-700" size={24} />
                      <h4 className="font-bold text-amber-900">{beranda?.judulPertanian}</h4>
                    </div>
                    {/* ✅ Isi Pertanian - rich text */}
                    <div
                      className="text-sm text-gray-700"
                      dangerouslySetInnerHTML={{ __html: beranda?.isiPertanian ?? '' }}
                    />
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Heart className="text-blue-700" size={24} />
                      <h4 className="font-bold text-blue-900">{beranda?.judulPeternakan}</h4>
                    </div>
                    {/* ✅ Isi Peternakan - rich text */}
                    <div
                      className="text-sm text-gray-700"
                      dangerouslySetInnerHTML={{ __html: beranda?.isiPeternakan ?? '' }}
                    />
                  </div>
                </div>

                {/* ✅ Deskripsi 3, 4, 5 - rich text */}
                <div
                  className="text-gray-700 leading-relaxed mb-4"
                  dangerouslySetInnerHTML={{ __html: beranda?.deskripsi3 ?? '' }}
                />
                <div
                  className="text-gray-700 leading-relaxed mb-4"
                  dangerouslySetInnerHTML={{ __html: beranda?.deskripsi4 ?? '' }}
                />
                <div
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: beranda?.deskripsi5 ?? '' }}
                />

              </div>
            </div>

            {/* ── Visi & Misi ── */}
            <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 p-8 rounded-3xl shadow-lg border border-green-200">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-white p-3 rounded-xl shadow-md">
                  <Target className="text-green-700" size={28} />
                </div>
                <h3 className="text-3xl font-bold text-green-800">
                  {beranda?.judulVisiMisi}
                </h3>
              </div>

              {/* Visi */}
              <div className="bg-white p-6 rounded-2xl shadow-md mb-6 border-l-4 border-green-600">
                <h4 className="font-bold text-xl mb-3 text-gray-900">
                  {beranda?.judulVisi}
                </h4>
                {/* ✅ Isi Visi - rich text */}
                <div
                  className="text-2xl font-bold text-green-700 italic"
                  dangerouslySetInnerHTML={{ __html: beranda?.isiVisi ?? '' }}
                />
              </div>

              {/* ✅ Misi dinamis — tampil semua misi yang ada, tidak hardcode 5 */}
              {misiList.length > 0 && (
                <div className="bg-white p-6 rounded-2xl shadow-md">
                  <h4 className="font-bold text-xl mb-5 text-gray-900">Misi</h4>
                  <ul className="space-y-4">
                    {misiList.map((misi, idx) => (
                      <li key={idx} className="flex items-start group">
                        <div className="bg-green-100 p-2 rounded-lg mr-4 flex-shrink-0">
                          <CheckCircle className="text-green-700" size={20} />
                        </div>
                        <span className="text-gray-700 pt-1.5">{misi}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ── Lokasi ── */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
              <MapPin className="text-blue-700" size={20} />
              <span className="text-sm font-semibold text-blue-800">Lokasi</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Lokasi</h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto"></div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h3 className="font-bold text-xl mb-4 text-gray-900">
              Lokasi Padukuhan Karangtengah
            </h3>

            {/* ✅ Maps — ekstrak embed URL dari mapLink (mendukung <iframe> maupun URL langsung) */}
            {embedUrl ? (
              <div className="relative pb-[75%] h-0 overflow-hidden rounded-2xl shadow-xl border border-gray-200">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={embedUrl}
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 rounded-2xl bg-gray-50 border border-dashed border-gray-300">
                <p className="text-gray-400 text-sm">Peta belum dikonfigurasi</p>
              </div>
            )}

            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 bg-green-50 p-3 rounded-xl">
              <MapPin className="text-green-600" size={18} />
              <p>Tekan pin untuk mendapatkan arah menuju kantor Padukuhan</p>
            </div>

            <div className="mt-6 bg-gray-300 p-4 rounded-lg text-center">
              <p className="text-red-600 font-semibold">{beranda?.alamat}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}