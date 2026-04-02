// app/api/fasilitas/tambah/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const formData      = await req.formData();
    const namaFasilitas = (formData.get("namaFasilitas") as string)?.trim();
    const kategori      = (formData.get("kategori") as string)?.trim();
    const mapLink       = (formData.get("mapLink") as string)?.trim();
    const file          = formData.get("file") as File | null;

    if (!namaFasilitas || !kategori || !mapLink || !file || file.size === 0) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    const bytes    = await file.arrayBuffer();
    const buffer   = Buffer.from(bytes);
    const ext      = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const fileName = `${randomUUID()}.${ext}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    await writeFile(path.join(uploadDir, fileName), buffer);
    const image = `/uploads/${fileName}`;

    await prisma.fasilitas.create({
      data: { namaFasilitas, kategori, image, mapLink },
    });

    revalidatePath("/admin/fasilitas");
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Tambah error:", err);
    return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 500 });
  }
}