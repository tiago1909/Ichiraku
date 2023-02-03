import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LinkButtom from '../layouts/LinkButtom'

import Input from '../form/Input'
import Submit from '../form/Submit'
import Message from '../layouts/Message'
import styles from './ProjectForm.module.css'


function ProjectFormCadastro({handleSubmit, btnText, userData}){
    const [user, setUser] = useState(userData || {})
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState('')
    const [verificarUsusario, setVerificarUsuario] = useState(true)
    const navigate = useNavigate()


    const submit = (e) => {
        
        e.preventDefault()
        console.log(user)
        
            fetch('http://localhost:5000/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setUsers(data)
                promise.then((data) => console.log(data))
            })
            .catch((err) => console.log(err))
        
        }

        var promise = new  Promise(async function(resolve, reject){
            await verificar()
            if(verificarUsusario){
                resolve('foi')
            } else {
                reject('não foi')
            }

        })

        async function verificar(){
            users.map((userA) => {
                    if(userA.email === user.email){
                        console.log('errado')
                        setVerificarUsuario(false)
                        return false
                    } else {
                        console.log('não é igual')
                        
                    }
                    return true
                })
        }

        function cadastrar(usuario){
    
            fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario)
            })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                // redirect
                navigate('/home')
            })
            .catch((err) => console.log(err))
    
        }

        function cad(e){
            e.preventDefault()
            console.log(user)
            fetch('http://localhost:8080/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(user)
            })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
            })
            .catch((err) => console.log(err))
        }

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
        setVerificarUsuario(false)
        setMessage('')
    }

    return(
        <>
            <form onSubmit={cad} className={styles.form}>
                <Input type="text" text="Email" name="email" placeholder="Insira o email..." 
                    handleOnChange={handleChange} 
                    value={user.email ? user.email : ''}/>
                <Input type="name" text="Nome" 
                    name="nome" 
                    placeholder="Insira o seu nome..." 
                    handleOnChange={handleChange}/>
                <Input type="password" text="Senha" 
                    name="senha" 
                    placeholder="Insira a senha..." 
                    handleOnChange={handleChange}/>
                <Submit text={btnText}/>
            </form>
            <LinkButtom to="/login" texto="Login"/>
            {message && (
                <div><Message type={"error"} msn={message}/></div>
            )}
        </>
    )
}

export default ProjectFormCadastro