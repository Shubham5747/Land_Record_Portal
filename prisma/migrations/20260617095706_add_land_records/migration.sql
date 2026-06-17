-- CreateTable
CREATE TABLE "LandRecord" (
    "id" SERIAL NOT NULL,
    "surveyNumber" TEXT NOT NULL,
    "districtId" INTEGER NOT NULL,
    "talukaId" INTEGER NOT NULL,
    "villageId" INTEGER NOT NULL,
    "ownerName" TEXT NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LandRecord_pkey" PRIMARY KEY ("id")
);
