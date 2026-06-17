import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const record = await prisma.landRecord.findUnique({
    where: {
      id: Number(id),
    },

    include: {
      district: true,
      taluka: true,
      village: true,
    },
  });

  if (!record) {
    return NextResponse.json(
      { message: "Record not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(record);
}