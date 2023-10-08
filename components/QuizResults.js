"use client"

import styles from '../styles/QuizResults.module.css';
import Rater from "react-rater";
import 'react-rater/lib/react-rater.css'
import {useRequestService} from "@/service/request.service";
import {useState} from "react";
import {Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";

const QuizResults = (quizId) => {

    const service = useRequestService();
    const [ratingSubmitted, setRatingSubmitted] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

    function handleRate(event) {
        const rating = event.rating;
        if (quizId !== '0') {
            service.rateQuiz(quizId.quizId, rating)
                .then(response => {
                    setRatingSubmitted(true);
                })
                .catch(error => {
                    console.error('Hubo un error al calificar el quiz:', error);
                    setErrorSnackbarOpen(true);
                });
        } else {
            console.error('No se pudo obtener el ID del quiz desde el URL.');
        }
    }

    const handleCloseErrorSnackbar = () => {
        setErrorSnackbarOpen(false);
    };

    return (
        <div className={styles.componentBox}>
            <p className={styles.quizTitle}>Título del quiz</p>
            <span className={styles.quizResultText}>Tu resultado fue de
                <span className={styles.quizResultTextBold}> 8 de 10 respuestas correctas (80%)</span> y obtuviste una clasificación de #11.</span>
            <div className={styles.rateBox}>
                <p className={styles.rateText}>¿Cómo calificarías este quiz?</p>
                <div className={styles.starsBox}>
                    <Rater style={{fontSize: '35px'}} onRate={handleRate} disabled={ratingSubmitted}/>
                </div>
            </div>
            <Snackbar
                open={errorSnackbarOpen}
                autoHideDuration={5000}
                onClose={handleCloseErrorSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseErrorSnackbar} severity="error">
                    Hubo un error al calificar el quiz, por favor intenta más tarde.
                </Alert>
            </Snackbar>
        </div>
    )

}

export default QuizResults;