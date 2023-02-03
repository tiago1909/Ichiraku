import ProjectFormLogin from '../projects/ProjectFormLogin'
import styles from './Login.module.css'

function Login(){
    return (
        <div className={styles.login}>
            <div className={styles.login_container}>
                <p>Login</p>
                <ProjectFormLogin btnText='Entrar'/>
            </div>
        </div>
    )
}

export default Login