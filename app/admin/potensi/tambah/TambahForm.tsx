"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaCloudUploadAlt, FaImage, FaTimes, FaCheck } from "react-icons/fa";

export default function TambahForm() {
  const router       = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview,    setPreview]    = useState<string>("");
  const [fileName,   setFileName]   = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState<string>("");

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar (JPG, PNG, WEBP, dll).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran file maksimal 5MB.");
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

    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData();

    formData.append("sektor",        (form.elements.namedItem("sektor") as HTMLInputElement).value);
    formData.append("judulGambar",   (form.elements.namedItem("judulGambar") as HTMLInputElement).value);
    formData.append("komoditas",     (form.elements.namedItem("komoditas") as HTMLInputElement).value);
    formData.append("deskripsiGambar",(form.elements.namedItem("deskripsiGambar") as HTMLInputElement).value);
    formData.append("deskripsiSektor",(form.elements.namedItem("deskripsiSektor") as HTMLInputElement).value);

    const file = fileInputRef.current?.files?.[0];
    if (file) formData.append("file", file);

    try {
      const res = await fetch("/api/potensi/upload", { method: "POST", body: formData });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Gagal menyimpan. Coba lagi.");
        setLoading(false);
        return;
      }

      router.push("/admin/potensi");
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
            <span className="font-bold text-gray-700 text-sm">Foto Potensi</span>
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
                  <span className="text-xs text-gray-400">JPG, PNG, WEBP · Maks 5MB</span>
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
            <div className="font-bold text-gray-800 text-sm">Data Potensi Baru</div>
          </div>

          <div className="p-6 flex flex-col gap-4">

            <div className="form-group">
              <label className="form-label">Sektor</label>
              <input name="sektor" required className="form-input" placeholder="Contoh: Pertanian" />
            </div>

            <div className="form-group">
              <label className="form-label">Judul Gambar</label>
              <input name="judulGambar" required className="form-input" placeholder="Contoh: Lahan Produktif" />
            </div>

            <div className="form-group">
              <label className="form-label">Komoditas</label>
              <input name="komoditas" required className="form-input" placeholder="Contoh: Padi, Jagung" />
            </div>

            <div className="form-group">
              <label className="form-label">Deskripsi Gambar</label>
              <textarea name="deskripsiGambar" required className="form-textarea" placeholder="Deskripsi gambar potensi"></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">Deskripsi Sektor</label>
              <textarea name="deskripsiSektor" required className="form-textarea" placeholder="Deskripsi sektor"></textarea>
            </div>

          </div>
        </div>

        {/* Tombol */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-3 justify-end">
          <Link href="/admin/potensi" className="btn-secondary px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
            Batal
          </Link>
          <button type="submit" disabled={loading} className="btn-primary px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
            {loading ? <><span className="upload-spinner" /> Menyimpan...</> : "Simpan Potensi"}
          </button>
        </div>
      </div>

    </form>
  );
}