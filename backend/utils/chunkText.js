function chunkText(text, chunkSize = 500) {
  const chunks = [];
  let startIndex = 0;

  while (startIndex < text.length) {
    chunks.push(text.substring(startIndex, startIndex + chunkSize));
    startIndex += chunkSize;
  }

  return chunks;
}

module.exports = chunkText;
