"use client"

import React, {useState} from "react";
import styles from '../styles/QuizQuestionAnswer.module.css';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from "@mui/material/Checkbox";


const QuizQuestionAnswer = () => {
    // const [answers, setAnswers] = useState([{}])
    const answers = [
        {
            id: 1,
            text: "Large Mock up question 1 (AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA)",
            isCorrect: true
        },
        {id: 2, text: "Mock up question 2", isCorrect: false},
        {id: 3, text: "Mock up question 3", isCorrect: false}
    ]

    const textStyle = {
        color: '#000',
        fontFamily: 'Inter, sans-serif',
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: 400,
        flexShrink: 0,
        overflowY: 'hidden',
        resize: 'none',
        border: 'none',
        lineHeight: 'normal',
        wordWrap: 'break-word',
        wordBreak: 'break-word',
        maxWidth: '100%',
        width: '100%',
    };

    const [oneSelected, setOneSelected] = useState(false)

    const correctCount = answers.reduce((count, answer) => {
        return answer.isCorrect ? count + 1 : count;
    }, 0);

    function handleClickRadio(event) {
        if (!oneSelected) {
            setOneSelected(true)
        }
    }

    return (
        <div className={styles.componentBox}>
            <p className={styles.questionTitle}>Pregunta 1</p>
            <div className={styles.answerBox}>
                {correctCount > 1 ?
                    (answers.map((answer) => {
                            return (
                                <div key={answer.id} className={styles.answerRow}>
                                    <Checkbox id={answer.id}/>
                                    <p className={styles.answerOptionText}>{answer.text}</p>
                                </div>
                            );
                        })
                    ) :
                    (
                        <FormControl>
                            <RadioGroup aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group">
                                {answers.map((answer) => (
                                    <FormControlLabel
                                        key={answer.id}
                                        value={answer.text}
                                        control={<Radio/>}
                                        label={answer.text}
                                        slotProps={{typography: textStyle}}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    )}
            </div>
        </div>
    );
};

export default QuizQuestionAnswer;

