/*
  Warnings:

  - A unique constraint covering the columns `[villageCode]` on the table `Village` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `villageCode` to the `Village` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Village" ADD COLUMN     "marathiName" TEXT,
ADD COLUMN     "villageCode" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Village_villageCode_key" ON "Village"("villageCode");

-- CreateIndex
CREATE INDEX "Village_talukaId_idx" ON "Village"("talukaId");
