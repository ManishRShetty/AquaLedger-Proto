'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SyncStatus } from "@/components/ui/SyncStatus";
import { Logo } from "@/components/icons"; // Assuming Logo exists from previous layout

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/10 bg-zinc-950/90 backdrop-blur-xl shadow-lg">
            <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6">
                {/* Left: Branding (Large Target) */}
                <Link href="/" className="flex items-center gap-4 group p-2 -ml-2 rounded-xl active:bg-white/10 transition-colors">
                    <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                        <Logo className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-xl text-white tracking-tight">AquaLedger</span>
                        <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Offline Mode</span>
                    </div>
                </Link>

                {/* Right: Status (High Visibility) */}
                <div className="flex items-center gap-4">
                    <div className="transform scale-110">
                        <SyncStatus variant="inline" />
                    </div>
                </div>
            </div>
        </nav>
    );
}
