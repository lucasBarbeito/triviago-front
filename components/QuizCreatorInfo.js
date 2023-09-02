import styles from '../styles/QuizCreatorInfo.module.css';
import React from "react";

const QuizCreatorInfo = () => {
    return(
        <div className={styles.componentBox}>
            <div className={styles.titleText}>Nuevo quiz</div>
            <div className={styles.labelsContainer}>

                <div className={styles.labelsInterior}>
                    <label htmlFor="title" className={styles.labelTitle}>Título</label>
                    <input type="text" id="title" name="title" className={styles.inputText} placeholder="Agrega un título..."/>
                    <div className={styles.line}/>
                </div>

                <div className={styles.labelsInterior}>
                    <label htmlFor="title" className={styles.labelTitle}>Etiquetas</label>
                    <input type="text" id="title" name="title" className={styles.inputText} placeholder="Agrega etiquetas..."/>
                    <div className={styles.line}/>
                </div>

                <div className={styles.labelsInterior}>
                    <label htmlFor="title" className={styles.labelTitle}>Descripción</label>
                    <input type="text" id="title" name="title" className={styles.inputText} placeholder="Agrega una descripción..."/>
                    <div className={styles.line}/>
                </div>

                <div className={styles.labelsInterior}>
                    <label htmlFor="title" className={styles.labelTitle}>Visibilidad</label>
                    <div className={styles.privateContainer}>
                        <p className={styles.text}>Privado</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="18" viewBox="0 0 34 18" fill="none">
                            <rect x="5" y="2" width="29" height="14" rx="7" fill="#D3D3D3"/>
                            <circle cx="9" cy="9" r="9" fill="#A9A9A9"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default QuizCreatorInfo;