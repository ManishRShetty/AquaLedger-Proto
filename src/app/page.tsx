'use client';

import { CatchLogger } from '@/components/catch/CatchLogger';
import { CatchList } from '@/components/catch/CatchList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 sm:p-24 bg-gradient-to-b from-black to-zinc-950 font-body">


      <CatchLogger />
      <CatchList />
    </main>
  );
}
