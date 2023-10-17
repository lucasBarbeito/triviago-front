"use client"

import styles from '../styles/QuizQuestionAnswer.module.css';
import QuizProcessTestPage from "@/app/quizProcessTest/page";
import React, {useState} from "react";
import {Radio} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const QuizQuestionAnswer = () => {
    // const [answers, setAnswers] = useState([{}])
    const answers = [{
        id: 1,
        text: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1",
        isCorrect: true
    }, {id: 2, text: "hola don jose", isCorrect: true}, {id: 3, text: "hola augurusa", isCorrect: false}]

    const [oneSelected, setOneSelected] = useState(false)

    const correctCount = answers.reduce((count, answer) => {
        return answer.isCorrect ? count + 1 : count;
    }, 0);

    function handleClickRadio(event) {

    }


    return (
        <div className={styles.componentBox}>
            <p className={styles.questionTitle}>Pregunta 1</p>
            <div className={styles.answerBox}>
                {
                    answers.map((answer) => {
                        return (
                            <>
                                <div key={answer.id} className={styles.answerRow}>
                                    {
                                        correctCount > 1
                                            ? <Checkbox id={answer.id}/>
                                            : <Radio id={answer.id} onClick={handleClickRadio}/>
                                    }
                                    <p className={styles.answerOptionText}>{answer.text}</p>
                                </div>
                            </>)
                    })
                }
            </div>
        </div>
    )
}
export default QuizQuestionAnswer;

