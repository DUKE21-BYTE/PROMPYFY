import React, { useRef } from 'react';
import { PromptControls, TaskType } from '../lib/types';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { Badge } from './ui/Badge';
import { SparklesIcon, CommandIcon, MicIcon, MicOffIcon } from 'lucide-react';

interface InputPanelProps {
  input: string;
  setInput: (val: string) => void;
  controls: PromptControls;
  setControls: (controls: PromptControls) => void;
  onEnhance: () => void;
  isEnhancing: boolean;
  detectedTask: TaskType | null;
}

export function InputPanel({
  input,
  setInput,
  controls,
  setControls,
  onEnhance,
  isEnhancing,
  detectedTask
}: InputPanelProps) {
  const [isListening, setIsListening] = React.useState(false);
  const recognitionRef = useRef<any>(null);

  const toggleListening = () => {
    // If already listening, stop
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Don't use alert() — it blocks the browser from granting mic permission
      console.warn('SpeechRecognition not supported in this browser.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = true;      // keep listening until stopped
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);

      recognition.onresult = (e: any) => {
        const transcript = Array.from(e.results)
          .map((r: any) => r[0].transcript)
          .join(' ')
          .trim();
        setInput((input ? input + ' ' : '') + transcript);
      };

      recognition.onerror = (e: any) => {
        console.error('Speech recognition error:', e.error);
        setIsListening(false);
        recognitionRef.current = null;
      };

      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
      };

      recognition.start();
    } catch (err) {
      console.error('Could not start speech recognition:', err);
      setIsListening(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (input.trim() && !isEnhancing) {
        onEnhance();
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface relative">
      <div className="flex-1 flex flex-col p-6 max-w-3xl mx-auto w-full gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline font-bold text-base uppercase tracking-widest text-on-surface">
              Draft Prompt
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5 font-label">
              Enter your rough idea — we'll architect it.
            </p>
          </div>
          {detectedTask && detectedTask !== 'auto' && (
            <Badge
              variant="amber"
              className="animate-in fade-in slide-in-from-top-2 font-label font-bold text-[10px] uppercase tracking-widest"
            >
              Detected: {detectedTask.charAt(0).toUpperCase() + detectedTask.slice(1)}
            </Badge>
          )}
        </div>

        {/* Textarea */}
        <div className="relative flex-1 min-h-[300px] flex flex-col group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., write ad copy for a new coffee brand targeting tired professionals..."
            className="flex-1 w-full resize-none bg-surface-container-lowest border border-outline-variant p-5 text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary/60 transition-all custom-scrollbar text-base leading-relaxed font-body border-l-2 border-l-outline-variant focus:border-l-primary"
          />

          {/* Mic button — centered at the bottom of the textarea */}
          <button
            type="button"
            onClick={toggleListening}
            title={isListening ? 'Stop recording' : 'Start voice input'}
            className={`absolute bottom-10 left-1/2 -translate-x-1/2 p-2.5 transition-all duration-200 border ${
              isListening
                ? 'bg-error text-white border-error animate-pulse shadow-[0_0_16px_rgba(255,110,132,0.4)]'
                : 'bg-surface-container border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary/50'
            }`}
          >
            {isListening ? <MicOffIcon className="w-4 h-4" /> : <MicIcon className="w-4 h-4" />}
          </button>

          {/* Keyboard shortcut hint — bottom-right, separate from mic */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[10px] text-on-surface-variant/40 opacity-0 group-focus-within:opacity-100 transition-opacity font-label font-bold uppercase tracking-wider">
            <CommandIcon className="w-3 h-3" /> Enter to enhance
          </div>
        </div>

        {/* Controls */}
        <div className="bg-surface-container border border-outline-variant p-4 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-[10px] font-label font-black text-on-surface-variant uppercase tracking-widest">
              Context Controls
            </h3>
            <div className="h-px flex-1 bg-outline-variant/50" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Select
              label="Audience"
              value={controls.audience}
              onChange={(e) => setControls({ ...controls, audience: e.target.value })}
              options={[
                { value: 'default', label: 'General' },
                { value: 'beginners', label: 'Beginners' },
                { value: 'experts', label: 'Experts' },
                { value: 'executives', label: 'Executives' },
                { value: 'developers', label: 'Developers' },
              ]}
            />
            <Select
              label="Tone"
              value={controls.tone}
              onChange={(e) => setControls({ ...controls, tone: e.target.value })}
              options={[
                { value: 'default', label: 'Neutral' },
                { value: 'professional', label: 'Professional' },
                { value: 'casual', label: 'Casual' },
                { value: 'enthusiastic', label: 'Enthusiastic' },
                { value: 'academic', label: 'Academic' },
              ]}
            />
            <Select
              label="Format"
              value={controls.format}
              onChange={(e) => setControls({ ...controls, format: e.target.value })}
              options={[
                { value: 'default', label: 'Paragraphs' },
                { value: 'bullet_points', label: 'Bullet Points' },
                { value: 'step_by_step', label: 'Step-by-Step' },
                { value: 'json', label: 'JSON' },
                { value: 'markdown', label: 'Markdown' },
              ]}
            />
            <Select
              label="Length"
              value={controls.length}
              onChange={(e) => setControls({ ...controls, length: e.target.value })}
              options={[
                { value: 'default', label: 'Auto' },
                { value: 'short', label: 'Short (< 200w)' },
                { value: 'medium', label: 'Medium (~500w)' },
                { value: 'long', label: 'Long (> 1000w)' },
              ]}
            />
          </div>
        </div>

        {/* Enhance Button */}
        <div className="flex items-center justify-end">
          <Button
            size="lg"
            onClick={onEnhance}
            disabled={!input.trim() || isEnhancing}
            className="w-full md:w-auto min-w-[180px] gap-2 font-headline font-black uppercase tracking-tight bg-primary text-on-primary hover:brightness-110 shadow-[0_0_20px_rgba(163,166,255,0.2)] hover:shadow-[0_0_30px_rgba(163,166,255,0.4)] transition-all active:scale-95 disabled:opacity-40"
          >
            {isEnhancing ? (
              'Structuring...'
            ) : (
              <>
                <SparklesIcon className="w-4 h-4" />
                Enhance Prompt
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}