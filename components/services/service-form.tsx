"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Customer {
  id: string;
  name: string;
  bikeModel: string;
}

interface Props {
  customers: Customer[];
}

interface SelectedService {
  id: number;
  name: string;
  price: number;
}

const SERVICE_PRESETS = [
  {
    name: "Engine Oil Change",
    defaultPrice: 300,
  },
  {
    name: "Brake Cleaning",
    defaultPrice: 250,
  },
  {
    name: "Chain Lubrication",
    defaultPrice: 150,
  },
  {
    name: "Air Filter Cleaning",
    defaultPrice: 200,
  },
  {
    name: "Coolant Topup",
    defaultPrice: 300,
  },
  {
    name: "Bike Wash",
    defaultPrice: 150,
  },
  {
    name: "Brake Pad Replacement",
    defaultPrice: 500,
  },
  {
    name: "Spark Plug Change",
    defaultPrice: 250,
  },
  {
    name: "Clutch Adjustment",
    defaultPrice: 350,
  },
  {
    name: "Battery Check",
    defaultPrice: 200,
  },
];

export default function ServiceForm({
  customers,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [selectedServices, setSelectedServices] =
    useState<SelectedService[]>([]);

  const [customServiceName, setCustomServiceName] =
    useState("");

  const [customServicePrice, setCustomServicePrice] =
    useState(0);

  const [labourCharge, setLabourCharge] =
    useState(0);

  const servicesTotal = useMemo(() => {
    return selectedServices.reduce(
      (total, service) =>
        total + Number(service.price),
      0
    );
  }, [selectedServices]);

  const totalAmount = useMemo(() => {
    return (
      servicesTotal +
      Number(labourCharge)
    );
  }, [
    servicesTotal,
    labourCharge,
  ]);

  function toggleService(
    service: {
      name: string;
      defaultPrice: number;
    }
  ) {
    const exists =
      selectedServices.find(
        (item) =>
          item.name === service.name
      );

    if (exists) {
      setSelectedServices((prev) =>
        prev.filter(
          (item) =>
            item.name !== service.name
        )
      );

      return;
    }

    setSelectedServices((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: service.name,
        price: service.defaultPrice,
      },
    ]);
  }

  function addCustomService() {
    if (
      !customServiceName ||
      !customServicePrice
    ) {
      toast.error(
        "Enter custom service and price"
      );

      return;
    }

    const newService: SelectedService = {
      id: Date.now(),
      name: customServiceName,
      price: Number(customServicePrice),
    };

    setSelectedServices((prev) => [
      ...prev,
      newService,
    ]);

    setCustomServiceName("");

    setCustomServicePrice(0);
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const form = e.currentTarget;

    const formData = new FormData(form);

    const currentKm = Number(
      formData.get("currentKm")
    );

    if (currentKm <= 0) {
      toast.error(
        "Please enter valid KM"
      );

      setLoading(false);

      return;
    }

    if (selectedServices.length === 0) {
      toast.error(
        "Select at least one service"
      );

      setLoading(false);

      return;
    }

    const data = {
  customerId:
    formData.get("customerId"),

  currentKm,

  labourCharge: Number(
    labourCharge
  ),

  totalAmount,

  services: selectedServices.map(
    (service) => ({
      name: service.name,
      price: service.price,
    })
  ),
};

    const response = await fetch(
      "/api/services",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      toast.error(
        "Failed to create service"
      );

      setLoading(false);

      return;
    }

    form.reset();

    setSelectedServices([]);

    setLabourCharge(0);

    router.refresh();

    toast.success(
      "Service created successfully"
    );

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="bg-white rounded-3xl border p-6 shadow-sm">
        <div>
          <h2 className="text-2xl font-semibold">
            Create Service
          </h2>

          <p className="text-zinc-500 text-sm mt-1">
            Fast service entry for garage owners
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="text-sm font-medium block mb-2">
              Customer
            </label>

            <select
              name="customerId"
              required
              className="w-full border rounded-2xl p-3 bg-white"
            >
              <option value="">
                Select Customer
              </option>

              {customers.map((customer) => (
                <option
                  key={customer.id}
                  value={customer.id}
                >
                  {customer.name} —{" "}
                  {customer.bikeModel}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">
              Current KM
            </label>

            <input
              name="currentKm"
              type="number"
              required
              placeholder="Enter current KM"
              className="w-full border rounded-2xl p-3"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-semibold">
              Select Services
            </h3>

            <p className="text-sm text-zinc-500 mt-1">
              Tap services to add them
            </p>
          </div>

          <div className="bg-black text-white px-4 py-2 rounded-2xl text-sm font-medium">
            ₹{servicesTotal}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SERVICE_PRESETS.map((service) => {
            const active =
              selectedServices.find(
                (item) =>
                  item.name === service.name
              );

            return (
              <button
                key={service.name}
                type="button"
                onClick={() =>
                  toggleService(service)
                }
                className={`rounded-2xl border p-4 text-left transition ${
                  active
                    ? "bg-black text-white border-black"
                    : "bg-white hover:bg-zinc-50"
                }`}
              >
                <p className="font-medium text-sm">
                  {service.name}
                </p>

                <p
                  className={`text-xs mt-2 ${
                    active
                      ? "text-zinc-300"
                      : "text-zinc-500"
                  }`}
                >
                  ₹
                  {service.defaultPrice}
                </p>
              </button>
            );
          })}
        </div>

        <div className="bg-zinc-50 border rounded-3xl p-5 mt-6">
          <div className="mb-4">
            <h3 className="font-semibold">
              Add Custom Service
            </h3>

            <p className="text-sm text-zinc-500 mt-1">
              Add services not available above
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            <input
              value={customServiceName}
              onChange={(e) =>
                setCustomServiceName(
                  e.target.value
                )
              }
              placeholder="Custom Service Name"
              className="border rounded-2xl p-3 bg-white"
            />

            <input
              type="number"
              value={customServicePrice}
              onChange={(e) =>
                setCustomServicePrice(
                  Number(e.target.value)
                )
              }
              placeholder="Service Price"
              className="border rounded-2xl p-3 bg-white"
            />

            <button
              type="button"
              onClick={addCustomService}
              className="bg-black text-white rounded-2xl px-5 py-3"
            >
              Add Service
            </button>
          </div>
        </div>

        {selectedServices.length > 0 && (
          <div className="space-y-3 mt-6">
            {selectedServices.map(
              (service, index) => (
                <div
                  key={service.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-zinc-50 border rounded-2xl p-4"
                >
                  <div>
                    <p className="font-medium">
                      {service.name}
                    </p>

                    <p className="text-sm text-zinc-500">
                      Service Price
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={service.price}
                      onChange={(e) => {
                        const updated = [
                          ...selectedServices,
                        ];

                        updated[index].price =
                          Number(
                            e.target.value
                          );

                        setSelectedServices(
                          updated
                        );
                      }}
                      className="border rounded-xl px-3 py-2 w-32"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedServices(
                          selectedServices.filter(
                            (item) =>
                              item.id !==
                              service.id
                          )
                        )
                      }
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl border p-6 shadow-sm">
        <div>
          <h3 className="text-lg font-semibold">
            Labour Charges
          </h3>

          <p className="text-sm text-zinc-500 mt-1">
            Additional garage labour cost
          </p>
        </div>

        <input
          type="number"
          placeholder="Enter labour amount"
          value={labourCharge}
          onChange={(e) =>
            setLabourCharge(
              Number(e.target.value)
            )
          }
          className="w-full border rounded-2xl p-3 mt-5"
        />
      </div>

      <div className="bg-black text-white rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-zinc-300">
            Services Total
          </p>

          <p className="font-semibold">
            ₹{servicesTotal}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-zinc-300">
            Labour Charges
          </p>

          <p className="font-semibold">
            ₹{labourCharge}
          </p>
        </div>

        <div className="border-t border-zinc-700 pt-4 flex items-center justify-between">
          <p className="text-lg font-medium">
            Grand Total
          </p>

          <p className="text-4xl font-bold">
            ₹{totalAmount}
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white rounded-2xl py-4 font-medium hover:bg-zinc-800 transition"
      >
        {loading
          ? "Saving Service..."
          : "Create Service"}
      </button>
    </form>
  );
}