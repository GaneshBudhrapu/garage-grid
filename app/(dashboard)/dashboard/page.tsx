import StatsCard from "@/components/dashboard/stats-card";
import QuickActions from "@/components/dashboard/quick-actions";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground mt-1">
          Welcome back to Garage Grid
        </p>
      </div>

      <QuickActions />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Customers"
          value="248"
        />

        <StatsCard
          title="Services Today"
          value="12"
        />

        <StatsCard
          title="Pending Reminders"
          value="34"
        />

        <StatsCard
          title="Monthly Revenue"
          value="₹48,500"
        />
      </div>
    </div>
  );
}