import { useState } from "react";
import Input from "../form/Input";
import styles from './CriacaoRestaurante.module.css';

function CriacaoRestaurante(){
    let pessoa = localStorage.getItem("usuario")
    let pessoaObj = JSON.parse(pessoa)
    const[restaurante, setRestaurante] = useState({usuario:pessoaObj, situacao:true})


    function handleChange(e){
        e.preventDefault()
        setRestaurante({...restaurante, [e.target.name]: e.target.value})
    }

    function submit(e){
        fetch('http://localhost:8080/criar', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(restaurante)
            })
            .then((resp) => resp.json())
            .then((data) => {
                setRestaurante({})
                console.log(data)
            })
            .catch((err) => console.log(err))

    }

    return(
        <div>
        <form onSubmit={submit}>
            <Input type={'text'} name={'nome'} text={'nome'}  placeholder={'Insira o nome...'} handleOnChange={handleChange}/>
            <Input type={'text'} name={'descricao'} text={'descricao'}  placeholder={'Insira a descricao...'} handleOnChange={handleChange} />
            <Input type={'text'} name={'endereco'} text={'endereco'}  placeholder={'Insira o endereco...'} handleOnChange={handleChange}/>
            <Input type={'text'} name={'horario'} text={'horario'}  placeholder={'Insira o horario...'} handleOnChange={handleChange}/>
            <Input type={'text'} name={'telefone'} text={'telefone'}  placeholder={'Insira o telefone...'} handleOnChange={handleChange}/>
            <button value={'cadastrar'}></button>
        </form>
        </div>
    )
}

export default CriacaoRestaurante;