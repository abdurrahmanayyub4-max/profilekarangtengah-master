// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file || file.size === 0) {
      return NextResponse.json({ error: "Tidak ada file" }, { status: 400 });
    }

    // Validasi tipe
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File harus berupa gambar" }, { status: 400 });
    }

    const bytes  = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext      = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const fileName = `${randomUUID()}.${ext}`;

    // Pastikan folder uploads ada, kalau belum buat otomatis
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    return NextResponse.json({ url: `/uploads/${fileName}` });

  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Gagal menyimpan file" }, { status: 500 });
  }
}