"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/services/api";
import styles from "./login.module.css";

export default function Login() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            const response = await api.post("/users/login", {
                email: email,
                password: senha
            });

            console.log("Login bem-sucedido:", response.data);

            localStorage.setItem("user", JSON.stringify(response.data));

            router.push("/feed");

        } catch (error: any) {

            if (error.response?.status === 404) {
                alert("Usuário não encontrado.");
            } else if (error.response?.status === 401) {
                alert("Senha incorreta.");
            } else {
                alert("Erro ao tentar fazer login.");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.fundo}>
                    <h1 className={styles.h}>Login</h1>
                    <form className={styles.formLogin} onSubmit={handleLogin}>
                        <div className={styles.containerLogin}>
                            <div className={styles.infoLogin}>
                                <div className={styles.nomeContainer}>
                                    <label>Email:</label>
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className={styles.senhaContainer}>
                                    <label>Senha:</label>
                                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                                </div>
                                <a href="/cadastro" className={styles.criarConta}>Não tem uma conta? Registre-se</a>
                            </div>
                            <img src="/logo-cc.png" alt="Logo Campo Conectado" className={styles.imgCC} />
                        </div>
                        <div>
                            <button type="submit" className={styles.botaoLogin} disabled={loading} >
                                {loading ? "Entrando..." : "Entrar"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}