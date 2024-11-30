const express = require("express");
const http = require("http");
// const cors = require("cors");
const { Server } = require("socket.io");

const cors = require("cors");

app.use(
  cors({
    origin: "https://kpk12.netlify.app", // Replace with your Netlify URL
    methods: ["GET", "POST"],
  })
);



const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://kpk12.netlify.app", // Update with your frontend URL
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Chat App Backend is Running");
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on("send_message", (data) => {
    io.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
