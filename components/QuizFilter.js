import React, { useState } from 'react';
import styles from '../styles/QuizFilter.module.css';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CheckBoxOutlineBlank from '../public/images/CheckBoxOutlineBlank.png';
import MultipleSelectCheckmarks from "@/components/MultipleSelectCheckmarks";
import Image from "next/image";


const QuizFilter = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [minQuestions, setMinQuestions] = useState('');
    const [maxQuestions, setMaxQuestions] = useState('');
    const [minCalification, setMinCalification] = useState(null);
    const [maxCalification, setMaxCalification] = useState(null);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };


    const handleMinCalificationChange = (event) => {
        const inputValue = event.target.value;
        if (
            (!isNaN(parseFloat(inputValue)) && inputValue >= 0 && inputValue <= 5) ||
            inputValue === ''
        ) {
            setMinCalification(inputValue);
        }
    };

    const handleMaxCalificationChange = (event) => {
        const inputValue = event.target.value;
        if (
            (!isNaN(parseFloat(inputValue)) && inputValue >= 0 && inputValue <= 5) ||
            inputValue === ''
        ) {
            setMaxCalification(inputValue);
        }
    };

    const handleMinQuestionsChange = (event) => {
        const inputValue = event.target.value;
        if (!isNaN(parseInt(inputValue)) || inputValue === '') {
            setMinQuestions(inputValue);
        }
    };

    const handleMaxQuestionsChange = (event) => {
        const inputValue = event.target.value;
        if (!isNaN(parseInt(inputValue)) || inputValue === '') {
            setMaxQuestions(inputValue);
        }
    };

    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const handleCheckboxClick = () => {
        setIsCheckboxChecked(!isCheckboxChecked);
    };

    const CheckboxButton = ({ onClick }) => (
        <button className={styles.checkboxButton} onClick={onClick}>
            <Image src="/images/CheckBoxOutlineBlank" alt="Checkbox" width={24} height={24} />
        </button>
    );

    const isCreationDateValid = startDate === null || endDate === null || startDate <= endDate;

    const isQuestionValid =
        (minQuestions === '' && maxQuestions === '') ||
        (minQuestions === '' && !isNaN(parseInt(maxQuestions))) ||
        (maxQuestions === '' && !isNaN(parseInt(minQuestions))) ||
        (parseInt(minQuestions) <= parseInt(maxQuestions) || isNaN(parseInt(maxQuestions)));

    const isCalificationValid =
        (minCalification === '' && maxCalification === '') ||
        (minCalification === '' && !isNaN(parseFloat(maxCalification)) && maxCalification <= 5) ||
        (maxCalification === '' && !isNaN(parseFloat(minCalification)) && minCalification >= 0) ||
        (parseFloat(minCalification) <= parseFloat(maxCalification)) ||
        isNaN(parseFloat(maxCalification)) ||
        isNaN(parseFloat(minCalification));

    const handleClearButtonClick = () => {
        setStartDate(null);
        setEndDate(null);
        setMinQuestions('');
        setMaxQuestions('');
        setMinCalification('');
        setMaxCalification('');
        setIsCheckboxChecked(false);
    };

    return (
        <div className={styles.quizFilterContainer}>
            <p className={styles.quizFilterTitle}>Título</p>
            <Form.Control type="search" className={styles.quizFilterSearchInput} />
            <p className={styles.quizFilterTitle}>Etiquetas</p>
            <MultipleSelectCheckmarks
                tag={"Etiquetas"}
                options={["Hola", "Chau"]}
                values={[]}
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
            {!isCalificationValid && (
                <p className={styles.quizFilterTitle} style={{ color: 'red' }}>
                    Rango de calificación inválido.
                </p>
            )}
            <div className={styles.seguidores}>
                <CheckboxButton onClick={handleCheckboxClick} />
                <p>Seguidores</p>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.clearButton} onClick={handleClearButtonClick}>
                    Limpiar
                </button>
                <button className={styles.searchButton}>Buscar</button>
            </div>
        </div>
    );
};

export default QuizFilter;
