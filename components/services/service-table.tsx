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

interface Props {
  services: Service[];
}

export default function ServiceTable({
  services,
}: Props) {
  return (
    <div className="grid gap-4">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-white rounded-2xl p-5 border shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg">
                {service.customer.name}
              </h3>

              <p className="text-zinc-500 text-sm">
                {service.customer.bikeModel}
              </p>
            </div>

            <div className="grid grid-cols-2 md:flex gap-4 text-sm">
              <div>
                <p className="text-zinc-500">
                  KM
                </p>

                <p className="font-medium">
                  {service.currentKm}
                </p>
              </div>

              <div>
                <p className="text-zinc-500">
                  Amount
                </p>

                <p className="font-medium">
                  ₹{service.totalAmount}
                </p>
              </div>

              <div>
                <p className="text-zinc-500">
                  Next Service
                </p>

                <p className="font-medium">
                  {new Date(
                    service.nextServiceDate
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            <Link
              href={`/invoices/${service.id}`}
              className="bg-black text-white px-4 py-2 rounded-xl text-center"
            >
              View Invoice
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}