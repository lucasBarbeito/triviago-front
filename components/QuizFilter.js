import React, {useEffect, useState} from 'react';
import styles from '../styles/QuizFilter.module.css';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MultipleSelectCheckmarks from "@/components/MultipleSelectCheckmarks";
import Image from "next/image";
import Checkbox from '@mui/material/Checkbox';
import {Slide, Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";

const QuizFilter = () => {
    const [quizTitle, setQuizTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState();
    const [minQuestions, setMinQuestions] = useState('');
    const [maxQuestions, setMaxQuestions] = useState('');
    const [minCalification, setMinCalification] = useState('');
    const [maxCalification, setMaxCalification] = useState('');
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [message, setMessage] = useState("ERROR");
    const [open, setOpen] = useState(false);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const [selectedTags, setSelectedTags] = useState([]);

    const handleTagChange = (event) => {
        setSelectedTags(event.target.value);
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

    const handleCheckboxChange = (event) => {
        setIsCheckboxChecked(event.target.checked);
    };

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
        setSelectedTags([]);
        document.getElementById("titleFilter").value = ''
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const currentDate = new Date()

        function handleSearch(){
        if(!(isCalificationValid) || !(isQuestionValid) || !(isCreationDateValid)){
            setOpen(true)
            if(!isCreationDateValid){
                setMessage("La fecha desde debe ser anterior a la fecha hasta")
                return
            }
            if(!isQuestionValid){
                setMessage("Minimo debe ser mayor o igual al maximo")
                return
            }
            if(!isCalificationValid){
                setMessage("Rango de calificación inválido")
                return
            }
        }
    }
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")


    return (
        <div className={styles.quizFilterContainer}>
            <p className={styles.quizFilterTitle}>Título</p>
            <Form.Control id={"titleFilter"} type="search" className={styles.quizFilterSearchInput}/>
            <p className={styles.quizFilterTitle}>Etiquetas</p>
            <div>
                <MultipleSelectCheckmarks
                    tag={"Etiquetas"}
                    options={["Etiqueta1", "Etiqueta2"]}
                    values={selectedTags}
                    onChange={handleTagChange}
                />
            </div>
            <p className={styles.quizFilterTitle}>Fecha</p>
            <div className={styles.quizFilterInputPlaceholder}>
                <div>
                    <DatePicker
                        id = "fromDate"
                        selected={startDate}
                        onChange={handleStartDateChange}
                        placeholderText="Desde"
                        className={styles.quizFilterDoubleInputFst}
                        maxDate={endDate ?? currentDate}
                    />
                </div>
                <div className={styles.line}></div>
                <div>
                    <DatePicker
                        id = "toDate"
                        selected={endDate}
                        onChange={handleEndDateChange}
                        placeholderText="Hasta"
                        className={styles.quizFilterDoubleInputSnd}
                        maxDate={currentDate}
                        minDate={startDate}
                    />
                </div>
            </div>
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
                <button className={styles.searchButton} onClick={handleSearch}>Buscar</button>
            </div>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} TransitionComponent={Slide} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default QuizFilter;
