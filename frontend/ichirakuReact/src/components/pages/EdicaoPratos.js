import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../form/Input";
import PratoEdicao from "../projects/PratoEdicao";
import styles from './EdicaoPratos.module.css';

function EdicaoPratos(){
    const{id} = useParams()
    let pessoa = localStorage.getItem("usuario")
    let pessoaObj = JSON.parse(pessoa)
    const[showAdicionar, setShowAdicionar] = useState(false)
    const[showEditar, setShowEditar] = useState(false)
    const[showPratos, setShowPratos] = useState(false)
    const[restaurante, setRestaurante] = useState({})
    const[prato, setPrato] = useState({})
    const[pratos, setPratos] = useState([])
    const[getPratos, setGetPratos] = useState(false)
    const[textButton, setTextButton] = useState('Adicionar')
    const navigate = useNavigate()

    useEffect(() => {
        if(pessoa===null){
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
    function adicionar() {
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

    return(
        <div className={styles.container_principal}>
            <button onClick={showEdicao}>{textButton}</button>
            {showAdicionar ? (
                <form onSubmit={adicionar}>
                    <Input type={'text'} name={'nome'} text={'Nome'}  placeholder={'Insira o nome...'} handleOnChange={handleChange}/>
                    <Input type={'text'} name={'descricao'} text={'Descrição'}  placeholder={'Insira a descrição...'} handleOnChange={handleChange}/>
                    <Input type={'number'} name={'preco'} text={'Preço'}  placeholder={'Insira o Preço...'} handleOnChange={handleChange}/>
                    <button>Adicionar</button>
                </form>
            ) : (
                <>
                {showPratos && 
                    pratos.map((c) =>  <PratoEdicao prato={c}/>)
                    
                }
                </>
            )}
        </div>
    )
}

export default EdicaoPratos;