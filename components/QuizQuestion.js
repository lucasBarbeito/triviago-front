"use client";

import React, {useState} from 'react';
import styles from '../styles/QuizQuestion.module.css';
import Image from "next/image";
import {IconButton, Radio, Switch, TextField} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Checkbox from "@mui/material/Checkbox";

const QuizQuestion = ({deleteFunction, questionIndex, quizData, setQuizData}) => {
    const [multplCorrect, setMultplCorrect] = useState(false);
    const [answers, setAnswers] = useState([{ text: '', type: 'radio', isCorrect: false }]);
    const [currAnswer, setCurrAnswer] = useState("");
    const [isCorrectCurr, setIsCorrectCurr] = useState(false)
    const [question, setQuestion] = useState("")

    function addAnswer() {
        if(currAnswer.length > 0){
            const updatedQuestions = [...quizData.questions];
            const updatedAnswers = answers.map((answer) => ({
                content: answer.text,
                isCorrect: answer.isCorrect
            }));            const newAnswer = { content: currAnswer, isCorrect: isCorrectCurr };
            setAnswers([...answers, { text: currAnswer, type: multplCorrect ? 'checkbox' : 'radio', isCorrect: isCorrectCurr }]);
            updatedAnswers.push(newAnswer);

            if (!updatedQuestions[questionIndex]) {
                updatedQuestions[questionIndex] = {
                    content: question,
                    answers: [newAnswer],
                };
            } else {
                updatedQuestions[questionIndex].answers.push(newAnswer);
            }

            updateQuizData(updatedQuestions)
            setAnswerAreaHeight()
            setCurrAnswer("")
            setIsCorrectCurr(false)
        }
    }


    function removeAnswer(index) {
        //porque el index del array de answers empieza en 1 pero el de quizData en 0
        const zeroBaseIndex = index - 1;
        const updatedAnswers = [...answers];
        //Primero lo borro de la lista de answers que es la que se esta mostrando en la UI
        updatedAnswers.splice(index, 1);
        setAnswers(updatedAnswers);

        const updatedQuestions = [...quizData.questions];
        if (updatedQuestions[questionIndex] && updatedQuestions[questionIndex].answers.length > 0) {
            // Eliminar la respuesta correspondiente en el array de respuestas de la pregunta para el quizData
            updatedQuestions[questionIndex].answers.splice(zeroBaseIndex, 1);

            // Si la pregunta ya no tiene respuestas, eliminar la pregunta
            if (updatedQuestions[questionIndex].answers.length === 0) {
                updatedQuestions.splice(questionIndex, 1);
            }
            updateQuizData(updatedQuestions);
            console.log(updatedQuestions)
        }
    }


    const setAnswerAreaHeight = () => {
        const answerArea = document.getElementById("answerArea");
        if (answerArea) {
            answerArea.style.height = "27px";
        }
    };

    function handleAnswerTextChange(event) {
        setCurrAnswer(event.target.value)
        event.target.style.height = '22px'
        event.target.style.height = (event.target.scrollHeight + 1)+'px'
    }

    function handleQuestionTextChange(event) {
        const updatedQuestions = [...quizData.questions];

        // Si no existe una pregunta en el índice, crea una nueva pregunta
        if (!updatedQuestions[questionIndex]) {
            updatedQuestions[questionIndex] = {
                content: event.target.value,
                answers: [],
            };
        } else {
            // Si la pregunta ya existe, actualiza su contenido
            updatedQuestions[questionIndex].content = event.target.value;
        }

        setQuestion(event.target.value);
        setQuizData((prevData) => ({
            ...prevData,
            questions: updatedQuestions,
        }));

        event.target.style.height = '44px';
        event.target.style.height = (event.target.scrollHeight + 1) + 'px';
    }


    function correctHandler (){
        setIsCorrectCurr(!isCorrectCurr)
    }

    function correctAmount() {
        return answers.filter((answer) => answer.isCorrect).length;
    }

    function indexCorrectHandler(index) {
        const zeroBaseIndex = index - 1;
        const updatedAnswers = [...answers];
        console.log(updatedAnswers)
        const answerToUpdate = updatedAnswers[index];

        if (answerToUpdate) {
            answerToUpdate.isCorrect = !answerToUpdate.isCorrect;
            setAnswers(updatedAnswers);

            const updatedQuestions = [...quizData.questions];
            console.log(updatedQuestions)
            console.log(index)
            if (updatedQuestions[questionIndex] && updatedQuestions[questionIndex].answers.length > 0) {
                // Actualizar el valor isCorrect de la respuesta correspondiente en el array de respuestas de la pregunta
                updatedQuestions[questionIndex].answers[zeroBaseIndex].isCorrect = !updatedQuestions[questionIndex].answers[zeroBaseIndex].isCorrect;
                updateQuizData(updatedQuestions);
                console.log(updatedQuestions)
            }
        }
    }




    const handleRemove = () => {
        // deleteFunction(index)
    }

    const handleRemoveQuestion = () =>{
        deleteFunction(questionIndex)
    }

    const updateQuizData = (updatedQuestions) => {
        setQuizData((prevData) => ({
            ...prevData,
            questions: updatedQuestions,
        }));
    };

    return(
        <div className={styles.containerQuestion}>
            <div className={styles.questionBox}>
                <div className={styles.interiorBox}>
                    <div className={styles.interiorBoxHeading}>
                        <p className={styles.title}>Pregunta</p>
                        <IconButton onClick={handleRemoveQuestion}>
                            <CancelIcon sx={{ color: 'red' }}/>
                        </IconButton>
                    </div>
                    <TextField
                        label="Pregunta"
                        multiline
                        fullWidth
                        onChange={handleQuestionTextChange}
                        value={question}
                        maxRows={4}
                    />
                    <div className={styles.columnAnswer}>
                        <p className={styles.titleAnsw}>Respuestas</p>
                        <div className={styles.interiorColumn}>
                            {/*<p className={styles.text}>Múltiples respuestas correctas</p>*/}
                            {/*<Switch*/}
                            {/*    sx={{*/}
                            {/*        '& .MuiSwitch-switchBase': {*/}
                            {/*            '&.Mui-checked': {*/}
                            {/*                color: '#00CC66',*/}
                            {/*                '& + .MuiSwitch-track': {*/}
                            {/*                    background: '#00CC66',*/}
                            {/*                },*/}
                            {/*            },*/}
                            {/*            '&.Mui-disabled.MuiSwitch-thumb': {*/}
                            {/*                color: '#FFFFFF',*/}
                            {/*            },*/}
                            {/*        },*/}
                            {/*        '& .MuiSwitch-thumb': {*/}
                            {/*            color: !(multplCorrect || correctAmount() > 1) && '#FFFFFF',*/}
                            {/*        },*/}
                            {/*        '& .MuiSwitch-track': {*/}
                            {/*            backgroundColor: '#000000',*/}
                            {/*        },*/}
                            {/*    }}*/}
                            {/*    checked={multplCorrect || correctAmount() > 1}*/}
                            {/*    onChange={() => setMultplCorrect(!multplCorrect)}*/}
                            {/*/>*/}
                        </div>
                    </div>
                    <div className={styles.answerContainer}>
                        {answers.map((answer, index) => (
                            <div>
                                {(index > 0) && (<div key={index} className={styles.answerField}>
                                    <div className={styles.bulletPointContainer}>
                                        {   multplCorrect || correctAmount() > 1
                                            ?   <Checkbox
                                                checked={answer.isCorrect}
                                                onChange={() => indexCorrectHandler(index)}
                                            />
                                            :   <Radio
                                                checked={answer.isCorrect}
                                                onChange={() => indexCorrectHandler(index)}
                                            />
                                        }
                                        <p className={styles.text}>{answer.text}</p>
                                    </div>
                                    <IconButton onClick={() => removeAnswer(index)}>
                                        <CancelIcon sx={{ color: 'red' }}/>
                                    </IconButton>
                                </div>)}
                            </div>
                        ))}
                        <div className={styles.newAnswer}>
                            <div className={styles.bulletPointContainer}>
                                {
                                    multplCorrect || correctAmount() > 1
                                        ?   <Checkbox
                                            checked={isCorrectCurr}
                                            onChange={correctHandler}
                                        />
                                        :   <Radio
                                            checked={isCorrectCurr}
                                            onChange={correctHandler}
                                        />
                                }
                                <textarea
                                    type="answerArea"
                                    // id="answerArea"
                                    name="answerArea"
                                    className={styles.answerInput}
                                    placeholder="Respuesta..."
                                    value = {currAnswer}
                                    // onChange={(e) => handleAnswerTextChange(e.target.value)}
                                    onChange={handleAnswerTextChange}
                                />
                                <IconButton onClick={addAnswer}>
                                    <AddCircleIcon sx={{ color: '#00CC66' }}/>
                                </IconButton>
                            </div>
                        </div>
                        <div className={styles.line}/>
                    </div>
                </div>
            </div>
        </div>
    )


}
export default QuizQuestion;