import { ArrowRightIcon, SparklesIcon, WandIcon, ZapIcon, TargetIcon, LayoutDashboardIcon, GlobeIcon, MicIcon, ShieldIcon, CheckCircleIcon, AlertTriangleIcon } from 'lucide-react';

export function LandingPage({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-body overflow-x-hidden relative">
      {/* Noise overlay */}
      <div className="noise-bg" />

      {/* ── NAV ───────────────────────────────────────────── */}
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/60 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_32px_0_rgba(79,70,229,0.1)]">
        <nav className="flex justify-between items-center h-16 md:h-20 px-6 md:px-8 max-w-[1440px] mx-auto">
          <div className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase font-headline">PROMPTIFY</div>
          <div className="hidden md:flex items-center space-x-8 font-headline font-bold tracking-tight text-sm">
            <a href="#laboratory" className="text-primary border-b-2 border-primary pb-0.5">Laboratory</a>
            <a href="#features" className="text-on-surface-variant hover:text-white transition-colors">Features</a>
            <a href="#waitlist" className="text-on-surface-variant hover:text-white transition-colors">Join Waitlist</a>
          </div>
          <div className="flex items-center space-x-3 md:space-x-6">
            <button onClick={onEnter} className="hidden md:block text-on-surface-variant font-headline font-bold hover:text-white transition-all text-sm">Login</button>
            <button
              onClick={onEnter}
              className="bg-primary text-on-primary px-4 py-2 md:px-6 md:py-2.5 font-headline font-black text-xs md:text-sm tracking-tight hover:brightness-110 active:scale-95 transition-all"
            >
              Build Now
            </button>
          </div>
        </nav>
      </header>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 md:px-8 overflow-hidden">
        {/* Ambient blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-tertiary/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-5xl text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-container-high border border-white/5">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-label font-black tracking-[0.2em] text-secondary uppercase">Command Center Active</span>
          </div>

          <h1 className="font-headline font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] text-white">
            ABSOLUTE PRECISION FOR<br />
            <span className="text-gradient">EVERY THOUGHT</span>
          </h1>

          <p className="max-w-2xl mx-auto text-on-surface-variant text-base md:text-xl font-light leading-relaxed">
            The world's first architectural suite for prompt engineering. Move beyond casual chat and start building structured frameworks with deterministic outputs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-4">
            <button
              onClick={onEnter}
              className="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 bg-primary text-on-primary font-headline font-black text-base md:text-lg tracking-tight shadow-[0_0_30px_rgba(163,166,255,0.3)] hover:shadow-[0_0_50px_rgba(163,166,255,0.5)] transition-all active:scale-95"
            >
              Start Enhancing
            </button>
            <a href="#laboratory" className="group flex items-center space-x-2 font-headline font-bold text-white hover:text-secondary transition-colors text-sm md:text-base">
              <span>How it works</span>
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ────────────────────────────── */}
      <section className="py-10 md:py-12 bg-surface-container-low border-y border-white/5 relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-0 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          {['CHATGPT', 'CLAUDE', 'GEMINI', 'LLAMA 3', 'MISTRAL'].map(brand => (
            <span key={brand} className="font-headline text-lg md:text-2xl font-black tracking-widest text-on-surface-variant">{brand}</span>
          ))}
        </div>
      </section>

      {/* ── PROMPT LABORATORY ─────────────────────────────── */}
      <section id="laboratory" className="py-20 md:py-32 px-6 md:px-8 max-w-[1440px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-6">
          <div className="max-w-2xl">
            <span className="text-secondary font-label font-black text-xs tracking-[0.3em] uppercase mb-3 block">Experimental Environment</span>
            <h2 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tighter text-white">PROMPT LABORATORY</h2>
          </div>
          <p className="text-on-surface-variant max-w-xs font-light text-sm md:text-right leading-relaxed">
            Visualize the transformation from raw linguistic input to production-ready structural architecture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5 overflow-hidden">
          {/* Raw Input */}
          <div className="bg-surface p-8 md:p-12 space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-label font-bold text-[10px] text-on-surface-variant uppercase tracking-widest">Status: Raw Input</span>
              <div className="flex space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-surface-container-highest" />
                <span className="w-2 h-2 rounded-full bg-surface-container-highest" />
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 md:p-8 min-h-[220px] md:min-h-[280px] font-mono text-on-surface-variant leading-relaxed border-l-2 border-error/50 text-sm">
              "Write an email to my team about the project delay. Make it professional but not too mean. Mention the server issues we had last night."
            </div>
            <div className="flex items-center space-x-3 text-error-dim">
              <AlertTriangleIcon className="w-4 h-4 shrink-0" />
              <span className="text-xs font-label font-medium uppercase tracking-wider">Low Precision • High Hallucination Risk</span>
            </div>
          </div>

          {/* Structured Output */}
          <div className="bg-surface-container-low p-8 md:p-12 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px]" />
            <div className="flex items-center justify-between relative z-10">
              <span className="font-label font-bold text-[10px] text-secondary uppercase tracking-widest">Status: CO-STAR Applied</span>
              <div className="flex space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span className="w-2 h-2 rounded-full bg-secondary" />
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 md:p-8 min-h-[220px] md:min-h-[280px] font-mono leading-relaxed border-l-2 border-secondary shadow-[inset_0_0_20px_rgba(191,243,101,0.05)] relative z-10 text-sm">
              <span className="text-secondary"># CONTEXT</span><br />
              Internal delay on Project 'Obsidian' due to critical backend failure.<br /><br />
              <span className="text-secondary"># OBJECTIVE</span><br />
              Inform stakeholders of a 48-hour slippage while maintaining morale.<br /><br />
              <span className="text-secondary"># STYLE</span><br />
              Direct, transparent, authoritative yet empathetic.
            </div>
            <div className="flex items-center space-x-3 text-secondary relative z-10">
              <CheckCircleIcon className="w-4 h-4 shrink-0" />
              <span className="text-xs font-label font-medium uppercase tracking-wider">99% Deterministic • Framework Optimized</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE BENTO GRID ────────────────────────────── */}
      <section id="features" className="py-20 md:py-32 px-6 md:px-8 max-w-[1440px] mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {/* Framework Builder — 2 col */}
          <div className="md:col-span-2 group bg-surface-container-low border border-white/5 p-8 md:p-10 flex flex-col justify-between min-h-[320px] md:min-h-[400px] relative overflow-hidden hover:border-primary/50 transition-colors duration-500">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/10 transition-colors" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-6 md:mb-8 border border-primary/20">
                <WandIcon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-headline text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">Framework Builder</h3>
              <p className="text-on-surface-variant max-w-sm text-sm md:text-base">Architect custom prompt structures using CO-STAR, RISEN, CRAFT and more. Every output is deterministic and production-ready.</p>
            </div>
            <div className="relative z-10 flex flex-wrap gap-2 mt-6">
              {['Dynamic Logic', 'Variable Injection', 'Multi-Framework'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-surface-container-high text-[10px] font-label font-bold text-on-surface-variant uppercase tracking-tighter">{tag}</span>
              ))}
            </div>
          </div>

          {/* Multi-Model Testing */}
          <div className="group bg-surface-container-low border border-white/5 p-8 md:p-10 flex flex-col justify-between min-h-[320px] md:min-h-[400px] relative overflow-hidden hover:border-secondary/50 transition-colors duration-500">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center mb-6 md:mb-8 border border-secondary/20">
                <ZapIcon className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="font-headline text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">Multi-Model A/B</h3>
              <p className="text-on-surface-variant text-sm md:text-base">Test your prompts across Llama 3.3, Mixtral, and Gemma simultaneously to find the perfect model fit.</p>
            </div>
            <div className="mt-6 h-16 bg-surface-container border border-white/5 flex items-center justify-around px-4">
              {['Llama 3', 'Mixtral', 'Gemma'].map(m => (
                <span key={m} className="text-[10px] font-label font-black text-on-surface-variant uppercase tracking-widest">{m}</span>
              ))}
            </div>
          </div>

          {/* AI Launcher */}
          <div className="group bg-surface-container-low border border-white/5 p-8 md:p-10 flex flex-col justify-between min-h-[280px] relative overflow-hidden hover:border-tertiary/50 transition-colors duration-500">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-tertiary/10 flex items-center justify-center mb-6 border border-tertiary/20">
                <LayoutDashboardIcon className="w-5 h-5 text-tertiary" />
              </div>
              <h3 className="font-headline text-2xl font-bold text-white mb-3">One-Click Launch</h3>
              <p className="text-on-surface-variant text-sm">Built your prompt? Fire it directly into ChatGPT, Claude, Gemini, or Perplexity — securely encoded.</p>
            </div>
          </div>

          {/* Voice Dictation */}
          <div className="group bg-surface-container-low border border-white/5 p-8 md:p-10 flex flex-col justify-between min-h-[280px] relative overflow-hidden hover:border-primary/50 transition-colors duration-500">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                <MicIcon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-headline text-2xl font-bold text-white mb-3">Voice Dictation</h3>
              <p className="text-on-surface-variant text-sm">Brain-dump via microphone. PROMPTIFY automatically structures your raw speech into a precision framework.</p>
            </div>
          </div>

          {/* Web Grounding */}
          <div className="group bg-surface-container-low border border-white/5 p-8 md:p-10 flex flex-col justify-between min-h-[280px] relative overflow-hidden hover:border-secondary/50 transition-colors duration-500">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center mb-6 border border-secondary/20">
                <GlobeIcon className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="font-headline text-2xl font-bold text-white mb-3">Web Context</h3>
              <p className="text-on-surface-variant text-sm">Ground your prompts with live Google results via Serper API. Inject real-time knowledge into every output.</p>
            </div>
            <div className="mt-auto pt-4 border-t border-white/5">
              <span className="text-[10px] font-label text-on-surface-variant uppercase font-black tracking-widest">Coming Soon</span>
            </div>
          </div>

          {/* CTA Banner — 2 col */}
          <div className="md:col-span-2 group bg-primary text-on-primary p-8 md:p-12 flex flex-col md:flex-row items-center justify-between min-h-[240px] relative overflow-hidden">
            <div className="relative z-10 max-w-md mb-6 md:mb-0">
              <h3 className="font-headline text-3xl md:text-4xl font-black tracking-tighter leading-none mb-4">READY TO JOIN THE ELITE?</h3>
              <p className="font-medium opacity-90 text-sm md:text-base">Start architecting the future of human-AI collaboration with absolute precision.</p>
            </div>
            <button
              onClick={onEnter}
              className="relative z-10 px-8 md:px-12 py-4 md:py-5 bg-on-primary text-primary font-headline font-black text-base md:text-xl tracking-tighter uppercase hover:scale-105 transition-transform active:scale-95"
            >
              Open Workspace
            </button>
          </div>

          {/* Secure Storage */}
          <div className="group bg-surface-container-low border border-white/5 p-8 md:p-10 flex flex-col justify-between min-h-[280px] relative overflow-hidden hover:border-tertiary/50 transition-colors duration-500">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-tertiary/10 flex items-center justify-center mb-6 border border-tertiary/20">
                <ShieldIcon className="w-5 h-5 text-tertiary" />
              </div>
              <h3 className="font-headline text-2xl font-bold text-white mb-3">Rate-Limited & Secure</h3>
              <p className="text-on-surface-variant text-sm">Built-in client-side rate limiting, API key validation, and input sanitization guard your every request.</p>
            </div>
            <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5 relative z-10">
              <span className="text-[10px] font-label text-on-surface-variant uppercase font-black tracking-widest">Defense-Grade</span>
              <TargetIcon className="w-4 h-4 text-tertiary" />
            </div>
          </div>
        </div>
      </section>

      {/* ── WAITLIST CTA ──────────────────────────────────── */}
      <section id="waitlist" className="py-20 md:py-32 px-6 md:px-8 bg-surface-container-lowest relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
          <h2 className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white">SECURE YOUR ACCESS</h2>
          <p className="text-on-surface-variant text-base md:text-xl max-w-xl mx-auto font-light leading-relaxed">
            We are slowly onboarding organizations that prioritize technical precision. Enter your professional email to join the queue.
          </p>
          <div className="max-w-md mx-auto relative">
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full bg-surface-container border-b border-white/10 p-4 md:p-5 font-headline font-bold text-white placeholder:text-on-surface-variant/30 focus:outline-none focus:border-secondary transition-colors text-sm md:text-base"
            />
            <button
              onClick={onEnter}
              className="absolute right-2 top-2 bottom-2 px-4 md:px-6 bg-secondary text-on-secondary font-headline font-black text-xs tracking-widest uppercase hover:brightness-110 transition-all"
            >
              Request
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-[10px] font-label font-black text-on-surface-variant/40 tracking-[0.4em] uppercase">
            <span>Limited Slots</span>
            <span>•</span>
            <span>Enterprise Ready</span>
            <span>•</span>
            <span>Early Access</span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="w-full py-10 md:py-12 px-6 md:px-8 border-t border-white/5 bg-surface-container-low relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-1.5 text-center md:text-left">
            <div className="text-lg md:text-xl font-black text-white font-headline tracking-tighter">PROMPTIFY</div>
            <p className="text-xs tracking-wide text-on-surface-variant">© {new Date().getFullYear()} PROMPTIFY. ARCHITECTING THE LATENT SPACE.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs tracking-wide">
            {['Documentation', 'Privacy Policy', 'Terms of Service'].map(link => (
              <button key={link} className="text-on-surface-variant hover:text-primary transition-colors font-label">{link}</button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={onEnter} className="w-9 h-9 bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-white transition-colors">
              <SparklesIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
