import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
    const[showAvaliacao, setShowAvaliacao] = useState(false)
    const[comentario, setComentario] = useState({usuario:pessoaObj, comentario:'', restaurante:{}})
    const[comentarios, setComentarios] = useState([])
    const[sumAvaliacao, setSumAvaliacao] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        if(pessoa===null){
            navigate(`/`)
        }
    })


    //Restaurante
    useEffect(() => {
        
        fetch(`http://localhost:8080/restaurante/mostrar/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setRestaurante(data)
            if(restaurante.id!==null){
                if(data.somaAvaliacao/data.qntAvaliacao !== 0){
                    setSumAvaliacao(data.somaAvaliacao/data.qntAvaliacao)
                }
                setTimeout(() => {
                    setShow(true)
                    setShowComentario(true)
                    setComentario({...comentario, restaurante:data})
                  }, 3000)
                
            }
        })
        .catch((err) => console.log(err))
    }, [])


    //GET COMENTARIOS
    if(restaurante.id!==null){
        setTimeout(() => {
            fetch(`http://localhost:8080/comentario/restaurante/mostrar/${restaurante.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            data.sort(function comparar(a, b){
                if(a.usuario.id===pessoaObj.id) return -1
                if(a.usuario.id<b.usuario.id) return 1
                return 0
            })
            data.map((comentario) => {
                if(comentarios.length<data.length){
                    comentarios.push(comentario)
                } 
            })
            console.log(data)
            
        })
        .catch((err) => console.log(err))
        }, 2000);        
    }

    // Postar comentario
    function postarComentario(e){
        console.log(comentario)
        fetch(`http://localhost:8080/comentario/restaurante/criar`, {
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

    const avaliar =(e) =>{
        if(showAvaliacao){
            setShowAvaliacao(false)
        } else {
            setShowAvaliacao(true)
        }
    }

    const avaliarClick = (e) =>{
        console.log(e.target.value)
        fetch(`http://localhost:8080/restaurante/${e.target.value}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(restaurante)
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setRestaurante(data)
            setSumAvaliacao(data.somaAvaliacao/data.qntAvaliacao)
        })
        .catch((err) => console.log(err))
    
    }

    const home =(e) =>{
        navigate(`/home`)
    }

    return(
        <div className={styles.res_container}>
            <button className={styles.buttonHome} onClick={home}>Home</button>
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
                    <span className={styles.review_span_1}>{sumAvaliacao.toFixed(1)}</span>
                    <img src={star2} className={styles.star_2} onClick={avaliar}></img>
                    <span className={styles.review_span_2} onClick={avaliar}>Classificar</span>
                    {showAvaliacao &&
                        <div className={styles.avaliacao}>
                            <ul>
                                <li key={1} id={1} value={`1`} onClick={avaliarClick}>
                                    <span className={styles.teste}></span> 1 estrela
                                </li>
                                <li key={2} id={2} value={`2`} onClick={avaliarClick}>
                                    2 estrela
                                </li>
                                <li key={3} id={3} value={`3`} onClick={avaliarClick}>
                                    3 estrela
                                </li>
                                <li key={4} id={4} value={`4`} onClick={avaliarClick}>
                                    4 estrela
                                </li>
                                <li key={5} id={5} value={`5`} onClick={avaliarClick}>
                                    5 estrela
                                </li>
                            </ul>
                        </div>
                    }
                </div>
                <div className={styles.menu}>
                    <LinkButtom to={`/menu/${restaurante.id}` } texto={'Menu'}/>
                </div>
                <div className={styles.comentario}>
                    <form onSubmit={postarComentario}>
                        <div className={styles.nsei}>
                            <Input type={'text'} name={'comentario'} text={'Comentario'}  placeholder={'Insira o comentario...'} handleOnChange={handleChange}/>
                        </div>
                        <button>Enviar</button>
                    </form>
                </div>
            </div>
        }
        {showComentario && 
        <div className={styles.comentarios}>
            <>
            {comentarios.map((com) => <Comentario comentario={com}/>)}
            </>
        </div>
            
            
        }
            
            
        </div>
        
        
    )
}

export default Restaurante;