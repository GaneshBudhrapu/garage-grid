import { prisma } from "@/lib/prisma";
import Link from "next/link";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function InvoicePage({
  params,
}: Props) {
  const { id } = await params;

  const service =
    await prisma.service.findUnique({
      where: {
        id,
      },

      include: {
        customer: true,
      },
    });

  if (!service) {
    return (
      <div className="p-10">
        Service not found
      </div>
    );
  }

  const items =
    await prisma.serviceItem.findMany(
      {
        where: {
          serviceId: id,
        },
      }
    );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Invoice
            </h1>

            <p className="text-zinc-500 mt-1">
              Service Summary
            </p>
          </div>

          <Link
            href="/services"
            className="bg-black text-white px-5 py-3 rounded-2xl"
          >
            Back
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6 border-b pb-6">
          <div>
            <h2 className="font-semibold text-lg mb-3">
              Customer Details
            </h2>

            <div className="space-y-2 text-zinc-600">
              <p>
                {
                  service.customer
                    .name
                }
              </p>

              <p>
                {
                  service.customer
                    .phone
                }
              </p>

              <p>
                {
                  service.customer
                    .bikeModel
                }
              </p>

              <p>
                {
                  service.customer
                    .bikeNumber
                }
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-3">
              Service Info
            </h2>

            <div className="space-y-2 text-zinc-600">
              <p>
                Current KM:{" "}
                {
                  service.currentKm
                }
              </p>

              <p>
                Next Service KM:{" "}
                {
                  service.nextServiceKm
                }
              </p>

              <p>
                Date:{" "}
                {new Date(
                  service.createdAt
                )
                  .toISOString()
                  .split("T")[0]}
              </p>
            </div>
          </div>
        </div>

        <div className="py-6">
          <h2 className="font-semibold text-lg mb-5">
            Services
          </h2>

          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-zinc-50 rounded-2xl p-4"
              >
                <p className="font-medium">
                  {item.name}
                </p>

                <p className="font-semibold">
                  ₹{item.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-zinc-500">
              Labour Charge
            </p>

            <p>
              ₹
              {
                service.labourCharge
              }
            </p>
          </div>

          <div className="flex items-center justify-between text-2xl font-bold">
            <p>Total</p>

            <p>
              ₹
              {
                service.totalAmount
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}