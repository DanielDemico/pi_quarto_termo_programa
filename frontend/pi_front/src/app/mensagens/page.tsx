"use client";
import Chat from "@/components/chat";
import CreatePost from "@/components/createPost";
import BottomNav from "@/components/ui/BottomNav";
import HeaderLogo from "@/components/ui/HeaderLogo";
import { Sidebar } from "@/components/ui/Sidebar";
import { useState } from "react";

type Contato = { nome: string, avatar: string };
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

export default function MensagensPage() {
    const [contatoAtivo, setContatoAtivo] = useState<Contato | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const usuarios = [
        { nome: "henrylucas", avatar: "/avatars/henry.png" },
        { nome: "luanmatheus", avatar: "/avatars/luan.png" },
    ];
    const [usuarioAtual, setUsuarioAtual] = useState(usuarios[0]);
    const [termoBusca, setTermoBusca] = useState("");

    
    const contatos: Contato[] = [
        { nome: "henrylucas", avatar: "/icons/Default.png" },
        { nome: "luanmatheus", avatar: "/icons/Default.png" },
    ];
    
    const contatosFiltrados = contatos.filter(contato =>
        contato.nome.toLowerCase().includes(termoBusca.toLowerCase())
    );

    function adicionarPost(novo: NovoPost) {
        setPosts([{
            id: Date.now(),
            ...novo,
            usuario: "harryprescott",
            avatarUrl: "/avatar-harry.png",
            tempo: "agora",
            localizacao: "Localização"
        }, ...posts]);
    }
    const [modalAberto, setModalAberto] = useState(false);



    return (
        <>
        <HeaderLogo
        showBack={!!contatoAtivo}
        onBack={() => setContatoAtivo(null)}
        />

        <div className="flex h-screen pt-16 md:pt-0">
            
            <Sidebar adicionarPost={adicionarPost} />
            <main className="flex-1 flex flex-col md:ml-64">
                <section className="h-screen w-full flex flex-col md:flex-row bg-gray-100">
                    <div className={`h-full w-full md:w-1/4 bg-white p-4 flex flex-col ${
                        contatoAtivo ? "hidden md:flex" : "flex"
                    }`}>
                        <div className="relative mb-4 mt-2">
                            <input
                                type="text"
                                placeholder="Pesquisar"
                                value={termoBusca}
                                onChange={e => setTermoBusca(e.target.value)}
                                className="w-full p-2 pl-10 rounded bg-green-900 text-white placeholder-white outline-0 border border-green-900 shadow shadow-emerald-950"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                >
                                <circle cx="11" cy="11" r="7" />
                                <line x1="16" y1="16" x2="21" y2="21" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </span>
                        </div>

                        <ul className="flex-1 overflow-y-auto px-2 pb-3 space-y-2">
                            {contatosFiltrados.map((contato, idx) => (
                                <li
                                    key={idx}
                                    className={`flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-2 py-2 rounded ${contatoAtivo?.nome === contato.nome ? "msg-pj-leci" : ""}`}
                                    onClick={() => setContatoAtivo(contato)}
                                >
                                    <img src={contato.avatar} alt={contato.nome} className="w-8 h-8 rounded-full" />
                                    <span className="font-medium">{contato.nome}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Área de conversa/chat */}
                    <div className="flex-1 flex flex-col h-full bg-gray-50">
                        {contatoAtivo ? (
                            <div className="flex flex-col h-full">
                                <div className="flex items-center gap-2 mb-4 px-6">
                                    <label className="font-semibold text-emerald-900">Usuário logado:</label>
                                    <select
                                        value={usuarioAtual.nome}
                                        onChange={e => {
                                            const usuarioSelecionado = usuarios.find(u => u.nome === e.target.value);
                                            if (usuarioSelecionado) setUsuarioAtual(usuarioSelecionado);
                                        }}
                                        className="border p-2 rounded"
                                    >
                                        {usuarios.map(u => (
                                            <option key={u.nome} value={u.nome}>{u.nome}</option>
                                        ))}
                                    </select>
                                    <img
                                        src={usuarioAtual.avatar}
                                        alt={usuarioAtual.nome}
                                        className="w-8 h-8 rounded-full ml-2"
                                    />
                                </div>

                                {/* Cabeçalho do chat */}
                                <div className="flex items-center gap-3 p-6 border-b bg-gray-50">
                                   
                                    <img src={contatoAtivo.avatar} alt={contatoAtivo.nome} className="w-15 h-15 rounded-full" />
                                    <div className="mr-12">
                                        <h2 className="text-lg font-bold text-emerald-900">{contatoAtivo.nome}</h2>
                                        <span className="text-xs text-gray-500">conversa iniciada em 30/03/2006</span>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col overflow-y-auto h-full">
                                    <Chat contato={contatoAtivo} usuarioLogado={usuarioAtual} />
                                </div>
                            </div>

                        ) : (
                            <div className="hidden md:flex flex-col items-center justify-center h-full">
                                <img src="/images/LogoSimp.png" alt="icone" className="w-30 h-30 mb-3" />
                                <h2 className="text-xl font-bold text-emerald-900">Mensagens</h2>
                                <p className="text-sm text-gray-600 mt-2">selecione alguém para conversar</p>
                            </div>
                        )}
                    </div>

                </section>
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

        {!contatoAtivo && (
        <BottomNav onPublicar={() => setModalAberto(true)} />
        )}
        </div>
        </>
    );
}
