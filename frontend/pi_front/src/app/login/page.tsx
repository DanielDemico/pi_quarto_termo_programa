import styles from "./login.module.css";

export default function Login() {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.fundo}>
                    <h1 className={styles.h}>Login</h1>
                    <form className={styles.formLogin}>
                        <div className={styles.containerLogin}>
                            <div className={styles.infoLogin}>
                                <div className={styles.nomeContainer}>
                                    <label>Nome do Usuário:</label>
                                    <input type="text" required />
                                </div>
                                <div className={styles.senhaContainer}>
                                    <label>Senha:</label>
                                    <input type="password" required />
                                </div>
                            </div>
                            <img src="/logo-cc.png" alt="Logo Campo Conectado" className={styles.imgCC} />
                        </div>
                        <div>
                            <button type="submit" className={styles.botaoLogin}>Entrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}