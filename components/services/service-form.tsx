"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Customer {
  id: string;
  name: string;
  bikeModel: string;
}

export default function ServiceForm({
  customers,
}: {
  customers: Customer[];
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const form = e.currentTarget;

    const formData = new FormData(form);

    const data = {
      customerId: formData.get("customerId"),
      currentKm: formData.get("currentKm"),
      notes: formData.get("notes"),
      labourCharge: formData.get("labourCharge"),
      partsCharge: formData.get("partsCharge"),
      partsUsed: formData.get("partsUsed"),
    };

    await fetch("/api/services", {
      method: "POST",
      body: JSON.stringify(data),
    });

    form.reset();

    router.refresh();

    toast.success("Service added");

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-xl"
    >
      <select
        name="customerId"
        className="w-full border rounded-lg p-3"
      >
        <option value="">
          Select Customer
        </option>

        {customers.map((customer) => (
          <option
            key={customer.id}
            value={customer.id}
          >
            {customer.name} -{" "}
            {customer.bikeModel}
          </option>
        ))}
      </select>

      <input
        name="currentKm"
        placeholder="Current KM"
        className="w-full border rounded-lg p-3"
      />

      <textarea
        name="notes"
        placeholder="Service Notes"
        className="w-full border rounded-lg p-3"
      />

      <input
        name="labourCharge"
        placeholder="Labour Charge"
        className="w-full border rounded-lg p-3"
      />

      <input
        name="partsCharge"
        placeholder="Parts Charge"
        className="w-full border rounded-lg p-3"
      />

      <input
        name="partsUsed"
        placeholder="Parts Used"
        className="w-full border rounded-lg p-3"
        />
    

      <button
        type="submit"
        className="bg-black text-white px-4 py-3 rounded-lg"
      >
        {loading
          ? "Saving..."
          : "Create Service"}
      </button>
    </form>
  );
}