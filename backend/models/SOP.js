const mongoose = require("mongoose");

const sopSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
  text: String,
  category: String,
chunks: [
  {
    text: String,
    page: Number
  }
],
embeddings: [[Number]],
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  
});

module.exports = mongoose.model("SOP", sopSchema);
