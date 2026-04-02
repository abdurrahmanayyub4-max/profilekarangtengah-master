// app/api/beranda/edit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID tidak ditemukan.' }, { status: 400 });
    }

    const updated = await prisma.beranda.update({
      where: { id: Number(id) },
      data: {
        namaKepala:      data.namaKepala      || null,
        jabatanKepala:   data.jabatanKepala   || null,
        judulSambutan:   data.judulSambutan   || null,
        isiSambutan:     data.isiSambutan     || null,
        judulDeskripsi:  data.judulDeskripsi  || null,
        deskripsi1:      data.deskripsi1      || null,
        deskripsi2:      data.deskripsi2      || null,
        deskripsi3:      data.deskripsi3      || null,
        deskripsi4:      data.deskripsi4      || null,
        deskripsi5:      data.deskripsi5      || null,
        jumlahPenduduk:  data.jumlahPenduduk  || null,
        satuanPenduduk:  data.satuanPenduduk  || null,
        jumlahRT:        data.jumlahRT        || null,
        labelRT:         data.labelRT         || null,
        jumlahRW:        data.jumlahRW        || null,
        labelRW:         data.labelRW         || null,
        judulPertanian:  data.judulPertanian  || null,
        isiPertanian:    data.isiPertanian    || null,
        judulPeternakan: data.judulPeternakan || null,
        isiPeternakan:   data.isiPeternakan   || null,
        judulVisiMisi:   data.judulVisiMisi   || null,
        judulVisi:       data.judulVisi       || null,
        isiVisi:         data.isiVisi         || null,
        misiList:        data.misiList        || null,
        alamat:          data.alamat          || null,
        mapLink:         data.mapLink         || null,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Gagal menyimpan data.' }, { status: 500 });
  }
}