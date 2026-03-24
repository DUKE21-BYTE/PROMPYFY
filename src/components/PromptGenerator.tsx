import { useState } from 'react';
import { PenToolIcon, WandIcon, CopyIcon, CheckIcon } from 'lucide-react';
import { Button } from './ui/Button';

export function PromptGenerator() {
  const [topic, setTopic] = useState('');
  const [goal, setGoal] = useState('');
  const [generated, setGenerated] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!topic.trim() || !goal.trim()) return;
    const prompt = `Act as an expert in ${topic.trim()}. Your primary goal is to ${goal.trim()}. 
Please provide a comprehensive, step-by-step breakdown. Use clear formatting, bullet points where necessary, and ensure a professional yet accessible tone.`;
    setGenerated(prompt);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 max-w-4xl mx-auto w-full gap-8 custom-scrollbar overflow-y-auto h-full pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-white/5 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-secondary/10 flex items-center justify-center border border-secondary/20">
            <WandIcon className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h2 className="font-headline font-black text-xl uppercase tracking-tighter text-white">From-Scratch Generator</h2>
            <p className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">No draft? We'll build one for you</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-surface-container-low border border-white/5 p-6 flex flex-col gap-6">
        <div className="space-y-5">
          <div>
            <label className="block text-[10px] font-label font-black text-on-surface-variant uppercase tracking-widest mb-2">
              What is the main topic?
            </label>
            <input
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. Content Marketing, Python Programming..."
              className="w-full bg-surface-container-lowest border border-outline-variant/30 p-3 text-sm font-body text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] font-label font-black text-on-surface-variant uppercase tracking-widest mb-2">
              What is the ultimate goal?
            </label>
            <input
              value={goal}
              onChange={e => setGoal(e.target.value)}
              placeholder="e.g. Write a weekly newsletter, debug a script..."
              className="w-full bg-surface-container-lowest border border-outline-variant/30 p-3 text-sm font-body text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>
        </div>
        <div className="flex justify-end pt-1">
          <Button
            onClick={handleGenerate}
            disabled={!topic.trim() || !goal.trim()}
            className="gap-2"
            variant="primary"
          >
            <PenToolIcon className="w-3.5 h-3.5" />
            Generate Setup
          </Button>
        </div>
      </div>

      {/* Output */}
      {generated && (
        <div className="bg-surface-container-lowest border border-outline-variant/30 border-l-2 border-l-secondary p-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-label font-black text-secondary uppercase tracking-widest">Generated Prompt Structure:</h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-[10px] font-label font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
            >
              {copied ? <CheckIcon className="w-3.5 h-3.5 text-secondary" /> : <CopyIcon className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="text-sm font-body text-on-surface-variant whitespace-pre-wrap leading-relaxed">{generated}</p>
        </div>
      )}
    </div>
  );
}
