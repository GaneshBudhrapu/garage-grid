import Link from "next/link";

interface Service {
  id: string;
  currentKm: number;
  totalAmount: number;
  nextServiceKm: number;
  nextServiceDate: Date;

  customer: {
    name: string;
    bikeModel: string;
  };
}

export default function ServiceTable({
  services,
}: {
  services: Service[];
}) {
  return (
    <div className="border rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="text-left p-4">
              Customer
            </th>

            <th className="text-left p-4">
              Bike
            </th>

            <th className="text-left p-4">
              KM
            </th>

            <th className="text-left p-4">
              Amount
            </th>

            <th className="text-left p-4">
              Next Service
            </th>

            <th className="text-left p-4">
              Invoice
            </th>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => (
            <tr
              key={service.id}
              className="border-t"
            >
              <td className="p-4">
                {service.customer.name}
              </td>

              <td className="p-4">
                {service.customer.bikeModel}
              </td>

              <td className="p-4">
                {service.currentKm}
              </td>

              <td className="p-4">
                ₹{service.totalAmount}
              </td>

              <td className="p-4">
                {new Date(
                  service.nextServiceDate
                ).toLocaleDateString()}
              </td>

              <td className="p-4">
                <Link
                  href={`/invoices/${service.id}`}
                  className="text-blue-600 underline"
                >
                  View Invoice
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}