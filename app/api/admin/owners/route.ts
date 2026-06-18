import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const owners = await prisma.owner.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(owners);
}