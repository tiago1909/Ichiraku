import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import ProjectFormHome from "../projects/ProjectFormHome"



function Home(){
    const [user, setUser] = useState(localStorage.getItem("usuario"))
    const [users, setUsers] = useState({})
    let pessoa = localStorage.getItem("usuario")
    let pessoaObj = JSON.parse(pessoa)
    const navigate = useNavigate()

    useEffect(() => {
        if(user===null){
            navigate(`/`)
        }
    })

    return(
        <>
        
            <div className={styles.home_container}>
                <Link to={`/perfil`} style={{ textDecoration: 'none' }}><span>Perfil</span></Link>
                <div className={styles.home_box}>
                    <ProjectFormHome/>
                </div>
            </div> 

        
        </>
    )
}

export default Home