'use client';

import { CatchLogger } from '@/components/catch/CatchLogger';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-950">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-white">AquaLedger</h1>
          <p className="text-zinc-400">Offline-First Sustainable Catch Logger</p>
        </div>

        <CatchLogger />
      </div>
    </main>
  );
}
