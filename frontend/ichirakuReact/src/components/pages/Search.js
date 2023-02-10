import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Restaurante from "../projects/Restaurante"
import styles from "./Search.module.css"

function Search(){
    const location = useLocation()
    const[restaurantes, setRestaurantes] = useState(location.state.restaurantes)

    return(
        <div className={styles.container_search}>
            {restaurantes.map((restaurante) => <Restaurante restaurante={restaurante}/>)}
        </div>
    )
}

export default Search