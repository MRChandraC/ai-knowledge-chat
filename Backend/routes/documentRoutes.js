const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");
const upload = require("../middleware/uploadMiddleware");
const auth = require("../middleware/authMiddleware");

router.post("/upload", auth, upload.single("file"), documentController.uploadDocument);
router.get("/", auth, documentController.getDocuments);
router.delete("/:id", auth, documentController.deleteDocument);

module.exports = router;
