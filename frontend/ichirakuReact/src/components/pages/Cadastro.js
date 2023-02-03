import styles from './Cadastro.module.css'
import ProjectFormCadastro from '../projects/ProjectFormCadastro'

function Cadastro(){
    return(
        <div className={styles.cadastro}>
            <div className={styles.cadastro_container}>
                <p>Login</p>
                <ProjectFormCadastro btnText='Entrar'/>
            </div>
        </div>
    )
}

export default Cadastro