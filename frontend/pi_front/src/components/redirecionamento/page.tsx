import styles from './redirecionamento.module.css'

export default function Redirecionamento() {
    return (
        <div className={styles.container}>
            <div className={styles.redirecionamento}>
                <img className={styles.homeLogo} src="/homeLogo.png" alt="Home Logo" />
                <a href="/feed">Página Inicial</a>
            </div>
            <div className={styles.redirecionamento}>
                <img className={styles.mensagemLogo} src="/mensagemLogo.png" alt="Mensagem Logo" />
                <a href="/mensagens">Mensagens</a>
            </div>
            <div className={styles.redirecionamento}>
                <img className={styles.criarLogo} src="/criarLogo.png" alt="Criar Logo" />
                <a href="/criar">Criar</a>
            </div>
            <div className={styles.redirecionamento}>
                <img className={styles.perfilLogo} src="/perfilLogo.png" alt="Perfil Logo" />
                <a href="/perfil">Perfil</a>
            </div>
        </div>
    )
}