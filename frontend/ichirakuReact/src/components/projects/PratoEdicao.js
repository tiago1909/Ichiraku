import { useEffect, useState } from 'react';
import Input from '../form/Input';
import styles from './PratoEdicao.module.css';


function PratoEdicao(prato, excluir){
    const[pratoEditado, setPratoEditado] = useState(prato.prato)
    const[ingredientes, setIngredientes] = useState([])
    const[showEditar, setShowEditar] = useState(false)
    let j = 0
    
    useEffect(() => {
        fetch(`http://localhost:8080/ingredientes/mostrar/${prato.prato.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setIngredientes(data)
            })
            .catch((err) => console.log(err))
    }, [])

    function excluir(){
        fetch(`http://localhost:8080/prato/excluir/${prato.prato.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type':'application/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                document.location.reload(true);
                console.log(data)
            })
            .catch((err) => console.log(err))
    }

    function editar(){
        fetch(`http://localhost:8080/prato/editar`, {
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(pratoEditado)
            })
            .then((resp) => resp.json())
            .then((data) => {
                document.location.reload(true);
                console.log(data)
            })
            .catch((err) => console.log(err))
    }

    function boxEditar(){
        setShowEditar(true)
    }
    
    function handleChange(e){
        e.preventDefault()
        setPratoEditado({...pratoEditado, [e.target.name]: e.target.value})
        console.log(pratoEditado)
    }

    function cancelar(){
        setShowEditar(false)
    }

    return(
        <div className={styles.prato}>
            {showEditar && (
                <div className={styles.box_editar}>
                    <form onSubmit={editar}>                    
                        <Input type={'text'} name={'nome'} text={'Nome'}  placeholder={'Insira o nome...'} handleOnChange={handleChange} />
                        <Input type={'text'} name={'descricao'} text={'Descrição'}  placeholder={'Insira a descrição...'} handleOnChange={handleChange} />
                        <Input type={'number'} name={'preco'} text={'Preço'}  placeholder={'Insira o preço...'} handleOnChange={handleChange}/>
                        <div className={styles.buttonEditar}>
                            <button onClick={editar}>Editar</button>
                            <button onClick={cancelar}>Cancelar</button>
                        </div>
                        
                    </form>
                </div>
            )}
            <div className={styles.foto}></div>
            <div className={styles.info}>
                <div className={styles.nome_descricao}>
                    <p className={styles.nome}>{prato.prato.nome}</p>
                    <p>{prato.prato.descricao}</p>
                    {ingredientes.map((i) => {
                        j++
                        if(j === ingredientes.length){
                            return(<span>{i.nome}</span>)
                        } else {
                            return(<span>{i.nome}, </span>)
                            
                        }
                    }
                        
                        
                    )}
                </div>
                <p className={styles.preco}><span>R$</span>{prato.prato.preco}</p>
                
            </div>
            <div className={styles.btns}>
                <button onClick={excluir}>Excluir</button>
                <button onClick={boxEditar}>Editar</button>
            </div>
            
        </div>
    )
}

export default PratoEdicao