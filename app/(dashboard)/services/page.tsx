import ServiceForm from "@/components/services/service-form";
import ServiceTable from "@/components/services/service-table";

import { prisma } from "@/lib/prisma";

export default async function ServicesPage() {
  const customers =
    await prisma.customer.findMany({
      orderBy: {
        name: "asc",
      },
    });

  const services =
    await prisma.service.findMany({
      include: {
        customer: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Services
        </h1>

        <p className="text-muted-foreground">
          Create and manage bike services
        </p>
      </div>

      <ServiceForm customers={customers} />

      <ServiceTable services={services} />
    </div>
  );
}