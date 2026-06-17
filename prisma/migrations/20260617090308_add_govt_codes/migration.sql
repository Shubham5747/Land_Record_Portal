/*
  Warnings:

  - A unique constraint covering the columns `[districtCode]` on the table `District` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "District" ADD COLUMN     "districtCode" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "District_districtCode_key" ON "District"("districtCode");
