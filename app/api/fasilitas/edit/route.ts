// app/api/fasilitas/edit/route.ts
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
    const id            = Number(formData.get("id"));
    const namaFasilitas = formData.get("namaFasilitas") as string;
    const kategori      = formData.get("kategori") as string;
    const file          = formData.get("file") as File | null;
    let   image         = formData.get("existingImage") as string;

    // Kalau ada file baru, simpan langsung di sini
    if (file && file.size > 0) {
      const bytes  = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext      = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const fileName = `${randomUUID()}.${ext}`;

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      await writeFile(path.join(uploadDir, fileName), buffer);
      image = `/uploads/${fileName}`;
    }

    await prisma.fasilitas.update({
      where: { id },
      data: { namaFasilitas, kategori, image },
    });

    revalidatePath("/admin/fasilitas");
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Edit error:", err);
    return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 500 });
  }
}