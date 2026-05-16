import CustomerForm from "@/components/customers/customer-form";
import CustomerTable from "@/components/customers/customer-table";
import { prisma } from "@/lib/prisma";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Customers
        </h1>

        <p className="text-muted-foreground">
          Manage your garage customers
        </p>
      </div>

      <CustomerForm />

      <CustomerTable customers={customers} />
    </div>
  );
}