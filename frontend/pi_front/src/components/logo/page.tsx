import styles from './logo.module.css';

export default function Logo() {
    return (
        <div>
            <img src="/logo_completo.png" alt="Logo miniatura" className={styles.logoMiniatura}></img>
        </div>
    )
}