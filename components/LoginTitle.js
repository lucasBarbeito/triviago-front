// LoginComponent.js
import React from 'react';
import styles from '../styles/LoginTitle.module.css';

const LoginTitle = () => {
    return (
        <div className={styles.bigContainer}>
            <div className={styles.logoContainer}>
                <div className={styles.logo}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="123" height="123" viewBox="0 0 123 123" fill="none">
                        <g clip-path="url(#clip0_2_36)">
                            <rect width="123" height="123" fill="#F2F4F7"/>
                            <path d="M44.362 112.012V108.24C48.134 108.24 50.512 106.108 51.906 101.598C52.89 97.088 53.382 92.414 53.136 87.74V49.61H56.99V87.74C57.154 92.742 56.744 97.826 55.596 102.664C55.022 104.632 54.12 106.518 52.808 108.158H75.194C73.8 106.354 72.816 104.304 72.242 102.09C71.094 97.17 70.602 92.086 70.848 87.002V36.654H34.44C24.272 36.654 18.45 39.852 18.45 45.428H14.678V15.416H88.232C92.742 15.662 97.17 15.17 101.516 14.186C105.698 12.874 107.666 10.496 107.666 6.642H111.52C111.52 10.496 109.962 15.58 102.664 17.794C97.908 18.942 93.07 19.434 88.232 19.188H18.532V37.146C21.32 34.686 26.158 32.718 34.522 32.718H74.702V86.92C74.538 91.676 74.948 96.35 75.932 101.024C77.736 107.42 81.016 108.158 83.476 108.158V112.012H44.362Z" fill="#00CC66"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_2_36">
                                <rect width="123" height="123" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <p className={styles.logoTriviago}>riviago</p>
            </div>

            <p className={styles.text}>Descubre, aprende y diviértete con nuestros quizzes</p>
        </div>
    );
};

export default LoginTitle;