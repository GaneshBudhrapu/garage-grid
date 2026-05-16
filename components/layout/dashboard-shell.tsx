import Sidebar from "./sidebar";

interface Props {
  children: React.ReactNode;
}

export default function DashboardShell({
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      <Sidebar />

      <main className="flex-1 p-4 md:p-6 overflow-x-auto">
        {children}
      </main>
    </div>
  );
}