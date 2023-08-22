import React from 'react';
import styles from '../styles/LoginForm.module.css';

const LoginForm = () => {
    return (
        <form className={styles['form-container']}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Ingresa tu email" />
            </div>
            <div>
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" placeholder="Ingresa tu contraseña" />
            </div>
        </form>
    );
};

export default LoginForm;