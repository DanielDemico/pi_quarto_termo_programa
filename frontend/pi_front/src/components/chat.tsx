import { useEffect, useRef, useState } from "react";
import socket from "../util/socket";
import { apiMensagensDiretas } from "@/app/services/apiMen";

type ChatProps = {
  conversaId: number;
  contato: { id: number; nome: string; avatar: string };
  usuarioLogado: { id: number; nome: string; avatar: string };
};

type Mensagem = { texto: string; de: string; avatar?: string; imagem?: string };

type MensagemSocket = {
  conversaId: number;
  texto: string;
  imagem: string | null;
  deId: number;
  paraId: number;
  deNome: string;
  avatar?: string;
};


export default function Chat({  conversaId, contato, usuarioLogado }: ChatProps) {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [texto, setTexto] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function enviar() {
    if (texto.trim() !== "" || imagem) {
      socket.emit("mensagem", {
        conversaId,
        texto,
        imagem,
        deId: usuarioLogado.id,
        paraId: contato.id,
        deNome: usuarioLogado.nome,
        avatar: usuarioLogado.avatar,
      });
      setTexto("");
      setImagem(null);
    }
  }

  useEffect(() => {
    socket.emit("join", { conversaId });
  }, [conversaId]);
  
  useEffect(() => {
    async function carregarHistorico() {
      const dados = await apiMensagensDiretas.listByConversa(conversaId);
      setMensagens(
        dados.map((m) => ({
          texto: m.conteudo,
          de: m.id_usuario === usuarioLogado.id ? usuarioLogado.nome : contato.nome,
        }))
      );
    }
    carregarHistorico();
  }, [conversaId, usuarioLogado.id, usuarioLogado.nome, contato.nome]);



  useEffect(() => {
    function handler(msg: MensagemSocket) {
      if (msg.conversaId !== conversaId) return; // ignora mensagens de outras conversas
  
      setMensagens((msgs) => [
        ...msgs,
        {
          texto: msg.texto,
          de: msg.deNome,
          avatar: msg.avatar,
          imagem: msg.imagem || undefined,
        },
      ]);
    }
  
    socket.on("mensagem", handler);
    return () => {
      socket.off("mensagem", handler);
    };
  }, [conversaId]);
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-6 mb-2 space-y-2">
        {mensagens.length === 0 ? (
          <p className="text-center text-gray-400 mt-40">Nenhuma mensagem</p>
        ) : (
          mensagens.map((msg, idx) => {
            // Mensagem enviada pelo usuário logado
            const enviada = msg.de === usuarioLogado.nome;
            const showAvatar =
            idx === mensagens.length - 1 ||
            mensagens[idx + 1]?.de !== msg.de;
        
            return (
              <div
                key={idx}
                className={`flex w-full items-end mb-2 ${
                  enviada ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                    max-w-xs px-4 py-2 rounded-lg shadow
                    ${enviada
                      ? "msg-pj2 text-white"
                      : "msg-pj1 text-white"}
                  `}
                  style={{ wordBreak: "break-word" }}
                >
                  {msg.texto}
                  {msg.imagem && (
                    <img
                        src={msg.imagem}
                        alt="imagem enviada"
                        className="mt-2 rounded max-h-40 max-w-full"
                    />
                    )}
                </div>
              </div>
            );
          })
        )}
      </div>
  
      <div className=" sticky bottom-0 left-0 w-full flex items-center gap-4 -mx-4 p-2 inpu-cor rounded shadow shadow-emerald-950">
      
      {/* Botão imagem */}
      <button
        type="button"
        className="rounded-full bg-green-900 w-12 h-12 flex items-center justify-center cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <img src="/icons/IFoto.png" alt="Selecionar imagem" className="w-8 h-8" />
      </button>
      {/* Input de arquivo escondido */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              const img = reader.result as string;
            
              socket.emit("mensagem", {
                conversaId,
                texto: "",
                imagem: img,
                deId: usuarioLogado.id,
                paraId: contato.id,
                deNome: usuarioLogado.nome,
                avatar: usuarioLogado.avatar,
              });
            
              setImagem(null);
            };
            reader.readAsDataURL(file);
          }
        }}
        style={{ display: "none" }}
      />
      {/* Input de texto e botão enviar */}
      <div className="flex-1 flex items-center bg-green-50 rounded-lg px-4 py-2">
        <input
          value={texto}
          onChange={e => setTexto(e.target.value)}
          className="flex-1 bg-green-50 text-gray-800 border-none outline-0 placeholder-gray-500"
          placeholder="Digite sua mensagem..."
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              enviar();
              setImagem(null);
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            enviar();
            setImagem(null);
          }}
          className="ml-2 text-green-800 hover:text-green-900 transition "
        >
          <img src="/icons/send.png" alt="Enviar" className="w-7 h-7 hover:bg-gray-200 rounded cursor-pointer" />
        </button>
      </div>
    </div>
    </div>
  );
}
