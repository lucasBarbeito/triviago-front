"use client"

import styles from '../styles/QuizResults.module.css';
import Rater from "react-rater";
import 'react-rater/lib/react-rater.css'

const QuizResults = () => {

    // Ro escuchame te dejo aca el handleRate que es para sacar el valor de las estrellas
    function handleRate(event) {}

    return (
        <div className={styles.componentBox}>
            <p className={styles.quizTitle}>Título del quiz</p>
            <span className={styles.quizResultText}>Tu resultado fue de
                <span className={styles.quizResultTextBold}> 8 de 10 respuestas correctas (80%)</span> y obtuviste una clasificación de #11.</span>
            <div className={styles.rateBox}>
                <p className={styles.rateText}>¿Cómo calificarías este quiz?</p>
                <div className={styles.starsBox}>
                    <Rater style={{fontSize: '35px'}} onRate={handleRate}/>
                </div>
            </div>
        </div>
    )
}

export default QuizResults;