import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const talukaId = Number(
    request.nextUrl.searchParams.get("talukaId")
  );

  if (!talukaId) {
    return NextResponse.json([]);
  }

  const villages = await prisma.village.findMany({
    where: {
      talukaId,
    },
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
    },
  });

  return NextResponse.json(villages);
}