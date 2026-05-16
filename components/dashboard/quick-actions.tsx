import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function QuickActions() {
  return (
    <div className="flex flex-wrap gap-4">
      <Link href="/services">
        <Button>
          New Service
        </Button>
      </Link>

      <Link href="/customers">
        <Button variant="outline">
          Add Customer
        </Button>
      </Link>

      <Link href="/reminders">
        <Button variant="secondary">
          Send Reminders
        </Button>
      </Link>
    </div>
  );
}