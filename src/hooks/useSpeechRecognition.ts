import { useState, useEffect, useCallback, useRef } from 'react';

interface Subtitle {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  isActive: boolean;
}

interface UseSpeechRecognitionProps {
  onResult?: (subtitle: Subtitle) => void;
  onEnd?: () => void;
}

export interface UseSpeechRecognitionReturn {
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  finalTranscript: string;
  interimTranscript: string;
  error: string | null;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
      isFinal: boolean;
    };
  };
}

interface SpeechRecognitionError {
  error: string;
}

const getSpeechRecognition = (): any => {
  const win = window as any;
  return win.SpeechRecognition || win.webkitSpeechRecognition || null;
};

export function useSpeechRecognition({ onResult, onEnd }: UseSpeechRecognitionProps = {}): UseSpeechRecognitionReturn {
  const [isListening, setIsListening] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const SpeechRecognition = getSpeechRecognition();
    
    if (!SpeechRecognition) {
      setError('您的浏览器不支持语音识别功能，请使用Chrome浏览器');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'zh-CN';

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < Object.keys(event.results).length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        if (result.isFinal) {
          final += transcript + ' ';
          if (onResult && transcript.trim()) {
            const subtitle: Subtitle = {
              id: `subtitle-${Date.now()}`,
              startTime: startTimeRef.current,
              endTime: Date.now(),
              text: transcript.trim(),
              isActive: false
            };
            onResult(subtitle);
            startTimeRef.current = Date.now();
          }
        } else {
          interim += transcript;
        }
      }

      setInterimTranscript(interim);
      setFinalTranscript(prev => prev + final);
    };

    recognitionRef.current.onerror = (event: SpeechRecognitionError) => {
      setError(event.error);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      if (onEnd) {
        onEnd();
      }
      if (isListening) {
        recognitionRef.current?.start();
      }
    };

    return () => {
      recognitionRef.current?.stop();
    };
  }, [isListening, onResult, onEnd]);

  const startListening = useCallback(() => {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) {
      setError('您的浏览器不支持语音识别功能');
      return;
    }
    setIsListening(true);
    setError(null);
    startTimeRef.current = Date.now();
    recognitionRef.current?.start();
  }, []);

  const stopListening = useCallback(() => {
    setIsListening(false);
    recognitionRef.current?.stop();
  }, []);

  return {
    isListening,
    startListening,
    stopListening,
    finalTranscript,
    interimTranscript,
    error
  };
}
