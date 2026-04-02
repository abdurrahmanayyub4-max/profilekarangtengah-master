-- CreateTable
CREATE TABLE "Pemerintahan" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "judulDeskripsi" TEXT NOT NULL,
    "isiDeskripsi" TEXT NOT NULL,
    "judulVisiMisi" TEXT NOT NULL,
    "visi" TEXT NOT NULL,
    "deskripsiStruktur" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pemerintahan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerangkatDesa" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PerangkatDesa_pkey" PRIMARY KEY ("id")
);
