"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CustomerForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const form = e.currentTarget;

    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      bikeModel: formData.get("bikeModel"),
      bikeNumber: formData.get("bikeNumber"),
    };

    await fetch("/api/customers", {
      method: "POST",
      body: JSON.stringify(data),
    });

    form.reset();

    router.refresh();

    toast.success("Customer added successfully");

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg"
    >
      <input
        name="name"
        placeholder="Customer Name"
        className="w-full border rounded-lg p-3"
      />

      <input
        name="phone"
        placeholder="Phone Number"
        className="w-full border rounded-lg p-3"
      />

      <input
        name="bikeModel"
        placeholder="Bike Model"
        className="w-full border rounded-lg p-3"
      />

      <input
        name="bikeNumber"
        placeholder="Bike Number"
        className="w-full border rounded-lg p-3"
      />

      <button
        type="submit"
        className="bg-black text-white px-4 py-3 rounded-lg"
      >
        {loading ? "Saving..." : "Add Customer"}
      </button>
    </form>
  );
}