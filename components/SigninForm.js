"use client"
import React, {useState} from 'react';
import styles from '../styles/SigninForm.module.css';
import { makeStyles } from '@material-ui/styles';
import {TextField} from "@mui/material";


const SigninForm = () => {

    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword]  = useState(null);

    function handlePassword(event){
        setPassword(event.target.value)
    }

    function handleConfirmPassword(event){
        setConfirmPassword(event.target.value)
    }

    function passwordState(event){
        event.preventDefault()
        console.log(password == confirmPassword)
    }

    const currentDate = new Date().toISOString().split('T')[0];

    return (
        <form className={styles.formContainer}>

            <div className={styles.labelContainer}>
                <label className={styles.label}>Nombre</label>
                <input className={styles.input} type="text" id="name" name="name" placeholder="Ingresa tu nombre" />
            </div>

            <div className={styles.labelContainer}>
                <label className={styles.label}>Apellido</label>
                <input className={styles.input} type="text" id="surname" name="surname" placeholder="Ingresa tu apellido" />
            </div>

            {/*CALENDARIO:*/}

            <div className={styles.labelContainer}>
                <label className={styles.label}>Fecha de nacimiento</label>
                <input id="date" type="date" defaultValue={currentDate} className={styles.inputCalendar} max={currentDate} />
                <div className={styles.line}></div>
            </div>


            <div className={styles.labelContainer}>
                <label className={styles.label}>Email</label>
                <input className={styles.input} type="email" id="email" name="email" placeholder="Ingresa tu email" />
            </div>

            <div className={styles.labelContainer}>
                <label className={styles.label}>Contraseña</label>
                <input className={styles.input} type="password" id="password" name="password" placeholder="Ingresa tu contraseña" onChange={handlePassword}/>
            </div>

            <div className={styles.labelContainer}>
                <label className={styles.label}>Confirmar contraseña</label>
                <input className={styles.input} type="password" id="confirmPassword" name="confirmPassword" placeholder="Ingresa tu contraseña" onChange={handleConfirmPassword}/>
            </div>

            <div className={styles.actionContainer}>
                <button className={styles.button} onClick={passwordState}>Registrarte</button>
                <p className={styles.text}>¿Ya tienes una cuenta? <a href="/login" className={styles.link}>Inicia sesión</a></p>
            </div>
        </form>
    );
};

export default SigninForm;