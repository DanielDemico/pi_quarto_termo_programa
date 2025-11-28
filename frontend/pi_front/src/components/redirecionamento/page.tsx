// "use client";
// import { useState } from "react";
// import CreatePost from "@/components/createPost";
// import styles from './redirecionamento.module.css'

// export default function Redirecionamento() {

//     const [showModal, setShowModal] = useState(false);

//     return (
//         <div className={styles.container}>
//             <div className={styles.redirecionamento}>
//                 <img className={styles.homeLogo} src="/homeLogo.png" alt="Home Logo" />
//                 <a href="/feed">Página Inicial</a>
//             </div>
//             <div className={styles.redirecionamento}>
//                 <img className={styles.mensagemLogo} src="/mensagemLogo.png" alt="Mensagem Logo" />
//                 <a href="/mensagens">Mensagens</a>
//             </div>
//             <div className={styles.redirecionamento}>
//                 <img className={styles.criarLogo} src="/criarLogo.png" alt="Criar Logo" />
//                 <a href="#" onClick={(e) => { e.preventDefault(); setShowModal(true); }}>Criar</a>

//                 {/* Modal */}
//                 {showModal && (
//                     <div className="modalOverlay">
//                         <CreatePost onClose={() => setShowModal(false)} />
//                     </div>
//                 )}
//             </div>
//             <div className={styles.redirecionamento}>
//                 <img className={styles.perfilLogo} src="/perfilLogo.png" alt="Perfil Logo" />
//                 <a href="/perfil">Perfil</a>
//             </div>
//         </div>
//     )
// }

"use client";
import { useState } from "react";
import CreatePost from "@/components/createPost";
import styles from './redirecionamento.module.css'

export default function Redirecionamento() {

    const [showModal, setShowModal] = useState(false);

    function handlePostCriado(post: { imagem: string; texto: string }) {
        console.log("Novo post criado:", post);
        // Aqui você pode adicionar a lógica de enviar o post para o backend
        setShowModal(false); // Fecha o modal depois de criar
    }

    return (
        <div className={styles.container}>
            {/* Página Inicial */}
            <div className={styles.redirecionamento}>
                <img className={styles.homeLogo} src="/homeLogo.png" alt="Home Logo" />
                <a href="/feed">Página Inicial</a>
            </div>

            {/* Mensagens */}
            <div className={styles.redirecionamento}>
                <img className={styles.mensagemLogo} src="/mensagemLogo.png" alt="Mensagem Logo" />
                <a href="/mensagens">Mensagens</a>
            </div>

            {/* Criar Post (Modal) */}
            <div className={styles.redirecionamento}>
                <img className={styles.criarLogo} src="/criarLogo.png" alt="Criar Logo" />
                <a href="#" onClick={(e) => { e.preventDefault(); setShowModal(true); }}>Criar</a>

                {showModal && (
                    <div className="modalOverlay" style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}>
                        <CreatePost onPostCriado={handlePostCriado} />
                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                position: "absolute",
                                top: 20,
                                right: 20,
                                fontSize: "1.5rem",
                                color: "#fff",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            ×
                        </button>
                    </div>
                )}
            </div>

            {/* Perfil */}
            <div className={styles.redirecionamento}>
                <img className={styles.perfilLogo} src="/perfilLogo.png" alt="Perfil Logo" />
                <a href="/perfil">Perfil</a>
            </div>
        </div>
    )
}
