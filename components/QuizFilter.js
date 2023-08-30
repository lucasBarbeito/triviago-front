import React, { useState } from 'react';
import styles from '../styles/QuizFilter.module.css';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CheckBoxOutlineBlank from '../images/CheckBoxOutlineBlank.png';

const QuizFilter = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [minQuestions, setMinQuestions] = useState(null);
    const [maxQuestions, setMaxQuestions] = useState(null);
    const [minCalification, setMinCalification] = useState(null);
    const [maxCalification, setMaxCalification] = useState(null);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleMinQuestionsChange = (event) => {
        setMinQuestions(event.target.value);
    };

    const handleMaxQuestionsChange = (event) => {
        setMaxQuestions(event.target.value);
    };

    const handleMinCalificationChange = (event) => {
        setMinCalification(event.target.value);
    };

    const handleMaxCalificationChange = (event) => {
        setMaxCalification(event.target.value);
    };

    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const handleCheckboxClick = () => {
        setIsCheckboxChecked(!isCheckboxChecked);
    };

    const CheckboxButton = ({ onClick }) => (
        <button className={styles.checkboxButton} onClick={onClick}>
            <img src={CheckBoxOutlineBlank} alt="Checkbox" className={styles.checkboxIcon} />
        </button>
    );

    const isCreationDateValid = startDate === null || endDate === null || startDate <= endDate;

    const isQuestionCountValid =
        (minQuestions === '' && maxQuestions === '') ||
        (minQuestions === '' && !isNaN(parseInt(maxQuestions))) ||
        (maxQuestions === '' && !isNaN(parseInt(minQuestions))) ||
        (parseInt(minQuestions) <= parseInt(maxQuestions));

    const isCalificationValid = (minCalification === '' && maxCalification === '') || (minCalification <= maxCalification);
    const isQuestionValid = (minQuestions === '' && maxQuestions === '') || (minQuestions <= maxQuestions);

    return (
        <div className={styles.quizFilterContainer}>
            <p className={styles.quizFilterTitle}>Título</p>
            <Form.Control type="search" className={styles.quizFilterSearchInput} />
            <p className={styles.quizFilterTitle}>Etiquetas</p>
            <Form.Control type="search" className={styles.quizFilterSearchInput} />
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
            {!isCreationDateValid && (
                <p className={styles.quizFilterTitle} style={{ color: 'red' }}>
                    La "fecha desde" debe ser anterior a la "fecha hasta".
                </p>
            )}
            <p className={styles.quizFilterTitle}>Preguntas</p>
            <div className={styles.quizFilterInputPlaceholder}>
                <div>
                    <input
                        type="text"
                        value={minQuestions}
                        onChange={handleMinQuestionsChange}
                        placeholder="Mínimo"
                        className={styles.quizFilterDoubleInputFst}
                    />
                </div>
                <div className={styles.line}></div>
                <div>
                    <input
                        type="text"
                        value={maxQuestions}
                        onChange={handleMaxQuestionsChange}
                        placeholder="Máximo"
                        className={styles.quizFilterDoubleInputSnd}
                    />
                </div>
            </div>
            {(!isQuestionValid) && (
                <p className={styles.quizFilterTitle} style={{ color: 'red' }}>
                    Mínimo debe ser menor o igual al máximo.
                </p>
            )}
            <p className={styles.quizFilterTitle}>Calificación</p>
            <div className={styles.quizFilterInputPlaceholder}>
                <div>
                    <input
                        type="number"
                        value={minCalification}
                        onChange={handleMinCalificationChange}
                        placeholder="Mínimo"
                        className={styles.quizFilterDoubleInputFst}
                    />
                </div>
                <div className={styles.line}></div>
                <div>
                    <input
                        type="number"
                        value={maxCalification}
                        onChange={handleMaxCalificationChange}
                        placeholder="Máximo"
                        className={styles.quizFilterDoubleInputSnd}
                    />
                </div>
            </div>
            {(!isCalificationValid) && (
                <p className={styles.quizFilterTitle} style={{ color: 'red' }}>
                    Mínimo debe ser menor o igual al máximo.
                </p>
            )}
            <div className={styles.seguidores}>
                <CheckboxButton onClick={handleCheckboxClick} />
                <p>Seguidores</p>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.clearButton}>Limpiar</button>
                <button className={styles.searchButton}>Buscar</button>
            </div>
        </div>
    );
};

export default QuizFilter;
