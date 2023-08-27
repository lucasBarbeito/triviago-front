import React from 'react';
import styles from '../styles/QuizComents.module.css';

const QuizComents = () => {
    return (
        <div className={styles.backgroundBox}>
            <div className={styles.componentBox}>
                <div className={styles.dividerBox}>
                    <p className={styles.titleComentsText}>Comentarios</p>
                    <p className={styles.titleRateText}>Clasificación</p>
                </div>
                <div className={styles.lineBox}>
                    <div className={styles.dividerComentLine}></div>
                    <div className={styles.dividerClasificationLine}></div>
                </div>
                <div className={styles.comentBox}>
                    <p className={styles.numberTextComents}>8 Comentarios</p>
                </div>
            </div>
        </div>
    );
};
export default QuizComents;