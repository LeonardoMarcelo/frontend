import styles from './Input.module.css'

export default function Input({type,name, text, placeholder, handleOnChange , value, multiple}){
    return((
        <div className={styles.form_control}>
            <label htmlFor={name}>
                {text}:
            </label>
            <input type={type} name={name} placeholder={placeholder} value={value} id={name} onChange={handleOnChange} {...(multiple  ? {multiple} : '')} ></input>
        </div>
    ))
}