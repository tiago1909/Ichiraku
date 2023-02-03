import styles from './LinkButtom.module.css'
import {Link} from 'react-router-dom'

function LinkButtom({to, texto}){
    return(
        <Link className={styles.btn} to={to}>
            {texto}
        </Link>
    )
}

export default LinkButtom