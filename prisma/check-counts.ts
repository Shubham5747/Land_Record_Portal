import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(
    "Districts:",
    await prisma.district.count()
  );

  console.log(
    "Talukas:",
    await prisma.taluka.count()
  );

  console.log(
    "Villages:",
    await prisma.village.count()
  );
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });