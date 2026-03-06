const axios = require("axios");

async function generateAnswer(question, context) {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are an SOP AI assistant."
          },
          {
            role: "user",
            content: `You are an enterprise AI assistant.

Answer ONLY from the provided context below.
If the answer is not explicitly present in the context,
reply exactly with:
"I don’t know based on the available documents."

Context:
${context}

Question:
${question}`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error("Groq API Error:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = generateAnswer;
