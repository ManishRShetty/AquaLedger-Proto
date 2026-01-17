'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { format } from 'date-fns';
import { Fish, Calendar, ArrowRight, Leaf, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export function CatchList() {
    const router = useRouter();

    // Sort by timestamp desc (newest first)
    const catches = useLiveQuery(() =>
        db.catches.orderBy('timestamp').reverse().toArray()
    );

    if (!catches) return null;

    return (
        <div className="w-full max-w-md space-y-6 pb-20 mx-auto">
            <h2 className="text-lg font-bold text-foreground px-1 opacity-90">Recent Catches</h2>
            <div className="space-y-4">
                <AnimatePresence>
                    {catches.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12 text-muted-foreground bg-slate-50/50 rounded-3xl border border-dashed border-slate-200"
                        >
                            <Fish className="w-10 h-10 mx-auto mb-3 opacity-20" />
                            <p className="font-medium">No catches logged yet.</p>
                        </motion.div>
                    )}

                    {catches.map((catchItem) => (
                        <motion.div
                            key={catchItem.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            whileTap={{ scale: 0.98 }}
                            whileHover={{ y: -2 }}
                            onClick={() => router.push(`/catch/${catchItem.id}`)}
                            className="bg-white border border-slate-100 rounded-3xl p-5 cursor-pointer shadow-apple hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                        >
                            {/* Score Indicator Dot */}
                            {catchItem.score !== undefined && (
                                <div className={cn(
                                    "absolute top-5 right-5 w-3 h-3 rounded-full ring-4 ring-white/50",
                                    catchItem.score >= 75 ? "bg-emerald-500" :
                                        catchItem.score >= 50 ? "bg-amber-500" : "bg-red-500"
                                )} />
                            )}

                            <div className="flex justify-between items-start">
                                <div className="flex gap-4">
                                    {/* Image Thumbnail */}
                                    {catchItem.imageBase64 && (
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100 shadow-sm">
                                            <img src={catchItem.imageBase64} alt={catchItem.species} className="w-full h-full object-cover" />
                                        </div>
                                    )}

                                    <div>
                                        <h3 className="text-lg font-bold text-foreground group-hover:text-teal-600 transition-colors">
                                            {catchItem.species}
                                        </h3>

                                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground font-medium">
                                            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg">
                                                <Scale className="w-3.5 h-3.5" />
                                                <span>{catchItem.weight}kg</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{format(catchItem.timestamp, 'MMM d, h:mm a')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Score Badge */}
                                <div className="mt-4 flex items-center gap-2">
                                    {catchItem.score !== undefined ? (
                                        <div className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border",
                                            catchItem.score >= 75 ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                                catchItem.score >= 50 ? "bg-amber-50 text-amber-600 border-amber-100" :
                                                    "bg-red-50 text-red-600 border-red-100"
                                        )}>
                                            <Leaf className="w-3 h-3" />
                                            <span>Sustainability Score: {catchItem.score}</span>
                                        </div>
                                    ) : (
                                        <span className="text-xs text-slate-400 font-mono italic">Analysis Pending..</span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
