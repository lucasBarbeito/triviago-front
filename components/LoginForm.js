'use client'

import React, { useState } from 'react';
import styles from '../styles/LoginForm.module.css';
import {useRequestService} from "@/service/request.service";
import {useRouter} from "next/navigation";


const LoginForm = () => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("ERROR");
    const router = useRouter();


    function handlePassword(event){
        setPassword(event.target.value)
    }

    function handleEmail(event){
        setEmail(event.target.value)
    }


    const logInState = (event) => {
        event.preventDefault()
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!email.match(emailPattern)) {
            setMessage("Credenciales incorrectas.")
            setOpen(true);
            return
        }

        if (password.length < 8) {
            setMessage("Credenciales incorrectas.")
            setOpen(true);
            return
        }

        const service = useRequestService()
        service .login({username: email, password: password} )
                .then(()=> router.push("/home"))
                .catch((e) => {
                    setMessage(e.message)
                    setOpen(true)
                })

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