const multer = require("multer");
const path = require("path");

// Use memory storage so file buffer is available for pdf-parse
const storage = multer.memoryStorage();

// Allowed file extensions
const allowedExtensions = [".pdf", ".txt"];

// Multer file filter
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  // Check for PDF or TXT by extension or MIME type
  if (
    (ext === ".pdf" && mimetype === "application/pdf") ||
    (ext === ".txt" && (mimetype === "text/plain" || mimetype === "application/octet-stream"))
  ) {
    cb(null, true); // accept file
  } else {
    cb(new Error("Only PDF and TXT files are allowed"), false);
  }
};

// Maximum file size: 5MB (adjust as needed)
const limits = {
  fileSize: 5 * 1024 * 1024,
};

// Export upload middleware
const upload = multer({
  storage,
  fileFilter,
  limits,
});

module.exports = upload;
