"use client"

import styles from '../styles/QuizResolutionModal.module.css';


const QuizResolutionModal = () =>{
    return(
        <div className={styles.box}>
            <div className={styles.componentBox}>
                <p className={styles.titleText}>Enviar resolucion</p>
                <p className={styles.text}>¿Estás seguro que deseas enviar tu resolución del quiz?</p>
                <div className={styles.buttonBox}>
                    <button className={styles.cancelButton}>Cancelar</button>
                    <button className={styles.confirmButton}>Comenzar</button>
                </div>
            </div>
        </div>
    )
}

export default QuizResolutionModal;