-- AlterTable
ALTER TABLE "LandRecord" ADD COLUMN     "ownerId" INTEGER;

-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mutation" (
    "id" SERIAL NOT NULL,
    "mutationNumber" TEXT NOT NULL,
    "mutationDate" TIMESTAMP(3) NOT NULL,
    "remarks" TEXT,
    "landRecordId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mutation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LandRecord" ADD CONSTRAINT "LandRecord_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mutation" ADD CONSTRAINT "Mutation_landRecordId_fkey" FOREIGN KEY ("landRecordId") REFERENCES "LandRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
