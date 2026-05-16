"use client";

import { useState } from "react";
import CustomerSearch from "./customer-search";

interface Customer {
  id: string;
  name: string;
  phone: string;
  bikeModel: string;
  bikeNumber: string;
}

interface Props {
  customers: Customer[];
}

export default function CustomerTable({
  customers,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.phone.includes(search) ||
      customer.bikeNumber
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <CustomerSearch
        value={search}
        onChange={setSearch}
      />

      <div className="grid gap-4">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-2xl p-5 border shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg">
                  {customer.name}
                </h3>

                <p className="text-zinc-500 text-sm mt-1">
                  {customer.phone}
                </p>
              </div>

              <div className="text-right">
                <p className="font-medium">
                  {customer.bikeModel}
                </p>

                <p className="text-sm text-zinc-500">
                  {customer.bikeNumber}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}