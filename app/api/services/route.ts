import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const nextServiceDate = new Date();

  nextServiceDate.setMonth(
    nextServiceDate.getMonth() + 3
  );

  const service = await prisma.service.create({
    data: {
      garageId: "demo-garage",

      customerId: body.customerId,

      currentKm: Number(body.currentKm),

      nextServiceKm:
        Number(body.currentKm) + 3000,

      serviceDate: new Date(),

      nextServiceDate,

      notes: body.notes,

      labourCharge: Number(body.labourCharge),

      partsCharge: Number(body.partsCharge),

      partsUsed: body.partsUsed,

      totalAmount:
        Number(body.labourCharge) +
        Number(body.partsCharge),
    },
  });

  return NextResponse.json(service);
}