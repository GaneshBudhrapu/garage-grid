import Link from "next/link";

interface Service {
  id: string;
  currentKm: number;
  totalAmount: number;
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
    <div className="grid gap-4">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">
                {service.customer.name}
              </h3>

              <p className="text-sm text-gray-500">
                {service.customer.bikeModel}
              </p>
            </div>

            <div className="text-sm text-gray-500">
              Invoice ID:{" "}
              <span className="font-medium text-black">
                {service.id.slice(0, 8)}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-sm">
            <div>
              <p className="text-gray-500">Current KM</p>
              <p className="font-medium">
                {service.currentKm}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Total</p>
              <p className="font-semibold text-black">
                ₹{service.totalAmount}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Next Service</p>
              <p className="font-medium">
                {new Date(
                  service.nextServiceDate
                ).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-5 gap-3">
            <div className="text-xs text-gray-400">
              Tap below to view full invoice details
            </div>

            <Link
              href={`/invoices/${service.id}`}
              className="bg-black text-white px-5 py-2.5 rounded-xl text-sm text-center hover:bg-gray-800 transition"
            >
              Open Invoice →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}