import React, {useState} from 'react';
import styles from '../styles/LoginHeader.module.css';
import Image from 'next/image';

const LoginHeader = () => {
    return (
        <header>
            <div className={styles.bigContainer} >
                <div className={styles.logoContainer}>
                    <Image src={"/images/vector.png"} alt={"vector"} width={"62"} height={"62"} />
                </div>
                <h1 className={styles.welcomeText}>Bienvenido</h1>
                <p className={styles.infoText}>Por favor ingresa tus datos.</p>
            </div>
        </header>
    );
};
export default LoginHeader;