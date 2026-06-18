import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const record = await prisma.landRecord.findUnique({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(record);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();

  const record = await prisma.landRecord.update({
    where: {
      id: Number(id),
    },
    data: {
      surveyNumber: body.surveyNumber,
      khataNumber: body.khataNumber,
      mutationNumber: body.mutationNumber,

      area: Number(body.area),

      landType: body.landType,
      irrigationType: body.irrigationType,
      cropType: body.cropType,

      districtId: Number(body.districtId),
      talukaId: Number(body.talukaId),
      villageId: Number(body.villageId),

      ownerId: Number(body.ownerId),
    },
  });

  return NextResponse.json(record);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.landRecord.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    success: true,
  });
}