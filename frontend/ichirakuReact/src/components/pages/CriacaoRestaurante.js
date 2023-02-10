import { useEffect, useState } from "react";
import Input from "../form/Input";
import Submit from "../form/Submit";
import styles from './CriacaoRestaurante.module.css';
import { useNavigate } from 'react-router-dom'


function CriacaoRestaurante(){
    let pessoa = localStorage.getItem("usuario")
    let pessoaObj = JSON.parse(pessoa)
    const[restaurante, setRestaurante] = useState({usuario:pessoaObj, situacao:true, cidade:``})
    const navigate = useNavigate()

    useEffect(() => {
        if(pessoa===null){
            navigate(`/`)
        }
    })

    function handleChange(e){
        e.preventDefault()
        setRestaurante({...restaurante, [e.target.name]: e.target.value})
    }

    function submit(e){
        e.preventDefault()

        console.log(restaurante)
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


    //----------------API LOCAIS----------------------
    const[cidades, setCidades] = useState([])
    const[cidadeSelecionadaLista, setCidadeSelecionadaLista] = useState()

    const handleOnChange = (e) => {
        const {value} = e.target
        setCidadeSelecionadaLista()
        
  
        if(!value){
            setCidades([])
            return 
        } 

        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/RS/municipios?q=${value}`

        fetch(url)
            .then((response) => response.json())
            .then((results) => setCidades(results))
    }
        
        const lista = cidades.map((cidade) => 
        <li key={cidade.id} value={cidade.nome} onClick={() => {
            setCidadeSelecionadaLista(cidade.nome) 
            setCidades([])
            setRestaurante({...restaurante, cidade: cidade.nome})
            console.log(restaurante)
        }}>{cidade.nome}</li>)
    //--------------------API LOCAIS---------------------------//

    return(
        <div className={styles.container_criacao}>
        <form onSubmit={submit}>
            <Input type={'text'} name={'nome'} text={'nome'}  placeholder={'Insira o nome...'} handleOnChange={handleChange}/>
            <Input type={'text'} name={'descricao'} text={'descricao'}  placeholder={'Insira a descricao...'} handleOnChange={handleChange} />

            <Input type="text" text="cidade" name="cidade" placeholder="Insira a cidade..." 
                    handleOnChange={handleOnChange} value={cidadeSelecionadaLista}
                    />
                    {
                        <div className={styles.box_locais}>
                            <ul>
                                {lista}
                            </ul>
                            
                        </div>
                    }

            <Input type={'text'} name={'endereco'} text={'endereco'}  placeholder={'Insira o endereco...'} handleOnChange={handleChange}/>
            <Input type={'text'} name={'horario'} text={'horario'}  placeholder={'Insira o horario...'} handleOnChange={handleChange}/>
            <Input type={'text'} name={'telefone'} text={'telefone'}  placeholder={'Insira o telefone...'} handleOnChange={handleChange}/>
            <Submit text={'Cadastrar'} />
        </form>
        </div>
    )
}

export default CriacaoRestaurante;