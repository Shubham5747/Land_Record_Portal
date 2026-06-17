import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const districtId = Number(
    request.nextUrl.searchParams.get("districtId")
  );

  const talukaId = Number(
    request.nextUrl.searchParams.get("talukaId")
  );

  const villageId = Number(
    request.nextUrl.searchParams.get("villageId")
  );

  const surveyNo =
    request.nextUrl.searchParams.get("surveyNo") || "";

  const records = await prisma.landRecord.findMany({
    where: {
      districtId,
      talukaId,
      villageId,

      ...(surveyNo && {
        surveyNumber: {
          contains: surveyNo,
        },
      }),
    },

    include: {
      district: true,
      taluka: true,
      village: true,
    },
  });

  return NextResponse.json(records);
}