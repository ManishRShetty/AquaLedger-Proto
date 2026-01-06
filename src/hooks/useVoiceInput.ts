import { useState, useRef, useCallback, useEffect } from 'react';
import { parseCatchString, ParsedCatch } from '@/lib/catchParser';

interface VoiceInputResult {
    isListening: boolean;
    transcript: string;
    startListening: () => void;
    stopListening: () => void;
    hasSupport: boolean;
}

interface UseVoiceInputProps {
    onResult: (data: ParsedCatch) => void;
}

export function useVoiceInput({ onResult }: UseVoiceInputProps): VoiceInputResult {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [hasSupport, setHasSupport] = useState(false);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
            setHasSupport(true);
            const SpeechRecognition = (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                setIsListening(true);
                setTranscript('');
                // Haptic feedback start
                if (navigator.vibrate) navigator.vibrate(50);
            };

            recognition.onresult = (event: any) => {
                const current = event.resultIndex;
                const transcriptText = event.results[current][0].transcript;
                setTranscript(transcriptText);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.onerror = (event: any) => {
                console.error('Speech recognition error', event.error);
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        }
    }, []);

    // Handler for final result processing
    // We do this when listening stops (either manually or auto)
    const processResult = useCallback((finalText: string) => {
        if (!finalText) return;
        const parsed = parseCatchString(finalText);

        // Haptic feedback success
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

        onResult(parsed);
        setTranscript('');
    }, [onResult]);

    // Hook into onend to process result if we have one
    useEffect(() => {
        const recognition = recognitionRef.current;
        if (!recognition) return;

        const handleEnd = () => {
            setIsListening(false);
            // Access latest transcript from state is tricky in event listener without refs
            // But here we rely on the component state if we wanted to show it.
            // Actually, let's grab the result directly in onResult and store it in a ref for final processing if needed
            // For simplicity: We parse immediately on 'end' of interaction if we have text? 
            // Better: Parse on 'result' if final is true.
        };

        // Update onresult to handle final flag
        recognition.onresult = (event: any) => {
            const current = event.resultIndex;
            const result = event.results[current];
            const transcriptText = result[0].transcript;
            setTranscript(transcriptText);

            if (result.isFinal) {
                processResult(transcriptText);
            }
        };

        recognition.addEventListener('end', handleEnd);
        return () => recognition.removeEventListener('end', handleEnd);
    }, [processResult]);

    const startListening = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.error("Failed to start recognition:", e);
            }
        }
    }, [isListening]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
        }
    }, [isListening]);

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
        hasSupport
    };
}
