import { MapPin, Briefcase, Users, TrendingUp } from 'lucide-react'
import type { QuickInfoItem } from '@/types'

export default function QuickInfo() {
  const info: QuickInfoItem[] = [
    {
      title: 'Letak Geografis',
      description: 'Terletak di ketinggian 800-900 meter dengan luas wilayah 12,5 km² di lereng pegunungan yang indah',
      icon: MapPin
    },
    {
      title: 'Potensi Unggulan',
      description: 'Pertanian organik, wisata alam (air terjun), kerajinan anyaman bambu, dan industri rumah tangga',
      icon: Briefcase
    },
    {
      title: 'Jumlah Penduduk',
      description: '3.542 jiwa terdiri dari 1.821 laki-laki (51,4%) dan 1.721 perempuan (48,6%) dalam 756 KK',
      icon: Users
    },
    {
      title: 'Pertumbuhan Ekonomi',
      description: 'Pertumbuhan UMKM 15% per tahun dengan total omzet Rp 1.8 miliar dari 8 jenis usaha utama',
      icon: TrendingUp
    }
  ]

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Sekilas Padukuhan Karangtengah
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
          Informasi singkat tentang karakteristik utama dan potensi pengembangan Padukuhan Karangtengah
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {info.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all hover:scale-105 border-t-4 border-green-600"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Icon className="text-green-700" size={24} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}