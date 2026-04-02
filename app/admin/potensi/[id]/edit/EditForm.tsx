//app/admin/potensi/[id]/edit/EditForm.tsx
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaCloudUploadAlt, FaImage, FaTimes, FaCheck } from "react-icons/fa";

type Potensi = {
  id: number;
  sektor: string;
  image: string;
  judulGambar: string;
  deskripsiGambar: string;
  deskripsiSektor: string;
  komoditas: string;
};

export default function EditForm({ potensi }: { potensi: Potensi }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string>(potensi.image);
  const [fileName, setFileName] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran maksimal 5MB.");
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

    formData.append("id", String(potensi.id));
    formData.append("judulGambar", (form.elements.namedItem("judulGambar") as HTMLInputElement).value);
    formData.append("sektor", (form.elements.namedItem("sektor") as HTMLInputElement).value);
    formData.append("komoditas", (form.elements.namedItem("komoditas") as HTMLInputElement).value);
    formData.append("deskripsiGambar", (form.elements.namedItem("deskripsiGambar") as HTMLInputElement).value);
    formData.append("deskripsiSektor", (form.elements.namedItem("deskripsiSektor") as HTMLInputElement).value);

    formData.append("existingImage", potensi.image);

    const file = fileInputRef.current?.files?.[0];
    if (file) formData.append("file", file);

    try {
      const res = await fetch("/api/potensi/edit", {
        method: "POST",
        body: formData
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Gagal menyimpan");
        setLoading(false);
        return;
      }

      router.push("/admin/potensi");
      router.refresh();

    } catch {
      setError("Terjadi kesalahan koneksi.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-5">

      {/* Upload */}
      <div className="col-span-1 flex flex-col gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          <div className="px-5 py-3 border-b border-gray-100">
            <span className="font-bold text-gray-700 text-sm">Foto Potensi</span>
          </div>

          <div className="p-4 flex flex-col gap-3">

            <img
              src={preview}
              className="w-full aspect-square object-cover rounded-xl border"
            />

            <div
              className="upload-zone"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              <div className="flex flex-col items-center gap-1">
                <FaCloudUploadAlt className="text-2xl text-gray-300" />
                <span className="text-xs text-gray-500">
                  Klik atau drag gambar
                </span>
              </div>

            </div>

            {error && (
              <div className="flex items-center gap-2 text-rose-500 text-xs">
                <FaTimes /> {error}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Form */}
      <div className="col-span-2 flex flex-col gap-4">

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">

          <div className="px-6 py-3 border-b border-gray-100">
            <div className="font-bold text-gray-800 text-sm">
              Edit Data Potensi
            </div>
          </div>

          <div className="p-6 flex flex-col gap-4">

            <input
              name="judulGambar"
              defaultValue={potensi.judulGambar}
              required
              className="form-input"
              placeholder="Judul Potensi"
            />

            <input
              name="sektor"
              defaultValue={potensi.sektor}
              required
              className="form-input"
              placeholder="Sektor"
            />

            <input
              name="komoditas"
              defaultValue={potensi.komoditas}
              required
              className="form-input"
              placeholder="Komoditas"
            />

            <textarea
              name="deskripsiGambar"
              defaultValue={potensi.deskripsiGambar}
              className="form-input"
              placeholder="Deskripsi Gambar"
            />

            <textarea
              name="deskripsiSektor"
              defaultValue={potensi.deskripsiSektor}
              className="form-input"
              placeholder="Deskripsi Sektor"
            />

          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-3 justify-end">

          <Link
            href="/admin/potensi"
            className="btn-secondary px-6 py-2 rounded-xl text-sm font-bold"
          >
            Batal
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary px-6 py-2 rounded-xl text-sm font-bold"
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>

        </div>

      </div>

    </form>
  );
}