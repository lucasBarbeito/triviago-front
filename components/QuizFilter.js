import React, { useState } from 'react';
import styles from '../styles/QuizFilter.module.css';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const QuizFilter = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    return (
        <div className={styles.quizFilterContainer}>
            <p className={styles.quizFilterTitle}>Título</p>
            <Form.Control
                type="search"
                className={styles.quizFilterSearchInput}
            />
            <p className={styles.quizFilterTitle}>Etiquetas</p>
            <Form.Control
                type="search"
                className={styles.quizFilterSearchInput}
            />
            <p className={styles.quizFilterTitle}>Fecha</p>
            <div className={styles.quizFilterInputPlaceholder}>
                <div>
                    <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        placeholderText="Desde"
                        className={styles.quizFilterDoubleInputFst}
                    />
                </div>
                <div className={styles.line}></div>
                <div>
                    <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        placeholderText="Hasta"
                        className={styles.quizFilterDoubleInputSnd}
                    />
                </div>
            </div>
            <p className={styles.quizFilterTitle}>Preguntas</p>
            <div className={styles.quizFilterInputPlaceholder}>
                <div>
                    <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        placeholderText="Mínimo"
                        className={styles.quizFilterDoubleInputFst}
                    />
                </div>
                <div className={styles.line}></div>
                <div>
                    <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        placeholderText="Máximo"
                        className={styles.quizFilterDoubleInputSnd}
                    />
                </div>
            </div>
            <p className={styles.quizFilterTitle}>Calificación</p>
            <div className={styles.quizFilterInputPlaceholder}>
                <div>
                    <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        placeholderText="Mínimo"
                        className={styles.quizFilterDoubleInputFst}
                    />
                </div>
                <div className={styles.line}></div>
                <div>
                    <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        placeholderText="Máximo"
                        className={styles.quizFilterDoubleInputSnd}
                    />
                </div>
            </div>
            <p className={styles.quizFilterTitle}>Seguidores</p>
        </div>
    );
};

export default QuizFilter;
