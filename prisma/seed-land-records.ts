import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const village = await prisma.village.findFirst();

  if (!village) {
    console.log("No villages found");
    return;
  }

  await prisma.landRecord.createMany({
    data: [
      {
        surveyNumber: "101",
        ownerName: "Shubham Masale",
        area: 2.5,
        districtId: 1,
        talukaId: 1,
        villageId: village.id,
      },
      {
        surveyNumber: "102",
        ownerName: "Rahul Patil",
        area: 1.8,
        districtId: 1,
        talukaId: 1,
        villageId: village.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Land records inserted");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });