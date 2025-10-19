const Document = require("../models/Document");
const pdfService = require("../services/pdfService");

exports.uploadDocument = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    let content = "";

    // PDF
    if (file.mimetype === "application/pdf") {
      content = await pdfService.extractText(file.buffer);
    }
    // TXT
    else if (file.mimetype === "text/plain" || file.mimetype === "application/octet-stream") {
      content = file.buffer.toString("utf-8");
    } 
    else {
      return res.status(400).json({ error: "Only PDF and TXT files are allowed" });
    }

    const doc = await Document.create({
      userId: req.user?.id,
      filename: file.originalname,
      content,
      uploadDate: new Date(),
    });

    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ userId: req.user?.id });
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    // Optional: check if the document belongs to user
    const doc = await Document.findOne({ _id: id, userId: req.user?.id });
    if (!doc) return res.status(404).json({ error: "Document not found" });

    await Document.findByIdAndDelete(id);
    res.json({ message: "Document deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
