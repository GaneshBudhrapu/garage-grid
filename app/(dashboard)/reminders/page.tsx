import { prisma } from "@/lib/prisma";

export default async function RemindersPage() {
  const today = new Date();

  const dueServices =
    await prisma.service.findMany({
      where: {
        nextServiceDate: {
          lte: today,
        },
      },

      include: {
        customer: true,
      },

      orderBy: {
        nextServiceDate: "asc",
      },
    });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Reminders
        </h1>

        <p className="text-muted-foreground">
          Customers due for service
        </p>
      </div>

      <div className="space-y-4">
        {dueServices.length === 0 && (
          <div className="border rounded-xl p-6">
            No reminders due today.
          </div>
        )}

        {dueServices.map((service) => {
          const message =
            `Hello ${service.customer.name}, your bike service is due. Please visit Garage Grid for your next service.`;

          const whatsappLink =
            `https://wa.me/91${service.customer.phone}?text=${encodeURIComponent(
              message
            )}`;

          return (
            <div
              key={service.id}
              className="border rounded-xl p-6 flex items-center justify-between"
            >
              <div>
                <h2 className="font-semibold text-lg">
                  {service.customer.name}
                </h2>

                <p className="text-muted-foreground">
                  {service.customer.bikeModel}
                </p>

                <p className="mt-2 text-sm">
                  Due Date:{" "}
                  {new Date(
                    service.nextServiceDate
                  ).toLocaleDateString()}
                </p>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Send WhatsApp
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}