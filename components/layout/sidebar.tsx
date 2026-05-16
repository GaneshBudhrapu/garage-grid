"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Customers",
    href: "/customers",
  },
  {
    name: "Services",
    href: "/services",
  },
  {
    name: "Reminders",
    href: "/reminders",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 border-b md:border-r bg-white md:min-h-screen p-4 shrink-0">
      <h1 className="text-2xl font-bold mb-4 md:mb-8">
        Garage Grid
      </h1>

      <nav className="flex md:flex-col gap-2 overflow-x-auto">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2 whitespace-nowrap transition ${
                active
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}