const express = require("express");
const router = express.Router();
const SOP = require("../models/SOP");
const generateEmbedding = require("../utils/generateEmbedding");
const cosineSimilarity = require("../utils/cosineSimilarity");

router.post("/search", async (req, res) => {
  try {
    const { query } = req.body;

    const queryEmbedding = await generateEmbedding(query);
    const docs = await SOP.find();

    let bestMatch = "";
    let highestScore = -1;

    docs.forEach(doc => {
      doc.embeddings.forEach((emb, i) => {
        const score = cosineSimilarity(queryEmbedding, emb);
        if (score > highestScore) {
          highestScore = score;
          bestMatch = doc.chunks[i];
        }
      });
    });

    res.json({
      answer: bestMatch,
      similarity: highestScore
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
