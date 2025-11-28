"use client";

import { useEffect, useState } from "react";
import api from "@/app/services/api";
import styles from './perfil.module.css'
import Logo from '@/components/logo/page';
import Redirecionamento from '@/components/redirecionamento/page';
import { useRouter } from "next/navigation";

export default function Perfil() {
    const router = useRouter();


    const [user, setUser] = useState<any>(null);
    const [posts, setPosts] = useState<any[]>([]);
    const [seguidores, setSeguidores] = useState<number>(0);
    const [seguindo, setSeguindo] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
        // Redireciona para login caso não tenha usuário logado
        router.push("/login");
        return;
        }

        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // Carrega dados do usuário
        const fetchUserData = async () => {
        try {
            // Posts do usuário
            const postsRes = await api.get(`/posts/user/${parsedUser.user_id}`);
            setPosts(postsRes.data);

            // Seguidores e seguindo
            const seguidoresRes = await api.get(`/users/${parsedUser.user_id}/seguidores`);
            setSeguidores(seguidoresRes.data.count);

            const seguindoRes = await api.get(`/users/${parsedUser.user_id}/seguindo`);
            setSeguindo(seguindoRes.data.count);
        } catch (err) {
            console.error("Erro ao carregar dados do perfil:", err);
        } finally {
            setLoading(false);
        }
        };

        fetchUserData();
    }, [router]);

    if (loading) return <p>Carregando perfil...</p>;

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
                    <img src={user?.image_url || "/no_photo.png"} alt="Foto de Perfil" className={styles.perfilImage} />
                    <div className={styles.infoBox}>
                        <div className={styles.bioBox}>
                            <div className={styles.nomeConfig}>
                                <h1 className={styles.perfilName}>{user?.name}</h1>
                            </div>
                        </div>
                        <div className={styles.contagemBox}>
                            <div className={styles.contagemItem}>
                                <p>{posts.length}</p>
                                <p>posts</p>
                            </div>
                            <div className={styles.contagemItem}>
                                <p>{seguidores}</p>
                                <p>seguidores</p>
                            </div>
                            <div className={styles.contagemItem}>
                                <p>{seguindo}</p>
                                <p>seguindo</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.containerBtn}>
                    <button onClick={() => router.push("/editarPerfil")} className={styles.btnPerfil}>Editar Perfil</button>
                    <button onClick={() => router.push("/mensagens")} className={styles.btnMensagens}>Mensagens</button>
                </div>
                <div className={styles.imagensBox}>
                    <img src="/gridIcon.png" alt="Grid" className={styles.gridIcon} />
                </div>
                <div className={styles.postagensBox}>
                    {posts.map((post) => (
                        <img
                            key={post.id}
                            src={post.image_url || "/post1.png"}
                            alt={`Postagem ${post.id}`}
                            className={styles.postagemImage}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}