const express = require("express");
const router = express.Router();
const SOP = require("../models/SOP");
const generateEmbedding = require("../utils/generateEmbedding");
const cosineSimilarity = require("../utils/cosineSimilarity");
const generateAnswer = require("../utils/generateAnswer");

router.post("/search", async (req, res) => {
  try {
    
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    // 1️⃣ Generate query embedding
    const queryEmbedding = await generateEmbedding(query);

    // 2️⃣ Get all stored SOP documents
    const docs = await SOP.find();

    if (!docs.length) {
      return res.json({
        answer: "No documents uploaded yet."
      });
    }

    let scoredChunks = [];

    // 3️⃣ Compare query embedding with all stored embeddings
    docs.forEach(doc => {
      if (!doc.embeddings || !doc.chunks) return;

      doc.embeddings.forEach((emb, i) => {
        const score = cosineSimilarity(queryEmbedding, emb);

        scoredChunks.push({
          score,
          text: doc.chunks[i]?.text || "",
          page: doc.chunks[i]?.page || 1,
          filename: doc.filename
        });
      });
    });

    if (!scoredChunks.length) {
      return res.json({
        answer: "I don’t know based on the available documents."
      });
    }

    // 4️⃣ Sort by highest similarity
    scoredChunks.sort((a, b) => b.score - a.score);

    // 🔥 DEBUG (optional)
    console.log("Top similarity score:", scoredChunks[0].score);

    // 5️⃣ Take top 3 chunks
    const topChunks = scoredChunks.slice(0, 3);

    // 6️⃣ Similarity threshold (reduced from 0.65 → 0.45)
    if (topChunks[0].score < 0.45) {
      return res.json({
        answer: "I don’t know based on the available documents."
      });
    }

    // 7️⃣ Combine context
    const context = topChunks.map(chunk => chunk.text).join("\n\n");

    // 8️⃣ Send context to LLM
    const answer = await generateAnswer(query, context);

    res.json({
      answer,
      citation: {
        document: topChunks[0].filename,
        page: topChunks[0].page
      },
      confidence: topChunks[0].score
    });

  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;