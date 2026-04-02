/*
  Warnings:

  - You are about to drop the column `misi1` on the `Beranda` table. All the data in the column will be lost.
  - You are about to drop the column `misi2` on the `Beranda` table. All the data in the column will be lost.
  - You are about to drop the column `misi3` on the `Beranda` table. All the data in the column will be lost.
  - You are about to drop the column `misi4` on the `Beranda` table. All the data in the column will be lost.
  - You are about to drop the column `misi5` on the `Beranda` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Beranda" DROP COLUMN "misi1",
DROP COLUMN "misi2",
DROP COLUMN "misi3",
DROP COLUMN "misi4",
DROP COLUMN "misi5",
ADD COLUMN     "misiList" TEXT[];
