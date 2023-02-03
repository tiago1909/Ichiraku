import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Restaurante.module.css'
import star1 from '../images/Star 1.svg'
import star2 from '../images/Star 2.svg'
import paris6 from '../images/paris6.jpg'
import Input from '../form/Input'
import Comentario from '../projects/Comentario'
import LinkButtom from '../layouts/LinkButtom'



function Restaurante(){
    const {name} = useParams()
    let pessoa = localStorage.getItem("usuario")
    let pessoaObj = JSON.parse(pessoa)
    const[restaurante, setRestaurante] = useState({})
    const[show, setShow] = useState(false)
    const[showComentario, setShowComentario] = useState(false)
    const[comentario, setComentario] = useState({usuario:pessoaObj, comentario:'', restaurante:{}})
    const[comentarios, setComentarios] = useState([])


    //Restaurante
    useEffect(() => {
        
        fetch(`http://localhost:8080/mostrar/restaurante/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setRestaurante(data)
            if(restaurante.id!==null){
                setTimeout(() => {
                    setShow(true)
                    setShowComentario(true)
                    setComentario({...comentario, restaurante:data})
                  }, "3000")
                
            }
        })
        .catch((err) => console.log(err))
    }, [])


    //GET COMENTARIOS
    useEffect(() => {
        fetch(`http://localhost:8080/comentario/mostrar/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            data.map((comentario) => {
                if(comentarios.length<data.length){
                    comentarios.push(comentario)
                }
                
                
            })
            console.log(comentarios)

        })
        .catch((err) => console.log(err))
    }, [])

    // Postar comentario
    function postarComentario(e){
        console.log(comentario)
        fetch(`http://localhost:8080/comentario/criar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comentario)
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setComentario('')
            e.preventDeafault()
        })
        .catch((err) => console.log(err))
    
    }

    function handleChange(e){
        e.preventDefault()
        setComentario({...comentario, [e.target.name]: e.target.value});
        console.log(comentario)
    }

    return(
        <div className={styles.res_container}>
            {show &&
            <div className={styles.info}>
                <div className={styles.foto}>
                    <img src={paris6}/>
                </div>
                <div className={styles.description}>
                    <div className={styles.des_text}>
                        <h1>{restaurante.nome}</h1>
                        <p>{restaurante.endereco}</p>
                        <p>{restaurante.horario}</p>
                        <p>{restaurante.descricao}</p>
                    </div>
                </div>
                <div className={styles.review}>
                    <img src={star1} className={styles.star_1}></img>
                    <span className={styles.review_span_1}>10</span>
                    <img src={star2} className={styles.star_2}></img>
                    <span className={styles.review_span_2}>Classificar</span>

                </div>
                <div className={styles.menu}>
                    <LinkButtom to={`/menu/${restaurante.id}` } texto={'Menu'}/>
                </div>
                <div>
                    <form onSubmit={postarComentario}>
                        <Input type={'text'} name={'comentario'} text={'Comentario'}  placeholder={'Insira o comentario...'} handleOnChange={handleChange}/>
                        <button>Enviar</button>
                    </form>
                </div>
            </div>
        }
        {showComentario && 
            comentarios.map((com) => <Comentario comentario={com}/>)
            
        }
            
            
        </div>
        
        
    )
}

export default Restaurante;