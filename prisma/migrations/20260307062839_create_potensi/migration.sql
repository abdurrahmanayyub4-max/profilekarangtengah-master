-- CreateTable
CREATE TABLE "Potensi" (
    "id" SERIAL NOT NULL,
    "sektor" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "judulGambar" TEXT NOT NULL,
    "deskripsiGambar" TEXT NOT NULL,
    "deskripsiSektor" TEXT NOT NULL,
    "komoditas" TEXT NOT NULL,

    CONSTRAINT "Potensi_pkey" PRIMARY KEY ("id")
);
