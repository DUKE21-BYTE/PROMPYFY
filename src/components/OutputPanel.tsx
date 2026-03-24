import { useState } from 'react';
import { EnhancementResult } from '../lib/types';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import {
  CopyIcon, CheckIcon, RefreshCwIcon, ChevronRightIcon,
  MessageSquareIcon, SendIcon, ColumnsIcon
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { diff_match_patch } from 'diff-match-patch';

interface OutputPanelProps {
  result: EnhancementResult | null;
  isEnhancing: boolean;
  onRegenerate: (isRefining?: boolean) => void;
  refinementPrompt: string;
  setRefinementPrompt: (val: string) => void;
  modelName?: string | null;
}

export function OutputPanel({
  result, isEnhancing, onRegenerate,
  refinementPrompt, setRefinementPrompt, modelName
}: OutputPanelProps) {
  const [copied, setCopied] = useState(false);
  const [showDiff, setShowDiff] = useState(false);

  const handleCopy = async () => {
    if (result?.enhanced_prompt) {
      await navigator.clipboard.writeText(result.enhanced_prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getDiff = () => {
    if (!result) return null;
    const dmp = new diff_match_patch();
    const diffs = dmp.diff_main(result.original_input, result.enhanced_prompt);
    dmp.diff_cleanupSemantic(diffs);
    return diffs;
  };

  if (isEnhancing) {
    return (
      <div className="flex flex-col h-full bg-surface-container-low border-l border-white/5 p-6 items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-on-surface-variant">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 border border-primary/20 animate-ping" />
            <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <div className="text-center">
            <p className="text-xs font-label font-black uppercase tracking-[0.2em] text-secondary animate-pulse">
              Architecting Output
            </p>
            <p className="text-[10px] text-on-surface-variant/50 font-label mt-1">Groq is processing your prompt...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col h-full bg-surface-container-low border-l border-white/5 p-6 items-center justify-center text-center">
        <div className="w-16 h-16 bg-surface-container border border-outline-variant/30 flex items-center justify-center mb-6">
          <ChevronRightIcon className="w-8 h-8 text-on-surface-variant/30" />
        </div>
        <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-on-surface mb-2">No Output Yet</h3>
        <p className="text-xs text-on-surface-variant max-w-[240px] leading-relaxed font-label">
          Enter your rough idea on the left and click Enhance to architect a structured prompt.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-surface-container-low border-l border-white/5">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-surface-container-low/80 backdrop-blur sticky top-0 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="font-headline font-black text-xs uppercase tracking-widest text-white">Enhanced Output</h2>
          <Badge variant="emerald" className="hidden sm:inline-flex font-label font-black text-[10px] uppercase tracking-widest">
            {modelName ?? 'Ready'}
          </Badge>
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost" size="sm"
            onClick={() => setShowDiff(!showDiff)}
            className={`${showDiff ? 'text-secondary border border-secondary/30' : 'text-on-surface-variant'} transition-colors`}
            title="Toggle Diff View"
          >
            <ColumnsIcon className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onRegenerate(false)} title="Regenerate" className="text-on-surface-variant hover:text-white">
            <RefreshCwIcon className="w-3.5 h-3.5" />
          </Button>
          <Button variant="primary" size="sm" onClick={handleCopy} className="gap-1.5 font-headline font-black text-[10px] uppercase tracking-wider bg-primary text-on-primary hover:brightness-110">
            {copied ? <CheckIcon className="w-3.5 h-3.5" /> : <CopyIcon className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        {/* Quality score */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-label font-black uppercase tracking-widest text-on-surface-variant">Quality Score</span>
          <div className="flex-1 h-px bg-outline-variant/20" />
          <span className="text-[10px] font-label font-black text-secondary">{result.quality_score}/100</span>
        </div>

        {/* The Prompt */}
        <div className="relative">
          <div className="bg-surface-container-lowest border border-outline-variant/30 p-5 border-l-2 border-l-secondary shadow-[inset_0_0_20px_rgba(191,243,101,0.03)]">
            {showDiff ? (
              <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
                {getDiff()?.map(([op, text], i) => (
                  <span key={i} className={
                    op === 1 ? 'bg-secondary/20 text-secondary' :
                    op === -1 ? 'bg-error/20 text-error line-through' :
                    'text-on-surface-variant'
                  }>{text}</span>
                ))}
              </div>
            ) : (
              <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-surface-container prose-pre:border prose-pre:border-outline-variant/30 prose-code:text-secondary font-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {result.enhanced_prompt}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>

        {/* Enhancement Log */}
        <div className="space-y-3 pb-20">
          <h3 className="text-[10px] font-label font-black text-on-surface-variant uppercase tracking-[0.2em]">
            Enhancement Log
          </h3>
          <ul className="space-y-2">
            {result.improvement_notes.map((note, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-on-surface-variant font-label">
                <CheckIcon className="w-3.5 h-3.5 text-secondary mt-0.5 shrink-0" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Refinement bar */}
      <div className="p-4 border-t border-white/5 bg-surface-container-low/95 backdrop-blur-md sticky bottom-0 shrink-0">
        <div className="relative flex items-center gap-2">
          <div className="absolute left-3 text-on-surface-variant/40">
            <MessageSquareIcon className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={refinementPrompt}
            onChange={(e) => setRefinementPrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && refinementPrompt.trim()) onRegenerate(true); }}
            placeholder="Refine: 'make it shorter', 'more formal'..."
            className="flex-1 bg-surface-container-lowest border border-outline-variant/30 py-2.5 pl-9 pr-12 text-xs font-label text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary/50 transition-all"
          />
          <button
            onClick={() => onRegenerate(true)}
            disabled={!refinementPrompt.trim() || isEnhancing}
            className="absolute right-2 p-1.5 bg-primary text-on-primary hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <SendIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}