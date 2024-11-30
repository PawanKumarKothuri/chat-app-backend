// Import required modules
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: "https://kpk12.netlify.app", // Replace with your deployed frontend URL
  methods: ["GET", "POST"],
}));
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io and configure CORS for WebSocket connections
const io = new Server(server, {
  cors: {
    origin: "https://kpk12.netlify.app", // Replace with your deployed frontend URL
    methods: ["GET", "POST"],
  },
});

// Socket.io events
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle receiving a message
  socket.on("message", (data) => {
    console.log("Message received:", data);
    io.emit("message", data); // Broadcast the message to all connected clients
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Default route for backend health check
app.get("/", (req, res) => {
  res.send("Chat App Backend is Running");
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
