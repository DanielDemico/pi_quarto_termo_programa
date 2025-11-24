"use client";
import styles from './perfil.module.css'
import Logo from '@/components/logo/page';
import Redirecionamento from '@/components/redirecionamento/page';
import { useRouter } from "next/navigation";

export default function Perfil() {
    const router = useRouter();

    return (
        <div>
            <div>
                <div>
                    <Logo />
                </div>
                <div>
                    <Redirecionamento />
                </div>
            </div>
            <div className={styles.perfilContainer}>
                <div className={styles.perfilBox}>
                    <img src="/fotoPerfil.png" alt="Foto de Perfil" className={styles.perfilImage} />
                    <div className={styles.infoBox}>
                        <div className={styles.bioBox}>
                            <div className={styles.nomeConfig}>
                                <h1 className={styles.perfilName}>Campo Conectado</h1>
                            </div>
                        </div>
                        <div className={styles.contagemBox}>
                            <div className={styles.contagemItem}>
                                <p>150</p>
                                <p>posts</p>
                            </div>
                            <div className={styles.contagemItem}>
                                <p>3</p>
                                <p>seguidores</p>
                            </div>
                            <div className={styles.contagemItem}>
                                <p>130</p>
                                <p>seguindo</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.containerBtn}>
                    <button onClick={() => router.push("/editarPerfil")} className={styles.btnPerfil}>Editar Perfil</button>
                    <button onClick={() => router.push("/mensagem")} className={styles.btnMensagens}>Mensagens</button>
                </div>
                <div className={styles.divisor}>
                    <div className={styles.criarBox}>
                        <button className={styles.criarBtn}>
                            <img src="/criarIcon2.png" alt="Criar" className={styles.criarIcon} />
                        </button>
                    </div>
                </div>
                <div className={styles.divisor}>
                    <p className={styles.criarText}>Novo</p>
                </div>
                <div className={styles.imagensBox}>
                    <img src="/gridIcon.png" alt="Grid" className={styles.gridIcon} />
                </div>
                <div className={styles.postagensBox}>
                    <img src="/post1.png" alt="Postagem 1" className={styles.postagemImage} />
                    <img src="/post2.png" alt="Postagem 2" className={styles.postagemImage} />
                    <img src="/post1.png" alt="Postagem 3" className={styles.postagemImage} />
                    <img src="/post2.png" alt="Postagem 4" className={styles.postagemImage} />
                    <img src="/post1.png" alt="Postagem 5" className={styles.postagemImage} />
                    <img src="/post2.png" alt="Postagem 6" className={styles.postagemImage} />
                </div>
            </div>
        </div>
    )
}