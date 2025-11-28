"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/services/api";
import styles from "./cadastro.module.css";

export default function Cadastro() {

    const router = useRouter();

    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [confirmarSenha, setConfirmarSenha] = useState<string>("");

    const [loading, setLoading] = useState(false);

    const handleCadastro = async (event: React.FormEvent) => {
        event.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            const response = await api.post("/users/create_user", {
                name: nome,
                email,
                password: senha,
                image_url: null
            });

            console.log("Usuário cadastrado:", response.data);

            router.push("/login");

        } catch (error: any) {

            if (error.response?.status === 409) {
                alert("Este email já está cadastrado.");
            } else {
                alert("Erro ao cadastrar, tente novamente.");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.fundo}>
                    <h1 className={styles.h}>Cadastro</h1>

                    <form className={styles.formCadastro} onSubmit={handleCadastro}>
                        <div className={styles.containerCadastro}>

                            <div className={styles.infoCadastro}>
                                <div className={styles.nomeContainer}>
                                    <label>Nome do Usuário:</label>
                                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                                </div>

                                <div className={styles.emailContainer}>
                                    <label>Seu Melhor Email:</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>

                                <div className={styles.senhaContainer}>
                                    <label>Senha:</label>
                                    <input type="password"value={senha} onChange={(e) => setSenha(e.target.value)} required />
                                </div>

                                <div className={styles.senhaContainer}>
                                    <label>Confirmar Senha:</label>
                                    <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required />
                                </div>

                                <a href="/login" className={styles.entrarConta}>Já tem uma conta? Entre</a>
                            </div>

                            <img
                                src="/logo-cc.png"
                                alt="Logo Campo Conectado"
                                className={styles.imgCC}
                            />
                        </div>

                        <div>
                            <button type="submit" className={styles.botaoCadastro}>
                                {loading ? "Cadastrando..." : "Cadastrar"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}