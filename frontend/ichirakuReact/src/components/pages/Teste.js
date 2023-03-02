import { useEffect, useState } from 'react'
import styles from './Teste.module.css'

function Teste(){
    const[img,  setImg] = useState()
    const[imgu,  setImgu] = useState()
    useEffect(() => {
        
    }, [])

    const salvar = async(e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image/png', img)
        console.log(img)
        fetch('http://localhost:8080/teste/post', {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(img.name
                    ),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                    
                },

            })
            .then((resp) => resp.text())
            .then((data) => {
                console.log(data)
                //setImgu(URL.createObjectURL(data))
                
            })
            .catch((err) => console.log(err))
    }

    const mostrar = (e) =>{
        e.preventDefault()
        setImgu(URL.createObjectURL(img))
        console.log(typeof(img))
    }
    return(
        <>
            <form className={styles.teste1} onSubmit={salvar}>
                <label htmlFor='file'>Pesquisa</label>
                <input name='file' id='file' placeholder={`imagem`} type={`file`} onChange={e => setImg(e.target.files[0])}></input>
                <button type='submit'>salvar</button>
                <img className={styles.teste1} src={imgu}></img>
            </form>
            
        </>
    )
    
} 
export default Teste