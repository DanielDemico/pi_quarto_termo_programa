import styles from "./cadastro.module.css";

export default function Cadastro() {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.fundo}>
                    <h1 className={styles.h}>Cadastro</h1>

                    <form className={styles.formCadastro}>
                        <div className={styles.containerCadastro}>

                            <div className={styles.infoCadastro}>
                                <div className={styles.nomeContainer}>
                                    <label>Nome do Usuário:</label>
                                    <input type="text" required />
                                </div>

                                <div className={styles.emailContainer}>
                                    <label>Seu Melhor Email:</label>
                                    <input type="email" required />
                                </div>

                                <div className={styles.senhaContainer}>
                                    <label>Senha:</label>
                                    <input type="password" required />
                                </div>

                                <div className={styles.senhaContainer}>
                                    <label>Confirmar Senha:</label>
                                    <input type="password" required />
                                </div>
                            </div>

                            <img
                                src="/logo-cc.png"
                                alt="Logo Campo Conectado"
                                className={styles.imgCC}
                            />
                        </div>

                        <div>
                            <button type="submit" className={styles.botaoCadastro}>
                                Cadastrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}