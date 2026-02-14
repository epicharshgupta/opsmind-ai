const express = require("express");
const router = express.Router();
const upload = require("../multerConfig");
const SOP = require("../models/SOP");
const extractText = require("../utils/extractText");

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // PDF se text extract karo
    const extractedText = await extractText(req.file.path);

    // DB me save karo
    const newFile = new SOP({
      filename: req.file.filename,
      filepath: req.file.path,
      text: extractedText
    });

    await newFile.save();

    res.json({ message: "File uploaded + text extracted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
