import { prisma } from "@/lib/prisma";
import CustomerForm from "@/components/customers/customer-form";
import CustomerTable from "@/components/customers/customer-table";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Customers
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your garage customers
        </p>
      </div>

      <CustomerForm />

      <CustomerTable customers={customers} />
    </div>
  );
}