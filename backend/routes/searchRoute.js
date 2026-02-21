const express = require("express");
const router = express.Router();
const SOP = require("../models/SOP");
const generateEmbedding = require("../utils/generateEmbedding");
const cosineSimilarity = require("../utils/cosineSimilarity");

router.post("/search", async (req, res) => {
  try {
    const { query, category } = req.body;

    const queryEmbedding = await generateEmbedding(query);

    const docs = category
      ? await SOP.find({ category })
      : await SOP.find();

    let bestMatch = null;
    let highestScore = -1;

    docs.forEach(doc => {
      doc.embeddings.forEach((emb, i) => {
        const score = cosineSimilarity(queryEmbedding, emb);

        if (score > highestScore) {
          highestScore = score;

          bestMatch = {
            text: doc.chunks[i].text,
            page: doc.chunks[i].page,
            filename: doc.filename
          };
        }
      });
    });

    // 🔥 Hallucination guardrail (basic threshold)
    if (!bestMatch || highestScore < 0.65) {
      return res.json({
        answer: "I don’t know based on the available documents."
      });
    }

    res.json({
      answer: bestMatch.text,
      citation: {
        document: bestMatch.filename,
        page: bestMatch.page
      },
      similarity: highestScore
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;