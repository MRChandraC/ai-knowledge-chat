// pdfService.js
const pdfParse = require("pdf-parse"); // works in CommonJS v1
exports.extractText = async (buffer) => {
  const data = await pdfParse(buffer);
  return data.text;
};
