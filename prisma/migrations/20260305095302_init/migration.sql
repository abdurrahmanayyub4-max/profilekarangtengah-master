-- CreateTable
CREATE TABLE "Fasilitas" (
    "id" SERIAL NOT NULL,
    "kategori" TEXT NOT NULL,
    "namaFasilitas" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "mapLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fasilitas_pkey" PRIMARY KEY ("id")
);
