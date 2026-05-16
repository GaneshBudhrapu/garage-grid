"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Wrench,
  Bell,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    name: "Services",
    href: "/services",
    icon: Wrench,
  },
  {
    name: "Reminders",
    href: "/reminders",
    icon: Bell,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-72 bg-zinc-950 text-white md:min-h-screen shrink-0">
      <div className="p-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold">
          Garage Grid
        </h1>

        <p className="text-zinc-400 text-sm mt-1">
          Garage Management System
        </p>
      </div>

      <nav className="p-4 flex md:flex-col gap-2 overflow-x-auto">
        {links.map((link) => {
          const active = pathname === link.href;

          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl whitespace-nowrap transition ${
                active
                  ? "bg-white text-black"
                  : "hover:bg-zinc-900"
              }`}
            >
              <Icon size={18} />

              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}