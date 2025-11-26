"use client";
import { Sidebar } from "@/components/ui/Sidebar";
import { useState } from "react";
import PostCard from "@/components/Post";
import BottomNav from "@/components/ui/BottomNav";
import CreatePost from "@/components/createPost";
import HeaderLogo from "@/components/ui/HeaderLogo";

type NovoPost = { imagem: string; texto: string; };
type Post = {
  id: number;
  imagem?: string;
  texto: string;
  usuario?: string;
  avatarUrl?: string;
  tempo?: string;
  localizacao?: string;
};

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalAberto, setModalAberto] = useState(false);

  function adicionarPost(novo: NovoPost) {
    setPosts([{
      id: Date.now(),
      ...novo,
      usuario: "harryprescott",
      avatarUrl: "/icons/Default.png",
      tempo: "agora",
      localizacao: "Localização"
    }, ...posts]);
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
                imagem={post.imagem ?? "/imagem aqui"}
                texto={post.texto}
                usuario={post.usuario ?? "Desconhecido"}
                avatarUrl={post.avatarUrl ?? "/icons/Default.png"}
                tempo={post.tempo ?? "agora"}
                localizacao={post.localizacao ?? "Localização"}
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
