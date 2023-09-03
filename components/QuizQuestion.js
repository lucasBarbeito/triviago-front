"use client";

import {useState} from 'react';
import styles from '../styles/QuizQuestion.module.css';
import Image from "next/image";

const QuizQuestion = () => {

    return(
        <div className={styles.questionBox}>
            <div className={styles.interiorBox}>
                <p className={styles.title}>Pregunta</p>
                <input className={styles.questionInput} placeholder={"Pregunta..."}></input>
                <div className={styles.columnAnswer}>
                    <p className={styles.title}>Respuestas</p>
                    <div>
                        <p className={styles.text}>Multiples respuesta correcta</p>
                        <Image src={} alt={}
                    </div>
                </div>
            </div>
        </div>
    )


}
export default QuizQuestion;