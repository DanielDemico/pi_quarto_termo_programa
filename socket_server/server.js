const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Usuário conectado:", socket.id);

  socket.on("mensagem", (data) => {
    io.emit("mensagem", data); 
  });

  socket.on("disconnect", () => {
    console.log("Usuário desconectado:", socket.id);
  });
});

server.listen(3001, () => console.log("Socket.IO rodando na porta 3001"));
