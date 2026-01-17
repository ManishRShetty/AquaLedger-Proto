'use client';

import { CatchLogger } from '@/components/catch/CatchLogger';
import { CatchList } from '@/components/catch/CatchList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start space-y-12 pb-24">
      <div className="w-full max-w-2xl space-y-8">
        <header className="text-center space-y-4 pt-32">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
            Sustainable Catch Logging
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Record your catches, analyze sustainability, and track your ecological impact with AI-powered insights.
          </p>
        </header>

        <div className="bg-white/60 backdrop-blur-md rounded-[2rem] p-1.5 border border-white/60 shadow-apple w-full max-w-md mx-auto transition-all hover:shadow-xl">
          <CatchLogger />
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200/60" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-2 text-sm text-muted-foreground uppercase tracking-widest font-medium">Recent Activity</span>
          </div>
        </div>

        <CatchList />
      </div>
    </main>
  );
}
