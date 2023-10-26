"use client";
import React, { useState } from 'react';
import styles from '../styles/QuizInfo.module.css';
import { Button } from "@mui/material";
import ConfirmationModal from './ConfirmationModal';

function RatingSection({ ratings, comments, questions, id, showButton, author, quizTitle }) {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [quizId, setQuizId] = useState(null);

    const handleConfirmationModal = (id) => {
        setQuizId(id);
        setShowConfirmationModal(true);
    }

    const handleCloseConfirmationModal = () => {
        setQuizId(null);
        setShowConfirmationModal(false);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '64px' }}>
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
            {showButton && (
                <div>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#00CC66' }}
                        onClick={() => handleConfirmationModal(id)}
                    >
                        Realizar
                    </Button>
                </div>
            )}
            {showConfirmationModal && (
                <div className={styles.modalBackdrop}>
                    <ConfirmationModal onClose={handleCloseConfirmationModal} quizId={quizId} author={author} quizTitle={quizTitle}/>
                </div>
            )}
        </div>
    );
}

export default RatingSection;
