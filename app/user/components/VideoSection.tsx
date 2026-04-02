"use client";

import { Play, Clock, Video } from "lucide-react";

export default function VideoSection() {
  return (
    <div className="bg-gradient-to-b from-white to-amber-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
            <Video className="text-red-700" size={20} />
            <span className="text-sm font-semibold text-red-800">
              Video Profil
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Video Profil Padukuhan Karangtengah
          </h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-red-600 to-orange-500 rounded-full mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Saksikan keindahan alam, kehidupan masyarakat, dan potensi
            pengembangan Padukuhan Karangtengah melalui dokumentasi video
            profesional kami.
          </p>
        </div>

        {/* Video Container */}
        <div className="max-w-5xl mx-auto">
          <div className="relative group">
            {/* Decorative Border */}
            <div className="absolute -inset-4 bg-gradient-to-r from-green-400 via-emerald-500 to-blue-500 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl"></div>

            {/* Video Frame */}
            <div className="relative bg-white p-3 rounded-3xl shadow-2xl">
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl bg-gray-900">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/R34BeLTRhnU"
                  title="Video Profil Padukuhan Karangtengah"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-md text-center border border-gray-100">
              <Clock className="text-green-600 mx-auto mb-2" size={24} />
              <p className="text-sm text-gray-600">Durasi</p>
              <p className="font-bold text-gray-900">5 menit</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-md text-center border border-gray-100">
              <Video className="text-blue-600 mx-auto mb-2" size={24} />
              <p className="text-sm text-gray-600">Kualitas</p>
              <p className="font-bold text-gray-900">HD 1080p</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-md text-center border border-gray-100">
              <Play className="text-red-600 mx-auto mb-2" size={24} />
              <p className="text-sm text-gray-600">Produksi</p>
              <p className="font-bold text-gray-900">2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
