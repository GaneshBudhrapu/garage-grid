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

export default function CustomerTable({
  customers,
}: {
  customers: Customer[];
}) {
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

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Phone
              </th>

              <th className="text-left p-4">
                Bike
              </th>

              <th className="text-left p-4">
                Number
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="border-t"
              >
                <td className="p-4">
                  {customer.name}
                </td>

                <td className="p-4">
                  {customer.phone}
                </td>

                <td className="p-4">
                  {customer.bikeModel}
                </td>

                <td className="p-4">
                  {customer.bikeNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}