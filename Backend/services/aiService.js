const OpenAI = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.askAI = async (context, question) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: `You are a helpful AI that answers based on the document: ${context}` },
        { role: "user", content: question },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI Error:", error?.error?.message || error.message);

    // Mock response fallback if quota exceeded
    if (error.code === "insufficient_quota") {
      return `Mock AI response (quota exceeded): "${question}"`;
    }

    throw error;
  }
};
