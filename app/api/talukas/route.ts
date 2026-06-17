import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const districtId = Number(
    request.nextUrl.searchParams.get("districtId")
  );

  const talukas = await prisma.taluka.findMany({
    where: {
      districtId: districtId,
    },
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(talukas);
}