import styles from './Menu.module.css'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PratoMenu from "../projects/PratoMenu"

function Menu(){
    const{id} = useParams()
    const[pratos, setPratos] = useState([])

    //GET PRATOS
    useEffect(() => {
        fetch(`http://localhost:8080/prato/mostrar/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setPratos(data)
            console.log(data)
            }
        )
        .catch((err) => console.log(err))
    }, [])

    return(
        <div className={styles.container_menu}>
            {pratos.map((c) => <PratoMenu prato={c}/>)}
        </div>
    )
}

export default Menu