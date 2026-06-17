/*
  Warnings:

  - Made the column `districtCode` on table `District` required. This step will fail if there are existing NULL values in that column.
  - Made the column `talukaCode` on table `Taluka` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "District_name_key";

-- DropIndex
DROP INDEX "Taluka_name_districtId_key";

-- DropIndex
DROP INDEX "Village_name_talukaId_key";

-- AlterTable
ALTER TABLE "District" ALTER COLUMN "districtCode" SET NOT NULL;

-- AlterTable
ALTER TABLE "Taluka" ALTER COLUMN "talukaCode" SET NOT NULL;
