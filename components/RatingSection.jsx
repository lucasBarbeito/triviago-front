import React from 'react';
import Grid from '@mui/material/Grid';
import styles from '../styles/QuizInfo.module.css';


function RatingSection({ ratings, comments, questions, startButton }) {
  return (
    <Grid container>


      <Grid item xs={2.4}>
        <strong>{ratings}</strong> Puntos
      </Grid>

      <Grid item xs={2.4}>
        <strong>{questions}</strong> Preguntas
      </Grid>

      {comments && (
      <Grid item xs={2.4}>
        <strong>{comments  }</strong> Comentarios
      </Grid>
      )}
      {startButton && (
      <Grid item xs={7.2} sx={{position: 'relative'}}>
        <button className={styles.startButton}>Realizar</button>
      </Grid>
      )}
    </Grid>
  );
}

export default RatingSection;
