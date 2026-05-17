import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const nextServiceDate =
      new Date();

    nextServiceDate.setMonth(
      nextServiceDate.getMonth() +
        3
    );

    const service =
      await prisma.service.create({
        data: {
          garageId:
            "demo-garage",

          customerId:
            body.customerId,

          currentKm: Number(
            body.currentKm
          ),

          nextServiceKm:
            Number(
              body.currentKm
            ) + 3000,

          serviceDate:
            new Date(),

          nextServiceDate,

          labourCharge: Number(
            body.labourCharge ||
              0
          ),

          totalAmount: Number(
            body.totalAmount ||
              0
          ),

          notes: "",
        },
      });

    if (
      body.services &&
      Array.isArray(
        body.services
      )
    ) {
      for (const item of body.services) {
        await prisma.serviceItem.create(
          {
            data: {
              serviceId:
                service.id,

              name:
                item.name,

              price: Number(
                item.price
              ),
            },
          }
        );
      }
    }

    return NextResponse.json(
      service
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to create service",
      },
      {
        status: 500,
      }
    );
  }
}