/*
  Warnings:

  - A unique constraint covering the columns `[name,talukaId]` on the table `Village` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Village_name_talukaId_key" ON "Village"("name", "talukaId");
