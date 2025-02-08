import OpenAI from 'openai';
import payload from 'payload';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in .env
});

export const generateAIContent = async (prompt: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    return response.choices[0]?.message?.content || 'No response from AI';
  } catch (error) {
    console.error('❌ OpenAI Error:', error);
    return 'Error generating AI content';
  }
};
