"use client"
import React, {useState} from 'react';
import styles from '../styles/LoginForm.module.css';


const LoginForm = () => {

    const [password, setPassword] = useState("");
    const [email, setEmail]  = useState("");

    function handlePassword(event){
        setPassword(event.target.value)
    }
    function handleEmail(event){
        setEmail(event.target.value)
    }

    function logInState(event){
        event.preventDefault()
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!email.match(emailPattern)) {
            console.log("El formato del correo electrónico no es válido.");
            return
        }

        if (password.length < 8) {
            console.log("La contraseña debe tener al menos 8 caracteres.");
            return
        }
        console.log("Inicio de sesión exitoso:", email, password);
        return
    }

    return (
        <form className={styles['form-container']}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Ingresa tu email" onChange={handleEmail}/>
            </div>
            <div>
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" placeholder="Ingresa tu contraseña" onChange={handlePassword}/>
            </div>

            <button className={styles.button} onClick={logInState}>Iniciar sesión</button>

            <p className={styles.text}>¿No tienes una cuenta? <a href="/signin" className={styles.link}>Regístrate</a></p>
            <p className={styles.text}><a href="#" className={styles.link}>¿Olvidaste tu contraseña?</a></p>
        </form>
    );
};

export default LoginForm;