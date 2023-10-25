"use client";

import React, {useEffect, useState} from 'react';
import styles from '../styles/QuizQuestion.module.css';
import Image from "next/image";
import {IconButton, Radio, Switch, TextField} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Checkbox from "@mui/material/Checkbox";

const QuizQuestion = ({deleteFunction, questionIndex, quizData, setQuizData}) => {
    const [currAnswer, setCurrAnswer] = useState("");
    const [isCorrectCurr, setIsCorrectCurr] = useState(false)

    function addAnswer() {
        if(currAnswer.length > 0){
            const updatedQuestions = [...quizData.questions];

            const newAnswer = { content: currAnswer, isCorrect: isCorrectCurr };

            if (!updatedQuestions[questionIndex]) {
                updatedQuestions[questionIndex] = {
                    content: quizData.questions[questionIndex].question,
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
        const updatedQuestions = [...quizData.questions];
        if (updatedQuestions[questionIndex] && updatedQuestions[questionIndex].answers.length > 0) {
            // Eliminar la respuesta correspondiente en el array de respuestas de la pregunta para el quizData
            updatedQuestions[questionIndex].answers.splice(index, 1);

            // Si la pregunta ya no tiene respuestas, eliminar la pregunta
            if (updatedQuestions[questionIndex].answers.length === 0) {
                updatedQuestions.splice(questionIndex, 1);
            }
            updateQuizData(updatedQuestions);
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
        return quizData.questions[questionIndex].answers.filter((answer) => answer.isCorrect).length;
    }

    function indexCorrectHandler(index) {
        const updatedQuestions = [...quizData.questions];
        if (updatedQuestions[questionIndex] && updatedQuestions[questionIndex].answers.length > 0) {
            // Actualizar el valor isCorrect de la respuesta correspondiente en el array de respuestas de la pregunta
            updatedQuestions[questionIndex].answers[index].isCorrect = !updatedQuestions[questionIndex].answers[index].isCorrect;
            updateQuizData(updatedQuestions);
        }
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
                        value={quizData.questions[questionIndex].content}
                        maxRows={4}
                    />
                    <div className={styles.columnAnswer}>
                        <p className={styles.titleAnsw}>Respuestas</p>
                    </div>
                    <div className={styles.answerContainer}>
                        {quizData.questions[questionIndex].answers.map((answer, index) => (
                            <div>
                                {(index >= 0) && (<div key={index} className={styles.answerField}>
                                    <div className={styles.bulletPointContainer}>
                                        {   correctAmount() > 1
                                            ?   <Checkbox
                                                checked={answer.isCorrect}
                                                onChange={() => indexCorrectHandler(index)}
                                            />
                                            :   <Radio
                                                checked={answer.isCorrect}
                                                onChange={() => indexCorrectHandler(index)}
                                            />
                                        }
                                        <p className={styles.text}>{answer.content}</p>
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
                                    correctAmount() > 1
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
                                    name="answerArea"
                                    className={styles.answerInput}
                                    placeholder="Respuesta..."
                                    value = {currAnswer}
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