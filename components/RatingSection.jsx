import React, { useState } from 'react';
import styles from '../styles/QuizInfo.module.css';
import { Button } from "@mui/material";
import ConfirmationModal from './ConfirmationModal';

function RatingSection({ ratings, comments, questions }) {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleConfirmationModal = () => {
        setShowConfirmationModal(true);
    }

    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '64px' }}>
                {/* ... (resto del código) */}
            </div>
            <div>
                <Button variant="contained" style={{ backgroundColor: '#00CC66' }} onClick={handleConfirmationModal}>
                    Realizar
                </Button>
            </div>

            {showConfirmationModal && (
                <div className={styles.modalBackdrop}>
                    <ConfirmationModal onClose={handleCloseConfirmationModal} />
                </div>
            )}
        </div>
    );
}

export default RatingSection;
