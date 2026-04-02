// app/api/pemerintahan/perangkat/tambah/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, jabatan } = body;

    if (!nama || !jabatan) {
      return NextResponse.json({ error: 'Nama dan jabatan wajib diisi.' }, { status: 400 });
    }

    const created = await prisma.perangkatDesa.create({
      data: { nama, jabatan },
    });

    return NextResponse.json({ success: true, data: created });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Gagal menyimpan data.' }, { status: 500 });
  }
}
