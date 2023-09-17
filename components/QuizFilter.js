import React, { useMemo, useState } from 'react';
import styles from '../styles/QuizFilter.module.css';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MultipleSelectCheckmarks from '@/components/MultipleSelectCheckmarks';
import Image from 'next/image';
import Checkbox from '@mui/material/Checkbox';
import { useRequestService } from '@/service/request.service';
import { parseISO, isDate, isBefore } from 'date-fns'; // Importa isDate y isBefore para verificar fechas

const QuizFilter = () => {
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [quizzes, setQuizzes] = useState([]);
    const requestService = useRequestService();

    const [quizFilter, setQuizFilter] = useState({
        title: '',
        labels: [],
        dateFrom: null, // Inicializa con null en lugar de una cadena vacía
        dateTo: null, // Inicializa con null en lugar de una cadena vacía
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
            title: event.target.value,
        });
    };

    const handleStartDateChange = (date) => {
        setQuizFilter({
            ...quizFilter,
            dateFrom: date,
        });
    };

    const handleEndDateChange = (date) => {
        setQuizFilter({
            ...quizFilter,
            dateTo: date,
        });
    };

    const [selectedTags, setSelectedTags] = useState([]);

    const handleTagChange = (event) => {
        setQuizFilter({
            ...quizFilter,
            labels: event.target.value,
        });
    };

    const handleMinCalificationChange = (event) => {
        const inputValue = event.target.value;
        if (
            (!isNaN(parseFloat(inputValue)) &&
                inputValue >= 0 &&
                inputValue <= 5) ||
            inputValue === ''
        ) {
            setQuizFilter({
                ...quizFilter,
                minRating: inputValue,
            });
        }
    };

    const handleMaxCalificationChange = (event) => {
        const inputValue = event.target.value;
        if (
            (!isNaN(parseFloat(inputValue)) &&
                inputValue >= 0 &&
                inputValue <= 5) ||
            inputValue === ''
        ) {
            setQuizFilter({
                ...quizFilter,
                maxRating: inputValue,
            });
        }
    };

    const handleMinQuestionsChange = (event) => {
        const inputValue = event.target.value;
        if (!isNaN(parseInt(inputValue)) || inputValue === '') {
            setQuizFilter({
                ...quizFilter,
                minQuestion: inputValue,
            });
        }
    };

    const handleMaxQuestionsChange = (event) => {
        const inputValue = event.target.value;
        if (!isNaN(parseInt(inputValue)) || inputValue === '') {
            setQuizFilter({
                ...quizFilter,
                maxQuestion: inputValue,
            });
        }
    };

    const handleCheckboxChange = (event) => {
        setIsCheckboxChecked(event.target.checked);
    };

    function handleSearch() {
        setButtonDisabled(true);
        const aux = { ...quizFilter };

        // Verifica si dateFrom es una fecha válida antes de convertirla
        if (isDate(aux.dateFrom)) {
            aux.dateFrom = aux.dateFrom.toISOString().split('T')[0];
        } else {
            aux.dateFrom = null;
        }

        // Verifica si dateTo es una fecha válida antes de convertirla
        if (isDate(aux.dateTo)) {
            aux.dateTo = aux.dateTo.toISOString().split('T')[0];
        } else {
            aux.dateTo = null;
        }

        // Verifica si dateFrom y dateTo son fechas válidas antes de convertirlas
        if (
            isDate(aux.dateFrom) &&
            isDate(aux.dateTo) &&
            isBefore(aux.dateFrom, aux.dateTo)
        ) {
            aux.dateFrom = aux.dateFrom.toISOString().split('T')[0];
            aux.dateTo = aux.dateTo.toISOString().split('T')[0];
        }

        requestService
            .findPublicQuiz(aux)
            .then((data) => {
                setQuizzes(data);
                console.log('Quizzes obtenidos del backend:', data);
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
            minQuestion: '',
            maxQuestion: '',
            rating: null,
            minRating: null,
            maxRating: null,
        });
        setIsCheckboxChecked(false);
        setSelectedTags([]);
    };

    const isCreationDateValid = useMemo(() => {
        if (quizFilter.dateFrom === null || quizFilter.dateTo === null) {
            return true;
        }

        return (
            isDate(quizFilter.dateFrom) &&
            isDate(quizFilter.dateTo) &&
            isBefore(quizFilter.dateFrom, quizFilter.dateTo)
        );
    }, [quizFilter.dateFrom, quizFilter.dateTo]);


    const isQuestionValid =
        (quizFilter.minQuestion === '' && quizFilter.maxQuestion === '') ||
        (quizFilter.minQuestion === '' &&
            !isNaN(parseInt(quizFilter.maxQuestion))) ||
        (quizFilter.maxQuestion === '' &&
            !isNaN(parseInt(quizFilter.minQuestion))) ||
        (parseInt(quizFilter.minQuestion) <=
            parseInt(quizFilter.maxQuestion) ||
            isNaN(parseInt(quizFilter.maxQuestion)));

    const isCalificationValid =
        (quizFilter.minRating === '' && quizFilter.maxRating === '') ||
        (quizFilter.minRating === '' &&
            !isNaN(parseFloat(quizFilter.maxRating)) &&
            quizFilter.maxRating <= 5) ||
        (quizFilter.maxRating === '' &&
            !isNaN(parseFloat(quizFilter.minRating)) &&
            quizFilter.minRating >= 0) ||
        (parseFloat(quizFilter.minRating) <= parseFloat(quizFilter.maxRating)) ||
        isNaN(parseFloat(quizFilter.maxRating)) ||
        isNaN(parseFloat(quizFilter.minRating));

    return (
        <div className={styles.quizFilterContainer}>
            <p className={styles.quizFilterTitle}>Título</p>
            <Form.Control
                type="search"
                onChange={handleTitleChange}
                className={styles.quizFilterSearchInput}
                value={quizFilter.title}
            />
            <p className={styles.quizFilterTitle}>Etiquetas</p>
            <div>
                <MultipleSelectCheckmarks
                    tag={'Etiquetas'}
                    options={['Etiqueta1', 'Etiqueta2']}
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
                <button
                    onClick={handleSearch}
                    disabled={buttonDisabled}
                    className={styles.searchButton}
                >
                    Buscar
                </button>
            </div>
        </div>
    );
};

export default QuizFilter;
