const mongoose = require("mongoose");

const sopSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
  text: String,
chunks: [String],
embeddings: [[Number]],
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("SOP", sopSchema);
