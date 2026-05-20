import { Sidebar } from '@/components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto flex flex-col">
        <header className="bg-white shadow-sm border-b px-8 py-4 shrink-0">
          <h2 className="text-xl font-semibold text-gray-800">Smarter Training CMS Dashboard</h2>
        </header>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
