import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const fasilitas = await prisma.fasilitas.create({
    data: {
      kategori: body.kategori,
      namaFasilitas: body.namaFasilitas,
      image: body.image,
      mapLink: body.mapLink,
    },
  });

  return Response.json(fasilitas);
}