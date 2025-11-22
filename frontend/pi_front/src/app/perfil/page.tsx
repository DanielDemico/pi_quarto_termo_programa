import styles from './perfil.module.css'
import Logo from '@/components/logo/page';
import Redirecionamento from '@/components/redirecionamento/page';

export default function Perfil() {
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
                    <div className={styles.bioBox}>
                        <div className={styles.nomeConfig}>
                            <h1 className={styles.perfilName}>Campo Conectado</h1>
                            <img src="/configIcon.png" alt="Configurações" className={styles.configIcon} />
                        </div>
                        <p>campoconectado_Oficial</p>
                    </div>
                    {/* <div className={styles.contagemBox}>
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
                    </div> */}
                </div>
                {/* <div className={styles.containerbtn}>
                    <button className={styles.btnEditarPerfil}>Editar Perfil</button>
                    <button className={styles.btnMensagens}>Mensagens</button>
                </div>
                <div className={styles.criarBox}>
                    <img src="/criarIcon.png" alt="Criar" className={styles.criarIcon} />
                </div>
                <div className={styles.imgensBox}>
                    <img src="/gridIcon.png" alt="Grid" className={styles.gridIcon} />
                    <img src="/saveIcon.png" className={styles.saveIcon}></img>
                    <img src="/markIcon.png" className={styles.markIcon}></img>
                </div>
                <div className={styles.postagensBox}>
                    <img src="/post1.png" alt="Postagem 1" className={styles.postagemImage} />
                    <img src="/post2.png" alt="Postagem 2" className={styles.postagemImage} />
                    <img src="/post1.png" alt="Postagem 3" className={styles.postagemImage} />
                    <img src="/post2.png" alt="Postagem 4" className={styles.postagemImage} />
                    <img src="/post1.png" alt="Postagem 5" className={styles.postagemImage} />
                    <img src="/post2.png" alt="Postagem 6" className={styles.postagemImage} />
                </div> */}
            </div>
        </div>
    )
}