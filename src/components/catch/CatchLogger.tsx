'use client';

import { useState, useRef } from 'react';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { ParsedCatch } from '@/lib/catchParser';
import { db } from '@/lib/db';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Loader2, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export function CatchLogger() {
    const [species, setSpecies] = useState('');
    const [weight, setWeight] = useState('');
    const weightInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();
    const queryClient = useQueryClient();

    // Voice Input Hook
    const { isListening, transcript, startListening, stopListening, hasSupport } = useVoiceInput({
        onResult: (data: ParsedCatch) => {
            if (data.species) setSpecies(data.species);
            if (data.weight) {
                setWeight(data.weight.toString());
            } else {
                // Graceful Degradation: Focus weight input if missing
                setTimeout(() => weightInputRef.current?.focus(), 100);
                toast({
                    title: "Voice Parsed",
                    description: "Could not detect weight. Please enter it manually.",
                })
            }
        }
    });

    // Mutation for saving catch
    const logCatchMutation = useMutation({
        mutationFn: async (newCatch: { species: string; weight: number }) => {
            await db.catches.add({
                ...newCatch,
                timestamp: Date.now(),
                syncStatus: 'pending' // Default to pending sync
            });
        },
        onSuccess: () => {
            toast({
                title: "Catch Logged",
                description: `${species} (${weight}kg) saved offline.`,
            });
            setSpecies('');
            setWeight('');
            queryClient.invalidateQueries({ queryKey: ['catches'] }); // Invalidate if we have a list query later
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: "Failed to save catch: " + error,
                variant: "destructive"
            });
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!species || !weight) return;

        logCatchMutation.mutate({
            species,
            weight: parseFloat(weight)
        });
    };

    return (
        <Card className="w-full max-w-md bg-zinc-900/50 backdrop-blur-md border-white/10 shadow-xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Log Catch</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Species</label>
                        <Input
                            value={species}
                            onChange={(e) => setSpecies(e.target.value)}
                            placeholder="e.g. Mackerel"
                            className="h-12 bg-black/40 border-white/5 text-lg text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Weight (kg)</label>
                        <Input
                            ref={weightInputRef}
                            type="number"
                            step="0.01"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="0.00"
                            className="h-12 bg-black/40 border-white/5 text-lg text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        {hasSupport && (
                            <button
                                type="button"
                                onClick={isListening ? stopListening : startListening}
                                className={`
                    relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300
                    ${isListening ? 'bg-red-500/20 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg'}
                `}
                            >
                                <AnimatePresence mode='wait'>
                                    {isListening ? (
                                        <motion.div
                                            key="wave"
                                            className="absolute inset-0 rounded-full border-2 border-red-500"
                                            initial={{ scale: 1, opacity: 1 }}
                                            animate={{ scale: 1.5, opacity: 0 }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                        />
                                    ) : null}
                                </AnimatePresence>
                                <Mic className={`w-8 h-8 ${isListening ? 'animate-pulse' : ''}`} />
                            </button>
                        )}

                        <Button
                            type="submit"
                            className="flex-1 h-16 text-lg font-semibold bg-white text-black hover:bg-zinc-200 transition-colors"
                            disabled={logCatchMutation.isPending}
                        >
                            {logCatchMutation.isPending ? (
                                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                            ) : (
                                <Save className="w-6 h-6 mr-2" />
                            )}
                            Log Catch
                        </Button>
                    </div>

                    {/* Transcript Preview */}
                    <AnimatePresence>
                        {isListening && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="text-center"
                            >
                                <p className="text-sm font-mono text-zinc-400 animate-pulse">
                                    {transcript || "Listening..."}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </CardContent>
        </Card>
    );
}
