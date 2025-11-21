import Sidebar from "./Sidebar";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 ml-64">
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
