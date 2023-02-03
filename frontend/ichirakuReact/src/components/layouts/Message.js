import { useState, useEffect } from 'react'

import styles from './Message.module.css'

function Message({type, msn}){

    const [visible, setVisible] = useState(false)
    useEffect(() => {
        if(!msn){
            setVisible(false)
            return
        }
        setVisible(true)

        const timer = setTimeout(() =>{
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [msn])

    return(
        <>
            {visible &&(
                <div className={`${styles.message} ${styles[type]}`}>
                {msn}
                </div>
            )} 
        </>
    )
}

export default Message