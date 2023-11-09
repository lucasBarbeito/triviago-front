"use client"

import styles from "@/styles/RecoverPasswordComponent.module.css";
import React, {useState} from "react";
import {Slide, Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";

const RecoverPasswordComponent = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("ERROR");



    function handlePassword(event) {
        setPassword(event.target.value)
    }

    function handleConfirmPassword(event) {
        setConfirmPassword(event.target.value)
    }

    function newPasswordState(event) {
        event.preventDefault()
        if (password.length < 8) {
            setMessage("La contraseña debe tener al menos 8 caracteres.")
            setOpen(true);
            return
        }

        if (password !== confirmPassword) {
            setMessage("Las contraseñas no coinciden.")
            setOpen(true);
            return
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <div className={styles.boxComponent}>
                <form className={styles['form-container']}>
                    <div>
                        <label htmlFor="password">Nueva contraseña</label>
                        <input type="password" id="password" name="password" placeholder="Ingresa una nueva contraseña" onChange={handlePassword}/>
                    </div>

                    <div>
                        <label htmlFor="password">Repetir contraseña</label>
                        <input type="password" id="password" name="password" placeholder="Confirmar contraseña" onChange={handleConfirmPassword}/>
                    </div>

                </form>
                <button className={styles.button} onClick={newPasswordState}>Cambiar contraseña</button>
            </div>

            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} TransitionComponent={Slide}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default RecoverPasswordComponent;

