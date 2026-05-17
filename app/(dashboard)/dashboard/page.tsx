import { prisma } from "@/lib/prisma";
import {
  Users,
  Wrench,
  IndianRupee,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const customers =
    await prisma.customer.count();

  const services =
    await prisma.service.count();

  const revenueData =
    await prisma.service.aggregate({
      _sum: {
        totalAmount: true,
      },
    });

  const revenue =
    revenueData._sum.totalAmount || 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Dashboard
        </h1>

        <p className="text-zinc-500 mt-2">
          Welcome back to Garage Grid
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-sm">
                Total Customers
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {customers}
              </h2>
            </div>

            <div className="bg-blue-100 p-4 rounded-2xl">
              <Users className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-sm">
                Total Services
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {services}
              </h2>
            </div>

            <div className="bg-orange-100 p-4 rounded-2xl">
              <Wrench className="text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-black text-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-400 text-sm">
                Total Revenue
              </p>

              <h2 className="text-4xl font-bold mt-3">
                ₹{revenue}
              </h2>
            </div>

            <div className="bg-zinc-800 p-4 rounded-2xl">
              <IndianRupee />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}