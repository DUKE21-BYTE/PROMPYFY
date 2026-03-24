import { EnhancementResult } from '../lib/types';
import { ActivityIcon, ZapIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';

export function StatsTracker({ history }: { history: EnhancementResult[] }) {
  const totalGenerations = history.length;
  const totalWords = history.reduce((acc, curr) => acc + curr.enhanced_prompt.split(/\s+/).length, 0);
  const totalTokens = Math.floor(totalWords * 1.3);
  const estimatedSavedTime = totalGenerations * 5;

  const stats = [
    { label: 'Total Enhancements', value: totalGenerations,            icon: <CheckCircleIcon className="w-4 h-4 text-secondary" />,  accent: 'border-secondary/30' },
    { label: 'Words Generated',    value: totalWords.toLocaleString(), icon: <ZapIcon className="w-4 h-4 text-tertiary" />,          accent: 'border-tertiary/30' },
    { label: 'Est. Tokens',        value: totalTokens.toLocaleString(), icon: <ActivityIcon className="w-4 h-4 text-primary" />,     accent: 'border-primary/30' },
    { label: 'Time Saved (min)',   value: estimatedSavedTime,           icon: <ClockIcon className="w-4 h-4 text-on-surface-variant" />, accent: 'border-outline-variant/30' },
  ];

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 max-w-5xl mx-auto w-full gap-8 custom-scrollbar overflow-y-auto h-full pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-white/5 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary/10 flex items-center justify-center border border-primary/20">
            <ActivityIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-headline font-black text-xl uppercase tracking-tighter text-white">Telemetry & Stats</h2>
            <p className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Usage, productivity, and history</p>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-surface-container-low border border-white/5 border-t-2 ${stat.accent} p-5 flex flex-col gap-3`}>
            <div className="flex items-center gap-2">
              {stat.icon}
              <h3 className="text-[10px] font-label font-black text-on-surface-variant uppercase tracking-widest leading-tight">{stat.label}</h3>
            </div>
            <p className="font-headline font-black text-3xl text-white tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent History Table */}
      <div>
        <h3 className="text-[10px] font-label font-black text-on-surface-variant uppercase tracking-[0.2em] mb-4">Recent Generations</h3>
        <div className="bg-surface-container-low border border-white/5 overflow-hidden divide-y divide-white/5">
          {history.length === 0 ? (
            <p className="p-8 text-center text-[11px] font-label text-on-surface-variant/40 uppercase tracking-widest">
              No data yet — start enhancing!
            </p>
          ) : history.slice(0, 10).map(item => (
            <div key={item.id} className="p-4 flex flex-col gap-2 hover:bg-surface-container transition-colors">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-label font-black px-2 py-0.5 border border-outline-variant/30 text-secondary uppercase tracking-wider capitalize bg-surface-container-lowest">
                  {item.detected_task}
                </span>
                <span className="text-[10px] text-on-surface-variant/40 font-label shrink-0">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant line-clamp-1 font-body italic">"{item.original_input}"</p>
              <div className="flex items-center gap-2 text-[10px] text-on-surface-variant/40 font-label font-bold uppercase tracking-widest">
                <span className="text-secondary">{item.quality_score}/100</span>
                <span>•</span>
                <span>{item.enhanced_prompt.split(/\s+/).length} words</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
