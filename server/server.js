import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
const app = express();
const port = 3001;

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });
  socket.on("test", (data) => {
    console.log(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.emit(
    "recognized",
    {
      name: "Srujan1212",
      id: "2020BCS0074",
    }
  );

  socket.emit(
    "unrecognized",
    {
      name:"sirisrujan121543",
      id: "2020BCS0074",
    }
  );
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
