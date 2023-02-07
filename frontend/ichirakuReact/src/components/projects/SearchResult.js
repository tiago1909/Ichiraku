import styles from './SearchResults.module.css'
import {click} from '../pages/Teste'

function SearchResult( cidades, OnclickC ){
    
    

    if(!cidades.cidades || !cidades.cidades.length) return null

        const lista = cidades.cidades.map((cidade) => 
        <p key={cidade.id} value={cidade.nome} onClick={() => console.log(cidade.nome)}>{cidade.nome}</p>)

    
    return(
        <div className={styles.sla}>
            {lista}
        </div>
    )
}

export default SearchResult