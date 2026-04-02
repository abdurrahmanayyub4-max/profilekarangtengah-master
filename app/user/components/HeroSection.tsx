"use client";

import { useState, useEffect } from "react";

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Background images - ganti dengan URL gambar desa Anda
  const backgroundImages = [
    "/fasilitas/masjid-mujahidin.jpg", // Sawah
    "/fasilitas/mushola-an-nur.jpg", // Pegunungan
    "/fasilitas/smp-muhammadiyah.jpg", // Hutan
    "/fasilitas/balai-padukuhan.jpg", // Sunset Alam
  ];

  // Text yang akan di-typing
  const textToType = "Selamat Datang di Padukuhan Karangtengah";

  // Carousel background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Ganti gambar setiap 5 detik

    return () => clearInterval(interval);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const handleTyping = () => {
      const fullText = textToType;

      if (!isDeleting && displayedText === fullText) {
        // Pause at end before deleting
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }

      if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        return;
      }

      const updatedText = isDeleting
        ? fullText.substring(0, displayedText.length - 1)
        : fullText.substring(0, displayedText.length + 1);

      setDisplayedText(updatedText);
      setTypingSpeed(isDeleting ? 50 : 150);
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Background Images with Carousel */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white min-h-[80px] flex items-center justify-center">
            {displayedText}
            <span className="animate-pulse ml-1">|</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 animate-fade-in">
            Desa Asri, Maju, dan Sejahtera dengan Potensi Alam yang Melimpah
          </p>
         

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentImage
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
