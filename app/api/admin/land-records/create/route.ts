import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const record = await prisma.landRecord.create({
      data: {
        surveyNumber: body.surveyNumber,
        khataNumber: body.khataNumber,
        mutationNumber: body.mutationNumber,

        ownerName: body.ownerName,

        area: Number(body.area),

        landType: body.landType,
        irrigationType: body.irrigationType,
        cropType: body.cropType,

        districtId: Number(body.districtId),
        talukaId: Number(body.talukaId),
        villageId: Number(body.villageId),

        ownerId: body.ownerId
          ? Number(body.ownerId)
          : null,
      },
    });

    return NextResponse.json(record);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create record" },
      { status: 500 }
    );
  }
}