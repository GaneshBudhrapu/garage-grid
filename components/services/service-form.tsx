"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Customer {
  id: string;
  name: string;
  bikeModel: string;
}

interface Props {
  customers: Customer[];
}

export default function ServiceForm({
  customers,
}: Props) {
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
      className="space-y-4 w-full"
    >
      <select
        name="customerId"
        required
        className="w-full border rounded-lg p-3 bg-white"
      >
        <option value="">
          Select Customer
        </option>

        {customers.map((customer) => (
          <option
            key={customer.id}
            value={customer.id}
          >
            {customer.name} - {customer.bikeModel}
          </option>
        ))}
      </select>

      <input
        name="currentKm"
        type="number"
        placeholder="Current KM"
        required
        className="w-full border rounded-lg p-3 bg-white"
      />

      <input
        name="partsUsed"
        placeholder="Parts Used"
        className="w-full border rounded-lg p-3 bg-white"
      />

      <textarea
        name="notes"
        placeholder="Service Notes"
        className="w-full border rounded-lg p-3 bg-white"
      />

      <input
        name="labourCharge"
        type="number"
        placeholder="Labour Charge"
        required
        className="w-full border rounded-lg p-3 bg-white"
      />

      <input
        name="partsCharge"
        type="number"
        placeholder="Parts Charge"
        required
        className="w-full border rounded-lg p-3 bg-white"
      />

      <button
        type="submit"
        className="w-full md:w-auto bg-black text-white px-6 py-3 rounded-lg"
      >
        {loading
          ? "Saving..."
          : "Create Service"}
      </button>
    </form>
  );
}