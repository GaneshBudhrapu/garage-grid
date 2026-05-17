import Sidebar from "./sidebar";

interface Props {
  children: React.ReactNode;
}

export default function DashboardShell({
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 to-zinc-200 md:flex">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 overflow-hidden">
        {children}
      </main>
    </div>
  );
}