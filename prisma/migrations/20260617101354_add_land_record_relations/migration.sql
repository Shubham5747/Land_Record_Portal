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

-- AddForeignKey
ALTER TABLE "LandRecord" ADD CONSTRAINT "LandRecord_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandRecord" ADD CONSTRAINT "LandRecord_talukaId_fkey" FOREIGN KEY ("talukaId") REFERENCES "Taluka"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandRecord" ADD CONSTRAINT "LandRecord_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "Village"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
