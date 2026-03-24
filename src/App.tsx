import React from 'react';
import { TaskSetupPanel } from './components/TaskSetupPanel';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { AILauncher } from './components/AILauncher';
import { StatsTracker } from './components/StatsTracker';
import { PromptGenerator } from './components/PromptGenerator';
import { ImageAnalyzer } from './components/ImageAnalyzer';
import { LandingPage } from './components/LandingPage';
import { AlertCircleIcon, MenuIcon, XIcon, LayoutDashboardIcon, RocketIcon, ActivityIcon, WandIcon, ScanIcon } from 'lucide-react';
import { useAppState } from './hooks/useAppState';

export function App() {
  const {
    state,
    setInput,
    setTaskType,
    setMode,
    setControls,
    setError,
    handleEnhance,
    handleSelectHistory,
    clearHistory,
    setModel,
    setSearchQuery,
    setRefinementPrompt,
    setFramework,
    setShowComparison,
    setComparisonModel
  } = useAppState();

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [activePage, setActivePage] = React.useState<'landing' | 'workspace' | 'launcher' | 'tracker' | 'generator' | 'analyzer'>('landing');

  const apiKey = import.meta.env.VITE_GROQ_API_KEY as string ?? '';

  const navItems = [
    { id: 'workspace', label: 'Workspace', icon: LayoutDashboardIcon },
    { id: 'launcher', label: 'AI Launch', icon: RocketIcon },
    { id: 'tracker', label: 'Stats', icon: ActivityIcon },
    { id: 'generator', label: 'Generator', icon: WandIcon },
    { id: 'analyzer', label: 'Image AI', icon: ScanIcon },
  ] as const;

  const renderNav = (isMobile: boolean) => (
    <div className={`flex ${isMobile ? 'flex-col gap-1 p-4 border-b border-white/5' : 'items-center gap-1'}`}>
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = activePage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => { setActivePage(item.id); if (isMobile) setIsSidebarOpen(false); }}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-label font-bold uppercase tracking-wider transition-colors ${
              isActive
                ? 'text-primary border-b-0 md:border-b md:border-primary'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {item.label}
          </button>
        );
      })}
    </div>
  );

  if (activePage === 'landing') {
    return <LandingPage onEnter={() => setActivePage('workspace')} />;
  }

  return (
    <div className="flex flex-col h-screen w-full bg-surface text-on-surface overflow-hidden font-body relative">
      {/* Desktop Header */}
      <div className="hidden md:flex h-16 border-b border-white/5 bg-surface-container-lowest/80 backdrop-blur-xl items-center justify-between px-8 shrink-0 z-50">
        <div className="font-headline font-black tracking-tighter text-white uppercase text-xl">
          PROMPTIFY
        </div>
        {renderNav(false)}
      </div>

      <div className="flex flex-1 overflow-hidden relative">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 inset-x-0 h-14 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-white/5 z-50 flex items-center justify-between px-5">
        <div className="font-headline font-black tracking-tighter text-white uppercase text-base">PROMPTIFY</div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-on-surface-variant hover:text-white transition-colors"
        >
          {isSidebarOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </div>

      {/* Left Panel: Setup */}
      <div className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 fixed md:relative inset-y-0 left-0 h-full w-72 md:w-64 z-[60] md:z-auto transition-transform duration-300 ease-in-out bg-surface-container-low
        ${activePage !== 'workspace' ? 'md:hidden' : 'md:flex md:flex-col'} shrink-0 shadow-2xl md:shadow-none flex flex-col
      `}>
        {/* Mobile Navigation Injected at Top of Sidebar */}
        <div className="md:hidden">
          {renderNav(true)}
        </div>
        
        <div className={`flex-1 flex flex-col min-h-0 ${activePage !== 'workspace' && 'hidden md:flex'}`}>
        <TaskSetupPanel
          taskType={state.taskType}
          setTaskType={setTaskType}
          mode={state.mode}
          setMode={setMode}
          history={state.history}
          onSelectHistory={(item) => {
            handleSelectHistory(item);
            setIsSidebarOpen(false);
          }}
          onClearHistory={clearHistory}
          selectedModel={state.selectedModel}
          setModel={setModel}
          framework={state.framework}
          setFramework={setFramework}
          showComparison={state.showComparison}
          setShowComparison={setShowComparison}
          comparisonModel={state.comparisonModel}
          setComparisonModel={setComparisonModel}
          searchQuery={state.searchQuery}
          setSearchQuery={setSearchQuery}
        />
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[55]"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Center Panel: Input / Active Page */}
      <div className={`flex-1 min-w-0 border-r border-zinc-800 flex flex-col pt-14 md:pt-0 ${activePage !== 'workspace' && 'border-none'}`}>
        
        {activePage === 'launcher' && <AILauncher prompt={state.currentResult?.enhanced_prompt} />}
        {activePage === 'tracker' && <StatsTracker history={state.history} />}
        {activePage === 'generator' && <PromptGenerator />}
        {activePage === 'analyzer' && <ImageAnalyzer apiKey={apiKey} />}

        {activePage === 'workspace' && (
          <div className="flex flex-col h-full overflow-hidden">
        {state.error && (
          <div className="bg-red-500/10 border-b border-red-500/20 p-3 flex items-center gap-3 text-red-400 text-sm shrink-0">
            <AlertCircleIcon className="w-4 h-4 shrink-0" />
            <p className="flex-1">{state.error}</p>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-300 underline text-xs"
            >
              Dismiss
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <InputPanel
            input={state.input}
            setInput={setInput}
            controls={state.controls}
            setControls={setControls}
            onEnhance={() => handleEnhance(false)}
            isEnhancing={state.isEnhancing}
            detectedTask={state.currentResult?.detected_task || null}
          />
        </div>
          </div>
        )}
      </div>

      {/* Right Panel: Output */}
      {activePage === 'workspace' && (
      <div className={`hidden lg:flex ${state.showComparison ? 'flex-1' : 'w-[400px] xl:w-[500px]'} shrink-0 divide-x divide-zinc-800`}>
        <div className="flex-1 min-w-0">
          <OutputPanel
            result={state.currentResult}
            isEnhancing={state.isEnhancing}
            onRegenerate={(refining) => handleEnhance(refining)}
            refinementPrompt={state.refinementPrompt}
            setRefinementPrompt={setRefinementPrompt}
            modelName={state.selectedModel}
          />
        </div>
        {state.showComparison && (
          <div className="flex-1 min-w-0">
            <OutputPanel
              result={state.comparisonResult}
              isEnhancing={state.isEnhancing}
              onRegenerate={(refining) => handleEnhance(refining)}
              refinementPrompt={state.refinementPrompt}
              setRefinementPrompt={setRefinementPrompt}
              modelName={state.comparisonModel}
            />
          </div>
        )}
      </div>
      )}

      {/* Mobile/Tablet Output Overlay */}
      <div
        className="lg:hidden fixed inset-x-0 bottom-0 h-[60vh] bg-zinc-900 border-t border-zinc-800 shadow-2xl transform transition-transform duration-300 ease-in-out z-40"
        style={{
          transform: (state.currentResult || state.isEnhancing)
            ? 'translateY(0)'
            : 'translateY(100%)'
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1.5 bg-zinc-700 rounded-full" />
        <div className="h-full flex divide-x divide-zinc-800">
          <div className="flex-1 min-w-0">
            <OutputPanel
              result={state.currentResult}
              isEnhancing={state.isEnhancing}
              onRegenerate={(refining) => handleEnhance(refining)}
              refinementPrompt={state.refinementPrompt}
              setRefinementPrompt={setRefinementPrompt}
              modelName={state.selectedModel}
            />
          </div>
          {state.showComparison && (
            <div className="flex-1 min-w-0 hidden md:block">
              <OutputPanel
                result={state.comparisonResult}
                isEnhancing={state.isEnhancing}
                onRegenerate={(refining) => handleEnhance(refining)}
                refinementPrompt={state.refinementPrompt}
                setRefinementPrompt={setRefinementPrompt}
                modelName={state.comparisonModel}
              />
            </div>
          )}
        </div>
      </div>

      </div>
    </div>
  );
}