'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiComentarios } from "@/util/api";
import { apiConversas } from "@/util/api";


type PostProps = {
    id: number;
    idUsuario: number;
    usuario: string;
    avatarUrl: string;
    imagem: string;
    texto?: string;
  };
type Comentario = {
    id: number;
    usuario: string;
    avatarUrl: string;
    texto: string;

};

export default function PostCard({
    id, idUsuario, usuario, avatarUrl,imagem, texto
}: PostProps) {
    const [curtido, setCurtido] = useState(false);
    const [likes, setLikes] = useState(0);
  
    function toggleLike() {
      if (curtido) {
        setCurtido(false);
        setLikes(likes - 1);
      } else {
        setCurtido(true);
        setLikes(likes + 1);
      }
    }

    const [comentariosAbertos, setComentariosAbertos] = useState(false);
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [novoComentario, setNovoComentario] = useState("");
    const router = useRouter();
    const usuarioLogadoId = 1;

    useEffect(() => {
        async function carregarComentarios() {
          try {
            const data = await apiComentarios.listByPost(id);
            setComentarios(
              data.map(c => ({
                id: c.id,
                usuario: c.usuario_nome,
                avatarUrl: "/icons/Default.png", // ou c.usuario_image_url se você adicionar no schema
                texto: c.texto,
              }))
            );
          } catch (e) {
            console.error("Erro ao carregar comentários", e);
          }
        }
        carregarComentarios();
      }, [id]);


    async function adicionarComentario() {
        if (!novoComentario.trim()) return;
    
        try {
          const novo = await apiComentarios.create({
            id_post: id,
            id_usuario: 1, // TODO: id do usuário logado
            conteudo: novoComentario,
          });
    
          setComentarios(prev => [
            ...prev,
            {
              id: novo.id,
              usuario: novo.usuario_nome,
              avatarUrl: "/icons/Default.png", // ou novo.usuario_image_url se tiver
              texto: novo.texto,
            },
          ]);
          setNovoComentario("");
        } catch (e) {
          console.error("Erro ao criar comentário", e);
        }
      }
      async function iniciarConversa() {
        try {
          const conversa = await apiConversas.create({
            id_usuario1: usuarioLogadoId,
            id_usuario2: idUsuario,
          });
          router.push(
            `/mensagens?conversaId=${conversa.id}` +
            `&contatoId=${idUsuario}` +
            `&contatoNome=${encodeURIComponent(usuario)}` +
            `&contatoAvatar=${encodeURIComponent(avatarUrl)}`
          );
        } catch (e) {
          console.error("Erro ao iniciar conversa", e);
          alert("Erro ao iniciar conversa.");
        }
      }
    


    return (
        <div className="bg-white rounded max-w-full sm:max-w-md md:max-w-xl mx-auto mb-7 border border-green-900 shadow">
            {/* Topo: usuário */}
            <div className="flex items-center gap-2 p-2 sm:p-4 border-b border-green-900 shadow">
                <img src={avatarUrl} alt={usuario} className="w-8 h-8 rounded-full" />
                <div>
                    <div className="font-semibold leading-tight">{usuario}</div>
                   
                </div>
                
            </div>
            <div className="w-full flex justify-center p-2 sm:p-4">
                <img
                    src={imagem}
                    alt="Post"
                    className="rounded-lg w-full object-contain max-h-64 sm:max-h-80 md:max-h-96"
                />
            </div>
          
            {texto && (
                <div className="p-4 border-b border-b-green-900 shadow text-sm">{texto}</div>
            )}
        
            <div className="flex gap-3 px-4 py-2 text-xl text-gray-500 items-center">
                <button
                    aria-label="Curtir"
                    onClick={toggleLike}
                    className={curtido ? "text-red-500" : ""}
                >
                    <img 
                        src={curtido ? "/icons/CAtivo.png" : "/icons/coracao.png"}
                        alt="curtir"
                        className="w-5.5 h-5.5 cursor-pointer transition"
                    />
                </button>
                <span className="text-sm text-gray-700">{likes}</span>
                <button
                    aria-label="Comentar"
                    onClick={() => setComentariosAbertos(!comentariosAbertos)}
                >
                    <img 
                        src={comentariosAbertos ? "/icons/Comment.png" : "/icons/CommentN.png"}
                        alt="Comentarios"
                        className="w-5.5 h-5.5 cursor-pointer transition"
                    />
                </button>
                <button
                    aria-label="Compartilhar"
                    onClick={iniciarConversa}
                    >
                    <img
                        src="/icons/Direct.png"
                        alt="Compartilhar"
                        className="w-4.5 h-4.5 cursor-pointer"
                    />
                </button>

            </div>
            {/* Área de comentários (toggle) */}
            {comentariosAbertos && (
                <div className="w-full px-4 py-2 border-t border-t-green-900 shadow shadow-emerald-950">
                    <p className="text-sm text-gray-600 mb-2">Comentários:</p>
                    <ul  className="mb-2 space-y-2 overflow-y-auto" style={{ maxHeight: "10rem"}}>
                        {comentarios.map(com => (
                            <li key={com.id} className="flex items-center gap-2">
                                <img
                                    src={com.avatarUrl}
                                    alt={com.usuario}
                                    className="w-6 h-6 rounded-full"
                                />
                                <span className="font-bold text-xs">{com.usuario}: </span>
                                <span className="text-sm">{com.texto}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex gap-2  w-full border border-green-900 shadow rounded">
                        <input
                            type="text"
                            value={novoComentario}
                            onChange={e => setNovoComentario(e.target.value)}
                            placeholder="Adicionar comentário..."
                            className="flex-1  p-2 outline-0"
                            onKeyDown={e => {
                                if (e.key === "Enter"){
                                    e.preventDefault();
                                    adicionarComentario();
                                }
                            }}
                        />
                        <button
                            type="button"
                            onClick={adicionarComentario}
                            className="bg-green-950 text-white px-2 rounded-r"
                        > Enviar
                           
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
