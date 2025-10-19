const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const auth = require("../middleware/authMiddleware");

router.post("/:docId", auth, chatController.sendMessage);
router.get("/:docId", auth, chatController.getChatHistory);

module.exports = router;
