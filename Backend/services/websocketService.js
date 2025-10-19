const ChatMessage = require("../models/ChatMessage");
const aiService = require("./aiService");
const Document = require("../models/Document");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("send_message", async ({ docId, message }) => {
      const doc = await Document.findById(docId);
      if (!doc) return socket.emit("error", "Document not found");

      const aiResponse = await aiService.askAI(doc.content, message);

      const chat = await ChatMessage.create({
        documentId: docId,
        userMessage: message,
        aiResponse,
      });

      io.to(socket.id).emit("receive_message", chat);
    });

    socket.on("disconnect", () => console.log("User disconnected"));
  });
};
