const axios = require("axios");

async function generateEmbedding(text) {
  const response = await axios.post(
    "http://127.0.0.1:11434/api/embed",
    {
      model: "nomic-embed-text",
      input: text
    }
  );

  return response.data.embeddings[0];
}

module.exports = generateEmbedding;
