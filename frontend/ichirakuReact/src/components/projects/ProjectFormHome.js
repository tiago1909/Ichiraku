import styles from "./ProjectForm.module.css"

import Input from "../form/Input"
import Submit from "../form/Submit"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function ProjectFormHome(){
    const navigate = useNavigate()
    const [pesquisa, setpesquisa] = useState({})
    const [restaurantes, setRestaurantes] = useState([])

    
    function pesquisaPorRestaurante(){
        fetch(`http://localhost:8080/restaurante/${pesquisa.restaurante}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                navigate(`/${data.nome}`)
            })
            .catch((err) => console.log(err))
        
    }

    const submit = (e) => {
        e.preventDefault()
        if(pesquisa.restarurante!==null){
            console.log(pesquisa.restaurante)
            pesquisaPorRestaurante()
        }
    }

    function handleChange(e){
        e.preventDefault()
        console.log(pesquisa)
        setpesquisa({...pesquisa, [e.target.name]: e.target.value})
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
            setCidades([])}}>{cidade.nome}</li>)
    //--------------------API LOCAIS---------------------------//



    return(
        <>
            <form onSubmit={submit} className={styles.form}>
                <Input type="text" text="restaurante" name="restaurante" placeholder="Insira o nome do restaurante..." 
                    handleOnChange={handleChange} 
                    />
                
                <Input type="text" text="Localização" name="localizacao" placeholder="Insira o nome do restaurante..." 
                    handleOnChange={handleOnChange} value={cidadeSelecionadaLista}
                    />
                    {
                        <div className={styles.box_locais}>
                            <ul>
                                {lista}
                            </ul>
                            
                        </div>
                    }

                <Input type="text" text="prato" 
                    name="prato" 
                    placeholder="Insira o nome do prato..." 
                    handleOnChange={handleChange} required={false}/>
                <Submit text={"Pesquisar"}/>
                
            </form>
            
        </>
    )
}

export default ProjectFormHome