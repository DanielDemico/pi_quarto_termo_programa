"use client";
import { Sidebar } from "@/components/ui/Sidebar";
import { useEffect, useState } from "react";
import { apiPosts, apiImagensPosts, PostApi } from "@/util/api";
import PostCard from "@/components/Post";
import BottomNav from "@/components/ui/BottomNav";
import CreatePost from "@/components/createPost";
import HeaderLogo from "@/components/ui/HeaderLogo";

type NovoPost = { imagem: string; texto: string };
type Post = {
  id: number;
  id_usuario: number;
  titulo: string;
  conteudo: string;
  imagem?: string;
  usuario: string;
  avatarUrl: string;
};

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalAberto, setModalAberto] = useState(false);

    async function carregarPosts() {
      try {
        const data = await apiPosts.list(); // PostApi[]
  
        const postsComImagem = await Promise.all(
          data.map(async (p) => {
            const imagens = await apiImagensPosts.listByPost(p.id);
            const primeiraImagem = Array.isArray(imagens) ? imagens[0]?.url_imagem : imagens?.url_imagem;
        
            return {
              id: p.id,
              id_usuario: p.id_usuario,
              titulo: p.titulo,
              conteudo: p.conteudo,
              imagem: primeiraImagem || "/icons/Default.png",
              usuario: p.usuario_nome,
              avatarUrl: p.usuario_image_url || "/icons/Default.png",
            } as Post;
          })
        );
  
        setPosts(postsComImagem);
      } catch (e) {
        console.error(e);
      }
    }

  useEffect(() => {
    carregarPosts();
  }, []);

  async function adicionarPost(novo: NovoPost) {
    if (!novo.imagem) {
      alert("Você precisa adicionar uma foto para publicar!");
      return;
    }

    try {
      const createdPost = await apiPosts.create({
        id_usuario: 1, // TODO: trocar pelo usuário logado
        titulo: novo.texto.slice(0, 50) || "Post",
        conteudo: novo.texto,
      });

      const createdImagem = await apiImagensPosts.create({
        id_post: createdPost.id,
        url_imagem: novo.imagem, // base64 vindo do CreatePost
      });

      await carregarPosts(); 
    } catch (err) {
      console.error("Erro ao criar post com imagem", err);
      alert("Erro ao publicar post.");
    }
  }

  return (
    <>
      
      <HeaderLogo />
      <Sidebar adicionarPost={adicionarPost} />
      <div className="flex pt-15 md:pt-0 md:flex-row h-screen md:pl-64">
        <main className="flex-1 overflow-y-auto flex flex-col items-center justify-start p-2 sm:p-4 md:p-8 bg-gray-50 mb-6">
          <div className="w-full sm:max-w-md md:max-w-xl">
            {posts.map(post => (
              <PostCard
                
                key={post.id}
                id={post.id}
                idUsuario= {post.id_usuario}
                imagem={post.imagem ?? "/imagem aqui"}
                texto={post.conteudo}
                usuario={post.usuario ?? "Desconhecido"}
                avatarUrl={post.avatarUrl ?? "/icons/Default.png"}
              />
            ))}
          </div>
        </main>
        {modalAberto && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-2xs p-4 w-full max-w-md mx-4 sm:mx-auto relative flex flex-col items-center">
              <div className="p-3">
                <p className="font-bold text-green-900">Deseja publicar Algo?</p>
                <button
                  onClick={() => setModalAberto(false)}
                  className="absolute top-5 right-3 text-3xl text-red-600 cursor-pointer"
                >
                  ×
                </button>
              </div>
              <CreatePost
                onPostCriado={novo => {
                  adicionarPost(novo);
                  setModalAberto(false);
                }}
              />
            </div>
          </div>
        )}

        <BottomNav onPublicar={() => setModalAberto(true)} />
      </div>
      </>
  )
}
