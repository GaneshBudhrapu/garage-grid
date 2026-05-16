import Link from "next/link";

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
  {
    name: "Invoices",
    href: "/invoices",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">
        Garage Grid
      </h1>

      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-lg px-4 py-2 hover:bg-gray-100"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}