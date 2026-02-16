const express = require("express");
const router = express.Router();
const upload = require("../multerConfig");
const SOP = require("../models/SOP");
const extractText = require("../utils/extractText");
const chunkText = require("../utils/chunkText");
const generateEmbedding = require("../utils/generateEmbedding");

router.post("/upload", upload.single("file"), async (req, res) => {
  try {

    // Check file uploaded or not
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Extract text from PDF
    const extractedText = await extractText(req.file.path);

    // Chunk text
    const chunks = chunkText(extractedText);

    // Generate embeddings
    const embeddings = [];
    for (let chunk of chunks) {
      const embedding = await generateEmbedding(chunk);
      embeddings.push(embedding);
    }

    // Save to DB
    const newFile = new SOP({
      filename: req.file.filename,
      filepath: req.file.path,
      text: extractedText,
      chunks: chunks,
      embeddings: embeddings
    });

    await newFile.save();

    res.json({
      message: "File uploaded, text extracted & embeddings saved"
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
