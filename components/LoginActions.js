// LoginComponent.js
import React from 'react';
import styles from '../styles/LoginActions.module.css';

const LoginActions = () => {
    return (
        <div className={styles.bigContainer}>
            <button className={styles.button} >Iniciar sesión</button>
            <p className={styles.text}>¿No tienes una cuenta? <a href="/signin" className={styles.link}>Regístrate</a></p>
            <p className={styles.text}><a href="#" className={styles.link}>¿Olvidaste tu contraseña?</a></p>
        </div>
    );
};

export default LoginActions;