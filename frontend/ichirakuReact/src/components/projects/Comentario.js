import { useEffect, useState } from 'react'
import Input from '../form/Input'
import styles from './Comentario.module.css'

function Comentario(comentario){
    let pessoa = localStorage.getItem("usuario")
    let pessoaObj = JSON.parse(pessoa)
    const[show, setShow] = useState(false)
    const[c, setC] = useState(comentario)


    useEffect(() => {
        if(pessoaObj.id === comentario.comentario.usuario.id){
        console.log(`dono`)
        setShow(true)
    }

    },[])

    const handleChange = (e) =>{
        comentario.comentario.comentario = e.target.value
        console.log("b = ", comentario)
    }
    
    const excluir = (e) =>{
        e.preventDefault()
        fetch(`http://localhost:8080/comentario/excluir`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
           body: JSON.stringify(comentario.comentario),
        })
        .then((data) => {
            window.location.reload();
    
        })
        .catch((err) => console.log(err))
    }

    const editar = (e) =>{
        console.log("a ",comentario)
        fetch(`http://localhost:8080/comentario/editar`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
           body: JSON.stringify(comentario.comentario),
        })
        .then((data) => {
            window.location.reload();
    
        })
        .catch((err) => console.log(err))
    }

    return(
        <div className={styles.container_comentario}>
            <div className={styles.info}>
                <p className={styles.nome}>{comentario.comentario.usuario.nome}:</p>
                <div className={styles.texto}>
                    {show ? (
                        <input placeholder={comentario.comentario.comentario} onChange={handleChange}></input>
                            ) : (
                        <p>{comentario.comentario.comentario}</p>
                    )}
                </div>
                
            </div>
            
            {show &&
                <div className={styles.btns}>
                    <button className={styles.btn} onClick={excluir}>Excluir</button>
                    <button className={styles.btn} onClick={editar}>Editar</button>
                </div>
            }
        </div>
            
        
    )
}

export default Comentario