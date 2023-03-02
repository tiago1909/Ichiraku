import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './PratoMenu.module.css'

function PratoMenu(prato, filtro){
    const navigate = useNavigate()
    const[ingredientes, setIngredientes] = useState([])
    let j = 0

    useEffect(() => {
        if(filtro){
            console.log(filtro)
        }
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8080/ingredientes/mostrar/${prato.prato.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                
                setIngredientes(data)
                console.log(data)
            })
            .catch((err) => console.log(err))
    }, [])

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
                    {ingredientes.map((i) => {
                        j++
                        if(j === ingredientes.length){
                            return(<span>{i.nome}</span>)
                        } else {
                            return(<span>{i.nome}, </span>)
                            
                        }
                    })}
                </div>
                <p className={styles.preco}><span>R$</span>{prato.prato.preco}</p>
            </div>
        </div>
    )
}

export default PratoMenu