import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const [
    landRecords,
    owners,
    mutations,
    districts,
    talukas,
    villages,
  ] = await Promise.all([
    prisma.landRecord.count(),
    prisma.owner.count(),
    prisma.mutation.count(),
    prisma.district.count(),
    prisma.taluka.count(),
    prisma.village.count(),
  ]);

  return NextResponse.json({
    landRecords,
    owners,
    mutations,
    districts,
    talukas,
    villages,
  });
}