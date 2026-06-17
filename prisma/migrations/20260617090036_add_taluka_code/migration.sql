/*
  Warnings:

  - A unique constraint covering the columns `[talukaCode]` on the table `Taluka` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Taluka" ADD COLUMN     "talukaCode" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Taluka_talukaCode_key" ON "Taluka"("talukaCode");
