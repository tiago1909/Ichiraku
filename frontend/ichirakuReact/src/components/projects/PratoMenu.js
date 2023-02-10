import { useNavigate } from 'react-router-dom'
import styles from './PratoMenu.module.css'

function PratoMenu(prato){
    const navigate = useNavigate()

    const click = (e) => {
        navigate(`/prato/${prato.prato.id}`)
    }
    return(
        <div className={styles.box_prato} onClick={click}>
            <div className={styles.foto}></div>
            <div className={styles.info}>
                <div className={styles.nome_descricao}>
                    <p>{prato.prato.nome}</p>
                    <p>{prato.prato.descricao}</p>
                </div>
                <p className={styles.preco}><span>R$</span>{prato.prato.preco}</p>
            </div>
        </div>
    )
}

export default PratoMenu