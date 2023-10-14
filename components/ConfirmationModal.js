"use client"

import styles from '../styles/ConfirmationModal.module.css';


const ConfirmationModal = () =>{
    return(
        <div className={styles.box}>
            <div className={styles.componentBox}>
                <p className={styles.titleText}>Realizar quiz</p>
                <p className={styles.text}>¿Estás seguro que deseas realizar el quiz titulado “Titulo del quiz” creado por creador_del_quiz@mail.com?</p>
                <div className={styles.buttonBox}>
                    <button className={styles.cancelButton}>Cancelar</button>
                    <button className={styles.confirmButton}>Comenzar</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal;