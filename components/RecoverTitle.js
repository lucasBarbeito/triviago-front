import styles from "@/styles/LoginTitle.module.css";
import Image from "next/image";
import React from "react";


const RecoverTitle = () => {
    return (
        <header>
            <div className={styles.bigContainer} >
                <div className={styles.logoContainer}>
                    <Image src={"/assets/images/vector.png"} alt={"vector"} width={"62"} height={"62"} />
                </div>
                <br></br>
                <p className={styles.textTitle}>Recuperar contraseña</p>
            </div>
        </header>
    );
};
export default RecoverTitle;