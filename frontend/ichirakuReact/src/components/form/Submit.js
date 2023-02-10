import styles from './Submit.module.css'

function Submit({text}, HandleonClick){
    return(
        <div className={styles.submit_container}>
            <button className={styles.btn} onClick={HandleonClick}>{text}</button>
        </div>
    )
}

export default Submit