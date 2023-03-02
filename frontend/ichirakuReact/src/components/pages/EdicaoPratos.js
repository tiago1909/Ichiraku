import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../form/Input";
import LinkButton from '../layouts/LinkButtom';
import PratoEdicao from "../projects/PratoEdicao";
import styles from './EdicaoPratos.module.css';

function EdicaoPratos(){
    const{id} = useParams()
    let pessoa = localStorage.getItem("usuario")
    let pessoaObj = JSON.parse(pessoa)
    const[showAdicionar, setShowAdicionar] = useState(false)
    const[showEditar, setShowEditar] = useState(false)
    const[showPratos, setShowPratos] = useState(false)
    const[showFormIngre, setShowFormIngre] = useState(false)
    const[restaurante, setRestaurante] = useState({})
    const[prato, setPrato] = useState({})
    const[pratos, setPratos] = useState([])
    const[getPratos, setGetPratos] = useState(false)
    const[textButton, setTextButton] = useState('Adicionar')
        const[ingrediente, setIngrediente] = useState({nome: ``})
    const[ingredientes, setIngredientes] = useState([])
    const[inValue, setInValue] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        if(pessoaObj===null){
            navigate(`/`)
        }
    })



    //GET RESTAURANTE
    useEffect(() => {
        fetch(`http://localhost:8080/mostrar/usuario/${pessoaObj.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                setRestaurante(data)
                setPrato({...prato, restaurante:data})
                setGetPratos(true)
                console.log(data)
            })
            .catch((err) => console.log(err))
    }, [])

    //POST PRATOS
    const adicionar = (e) => {
        fetch(`http://localhost:8080/prato/adicionar`, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(prato)
            })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                ingredientes.map((i) => {
                    i = {...i, prato:data}
                    //POST INGREDIENTES
                    fetch(`http://localhost:8080/ingrediente/criar`, {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(i)
                    })
                    .then((resp) => resp.json())
                    .then((data) => {
                        console.log(data)
                        Window.location.reload()
                    })
                    .catch((err) => console.log(err))
                    //-------------------------------------
                })
                
            })
            .catch((err) => console.log(err))
    }

    //GET PRATOS
    useEffect(() => {
        if(getPratos){
            fetch(`http://localhost:8080/prato/mostrar/${restaurante.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                setPratos(data)
                console.log(data)
                setGetPratos(false)
                setShowPratos(true)
            })
            .catch((err) => console.log(err))
    
        }
    })
        

    function showEdicao(e){
        e.preventDefault()
        if(showAdicionar){
            setShowAdicionar(false)
            setShowEditar(true)
            setTextButton('Adicionar')
            setShowFormIngre(false)
        } else {
            setShowAdicionar(true)
            setShowEditar(false)
            setTextButton('Editar')
        }
    }

    function handleChange(e){
        e.preventDefault()
        setPrato({...prato, [e.target.name]: e.target.value})
        console.log(prato)
    }

    const home = (e) =>{
        navigate(`/home`)
    }

    const btnIngrediente = (e) =>{
        e.preventDefault()
        if(!showFormIngre){
            setShowFormIngre(true)
        } else{
            setShowFormIngre(false)
        }
    }

    const adicionarIngrediente = (e) =>{
        e.preventDefault()
        ingredientes.push(ingrediente)
        setIngrediente({nome:``})
        console.log(ingredientes)
    }

    function handleChangeIngrediente(e){
        e.preventDefault()
        setIngrediente({...ingrediente, nome:e.target.value})
        console.log(ingrediente)
    }

    return(
        <div className={styles.container_principal}>
            <div className={styles.buttons}>
                <button onClick={showEdicao}>{textButton}</button>
                <button onClick={home}>Home</button>
            </div>

            {showAdicionar ? (
                <form onSubmit={adicionar} className={styles.formulario}>
                    <Input type={'text'} name={'nome'} text={'Nome'}  placeholder={'Insira o nome...'} handleOnChange={handleChange}/>
                    <Input type={'text'} name={'descricao'} text={'Descrição'}  placeholder={'Insira a descrição...'} handleOnChange={handleChange}/>
                    <Input type={'number'} name={'preco'} text={'Preço'}  placeholder={'Insira o Preço...'} handleOnChange={handleChange}/>
                    <button onClick={btnIngrediente}>ingredientes</button>
                    <button>Adicionar</button>
                </form>
            ) : (
                <>
                {showPratos && 
                    pratos.map((c) =>  <PratoEdicao prato={c}/>)
                    
                }
                </>
            )}
            {showFormIngre ? (
                <form onSubmit={adicionarIngrediente} className={styles.form_in}>
                    <Input type={'text'} name={'nome'} text={'Nome'}  placeholder={'Insira o ingrediente...'} value={ingrediente.nome} handleOnChange={handleChangeIngrediente}/>
                    <button type="submit">Adicionar</button>
                </form>
            ) : (
                <></>
            )}
        </div>
    )
}

export default EdicaoPratos;