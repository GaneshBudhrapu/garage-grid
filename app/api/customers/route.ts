import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const customers = await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(customers);
}

export async function POST(req: Request) {
  const body = await req.json();

  const customer = await prisma.customer.create({
    data: {
      garageId: "demo-garage",
      name: body.name,
      phone: body.phone,
      bikeModel: body.bikeModel,
      bikeNumber: body.bikeNumber,
    },
  });

  return NextResponse.json(customer);
}