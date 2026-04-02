// app/api/pemerintahan/edit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) return NextResponse.json({ error: 'ID tidak ditemukan.' }, { status: 400 });

    const updated = await prisma.pemerintahan.update({
      where: { id: Number(id) },
      data: {
        judul:             data.judul             || null,
        deskripsi:         data.deskripsi         || null,
        judulDeskripsi:    data.judulDeskripsi     || null,
        isiDeskripsi:      data.isiDeskripsi       || null,
        judulVisiMisi:     data.judulVisiMisi      || null,
        visi:              data.visi               || null,
        deskripsiStruktur: data.deskripsiStruktur  || null,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Gagal menyimpan data.' }, { status: 500 });
  }
}
