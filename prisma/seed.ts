import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const districts = [
  "Ahmednagar",
  "Akola",
  "Amravati",
  "Aurangabad",
  "Beed",
  "Bhandara",
  "Buldhana",
  "Chandrapur",
  "Dhule",
  "Gadchiroli",
  "Gondia",
  "Hingoli",
  "Jalgaon",
  "Jalna",
  "Kolhapur",
  "Latur",
  "Mumbai City",
  "Mumbai Suburban",
  "Nagpur",
  "Nanded",
  "Nandurbar",
  "Nashik",
  "Osmanabad",
  "Palghar",
  "Parbhani",
  "Pune",
  "Raigad",
  "Ratnagiri",
  "Sangli",
  "Satara",
  "Sindhudurg",
  "Solapur",
  "Thane",
  "Wardha",
  "Washim",
  "Yavatmal"
];

async function main() {
  for (const district of districts) {
    await prisma.district.upsert({
      where: { name: district },
      update: {},
      create: { name: district },
    });
  }

  console.log("Districts imported");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });