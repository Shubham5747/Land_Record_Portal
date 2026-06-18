import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const owner = await prisma.owner.create({
    data: {
      name: "Shubham Masale",
      mobile: "8668577813",
      address: "Pune, Maharashtra",
    },
  });

  await prisma.landRecord.update({
    where: {
      id: 1,
    },
    data: {
      ownerId: owner.id,
    },
  });

  await prisma.mutation.createMany({
    data: [
      {
        mutationNumber: "MUT-001",
        mutationDate: new Date("2025-01-12"),
        remarks: "Ownership Transfer",
        landRecordId: 1,
      },
      {
        mutationNumber: "MUT-002",
        mutationDate: new Date("2025-02-20"),
        remarks: "Area Correction",
        landRecordId: 1,
      },
    ],
  });

  console.log("Owner and mutations added");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });