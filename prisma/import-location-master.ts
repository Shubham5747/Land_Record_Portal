import { PrismaClient } from "@prisma/client";
import * as XLSX from "xlsx";
import path from "path";

const prisma = new PrismaClient();

type LocationRow = {
  districtCode: number | string;
  DistrictName: string;
  MarathiDistrictName?: string;
  SubdistrictCode: number | string;
  SubdistrictName: string;
  MarathiSubDistrictName?: string;
  VillageCode: number | string;
  VillageName: string;
  MarathiVillageName?: string;
};

async function processFile(filePath: string) {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<LocationRow>(sheet);

  console.log(`Processing ${rows.length} rows from ${path.basename(filePath)}`);

  for (const row of rows) {
    const district = await prisma.district.upsert({
      where: {
        districtCode: Number(row.districtCode),
      },
      update: {},
      create: {
        districtCode: Number(row.districtCode),
        name: row.DistrictName,
        marathiName: row.MarathiDistrictName,
      },
    });

    const taluka = await prisma.taluka.upsert({
      where: {
        talukaCode: Number(row.SubdistrictCode),
      },
      update: {},
      create: {
        talukaCode: Number(row.SubdistrictCode),
        name: row.SubdistrictName,
        marathiName: row.MarathiSubDistrictName,
        districtId: district.id,
      },
    });

    await prisma.village.upsert({
      where: {
        villageCode: Number(row.VillageCode),
      },
      update: {},
      create: {
        villageCode: Number(row.VillageCode),
        name: row.VillageName,
        marathiName: row.MarathiVillageName,
        talukaId: taluka.id,
      },
    });
  }
}

async function main() {
  await processFile(
    path.join(process.cwd(), "data", "Villagepart1.xls")
  );

  await processFile(
    path.join(process.cwd(), "data", "Villagepart2.xls")
  );

  console.log("✅ Maharashtra master data import completed");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
