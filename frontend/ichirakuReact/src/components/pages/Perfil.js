import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Input from '../form/Input'
import Submit from '../form/Submit'
import styles from './Perfil.module.css'

function Perfil(){
    const {id} = useParams() 
    let pessoa = localStorage.getItem("usuario")
    let pessoaObj = JSON.parse(pessoa)
    const[user, setUser] = useState(pessoaObj)
    const[possuiRestaurante, setPossuiRestaurante] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if(user===null){
            navigate(`/`)
        }
    })

    const submit = (e) => {
        e.preventDefault()

        fetch(`http://localhost:8080/alterar`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
           body: JSON.stringify(user),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setUser(data)
            localStorage.setItem("usuario", JSON.stringify(data))
            console.log(user)
            navigate(`/home`)
        })
        .catch((err) => console.log(err))
    }

    fetch(`http://localhost:8080/usuariopossuirestaurante/${pessoaObj.id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            if(data===true){
                setPossuiRestaurante(true)
            }
        })
        .catch((err) => console.log(err))
    



    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    return(
        <div className={styles.perfil_container}>
            {possuiRestaurante ? (
                <Link to={`/edicaorestaurante`} style={{ textDecoration: 'none' }}><span>Editar restaurante</span></Link>
            ) : (
                <Link to={`/criacaorestaurante`} style={{ textDecoration: 'none' }}><span>Criar restaurante</span></Link>
            )}
            
            
            <div className={styles.perfil_box}>
                <form onSubmit={submit} className={styles.perfil_form}>
                    <Input type='text' text='Nome' name='nome' handleOnChange={handleChange} 
                        value={user.nome ? user.nome: ''}/>
                    <Input type='text' text='Email' name='email' handleOnChange={handleChange} 
                        value={user.email ? user.email : ''}/>
                    <Input type='text' text='Senha' name='senha' handleOnChange={handleChange} 
                        value={user.senha ? user.senha: ''}/>
                    <Submit text={'Atualizar'}/>
                </form>
            </div>
        </div>
        
        
    )
            }

export default Perfil