import React from 'react';
import Grid from '@mui/material/Grid';

function RatingSection({ ratings, comments, questions }) {
  return (
    <Grid container >
      <Grid item xs={2.4}>
        <strong>{ratings}</strong> Puntos
      </Grid>
      <Grid item xs={2.4}>
        <strong>{comments}</strong> Preguntas
      </Grid>
      <Grid item xs={2.4}>
        <strong>{questions  }</strong> Comentarios
      </Grid>
    </Grid>
  );
}

export default RatingSection;
