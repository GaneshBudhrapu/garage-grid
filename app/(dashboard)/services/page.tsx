import { prisma } from "@/lib/prisma";

import ServiceForm from "@/components/services/service-form";
import ServicesTable from "@/components/services/services-table";

export default async function ServicesPage() {
  const customers =
    await prisma.customer.findMany({
      orderBy: {
        createdAt: "desc",
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

  const servicesWithItems =
    await Promise.all(
      services.map(
        async (service) => {
          const items =
            await prisma.serviceItem.findMany(
              {
                where: {
                  serviceId:
                    service.id,
                },
              }
            );

          return {
            ...service,
            serviceItems: items,
          };
        }
      )
    );

  return (
    <div className="space-y-6">
      <ServiceForm customers={customers} />

      <ServicesTable
        services={
          servicesWithItems
        }
      />
    </div>
  );
}