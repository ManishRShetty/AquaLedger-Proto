'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SyncStatus } from "@/components/ui/SyncStatus";
import { Logo } from "@/components/icons"; // Assuming Logo exists from previous layout

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 bg-black/50 backdrop-blur-xl">
            <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-8">
                {/* Left: Branding */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="p-2 bg-indigo-500/20 rounded-xl group-hover:bg-indigo-500/30 transition-colors">
                        <Logo className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-lg text-white tracking-tight leading-tight">AquaLedger</span>
                        <span className="text-[10px] text-zinc-500 font-mono hidden sm:block">OFFLINE FIRST PWA</span>
                    </div>
                </Link>

                {/* Right: Sync Status & Actions */}
                <div className="flex items-center gap-4">
                    <SyncStatus variant="inline" />

                    {/* Profile Placeholder (Future) */}
                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-xs text-zinc-400 font-medium">
                        JD
                    </div>
                </div>
            </div>
        </nav>
    );
}
