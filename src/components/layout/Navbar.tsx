'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SyncStatus } from "@/components/ui/SyncStatus";
import Image from "next/image";

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-4 left-4 right-4 sm:left-8 sm:right-8 z-50 h-16 rounded-2xl glass shadow-apple transition-all duration-300">
            <div className="h-full px-4 sm:px-6 flex items-center justify-between">
                {/* Left: Branding */}
                <Link href="/" className="flex items-center  group">
                    <div className="p-2 -brand rounded-xl group-hover:scale-105 transition-transform duration-300">
                        <Image src="/logo.png" alt="Logo" width={32} height={32} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-lg text-foreground tracking-tight leading-none group-hover:text-teal-600 transition-colors">AquaLedger</span>
                    </div>
                </Link>

                {/* Right: Status */}
                <div className="flex items-center gap-4">
                    <SyncStatus variant="inline" />
                </div>
            </div>
        </nav>
    );
}
