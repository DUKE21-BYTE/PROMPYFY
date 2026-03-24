// Vision API call using Groq's vision-capable model (llama-4-scout)
export async function analyzeImageWithGroq(
  imageBase64: string,
  mimeType: string,
  apiKey: string
): Promise<string> {
  if (!apiKey.startsWith('gsk_')) {
    throw new Error('Invalid Groq API Key format.');
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:${mimeType};base64,${imageBase64}`,
              },
            },
            {
              type: 'text',
              text: `Please provide a comprehensive, detailed description of this image. Include:
1. What is shown in the image (main subject, objects, people, scene)
2. Colors, textures, lighting, and visual quality
3. Context or purpose (e.g. screenshot, photo, diagram, artwork)
4. Any text visible in the image
5. Overall mood or tone

Format your response clearly with these sections. Be thorough and precise — the description will be used to generate a structured AI prompt.`,
            },
          ],
        },
      ],
      max_tokens: 1024,
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => null);
    throw new Error(err?.error?.message || `Vision API Error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('Empty response from vision API.');
  return content.trim();
}
