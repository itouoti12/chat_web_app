import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.error('VITE_OPENAI_API_KEY is not set in .env file');
}

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
});

export async function sendMessageToOpenAI(prompt: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0]?.message?.content || 'No response from AI';
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`OpenAI API Error: ${error.message}`);
    }
    throw new Error('Unknown error occurred');
  }
}
