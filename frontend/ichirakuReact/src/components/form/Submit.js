import styles from './Submit.module.css'

function Submit({text}){
    return(
        <div className={styles.submit_container}>
            <button className={styles.btn}>{text}</button>
        </div>
    )
}

export default Submit