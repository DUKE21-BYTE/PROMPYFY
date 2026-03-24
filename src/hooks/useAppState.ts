import { useState, useEffect } from 'react';
import {
  AppState,
  PromptControls,
  TaskType,
  EnhancementMode,
  EnhancementResult,
  PromptFramework
} from '../lib/types';
import { enhanceWithGroq } from '../lib/groqApi';

const initialControls: PromptControls = {
  audience: 'default',
  tone: 'default',
  format: 'default',
  length: 'default'
};

const STORAGE_KEYS = {
  API_KEY: 'groq_api_key',
  HISTORY: 'promptify_history'
};

// Client-side rate limiter: max 5 requests per minute
const rateLimiter = {
  timestamps: [] as number[],
  canMakeRequest(): boolean {
    const now = Date.now();
    // Remove timestamps older than 60 seconds
    this.timestamps = this.timestamps.filter(t => now - t < 60_000);
    return this.timestamps.length < 5;
  },
  record() {
    this.timestamps.push(Date.now());
  }
};

export function useAppState() {
  const [state, setState] = useState<AppState>({
    input: '',
    taskType: 'auto',
    mode: 'precise',
    controls: initialControls,
    isEnhancing: false,
    currentResult: null,
    history: [],
    apiKey: '',
    selectedModel: 'llama-3.3-70b-versatile',
    error: null,
    searchQuery: '',
    refinementPrompt: '',
    framework: 'auto',
    showComparison: false,
    comparisonModel: 'llama-3.1-8b-instant',
    comparisonResult: null
  });

  // Load from storage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem(STORAGE_KEYS.API_KEY);
    const savedHistoryStr = localStorage.getItem(STORAGE_KEYS.HISTORY);
    
    let savedHistory: EnhancementResult[] = [];
    if (savedHistoryStr) {
      try {
        const parsed = JSON.parse(savedHistoryStr);
        // Validate shape before trusting storage data
        if (Array.isArray(parsed)) {
          savedHistory = parsed.filter(
            (item): item is EnhancementResult =>
              item &&
              typeof item.id === 'string' &&
              typeof item.enhanced_prompt === 'string' &&
              typeof item.original_input === 'string' &&
              typeof item.timestamp === 'number'
          );
        }
      } catch (e) {
        console.error('Failed to parse history from storage, clearing.');
        localStorage.removeItem(STORAGE_KEYS.HISTORY);
      }
    }

    setState((prev) => ({
      ...prev,
      apiKey: savedKey || import.meta.env.VITE_GROQ_API_KEY || '',
      history: savedHistory
    }));
  }, []);

  // Sync history to storage
  useEffect(() => {
    if (state.history.length > 0) {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(state.history));
    }
  }, [state.history]);

  const setInput = (input: string) => setState(prev => ({ ...prev, input }));
  const setTaskType = (taskType: TaskType) => setState(prev => ({ ...prev, taskType }));
  const setMode = (mode: EnhancementMode) => setState(prev => ({ ...prev, mode }));
  const setModel = (selectedModel: string) => setState(prev => ({ ...prev, selectedModel }));
  const setControls = (controls: PromptControls) => setState(prev => ({ ...prev, controls }));
  const setError = (error: string | null) => setState(prev => ({ ...prev, error }));
  const setSearchQuery = (searchQuery: string) => setState(prev => ({ ...prev, searchQuery }));
  const setRefinementPrompt = (refinementPrompt: string) => setState(prev => ({ ...prev, refinementPrompt }));
  const setFramework = (framework: PromptFramework) => setState(prev => ({ ...prev, framework }));
  const setShowComparison = (showComparison: boolean) => setState(prev => ({ ...prev, showComparison }));
  const setComparisonModel = (comparisonModel: string | null) => setState(prev => ({ ...prev, comparisonModel }));
  
  const handleEnhance = async (isRefining = false) => {
    // Sanitize: trim and enforce a hard max-length to prevent huge API payloads
    const trimmedInput = state.input.trim().slice(0, 4000);
    if (!trimmedInput) return;
    
    // Client-side rate limit check
    if (!rateLimiter.canMakeRequest()) {
      setError('Rate limit reached. Please wait a moment before enhancing again (max 5 per minute).');
      return;
    }

    const keyToUse = state.apiKey || import.meta.env.VITE_GROQ_API_KEY;
    if (!keyToUse) {
      setError('Groq API Key not found. Please set VITE_GROQ_API_KEY in your .env file.');
      return;
    }
    // Basic key format validation — Groq keys start with "gsk_"
    if (!keyToUse.startsWith('gsk_')) {
      setError('Invalid Groq API Key format. Keys should start with "gsk_".');
      return;
    }

    setState((prev) => ({
      ...prev,
      isEnhancing: true,
      error: null
    }));
    rateLimiter.record();

    // Construct the input
    let finalInput = trimmedInput;
    if (isRefining && state.currentResult) {
      finalInput = `Refine this prompt: "${state.currentResult.enhanced_prompt}"\n\nInstructions: ${state.refinementPrompt.trim().slice(0, 1000)}`;
    }

    try {
      // Enhancement complete
      const resultPromise = enhanceWithGroq(
        finalInput,
        state.taskType,
        state.mode,
        state.controls,
        keyToUse,
        state.selectedModel,
        state.framework
      );
      
      let comparisonResultPromise = null;
      if (state.showComparison && state.comparisonModel) {
        comparisonResultPromise = enhanceWithGroq(
          finalInput,
          state.taskType,
          state.mode,
          state.controls,
          keyToUse,
          state.comparisonModel,
          state.framework
        );
      }

      const [result, comparisonResult] = await Promise.all([
        resultPromise,
        comparisonResultPromise || Promise.resolve(null)
      ]);

      setState((prev) => ({
        ...prev,
        isEnhancing: false,
        currentResult: result,
        comparisonResult,
        history: [result, ...prev.history].slice(0, 50),
        taskType: prev.taskType === 'auto' ? result.detected_task : prev.taskType,
        refinementPrompt: '' // Reset refinement
      }));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred';
      console.error('Failed to enhance prompt:', error);
      setState((prev) => ({
        ...prev,
        isEnhancing: false,
        error: message
      }));
    }
  };

  const handleSelectHistory = (item: EnhancementResult) => {
    setState((prev) => ({
      ...prev,
      currentResult: item,
      taskType: item.detected_task,
      input: item.original_input, // Now we can restore the input too!
      error: null
    }));
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    setState(prev => ({ ...prev, history: [] }));
  }

  return {
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
  };
}
