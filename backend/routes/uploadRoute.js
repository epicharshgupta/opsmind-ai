const express = require("express");
const router = express.Router();
const upload = require("../multerConfig");
const SOP = require("../models/SOP");
const extractText = require("../utils/extractText");
const chunkText = require("../utils/chunkText");
const generateEmbedding = require("../utils/generateEmbedding");

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // PDF se text extract karo
    const extractedText = await extractText(req.file.path);
    const chunks = chunkText(extractedText);
    const embeddings = [];

    for (let chunk of chunks) {
      const embedding = await generateEmbedding(chunk);
      embeddings.push(embedding);
    }
    // DB me save karo
    const newFile = new SOP({
      filename: req.file.filename,
      filepath: req.file.path,
      text: extractedText,
      chunks: chunks,
      embeddings: embeddings
    });

    await newFile.save();

    res.json({ message: "File uploaded + text extracted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
