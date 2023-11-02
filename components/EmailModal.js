"use client";
import styles from '../styles/EmailModal.module.css';
import {useState} from "react";

const EmailModal = ({onClose}) => {
    const [value, setValue] = useState();

    return (
        <div className={styles.background}>
            <div className={styles.box}>
                <div className={styles.componentBox}>
                    <p className={styles.titleText}>Ingresa tu email:</p>
                    <input value={value} onChange={(e) => setValue(e.target.value)}
                           placeholder={"Ingrese tu email"}></input>
                    <div className={styles.buttonBox}>
                        <button className={styles.cancelButton} onClick={onClose}>
                            Cancelar
                        </button>
                        <button className={styles.confirmButton} onClick={() => console.log("todo")}>
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailModal;