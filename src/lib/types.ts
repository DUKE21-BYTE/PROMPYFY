export type TaskType =
'writing' |
'marketing' |
'coding' |
'image' |
'study' |
'email' |
'auto';
export type EnhancementMode = 'quick' | 'precise' | 'creative' | 'expert';
export type PromptFramework = 'auto' | 'CO-STAR' | 'RISEN' | 'CRAFT';

export interface PromptControls {
  audience: string;
  tone: string;
  format: string;
  length: string;
}

export interface EnhancementResult {
  id: string;
  original_input: string;
  enhanced_prompt: string;
  detected_task: TaskType;
  improvement_notes: string[];
  quality_score: number;
  timestamp: number;
}

export interface AppState {
  input: string;
  taskType: TaskType;
  mode: EnhancementMode;
  controls: PromptControls;
  isEnhancing: boolean;
  currentResult: EnhancementResult | null;
  history: EnhancementResult[];
  apiKey: string;
  selectedModel: string;
  error: string | null;
  searchQuery: string;
  refinementPrompt: string;
  framework: PromptFramework;
  showComparison: boolean;
  comparisonModel: string | null;
  comparisonResult: EnhancementResult | null;
}