import LinkButtom from "../layouts/LinkButtom"
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from "react"
import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import Loading from "../layouts/Loading"
import getStorageValue, { useLocalStorage } from "../storage/useLocalStorage"
import ProjectFormHome from "../projects/ProjectFormHome"



function Home(){
    const [user, setUser] = useState(localStorage.getItem("usuario"))
    const [users, setUsers] = useState({})
    let pessoa = localStorage.getItem("usuario")
    let pessoaObj = JSON.parse(pessoa)

    

    return(
        <>
        
            <div className={styles.home_container}>
                <Link to={`/perfil`}>Perfil</Link>
                <div className={styles.home_box}>
                    <ProjectFormHome/>
                </div>
            </div> 

        
        </>
    )
}

export default Home