"use client"

import styles from '../styles/QuizCreatorInfo.module.css';
import {useState} from "react";
import Image from 'next/image';

const QuizCreatorInfo = () => {
    const [privacy, setPrivacy] = useState(false);
    function changePrivacy(event) {
        setPrivacy(!privacy);
    }

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
                            {privacy ? <Image src="/assets/images/activeSwitch.png" alt={""} width={"34"} height={"18"} onClick={changePrivacy}/>
                                : <Image src="/assets/images/notActiveSwitch.png" alt={""} width={"34"} height={"18"} onClick={changePrivacy}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default QuizCreatorInfo;