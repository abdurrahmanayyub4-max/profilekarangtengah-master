// app/api/pemerintahan/perangkat/edit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, nama, jabatan } = body;

    if (!id) return NextResponse.json({ error: 'ID tidak ditemukan.' }, { status: 400 });
    if (!nama || !jabatan) {
      return NextResponse.json({ error: 'Nama dan jabatan wajib diisi.' }, { status: 400 });
    }

    const updated = await prisma.perangkatDesa.update({
      where: { id: Number(id) },
      data: { nama, jabatan },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Gagal menyimpan data.' }, { status: 500 });
  }
}
