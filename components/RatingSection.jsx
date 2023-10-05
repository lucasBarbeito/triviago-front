import React from 'react';
import Grid from '@mui/material/Grid';
import styles from '../styles/QuizInfo.module.css';
import {Button} from "@mui/material";


function RatingSection({ ratings, comments, questions, startButton }) {
  return (
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{display: 'flex', gap: '64px'}}>
              { ratings !== undefined && <div>
                  <strong>{ratings}</strong> Puntos
              </div>}
              { questions !== undefined && <div>
                  <strong>{questions}</strong> Preguntas
              </div>}
              { comments !== undefined && <div>
                  <strong>{comments}</strong> Comentarios
              </div>}
          </div>
          {startButton && <div><Button variant="contained" style={{backgroundColor: '#00CC66'}}>Realizar</Button></div>}
      </div>
  );
}

export default RatingSection;
