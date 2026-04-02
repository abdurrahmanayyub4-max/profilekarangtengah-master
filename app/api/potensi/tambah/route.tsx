import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const sektor = formData.get("sektor") as string;
    const judulGambar = formData.get("judulGambar") as string;
    const komoditas = formData.get("komoditas") as string;
    const deskripsiGambar = formData.get("deskripsiGambar") as string;
    const deskripsiSektor = formData.get("deskripsiSektor") as string;

    const file = formData.get("file") as File | null;

    let imagePath = "";

    // jika ada file gambar
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName =
        Date.now() + "-" + file.name.replaceAll(" ", "_");

      const uploadDir = path.join(process.cwd(), "public/uploads");

      // buat folder jika belum ada
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);

      imagePath = "/uploads/" + fileName;
    }

    await prisma.potensi.create({
      data: {
        sektor,
        judulGambar,
        komoditas,
        deskripsiGambar,
        deskripsiSektor,
        image: imagePath
      }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Gagal upload potensi" },
      { status: 500 }
    );
  }
}