import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../form/Input";
import styles from './EdicaoRestaurante.module.css'
import LinkButtom from '../layouts/LinkButtom'


function EdicaoRestaurante(){
    let pessoa = localStorage.getItem("usuario")
    let pessoaObj = JSON.parse(pessoa)
    const[restaurante, setRestaurante] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if(pessoa===null){
            navigate(`/`)
        }
    })

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
                console.log(data)
            })
            .catch((err) => console.log(err))
    }, [])
    

    function handleChange(e){
        e.preventDefault()
        setRestaurante({...restaurante, [e.target.name]: e.target.value})
    }

    const submit = (e) => {
        e.preventDefault()

        fetch(`http://localhost:8080/restaurante/editar`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
           body: JSON.stringify(restaurante),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setRestaurante(data)
    
        })
        .catch((err) => console.log(err))
    }

    return(
        <div className={styles.container_principal}>
            <form onSubmit={submit}>
                <Input type={'text'} name={'nome'} text={'nome'}  placeholder={'Insira o nome...'} handleOnChange={handleChange} value={restaurante.nome}/>
                <Input type={'text'} name={'descricao'} text={'descricao'}  placeholder={'Insira a descricao...'} handleOnChange={handleChange} value={restaurante.descricao}/>
                <Input type={'text'} name={'endereco'} text={'endereco'}  placeholder={'Insira o endereco...'} handleOnChange={handleChange} value={restaurante.endereco}/>
                <Input type={'text'} name={'horario'} text={'horario'}  placeholder={'Insira o horario...'} handleOnChange={handleChange} value={restaurante.horario}/>
                <Input type={'text'} name={'telefone'} text={'telefone'}  placeholder={'Insira o telefone...'} handleOnChange={handleChange} value={restaurante.telefone}/>
                <button value={'editar'}>Editar</button>
            </form>
            <div className={styles.link}>
                <LinkButtom to={`/edicaopratos/${restaurante.id}`} texto={'Pratos'}/>
            </div>
        </div>
        
    )
}

export default EdicaoRestaurante;