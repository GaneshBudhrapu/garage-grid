import { prisma } from "@/lib/prisma";
import ServiceForm from "@/components/services/service-form";
import ServiceTable from "@/components/services/service-table";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const customers = await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const services = await prisma.service.findMany({
    include: {
      customer: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Services
        </h1>

        <p className="text-gray-500 mt-1">
          Track all bike services
        </p>
      </div>

      <ServiceForm customers={customers} />

      <ServiceTable services={services} />
    </div>
  );
}