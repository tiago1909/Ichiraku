import styles from './Cadastro.module.css'
import ProjectFormCadastro from '../projects/ProjectFormCadastro'

function Cadastro(){
    return(
        <div className={styles.cadastro}>
            <div className={styles.cadastro_container}>
                <p>Cadastro</p>
                <ProjectFormCadastro btnText='Cadastrar'/>
            </div>
        </div>
    )
}

export default Cadastro