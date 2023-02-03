import styles from './Input.module.css'

function Input({type, text, name, placeholder, handleOnChange, value}){
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input step={0.01} type={type} name={name} id={name} placeholder={placeholder} onChange={handleOnChange} 
            value={value} required></input>
        </div>
    )
}

export default Input