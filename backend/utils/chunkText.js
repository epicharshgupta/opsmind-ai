function chunkText(pages) {
  const chunks = [];
  const chunkSize = 1000;   // bigger chunks
  const overlap = 200;      // better context continuity

  pages.forEach(page => {
    const text = page.text;

    let start = 0;

    while (start < text.length) {
      const chunk = text.substring(start, start + chunkSize).trim();

      // Skip very small useless chunks
      if (chunk.length > 150) {
        chunks.push({
          text: chunk,
          page: page.page
        });
      }

      start += chunkSize - overlap;
    }
  });

  console.log("Total chunks created:", chunks.length);

  return chunks;
}

module.exports = chunkText;