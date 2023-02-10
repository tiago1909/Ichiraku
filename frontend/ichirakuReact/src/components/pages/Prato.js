import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './Prato.module.css'
import star1 from '../images/Star 1.svg'
import star2 from '../images/Star 2.svg'
import paris6 from '../images/paris6.jpg'
import Input from '../form/Input'
import Comentario from '../projects/Comentario'



function Prato(){
    const {id} = useParams()
    let pessoa = localStorage.getItem("usuario")
    let pessoaObj = JSON.parse(pessoa)
    const[prato, setPrato] = useState({})
    const[show, setShow] = useState(false)
    const[showComentario, setShowComentario] = useState(false)
    const[showAvaliacao, setShowAvaliacao] = useState(false)
    const[comentario, setComentario] = useState({usuario:pessoaObj, comentario:'', prato:{}})
    const[comentarios, setComentarios] = useState([])
    const[sumAvaliacao, setSumAvaliacao] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        if(pessoa===null){
            navigate(`/`)
        }
    })


    //Prato
    useEffect(() => {
        
        fetch(`http://localhost:8080/prato/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setPrato(data)
            console.log(data)
            if(prato.id!==null){
                console.log(typeof(data.somaAvaliacao))

                if(data.qntAvaliacao != 0 && data.somaAvaliacao/data.qntAvaliacao !== 0){
                    console.log(`ta vindo`)
                    setSumAvaliacao((data.somaAvaliacao/data.qntAvaliacao).toFixed(1))
                } else {
                    setSumAvaliacao(`vazio`)
                }
                setTimeout(() => {
                    setShow(true)
                    setShowComentario(true)
                    setComentario({...comentario, prato:data})
                  }, "3000")
                
            }
        })
        .catch((err) => console.log(err))
    }, [])


    //GET COMENTARIOS
    if(prato.id!==null){
        setTimeout(() => {
            fetch(`http://localhost:8080/comentario/prato/mostrar/${prato.id}`, {
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
        fetch(`http://localhost:8080/comentario/prato/criar`, {
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
        fetch(`http://localhost:8080/prato/avaliar/${e.target.value}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prato)
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setPrato(data)
            window.location.reload();
        })
        .catch((err) => console.log(err))
    
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
                        <h1>{prato.nome}</h1>
                        <p>{prato.descricao}</p>
                        <Link to={`/${prato.restaurante.nome}`} style={{ textDecoration: 'none' }}><span className={styles.nome_restaurante}>{prato.restaurante.nome}</span></Link>
                    </div>
                </div>
                <div className={styles.review}>
                    <img src={star1} className={styles.star_1}></img>
                    <span className={styles.review_span_1}>{sumAvaliacao}</span>
                    <img src={star2} className={styles.star_2} onClick={avaliar}></img>
                    <span className={styles.review_span_2} onClick={avaliar}>Classificar</span>
                    {showAvaliacao &&
                        <div className={styles.avaliacao}>
                            <ul>
                                <li key={1} id={1} value={1} onClick={avaliarClick}>
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

export default Prato;