//app/admin/fasilitas/[id]/edit/EditForm.tsx
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaCloudUploadAlt, FaImage, FaTimes, FaCheck } from "react-icons/fa";

type Fasilitas = {
  id: number;
  namaFasilitas: string;
  kategori: string;
  image: string;
};

export default function EditForm({ fasilitas }: { fasilitas: Fasilitas }) {
  const router       = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview,    setPreview]    = useState<string>(fasilitas.image);
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
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData();
    formData.append("id",            String(fasilitas.id));
    formData.append("namaFasilitas", (form.elements.namedItem("namaFasilitas") as HTMLInputElement).value);
    formData.append("kategori",      (form.elements.namedItem("kategori") as HTMLInputElement).value);
    formData.append("existingImage", fasilitas.image);

    const file = fileInputRef.current?.files?.[0];
    if (file) formData.append("file", file);

    try {
      const res  = await fetch("/api/fasilitas/edit", { method: "POST", body: formData });
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
    <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-5 h-full">

      {/* Kolom Kiri — Upload */}
      <div className="col-span-1 flex flex-col gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-gray-100 flex-shrink-0">
            <span className="font-bold text-gray-700 text-sm">Foto Fasilitas</span>
          </div>
          <div className="p-4 flex flex-col gap-3 flex-1">
            {/* Preview */}
            <img
              src={preview}
              alt="Preview"
              className="w-full aspect-square object-cover rounded-xl border-2 border-gray-100 shadow-sm"
            />
            <div className="upload-preview-label">
              <FaImage className="text-gray-300 text-xs" />
              <span>{fileName ? `${fileName}` : "Gambar saat ini"}</span>
            </div>

            {/* Drop Zone */}
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

      {/* Kolom Kanan — Form */}
      <div className="col-span-2 flex flex-col gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-3 border-b border-gray-100 flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
              <span className="text-amber-600 text-xs">✏️</span>
            </div>
            <div>
              <div className="font-bold text-gray-800 text-sm">Edit Data</div>
              <div className="text-gray-400 text-xs">ID #{fasilitas.id} · {fasilitas.namaFasilitas}</div>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-4">
            <div className="form-group">
              <label className="form-label">Nama Fasilitas</label>
              <input name="namaFasilitas" required defaultValue={fasilitas.namaFasilitas} className="form-input" placeholder="Contoh: Lapangan Futsal" />
            </div>
            <div className="form-group">
              <label className="form-label">Kategori</label>
              <input name="kategori" required defaultValue={fasilitas.kategori} className="form-input" placeholder="Contoh: Olahraga" />
            </div>
          </div>
        </div>

        {/* Tombol */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-3 justify-end">
          <Link href="/admin/fasilitas" className="btn-secondary px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
            Batal
          </Link>
          <button type="submit" disabled={loading} className="btn-primary px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
            {loading ? <><span className="upload-spinner" /> Menyimpan...</> : "Simpan Perubahan"}
          </button>
        </div>
      </div>

    </form>
  );
}