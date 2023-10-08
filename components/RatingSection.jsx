import React from 'react';
import Grid from '@mui/material/Grid';
import styles from '../styles/QuizInfo.module.css';
import {useRouter} from "next/navigation";


function RatingSection({ ratings, comments, questions, startButton, quizId }) {

  const router = useRouter()

  const handleQuizClick = (id) => {
    router.push(`/quiz/${id}/result`)
  }

  return (
    <Grid container>

      {ratings !== undefined && (
      <Grid item xs={2.4}>
        <strong>{ratings}</strong> Puntos
      </Grid>
      )}
      {questions && (
      <Grid item xs={2.4}>
        <strong>{questions}</strong> Preguntas
      </Grid>
      )}
      {comments && (
      <Grid item xs={2.4}>
        <strong>{comments  }</strong> Comentarios
      </Grid>
      )}
      {startButton && (
      <Grid item xs={7.2} sx={{position: 'relative'}}>
        <button className={styles.startButton} onClick={() => {handleQuizClick(quizId)}}>Realizar</button>
      </Grid>
      )}
    </Grid>
  );
}

export default RatingSection;
