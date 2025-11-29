const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const axios = require("axios"); 

require("dotenv").config();

const FRONT_ORIGIN = process.env.FRONT_ORIGIN || "http://localhost:3000";

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: FRONT_ORIGIN, // URL do seu frontend
    methods: ["GET", "POST"],
  },
});

// URL do backend Django dentro do docker-compose
const DJANGO_BASE_URL = "http://backend:8000/api";

io.on("connection", (socket) => {
  console.log("Usuário conectado:", socket.id);

  socket.on("join", ({ conversaId }) => {
    console.log("join sala", conversaId);
    socket.join(`conversa-${conversaId}`);
  });

  socket.on("mensagem", async (data) => {
    console.log("📩 mensagem recebida no socket:", data);

    // realtime
    io.to(`conversa-${data.conversaId}`).emit("mensagem", data);

    // persistência na API Django
    try {
      const resp = await axios.post(
        `${DJANGO_BASE_URL}/mensagens-diretas/create_mensagem_direta`,
        {
          id_conversa: data.conversaId,
          id_usuario: data.deId,
          conteudo:
            data.texto && data.texto.trim() !== ""
              ? data.texto
              : data.imagem
              ? "[imagem]"
              : "",
        }
      );
      console.log("✅ Mensagem salva no Django:", resp.data);
    } catch (err) {
      console.error(
        "❌ Erro Django:",
        err.response?.status,
        err.response?.data || err.message
      );
    }
  });
});


server.listen(3001, () => console.log("Socket.IO rodando na porta 3001"));
