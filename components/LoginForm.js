'use client'

import React, { useEffect, useState } from 'react';
import styles from '../styles/LoginForm.module.css';
import {Slide, Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";
import {useRequestService} from "@/service/request.service";
import {useRouter} from "next/navigation";
import LogoutPopup from './LogoutPopup';

const LoginForm = () => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("ERROR");
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();
    function handlePassword(event){
        setPassword(event.target.value)
    }

    function handleEmail(event){
        setEmail(event.target.value)
    }

    useEffect(() => {
        // Verifica si se redirigió desde la página de logout
        if (router.query && router.query.logout) {
            setShowPopup(true); // Muestra el pop-up si se redirigió desde el logout
        }
    }, [router.query]);


    const handleClosePopup = () => {
        setShowPopup(false); // Oculta el pop-up al hacer clic en "Cerrar"
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

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
                {showPopup && <LogoutPopup onClose={handleClosePopup} />} {/* Muestra el pop-up si showPopup es true */}
            </div>
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