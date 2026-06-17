/*
  Warnings:

  - A unique constraint covering the columns `[name,districtId]` on the table `Taluka` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Taluka_name_districtId_key" ON "Taluka"("name", "districtId");
