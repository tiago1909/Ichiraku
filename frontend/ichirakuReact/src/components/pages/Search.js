import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Input from "../form/Input"
import PratoMenu from "../projects/PratoMenu"
import Restaurante from "../projects/Restaurante"
import styles from "./Search.module.css"

function Search(){
    const location = useLocation()
    const[restaurantes, setRestaurantes] = useState(location.state.restaurantes)
    const[pratos, setPratos] = useState(location.state.pratos)
    const[filtroList, setFiltroList] = useState([])
    const[ingrediente, setIngrediente] = useState()
    const[showFiltro, setShowFiltro] = useState(false)
    const[showPratos, setShowPratos] = useState(false)

    const filtro = (e) => {
        if(!showFiltro){
            setShowFiltro(true)
        } else{
            setShowFiltro(false)
        }
    }

    useEffect(() => {
        if(pratos){
            pratos.map((prato) =>{
                    fetch(`http://localhost:8080/ingredientes/mostrar/${prato.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    })
                    .then((resp) => resp.json())
                    .then((data) => {
                    prato.ingredientes = data
                    })
                    .catch((err) => console.log(err))
            })
        }
    }, [])

    const handleChange = (e) =>{
        setIngrediente(e.target.value)
    }

    const adicionarFiltro = async(e) =>{
        pratos.map((prato) => {
            prato.ingredientes.map((i) => {
                console.log(prato.nome)
                if(i.nome.toLowerCase() === ingrediente.toLowerCase()){
                    pratos.splice(pratos.indexOf(prato), 1)
                    //setShowFiltro(false)
                    adicionarFiltro()
                }
            })
            
        })
        setShowFiltro(false)
    }

    return(
        <div className={styles.container_search}>
            {restaurantes && (
                <>
                    {restaurantes.map((restaurante) => <Restaurante restaurante={restaurante}/>)}
                </>
            )}
            {pratos && (
                <>  
                <div className={styles.filtro_btn}>
                    <button onClick={filtro}>Filtro</button>
                </div>
                    {showFiltro && (
                        <>
                            <form className={styles.form_filtro}>
                                <Input handleOnChange={handleChange} type="text" text="ingrediente" name="ingredientes" placeholder="Insira o ingrediente..." />   
                                <button onClick={adicionarFiltro}>Adicionar</button>             
                            </form>
                        </>
                    )}
                
                    {pratos.map((prato) => <PratoMenu prato={prato} filtro={filtroList}/>)}
                </>
            )}
            
        </div>
    )
}

export default Search