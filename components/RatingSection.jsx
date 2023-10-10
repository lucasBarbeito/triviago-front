import React from 'react';
import styles from '../styles/QuizInfo.module.css';
import {useRouter} from "next/navigation";


function RatingSection({ ratings, comments, questions, startButton, quizId }) {

  const router = useRouter()

  const handleQuizClick = (id) => {
    router.push(`/quiz/${id}/result`)
  }

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
          {startButton && <div>
              <button className={styles.startButton} onClick={() => {handleQuizClick(quizId)}}>Realizar</button>
          </div>}
      </div>
  );
}

export default RatingSection;
