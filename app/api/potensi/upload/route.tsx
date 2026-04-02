import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import prisma from "@/lib/prisma";

// Utility untuk menyimpan file
async function saveFile(file: File, folder: string) {
  const dir = path.join(process.cwd(), "public", folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(dir, fileName);

  fs.writeFileSync(filePath, buffer);

  return `/${folder}/${fileName}`;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const sektor        = formData.get("sektor")?.toString() || "";
    const judulGambar   = formData.get("judulGambar")?.toString() || "";
    const komoditas     = formData.get("komoditas")?.toString() || "";
    const deskripsiGambar = formData.get("deskripsiGambar")?.toString() || "";
    const deskripsiSektor = formData.get("deskripsiSektor")?.toString() || "";
    const file          = formData.get("file") as File | null;

    if (!file) return NextResponse.json({ error: "File wajib diupload." }, { status: 400 });

    const imageUrl = await saveFile(file, "uploads/potensi");

    const potensi = await prisma.potensi.create({
      data: {
        sektor,
        judulGambar,
        komoditas,
        deskripsiGambar,
        deskripsiSektor,
        image: imageUrl,
      },
    });

    return NextResponse.json({ message: "Berhasil menambahkan potensi.", potensi });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Terjadi kesalahan server." }, { status: 500 });
  }
}