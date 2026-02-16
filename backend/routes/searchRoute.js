const express = require("express");
const router = express.Router();
const SOP = require("../models/SOP");
const generateEmbedding = require("../utils/generateEmbedding");
const cosineSimilarity = require("../utils/cosineSimilarity");
const generateAnswer = require("../utils/generateAnswer");

router.post("/search", async (req, res) => {
  try {
    const { query } = req.body;

    // Query embedding generate
    const queryEmbedding = await generateEmbedding(query);

    const docs = await SOP.find();

    let bestMatch = "";
    let highestScore = -1;

// console.log(bestMatch);

    // Find most similar chunk
    docs.forEach(doc => {
      doc.embeddings.forEach((emb, i) => {
        const score = cosineSimilarity(queryEmbedding, emb);
        if (score > highestScore) {
          highestScore = score;
          bestMatch = doc.chunks[i];
        }
      });
    });

    // AI generated answer from cloud LLM
    const finalAnswer = await generateAnswer(query, bestMatch);

    res.json({
      answer: finalAnswer,
      similarity: highestScore
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
