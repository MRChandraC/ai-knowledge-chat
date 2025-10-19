const ChatMessage = require("../models/ChatMessage");
const Document = require("../models/Document");
const aiService = require("../services/aiService");

// Send a message to AI for a specific document
exports.sendMessage = async (req, res) => {
  try {
    const { docId } = req.params;
    const { message } = req.body;

    // Check if document exists
    const doc = await Document.findById(docId);
    if (!doc) return res.status(404).json({ error: "Document not found" });

    // Ask AI with document content and user message
    const aiResponse = await aiService.askAI(doc.content, message);

    // Save chat message to database
    const chat = await ChatMessage.create({
      documentId: docId,
      userMessage: message,
      aiResponse,
      timestamp: new Date(),
    });

    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get chat history for a document
exports.getChatHistory = async (req, res) => {
  try {
    const { docId } = req.params;

    // Fetch chat messages for the document, sorted by timestamp
    const chats = await ChatMessage.find({ documentId: docId }).sort({ timestamp: 1 });

    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
