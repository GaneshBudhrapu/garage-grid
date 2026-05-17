"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

interface Props {
  services: any[];
}

export default function ServicesTable({
  services,
}: Props) {
  if (services.length === 0) {
    return (
      <div className="bg-white rounded-3xl border p-10 text-center">
        <h2 className="text-xl font-semibold">
          No Services Yet
        </h2>

        <p className="text-zinc-500 mt-2">
          Create your first service
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-white rounded-3xl border p-5 shadow-sm"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div className="space-y-3">
              <div>
                <h2 className="text-lg font-semibold">
                  {service.customer.name}
                </h2>

                <p className="text-sm text-zinc-500">
                  {
                    service.customer
                      .bikeModel
                  }{" "}
                  •{" "}
                  {
                    service.customer
                      .bikeNumber
                  }
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {service.serviceItems.map(
                  (item: any) => (
                    <div
                      key={item.id}
                      className="bg-zinc-100 text-sm px-3 py-1 rounded-full"
                    >
                      {item.name} • ₹
                      {item.price}
                    </div>
                  )
                )}
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-zinc-500">
                <p>
                  KM:{" "}
                  <span className="font-medium text-black">
                    {
                      service.currentKm
                    }
                  </span>
                </p>

                <p>
                  Labour:{" "}
                  <span className="font-medium text-black">
                    ₹
                    {
                      service.labourCharge
                    }
                  </span>
                </p>

                <p>
                  Date:{" "}
                  <span className="font-medium text-black">
                    {new Date(
                      service.createdAt
                    )
                      .toISOString()
                      .split("T")[0]}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between lg:flex-col lg:items-end gap-4">
              <div>
                <p className="text-sm text-zinc-500">
                  Total
                </p>

                <p className="text-3xl font-bold">
                  ₹
                  {
                    service.totalAmount
                  }
                </p>
              </div>

              <Link
                href={`/services/${service.id}`}
                className="bg-black text-white px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-zinc-800 transition"
              >
                <Eye size={18} />
                View Invoice
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}