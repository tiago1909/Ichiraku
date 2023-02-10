import { useNavigate } from 'react-router-dom'
import styles from './Restaurante.module.css'
import star2 from '../images/Star 2.svg'

function Restaurante(restaurante){
    console.log(restaurante.restaurante.id)
    const navigate = useNavigate()

    const click = (e) =>{
        navigate(`/${restaurante.restaurante.nome}`)
    }
    return(
        <div key={restaurante.restaurante.id} className={styles.box_restaurante} onClick={click}>
            <div className={styles.foto}></div>
            <div className={styles.info}>
                <div className={styles.nome_desccricao_endereco}>
                    <p>{restaurante.restaurante.nome}</p>
                    <p>{restaurante.restaurante.endereco}</p>
                    <p>{restaurante.restaurante.descricao}</p>
                </div>
                <div className={styles.nota}>
                    <p>{(restaurante.restaurante.somaAvaliacao/restaurante.restaurante.qntAvaliacao).toFixed(1)}</p>
                    <img src={star2}></img>
                </div>
                
            </div>
        </div>
    )
}

export default Restaurante