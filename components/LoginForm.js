"use client"
import React, {useState} from 'react';
import styles from '../styles/LoginForm.module.css';
import {Slide, Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";
import {useRequestService} from "@/app/service/request.service";
import {useRouter} from "next/router";


const LoginForm = () => {

    const [password, setPassword] = useState("");
    const [email, setEmail]  = useState("");
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("ERROR");
    const router = useRouter()

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
            setMessage("El formato del correo electrónico no es válido.")
            setOpen(true);
            return
        }

        if (password.length < 8) {
            setMessage("La contraseña debe tener al menos 8 caracteres.")
            setOpen(true);
            return
        }

        const service = useRequestService()
        service .login({email: email, password: password} )
                .then(()=> router
                .push("/home"))
                .catch((e) => {
                    setMessage(e.message)
                    setOpen(true)
                })

    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

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

            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} TransitionComponent={Slide} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        </form>
    );
};

export default LoginForm;