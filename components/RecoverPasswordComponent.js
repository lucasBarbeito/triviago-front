"use client"

import styles from "@/styles/RecoverPasswordComponent.module.css";
import React from "react";

const RecoverPasswordComponent = () => {

    return(
        <div className={styles.boxComponent}>
            <form className={styles['form-container']}>
                <div>
                    <label htmlFor="password">Nueva contraseña</label>
                    <input type="password" id="password" name="password" placeholder="Ingresa una nueva contraseña"/>
                </div>

                <div>
                    <label htmlFor="password">Repetir contraseña</label>
                    <input type="password" id="password" name="password" placeholder="Confirmar contraseña"/>
                </div>

            </form>
            <button className={styles.button}>Cambiar contraseña</button>
        </div>
    )
}

export default RecoverPasswordComponent;

