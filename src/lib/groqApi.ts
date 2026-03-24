import {
  TaskType,
  EnhancementMode,
  PromptControls,
  EnhancementResult } from
'./types';

export async function enhanceWithGroq(
input: string,
taskType: TaskType,
mode: EnhancementMode,
  controls: PromptControls,
  apiKey: string,
  model = 'llama-3.3-70b-versatile',
  framework = 'auto')
: Promise<EnhancementResult> {
  const systemPrompt = `You are an expert prompt engineer. Your goal is to take the user's rough input and turn it into a highly structured, effective prompt for an AI model.

You MUST respond in valid JSON format with the following schema:
{
  "enhanced_prompt": "The final, highly detailed and structured prompt ready to be copy-pasted into an AI",
  "detected_task": "One of: writing, marketing, coding, image, study, email. (Detect the best fit if the user selected 'auto')",
  "improvement_notes": ["Array of 3-5 short strings explaining what you added/improved"],
  "quality_score": number (A score from 0-100 indicating the quality, structure, and effectiveness of the enhanced prompt)
}

Guidelines for enhancement based on mode:
- quick: Keep it concise but clear. Fix ambiguities.
- precise: Highly structured, use markdown headings, explicit constraints, and clear formatting rules.
- creative: Expansive, imaginative, add interesting angles or creative constraints the user didn't think of.
- expert: Deep, nuanced, include advanced parameters, edge-case handling, and expert-level context.

Apply the user's requested controls (Audience, Tone, Format, Length) strictly if they are not set to 'default'.`;

  const userMessage = `
Raw Input: ${input}
Requested Task Type: ${taskType}
Enhancement Mode: ${mode}
Controls:
- Audience: ${controls.audience}
- Tone: ${controls.tone}
- Format: ${controls.format}
- Length: ${controls.length}

Requested Framework: ${framework}
Instructions: If a specific framework (CO-STAR, RISEN, CRAFT) is requested, you MUST structure the enhanced_prompt according to that framework.

Enhance this prompt and return the JSON.`;

  const response = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }],

        response_format: { type: 'json_object' },
        temperature: mode === 'creative' ? 0.8 : mode === 'precise' ? 0.2 : 0.5
      })
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.error?.message || `API Error: ${response.status}`
    );
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;

  if (!content) {
    throw new Error('Received empty response from Groq API');
  }

  try {
    const parsed = JSON.parse(content);
    
    // Validate required fields exist and are the right type
    if (typeof parsed.enhanced_prompt !== 'string' || !parsed.enhanced_prompt.trim()) {
      throw new Error('API returned an empty or invalid enhanced_prompt.');
    }
    
    const validTasks = ['writing', 'marketing', 'coding', 'image', 'study', 'email', 'auto'];
    const detectedTask = validTasks.includes(parsed.detected_task)
      ? parsed.detected_task
      : (taskType === 'auto' ? 'writing' : taskType);

    return {
      id: crypto.randomUUID(),
      original_input: input,
      // Trim to prevent runaway content
      enhanced_prompt: parsed.enhanced_prompt.trim().slice(0, 10000),
      detected_task: detectedTask,
      improvement_notes: Array.isArray(parsed.improvement_notes)
        ? parsed.improvement_notes.filter((n: unknown) => typeof n === 'string').slice(0, 10)
        : ['Enhanced prompt structure'],
      quality_score: typeof parsed.quality_score === 'number'
        ? Math.min(100, Math.max(0, Math.round(parsed.quality_score)))
        : 85,
      timestamp: Date.now()
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Failed to parse response from Groq API';
    throw new Error(msg);
  }
}