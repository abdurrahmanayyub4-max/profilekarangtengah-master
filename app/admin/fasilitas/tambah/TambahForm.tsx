"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaCloudUploadAlt, FaImage, FaTimes, FaCheck, FaChevronDown, FaMapMarkerAlt } from "react-icons/fa";

const KATEGORI_OPTIONS = [
  "KEAGAMAAN",
  "PENDIDIKAN",
  "UMUM & ADMINISTRASI",
  "REKREASI",
  "LAINNYA",
];

export default function TambahForm() {
  const router       = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview,    setPreview]    = useState<string>("");
  const [fileName,   setFileName]   = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState<string>("");
  const [kategori,   setKategori]   = useState<string>("");

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar (JPG, PNG, WEBP, dll).");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Ukuran file maksimal 2MB.");
      return;
    }
    setError("");
    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!fileName) { setError("Gambar wajib diupload."); return; }
    if (!kategori) { setError("Kategori wajib dipilih."); return; }

    setLoading(true);

    const form     = e.currentTarget;
    const formData = new FormData();
    formData.append("namaFasilitas", (form.elements.namedItem("namaFasilitas") as HTMLInputElement).value);
    formData.append("kategori",      kategori);
    formData.append("mapLink",       (form.elements.namedItem("mapLink") as HTMLInputElement).value);

    const file = fileInputRef.current?.files?.[0];
    if (file) formData.append("file", file);

    try {
      const res  = await fetch("/api/fasilitas/tambah", { method: "POST", body: formData });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Gagal menyimpan. Coba lagi.");
        setLoading(false);
        return;
      }

      router.push("/admin/fasilitas");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan koneksi. Coba lagi.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-5">

      {/* Kolom Kiri — Upload Gambar */}
      <div className="col-span-1 flex flex-col gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <span className="font-bold text-gray-700 text-sm">Foto Fasilitas</span>
          </div>
          <div className="p-4 flex flex-col gap-3">

            {preview ? (
              <img src={preview} alt="Preview" className="w-full aspect-square object-cover rounded-xl border-2 border-gray-100 shadow-sm" />
            ) : (
              <div className="w-full aspect-square rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-2">
                <FaImage className="text-gray-300 text-3xl" />
                <span className="text-xs text-gray-300 font-medium">Belum ada gambar</span>
              </div>
            )}

            {preview && (
              <div className="upload-preview-label">
                <FaImage className="text-gray-300 text-xs" />
                <span className="truncate">{fileName}</span>
              </div>
            )}

            <div
              className={`upload-zone ${isDragging ? "upload-zone-active" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              {fileName ? (
                <div className="flex flex-col items-center gap-1">
                  <FaCheck className="text-emerald-500 text-xl" />
                  <span className="text-xs font-semibold text-emerald-600 text-center break-all">{fileName}</span>
                  <span className="text-xs text-gray-400">Klik untuk ganti</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <FaCloudUploadAlt className={`text-2xl ${isDragging ? "text-indigo-500" : "text-gray-300"}`} />
                  <span className="text-xs font-semibold text-gray-500">
                    {isDragging ? "Lepas di sini" : "Klik atau drag & drop"}
                  </span>
                  <span className="text-xs text-gray-400">JPG, PNG, WEBP · Maks 2MB</span>
                </div>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-2 text-rose-500 text-xs font-semibold">
                <FaTimes className="text-xs flex-shrink-0" /> {error}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Kolom Kanan — Form Data */}
      <div className="col-span-2 flex flex-col gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-3 border-b border-gray-100 flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 text-xs">＋</span>
            </div>
            <div className="font-bold text-gray-800 text-sm">Data Fasilitas Baru</div>
          </div>

          <div className="p-6 flex flex-col gap-5">

            {/* Nama */}
            <div className="form-group">
              <label className="form-label">Nama Fasilitas</label>
              <input
                name="namaFasilitas"
                required
                className="form-input"
                placeholder="Contoh: Lapangan Futsal"
              />
            </div>

            {/* Kategori */}
            <div className="form-group">
              <label className="form-label">Kategori</label>
              <input
                type="text"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                required
                className="form-input"
                placeholder="Contoh: KEAGAMAAN / PENDIDIKAN / UMUM"
              />
            </div>

            {/* Map Link */}
            <div className="form-group">
              <label className="form-label">Link Google Maps</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
                <input
                  name="mapLink"
                  required
                  className="form-input pl-9"
                  placeholder="https://maps.google.com/..."
                />
              </div>
              <span className="text-xs text-gray-400 mt-1 block">
                Buka Google Maps → klik lokasi → salin link dari browser
              </span>
            </div>

          </div>
        </div>

        {/* Tombol */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-3 justify-end">
          <Link href="/admin/fasilitas" className="btn-secondary px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
            Batal
          </Link>
          <button type="submit" disabled={loading} className="btn-primary px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
            {loading ? <><span className="upload-spinner" /> Menyimpan...</> : "Simpan Fasilitas"}
          </button>
        </div>
      </div>

    </form>
  );
}