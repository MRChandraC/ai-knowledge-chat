require('dotenv').config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors"); // ✅ add this
const connectDB = require("./config/db");
const documentRoutes = require("./routes/documentRoutes");
const chatRoutes = require("./routes/chatRoutes");
const websocketService = require("./services/websocketService");
const authRoutes = require("./routes/authRoutes");

connectDB();

const app = express();
const server = http.createServer(app);

// Enable CORS for REST APIs
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// Socket.IO
const io = new Server(server, { cors: { origin: "*" } });
websocketService(io);

// Routes
app.use("/api/documents", documentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
