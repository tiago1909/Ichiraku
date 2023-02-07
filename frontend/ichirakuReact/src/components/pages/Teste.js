import axios from 'axios'
import { useEffect, useState } from 'react'
import SearchResult from '../projects/SearchResult'
import styles from './Teste.module.css'

function Teste(){
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
        <li key={cidade.id} value={cidade.nome} onClick={() => setCidadeSelecionadaLista(cidade.nome)}>{cidade.nome}</li>)

    return(
        <>
            <form>
                <label htmlFor='search'>Pesquisa</label>
                <input name='search' id='search' onChange={handleOnChange} placeholder={`Pesquisa`} value={cidadeSelecionadaLista}></input>
            </form>
            
            {   
                <ul>
                    {lista}
                </ul>
                
            }
            </>
    )
    
}
export default Teste