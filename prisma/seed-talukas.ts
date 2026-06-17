import { PrismaClient } from "@prisma/client";
import { talukas } from "../data/talukas";

const prisma = new PrismaClient();

async function main() {
  for (const [districtName, talukaList] of Object.entries(talukas)) {

    const district = await prisma.district.findFirst({
      where: {
        name: districtName.replace("_", " "),
      },
    });

    if (!district) {
      console.log(`District not found: ${districtName}`);
      continue;
    }

    for (const talukaName of talukaList) {

      await prisma.taluka.upsert({
  where: {
    name_districtId: {
      name: talukaName,
      districtId: district.id,
    },
  },
  update: {},
  create: {
    name: talukaName,
    districtId: district.id,
  },
});

    }
  }

  console.log("Talukas imported successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });