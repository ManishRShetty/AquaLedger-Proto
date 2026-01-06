'use client';

import { useSyncLoop } from '@/hooks/useSyncLoop';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, RefreshCw, AlertCircle } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';

interface SyncStatusProps {
    variant?: 'inline' | 'fixed';
}

export function SyncStatus({ variant = 'fixed' }: SyncStatusProps) {
    const { isOnline, isSyncing } = useSyncLoop();

    // Check for any pending/error items in DB to show amber/red status
    // useLiveQuery makes this reactive to DB changes
    const statusCounts = useLiveQuery(async () => {
        const pending = await db.catches.where('syncStatus').equals('pending').count();
        const error = await db.catches.where('syncStatus').equals('error').count();
        return { pending, error };
    }) || { pending: 0, error: 0 };

    // Variant Prop: inline (Navbar) or fixed (Floating)
    const containerClass = variant === 'fixed'
        ? "fixed top-4 right-4 z-50 flex items-center gap-2"
        : "flex items-center gap-2";

    const hasPending = statusCounts.pending > 0;
    const hasError = statusCounts.error > 0;

    // Determine Visual State
    // Priority: Error > Syncing > Pending > Online(Synced)
    let state: 'error' | 'syncing' | 'pending' | 'synced' | 'offline' = 'synced';

    if (!isOnline) {
        state = hasPending ? 'pending' : 'offline';
    } else if (hasError) {
        state = 'error';
    } else if (isSyncing) {
        state = 'syncing';
    } else if (hasPending) {
        state = 'pending';
    }

    return (
        <div className={containerClass}>
            <AnimatePresence mode='wait'>
                {state === 'error' && (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/50 backdrop-blur-md text-red-400 text-sm font-medium shadow-lg shadow-red-500/10"
                    >
                        <AlertCircle className="w-4 h-4" />
                        <span className="hidden sm:inline">Sync Failed ({statusCounts.error})</span>
                    </motion.div>
                )}

                {state === 'syncing' && (
                    <motion.div
                        key="syncing"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/50 backdrop-blur-md text-amber-400 text-sm font-medium shadow-lg shadow-amber-500/10"
                    >
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span className="hidden sm:inline">Syncing...</span>
                    </motion.div>
                )}

                {state === 'pending' && (
                    <motion.div
                        key="pending"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/50 backdrop-blur-md text-amber-400 text-sm font-medium shadow-lg shadow-amber-500/10"
                    >
                        <WifiOff className="w-4 h-4" />
                        <span className="hidden sm:inline">Pending ({statusCounts.pending})</span>
                    </motion.div>
                )}

                {state === 'offline' && (
                    <motion.div
                        key="offline"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/80 border border-white/10 backdrop-blur-md text-zinc-400 text-sm font-medium"
                    >
                        <WifiOff className="w-4 h-4" />
                        <span className="hidden sm:inline">Offline</span>
                    </motion.div>
                )}

                {state === 'synced' && variant === 'fixed' && (
                    <motion.div
                        key="synced"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/50 backdrop-blur-md text-emerald-400 text-sm font-medium shadow-lg shadow-emerald-500/10"
                    >
                        <Wifi className="w-4 h-4" />
                        <span className="hidden sm:inline">All Synced</span>
                    </motion.div>
                )}

                {state === 'synced' && variant === 'inline' && (
                    <motion.div
                        key="synced-inline"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-emerald-400 text-xs font-medium"
                    >
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span className="hidden sm:inline text-zinc-400">Online</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
