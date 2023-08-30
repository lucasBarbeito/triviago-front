"use client"
import React, {useState} from 'react';
import styles from '../styles/SigninForm.module.css';



const SigninForm = () => {

    const [name, setName]  = useState("");
    const [surname, setSurname]  = useState("");
    const [email, setEmail]  = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword]  = useState("");

    function handleName(event){
        setName(event.target.value)
    }
    function handleSurname(event){
        setSurname(event.target.value)
    }
    function handlePassword(event){
        setPassword(event.target.value)
    }
    function handleEmail(event){
        setEmail(event.target.value)
    }
    function handleConfirmPassword(event){
        setConfirmPassword(event.target.value)
    }

    function signinState(event){
        event.preventDefault()
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if(name == ""){
            console.log("El nombre no puede estar vacío.");
            return
        }

        if(surname == ""){
            console.log("El apellido no puede estar vacío.");
            return
        }

        if (!email.match(emailPattern)) {
            console.log("El formato del correo electrónico no es válido.");
            return
        }
        if(password !== confirmPassword){
            console.log("Las contraseñas no coinciden.");
            return
        }
        if (password.length < 8) {
            console.log("La contraseña debe tener al menos 8 caracteres.");
            return
        }
        console.log("Creacion de cuenta exitoso");
        return
    }

    const currentDate = new Date().toISOString().split('T')[0];

    return (
        <form className={styles.formContainer}>

            <div className={styles.labelContainer}>
                <label className={styles.label}>Nombre</label>
                <input className={styles.input} type="text" id="name" name="name" placeholder="Ingresa tu nombre" onChange={handleName}/>
            </div>

            <div className={styles.labelContainer}>
                <label className={styles.label}>Apellido</label>
                <input className={styles.input} type="text" id="surname" name="surname" placeholder="Ingresa tu apellido" onChange={handleSurname}/>
            </div>

            {/*CALENDARIO:*/}

            <div className={styles.labelContainer}>
                <label className={styles.label}>Fecha de nacimiento</label>
                <input id="date" type="date" defaultValue={currentDate} className={styles.inputCalendar} max={currentDate} />
                <div className={styles.line}></div>
            </div>


            <div className={styles.labelContainer}>
                <label className={styles.label}>Email</label>
                <input className={styles.input} type="email" id="email" name="email" placeholder="Ingresa tu email" onChange={handleEmail}/>
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
                <button className={styles.button} onClick={signinState}>Registrarte</button>
                <p className={styles.text}>¿Ya tienes una cuenta? <a href="/login" className={styles.link}>Inicia sesión</a></p>
            </div>
        </form>
    );
};

export default SigninForm;