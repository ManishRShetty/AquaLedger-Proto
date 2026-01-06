import { Navbar } from "@/components/layout/Navbar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col font-sans text-zinc-100 selection:bg-indigo-500/30">
      <Navbar />
      <main className="flex-1 pt-16">
        {children}
      </main>
    </div>
  );
}
