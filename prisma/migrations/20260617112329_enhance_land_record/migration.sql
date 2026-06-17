-- AlterTable
ALTER TABLE "LandRecord" ADD COLUMN     "cropType" TEXT,
ADD COLUMN     "irrigationType" TEXT,
ADD COLUMN     "khataNumber" TEXT,
ADD COLUMN     "landType" TEXT,
ADD COLUMN     "mutationNumber" TEXT;

-- CreateIndex
CREATE INDEX "LandRecord_districtId_idx" ON "LandRecord"("districtId");

-- CreateIndex
CREATE INDEX "LandRecord_talukaId_idx" ON "LandRecord"("talukaId");

-- CreateIndex
CREATE INDEX "LandRecord_villageId_idx" ON "LandRecord"("villageId");

-- CreateIndex
CREATE INDEX "LandRecord_surveyNumber_idx" ON "LandRecord"("surveyNumber");

-- CreateIndex
CREATE INDEX "Taluka_districtId_idx" ON "Taluka"("districtId");
