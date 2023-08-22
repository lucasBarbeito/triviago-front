import React from 'react';
import styles from '../styles/LoginHeader.module.css';

const LoginHeader = () => {
    return (
        <header>
            <div className={styles.bigContainer}>
                <div className={styles.logoContainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 62 62" fill="none">
                        <g clip-path="url(#clip0_2_77)">
                            <rect width="62" height="62" fill="white"/>
                            <path d="M22.3613 56.4613V54.56C24.2627 54.56 25.4613 53.4853 26.164 51.212C26.66 48.9387 26.908 46.5827 26.784 44.2267V25.0067H28.7267V44.2267C28.8093 46.748 28.6027 49.3107 28.024 51.7493C27.7347 52.7413 27.28 53.692 26.6187 54.5187H37.9027C37.2 53.6093 36.704 52.576 36.4147 51.46C35.836 48.98 35.588 46.4173 35.712 43.8547V18.476H17.36C12.2347 18.476 9.30002 20.088 9.30002 22.8987H7.39868V7.77066H44.4747C46.748 7.89466 48.98 7.64666 51.1707 7.15066C53.2787 6.48933 54.2707 5.29066 54.2707 3.34799H56.2133C56.2133 5.29066 55.428 7.85333 51.7493 8.96933C49.352 9.54799 46.9133 9.79599 44.4747 9.67199H9.34135V18.724C10.7467 17.484 13.1853 16.492 17.4013 16.492H37.6547V43.8133C37.572 46.2107 37.7787 48.5667 38.2747 50.9227C39.184 54.1467 40.8373 54.5187 42.0773 54.5187V56.4613H22.3613Z" fill="#00CC66"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_2_77">
                                <rect width="62" height="62" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div >
                <h1 className={styles.welcomeText}>Bienvenido</h1>
                <p className={styles.infoText}>Por favor ingresa tus datos.</p>
            </div>
        </header>
    );
};

export default LoginHeader;