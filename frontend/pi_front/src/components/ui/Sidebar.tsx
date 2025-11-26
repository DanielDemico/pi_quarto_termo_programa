"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreatePost from "@/components/createPost";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

type NovoPost = { imagem: string; texto: string; };
type SidebarProps = {
  adicionarPost: (novo: NovoPost) => void;
};


export function Sidebar({ adicionarPost }: SidebarProps) {
  const [modalAberto, setModalAberto] = useState(false);
  const router = useRouter();
  const pathname = usePathname();


  return (
    <aside className="hidden md:flex fixed w-64 h-screen border-r border-emerald-950 bg-gray-50 p-4 flex-col justify-between">
      <div>
        <div className="flex justify-center mb-5">
          <img
            src="/images/Logo.png"
            alt="Logo do site"
            width={180}
            height={180}
          />
        </div>


        <nav className="flex flex-col">
          <Link href="/feed">
            <Button variant="ghost"
               className={cn("w-full justify-start gap-2 transition cursor-pointer btn-hover-pj",
                  pathname === "/feed" ? "msg-pj1" : ""
                )}
              >
              <img src="/icons/Home.png" alt="Pagina Inicial" width={20}
                height={20} />
              <p className="flex justify-center">Feed</p>
            </Button>
          </Link>

          <Link href="/mensagens">
            <Button variant="ghost"
               className={cn("w-full justify-start gap-2 transition cursor-pointer btn-hover-pj",
                  pathname === "/mensagens" ? "msg-pj1" : ""
                )}
              >
              <img src="/icons/Direct.png" alt="Pagina Inicial"width={20}
                height={20} /> 
               <p className="flex justify-center">Mensagens</p>
            </Button>
          </Link>


          <Button variant="ghost"
            className="w-full justify-start gap-2.5 transition cursor-pointer btn-hover-pj"
            onClick={() => setModalAberto(true)}
          >
            <img src="/icons/+.png" alt="Pagina Inicial" width={18}
                height={18} /> 
               <p className="flex justify-center">Publicar</p>
          </Button>
          {modalAberto && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
              <div className="bg-white rounded shadow-2xs p-6 w-full max-w-lg relative">
              <div className="p-2 top-3">
                  <p className="bg-linear-to-t from-green-900 via-green-400 to-green-900 bg-clip-text text-transparent font-bold">Deseja publicar Algo?</p> 
                  <button
                    onClick={() => setModalAberto(false)}
                    className="absolute top-5 right-3 left-5/6 text-3xl text-red-600 cursor-pointer">
                    ×

                  </button>
                </div>
                <CreatePost
                  onPostCriado={novo => {
                    adicionarPost(novo);
                    setModalAberto(false);
                    router.push("/feed")
                  }}
                />
              </div>
            </div>
          )}

          <Link href="/perfil">
            <Button variant="ghost"
               className={cn("w-full justify-start gap-2 transition cursor-pointer btn-hover-pj",
                  pathname === "/perfil" ? "msg-pj1" : ""
                )}
              >
              <img src="/icons/Profile.png" alt="Pagina Inicial" width={20}
                height={20} /> 
               <p className="flex justify-center">Perfil</p>
            </Button>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
