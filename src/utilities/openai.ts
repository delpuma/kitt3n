import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAIContent = async (text: string, clientFeedback: string) => {
  try {
    const response = await openai.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a professional content writer.' },
        { role: 'user', content: `Rewrite this post considering the client's feedback:\n\n"${text}"\n\nFeedback: ${clientFeedback}` },
      ],
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || text; // Return new text or original if AI fails
  } catch (error) {
    console.error(`❌ Error generating AI content:`, error);
    return text; // Fallback to original text
  }
};
