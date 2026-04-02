// app/api/potensi/route.ts
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const potensi = await prisma.potensi.findMany();
  return NextResponse.json(potensi);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { sektor, image, judulGambar, deskripsiGambar, deskripsiSektor, komoditas } = body;
  
    if (!sektor || !image) {
      return NextResponse.json({ error: 'Field wajib tidak lengkap.' }, { status: 400 });
    }
  
    const data = await prisma.potensi.create({
      data: {
        sektor,
        image,
        judulGambar,
        deskripsiGambar,
        deskripsiSektor,
        komoditas,
      },
    });
  
    return NextResponse.json(data, { status: 201 });
  }


// app/api/potensi/[id]/route.ts  (simpan di file terpisah)
// import prisma from '@/lib/prisma';
// import { NextRequest, NextResponse } from 'next/server';
//
// export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
//   await prisma.potensi.delete({ where: { id: Number(params.id) } });
//   return NextResponse.json({ success: true });
// }
//
// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//   const body = await req.json();
//   const data = await prisma.potensi.update({ where: { id: Number(params.id) }, data: body });
//   return NextResponse.json(data);
// }