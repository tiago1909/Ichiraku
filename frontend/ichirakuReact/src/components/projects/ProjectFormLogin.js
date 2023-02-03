import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LinkButtom from '../layouts/LinkButtom'

import Input from '../form/Input'
import Submit from '../form/Submit'
import Message from '../layouts/Message'
import styles from './ProjectForm.module.css'


function ProjectFormLogin({handleSubmit, btnText, userData}){
    const [user, setUser] = useState(userData || {})
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState('')
    const navigate = useNavigate()


    

    const submit = (e) => {
        e.preventDefault()
        
            fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
            .then((resp) => resp.json())
            .then((data) => {
                if(data){
                    navigate('/home')
                    localStorage.setItem("usuario", JSON.stringify(data))
                    setMessage('')
                } else {
                    setMessage('dados errados')
                }
                
            })
            .catch((err) => console.log(err))
        
        }

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
        setMessage('')
    }

    return(
        <>
        
            <form onSubmit={submit} className={styles.form}>
                <Input type="text" text="Email" name="email" placeholder="Insira o email..." 
                    handleOnChange={handleChange} 
                    value={user.email ? user.email : ''}/>
                <Input type="password" text="Senha" 
                    name="senha" 
                    placeholder="Insira a senha..." 
                    handleOnChange={handleChange}/>
                <Submit text={btnText}/>
            </form>
            <LinkButtom to="/cadastro" texto="Cadastrar"/>
            {message && (
                <div><Message type={"error"} msn={message}/></div>
            )}
        </>
    )
}

export default ProjectFormLogin