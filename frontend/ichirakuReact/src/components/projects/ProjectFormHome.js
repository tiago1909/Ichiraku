import styles from "./ProjectForm.module.css"

import Input from "../form/Input"
import Submit from "../form/Submit"
import { useEffect, useState } from "react"

function ProjectFormHome(){
    const [pesquisa, setpesquisa] = useState({})
    const [restaurantes, setRestaurantes] = useState([])
    
    useEffect(() => {
        
        fetch('http://localhost:5000/restaurants', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setRestaurantes(data)
            
        })
        .catch((err) => console.log(err))
    }, [])


    const submit = (e) => {
        e.preventDefault()
        console.log(restaurantes)
    }

    function handleChange(e){
        e.preventDefault()
        setpesquisa({...pesquisa, [e.target.name]: e.target.value})
    }

    return(
        <>
            <form onSubmit={submit} className={styles.form}>
                <Input type="text" text="restaurante" name="restaurante" placeholder="Insira o nome do restaurante..." 
                    handleOnChange={handleChange} 
                    />
                
                <Input type="text" text="local" 
                    name="local" 
                    placeholder="Insira a localização..." 
                    handleOnChange={handleChange}/>
                <Input type="text" text="prato" 
                    name="prato" 
                    placeholder="Insira o nome do prato..." 
                    handleOnChange={handleChange}/>
                <Submit text={"Pesquisar"}/>
                
            </form>
            
        </>
    )
}

export default ProjectFormHome