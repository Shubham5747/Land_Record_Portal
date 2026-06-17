import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.landRecord.updateMany({
    data: {
      khataNumber: "KH-1001",
      mutationNumber: "MUT-001",
      landType: "Agricultural",
      irrigationType: "Drip Irrigation",
      cropType: "Sugarcane",
    },
  });

  console.log("Land records updated");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });