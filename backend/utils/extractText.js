const fs = require("fs");
const pdf = require("pdf-parse");

async function extractText(filePath) {
  const buffer = fs.readFileSync(filePath);
  const data = await pdf(buffer);

  // Split roughly page-wise (simple approach)
  const pages = data.text.split("\f");

  return pages.map((pageText, index) => ({
    page: index + 1,
    text: pageText.trim()
  }));
}

module.exports = extractText;