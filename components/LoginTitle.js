// LoginComponent.js
import React from 'react';
import styles from '../styles/LoginTitle.module.css';
import Image from "next/image";

const LoginTitle = () => {
    return (
        <div className={styles.bigContainer}>
            <div className={styles.logoContainer}>
                <div className={styles.logo}>
                    <Image src={"/images/vector.png"} alt={"vector"} width={"123"} height={"123"} />
                </div>
                <p className={styles.logoTriviago}>riviago</p>
            </div>
            <p className={styles.text}>Descubre, aprende y diviértete con nuestros quizzes</p>
        </div>
    );
};
export default LoginTitle;