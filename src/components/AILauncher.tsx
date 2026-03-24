import { ExternalLinkIcon, RocketIcon } from 'lucide-react';

export function AILauncher({ prompt }: { prompt?: string }) {
  const models = [
    { name: 'ChatGPT',    url: 'https://chatgpt.com/?q=',             desc: "OpenAI's leading model",       rank: '#1', color: 'border-secondary/30 text-secondary' },
    { name: 'Claude',     url: 'https://claude.ai/new?q=',            desc: "Anthropic's reasoning model",  rank: '#2', color: 'border-tertiary/30 text-tertiary' },
    { name: 'Gemini',     url: 'https://gemini.google.com/app?q=',    desc: "Google's multimodal AI",       rank: '#3', color: 'border-primary/30 text-primary' },
    { name: 'Perplexity', url: 'https://www.perplexity.ai/?q=',       desc: 'AI-powered search engine',     rank: '#4', color: 'border-secondary/20 text-secondary/70' },
    { name: 'Copilot',    url: 'https://copilot.microsoft.com/?q=',   desc: "Microsoft's AI assistant",    rank: '#5', color: 'border-primary/20 text-primary/70' },
    { name: 'Meta AI',    url: 'https://www.meta.ai/?q=',             desc: "Meta's Llama 3 assistant",    rank: '#6', color: 'border-tertiary/20 text-tertiary/70' },
  ];

  const handleLaunch = (baseUrl: string) => {
    const finalUrl = prompt ? `${baseUrl}${encodeURIComponent(prompt)}` : baseUrl;
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 max-w-5xl mx-auto w-full gap-8 custom-scrollbar overflow-y-auto h-full pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-white/5 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-tertiary/10 flex items-center justify-center border border-tertiary/20">
            <RocketIcon className="w-5 h-5 text-tertiary" />
          </div>
          <div>
            <h2 className="font-headline font-black text-xl uppercase tracking-tighter text-white">Quick Launch</h2>
            <p className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Fire your prompt into any AI</p>
          </div>
        </div>

        {prompt && (
          <div className="mt-4 p-4 bg-surface-container-lowest border border-outline-variant/30 border-l-2 border-l-secondary">
            <p className="text-[10px] font-label font-black text-secondary uppercase tracking-widest mb-2">Ready to launch:</p>
            <p className="text-xs text-on-surface-variant line-clamp-2 font-body italic">"{prompt}"</p>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {models.map(m => (
          <div
            key={m.name}
            className="bg-surface-container-low border border-white/5 p-5 flex flex-col gap-4 hover:border-outline-variant transition-all group relative overflow-hidden"
          >
            <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-primary/3 blur-2xl group-hover:bg-primary/5 transition-colors" />
            <div className="flex justify-between items-start relative z-10">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`w-11 h-11 flex items-center justify-center font-headline font-black text-lg border ${m.color} bg-surface-container-lowest`}>
                  {m.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-headline font-bold text-sm text-white truncate">{m.name}</h3>
                  <p className="text-[10px] font-label text-on-surface-variant truncate">{m.desc}</p>
                </div>
              </div>
              <span className="text-[10px] font-label font-black text-on-surface-variant bg-surface-container border border-outline-variant/30 px-2 py-0.5 shrink-0">{m.rank}</span>
            </div>
            <button
              onClick={() => handleLaunch(m.url)}
              className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 bg-surface-container border border-outline-variant/30 hover:bg-primary hover:text-on-primary hover:border-primary text-on-surface-variant text-xs font-label font-black uppercase tracking-widest transition-all"
            >
              Launch <ExternalLinkIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
