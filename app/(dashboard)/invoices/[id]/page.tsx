import { prisma } from "@/lib/prisma";
import PrintButton from "@/components/invoices/print-button";

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
    return <div>Invoice not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white">
      <div className="border rounded-2xl p-8 space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">
              Garage Grid
            </h1>

            <p className="text-muted-foreground">
              Bike Service Invoice
            </p>
          </div>

          <div className="text-right">
            <p className="font-semibold">
              Invoice ID
            </p>

            <p className="text-sm text-muted-foreground">
              {service.id.slice(0, 8)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold mb-2">
              Customer Details
            </h2>

            <div className="space-y-1 text-sm">
              <p>{service.customer.name}</p>

              <p>{service.customer.phone}</p>

              <p>
                {service.customer.bikeModel}
              </p>

              <p>
                {service.customer.bikeNumber}
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-2">
              Service Details
            </h2>

            <div className="space-y-1 text-sm">
              <p>
                Current KM:{" "}
                {service.currentKm}
              </p>

              <p>
                Next Service KM:{" "}
                {service.nextServiceKm}
              </p>

              <p>
                Next Service Date:{" "}
                {new Date(
                  service.nextServiceDate
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-4">
            Charges
          </h2>

          <div className="border rounded-xl overflow-hidden">
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="p-4">
                    Labour Charge
                  </td>

                  <td className="p-4 text-right">
                    ₹{service.labourCharge}
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-4">
                    Parts Charge
                  </td>

                  <td className="p-4 text-right">
                    ₹{service.partsCharge}
                  </td>
                </tr>

                <tr className="font-bold">
                  <td className="p-4">
                    Total
                  </td>

                  <td className="p-4 text-right">
                    ₹{service.totalAmount}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {service.notes && (
          <div>
            <h2 className="font-semibold mb-2">
              Notes
            </h2>

            <p className="text-sm text-muted-foreground">
              {service.notes}
            </p>
          </div>
        )}

        <PrintButton />
      </div>
    </div>
  );
}