import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const records = await prisma.landRecord.findMany({
    include: {
      district: true,
      taluka: true,
      village: true,
      owner: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json(records);
}