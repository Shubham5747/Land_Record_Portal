import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const districts = await prisma.district.findMany({
    orderBy: {
      name: "asc",
    },
  });

  console.table(
    districts.map((d) => ({
      code: d.districtCode,
      name: d.name,
    }))
  );
}

main().finally(async () => {
  await prisma.$disconnect();
});