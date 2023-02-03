import styles from './PratoMenu.module.css'

function PratoMenu(prato){
    return(
        <div className={styles.box_prato}>
            <div className={styles.foto}></div>
            <div className={styles.info}>
                <p>Nome:</p>
                <p>{prato.prato.nome}</p>
                <p>Preço:</p>
                <p><span>R$</span>{prato.prato.preco}</p>
                <p>Descrição:</p>
                <p>{prato.prato.descricao}</p>
            </div>
        </div>
    )
}

export default PratoMenu