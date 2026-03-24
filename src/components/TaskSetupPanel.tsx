import React from 'react';
import { TaskType, EnhancementMode, EnhancementResult, PromptFramework } from '../lib/types';
import {
  PenToolIcon,
  MegaphoneIcon,
  CodeIcon,
  ImageIcon,
  BookOpenIcon,
  WandIcon,
  ZapIcon,
  TargetIcon,
  LightbulbIcon,
  GraduationCapIcon,
  HistoryIcon,
  MailIcon,
  ClockIcon } from
'lucide-react';
interface TaskSetupPanelProps {
  taskType: TaskType;
  setTaskType: (type: TaskType) => void;
  mode: EnhancementMode;
  setMode: (mode: EnhancementMode) => void;
  history: EnhancementResult[];
  onSelectHistory: (item: EnhancementResult) => void;
  onClearHistory: () => void;
  selectedModel: string;
  setModel: (model: string) => void;
  framework: PromptFramework;
  setFramework: (framework: PromptFramework) => void;
  showComparison: boolean;
  setShowComparison: (show: boolean) => void;
  comparisonModel: string | null;
  setComparisonModel: (model: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}
export function TaskSetupPanel({
  taskType,
  setTaskType,
  mode,
  setMode,
  history,
  onSelectHistory,
  onClearHistory,
  selectedModel,
  setModel,
  framework,
  setFramework,
  showComparison,
  setShowComparison,
  comparisonModel,
  setComparisonModel,
  searchQuery,
  setSearchQuery
}: TaskSetupPanelProps) {
  const tasks: {
    id: TaskType;
    label: string;
    icon: React.ReactNode;
  }[] = [
  {
    id: 'auto',
    label: 'Auto-Detect',
    icon: <WandIcon className="w-4 h-4" />
  },
  {
    id: 'writing',
    label: 'Writing',
    icon: <PenToolIcon className="w-4 h-4" />
  },
  {
    id: 'marketing',
    label: 'Marketing',
    icon: <MegaphoneIcon className="w-4 h-4" />
  },
  {
    id: 'coding',
    label: 'Coding',
    icon: <CodeIcon className="w-4 h-4" />
  },
  {
    id: 'image',
    label: 'Image Gen',
    icon: <ImageIcon className="w-4 h-4" />
  },
  {
    id: 'study',
    label: 'Study/Learn',
    icon: <BookOpenIcon className="w-4 h-4" />
  },
  {
    id: 'email',
    label: 'Email',
    icon: <MailIcon className="w-4 h-4" />
  }];

  const modes: {
    id: EnhancementMode;
    label: string;
    desc: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
  {
    id: 'quick',
    label: 'Quick',
    desc: 'Fast, concise prompts',
    icon: <ZapIcon className="w-4 h-4" />,
    color: 'text-blue-400'
  },
  {
    id: 'precise',
    label: 'Precise',
    desc: 'Highly structured & exact',
    icon: <TargetIcon className="w-4 h-4" />,
    color: 'text-emerald-400'
  },
  {
    id: 'creative',
    label: 'Creative',
    desc: 'Expansive & imaginative',
    icon: <LightbulbIcon className="w-4 h-4" />,
    color: 'text-purple-400'
  },
  {
    id: 'expert',
    label: 'Expert',
    desc: 'Deep, nuanced analysis',
    icon: <GraduationCapIcon className="w-4 h-4" />,
    color: 'text-amber-400'
  }];
  
  const models = [
    { id: 'llama-3.3-70b-versatile', label: 'Meta Llama 3.3 70B', sub: 'Balanced & Expert' },
    { id: 'llama-3.1-8b-instant', label: 'Meta Llama 3.1 8B', sub: 'Fast & Concise' },
    { id: 'mixtral-8x7b-32768', label: 'Mixtral 8x7B', sub: 'Versatile performance' },
    { id: 'gemma2-9b-it', label: 'Gemma 2 9B', sub: 'Efficient reasoning' },
  ];

  const frameworks: { id: PromptFramework; label: string; desc: string }[] = [
    { id: 'auto', label: 'Auto-Select', desc: 'AI chooses best fit' },
    { id: 'CO-STAR', label: 'CO-STAR', desc: 'Context, Objective, Style...' },
    { id: 'RISEN', label: 'RISEN', desc: 'Role, Instructions, Steps...' },
    { id: 'CRAFT', label: 'CRAFT', desc: 'Context, Role, Action...' },
  ];

  return (
    <div className="flex flex-col h-full bg-surface-container-low border-r border-white/5">
      <div className="p-4 border-b border-white/5 flex items-center gap-3 shrink-0">
        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
        <div>
          <h1 className="font-headline font-black text-xs uppercase tracking-widest text-white">
            Prompt Enhancer
          </h1>
          <p className="text-[10px] text-on-surface-variant font-label">Groq-powered workstation</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
        {/* Task Type */}
        <div className="space-y-3">
          <h2 className="text-[10px] font-label font-black text-on-surface-variant uppercase tracking-[0.2em]">
            Task Intent
          </h2>
          <div className="grid grid-cols-2 gap-1.5">
            {tasks.map((task) =>
            <button
              key={task.id}
              onClick={() => setTaskType(task.id)}
              className={`flex flex-col items-start gap-1.5 p-3 border text-left transition-all ${
                taskType === task.id
                  ? 'bg-surface-container-high border-primary/30 text-white'
                  : 'bg-surface-container-lowest border-outline-variant/30 text-on-surface-variant hover:border-outline-variant hover:text-on-surface'
              }`}
            >
              <div className={taskType === task.id ? 'text-primary' : 'text-on-surface-variant'}>
                {task.icon}
              </div>
              <span className="text-[11px] font-label font-bold">{task.label}</span>
            </button>
            )}
          </div>
        </div>

        {/* Enhancement Mode */}
        <div className="space-y-3">
          <h2 className="text-[10px] font-label font-black text-on-surface-variant uppercase tracking-[0.2em]">
            Enhancement Mode
          </h2>
          <div className="space-y-1.5">
            {modes.map((m) =>
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`w-full flex items-center gap-3 p-3 border transition-all ${
                mode === m.id
                  ? 'bg-surface-container-high border-primary/30'
                  : 'bg-surface-container-lowest border-outline-variant/20 hover:border-outline-variant/50'
              }`}>
              
                <div className={`p-1.5 border ${mode === m.id ? `${m.color} border-primary/20` : 'text-on-surface-variant border-outline-variant/20'}`}>
                  {m.icon}
                </div>
                <div className="text-left flex-1">
                  <div className={`text-xs font-label font-bold ${mode === m.id ? 'text-white' : 'text-on-surface-variant'}`}>
                    {m.label}
                  </div>
                  <div className="text-[10px] text-on-surface-variant/60">{m.desc}</div>
                </div>
                {mode === m.id && <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(191,243,101,0.5)]" />}
              </button>
            )}
          </div>
        </div>

        {/* Model Selection */}
        <div className="space-y-3 pt-4 border-t border-white/5">
          <h2 className="text-[10px] font-label font-black text-on-surface-variant uppercase tracking-[0.2em]">Model</h2>
          <div className="flex flex-col gap-1">
            {models.map((m) =>
            <button
              key={m.id}
              onClick={() => setModel(m.id)}
              className={`w-full text-left px-3 py-2 transition-all border ${
                selectedModel === m.id
                  ? 'bg-surface-container-high border-primary/30 text-white'
                  : 'bg-transparent border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest'
              }`}>
              <div className="text-[12px] font-label font-bold leading-tight">{m.label}</div>
              <div className="text-[10px] opacity-60 leading-tight">{m.sub}</div>
            </button>
            )}
          </div>
        </div>

        {/* Prompt Framework */}
        <div className="space-y-3 pt-4 border-t border-white/5">
          <h2 className="text-[10px] font-label font-black text-on-surface-variant uppercase tracking-[0.2em]">Prompt Framework</h2>
          <div className="flex flex-col gap-1">
            {frameworks.map((f) => (
              <button
                key={f.id}
                onClick={() => setFramework(f.id)}
                className={`w-full text-left px-3 py-2 transition-all border ${
                  framework === f.id
                    ? 'bg-surface-container-high border-primary/30 text-white'
                    : 'bg-transparent border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest'
                }`}
              >
                <div className="text-[12px] font-label font-bold leading-tight">{f.label}</div>
                <div className="text-[10px] opacity-60 leading-tight">{f.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Mode */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-label font-black text-on-surface-variant uppercase tracking-[0.2em]">
              Model Comparison
            </h2>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${showComparison ? 'bg-secondary' : 'bg-surface-container-highest'}`}
            >
              <span className={`pointer-events-none inline-block h-4 w-4 transform bg-white shadow ring-0 transition duration-200 ease-in-out ${showComparison ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>
          
          {showComparison && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
              <p className="text-[10px] text-zinc-500 font-medium">Compare with:</p>
              <div className="flex flex-col gap-1">
                {models.map((m) => (
                  <button
                    key={m.id}
                    disabled={m.id === selectedModel}
                    onClick={() => setComparisonModel(m.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-md text-[11px] transition-all border ${comparisonModel === m.id ? 'bg-zinc-800 border-zinc-600 text-zinc-100' : 'bg-transparent border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30'} ${m.id === selectedModel ? 'opacity-30 cursor-not-allowed' : ''}`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* History */}
        <div className="space-y-3 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between text-[10px] text-on-surface-variant font-label font-black uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <HistoryIcon className="w-3.5 h-3.5" />
              <span>Session History</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-surface-container-high px-2 py-0.5">{history.length}</span>
              {history.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Clear all session history?')) onClearHistory();
                  }}
                  className="hover:text-error transition-colors">
                  <ZapIcon className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search history..."
            className="w-full bg-surface-container-lowest border border-outline-variant/30 px-3 py-1.5 text-[11px] font-label text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary/50 transition-colors"
          />

          {history.length === 0 ? (
            <div className="text-[10px] text-on-surface-variant/40 italic px-2 font-label">No history yet</div>
          ) : (
            <div className="space-y-1.5">
              {history
                .filter(item =>
                  item.enhanced_prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.original_input.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectHistory(item)}
                    className="w-full text-left p-2 hover:bg-surface-container-high border border-transparent hover:border-outline-variant/30 transition-colors group"
                  >
                    <div className="text-[11px] font-label text-on-surface-variant line-clamp-1 group-hover:text-primary transition-colors">
                      {item.enhanced_prompt}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-on-surface-variant/40 font-label">
                      <span className="capitalize">{item.detected_task}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-2.5 h-2.5" />
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}