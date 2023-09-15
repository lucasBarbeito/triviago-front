import React, {useMemo, useState} from 'react';
import styles from '../styles/QuizFilter.module.css';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MultipleSelectCheckmarks from "@/components/MultipleSelectCheckmarks";
import Image from "next/image";
import Checkbox from '@mui/material/Checkbox';
import {useRequestService} from "@/service/request.service";

const QuizFilter = () => {

    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [quizzes, setQuizzes] = useState([]);
    const requestService = useRequestService()

    const [quizFilter, setQuizFilter] = useState({
        title: '',
        labels: [],
        dateFrom: null,
        dateTo: null,
        creationDate: null,
        minQuestion: null,
        maxQuestion: null,
        rating: null,
        minRating: null,
        maxRating: null,
    });

    const handleTitleChange = (event) => {
        setQuizFilter({
            ...quizFilter,
            title: event.target.value
        });
    }
    const handleStartDateChange = (date) => {
        setQuizFilter({
            ...quizFilter,
            dateFrom: date
        });
    };

    const handleEndDateChange = (date) => {
        setQuizFilter({
            ...quizFilter,
            dateTo: date
        });
    };

    const [selectedTags, setSelectedTags] = useState([]);

    const handleTagChange = (event) => {
        setQuizFilter({
            ...quizFilter,
            labels: event.target.value
        });
    };

    const handleMinCalificationChange = (event) => {
        const inputValue = event.target.value;
        if (
            (!isNaN(parseFloat(inputValue)) && inputValue >= 0 && inputValue <= 5) ||
            inputValue === ''
        ) {
            setQuizFilter({
                ...quizFilter,
                minRating: inputValue
            });
        }
    };

    const handleMaxCalificationChange = (event) => {
        const inputValue = event.target.value;
        if (
            (!isNaN(parseFloat(inputValue)) && inputValue >= 0 && inputValue <= 5) ||
            inputValue === ''
        ) {
            setQuizFilter({
                ...quizFilter,
                maxRating: inputValue
            });
        }
    };

    const handleMinQuestionsChange = (event) => {
        const inputValue = event.target.value;
        if (!isNaN(parseInt(inputValue)) || inputValue === '') {
            setQuizFilter({
                ...quizFilter,
                minQuestion: inputValue
            });
        }
    };

    const handleMaxQuestionsChange = (event) => {
        const inputValue = event.target.value;
        if (!isNaN(parseInt(inputValue)) || inputValue === '') {
            setQuizFilter({
                ...quizFilter,
                maxQuestion: inputValue
            });
        }
    };

    const handleCheckboxChange = (event) => {
        setIsCheckboxChecked(event.target.checked);
    };

    function handleSearch() {
        setButtonDisabled(true);

        requestService.findPublicQuiz(quizFilter)
            .then((data) => {
                setQuizzes(data);
                console.log("Quizzes obtenidos del backend:", data);
            })
            .catch((error) => {
                throw new Error("Hubo un error en la búsqueda de quizzes, por favor intenta más tarde");
            })
            .finally(() => {
                setButtonDisabled(false);
            });
    }

    const handleClearButtonClick = () => {
        setQuizFilter({
            title: '',
            labels: [],
            dateFrom: null,
            dateTo: null,
            creationDate: null,
            minQuestion: null,
            maxQuestion: null,
            rating: null,
            minRating: null,
            maxRating: null,
        })
        setIsCheckboxChecked(false);
        setSelectedTags([]);
    };

    const isCreationDateValid = useMemo(() => {
        return quizFilter.dateTo === null || quizFilter.dateFrom <= quizFilter.dateTo
    }, [quizFilter.dateFrom, quizFilter.dateTo]); // useMemo hace el return cuando los valores de deps cambian


    const isQuestionValid =
        (quizFilter.minQuestion === '' && quizFilter.maxQuestion === '') ||
        (quizFilter.minQuestion === '' && !isNaN(parseInt(quizFilter.maxQuestion))) ||
        (quizFilter.maxQuestion === '' && !isNaN(parseInt(quizFilter.minQuestion))) ||
        (parseInt(quizFilter.minQuestion) <= parseInt(quizFilter.maxQuestion) || isNaN(parseInt(quizFilter.maxQuestion)));

    const isCalificationValid =
        (quizFilter.minRating === '' && quizFilter.maxRating === '') ||
        (quizFilter.minRating === '' && !isNaN(parseFloat(quizFilter.maxRating)) && quizFilter.maxRating <= 5) ||
        (quizFilter.maxRating === '' && !isNaN(parseFloat(quizFilter.minRating)) && quizFilter.minRating >= 0) ||
        (parseFloat(quizFilter.minRating) <= parseFloat(quizFilter.maxRating)) ||
        isNaN(parseFloat(quizFilter.maxRating)) ||
        isNaN(parseFloat(quizFilter.minRating));


    return (
        <div className={styles.quizFilterContainer}>
            <p className={styles.quizFilterTitle}>Título</p>
            <Form.Control type="search"
                          onChange={handleTitleChange}
                          className={styles.quizFilterSearchInput}
                          value={quizFilter.title}
            />
            <p className={styles.quizFilterTitle}>Etiquetas</p>
            <div>
                <MultipleSelectCheckmarks
                    tag={"Etiquetas"}
                    options={["Etiqueta1", "Etiqueta2"]}
                    values={quizFilter.labels}
                    onChange={handleTagChange}
                />
            </div>
            <p className={styles.quizFilterTitle}>Fecha</p>
            <div className={styles.quizFilterInputPlaceholder}>
                <div>
                    <DatePicker
                        selected={quizFilter.dateFrom}
                        onChange={handleStartDateChange}
                        placeholderText="Desde"
                        className={styles.quizFilterDoubleInputFst}
                    />
                </div>
                <div className={styles.line}></div>
                <div>
                    <DatePicker
                        selected={quizFilter.dateTo}
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
                        value={quizFilter.minQuestion}
                        onChange={handleMinQuestionsChange}
                        placeholder="Mínimo"
                        className={styles.quizFilterDoubleInputFst}
                    />
                </div>
                <div className={styles.line}></div>
                <div>
                    <input
                        type="text"
                        value={quizFilter.maxQuestion}
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
                        value={quizFilter.minRating}
                        onChange={handleMinCalificationChange}
                        placeholder="Mínimo"
                        className={styles.quizFilterDoubleInputFst}
                    />
                </div>
                <div className={styles.line}></div>
                <div>
                    <input
                        type="number"
                        value={quizFilter.maxRating}
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
                <Checkbox
                    checked={isCheckboxChecked}
                    onChange={handleCheckboxChange}
                />
                <p>Seguidores</p>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.clearButton} onClick={handleClearButtonClick}>
                    Limpiar
                </button>
                <button onClick={handleSearch} disabled={buttonDisabled} className={styles.searchButton}>Buscar</button>
            </div>
        </div>
    );
};

export default QuizFilter;
