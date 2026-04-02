//app/api/potensi/edit/route.tsx
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const id = Number(formData.get("id"));
    const judulGambar = formData.get("judulGambar") as string;
    const sektor = formData.get("sektor") as string;
    const komoditas = formData.get("komoditas") as string;
    const deskripsiGambar = formData.get("deskripsiGambar") as string;
    const deskripsiSektor = formData.get("deskripsiSektor") as string;
    const existingImage = formData.get("existingImage") as string;

    let image = existingImage;

    // Cek file baru
    const file = formData.get("file") as File | null;
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(process.cwd(), "public", "uploads", "potensi", fileName);

      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, buffer);

      image = `/uploads/potensi/${fileName}`;
    }

    await prisma.potensi.update({
      where: { id },
      data: {
        judulGambar,
        sektor,
        komoditas,
        deskripsiGambar,
        deskripsiSektor,
        image
      }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Gagal update potensi" },
      { status: 500 }
    );
  }
}